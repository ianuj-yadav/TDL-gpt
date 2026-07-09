---
title: without gst practice
type: sample_code
objects: Part, Line, Field
source: without gst practice.txt
---

# without gst practice

## Source Code

```tdl
[#Form: Simple Printed Invoice]

	Option: WithoutGstPrint    :  @@IsSales
	
[#Form: Comprehensive Invoice]

	Option: WithoutGstPrint    : @@IsSales  
	
[!Form:WithoutGstPrint]
	Delete  	: Parts
	Delete	    : Bottom Parts
	Delete	    : PageBreak
	Space Top   : @@InvSmpSpace inch
    Space Right : if $$InPixelMode then 0.5 else 0 inch
    Space Left  : (if $$InPixelMode then @@InvSmpSpaceLeft else 0) inch
    Space Bottom: 0.25 inch

  	Width  	    : @@InvSmpWidth Inch
	Height      : @@InvsmpHeight Inch
	Add			: Parts       : STDInvoiceTop, DSP VoucherTime, EXPINV Jurisdiction, EXPSMP Copy, +
				  EXPSMP Company, DSP EXPSMP PurcContactDet, +
				  EXPSMP InvTitle, +
				  EXPSMP Party, +
				  EXPSMP PartyContact, +
				  EXPSMP Terms, +
                  EXPSMP ColumnGst, +
                  EXPSMP InvoiceGSt
				  
	Add			: BottomParts : EXPSMP TotalsGSt,NewPartGst, EXPSMP OtherDetails, EXPSMP SignOff, EXPSMP Customer, EXPINV InvoiceCompGen

    Add			: Page Break  : EXPSMP ClPageBreak, EXPSMP OpPageBreak
	Option      : PrintSimpleFrmtWithLogo1 			: Not @@IsPurchase And @@IsLogoEnabled AND NOT ##vIsPrintedInvoiceArabic AND @@GSTeInvIRNwithLogPrint
	
	
[!Form : PrintSimpleFrmtWithLogo1]

	Add     : Part : Before : EXPSMPCompany : EXPSMPCompName
	Replace : Part : EXPSMPCompany : EXPSMP LogoAndCompanyAddress

	Local   : Part : EXPSMP OpPageBreak : Add     : Part : Before : EXPSMPCompany : EXPSMPCompName
	Local   : Part : EXPSMP OpPageBreak : Replace : Part : EXPSMPCompany : EXPSMP LogoAndCompanyAddress
				  
[Part: EXPSMP ColumnGst]
	Line		: EXPSMP ColumnGst1,EXPSMP ColumnGst2
	Border		: Thin Box
	Common Border	: Yes
	[Line:EXPSMP ColumnGst1]
		Use			: EXPSMP InvoiceGSt
	
		Local		: Field	: Default	: Style	: Normal
		Local		: Field	: Default	: Align	: Center
		Local		: Field	: Default	: Type	: String
	
		Local : Field : SLNoGst   			: Info	 : $$StringWord:1:$$LocaleString:"Sl No." 
		Local : Field : DescriptionGst		: Info	 : $$LocaleString:"Description of Goods" 
		Local : Field : HSNGst   			: Info	 : $$LocaleString:"HSN/SAC" 
		Local : Field : QuantityGst			: Info	 : $$LocaleString:"Quantity" 
		Local : Field : RateInclusive		: Info	 : $$StringWord:1:$$LocaleString:"Rate (Incl. of Tax)" 
		Local : Field : DiscountGst   		: Info	 : $$LocaleString:"Disc. %"  
		Local : Field : AmountInclusive		: Info	 : $$StringWord:1:$$LocaleString:"Amount" 
	[Line:EXPSMP ColumnGst2]
		Use			: EXPSMP ColumnGst1
	
		Local		: Field	: Default	: Style	: Normal
		Local		: Field	: Default	: Align	: Center
		Local		: Field	: Default	: Type	: String
	
		Local : Field : SLNoGst   			: Info	 : $$LocaleString:"No." 
		Local : Field : DescriptionGst		: Info	 : $$LocaleString:"" 
		Local : Field : HSNGst   			: Info	 : $$LocaleString:"" 
		Local : Field : QuantityGst			: Info	 : $$LocaleString:"" 
		Local : Field : RateInclusive		: Info	 : $$LocaleString:"(Incl. of Tax)" 
		Local : Field : DiscountGst   		: Info	 : $$LocaleString:""  
		Local : Field : AmountInclusive		: Info	 : $$StringWord:1:$$LocaleString:"" 
	

	
	
[Part: EXPSMP InvoiceGSt]
	Line		:  EXPSMP InvoiceGSt	
	Repeat		:  EXPSMP InvoiceGSt	: Inventory Entries
	Scroll		: Vertical
	Border		: Thin Left Right
	Common Borders	: Yes
	Total			: AmountInclusive, QuantityGst
	
	[Line:EXPSMP InvoiceGSt]
		Fields			: SLNoGst, DescriptionGst,
		Right Fields	: HSNGst,QuantityGst, RateInclusive, DiscountGst, AmountInclusive

		[Field: SLNoGst]
			Use		: Number Field
			Set as	: $$Line
			Format		: "NoZero"
			Style		: Normal
			Width		: 3
			SLWidth     : If $$InDMPMode then 5% Else +
				  If $$InDraftMode then 8% Else 3%
			
		[Field: DescriptionGst]
			Use		: Name Field
			Set as	: $StockitemName
			Border	: Thin Left 
			Full Width	: Yes
			
		[Field: HSNGst]
			Use		: EXPINV HSNSACDetails
;			Set as	: $ComputedHSNCode
;			Border	: Thin Left Right
;			Width	: 12
			
		[Field: QuantityGst]
			Use		: Qty Primary Field
			Set as	: $BilledQty
			Align	: Center
			Border	: Thin Left
			
		[Field: RateInclusive]
			Use         : Amount Field
			Width       : @@RateWidth
			Align       : Right
			Set as     	: $$AsAmount:$$Number:$InclusiveTaxValue			;;	If $$IsEmpty:$InclusiveTaxValue Then ($$MulDivAmt:#EXPINVVATGCCTotalAmt:1:($$Number:$BilledQty)) Else $$AsAmount:$$Number:$InclusiveTaxValue
			Style       : Small
			Border      : Thin Left
			
		
		[Field: DiscountGst]
			Use         : Number Field
			Set as      : $Discount
			Align       : Right
			Style       : Small
			Width       : 5
			Border      : Thin Left
			Format      : "NoZero,Percentage"
		
		[Field: AmountInclusive]
			Use		: Amount Forex Field
			Set as	: $InclusiveTaxValue*$BilledQty*(100-$Discount)/100
			Border	: Thin Left 
			
[Part:EXPSMP TotalsGSt]
	Line		: EXPSMP TotalsGSt
	Border		: Thin Box
	
	[Line:EXPSMP TotalsGSt]
		Use			: EXPSMP InvoiceGSt
	
		Local		: Field	: Default	: Style	: Normal Bold
		Local		: Field	: Default	: Align	: Center
		;Local		: Field	: Default	: Type	: String
	
		Local : Field : SLNoGst   			: Info	 	: $$StringWord:1:$$LocaleString:"" 
		Local : Field : DescriptionGst		: Info	 	: $$LocaleString:"Total" 
		Local : Field : HSNGst   			: Info	 	: $$LocaleString:"" 
		Local : Field : QuantityGst			: Set as	: $$Total:QuantityGst
		Local : Field : RateInclusive		: Info	 	: $$StringWord:1:$$LocaleString:"" 
		Local : Field : DiscountGst   		: Info	 	: $$LocaleString:""  
		Local : Field : AmountInclusive		: Set as	: $$Round:($$Total:AmountInclusive):1
		
[Part:NewPartGst]
	Lines		: AmtInWordsTitleGst, AmtInWordsGst
	
	[Line:AmtInWordsTitleGst]
		Field		: AmtInWordsTitleGst
		Right Field	: EOEGst
		
		
		[Field:AmtInWordsTitleGst]
			Set as		: "Amount Chargeable (in words)"
			
		[Field:EOEGst]
			Set as		: "E. & O.E"
			
	[Line:AmtInWordsGst]
		Field		: AmtInWordsGst
		
		[Field:AmtInWordsGst]
			Set as		: $$InWords:@Amount + " Only"
			Amount		: $$Round:($$Total:AmountInclusive):1
			Style		: Normal Bold
			Full Width	: Yes
			








;;=================================== In Voucher creation

;[#Field:Vch Value]
;	Delete		: Switch
;	Switch		: VchInclTax1		: #ICFGInclTax
;	Switch		: VCH Value	: VCH JrnlValue : @@IsStockJrnl
;    Switch		: VCH Value	: VCH NrmlValue : NOT @@IsStockJrnl AND NOT @@IsPOSInvoice AND NOT (@@IsJournal AND $$IsSysNameEqual:CENVATAvailing:@IsCenvat)
;    Switch		: VCH Value	: VCH POSValue  : NOT @@IsStockJrnl AND @@IsPOSInvoice
;	Switch		: VCH Value	: VCH DNCENVATAvailing Value	: @@IsDebitNote AND $$IsSysNameEqual:CENVATAvailing:@IsCenvat
;	Switch		: VCH JobOrderValue	 : VCH JobOrderVal		: @@IsJoborderVouchers
;	Switch		: TraderExcise	: Trader Excise CN VCHValue	: @@IsExciseDealerOn AND ($$IsInvoicingOn AND @@IsCreditNote)
;	
;	
;[Field:VchInclTax1]
;	Set as		: #VchRateIncl*#VchBilledQty*(100-#VchDiscount)/100
```
