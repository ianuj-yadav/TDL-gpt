---
title: show Gst Percent
type: sample_code
objects: Report, Form, Part, Line, Field, Collection
source: show Gst Percent.txt
---

# show Gst Percent

## Source Code

```tdl
[Collection:GstPercentInLedgerEntries]
	Walk                : Inventory Entries
;	By                  : StockItemName         : $StockItemName
;	Compute             : ParentGroupName       : $Parent:StockItem:$StockItemName
;	Compute				: ExtractMode			: ##ExtractMode
;	Compute				: VoucherTypeName		: ##VoucherTypeName
;	
[Object:GstPercent1]
	Name		: $GstPercent
	
[Collection: Vouchers Collection]

	Type : Voucher 
	







[System:Formulae]
	VaaraFilter	:  ( $$IsEqual:($$String:#VaaraInvNo):($$String:$VchNumber1))
;By : ValMasterID: $MasterID
;Source Fetch      : $GstPercent
;By : valStockItemName : $StockItemName
;By: VchNumber1:$VoucherNumber



;Fetch: date,VoucherNumber,PartyLedgerName

;; In the Part, Repeat the Line over - My Repeat Coll Collection

;; In the field use - $valStockItemName, $ValBilledQty,$ValAmount , $date,$VoucherNumber,$PartyLedgerName

;; For Rate --> $ValAmount / $ValBilledQty


[Collection : Summary Collection]

	Source Collection : Vouchers Collection
	;Type : Voucher 
	Walk         :  Inventory Entries
	By           : GstPercent1 : $GstPercent
	
	
;	By			: 

	
	
/*
	Type		: Voucher Type
	Child Of	: "Sales"
	Belongs To	: Yes
	By			: Sales
	
	*/
[#Menu:Gateway OF tally]
	Add		: Item	: GstPercentPart		: Display	: GstPercentPart
	;Add		: Item	: Product Wise report 	: Display	: ProductwiseRpt ;
[Report:GstPercentPart]
	Form		: GstPercentPart
	
[Form:GstPercentPart]
	Part	: GstPercentPart
[Part:GstPercentPart]
	Line	: GstPercentPart
	Repeat	: GstPercentPart	: HsnVaara;SalesmanColl;HsnVaara;Summary Collection; GstPercentInLedgerEntries
	Scroll	: Vertical
	[Line:GstPercentPart]
		
		
		Field	: LineNo, GstPercentPart, Hsn code
		[Field:LineNo]
			Set as		: $$Line
			Width		: 10
		[Field:GstPercentPart]
			Use			:  Short Name Field
			Width		: 10
			Border		: Thin Left Right
			Set as		:	 $$FullList:CompanyAddress:$Address;$$FullList:Address:$Address;:##SvCurrentCompany 
			Format		: 20
			Line		: 0
		[Field:Hsn Code]
			Set as		: $Hsncode
			Width		: 20
			

	

[Collection:SalesmanColl]
	Type	: UdfSminfo		: Company
	Child Of	:##SvCurrentCompany
	Title		: "List Of SalesMan"
	Format		: $UdfSmNAme


[Collection:Hsncodevaara]
	Type	: Company
	
[Collection:HsnVaara]
	Source Collection	: Hsncodevaara
	Walk				: HsnDetails
	Fetch				: Hsncode, Hsn
	





/*
Button		: Print Button, Export Button, Mail Button
At line level we use explode like below

[Line:''''']
	Explode		: LedgerPart(part)	: Yes
	Remove if	: $$NumChildren=0 ; It prevent the groups that do not have sub groups
	REmove If 	: ($$NumItems:MyLedgerColl=0) ; It prevent the groups having no chilren or having no ledger
	
	
Variable : ExplodeFlag
Button		: Explodeflag
*/





```
