---
title: Focus In Sales Voucher
type: sample_code
objects: Report, Function
source: Focus In Sales Voucher.txt
---

# Focus In Sales Voucher

## Source Code

```tdl
[Function: OnFocusSalesVoucherFunction]
	Variable	: IsOnFocusDemo		: Logical	: Yes
	Variable	: InfoMsg			: String	: "This code demonstrate the usage of event at various interface of objects"
	
	001	: Create	: OnFocusSaleVoucherReport
	
[Report:OnFocusSaleVoucherReport]
	Use		: Voucher
	Form	: Voucher
	Set		: SvVoucherType		: Sales
	Set		: InvoicingModeFlag	: Yes
	
;; To Print the info message for user

[#Form:VCHBasic Form]
	Option	: VCHBasic Form Focus Demo	: ##IsOnFocusDemo
	[!Form:VCHBasic Form Focus Demo]
		Add		: Parts	: Before	: VchTitle	: Form SubTitle
		Local	: Field	: Form SubTitle	: Info	: ##InfoMsg
		
;;On Focus At Part Level

[#Part:EI InvInvoice]
	On 	: Focus	: @@IsSales And ##IsOnFocusDemo	: Call	: PartLevelFocusFunc
	
[Function: PartLevelFocusFunc]
	001	: Msg Box	: "Part Level Focus"	: "You Are About to enter inventory entry part"
	
[#Line:VCH Narration]
	On	: Focus	: @@IsSales And ##IsOnFocusDemo	: Call	: NarrationFunc
	
[Function:NarrationFunc]
	001	: Msg Box	: "Narration Function"	: "Provide some narration if you have any\n otherwise leave it."
	
[#Line:EI Consignee]
	













```
