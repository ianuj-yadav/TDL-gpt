---
title: Form Accept
type: sample_code
objects: Report, Form, Part, Line, Field, Function
source: Form Accept.txt
---

# Form Accept

## Source Code

```tdl
[Report:EventsInTDL]
	Title		: "Create Ledger"
	Form		: EventsInTDL
	
[Form:EventsInTDL]
	Parts		: CreateLedgerPart
	Height		: 50% Page
	Width		: 50% Page
	
	Option		: Small Size Form	: Yes
	
	On 			: Form Accept	: Yes	: Call	: FormAcceptCreateLedgerFunction:#LedgerNameCreate:#LedgerParentCreate
	
[Part:CreateLedgerPart]
	Line	: FormSubTitle, LedgerNameCreate, LedgerParentCreate
	Local	: Field	: FormSubTitle	: Info	: $$LocaleString:"Create Ledger"
	
	[Line:LedgerNameCreate]
		Fields		: LongPrompt, LedgerNameCreate
		Local		: Field	: LongPrompt	: Info	: $$LocaleString:"Ledger Name"
		[Field:LedgerNameCreate]
			Use		: Name Field
			
	[Line:LedgerParentCreate]
		Fields		: LongPrompt, LedgerParentCreate
		Local		: Field	: LongPrompt	: Info	: $$LocaleString:"Ledger Name"
		[Field:LedgerParentCreate]
			Use			: Name Field
			Table		: Group
			Show Table	: Always
			
[Function:FormAcceptCreateLedgerFunction]
	Parameter	: LedgerName	: String
	Parameter	: LedgerParent	: String
	
	000	: New Object	: Ledger
	005	: Set Value		: Name		: ##LedgerName
	010	: Set Value		: Parent	: ##LedgerParent
	015	: Accept Alter













```
