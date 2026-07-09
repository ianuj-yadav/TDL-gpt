---
title: Add Part Number In Stock Item
type: sample_code
objects: Part, Line, Field
source: Add Part Number In Stock Item.txt
---

# Add Part Number In Stock Item

## Source Code

```tdl
;[#Part: STKI Stat Details]
;	Add:Line	:Before	: Form SubTitle : NewLIneStk
;	[Line:NewLIneStk]
;		Field:NewLIneStk
;		[Field:NewLIneStk]
;			Set as: "Hello"

;[#Line: STKI RateOfDuty]
;	Add:Field:After:STKI RateOfDuty:PartNumberStki
;	[Field:PartNumberStki]
;		Set as:"Hello"
		



;;----------------Adding Part Number in stock item---------------
[#Part: STKI Balances]
	Background:Yellow
	
[#Part: STKI Basic Features]
	;Background:Red
	Add:Part:After:STKI Units:PartNumberSTKI
[Part:PartNumberSTKI]
	Line:PartNumberSTKI
	[Line:PartNumberSTKI]
		Fields:Short Prompt, PartNumberSTKIRecord
		Space Top	: 0.5
		Invisible	: NOT ##UseItemUnits AND ($$InCreateMode OR $$IsSysName:$BaseUnits)
        Local       : Field : Short Prompt : Info : $$LocaleString:"Part Number"
		[Field:PartNumberSTKIRecord]
			Use         : Name Field
			Style       : Small Bold
			Storage     : PartNumberStki
			Ascii Only	: Yes
			KBLanguage  : @@EnglishLanguageID
			Unique      : Yes
	

[System:UDF]
	PartNumberStki:String:2003
	
;;  


;; ------------------Adding part Number in Invoices---------------

[#Line: EI ColumnOne]
	Add:Field:After:VCH ItemTitle:VchItemPartNumber
	[Field:VchItemPartNumber]
		Set as:"Part Number"
		Style:Normal Bold
		Skip:Yes
[#Field:VCH ItemTitle]
	Width       : @@NameWidth+5
    Max         : @@MaxNameWidth
    Style       : Normal Bold
    Case        : Title Case

[#Line:NewMRPRATE]
	Add:Field:After:VchStockItem:PartNumberStki
	[Field:PartNumberStki]
		Use		: Name Field
		skip	: Yes
		Set as	: "("+$PartNumberStki:Stockitem:$stockitemName+")"
		;Width	: 30% Page
		Border	: Thin Left
		Style	: TSPL FFE BarCode
		;Width	: 30
		

;; ------------------Adding part Number in Invoices Printing---------------


[Style:Code39barcode]
	Font 	: "Code39"
	
[Style:Code3of9Regular11]
	Font	: "Code3of9 Regular"
	

	


;;------------------Practice------------------

[#Part: STDInvoiceTop]
	Print BG	: green


```
