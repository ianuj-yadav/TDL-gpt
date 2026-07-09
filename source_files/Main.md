---
title: Main
type: sample_code
objects: Menu
source: Main.txt
---

# Main

## Source Code

```tdl
[Include:Display StockItem Details.txt]
[Include:Display StockItem Batch Details.txt]
[Include:Displaying Data.txt]
[Include:Display All Items.txt]
[Include:Agent List.txt]
[Include:Voucher Details.txt]
[Include:Child of.txt]
[Include:Listing Ledgers.txt]
[Include:Show Gst In Stock Summary.txt]
[Include:Agent Show Form.txt]



[#Menu:Gateway Of Tally]
	Add	: Key Item	: Before	: @@LocQuit	: Display StockItem Details	: M	: Menu	: Object And Collections
	

[Menu:Object And Collections]
	Key Item	:Display StockItem Details		: D	: Display	: Display StockItem Details
	Key Item	:Display StockItem Batch Details: B	: Display	: Display StockItem Batch Details
	Key Item	:Displaying Data				: M	: Display	: Displaying Data
	Key Item	:Display All Items				: I	: Display	: Display All Items
	Key Item	:Agent List						: A	: Display	: Agent List
	Key Item	:Voucher Details				: V	: Display	: Voucher Details
	Item		: Child of							:Display	: Child of
	Item		: Agent Show form					:Display	: Agent Show Form Of Company
	

[#Menu:Display Menu]
	Add	:Key Item	: Before	: @@LocQuit 	: Display Ledgers	: L	: Menu	: Action In TDL
	
[Menu:Action In TDL]
	Key Item	: Ledgers List	: L	: Display Collection	: Ledgers List Collection
```
