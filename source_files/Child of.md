---
title: Child of
type: sample_code
objects: Report, Form, Part, Line, Field, Collection
source: Child of.txt
---

# Child of

## Source Code

```tdl
[Report:Child of]
	Title	: Child of
	Form	: Child of
	
[Form:Child Of]
	Part	: Child of
	
[Part:Child of]
	Line	: Child of
	Repeat	: Child of	: Child of example
	;Repeat	: Child of	: Groupandledger
	Scroll	: VErtical
	[Line:Child of]
		Field	: Medium Prompt, Child of		
		Local	: Field	: Medium Prompt		: Set as	: $Name
		[Field:Child of]
			Set as	: $parent
		
[Collection : Groupandledger]

	Collections : Group, Ledger
[Collection:Child of example]
	Type		: Ledger
	Child Of	: $$GroupSundryDebtors
	Belongs To	: No
	Filter		: NameFormula ;;Filter attribute contains a formula that is defined in the system as shown below.
	
[System:Formula]	
	NameFormula	: $Name contains "ket"
```
