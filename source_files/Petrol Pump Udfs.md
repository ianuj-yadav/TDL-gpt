---
title: Petrol Pump Udfs
type: sample_code
objects: 
source: Petrol Pump Udfs.txt
---

# Petrol Pump Udfs

## Source Code

```tdl
[System: Formula]
	IsSalesItem		: @@IsSales And ##VoucherMode="Item Invoice"
	

[System: Udf]
	OpeningStockPetrol		: Quantity			: 15001
	ClosingStockPetrol		: Quantity			: 15002
```
