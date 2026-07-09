---
title: PetrolPumpItems
type: sample_code
objects: Report, Form, Part, Line, Field, Collection
source: PetrolPumpItems.txt
---

# PetrolPumpItems

## Source Code

```tdl
[Report:PetrolPumpItems]
	Form			: PetrolPumpItems
	
	Title	: "Petrol Pump Items Creation"
	;Object	: Company	: ##SVCurrentCompany
	Family	: "Petrol Master"
	
[Form:PetrolPumpItems]
	Part				: PetrolPumpItemsDetailsCreation
	Vertical Align		: Top
	Horizontal Align	: Center
	Background			: Very Light Magenta
	
[Part:PetrolPumpItemsDetailsCreation]
	Line		: PetrolPumpItemsDtlsTitle, PetrolPumpItemsName,; PetrolPumpItemsUnit
;	Repeat		: AgentDtlsBody	: AgentDtls ;; AgentDtls is an aggregate UDF which is defined below
;	Scroll		: Vertical
;	Break On	: $$IsEndOfList:$AgentName ;; End of list is a default collection
;					;; By above code the cursor go another fields after we select end of list in agent name
;					;; So we have to write skip conditions in other fields as given 
;	
;	Common Border	: Yes
	[Line:PetrolPumpItemsDtlsTitle]
		Field		: PetrolPumpItemsDtlsTitle
		Border	: Thin Bottom
		
		Space Bottom	: 1
		[Field:PetrolPumpItemsDtlsTitle]
			Info		: "Item Details "
;		Use		: AgentDtlsBody
;		
;		Local	: Field	: Default	: Type	: String
;		Local	: Field	: Default	: Line	: 0
;		Local	: Field	: Default	: Align	: Center
;		Local	: Field	: Default	: Style	: Normal Bold
;		Local	: Field	: Default	: Delete: Storage
;		
;		Local	: Field	: AgentName	: Info	: "Name"
;		Local	: Field	: AgentDOJ	: Info	: "Date Of Joining"
;		Local	: Field	: AgentComm	: Info	: "Commission (%)"
		
		
	[Line:PetrolPumpItemsName]
		
		Fields		: LongPrompt,PetrolPumpItemsName; AgentName, AgentDOJ, AgentComm
		Local		: Field		: LongPrompt	: Info	: "Name"
		[Field:PetrolPumpItemsName]
			Use			: Name Field
			Storage		: $ItemName
			Width		: 25
			Max			: 251
		
	[Line:PetrolPumpItemsUnit]
		
		Fields		: LongPrompt,PetrolPumpItemsUnit; AgentName, AgentDOJ, AgentComm
		Local		: Field		: LongPrompt	: Info	: "Unit"
		[Field:PetrolPumpItemsUnit]
;			Use         : Symbol Field
;			Use			: Create Unit
;			Width       : @@CompoundSymWidth
;			Max         : @@MaxSymWidth
			Storage     : ItemUnit
;			Table       : Unit, Not Applicable, Create Master
;			Show Table  : Always
;			Key         : Create Units, Alter Unit
;			Variable    : SV Unit
;			Set as      : if $$InAlterMode  then $$Value else if $$IsSysName:$BaseUnits:StockGroup:$Parent then $$Value +
;						else $BaseUnits:StockGroup:$Parent
;			Set always  : Yes
;			Skip on     : $$InAlterMode AND NOT $$CanDelete
;			Common Table: No
		


[System:UDF]
	
	ItemDtls	: Aggregate		: 20007
	ItemName	: String		: 20004
	ItemUnit	: String			: 20005
	

[System:Formula]
	


[Collection:PetrolItemDtlsColl]
	Title		: "List of All Items"
	Type		: ItemDtls		: Company
	Child Of	: ##SVCurrentCompany
	Format		: $ItemName, 30 ;;(30 shows the width of collection)

```
