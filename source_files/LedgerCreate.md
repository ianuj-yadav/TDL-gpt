---
title: LedgerCreate
type: sample_code
objects: Report, Form, Part, Line, Field
source: LedgerCreate.txt
---

# LedgerCreate

## Source Code

```tdl
[Report:LedgerCreate]
	Form		: LedgerCreate
	Object		: Ledger
	
[Form:LedgerCreate]
	Part		: LedgerCreate
	Width		: 50% Page
	Height		: 50% Page
[Part:LedgerCreate]
	Line		: Ledgercreate, LedgerNameCreate, LedgerParentCreate, LedgerGstCreate
	
	[Line:Ledgercreate]
		Field	: Ledgercreate
		Space Bottom	: 2
		[Field:Ledgercreate]
			Info		: "Create New Ledger"
			Style		: Normal Bold
			Align		: Center
			Full Width	: Yes
	
	[Line:LedgerNameCreate]
		Field	: Long Prompt, LedgerNameCreate
		Local	: Field	: Long Prompt	: Info	: "Enter Name of New Ledger"
		
		[Field:LedgerNameCreate]
			Use		: NameField
			Storage	: Name
			
	[Line:LedgerParentCreate]
		Field	: Long Prompt, LedgerParentCreate
		Local	: Field	: Long Prompt	: Info	: "Enter Group of New Ledger"
		
		[Field:LedgerParentCreate]
			Use			: NameField
			Storage		: Parent
			Table		: Group
			Show Table	: Always
			
	[Line:LedgerGstCreate]
		Field	: Long Prompt, LedgerGstCreate
		Local	: Field	: Long Prompt	: Info	: "Gst Applicable"
		
		[Field:LedgerGstCreate]
			Use			: NameField
			Storage		: GSTApplicable
			Table		: GSTApplicable
			Show Table	: Always
			Width		: 20
			


			
	
```
