---
title: Edit In Daybook
type: sample_code
objects: Line, Field
source: Edit In Daybook.txt
---

# Edit In Daybook

## Source Code

```tdl
[#Part: DB Body]
	;Background	: Red
	
;[#Form: Normal Day Book]
;	Bottom Part	: DBTotal
	

[#Part:DB Body]
	
	Use			: DB WithTotals
	;Total		: DSPDBDrAmt, DSPDBCrAmt
;	Parts       : DB Title, DSP VchTitle, DB Body
;   Page Break  : DYBK ClPageBreak, DYBK OpPageBreak
;	Option		: Enable Range Filters


	
[#Part: DB WithTotals]
	Bottom Lines		: BalanceDifference
	
[#Line:DSP VchTotalValue]
	;Delete	: Border
	Border	: Thin Top
	[Line:BalanceDifference]
		;Use 			: DSP VchTotalValue
		Right Fields    : Simple Field, Balance VchTotalDrValue, Balance VchTotalCrValue
		Local           : Field : Simple Field 			: Info 		: $$LocaleString:"Balance" + ":"
		;Local			: Field	: DSP VchTotalDrValue	: Set as	: If (#DSP VchTotalDrValue>#DSP VchTotalCrValue) Then #DSP VchTotalDrValue>=#DSP VchTotalCrValue Else 0
		Local           : Field : Simple Field 	: Style	: Normal Bold
		Local			: Field	: Simple Field	: Cells	: @@DBYKExcelTotalVal
		Border          : Thin Bottom
		
		
		[Field:Balance VchTotalDrValue]
			Use     	: Amount Field
			Set as		: @Cr
			Cr			: If (#DSPVchTotalCrValue >=#DSPVchTotalDrValue) Then (#DSPVchTotalDrValue-#DSPVchTotalCrValue) Else 0
			Background	: Yellow
		
		[Field:Balance VchTotalCrValue]
			Use     	: Amount Field
			Set as		: @Dr
			Dr			: If (#DSPVchTotalDrValue>=#DSPVchTotalCrValue) Then (#DSPVchTotalDrValue-#DSPVchTotalCrValue) Else 0
			Background	: Yellow

		
;	Line	: DB Total
;	[Line:DB Total]
;		Use
;	Use		: DB Body
;	Local	: Field	: DSPDBDrAmt
	


;[Field: DSP VchTotalDrValue]
;
;    Use     : Amount Field
;    Set as  : $$Total:DSPDBDrAmt
;
;[Field: DSP VchTotalCrValue]
;
;    Use     : Amount Field
;    Set as  : $$Total:DSPDBCrAmt
```
