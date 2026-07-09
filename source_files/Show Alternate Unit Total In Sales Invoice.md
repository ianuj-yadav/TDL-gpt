---
title: Show Alternate Unit Total In Sales Invoice
type: sample_code
objects: Field
source: Show Alternate Unit Total In Sales Invoice.txt
---

# Show Alternate Unit Total In Sales Invoice

## Source Code

```tdl
[#Field: EI QtyTotal]
	Add	: Field	: After	: EI BilledQtyTotal 	: AltTotal

[Field:AltTotal]
	Use 		: Name Field
	Align 		: Right
	Width 		: @@VCHQtyWidth
	Style 		: Small Italic
	Set as 		: "( " + $$String:$AlternateTotal:Symbol,ShortForm,Secondary + " )"
	Set always 	: Yes
	Skip 		: Yes
	Inactive 	: $$IsEnd:$StockItemName OR @@NoAltUnits
	Border 		: Totals
	Color 		: Red


[System:Formula]
	AlternateTotal	: $$Owner:$$CollQtyTotal:InventoryEntries:$BilledQty
```
