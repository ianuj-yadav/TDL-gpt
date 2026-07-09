---
title: BAnk Qr
type: sample_code
objects: Part, Line, Field
source: BAnk Qr.txt
---

# BAnk Qr

## Source Code

```tdl
[#Part:EXPINV BankInfo]
	Delete	: Part
	Delete	: Bottom Part
add:bottom part:LearnwellBankQr 
Border	: Thick Box
[Part:Learnwell BankQr]
Part:LearnWellQRP, EXPINV BankDetails
vertical: Yes
[Part:LearnWellQRP] 
	Part:LearnwellQRCode
	
[Part:LearnwellQRCode]
Horizontal Alignment:Left
Vertical:No
Line:Empty
Height:10% Page
Width:12% Page
;QR Code:("upi://pay?pa=8920061826@ptsbi&pn=SAGAR&am="+$$String:$Amount+"&tn=Bill.No. "+$$String:$VoucherNumber): True
;QR Code:("upi://pay?pa=8920061826@ptsbi&pn=SAGAR&tn=Bill.No. "+$$String:$VoucherNumber): True
QR Code:("upi://pay?pa=8920061826@ptsbi&pn=SAGAR&am=29"): True

/*
upi://pay?pa=8920061826@ptsbi&pn=SAGAR&am=100.00&mc=123456&tid=1234567890&rem=Payment%20for%20services
Explanation:

pa: Payee address (e.g., mobile number or UPI ID of the receiver).
pn: Payee name (e.g., name of the person or entity you're paying).
am: Amount (e.g., 100.00 INR).
mc: Merchant Code (optional for merchants).
tid: Transaction ID (optional but useful for tracking).
rem: Remarks (custom remark added to the link, this is an encoded version of the message like Payment for services).
*/


[Line:LWQline]
field:LWQF
[Field:LWQF]
Set as:"new"

[#Part:GST InvoiceEmptyPart]
	Print BG	: Red
	; Border		: Thick Box
	
[#Form: GST Comprehensive Invoice AnalysisWithItem]
	Print BG		: Green
	;Set Always      : SVPrintOrientation    : $$SysName:Portrait
```
