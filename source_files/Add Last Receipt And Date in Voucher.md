---
title: Add Last Receipt And Date in Voucher
type: sample_code
objects: Part, Line, Field, Collection, Button
source: Add Last Receipt And Date in Voucher.txt
---

# Add Last Receipt And Date in Voucher

## Source Code

```tdl

[#Form:VCHBasic InvoiceMode]
	;Add	        : Parts	: Before	: VCHTitle2	: LastReceiptVch;, EI TurnOverInfo, EI SalesLedInfo, EI SalesCurrBalanceInfo
	Add		: Button		: ShowLastReceipt
	
	
[#Part: EI PartyInfo]
	Add		: Right Part		/*: After	: EI Consignee	*/: LastReceiptVch
	
[#Part:EI Consignee]
	Width		: 40% PAge
	;Background	: Yellow
	
[#Part: EI CurrBalanceInfo]
	Add		: Right Part		/*: After	: EI Consignee	*/: LastPaymentVch

[#Part:EI CurrBalanceInfoLeft]
	Width		: 40% PAge
	;Background	: Red
	


[Button:ShowLastReceipt]
	Title		: If ##ShowLastReceipt Then "Hide Last Receipt " ELse "Show Last Receipt"
	Key			: Alt+L
	Action		: Set		: ShowLastReceipt	: NOT ##ShowLastReceipt

[Variable:ShowLastReceipt]
	Type			: Logical
	Persistent		: Yes
	
[System:Variable]
	ShowLastReceipt		: Yes



[Part:LastReceiptVch]
	Line		: LastReceiptVch
	Width		: 50% Page
	;Horizontal Align	: Center
	Invisible	: NOT ##ShowLastReceipt
	[Line:LastReceiptVch]
		Field		: SimplePrompt, LastReceiptVchNum, LastReceiptVchAcc, LastReceiptVchAmt, LastReceiptVchDt
		Local		: Field		: SimplePrompt		: Set as	: $$LocaleString:"Last Receipt Amount"
		Local		: Field		: SimplePrompt		: Width		: 20
		[Field:LastReceiptVchNum]
			Use			: Number Field
			Set as		: $$CollectionField:$VoucherNumber:1:LastReceiptVchColl
			Skip		: Yes
			Set Always	: Yes
			Width		: 6
			Align		: Right
			

		[Field:LastReceiptVchAcc]
			Use			: Name Field
			Set as		: $$CollectionField:$LedgerEntries[2].LedgerNAme:1:LastReceiptVchColl;+ "-"
			Skip		: Yes
			Set Always	: Yes
			Width		: 15
			Align		: Right
			;Storage		: LastPaymentVchAmt
			
		
			
		[Field:LastReceiptVchAmt]
			Use			: Amount Field
			Set as		: $$CollectionField:$Amount:1:LastReceiptVchColl
			Skip		: Yes
			Set Always	: Yes
			Format		: "DrCr"
			Width		: 12
			Align		: Right
			Storage		: LastReceiptVchAmt
			
		[Field:LastReceiptVchDt]
			Use			: Uni Date Field
			Set as		: $$CollectionField:$DAte:1:LastReceiptVchColl
			Skip		: Yes
			Set Always	: Yes
			Width		: 10
			Align		: RIght
			Storage		: LastReceiptVchDt
			
[Collection:LastReceiptVchColl]
	Type		: Vouchers		: Ledger
	Child Of	: $$BaseOwner:#EiConsignee
	Filter		: VchTypeReceipt
	Filter		: ReceiptLedger
	Sort		: @@Default		: -$Date

[System:Formula]
	VchTypeReceipt		: $$IsReceipt:$VoucherTypeName
	ReceiptLedger		: $LedgerName=$$BaseOwner:#EiConsignee
	VchTypePayment		: $$IsPayment:$VoucherTypeName
	PaymentLedger		: $LedgerName=$$BaseOwner:#EiConsignee
	
[System:UDF]
	LastReceiptVchAmt		: Amount		: 25001
	LastReceiptVchDt		: Date			: 25002
	LastPaymentVchAmt		: Amount		: 25003
	LastPaymentVchDt		: Date			: 25004
	

[Part:LastPaymentVch]
	Line		: LastPaymentVch
	Width		: 50% Page
	;Horizontal Align	: Center
	Invisible	: NOT ##ShowLastReceipt
	[Line:LastPaymentVch]
		Field		: SimplePrompt, LastPaymentVchNum, LastPaymentVchAcc, LastPaymentVchAmt, LastPaymentVchDt
		Local		: Field		: SimplePrompt		: Set as	: $$LocaleString:"Last Payment Amount"
		Local		: Field		: SimplePrompt		: Width		: 20
		[Field:LastPaymentVchNum]
			Use			: Number Field
			Set as		: $$CollectionField:$VoucherNumber:1:LastPaymentVchColl;)+ "-"
			Skip		: Yes
			Set Always	: Yes
			Width		: 6
			Align		: Right
			
		[Field:LastPaymentVchAcc]
			Use			: Name Field
			Set as		: $$CollectionField:$LedgerEntries[2].LedgerNAme:1:LastPaymentVchColl;+ "-"
			Skip		: Yes
			Set Always	: Yes
			Width		: 15
			Align		: Right
			;Storage		: LastPaymentVchAmt
			
		[Field:LastPaymentVchAmt]
			Use			: Amount Field
			Set as		: $$CollectionField:$Amount:1:LastPaymentVchColl
			Skip		: Yes
			Set Always	: Yes
			Format		: "DrCr"
			Width		: 12
			Align		: Right
			Storage		: LastPaymentVchAmt
			
		[Field:LastPaymentVchDt]
			Use			: Uni Date Field
			Set as		: $$CollectionField:$DAte:1:LastPaymentVchColl
			Skip		: Yes
			Set Always	: Yes
			Width		: 10
			Align		: Right
			Storage		: LastPaymentVchDt
			
[Collection:LastPaymentVchColl]
	Type		: Vouchers		: Ledger
	Child Of	: $$BaseOwner:#EiConsignee
	Filter		: VchTypePayment
	Filter		: PaymentLedger
	Sort		: @@Default		: -$Date




```
