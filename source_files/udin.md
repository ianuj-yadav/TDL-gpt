---
title: udin
type: sample_code
objects: Report, Form, Part, Line, Field
source: udin.txt
---

# udin

## Source Code

```tdl
/*
[#Part: VCH Title2]
	Add	: Part	: After	: VCH Title2 left 	: VchTitleUDIN
	
[Part:VchTitleUDIN]
	Line		: VchTitleUDIN
	
	[Line:VchTitleUDIN]
		Fields		: Short Prompt, VchTitleUDIN
		Local		: Field		: Short Prompt		: Info	: $$LocaleString:"UDIN"

		[Field:VchTitleUDIN]
			Use			: Name Field
			Set as		: $UDIN
			;Skip        : If $$Owner:$$InCreateMode Then No Else Yes
			Storage		: UDIN
			
			Width		: 20
			Case		: Upper Case

[System:UDF]
	UDIN		: String		: 20001
	
[#Part: EXPINV TopRight]
	Add		: Part		: After		: EXPINV BasicInfo	: EXPINVUDIN
	
[Part:EXPINVUDIN]
	Lines			: EXPINVUDINTitle
	Bottom Lines	: EXPINVUDIN
	Border			: Thin Bottom
	[Line:EXPINVUDINTitle]
		Field			: EXPINVUDINTitle
		[Field:EXPINVUDINTitle]
			Set as			: "UDIN"
	[Line:EXPINVUDIN]
		Field			: EXPINVUDIN
		[Field:EXPINVUDIN]
			Set as			: $UDIN
			Style			: Normal Bold
			Width			: 20
			Case			: Upper Case

*/


;;------------------udin show report after configure start
	
[Report:Change UDINNo]
	Form		: Change UDINNo

[Form:Change UDINNo]
	Part		: UdinAdd
[Part: UdinAdd]
	Line		: ShowUdinNo, UDINAdd
	Width		: 30% Page
	
	[Line:ShowUdinNo]
		Field   : Medium Prompt, ShowUdinNo
        Local   : Field: Medium Prompt : Set as : "Show UDIN No."
		
		[Field:ShowUdinNo]
			Use         : Logical Field
			Set         : ##UdinFlag
			Set Always  : Yes
			Modifies    : UdinFlag
			
			


	[Line:UDINAdd]
		Field   : Medium Prompt, UDINAdd
        Local   : Field: Medium Prompt : Set as : "Add UDIN No."
		Local   : Field: Medium Prompt : Inactive    : NOT #ShowUdinNo
		
		[Field:UDINAdd]
			Use         : Name Field
			Set as      : ##UDINAdd
			;Set Always  : Yes
			Modifies    : UDINAdd
			Case		: Upper Case
			Style		: Normal Bold
			Inactive    : NOT #ShowUdinNo
			Width		: 20

;;------------------udin show report after configure End

[Variable: UDINAdd]

    Type        : String
    Persistent  : Yes
    Volatile    : No
	
[Variable: UdinFlag]

    Type        : Logical
    Persistent  : Yes
    ;Volatile    : No
[System:Variable]
	UDINAdd		: ""
	UdinFlag	: No
	
;;-------------------------udin in BAlance Sheet print cofigure start
[#Collection: Balance Sheet Config]
	Object		: Cfg UDIN
	;Color		: Red
	
[Object:Cfg UDIN]
	Use			: Cfg Report Config
	Name		: "Show UDIN Number"
	Value		: ##UdinFlag
	IsDependent	: @@InPrintSVDraftDMPMode
	Action		: ConfigAction  	: Sub Form		: Change UDINNo;	: ##UdinFlag
	;Action		: ConfigAction   	:  Set 			: UdinFlag  : NOT ##UdinFlag
	
;;-------------------------udin in BAlance Sheet print cofigure end



		
[#Line: BSUseWkgCapFlag]

	
[#Report: Balance Sheet Landing]
	
;;-------------------------udin in BAlance Sheet print landing report  start

[#Part: Balance Sheet Landing]
	Add		: Line		: UdinLanding
	[Line:UdinLanding]
		Fields		: Medium Prompt, UdinLanding
		Local		: Field	: Medium Prompt	: Info		: $$LocaleString:"Show Udin No."
		[Field:UdinLanding]
			Set as		: ##UdinFlag
			Width		: 20


;;-------------------------udin in BAlance Sheet print landing report  end




;; --------------------Udin link QR In BAlance Sheet print Start



[#Part:BS VertParts]
	Add		: Parts		: After		: BSInfo			: UDIN
	;Print BG		: red
[#Part: BSHorzParts]
	Add		: Parts		: After		:  BS Detail		: UDIN
	;Print BG		: red
[Part:UDIN]
	;Option		: UDINQROption      : $$InPrintMode; AND (NOT ##UdinFlag)
	;Line		: Empty
	Parts		:  ShowUdinPrintOption, UDINQROption
	
[Part:ShowUdinPrintOption]
	Option		: ShowUdinPrint			: $$InPrintMode And ##UdinFlag
	Line		: empty
	
[!Part:ShowUdinPrint]
	Line		: ShowUdinPrint
	
	[Line:ShowUdinPrint]
		Field		: ShowUdinPrint
		
		
		
		[Field:ShowUdinPrint]
			Set as		: "UDIN : "+##UDINAdd
			Align		: Right
			Full Width	: Yes
			Inactive	: Not ##UdinFlag
			Style		: Normal Bold
			
[Part:UDINQROption]
	Parts		:  UDINQR
	Vertical	: No
	
[Part:UDINQR]
	Option		: UDINQRprint			: $$InPrintMode And ##UdinFlag
	Line		: empty
	
[!Part:UDINQRprint]
	Horizontal Alignment:Center
	Vertical:No
	Line:Empty
	Height:10% Page
	Width:12% Page
	QR Code:("https://udin.icai.org/search-udin"): True


			


;; --------------------Udin link QR  In BAlance Sheet  print End
		














	;Color:	red
	
/*
[Report: Change ReportTitle]
	
	Use		: OutputConfig Form
	Set		: SubFormTitle	: @@HeaderInfo
	
	Local	: Part	: Modify Variables	: Add	: Lines       : DSP CfgMainTitle, DSP CfgSubTitle
*/




	
[#Menu:Gateway of tally]
	
[#Part: PL Landing]
	Add		: Line		: UdinLanding
[#Collection: PandL Acc Config]
	Object		: Cfg UDIN
	
[#Form: Profit and Loss]
	Delete		: Bottom Part : Empty
	Add			: Bottom Part : UDIN
[#Part:PL HorzParts]
	
[#Part: PL VertParts]
	
```
