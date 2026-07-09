---
title: Display HsnCode Of STockitem
type: sample_code
objects: Report, Form, Part, Line, Field, Collection
source: Display HsnCode Of STockitem.txt
---

# Display HsnCode Of STockitem

## Source Code

```tdl
[Collection:StkItem]
	Type		 : StockItem
	

[#Menu:Gateway Of Tally]
	Add		: Item		: DisplayItem	: Display	: StkItemDtls
	
[Report:StkItemDtls]
	Form		: StkItemDtls
	
[Form:StkItemDtls]
	Part		: StkItemDtls
	
[Part:StkItemDtls]
	Line		: StkItemDtls
	Repeat		: StkItemDtls		: StkItem
	[Line:StkItemDtls]
		Fields		: StkItemDtlsName, StkItemDtlsHsn
		
		[Field:StkItemDtlsName]
			Set as		: $name
			Width		: 30

		[Field:StkItemDtlsHsn]
			Set as		: $$String:@StockHsn +" + " + $$String:@GroupHsn; If $$IsEmpty:@StockHsn Then $$IsEmpty:@GroupHsn
			StockHsn	: $GSTHSNCode:Stockitem:#StkItemDtlsName
			ItemName	: $Parent:Stockitem:#StkItemDtlsName
			GroupHsn	: $(StockGroup,@ItemName).HsnDetails[Last].Hsncode


















```
