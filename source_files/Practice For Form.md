---
title: Practice For Form
type: sample_code
objects: Report, Form, Part, Line, Field, Collection, Function, Menu
source: Practice For Form.txt
---

# Practice For Form

## Source Code

```tdl
[Include:Practice Report.txt]
;[Include:Fast Entry.txt]



[#Menu:Gateway Of Tally]
	Add: Item:Show Bank:Display:Show Bank
	
[Report:Show Bank]
	Form:Show Bank
	
[Form:Show Bank]
	Part	: Show Bank
	
[Part:Show Bank]
	Line:Show Bank
	[Line:Show Bank]
		Fields:BankName1, Branch,AccNo,IfsCode
		[Field:BankName1]
			Set as: $BankingConfigBank:Ledger:"HDFC Bank A/c"
			Width	: 20% Page
			
		[Field:Branch]
			Set as: $BankBranchName:Ledger:"HDFC Bank A/c"
			Width	: 20% Page
			
		[Field:AccNo]
			Set as: $BankDetails:Ledger:"HDFC Bank A/c"
			Width	: 20% Page
			
		[Field:IfsCode]
			Set as: $IFSCode:Ledger:"HDFC Bank A/c"
			Width	: 20% Page
			

[#Form: VCH Print Configure]
	Background	: Yellow
	
[#Button: SVPrintAction]
	Title: "Print PDF"
	Color	: Red
	
	
[Function: MakePDF]
	1: Set: SVExport Location: "E:\tirlok\tdl files\Pdf Vouchers"
	2: Set: SVExportFormat:$$SysName:PDF
	3: Set: SVPrintFileName: $$String:$PartyLedgerName+$$ExtractNumbers:$VoucherNumber 
	4:Set: SVPrintFileName: $$MakeExportName:##SVPrintFileName:##SVExportFormat 
	5:Set: SVPrintFileName: ##SVExportLocation+"\"+#SVPrintFileName
	6: Export Report:.:True

	
[#Report: Global Print Configuration]
	Local		: Field	: Table Config Title	 : Info	: $$LocaleString:"Print Configuration by Tirlok"
			
;[#Form: Output Configuration]
;	Background	: Yellow
	
[#Form: VCH Sales OutputConfig]
	; Background	: Grey
[#Field: Output Configuration]
	 Background	: Red


;[#Button: F2 InactiveButton]
;	Use		: Right Button Template
;	Key		: L
;	Title	: "logo and digital sign"
;    Action	: Display	: BAlance Sheet


/*
[#Menu: Gateway of Tally]
Add: Item: Before: @@locQuit : My Trial Balance : Menu: My TB



[Menu: My TB]

Indent: Groups
Item: BLANK
Item: BLANK
Item: @@locquit


[#Menu: My TB]
Add : Item : Before : @@locQuit : All Group Types : Display : Sundry Debtors


[Report: Sundry Debtors]
Form : TB
Variable : SVFromDate,SVToDate
Set : SVFromDate : ##SVCurrentDate
Set : SVToDate : ##SVCurrentDate

[Form: TB]
Parts : TB Main Title, TB Part
Bottom Part : TBTotals
Height : 100% Page
Width : 100% Page
Button : Change Period, Print Button, Export Button, FilterButton

[Part : TB Main Title]
Line : TB Main Tit Line

[Line : TB Main Tit Line]
Field : TB Main Tit Field

[Field : TB Main Tit Field]
Use : Name Field
Set as : "My Trial Balance for the period " + $$String:##SVFromDate + " to " + $$String:##SVToDate
Align : Center
Width : 100% Screen
Style : Large Bold
Color : Blue

[Part: TB Part]
Lines : TB Title, TB Details

Repeat : TB Details : TB Groups
Scroll : Vertical
CommonBorder : Yes

[Line: TB Title]
Use : TB Details
Local : Field : Default : Type : String
Local : Field : Default : Align : Centre
Local : Field : TB Name Field : Set as : "Particulars"
Local : Field : Op Balances : Set as : "Op.Balances"
Local : Field : Group Names : Set as : "Group Name"
Local : Field : Sales : Set as : "Sales"
Local : Field : Purchases : Set as : "Purchases"
Local : Field : Receipt : Set as : "Receipt"
Local : Field : Payment : Set as : "Payment"
Local : Field : Contra : Set as : "Contra"
Local : Field : Journal : Set as : "Journal"
Local : Field : TB Amount Field : Set as : "Closing Balance"
Border : Flush Totals

[Line: TB Details]
Fields : TB Name Field, Group Names
Right Fields : Op Balances, Sales, Purchases, Receipt, Payment, Contra, Journal, TB Amount Field
Option : DisplayOnEnter
Option : TBAlterOnAltEnter

[!Line: TBAlterOnAltEnter]
Key : TBLine Object AltEnter Alter, Line Click Object Enter Alter

[Key : TBLine Object AltEnter Alter]
Key : Alt + Enter
Action : Alter Object
Mode : Display

[Field: TB Name Field]
Use : Name Field
Set as : $Name
Display : Ledger Vouchers : $$ISLedger
Variable : LedgerName
Modifies : LedgerName
Alter : Ledger
Width : 40

[Field: Group Names]
Use : Name Field
Set as : $parent
Border : Thin Left
Style : Normal Italic

[Field: Op Balances]
Use : Amount Field
Set as : $openingBalance
Format : "DrCr"
Border : Thin Left
Width : 12

[Field: Sales]
Use : Amount Field
Set as : $SalesAmt
Format : "DrCr"
Border : Thin Left
Width : 12

[Field: Purchases]
Use : Amount Field
Set as : $purchaseamt
Format : "DrCr"
Border : Thin Left
Width : 12

[Field: Receipt]
Use : Amount Field
Set as : $receiptamt
Format : "DrCr"
Border : Thin Left
Width : 12

[Field: Payment]
Use : Amount Field
Set as : $paymentsamt
Format : "DrCr"
Border : Thin Left
Width : 12

[Field: Contra]
Use : Amount Field
Set as : $Contraamt
Format : "DrCr"
Border : Thin Left
Width : 12

[Field: Journal]
Use : Amount Field
Set as : $Journalamt
Format : "DrCr"
Border : Thin Left
Width : 12




[Field: TB Amount Field ]
Use : Amount Field
Set as : $ClosingBalance
Format : "DrCr"
Border : Thin Left
Width : 12





[Collection: TB Groups]
Type : Ledger
; Child OF : $$GroupSundryDebtors
;Filter : Non Zero Closing Balance
Fetch : Name, parent, openingbalance, ClosingBalance
Fetch : Date, Amount, VoucherTypeName, PartyLedgerName, VoucherNumber

[System: Formula]
Non Zero Closing Balance: $ClosingBalance > 0
SameLedExists : $LedgerName = $$ReqObject:$Name

[Collection : TBVchSrcColl]
Type : Voucher
; Child Of : ##cvLedgerName

[Collection: TBVchColl]
Source Collection : TBVchSrcColl
Walk : AllLedgerEntries
By : VoucherTypeName : $VoucherTypeName
By : LedgerName : $LedgerName
Compute : ParentGroupName : $Parent:Ledger:$LedgerName
Compute : PrGroupName : $_PrimaryGroup:Group:$Parent:Ledger:$LedgerName
Compute : ExtractMode : ##ExtractMode
Compute : VoucherTypeName : ##VoucherTypeName

Aggr Compute : SalesExtract : Sum : If $$IsSales:$VoucherTypeName Then $Amount Else ""
Keep Source : No

; Aggr Compute : SalesreturnExtract : Sum : If $$IsCreditNote:$VoucherTypeName Then $Amount Else ""
; Keep Source : No

Aggr Compute : purchaseExtract : Sum : If $$IsPurchase:$VoucherTypeName Then $Amount Else ""
Keep Source : No
Aggr Compute : receiptExtract : Sum : If $$IsReceipt:$VoucherTypeName Then $Amount Else ""
Keep Source : No

Aggr Compute : JournalExtract : Sum : If $$IsJournal:$VoucherTypeName Then $Amount Else ""
Keep Source : No

Aggr Compute : PaymentExtract : Sum : If $$IsPayment:$VoucherTypeName Then $Amount Else ""
Keep Source : No

Aggr Compute : ContraExtract : Sum : If $$IsContra:$VoucherTypeName Then $Amount Else ""
Keep Source : No


[#Object: Ledger]
SalesAmt : $$ReportObject:$$FilterAmtTotal:TBVchColl:SameLedExists:$SalesExtract
; Salesreturamt : $$ReportObject:$$FilterAmtTotal:TBVchColl:SameLedExists:$SalesreturnExtract
receiptamt : $$ReportObject:$$FilterAmtTotal:TBVchColl:SameLedExists:$receiptExtract
Journalamt : $$ReportObject:$$FilterAmtTotal:TBVchColl:SameLedExists:$JournalExtract
Paymentamt : $$ReportObject:$$FilterAmtTotal:TBVchColl:SameLedExists:$PaymentExtract
Receiptamt : $$ReportObject:$$FilterAmtTotal:TBVchColl:SameLedExists:$ReceiptExtract
Contraamt : $$ReportObject:$$FilterAmtTotal:TBVchColl:SameLedExists:$ContraExtract

[Part:TBTotals]
Line:TBtotals

[Line:TBtotals]
Border : Totals
Use : TBDetails
;Local : Field : Default : Type : String
Local : Field : Default : Align : Right
Local : Field : Default : Style : Large Bold
Local : Field : Default : Border : Thin Left
Local:Field:DEFAULT:Use:AMOUNT FIELD
Local : Field : Default:Format:"Dr/Cr"
Local : Field : TB Name Field : Set as : "Hello "
Local : Field : Group Names : Set as : "Grand Totals"
Local : Field : Group Names : Align : Left
Local : Field : Group Names : Background:YELLOW


Local : Field : Op Balances : Set as : $$Total:OpBalances
Local : Field : Sales : Set as : $$Total:Sales
Local : Field : Op Balances : Border : Thin Left Right
Local : Field : Op Balances : Align : Right

Local : Field : Sales : Border : Thin Left Right
Local : Field : Sales : Align : Right
*/
```
