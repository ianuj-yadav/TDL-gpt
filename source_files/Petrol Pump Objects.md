---
title: Petrol Pump Objects
type: sample_code
objects: Collection
source: Petrol Pump Objects.txt
---

# Petrol Pump Objects

## Source Code

```tdl
[Object:Tanks]
	Storage 	: CmpTankName		: String
	Storage 	: TankParent 		: String
	Storage 	: TankUnits 		: String
	Storage		: TankCapacity		: Number
[Collection:PetrolTanks]
	Type	: Tanks
	Title	: $$LocaleString:"List Of Tanks"
	
	



			

[Collection:PetrolPumpItems]
	Object		: PetrolPumpStockItems
	
[Object:PetrolPumpStockItems]
	Storage		: PetrolPumpStockItemsName		: String
	

```
