---
title: aadhar num in ledger
type: sample_code
objects: Line, Field
source: aadhar num in ledger.txt
---

# aadhar num in ledger

## Source Code

```tdl
[#Part: LED Provide Bank Details]
	Add:Line:After:LED Provide Bank Details:NewAadhar
	
[Line:NewAadhar]
	Fields			: Long Prompt, LED Provide Aadhar
	Space Top		: 0.25
	Space Bottom	: 0.25
    Local       	: Field : Long Prompt	: Set as	: $$LocaleString:"Aadhar Number:"
	Local			: Field	: Default		: Inactive	: @@IsGatewayOfCurrAssetGrp OR @@LedgerBelongsToBankGroup
	Local       	: Field : Long Prompt 	: Width		: @@LedPromptWidth
	[Field:LED Provide Aadhar]
		Use         : Name Field
		Use			: Upper Case Field
		Style       : Small Bold
		Storage     : Aadharnum
		Inactive    : (NOT @@MailableGroup) OR @@IsGatewayOfCurrAssetGrp OR @@LedgerBelongsToBankGroup OR (NOT $$IsTDSOn AND @@NotMailableGroup)
		Invisible   : ##MVInMultiMode
		Ascii Only	: Yes
		KBLanguage  : @@EnglishLanguageID
		Max         : 12
		Unique      : Yes
		


[System:UDF]
	Aadharnum:String:2002
	
		
```
