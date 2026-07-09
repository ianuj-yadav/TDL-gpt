---
title: Petrol Tank Creation
type: sample_code
objects: Report, Form, Part, Line, Field, Collection
source: Petrol Tank Creation.txt
---

# Petrol Tank Creation

## Source Code

```tdl
[#Menu:Gateway Of Tally]
	Add		: Item		: PetrolPumpItems	: Create	: PetrolPumpItemsCreation
[Report:PetrolPumpItemsCreation]
	Title	: "Item Name Creation"
	Form	: PetrolPumpItemsCreation
	
[Form:PetrolPumpItemsCreation]
	Part	: PetrolPumpItemsCreation
	
[Part:PetrolPumpItemsCreation]
	Lines		: PetrolPumpItemsTitle, PetrolPumpItemsBody
	Repeat		: PetrolPumpItemsBody		: PetrolPumpItemName
	Scroll		: Vertical
	Break On	: $$IsEmpty:$PetrolPumpItemName  ;; If it is not given repetition never start because it has no end point
	
	[Line:PetrolPumpItemsTitle]
		Use	: PetrolPumpItemsBody
		Local	: Field	: Default	: Type	: String
		Local	: Field	: Default	: Line	: 0
		Local	: Field	: Default	: Align	: Center
		Local	: Field	: Default	: Style	: Normal Bold
		Local	: Field	: Default	: Delete: Storage
		
		Local	: Field	: PetrolPumpItemName	: Info		: "Name of Tank"
		Local	: Field	: PetrolPumpItemName	: Border	: Thin Bottom
		
		Space Bottom	: 1

	[Line:PetrolPumpItemsBody]
		Field	: PetrolPumpItemName
		[Field:PetrolPumpItemName]
			Type	: String
			Width	: 30
			Max		: 251
			Storage	: PetrolPumpItemName
			Case	: First Upper Case
			Unique	: Yes
			
			

[System:UDF]
	PetrolPumpItemName : String	: 20001
			

[Collection:TankNameCollection]
	
	Title		: "List Of Items"
	Type		: PetrolPumpItemName	: Company
	Child Of	: ##SVCurrentCompany
	Format		: $PetrolPumpItemName, 20
	Sub Title	: "Name"
	Unique		: $PetrolPumpItemName;, $AgentName

```
