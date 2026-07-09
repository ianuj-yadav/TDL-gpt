---
title: roomcheck
type: sample_code
objects: Part, Line, Field
source: roomcheck.txt
---

# roomcheck

## Source Code

```tdl


;;==================Add Additional Details In ledger Creation
[#Part:MST LED Details]
	Add		: Lines		: ServiceRate;, StudentBranch, StudentBatch, StudentRollNo
	
	[Line:ServiceRate]
		Fields		: MediumPrompt, ServiceRate
		Border		: Thick Box
		
		Local		: Field		: MediumPrompt	: Info		: $$LocaleString:"Is Service Ledger ? :"
		Local		: Field		: MediumPrompt	: Color		: Blue
		Local		: Field		: MediumPrompt	: Style		: NormalBold
		
		
		
		[Field:ServiceRate]
			Use		: Logical field
			Table	: YesNo Table
			Set as	: $ServiceRate
			Storage	: ServiceRate
			Color	: Blue
			
			
;;-------------------------------------------------------


;;========================Change Value Of Ledger In voucher Creation
[#Field:EiValue]
	RoundedVal			: If $ServiceRate:Ledger:#EIAccDesc Then #VchRateNew*#VchRoomNew*#VchNightNew Else +
							if @@RoundUp then $$RoundUp:@CalcVal:$RoundLimit else +
                          if @@RoundDown then $$RoundDown:@CalcVal:$RoundLimit else +
                          if @@RoundOff then $$Round:@CalcVal:$RoundLimit else +
                          @CalcVal
	Set Always			: Yes
	
	;;;=======Delte This Before give It
	;Skip				: ($Parent:Ledger:#EIAccDesc)=$$String:"Duties & Taxes"
;;--------------------------------------


;;======================Add Quantity In Title Line In Voucher Creation	
[#Part: EI Column]
	Options 	: RoomEI Column : ##SVVoucherType=@@RoomType
	
[!Part:RoomEI Column]
	Delete		: Lines	: EI ColumnOne, EI ColumnOneRate, EI ColumnTwo
	Add			: Line	: RoomEI Column
	

[Line:RoomEI Column]
	Left Fields : VCH ItemTitle
	Right Fields : VCH RateTitle, VchRoomTitleNew, VchNightTitleNew, VCH AmtTitle
				
	Add			: Right Fields	: After		: Vch RateTitle		: VchRoomTitleNew, VchNightTitleNew
	[Field: VchRoomTitleNew]

		Width       : If @@IsJobOrdersOn Then @@VCHQtyWidth Else if ($DiffActualQty AND NOT @@IsPhysStock AND NOT @@IsStockJrnl AND NOT @@IsExciseSupplementaryInv ) then (@@VCHQtyWidth + @@VCHQtyWidth + 1) else @@VCHQtyWidth
		SubTitle    : Yes
		Setas       : @VAl
		Style       : Small Bold
		Align       : Right
		Skip        : Yes
		Fixed       : Yes
		Width		: @Wide
		VAl			: If (NOT (@@IsSales AND ##VoucherMode="Accounting Invoice" ))  Then "" Else "Room"
		;Background	: Red
		Wide		: If (NOT (@@IsSales AND ##VoucherMode="Accounting Invoice" ))Then 0 Else 10
	
	[Field: VchNightTitleNew]

		Width       : If @@IsJobOrdersOn Then @@VCHQtyWidth Else if ($DiffActualQty AND NOT @@IsPhysStock AND NOT @@IsStockJrnl AND NOT @@IsExciseSupplementaryInv ) then (@@VCHQtyWidth + @@VCHQtyWidth + 1) else @@VCHQtyWidth
		SubTitle    : Yes
		Setas       : @VAl
		Style       : Small Bold
		Align       : Right
		Skip        : Yes
		Fixed       : Yes
		Width		: 10
		VAl			: If (NOT (@@IsSales AND ##VoucherMode="Accounting Invoice" ))Then "" Else $$LocaleString:"Night"
		
		
;;-------------------------------------------
;[#Field: VCH RateUnitsTitle]
	;Width		: 0
 
;;==============================Add Rate, Quantity, Quantity Per Fields And their UDFs In voucher Ledger
[#Line:EIAccInfo]
	Options : RoomEIAccInfo : ##SVVoucherType=@@RoomType
	
	

[!Line:RoomEIAccInfo]
Add			: Right Field	: Before	: EiValue	 : VchRateNew,VchRoomNew, VchNightNew
[Field:VchRateNew]
	Use         : Amount Forex Field
	Use			: Amount Field
	Storage		: VCHCSTRate
	Skip		: If $ServiceRate:Ledger:#EIAccDesc  Then No Else Yes
	Set Always	: Yes
	Width		: 10
	Set as		: $$AsAmount:$VchRateNew
	Inactive    : $$IsEnd:$LedgerName Or ($Parent:Ledger:#EIAccDesc)=$$String:"Duties & Taxes" 
	Set By Condition	: ($$Owner:$$InAlterMode) And ($ServiceRate:Ledger:#EIAccDesc) 		: $VchPerNew;:Ledger:$LedgerName
	Set Always			: Yes


[Field:VchRoomNew]
	Use			: Number Field
	Storage		: VCHCSTQtyRoom
	Skip		: If $ServiceRate:Ledger:#EIAccDesc  Then No Else Yes
	Set Always	: Yes
	Width		: 10
	Set as		: $$Number:$VCHCSTQtyRoom
	Inactive    : $$IsEnd:$LedgerName Or ($Parent:Ledger:#EIAccDesc)=$$String:"Duties & Taxes" Or $$IsEmpty:#VchRateNew
	Set By Condition	: ($$Owner:$$InAlterMode) And ($ServiceRate:Ledger:#EIAccDesc) 		: $VCHCSTQtyRoom;:Ledger:$LedgerName
	Set Always			: Yes
	Align				: Right
	
[Field:VchNightNew]
	Use			: Number Field
	;Background	: red
	Storage		: VCHCSTQtyNight
	Skip		: If $ServiceRate:Ledger:#EIAccDesc  Then No Else Yes
	Set Always	: Yes
	Width		: 10
	Set as		: $$Number:$VCHCSTQtyNight
	Inactive    : $$IsEnd:$LedgerName Or ($Parent:Ledger:#EIAccDesc)=$$String:"Duties & Taxes" Or $$IsEmpty:#VchRateNew
	Set By Condition	: ($$Owner:$$InAlterMode) And ($ServiceRate:Ledger:#EIAccDesc) 		: $VCHCSTQtyNight;:Ledger:$LedgerName
	Set Always			: Yes
	Align				: Right


	
;;=========================Alter Ledger Details In voucher Comprehensive Print===================
[#Part: EXPINV Column]
	Options 	: RoomEXPINV Column : ##SVVoucherType=@@RoomType

[!Part:RoomEXPINV Column]
	;Print BG	: Red
	Delete		: Line		: EXPINV Column1, EXPINV Column2
	Line		: RoomEXPINV Column
	
	
[Line:RoomEXPINV Column]
	Use			: RoomEXPINV Totals
	;Border		: Thick Box
	Local		: Field			: Default	: Align		: Center
	Local		: Field			: Default	: Style		: ArialBold10
	Local		: Field			: Default	: Type		: String
	
	Local 		: Field 		: EXPINV SLNoTitle      : Info      : $$LocaleString:"Sl No."
	Local 		: Field 		: EXPINV DescTitle      : Info      : $$LocaleString:"Particulars"
	Local 		: Field 		: ExpInvRoomTotal       : Info      : $$LocaleString:"Room"
	Local 		: Field 		: ExpInvNightTotal      : Info      : $$LocaleString:"Night"
	Local 		: Field 		: ExpInvRateTotal1      : Info      : $$LocaleString:"Rate"
	Local 		: Field 		: EXPINV Total      	: Info      : $$LocaleString:"Total"
;;========================

[#Part: EXPINV AccInfo]
	Options 	: RoomEXPINV AccInfo : ##SVVoucherType=@@RoomType

[!Part:RoomEXPINV AccInfo]
	Delete		: Lines       : EXPINV AccDetails
	Line		: RoomEXPINV AccInfo
	Repeat		: RoomEXPINV AccInfo 	: Ledger Entries
    Scroll      : Vertical
    Total       : EXPINVAccAmount
	
[Line:RoomEXPINV AccInfo]
	Add			: Left Fields	: EXPINV SLNoRoom, EXPINV AccDesc
	Add			: Right Fields	: ExpInvRoom1, ExpInvNight1, ExpInvRate1, EXPINVAccAmount
	Local 		: Field : EXPINV DescTitle      : Set as      : $$LocaleString:"Total"
	Local 		: Field : EXPINV SLNoTitle      : Width	    : 5
	[Field:EXPINV SLNoRoom]
			Use			: Name Field
			Set as		: @LineNo
			Border		: Thin Right
			Width		: 5
			LineNo		: If (@@IsSales AND ##VoucherMode="Accounting Invoice" ) Then $$String:$$Line Else ""
		[Field:ExpInvRoom1]
			Use			: Name Field
			Set as		: @Val
			Val			: If $$IsEqual:$VCHCSTQtyRoom:0 Then "" Else $$String:$VCHCSTQtyRoom
			Border      : Thin Left
			Width       : @@Qtywidth
			Align		: Right
			
		[Field:ExpInvNight1]
			Use			: Name Field
			Set as		: @Val
			Val			: If $$IsEqual:$VCHCSTQtyNight:0 Then "" Else $$String:$VCHCSTQtyNight
			Border      : Thin Left
			Width       : @@Qtywidth
			Align		: Right
	
	
	
		[Field:ExpInvRate1]
			Use			: Amount Field
			Set as		: $$AsAmount:$VCHCSTRate
			Width 		: @@RateWidth
			Border		: Thin Left Right
			Align		: Right
			Format      : "NoZero,Decimals:-1"
	[#Line:EXPINV AccDetails]
		Options 	: RoomEXPINV AccDetails : ##SVVoucherType=@@RoomType
		
	[!Line:RoomEXPINV AccDetails]
		Delete			: Left Fields 	: EXPINV AccSign, EXPINV AccMarks, EXPINV AccPackages, 
		Add				: Left Fields	:  EXPINV SLNoTitle, EXPINV AccDesc;EXPINV SLNo1, EXPINV AccName
		Delete			: Right Fields	: EXPINV PartNo, EXPINV MRPAccValue, VAT AccRatePerc, EXPINV AccDueOn, EXPINV AccActualQty, EXPINV AccQty, EXPINV RateInclTitle, EXPINV AccRate, EXPINV AccRatePer, EXPINV AccDiscount,  EXPINV TCSAmount, EXPINV AccSRVTAmount, EXPINV SubTot
		
		Add				: Right Fields	: Before	: EXPINV AccAmount	: ExpInvRoom1, ExpInvNight1, ExpInvRate1;, EXPINV AccAmount;ExpInvAmt
		;Remove if		: Not $ServiceRate:Ledger:$LedgerName;($Parent:Ledger:$LEdgerName)=$$String:"Duties & Taxes"
		Local : Field : EXPINV SLNoTitle      : Width	    : 5
		
			

		[#Field: EXPINV AccName]
       
			Set as		: @Less + @Value	;;; used to print on invoice
					  
			Value		: if ##SATCSDetails AND @@TaxLedgerHasTCS then $$LocaleString:"TCS : Income Tax" else +
						  if NOT $$IsSysName:$LedgerName then $LedgerName else ""
			Less		: If $Amount<0 Then "Less :     " Else ""
		
		

	
	[Field:EXPINV AccRatePer1]
			Use			: Name Field
			Set as		: @Val
			Val			: If $$IsEmpty:$VchPerNew Then "" Else $$String:$VchPerNew
			Width 		: If $$InDraftMode then 5 else @@UnitsWidth
	
	
		[Field:ExpInvAmt]
			Use			: EXPINV AccAmount
			Set as		: $Amount
			

[Part:EXPINV AccDetailsGst]
	Line			: EXPINV AccDetailsGst
	Add				: Repeat	: EXPINV AccDetailsGst		: Ledger Entries
	;Scroll			: Vertical
	[Line:EXPINV AccDetailsGst]
		Use				: EXPINV AccDetails1
		Space Top		: If $$Line=1 Then 1 Else 0
		Remove if		: $ServiceRate:Ledger:$LedgerName;($Parent:Ledger:$LEdgerName)=$$String:"Duties & Taxes"
		Local			: Field		: EXPINV AccName	: Align		: Right
		Local			: Field		: EXPINV SLNo1		: Setas		: ""
		Local			: Field		: ExpInvRate1		: Type		: Number
		Local			: Field		: ExpInvRate1		: Setas		:If @@IsTaxHeadSecEdCess then $$AsAmount:$$GETSTXRates:"SecondaryCessRate":"SerLedger" else IF @@IsTaxHeadEdCess then $$AsAmount:$$GETSTXRates:"CessRate":"SerLedger" else  If @@IsTaxHeadServiceTax then $$AsAmount:$$GETSTXRates:"ServiceTaxRate":"SerLedger" else +
				  If @@IsSBCTaxTypeLedger then @@STSBCRateInPrint else If @@IsKKCTaxTypeLedger then @@STKKCRateInPrint else if ##SATCSDetails AND @@TaxLedgerHasTCS then @@TCSITTaxRate else +
				  $BasicRateOfInvoiceTax; If @Formula Then $BasicRateOfInvoiceTax:Ledger:$LedgerName Else $RateOfTaxCalculation:Ledger:$LedgerName
		Local			: Field		: ExpInvRate1		: Align		: Right
		Local			: Field		: EXPINV AccRatePer1: Setas		: If $$IsEqual:($$Number:#ExpInvRate1):0 Then "" Else "%"
		Local			: Field		: EXPINV AccRatePer1: Align		: Left
		


	
;;============================
[#Part: EXPINV Totals]
	   
	   Options 	: RoomEXPINV Totals : ##SVVoucherType=@@RoomType

[!Part:RoomEXPINV Totals]
	Line		: RoomEXPINV Totals
	Delete		: Line		: EXPINV BaseCurrTotals,EXPINV Totals
	
[Line:RoomEXPINV Totals]
	Border		: Thick Box
	Add			: Left Fields	: EXPINV SLNoTitle, EXPINV DescTitle
	Add			: Right Fields	: ExpInvRoomTotal, ExpInvNightTotal, ExpInvRateTotal1, EXPINV Total
	Local : Field : EXPINV DescTitle      : Set as      : $$LocaleString:"Total"
	Local : Field : EXPINV SLNoTitle      : Width	    : 5
	
[Field:ExpInvRoomTotal]
	Set as		: ""
	Border		: Thin Left
	Width       : @@Qtywidth
	
[Field:ExpInvNightTotal]
	Set as		: ""
	Width       : @@Qtywidth
	Border		: Thin Left
	
[Field:ExpInvRateTotal1]
	Set as		: ""
	Width       : @@RateWidth
	Border		: Thin Left
	

;;======================
	
;;=========Change Default Visisbility Of Rate OPtion in Voucher
[#Field:EI AccRate]
	Inactive	: $$IsEnd:$LedgerName Or ($Parent:Ledger:#EIAccDesc)=$$String:"Duties & Taxes" Or $ServiceRate:Ledger:#EIAccDesc
	Skip 		: $ServiceRate:Ledger:#EIAccDesc
	
	

;;================= New UDFs Created

[System:UDF]
	VCHCSTRate			: Amount	: 30001
	VCHCSTQtyRoom		: Number	: 30002
	ServiceRate			: Logical	: 30003
	VCHCSTQtyNight		: Number	: 30004
	VchPerNew			: String	: 30005
	RoomVchType			: String	: 30006
	
[System:Formula]
	RoomType		: $RoomVchType:Company:##SVCurrentCompany
	
	
	
	

;;===================================Alter Ledger Details In voucher Simple Printed Invoice


[#Part: EXPSMP AccDetails]
	Delete			: Line		: EXPSMP AccDetails
	Delete			: Repeat	: EXPSMP AccDetails	: Ledger Entries
	Add				: Parts		: EXPINV AccDetails1, EXPINV AccDetailsGst
	



[Style:ArialBold10]
	Font Name	: "Arial"
	Height		: 10
	Bold		: Yes
	

;;=======================================================



[#Part: Company F11 Other Features]
	
	Local	: Part	: Cfg PartContent		:Add			: Lines	: CMP EnableAgent
	[Line: CMP EnableAgent]

		Use			: Cmp Ops More Config	
		Fields		: Medium Prompt, CMP EnableAgent
		Space Top	: 0.6
		Local  		: Field : Medium Prompt : Info    		: $$LocaleString:"Hotel Module Voucher Type :"
		Local  		: Field : Medium Prompt : Background	: Yellow
	
		[Field:CMP EnableAgent]
			Use			: Name Field
			Storage		: RoomVchType
			Width		: 30
			Max			: 50	
			Style		: Normal Bold
							
			Background	: Yellow
	
			


	


 
```
