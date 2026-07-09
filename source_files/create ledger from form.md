---
title: create ledger from form
type: sample_code
objects: Report, Form, Part, Line, Field, Collection, Function
source: create ledger from form.txt
---

# create ledger from form

## Source Code

```tdl
[#Menu:Gateway of tally]
	Add		: Item		: Create Ledger	: Alter		: CreateLedger

[Report:CreateLedger]
	Form		: CreateLedger
	Object		: Company
[Form:CreateLedger]
	Part			: CreateLedger
	Width 			: 100% Page
	Height			: 100% Page
	Space Left		: 0.25
	Space Right		: 0.25
	Horizontal Align: Left
	On 				: Form Accept		: yes	: Form Accept
	On 				: Form Accept		: yes	: Call		: CreateLedgerFunction
[Part:CreateLedger]
	Lines		: CreateLedgerTitle, CreateLedgerBody
	Repeat			: CreateLedgerBody	: CreateLedgerColl
	Scroll			: Vertical
	Common Border	: Yes
	Break On		: $$IsEmpty:#CreateLedgerName
	[Line:CreateLedgerTitle]
		Use		: CreateLedgerBody
		Border	: Thick Bottom
		Local	: Field		: Default		: Type		: String
		Local	: Field		: Default		: Style		: Normal Bold
		Local	: Field		: Default		: Align		: Center
		Local	: Field		: Default		: Skip		: Yes
		
		Local	: Field		: CreateLedgerSrNo		: Set as	: "Sr No."
		Local	: Field		: CreateLedgerName		: Set as	: "Name"
		Local	: Field		: CreateLedgerParent	: Set as	: "Group"
		Local	: Field		: CreateLedgerCountry	: Set as	: "Country"
		Local	: Field		: CreateLedgerState		: Set as	: "State"
		Local	: Field		: CreateLedgerOpBal		: Set as	: "OpeningBalance"
		
		
		
	[Line:CreateLedgerBody]
		Field		: CreateLedgerSrNo, CreateLedgerName, CreateLedgerParent, CreateLedgerCountry, CreateLedgerState, CreateLedgerOpBal
		
		[Field:CreateLedgerSrNo]
			Use			: Number Field
			Set as		: $$Line
			Width 		: 5
			Border		: Thin right
			Skip		: Yes
			
		
		[Field:CreateLedgerName]
			Use			: Name Field
			Storage		: CreateLedgerName
			
			
		[Field:CreateLedgerParent]
			Use			: Name Field
			Border		: Thin Left Right
			Inactive	: $$IsEmpty:#CreateLedgerName
			Storage		: CreateLedgerParent
			Table		: Group
			Show Table	: Always
			
		[Field:CreateLedgerCountry]
			Use			: Name Field   
			Inactive	: $$IsEmpty:#CreateLedgerName
			Storage		: CreateLedgerCountry
			;Table		: List Of Countries
			;Show Table	: Always
			Set as		: "India"
			Skip		: Yes
			Width		: 15
			Border		: Thin Right
			
		[Field:CreateLedgerState]
			Use			: Name Field   
			Inactive	: $$IsEmpty:#CreateLedgerName
			Storage		: CreateLedgerState
			Table		: Indian States
			Show Table	: Always
			Width		: 15
			
		[Field:CreateLedgerOpBal]
			Use			: Name Field   
			Inactive	: $$IsEmpty:#CreateLedgerName
			Storage		: CreateLedgerOpbal
			Border		: Thin Left
			
[Collection: CreateLedgerColl]
	Title		: "Bulk Ledger Entry"
	Type		: CreateLedgerEntry		: Company
	Child of 	: ##SVCurrentCompany
	
[System:Udf]
	CreateLedgerEntry		: Aggregate		: 15001
	CreateLedgerName		: String		: 15002
	CreateLedgerParent		: String		: 15003
	CreateLedgerCountry		: String		: 15006
	CreateLedgerState		: String		: 15004
	CreateLedgerOpbal		: String		: 16005
	
[Function:CreateLedgerFunction]
	Variable 		: NewLedgerName		: String
	Variable		: NewLedgerParent	: String 
	Variable		: NewLedgerCountry	: String 
	Variable		: NewLedgerState	: String 
	Variable		: NewLedgerOpBAl	: Amount
	Variable 		: CountLedger		: Number	: 1
	001: Start Batch Post	: 10
	005: START PROGRESS		: ($$NumItems:CreateLedgerColl): "In process" : @@CmpMailName: "Ledger Creation in Process" 
	007: WALK COLLECTION	: CreateLedgerColl
	010: SET	: NewLedgerName 	: $CreateLedgerName
	020: SET	: NewLedgerParent	: $CreateLedgerParent 
	030: SET	: NewLedgerState	: $CreateLedgerState 
	040: SET	: NewLedgerOpBAl	: $$AsAmount:$CreateLedgerOpbal 
	060: NEW OBJECT	: Ledger
	070: SET VALUE	: Name 	: ##NewLedgerName
	075: Log		: $Name
	080: SET VALUE	: Parent 		: ##NewLedgerParent
	085: Log		: $Parent
	089: Set Value	: CountryofResidence	: "India"
	090: SET VALUE	: PriorStateName 		: ##NewLedgerState
	095: Log		: $PriorStateName
	100: SET VALUE	: OpeningBalance	: ##NewLedgerOpBAl
	105: Log		: $OpeningBalance
	110: SET VALUE	: CountryofResidence	: ##NewLedgerCountry
	115: Log		: $CountryofResidence
	220: CREATE TARGET
	230: INCREMENT	: CountLedger
	230a: SHOW PROGRESS	: ##CountLedger
	240: END WALK
	260: END PROGRESS
	280: RETURN
	290: End Batch Post






















































```
