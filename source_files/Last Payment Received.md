---
title: Last Payment Received
type: sample_code
objects: Report, Form, Part, Line, Field, Collection
source: Last Payment Received.txt
---

# Last Payment Received

## Source Code

```tdl
[#Menu:Gateway of Tally]
	Add: Key Item: At End: Partywise Weekly Report : Y : Display : CAB Ledger List : $$IsInventoryOn:$$CurrentCompany

[Report: CAB Ledger List]
	Form : CAB Ledger Form
	Title : "Company Ledger List"

[Form: CAB Ledger Form]
	Use : DSP Template
	Parts : CAB Ledger Part
	Bottom Part	: AllInOne
	Height : 50% screen
	Width : 100% screen
	Background : Leaf Green

[Part: CAB Ledger Part]
	Lines : CAB Ledger Title, CAB Ledger Line
	Repeat : CAB Ledger Line : CAB My Ledgers
	Background : White
	Scroll : Vertical

[Line: CAB Ledger Title]
	Use : CAB Ledger Line
	Local : Field : Default : Type : String
	Local : Field : Default : Align : Centre
	Local : Field : Default : Style : Normal Bold
	Local : Field : CAB Led No : Set as : "Sr. No"
	Local : Field : CAB Led Name : Set as : "Ledger Name"
	Local : Field : CAB Led Name : Align : Left
	Local : Field : CAB Led Sales: Set as : "Sales"
	Local : Field : CAB Led Receipt : Set as : "Receipt"
	Local : Field : CAB Last Receipt: Set as : "Last Receipt"
	Border : Thin Top Bottom

[Line: CAB Ledger Line]
	Fields : CAB Led No, CAB Led Name, CAB Led Sales, CAB Led Receipt, CAB Last Receipt;, CAB Led Cont,total Bill Value
	Option : AlterOnEnter
	Local:Field:default:Style: Large Bold

[Field: CAB Led No]
	Set as : $$Line
	Width : 5
	Align : Centre
	Alter : Ledger
	
[Field: CAB Led Name]
	Set as : $Name
	Full Width: Yes

[Field: CAB Led Sales]
	Use : Name Field;AMount Forex field
	Set as : $LedgerSalesTotal
	Width : 15

[Field: CAB Led Receipt]
	Use : Amount forex Field
	Set as :$LedgerReceiptTotals
	Width : 15

[Field: CAB Last Receipt]
	Use : Uni Date Field
	Set as :$LastRecdate;$LedgerLastreceiptdate
	Width : 15
	
[Part:AllinOne]
	Line	: AllinOne
	Repeat	: AllinOne	: My Receipt Vouchers
	
	[Line:AllinOne]
		Fields	: AllinOne1, AllinOne2, AllinOne3, AllinOne4
		[Field:AllinOne1]
			Set as	: $PartyLedgerName
			Width	: 30
		[Field:AllinOne2]
			Set as	: $Amount
			Width	: 15
		[Field:AllinOne3]
			Set as	: $Date
			Width	: 10
		[Field:AllinOne4]
			Set as	: $VoucherNumber
			Width	: 10


;;;;RECEIPT COLL;;;;;;;;;;
[System:Formulas]
	MyfltrTds:$IsTDSApplicable="Yes";if $$IsSysName:##Myvariable then yes Else ##Myvariable = $agentname
[System : Formula]
	MyPartyFltr : $PartyLedgerName = #CabLedName
	LastRecdate: $$CollectionField:$Date:1:MyPartyColl
	MyRcptEntries : $$IsReceipt:$VoucherTypeName

[System: Formulae]
	MyRcptEntries : $$IsReceipt:$VoucherTypeName

[System: Formula]
	ForThisParty : $PartyLedgerName = @@ReqObjName
	
[#Object: Ledger]
	;LedgerSalesTotal : $$FilterAmtTotal:MySalesVouchers:ForThisParty:$Amount
	LedgerReceiptTotals : $$FilterAmtTotal:MyReceiptVouchers:ForThisParty:$Amount
	LedgerLastreceiptdate : $$CollectionField:MyReceiptVouchers:ForThisParty:Date;$$FilterAmtTotal:AllRcptVchrs:ForThisParty:$Amount


[Collection:AllRcptVchrs]
	Type : Vouchers
	Sort : -$Date
	Filter : MyRcptEntries
	Fetch : Amount, AllLedgerEntries.Amount, Date, AllLedgerEntries.Date, VoucherTypeName, AllLedgerEntries.VoucherTypeName

[Collection : MyPartyColl]
	Source Collection : AllRcptVchrs
	Fetch : Rate, Date, VoucherTypeName, PartyLedgerName, StockItemName
	Filter : MyPartyFltr
	Sort : Default : -$Date


[Collection: My Sales Vouchers]
	Type : Vouchers : Voucher Type
	Child Of : $$VchTypeSales
	Sort : -$Date
	;Fetch : *.*
	Fetch : PartyLedgerName, LedgerEntries.Amount,Amount, Date, AllLedgerEntries.Date

[Collection: My Receipt Vouchers]
	Type : Vouchers : Voucher Type
	Child Of : $$VchTypeReceipt
	;Fetch : *.*
	Sort	:Default : -$Date
	Fetch : PartyLedgerName,Amount,Date,VoucherNumber

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

[Collection: CAB My Ledgers]
	Type : Ledger
	Child of : $$GroupSundryDebtors
	Belongs to : Yes

;; 'Belongs To' includes the Ledgers pertaining to the subgroups of the group

;; mentioned in Attribute 'Child Of'.

Fetch : *.*

;; Fetch attribute required for remoting 2.0

;Filter:MyfltrTds

;; End-of-File


```
