---
title: Petrol Tank Report
type: sample_code
objects: Report, Form, Part, Line, Field
source: Petrol Tank Report.txt
---

# Petrol Tank Report

## Source Code

```tdl
[Report:PetrolTanks]
	Title	: $$LocaleString:"Tank" + @@ModeName + @@SubModeName
	Form	: TankNameCreation
	Object	: Tanks		: #TankName
	
	
[Form:TankNameCreation]
	Part			: TankNameCreation
	Space Top       : 0.5
    Space Bottom    : 0.5
    Space Left      : 0.5
    Space Right     : 0.5

    Horizontal Align: Left
    Vertical Align  : Top
	On    	: Form Accept    	: Yes    	: Form Accept
	On		: Form Accept		: Yes		: Call		: CreateTankObject:#TankName:#TankUnder:#TankUnits
	
[Part:TankNameCreation]
	Parts		: TankNameDetails;, TankCapacityDetails
	Vertical	: Yes
	
[Part:TankNameDetails]
	Lines	: TankName, TankUnder, TankUnits, 
	
	[Line:TankName]
		Field	: Mediumprompt, TankName
		Local	: Field		: MediumPrompt	: Info		: $$LocaleString:"Tank Name"
		[Field:TankName]
			Type	: String
			Width	: 30
			Max		: 251
			Storage	: CmpTankName
			Case	: Title Case
			Unique	: Yes
			
	[Line:TankUnder]
		Field	: Mediumprompt, TankUnder
		Local	: Field		: MediumPrompt	: Info		: $$LocaleString:"Under"
		[Field:TankUnder]
			Type	: String
			Width	: 30
			Max		: 251
			Storage	: TankParent
			Unique	: Yes
			
	[Line:TankUnits]
		Field	: Mediumprompt, TankUnits
		Local	: Field		: MediumPrompt	: Info		: $$LocaleString:"Units"
		[Field:TankUnits]
			Use         : Symbol Field
			Use			: Create Unit
			Width       : @@CompoundSymWidth
			Max         : @@MaxSymWidth
			Storage     : TankUnits
			Table       : Unit, Not Applicable, Create Master
			Show Table  : Always
			Key         : Create Units, Alter Unit
			Variable    : SV Unit
			Set as      : if $$InAlterMode  then $$Value else if $$IsSysName:$BaseUnits:StockGroup:$Parent then $$Value +
						else $BaseUnits:StockGroup:$Parent
			Set always  : Yes
			Skip on     : $$InAlterMode AND NOT $$CanDelete
			Common Table: No
			
[Part:TankCapacityDetails]
	Border		: Thick Top
	Lines		: TankUseFor, TankCapacity, TankOpening
	
			
			

			


	



```
