import re
from typing import Dict, List, Tuple, Any

TDL_DEFINITION_TYPES = (
    "Report", "Form", "Part", "Line", "Field", "Collection", "Function",
    "Menu", "System", "Variable", "Key", "Button", "Object", "Attribute", "Table",
)

DEFINITION_HEADER_RE = re.compile(
    r"\[\s*#?\s*(" + "|".join(TDL_DEFINITION_TYPES) + r")\s*:\s*([^\]]+)\]",
    re.IGNORECASE,
)

CONTAINMENT_ATTR_RE = re.compile(
    r"^\s*(Forms?|Parts?|Lines?|Fields?)\s*:\s*(.+)$",
    re.IGNORECASE,
)

CHILD_KIND = {"Forms": "Form", "Parts": "Part", "Lines": "Line", "Fields": "Field"}
PARENT_EXPECTED = {"Form": "Report", "Part": "Form", "Line": "Part", "Field": "Line"}


def validate_tdl_syntax(code: str) -> Tuple[bool, List[str]]:
    """Basic balance check for brackets and colons in definitions."""
    issues = []
    lines = code.splitlines()

    for idx, line in enumerate(lines, start=1):
        sline = line.strip()
        if not sline or sline.startswith(";") or sline.startswith("//"):
            continue

        open_b = sline.count("[")
        close_b = sline.count("]")
        if open_b != close_b:
            issues.append(f"Line {idx}: Unmatched brackets ([ {open_b} vs ] {close_b})")

        if sline.startswith("[") and sline.endswith("]"):
            content = sline[1:-1].strip()
            if content and not content.startswith(";") and ":" not in content:
                issues.append(f"Line {idx}: Definition header missing colon -> '{sline}'")

    has_defs = bool(DEFINITION_HEADER_RE.search(code))
    if not has_defs and len(code.strip()) > 30:
        issues.append("Warning: Code block does not contain recognizable TDL headers like [Report: ...] or [Field: ...]")

    return (len(issues) == 0, issues)


def check_dangling_references(code: str) -> List[str]:
    """Verify that every child referenced in Forms/Parts/Lines/Fields has a definition."""
    issues = []
    defined: Dict[str, set] = {"Form": set(), "Part": set(), "Line": set(), "Field": set()}
    referenced: Dict[str, List[Tuple[str, int]]] = {"Form": [], "Part": [], "Line": [], "Field": []}

    for idx, line in enumerate(code.splitlines(), start=1):
        sline = line.strip()
        if not sline or sline.startswith(";") or sline.startswith("//"):
            continue

        m_def = DEFINITION_HEADER_RE.match(sline)
        if m_def:
            kind_raw, name_raw = m_def.group(1), m_def.group(2).strip()
            kind_norm = next((k for k in TDL_DEFINITION_TYPES if k.lower() == kind_raw.lower()), None)
            if kind_norm in defined:
                defined[kind_norm].add(name_raw.lower())
            continue

        m_attr = CONTAINMENT_ATTR_RE.match(sline)
        if m_attr:
            attr_kind, target_str = m_attr.group(1), m_attr.group(2)
            target_kind = CHILD_KIND.get(attr_kind.capitalize())
            if target_kind:
                for token in target_str.split(","):
                    t_clean = token.strip().lower()
                    if t_clean and not t_clean.startswith(";"):
                        referenced[target_kind].append((t_clean, idx))

    for kind, items in referenced.items():
        for name_lower, line_no in items:
            if name_lower not in defined[kind]:
                issues.append(f"Line {line_no}: Referenced {kind} '{name_lower}' is not defined anywhere in the snippet")

    return issues


def validate_tdl_hierarchy(code: str) -> Tuple[bool, List[str]]:
    """Enforce strict TDL Object Model hierarchy: Report -> Form -> Part -> Line -> Field."""
    issues = []
    current_parent_kind = None

    for idx, line in enumerate(code.splitlines(), start=1):
        sline = line.strip()
        if not sline or sline.startswith(";") or sline.startswith("//"):
            continue

        m_def = DEFINITION_HEADER_RE.match(sline)
        if m_def:
            kind_raw = m_def.group(1)
            current_parent_kind = next((k for k in TDL_DEFINITION_TYPES if k.lower() == kind_raw.lower()), None)
            continue

        m_attr = CONTAINMENT_ATTR_RE.match(sline)
        if m_attr and current_parent_kind:
            attr_kind = m_attr.group(1).capitalize()
            child_kind = CHILD_KIND.get(attr_kind)
            expected_parent = PARENT_EXPECTED.get(child_kind)

            if expected_parent and current_parent_kind != expected_parent:
                issues.append(
                    f"Line {idx}: Invalid hierarchy scope! Attribute '{attr_kind}' ({child_kind}) "
                    f"placed inside [{current_parent_kind}]. Standard hierarchy requires {expected_parent} -> {child_kind}."
                )

    return (len(issues) == 0, issues)


def strip_filler_loops(code: str) -> str:
    """Remove endless repetitive separator comments and filler loops."""
    lines = code.splitlines()
    cleaned = []
    separator_count = 0

    for line in lines:
        sline = line.strip()
        if sline and set(sline) <= {";", "-", "=", "*", "#", " "} and len(sline) > 5:
            separator_count += 1
            if separator_count > 2:
                continue
        else:
            separator_count = 0
        cleaned.append(line)

    return "\n".join(cleaned)


def full_validate_and_refine(code: str) -> Dict[str, Any]:
    """Run full validation pass on code snippet."""
    clean_code = strip_filler_loops(code)
    valid_syntax, syntax_issues = validate_tdl_syntax(clean_code)
    dangling_issues = check_dangling_references(clean_code)
    valid_hierarchy, hierarchy_issues = validate_tdl_hierarchy(clean_code)

    all_errors = syntax_issues + dangling_issues + hierarchy_issues
    is_valid = valid_syntax and valid_hierarchy and (len(dangling_issues) == 0)

    status = "PASS" if is_valid else ("WARNING" if len(all_errors) < 3 else "FAIL")

    return {
        "valid": is_valid,
        "status": status,
        "hierarchy_errors": hierarchy_issues,
        "dangling_references": dangling_issues,
        "warnings": syntax_issues,
        "clean_code": clean_code,
    }
