---
title: edit
type: sample_code
objects: Line, Field, Collection
source: edit.txt
---

# edit

## Source Code

```tdl


[#Part: VCH Narration]
	Add: Option: MyCheque VCH Narration:$$IsReceipt:$VoucherTypeName
	
[!Part: MyCheque VCH Narration]
	Add: Line: At Beginning: lnVCHChequeNumber

[Line: lnVCHChequeNumber]
	Field: Short Prompt, fldVCHChequeNumber
	Local: Field: Short Prompt: Info : Mode of Payment: 

	[Field: fldVCHChequeNumber]
	;;Inherit from the default TDL Name field
		Use:Name Field
		Show Table:Always
		Table:Fxlist1
		Storage: ModeMode
		
[System: UDF]
	ModeMode: String: 1006
[Collection:Fxlist1]
	Title:$$LocaleString:"Mode of Payments"
	List Name:"By Cheque"
    List Name:"By Card"
    List Name:"In Cash"
[#Form: Voucher]
	Background:Black

[#Variable: ShowRunBalance]

	Type		: Logical
	Volatile	: Yes
	Default		: Yes
	


;;;;;;;;;;;;;;;;;;;;

		
;;;;;;;;;;;;;;;;;;;;;;
[#Part: LED Provide Bank Details]
	Background:yellow
	
[#Part: VCH Registration]
	Background:red
	
[#Field: EXPINV SubTitle]
	Background:REd
```
