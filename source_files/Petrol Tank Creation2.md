---
title: Petrol Tank Creation2
type: sample_code
objects: Report, Collection
source: Petrol Tank Creation2.txt
---

# Petrol Tank Creation2

## Source Code

```tdl
[#Menu:Gateway Of Tally]
	Add		: Key Item	: Petrol Tank Creation		: P	: Create	: PetrolTank
	
[Report:PetrolTank]
	Form		: PetrolTank
	Object		: PetrolTankDtls
	


[Collection:PetrolTankDtlsColl]
	Title		: "List of Tanks"
	Type		: PetrolTankDtls		: Company
	Child Of	: ##SVCurrentCompany
	Format		: $AgentName, 30 ;;(30 shows the width of collection)
```
