---
title: Sales Voucher Register
type: sample_code
objects: Report, Form, Part, Line, Field, Collection
source: Sales Voucher Register.txt
---

# Sales Voucher Register

## Source Code

```tdl

[#Menu: Gateway of Tally]
Add:Key Item:before: @1ocQuit:LearnwellSalesVCH:L: Display: LEARNWELLSalesReg
[Report: LEARNWELLSalesReg]
Title: "Learnwell Sales Vouchers"
Form :LWSalesForm
Variable :SvFromDate, SvToDate
Set :SvFromDate: @@DSPFromDate
Set: SvToDate: @@DSPToDate


[Form: LWSalesForm]
Button: ExportButton, MailButton, PrintButton
Bottom Toolbar Buttons: BottomToolBarBtnl, BottomToolBarBtns, BottomToolBarBtn9, BottomToolBarBtn10

Part : LWHeaderPartT, LWHeaderPart
Width : 100% Page
Height: 100% Page
Space Bottom: 0.50
Space Left: 0.50
Space Right: 0.50
Space Top:0.50
Vertical Align: center
Horizontal Align :Center
[Part: LWHeaderPartT]
Line:LWHeaderLine




[Line: LWHeaderLine]
Field: Name Field
Local: Field
Local: Field:Name Field: Set as: "Sales Vouchers" 
Local: Field:Name Field: Style: Large Bold
Local: Field:Name Field: Align: Center
 Local: Field:Name Field: Full Width: Yes
Local: Field :Name Field :Color: Blue
Local: Field :Name Field: Inactive: $$InExportMode 
Local: Field :Name Field: Skip: Yes
Space Bottom: 0.25 cm
[Part: LWHeaderPart]
Line :LWTitleline, LWDetailLine
Repeat: LWDetailLine: LearnwellSalesColl
Scroll: Both
Vertical: Yes
Common Border: yes
Float: No
Border :Thin Bottom
[Line: LWTitleline]
Field: LWVchType, LWVchNo, LWVchDt, LWRefNo, LWRefDT, LWPartyName
Right Field :LWBuyerState, LWBuyerGST, LWNarration, LWLedgerDet, LWLedgerAmt

Right Field: LWItemName, LWItemGodown, LWItemBatch, LWItemQTY, LWItemRate, LWItemTaxable, LWItemTaxableLd
Border: Totals



Local: Field: Default: Type: String 
Local :Field: Default: Align :Center 
Local :Field: Default: Border: Thin Left
Local :Field: Default: Style: Large Bold 
Local :Field: Default: Skip: Yes
Local :Field: Default: Line: 0
Local :Field: LWVchType: Set as : $$LocaleString:"Voucher Tpye"
Local :Field: LWVchNo: Set as :$$LocaleString:"Voucher Number" 
Local :Field: LWVchDt: Set as :$$LocaleString:"Voucher Date" 
Local :Field: LWRefNo: Set as :$$LocaleString:"Reference Number" 
Local :Field: LWRefDT: Set as : $$LocaleString:"Reference Date" 
Local :Field: LWPartyName: Set as :$$LocaleString:"Party Name" 
Local :Field: LWBuyerState: Set as: $$LocaleString:"State" 
Local : Field: LWBuyerGST: Set as: $$LocaleString:"GSTIN"
Local :Field: LWItemName: Set as:$$LocaleString:"Item Name" 
Local :Field: LWItemGodown: Set as:$$LocaleString:"Godown" 
Local :Field: LWItemBatch: Set as: $$LocaleString:"Batch" 
Local :Field: LWItemQTY: Set as:$$LocaleString:"Quantity"
  
Local :Field: LWItemRate: Set as : $$LocaleString:"Rate"
Local :Field: LWItemTaxable :Set as : $$LocaleString:"Taxable Value"
Local :Field: LWItemTaxableLd: Set as :$$LocaleString:"Taxable Ledger Name" 
Local :Field: LWLedgerDet: Set as : $$LocaleString:"AllLedger"

Local :Field: LWLedgerAmt: Set as :$$LocaleString:"AllLamt"
Local :Field: LWNarration: Set as: $$LocaleString:"Narration"



[Line: LWDetailLine]
Field: LWVchType, LWVchNo, LWVchDt, LWRefNo, LWRefDT, LWPartyName
Right Field: LWBuyerState, LWBuyerGST, LWNarration, LWLedgerDet, LWLedgerAmt
Right Field :LWItemName, LWItemGodown, LWItemBatch, LWItemQTY, LWItemRate, LWItemTaxable, LWItemTaxableLd 
Local :Field: Default: Style: Normal 
Explode:SLedDup_ReportsDescExp2:Yes 
Explode: SLedDup_ReportsDescExp1:Yes 
Border:Thin TopBottom

Option :Alter on Enter
[Part:SLedDup_ReportsDescExp1]
Line : SLedDupReportsDescExpl
Repeat: SLedDupReportsDescExpl: InventoryEntries
[Line: SLedDupReportsDescExpl]
Field: LWVchType, LWVchNo, LWVchDt, LWRefNo, LWRefDT, LWPartyName

Right Field: LWBuyerState, LWBuyerGST, LWNarration, LWLedgerDet, LWLedgerAmt

Right Field: LWItemName, LWItemGodown, LWItemBatch, LWItemQTY, LWItemRate, LWItemTaxable, LWItemTaxableLd
Local :Field: Default: Type: String
Local: Field: Default: Align: Center
Local: Field: Default: Border: Thin Left

Local :Field: Default: Line: 1
Local: Field: Default: Skip: Yes
Local: Field: LWVchType: Set as :$VoucherTypeName 
Local :Field: LWVchNo :Set as :$VoucherNumber
Local: Field: LWVchDt: Set as :$Date
Local :Field: LWRefNo : Set as :$Reference 
Local :Field: LWRefDT: Set as :$ReferenceDate 
Local :Field: LWPartyName: Set as :$PartyName 
Local :Field: LWBuyerState: Set as :$StateName 
Local :Field: LWBuyerGST: Set as :$PartyGSTIN 
Local :Field: LWNarration: Set as :$Narration 
Local :Field: LWItemName : Set as :$StockItemName 
Local: Field: LWItemGodown: Set as :$GodownName 
Local: Field: LWItemBatch :Set as :$BatchName
 Local: Field: LWItemQTY: Set as :$BilledQty 
 Local :Field: LWItemRate: Set as :$BatchRate 
 Local: Field: LWItemTaxable: Set as :$Amount
Local: Field: LWItemTaxableLd: Set as :$AllInventoryEntries.AccountingAllocations.LedgerName
[Field: LWItemName]
Use: Name Field
Set as :""
Width: 20
Align: Center
[Field: LWItemGodown] 
	Use :Name Field
Set as :""
Width: 15
[Field: LWItemBatch] 
	Use: Name Field 
	Set as :""
Width : 8
Align:Center
[Field: LWItemQTY]
Use :Rate Units Field 
Set as :""
Width: 8
Align :Center
[Field: LWItemRate]
Use :Rate Units Field
Set as :""
Width: 15
[Field: LWItemTaxable]
Use :Name Field
 Set as :""
Width: 20
[Field: LWItemTaxableLd]
Use :Name Field
Set as :""
Width: 15
[Field: LWNarration]
Use :Name Field
Set as :""
Width: 15


[Field :LWVchType]
	Use:Name Field
Set as :""
Width : 8
Alter: VOUCHER
[Field: LWVchNo]
Use: Name Field
Set as :""
Full Width: Yes
[Field: LWVchDt]
Use: Uni Date Field
Set as: ""
width: 15
[Field: LWRefNo]
Use :Name Field
Set as : ""
width: 15
Align :Center






[Field: LWRefDT]
Use: Uni Date Field
 Set as: ""
Full Width: Yes
[Field: LWPartyName]
Use: Name Field 
Set as: ""
Width : 15
[Field: LWBuyerState]
Use :Name Field 
Set as: ""
width: 8
Align :Center
[Field: LWBuyerGST]
Use :Name Field
 Set as: ""
Width: 20
Format: "NoZero"
Align: Center



[Field: LWLedgerDet]
Use: Name Field
 Set as :""
Width: 20
Align :Center
[Field: LWLedgerAmt]
	Use :Amount Field
Set as :""
Width: 20
Align : Center
Format	: "DrCr"
[Part: SLedDup_ReportsDescExp2]
Line : SLedDup_ReportsDescExp2
Repeat: SLedDup_ReportsDescExp2: LedgerEntries
[Line: SLedDup_ReportsDescExp2]
Field: LWVchType, LWVchNo, LWVchDt, LWRefNo, LWRefDT, LWPartyName
Right Field: LWBuyerState, LWBuyerGST, LWNarration, LWLedgerDet, LWLedgerAmt
Right Field: LWItemName, LWItemGodown, LWItemBatch, LWItemQTY, LWItemRate, LWItemTaxable, LWItemTaxableLd
Local :Field: Default: Type: String
Local: Field: Default: Align: Center
Local :Field: Default: Border: Thin Left
Local:Field: Default: Line: 1
Local: Field: Default: Skip: Yes
Local:Field: LWVchType: Set as :$VoucherTypeName 
Local: Field: LWVchNo: Set as :$VoucherNumber 
Local :Field: LWVchDt: Set as :$Date
Local :Field: LWRefNo: Set as :$Reference 
Local: Field: LWRefDT: Set as :$ReferenceDate
 Local: Field: LWPartyName: Set as :$PartyName 
 Local: Field: LWBuyerState: Set as :$StateName 
 Local: Field: LWBuyerGST: Set as :$PartyGSTIN 
 Local: Field: LWNarration: Set as: $Narration
 Local: Field: LWLedgerDet: Set as :$LedgerName

Local :Field: LWLedgerAmt: Set as :if $$IsDr:$Amount Then $Amount else $Amount





[Collection: LearnwellSalesColl] 
	Title		: "Voucher"
	Type		: Vouchers: VoucherType
	Fetch		: '*',VoucherNumber, VoucherDate, Reference ,ReferenceDate, PartyName, BasicBuyerName, BasicBuyerAddress, PartyAddress, StateName, CountryofResidence, ;PartyGST: 
	Fetch		: ConsigneeStateName, ConsigneeGSTIn, Narration
	Fetch		: InventoryEntries.StockItemName
	Child Of	: $$VchTypeSales




```
