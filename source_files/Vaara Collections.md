---
title: Vaara Collections
type: sample_code
objects: Collection
source: Vaara Collections.txt
---

# Vaara Collections

## Source Code

```tdl
[Collection : My Src Coll]
	Type : Vouchers : Voucher Type
	Child of : $$VchTypeSales
	belongs to : yes

[Collection : My Repeat Coll]
	Source Collection : My Src Coll
	Walk : InventoryEntries

	By	: GstPer	:$GstPercent
	By	: VchNumber1:$VoucherNumber;:VoucherType:@@IsSales

	AggrCompute : ValBilledQty : Sum : $BilledQty
	AggrCompute : ValAmount : Sum : $Amount



[Collection: Vaara Company Address]
	
    Type        : Address   : Company
    Child of    : ##SVCurrentCompany
	Compute		: IsNumber	  	: No
	Compute		: FixedDirection: No 
	
    Object      : Company State
	Object		: Company Multi Address PrnState
	;Object  	: Company CINumber
;	Object      : Company Contacts
;	Object		: Company FaxNo
;	Object      : Company Email
;	Object		: Company Website
    Filter      : IsNotBlankAddr
	
	;Option		: Company GSTINumber	: (##IsVoucher OR ##IsMultiVchReport) AND @@IsGSTOnAppl
	;Option		: Company TINTRNNumber	: (##IsVoucher OR ##IsMultiVchReport) AND @@IsVChGVATApplicable

[Collection: AllConditionsVaaraFinal]
	Type		: AggrUDFVaaraCondition					: Company
	Child of	: ##SVCurrentCompany
	Fetch		: ConditionsVaara, VaaraYesNoCondition
	

```
