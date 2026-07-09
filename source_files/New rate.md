---
title: New rate
type: sample_code
objects: Field, Collection
source: New rate.txt
---

# New rate

## Source Code

```tdl
;[#Line: STKI BalTitles]
;	Add:Field:After:Qty Title Field:NewRate
;	Local       : Field : New Rate     : Info  : $$LocaleString:"New Rate"
;	[Field:NewRate]
;		Set as:"New Rate"
;		Background:Red
	
;[#Line: STKI OpBal]
;	Add:Left Field:After:STKI OpBal:NewRatePrice
;[Field:NewRatePrice]

;	Use:Amount Field
;	Background:red
;	Storage:NEWRATEITEM
;	Ascii Only	: Yes
[#Line:EXPINV InvDetails]
[#Field: EXPINV SLNo]
	Print BG	: Red
[System: UDF]
	NEWRATEITEM:String:1111
[#Line: EI ColumnOne]
	add:Option:Optionrate1
	Add:Right Fields:Before:VCH QtyTitle:Show Category,HSNCODETIRLOK
	
;;=================REceipt Voucher Start
[#Form: Receipt Color]
	;Background		: Yellow
	
[#Line: PPR Checked]
	Border		: Thick box
	
[#Part: PPR Sign]
	Print BG	: Red
	
[#Part: PPR Title]
	Border		: Thick Box
	Print BG	: Surf Green
	
[#Line: PPR CmpAddress]
	Border		: Thick Bottom
	Right Field	: helloTDl
	
[Field:helloTDl]
	Set as	: "Hello"
[#Part: PPRDetails]
	;Print BG	: Alice Blue

[#Part: PPRDetailed]
	;Print BG	: Dark Green
	
[#Part: PPRBottomDetailsBank]
	;Print BG	: Surf Green
	
	
[#Part: PPR LogoTitle]
	;Print BG	: Royal Blue
	
  [#Part:  EXPINV Totals ]
	 ; Print BG	: Green

[#Form: PymtRcpt Print] 
	Delete	: Parts
	Delete	: Bottom Part
	;Print BG	: Yellow;NormalPRPrint
	
[#Form: NormalPRPrint] 
;	Delete	: Parts
;	Delete	: Bottom Part
	;Print BG	: Yellow
	Width		: 100% Page
	
;;=================REceipt Voucher End






[Field:Show Category]
	Set as:"Category"
	Use:Name Field
	;Width:1 Inch
	Border:Thick right left
	Background:Yellow
	Skip:Yes
	Invisible	: ##VaaraClotingConfig
	
[Field:HSNCODETIRLOK]
	Set as:"HSN/SAC"
	Use:Name Field
	;Width:1 Inch
	Border:Thick right left
	Background:REd
	Skip:Yes
	Invisible	: ##VaaraClotingConfig
	
/*
[#Line:Ei invinfo]
	Option:NewMRPRATE
[!Line:NewMRPRATE]
	Add:Right Field:At Beginning:ShowRate
	[Field:Showrate]
		Use:Name Field
		skip :Yes
		Set as:$openingRate:Stockitem:$stockitemName
*/


[#Line:Ei invinfo]
	Option:NewMRPRATE:$$Issales:$vouchertypename
[!Line:NewMRPRATE]
	Add:Right Field:At Beginning:ShowRate, HSNCOdeData
	[Field:Showrate]
		Use:Name Field
		skip :Yes
		Set as:$Category:Stockitem:$stockitemName
		;Set as:$lastsaleprice:Stockitem:$stockitemName
		;Invisible	: ##VaaraClotingConfig
		Print BG	: Red
	[Field:HSNCOdeData]
		Use:Name Field
		skip :Yes
		Set as		: If $$IsEmpty:@STKITEMHSN Then (If $$IsEmpty:@GrpHsn Then @CmpHsn Else @GrpHsn ) Else @STKITEMHSN
		STKITEMHSN	: $_HSncode:Stockitem:$stockitemName
		CmpHsn		: $GSTHSNNAME
		GrpHsn		: $HSNCode:HsnSTKGRPTirlok:$Hsn
		;Set as:  ##tempGSTHSNCode:Company:@@CmpMailName
		;Set as:If Not $$IsEmpty:$GSTHSNCode:Stockitem:$stockitemName Then $$EvalParamExp:@@HSNDtlsInfValExp:$InfGSTHSNCode Else	"Hello"
		;Invisible	: ##VaaraClotingConfig
[#Line:Expinv column1]
	Add:Left Field:After:ExpInv Desctitle:NewratePrint
	/*
	Local:Field:NewratePrint:Info:"Mrp"
	Local:Field:NewratePrint:Delete:Storage
	Local:Field:NewratePrint:Type:String
	Local:Field:NewratePrint:Align:Centre
	Local:Field:NewratePrint:Width:10
	Local:Field:NewratePrint:Style:normal bold
	*/
	
[Field:NewratePrint]
	Set as:"Category"
	Delete:Storage
	Type:String
	Align:Centre
	Width:10
	;Style:normal bold
	Border:thick left
	
	
[#Part: EXPINV Details];EXPINV Title, EXPINV Leading, EXPINV Column
	Total	: EINumPackages
	;Print BG	: Red
[#Line:Expinv invdetails]
	Add:Left Fields:After:Expinv Desc:PrintRate
	
[Field:PrintRate]
	Use:Name field
	;Set as:$lastsaleprice:Stockitem:$stockitemName
	Set as:$Category:Stockitem:$stockitemName
	Set Always:Yes
	Align:Center
	Border:thick left
	Width:10
	Print BG	: Red
	;Invisible	: ##VaaraClotingConfig
	





			

[#Part: EXPSMP Copy]
	Background	: Yellow
;	


;;  Tdl ADDon Height Change-----------------------


;;----------------------------GstVar-----------------------
[#Report: Voucher]
	VAriable:GstVar
	Set:GstVar:$$getgststatecode:($LedStateName:Ledger:$PartyLedgerName ) = $$getgststatecode:($PriorStateName:Company:@@CmpMailName )
	
[Variable:GstVar]
	Type:String
	
[#Form: GST Comprehensive Invoice AnalysisWithItem]
	Print BG		: Red

[#Part: VCHGSTAnalysis]
	Border		: Thick Box
	;Print BG		: Red
	
[#Collection: Sales StatutoryDetails]
	Color		: Red

	

[#Part: VCH GST AnalysisDetails]
	;Border		: Thick Box
	;Print BG		: Red
	
[#Part: VCH GST AnalysisDetailsActual]
	;Print BG	: Yellow
	
[#Part: VCH GST Analysis]
	;Print BG	: Green
	
[#Part: VCH GST AnalysisAmtDetails]
	;Print BG	: Red
	
[#Field: VCHGSTInvPrint CGSTRate]
	Print BG	: Red
[#Line:GST VCHGSTInvPrintBody]
	Border		: Thick Box
	;Local	: Field	: Default                   : Print BG	    : Red
[#Field: VCHGSTInvPrint HSNCode]
	;Print BG		: Yellow
	
[#Part: EXPINV LeftSign]
	;Print BG		: Green
	
[#Form:GST Comprehensive Invoice]
	;Print BG	: Red
	
[#Part: VCH GST AnalysisDetailsActual]
	Horizontal Align	: Left
	Vertical Align		: Right
	;Print BG		: Red
		


[#Menu:Gateway of Tally]
	Add	: Item	: GstReport		: Display	: Gst Rate Setup
	
[#Field: HSNSAC Code]
	Background	: Red
	
[Collection:HSnCodeTirlok]
	Type	: Company
	Object	: HSn Details
	
[#Part: EXPINV AccInfo]
	;Print BG	: Red
	

	
[#Part: EXPINV Logo]
	;Print BG	: Red
	;Width		: 50% Page
	
[#Field:VCHGSTInvPrint CGSTRate]
	;Print BG		: Ruler Grey
	
[#Part: STKI GST Details]
	;Background		: Red
	
[#Line:STKI Set TaxDetails]
	Height		: 10
	Border		: Thick Box
	
;; ================DAyBook Explosion==========

[#Line: DSP VchExplosion]
	Border		: Thick Box
[#Field:DSP VchExplAccount]
	Background	: Red
	
[#Part: DSP GrpVchExpl]
	
 [#Field: VCH NrmlValue]
	 Background	: Green
	 
[#Part:	EXPBillRefDtls	]
	Print BG		: Yellow
	
[#Line: EXPINV BillRefDetails]
	Border		: Thick Box
	
[#Part:EXPINV Signature]
	Print BG		: Green
	



    [#Part: EXPINV Details]
		Print BG		: Red
```
