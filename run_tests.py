import sys
import os
import traceback

with open("test_report.log", "w", encoding="utf-8") as f:
    def log(msg):
        f.write(msg)
        f.flush()
        print(msg, end="", flush=True)

    log("=== TDL ENTERPRISE ASSISTANT TEST SUITE ===\n\n")
    try:
        log("[1/9] Importing chat_bot and buildkb...\n")
        import chat_bot
        import buildkb
        log("      chat_bot and buildkb imported successfully!\n\n")
        
        log("[2/6] Testing check_dangling_references...\n")
        code_dangle = "[Report: CUST_Rep]\nForm: CUST_MissingForm\n"
        warns = chat_bot.check_dangling_references(code_dangle)
        log(f"      Result warnings: {warns}\n")
        assert len(warns) == 1 and "CUST_MissingForm" in warns[0], "Dangling check failed!"
        log("      [PASS] Dangling references test passed!\n\n")
        
        log("[3/6] Testing check_attribute_scopes...\n")
        code_scope = "[Report: CUST_Rep]\nSet As: \"test\"\n"
        warns_scope = chat_bot.check_attribute_scopes(code_scope)
        log(f"      Result warnings: {warns_scope}\n")
        assert len(warns_scope) == 1 and "Scope Error" in warns_scope[0], "Scope check failed!"
        log("      [PASS] Attribute scopes test passed!\n\n")
        
        log("[4/6] Testing prune_and_summarize_memory...\n")
        hist = [{"role": "user", "content": f"Turn {i}"} for i in range(10)]
        pruned = chat_bot.prune_and_summarize_memory(hist, max_turns=4)
        log(f"      Pruned length: {len(pruned)}, First role: {pruned[0]['role']}\n")
        assert pruned[0]["role"] == "system" and "System Memory Digest" in pruned[0]["content"] and len(pruned) == 5, "Memory prune failed!"
        log("      [PASS] Memory pruning test passed!\n\n")
        
        log("[5/6] Testing validate_and_refine_tdl (filler loops & formatting)...\n")
        code_filler = "[Report: CUST_Rep]\nForm: CUST_MyForm\n;--------------------\n;--------------------\n[Form: CUST_MyForm]\nPart: CUST_MyPart\n"
        is_val, refined, rep = chat_bot.validate_and_refine_tdl(code_filler)
        log(f"      Refined code length: {len(refined)}, Status: {rep['status']}\n")
        assert refined.count(";-----") == 1, f"Filler loop removal failed! Found {refined.count(';-----')} separators"
        log("      [PASS] Filler removal and AST validation test passed!\n\n")
        
        log("[6/6] Testing Smart Chunking functions...\n")
        
        # Test TDL chunker
        code_tdl = "[Report: CUST_Rep1]\nForm: CUST_Form1\n[Form: CUST_Form1]\nPart: CUST_Part1"
        tdl_chunks = buildkb.chunk_tdl(code_tdl, max_chunk_size=20)
        log(f"      TDL Chunks: {tdl_chunks}\n")
        assert len(tdl_chunks) >= 2, "TDL chunking failed to split!"
        
        # Test Markdown chunker
        md_text = "# Section 1\nThis is the description.\n# Section 2\nAnother description."
        md_chunks = buildkb.chunk_markdown(md_text, max_chunk_size=20)
        log(f"      Markdown Chunks: {md_chunks}\n")
        assert len(md_chunks) >= 2, "Markdown chunking failed to split!"
        
        # Test JSON chunker
        json_text = '{"Stockitems": [{"StockItem": "Item 1"}, {"StockItem": "Item 2"}]}'
        json_chunks = buildkb.chunk_json(json_text, max_chunk_size=20)
        log(f"      JSON Chunks: {json_chunks}\n")
        assert len(json_chunks) >= 2, "JSON chunking failed to split list!"
        
        log("      [PASS] Smart Chunking tests passed!\n\n")

        log("[7/9] Testing Tier 3 Sparse Lexical Indexing & Tokenization...\n")
        lex_tokens = buildkb.tokenize_for_lexical("Write custom Daily Sales Report in TDL")
        log(f"      Lexical tokens: {lex_tokens}\n")
        assert "sales" in lex_tokens and "report" in lex_tokens, "Lexical tokenization failed!"
        sparse_db = buildkb.build_sparse_lexical_index(["[Report: CUST_Sales]\nForm: CUST_SalesForm", "Some normal text"])
        assert "sales" in sparse_db["inverted_index"], "Sparse lexical index builder failed!"
        log("      [PASS] Tier 3 Sparse Lexical Indexing tests passed!\n\n")

        log("[8/9] Testing Agent 3 Structural Hierarchy Validation (Report -> Form -> Part -> Line)...\n")
        bad_hierarchy_code = "[Report: CUST_BrokenRep]\nTitle: \"Test\"\n"
        issues_h = chat_bot.validate_tdl_code(bad_hierarchy_code)
        log(f"      Hierarchy validation issues: {issues_h}\n")
        assert any("Hierarchy Warning: [Report] definition should specify or reference a Form" in i for i in issues_h), "Hierarchy validator failed!"
        log("      [PASS] Agent 3 Structural Hierarchy Validation tests passed!\n\n")

        log("[9/10] Testing Tier 3 Hybrid RAG & Confidence Guardrail...\n")
        mem = chat_bot.MultiLevelAgentMemory()
        ctx, sources, metrics = mem.retrieve_context("What is TDL?", return_sources=True, return_metrics=True)
        log(f"      Retrieval metrics: {metrics}\n")
        assert "confidence" in metrics and "is_general_query" in metrics, "Retrieval metrics missing required keys!"
        log("      [PASS] Tier 3 Hybrid RAG & Confidence Guardrail tests passed!\n\n")

        log("[10/10] Testing Adaptive Generation Auto-Tuning & Permanent User Teaching Memory...\n")
        dyn_code = chat_bot.compute_adaptive_generation_params("Write custom Report syntax in TDL", {"confidence": 0.8})
        dyn_idea = chat_bot.compute_adaptive_generation_params("Suggest future architecture roadmap ideas", {"confidence": 0.3})
        assert dyn_code["temperature"] < dyn_idea["temperature"], "Adaptive temperature tuning failed!"
        
        test_rule = "TEST_RULE: Always prefix custom reports with TDL_"
        chat_bot.add_permanent_teaching(test_rule)
        loaded_rules = chat_bot.load_permanent_teachings()
        assert test_rule in loaded_rules, "Permanent teaching storage failed!"
        prompt = chat_bot.build_system_prompt("sample context")
        assert test_rule in prompt, "Permanent teaching not injected into Principal Engineer System Prompt!"
        log(f"      Adaptive code temp: {dyn_code['temperature']}, idea temp: {dyn_idea['temperature']}\n")
        log("      [PASS] Adaptive Generation Auto-Tuning & Permanent Teaching Memory tests passed!\n\n")

        log("=== ALL 10 ENTERPRISE TESTS PASSED SUCCESSFULLY ===\n")
        print("ALL TESTS PASSED")
    except Exception as e:
        log(f"\n[ERROR] Test suite failed: {e}\n")
        log(traceback.format_exc())
        print(f"TEST SUITE FAILED: {e}")
