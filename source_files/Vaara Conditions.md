---
title: Vaara Conditions
type: sample_code
objects: Report, Form, Part, Line, Field
source: Vaara Conditions.txt
---

# Vaara Conditions

## Source Code

```tdl
[Report:VaaraConditions]
	Title		: "Terms And Conditions"
	Form		: VaaraConditions
	Object		: Company
	
	
[Form:VaaraConditions]
	Part        : SubTitleCondition, AllVaaraConditions
    FullWidth   : Yes
	Height		: 100% Screen
    ;Background  : @@SV_CHEQUE
    ;SpaceRight  : 0.5
    ;SpaceLeft   : 1.5
;	Local		: Line	: Form SubTitle	: Height	: 2
;    Local       : Field : Form SubTitle : Info  : $$LocaleString:"Terms And Conditions"
    ;Option      : Small Size Form
	
[Part: SubTitleCondition]
	Line	: SubTitleCondition
	
	[Line:SubTitleCondition]
		Field			: SubTitleCondition
		Border			: Thick Bottom
		Space Bottom	: 1
		[Field:SubTitleCondition]
			Info  	: $$LocaleString:"Terms And Conditions"
			Width	: 100% Screen
			Align	: Center
			Style	: Normal Serif
			
	
[Part: AllVaaraConditions]

    Lines       : AllVaaraConditions
	Repeat		: AllVaaraConditions				: AggrUDFVaaraCondition
	Scroll		: Vertical
	;BreakOn 	: $$IsEnd:$ConditionsVaara
    ;Repeat     : AllVaaraConditions   : ConditionsVaara
    Break on    : $$IsEmpty:$ConditionsVaara
	;Scroll		: Vertical
    Height      : 70% Screen
	Horizontal Align	: Center




    [Line: AllVaaraConditions]

        Fields      : TermsSNo, AllVaaraConditions, Logical Field
        Local       : Field : Default 		: Delete 	: Border
		Local		: Field	: Logical Field	: Storage	: VaaraYesNoCondition
		Local		: Field	: Logical Field	: Skip		: $$IsEmpty:#AllVaaraConditions
		Local		: Field	: Logical Field	: Style		: Normal Serif
		Height		: 1.5
		
		
		[Field: TermsSNo]

            Use     : Number Field
            Set as	: $$Line
            Unique  : Yes 
			Style	: Normal Serif
			Skip	: Yes

        [Field: AllVaaraConditions]

            Use     : Name Field
            Storage : ConditionsVaara
            Unique  : Yes 
			Width	: 100
			Max		: 251
			Style	: Normal Serif
			
			
			

[System: UDF]
	AggrUDFVaaraCondition	: Aggregate	: 20024
	ConditionsVaara 		: String	: 20023
	VaaraYesNoCondition		: Logical	: 20025
	

[Variable:VaaraConditionYesNo]	
	Type		: Logical
	Persistent	: Yes
[Style	: ArialNormal12]
	Font Name	: "Arial"
	Bold		: No
	Height		: 12


[#Form: Purchase Color]
	Print BG	: Yellow
	
[#Form: Vch TaxAnalysis]
	Print BG	: Red
```
