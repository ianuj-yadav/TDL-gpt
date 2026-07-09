---
title: Add Discount VAlue in voucher
type: sample_code
objects: Field
source: Add Discount VAlue in voucher.txt
---

# Add Discount VAlue in voucher

## Source Code

```tdl
[#Part: EI InvInfo]
	Background	: Red
	;Total		: DiscValue
[#Line: EI ColumnOne]
	Add:Right Field:After:VCH DiscTitle:Disc ValueTitle
	[Field:Disc ValueTitle]
		Set as	: "Disc VAlue"
		Style	: Normal Bold
		Skip	: Yes
		Width	: 10


[#Line:Ei invinfo]
	Add:Right Field:After	: VCH Discount 		: DiscValue
	
	[Field:DiscValue]
		Use			: Amount Forex Field
		Set As   	: If (@@NoBaseUnits OR $$IsEmpty:$BilledQty) then $$Value else (($Rate * $BilledQty * $Discount) / 100)
		Width       : @@VCHAmountWidth
		Storage     : DiscountValue
		Set always  : Yes
		;Inactive    : $$IsSysName:#VchStockItem
		
		Align		: Right
		Border		: Thin Left
		;BatchTotal  : $$CollAmtTotal:BatchAllocations:$DiscountValue
	

		;;Set as      : $$Total:VCHValue
		;[Field: EI ValueSubTotal]
		
[#Line: EI InvSubTotal]
	Add		: Right Fields: Before	: EI ValueSubTotal	: EI DiscSubTotal
	[Field:EI DiscSubTotal]
		Type		: Amount
		Read Only	: Yes
		Width       : 10
		;Set as      : $$Total:DiscValue
		Set as		: $$CollAmtTotal:InventoryEntries:$DiscountValue
;		VchTotalValue   	: $$Total:DiscValue
;		EmptyVchValue 		: $$IsEmpty:$$Total:DiscValue
		Background	: REd
		;Skip		: Yes
		Set Always	: Yes
[#Field: EI QtyTotal]
	Add		: Field		: Before	: EiBilledQtyTotal : DiscValue1
	Background:Red
	[Field:DiscValue1]
		Read Only	: Yes
		Width       : 10
		Set as      : $$Total:DiscValue
		;Set as      : $$Total:vchValue
;		VchTotalValue   	: $$Total:DiscValue
;		EmptyVchValue 		: $$IsEmpty:$$Total:DiscValue
		Background	: REd
		;Skip		: Yes]
	

[System:UDF]
	DiscountValue:Amount:20333
	


```
