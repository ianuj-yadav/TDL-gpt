---
title: Voucher Main
type: sample_code
objects: Collection
source: Voucher Main.txt
---

# Voucher Main

## Source Code

```tdl
[Include:NewDayBook.txt]
[Include:Employee Table.txt]


[#Menu:Gateway Of Tally]
	Add		: Item		: Voucher Day Book		: Display	: NewDayBook
	Add		: Item		: Employee Table		: Display	: EmployeeTable
	



[Collection:SalesCollection]
	Type		: Vouchers 	: Voucher Type
	Child of 	: $$VchTypeSales
	Belongs to 	: Yes
	



[Collection:InventoryVoucherTirlok]
	Type	: Vouchers	: VoucherType
	Child Of	: $$VchTypeSales
	Belongs To	: Yes
	
[Collection:InventoryVoucherTirlok1]
	Source Collection	: InventoryVoucherTirlok
	Walk				: Inventory Entries
	
[Collection:InventoryVoucherTirlok2]
	Source Collection	: InventoryVoucherTirlok1
	Walk				: Additional Details
	

```
