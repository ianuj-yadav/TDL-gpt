---
title: Show Mode Of Payment In Sales Voucher
type: sample_code
objects: Report, Form, Part, Line, Field, Collection
source: Show Mode Of Payment In Sales Voucher.txt
---

# Show Mode Of Payment In Sales Voucher

## Source Code

```tdl
[#Part : VCH Narration]
	Add		: Line	: At Beginning	: NewModePayment 
		
	[Line:NewModePayment]
		
		Field	: Medium Prompt, NewModePayment
		Local	: Field	: Medium Prompt	: Info	: $$LocaleString:"Mode of Payment"
		Local	: Field	: Medium Prompt	: Width		: 27
		Local	: Field	: Medium Prompt	: Invisible	: NOT @@Issales
		[Field:NewModePayment]
			Use			: Logical Field

			;Help		: @@HlpGSTeWayeInvoiceAddlDetails
	
			Set as		: IF ($$Owner:$$InCreateMode) AND NOT ($$Owner:$$InDuplicateMode) Then No Else Yes
			Show Table	: Always
			;Sub Form	: GST ProvideTransAdditionalDetails	: $$Value AND NOT #LogicalField
			Sub Form	: PAymentDetails		: $$Value ="Yes"
			Set Always	: Yes	
			Invisible	: NOT @@Issales

[Report:PAymentDetails]
	Title  			: "Payment Details"
	Form			: PAymentDetails
	
	
[Form:PAymentDetails]
	Use				: Vch SubForm Padding
	Parts			: PaymentMainTitle, PaymentDetails
	Height			: 50% Page
	Width			: 60% PAge
	
[Part:PaymentMainTitle]
	Line		: PaymentMainTitle 
	
	[Line:PaymentMainTitle]
		Field			: PaymentMainTitle
		Border			: Thick Bottom
		Space Bottom	: 1
		
		[Field:PaymentMainTitle]
			Info		: "Payment Details"
			Full Width	: Yes
			Align		: Center
			Style		: Normal Bold

[Part:PaymentDetails]
	Lines		: PaymentDetails, PaymentMode, PaymentDate, PaymentAmount, PaymentRemarksSales
	Space Top	: 2
	[Line:PaymentDetails]
		Fields		: Medium Prompt, PaymentDetails
		Space Top	: 1
		Local		: Field		: Medium Prompt		: Info	: $$LocaleString:"Payment Details"
		
		[Field:PaymentDetails]
			Use			: Name Field
			Storage		: PaymentDetails
			Set as		: $PaymentDetails
			Table		: ModeOfPayments
			Show Table	: Always
			
			Case		: First Upper Case
			Set Always	: Yes

	[Line:PaymentMode]
		Fields		: Medium Prompt, PaymentMode1
		Space Top	: 1
		Local		: Field		: Medium Prompt		: Info	: $$LocaleString:"Payment Mode"
		
		[Field:PaymentMode1]
			Use			: Name Field
			Storage		: PaymentMode
			Set as		: $PaymentMode
			Case		: Upper Case
			Set Always	: Yes

	[Line:PaymentDate]
		Fields		: Medium Prompt, PaymentDate
		Space Top	: 1
		Local		: Field		: Medium Prompt		: Info	: $$LocaleString:"Payment Date"
		
		[Field:PaymentDate]
			Use			: Uni Date Field
			Storage		: PaymentDate
			Set as		: $PaymentDate
			;Case		: First Upper Case
			Set Always	: Yes

	[Line:PaymentAmount]
		Fields		: Medium Prompt, PaymentAmount
		Space Top	: 1
		Local		: Field		: Medium Prompt		: Info	: $$LocaleString:"Payment Amount"
		
		[Field:PaymentAmount]
			Use			: Amount Field
			Storage		: PaymentAmount
			;Skip		: Yes
			Set as		: $Amount
			;Case		: First Upper Case
			Set Always	: Yes

	[Line:PaymentRemarksSales]
		Fields		: Medium Prompt, PaymentRemarksSales
		Space Top	: 1
		Local		: Field		: Medium Prompt		: Info	: $$LocaleString:"Payment Remarks"
		
		[Field:PaymentRemarksSales]
			Use         : Voucher Narration Field
			Storage		: PaymentRemarks
			Set as		: $PaymentRemarks
			Case		: First Upper Case
			Set Always	: Yes
			Lines       : 4
			Key         : PrevVchNarration, PrevLedNarration
			Local Formula       : VchNoLength          	: If @@MultiUserAutoVchNumbering AND $VoucherNumber Contains "<Auto>" Then ($$StringLength:$VoucherNumber)-6 Else $$StringLength:$VoucherNumber


[System	: UDF]
	PaymentDetails		: String		: 24001
	PaymentMode			: String		: 24002
	PaymentDate			: Date			: 24003
	PaymentAmount		: Amount		: 24004
	PaymentRemarks		: String		: 24005
	
[#Form: Vch Bank Allocations]
	;Background	: Yellow
	
[Collection:ModeOfPayments]
	Title		: "Mode Of Payments"
	Object		: PhonePe, PayTm, GooglePay, MobiKwik, AmazonPay, BHIM, Dhani
	
[Object:PhonePe]
	Name	: "PhonePe"
```
