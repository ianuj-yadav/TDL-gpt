---
title: Signatrure
type: sample_code
objects: Report, Form, Part, Line, Field
source: Signatrure.txt
---

# Signatrure

## Source Code

```tdl
[#Part: CMP TallyShopFeatures Left]
Add : Line : At Beginning :CMP EnableSignatureImage

[Line: CMP EnableSignatureImage]
Field: Medium Prompt, CMP EnableSignatureImage
Local: Field: Medium Prompt: Info: "Enable Signature Print ? "

Space Top: 1

[Field: CMP EnableSignatureImage]
Use: Logical Field
Storage: EnableSignature
Set as: If $$IsEmpty:$$Value then "No" else $$Value
Sub Form: Cmp CompanySign Path: $$Value = "Yes"

[Report : CMP CompanySign Path]

Form : CMP CompanySign Path

[Form : CMP CompanySign Path]

Parts : Form SubTitle, CMP CompanySign Path
Option : Small Size Form
FullWidth : No
FullHeight : No
SpaceTop : 1
SpaceBottom : 1
SpaceLeft : 1
SpaceRight : 1
Background : @@SV_COSTCATEGORY
Local : Field : Form SubTitle: Info : $$LocaleString:"Company Logo"
Horizontal Alignment: Centre
Vertical Alignment : Centre

[Part : CMP CompanySign Path]

Line : CMP CompanySign Path, CompanyLogo PathNotesOne

[Line : CompanyLogo PathNotesOne]

Field : CompanyLogo PathNotes
Space Top : 1
Space Bottom : 0.4

Local : Field : CompanyLogo PathNotes: Set as : "- " + $$LocaleString:"Formats supported are BMP and JPEG."



[Field: CompanyLogo PathNotes]

Style : Normal Italic
FullWidth : Yes
Align : Left
Skip : Yes
Fixed : Yes

[Line : CMP CompanySignPath]

Fields : Medium Prompt, CMP CompanySign Path
Local : Field : Medium Prompt : Info : $$Localestring:"Location of Signature:"

[Field : CMP CompanySign Path]

Use : Name Field
Case : Normal
Set as : $SignaturePath:Company:##SVCurrentCompany
Storage : SignaturePath
Setalways : Yes
Width : @@LongWidth
Max : 100
Control : CMPLogoPathExist : ($$IsEmpty:$$Value OR Not $$IsFileExists:$$Value OR ($$FileSize:$$Value > 1048577))
Modifies : SASignPath : Yes

[System : Formula]

CMPLogoPathExist : (If $$IsEmpty:$$Value then $$LocaleString:"Logo path cannot be empty." +
Else If Not $$IsFileExists:$$Value then $$LocaleString:"Logo path specified is invalid or file not found." +
Else IF $$FileSize:$$Value > 1048577 Then "File size exceeds 1 MB." +
Else $$LocaleString:"Format Not Supported")

[#Report: ChangeCurrentCompany]
Local : Form : Modify Variables : On :Form Accept : Yes : SET : SASignPath:$SignaturePath:Company:##SvCurrentCompany

[#Report: Voucher]
SET : SASignPath:$SignaturePath:Company:##SvCurrentCompany

[System:Variable]
SASignPath : $SignaturePath:Company:##SvCurrentCompany

[System:Formula]
Onsign:$EnableSignature:Company:##SvCurrentCompany

[Variable: SASignPath]
Type : String
Persistent : Yes

[#Part	: VTYP Behaviour];;VTYP BehaviourMain]            

Add	: Line : At End	:Print Customized Invoice

[Line	:Print Customized Invoice]
Space Bottom   : 0.2
Field		: Long Prompt,Print Customized Invoice
Local		: Field : Long Prompt : Set As :  "Print Customized Bill" 

[Field	: Print Customized Invoice]

	Use			: Logical Field
	Show Table	:	Always
	Storage	  	: Custombill
	;Inactive	: NOT $$IsSales:$Parent
	
[System:UDF]
Custombill:Logical:9900


[System	: Formula]
	MyCustombill:  $Custombill:VoucherType:##SVVoucherType= "Yes"





[#Part: EXPINV Customer]
	;Print BG:green
Option:My Signature Details :@@Onsign and @@mycustombill	

[!Part:My Signature Details]
	delete:Left Parts  : EXPINV CustomerSign
	delete:Right Parts : EXPINV Signature
	Add:Left Part:EXPINV CustomerSign
	Add:Right Part:My signs 
			
			;Top Part:My signs 
			;Vertical:Yes   
			;Vertical:Yes
			;Scroll:Vertical















[System:UDF]
EnableSignature : Logical : 1000
SignaturePath : String : 1001



[Part:My signs]
Border:thin box
Right Parts:My Top Part,Test Image Part,Test Image Part2
Vertical:Yes
Height: 40 mms
Width: 60 MMS

;Horizontal Align: Right




[Part:My Top Part]
Space Bottom:If $$InPrintMode Then 1.5 Else 1.5
Line:EXPSMP Signature


[Part:Test Image Part]
Space Left:15
Line : Expinv Logo
Graph Type : ##SASignPath 
Height :25 mms
Width : 60 mms

Vertical Align:Right

Invisible : Not $EnableSignature:Company:##SVCurrentCompany ; If $$InPrintMode OR $$InMailAction OR ($$InExportMode And $$IsSysNameEqual:HTML:##SVExportFormat) then No Else Yes


[Part:Test Image Part2]
Line : EXPSMP Authourity
Height: 4 mms



[Line:Test Image Line]
Field: Test Image Field


[Field:Test Image Field]
Set as:""
;Align: Right
;Space Right:10


[#Form: NormalPRPrint]	
;Print BG:yellow
Bottom Parts: PPR Sign,Test Image Part sp

[Part:Test Image Part sp]
Left Part:My payment Logo left
Right Part:	Test Image Part
Local:Part:Test Image Part:Space Top:1

[Part:My payment Logo left]
Line:Expinv Logo


/*

[#Part: PPR Sign]
Option:My Payment Stamp:@@Onsign and @@mycustombill	
		
[!Part:	My Payment Stamp]
Delete:Part
Print BG:red
add:Part:My signs

















/*********************Bank Details********************************************/
/*
   [#Part: EXPINV BankDetails]
	   Option:My Bank Details:@@Onsign and @@mycustombill
	   
[!Part:My Bank Details]

           delete:     Line		: EXPINV BankTitle, EXPINV BankName, EXPINV BankAccNo, EXPINV BankBranchInfo
		   
[#Part:EXPINV Jurisdiction]
	Option:My Juricdiction:@@Onsign and @@mycustombill
	[!Part:My Juricdiction]
	Border:thin box
	Add:Line		: EXPINV BankTitle, EXPINV BankName, EXPINV BankAccNo, EXPINV BankBranchInfo
	


```
