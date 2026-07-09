---
title: Add Unit And Rate in Accounting Invoice
type: sample_code
objects: Report, Part, Line, Field
source: Add Unit And Rate in Accounting Invoice.txt
---

# Add Unit And Rate in Accounting Invoice

## Source Code

```tdl
[#Part:MST LED Details]
	Add		: Lines		: ServiceRate;, StudentBranch, StudentBatch, StudentRollNo
	[Line:ServiceRate]
		Fields		: MediumPrompt, ServiceRate
		Local		: Field		: MediumPrompt	: Info		: $$LocaleString:"Service rate available"
		[Field:ServiceRate]
			Use		: Logical field
			Table	: YesNo Table
			Set as	: $ServiceRate
			Storage	: ServiceRate
			

[#Field:EiValue]
	
	Set as				: If $ServiceRate:Ledger:#EIAccDesc Then @NewRateCenter Else @RoundedVal
	NewRateCenter		: #VchQtyNew*#VchRateNew
	;Use				: Amount Field
	;RoundedVal		: if @@RoundUp then $$RoundUp:@CalcVal:$RoundLimit else +
;                          if @@RoundDown then $$RoundDown:@CalcVal:$RoundLimit else +
;                          if @@RoundOff then $$Round:@CalcVal:$RoundLimit else +
;						  If $ServiceRate:Ledger:#EIAccDesc Then #VchQtyNew*#VchRateNew Else +
;                          @CalcVal
	
[#Line: Ei ColumnOne]
	Add			: Right Fields	: After		: Vch RateTitle		: VchQtyTitleNew
	[Field: VchQtyTitleNew]

    Width       : If @@IsJobOrdersOn Then @@VCHQtyWidth Else if ($DiffActualQty AND NOT @@IsPhysStock AND NOT @@IsStockJrnl AND NOT @@IsExciseSupplementaryInv ) then (@@VCHQtyWidth + @@VCHQtyWidth + 1) else @@VCHQtyWidth
    SubTitle    : Yes
    Setas       : $$LocaleString:"Quantity1"
    Style       : Small Bold
    Align       : Centre
    ;Border      : Double Sub Column Titles  : If @@IsJobOrdersOn OR @@IsExciseSupplementaryInv Then No Else $DiffActualQty AND NOT @@IsPhysStock AND NOT @@IsStockJrnl
    Skip        : Yes
    Fixed       : Yes
	
[#Line: EI AccDetails]
	
;	Delete		: Line		: EI AccInfo
;	Delete		: Option	: EI AddSubTot  : (NOT $$InCreateMode) AND (NOT $$IsSysName:$ClassName) AND ($$IsSysNameEqual:OnCurrentSubTotal:$MethodType)
;	Add			: Line		: EI AccInfo1
[#Line:EIAccInfo]
	
	Add			: Right Field	: Before	: EiValue	 : VchRateNew, VchQtyNew;, EiValue
	Border		: thick Box
	Height		: 2
	

[Field: EI AccDesc1]

  	Use		    : Vch LedgerFetch
	Use			: Vch FetchInfLedgerSrc
    Use		    : Create Ledger
	Background	: Yellow
    Use         : Ledger Name Field
	;; To refesh type of supply and Inculde in assessable value details
	Use			: VchLedEResetGSTDetailsTmpl
	Table       : Sales Support Ledgers VchExtract, End of List, Create Master  	   : @@IsOutwardType AND NOT @@IsCreditNote 
    Table       : Purchase Support Ledgers VchExtract, Adv Provisions Extract, End of List, Create Master, ShowMorePurcAcc 	 : NOT @@IsOutwardType AND NOT @@IsDebitNote  
	
	Table       : Sales Support Ledgers VchExtract, Adv Inv CN ShowMoreLedgers, End of List, Create Master, ShowMoreCNAccDesc  	 : @@IsCreditNote
    Table       : Purchase Support Ledgers VchExtract, Adv Inv DN ShowMoreLedgers, End of List, Create Master, ShowMoreDNAccDesc 	 : @@IsDebitNote

	Default Table Item		: $$IsSysNameEqual:EndofList:$Name


[Field:VchRateNew]
	Use			: Amount Field
	Background	: Green
	Storage		: VchRateNew
	Skip		: If $ServiceRate:Ledger:#EIAccDesc Then No Else Yes
	Set Always	: Yes
	

[Field:VchQtyNew]
	;Use			: QtyField
	Use			: Number Field
	
	Background	: red
	Storage		: VchQtyNew
	Skip		: If $ServiceRate:Ledger:#EIAccDesc  Then No Else Yes
	Background	: Grey
	Set Always	: Yes
	Width		: 5

	
[System:UDF]
	VchQtyNew		: Number		: 30001
	VchRateNew		: Amount		: 30002
	
;[#Field: EI AccQty]
;	Set Always		: Yes
;	Skip			: No
;	Background		: Green
;	
;[#Field: EI AccRate]
;	Skip		: No
;	Background	: Red
;	Set Always		: Yes
	
;[#Field: EI AccRatePerArabic]
;	Skip		: No
;	Background	: Red
;	
;[#Field: EI AccRatePer]
;	Skip		: No
;	Background	: grey
;	
;[#Field: EI AccDisc]
;	Skip		: No
;	Background	: green
;	
;[#Field: EI AccRatePerArabic]
;	Skip		: No
;	Background	: yellow


/*
[#Field: EI AccDesc]
	Key		: ShowRate
	
[Key:ShowRate]
	Key		: Enter
	Action	: Alter		: NewRateDisplay
	
[Report:NewRateDisplay]
	Title	: "Add Additional Details of " + #EIAccDesc
	



[#Part: VCHBATCH Column]
	Background		: Red
			[#Part: VCHBATCH Allocation]
					Background		: Red 
;		    Lines       : STKVCH Batch
;		    Bottom Lines: STKVCH BatchTotal
;		    Repeat      : STKVCH Batch : Batch Allocations
;		    Break On    : If @@IsExciseSupplementaryInv Then @@ExciseSuppleInvBatchBreak Else +
;						  @@BatchAllocBreak OR (@@IsGodownTransfer AND NOT @@HasBatchWise AND $$IsEmpty:#VCHBATCHBilledQty)
;		    Scroll      : Vertical

  	*/
	
[System:UDF]
	VCHCSTRate		: Amount	: 30001
	VCHCSTQty		: Number	: 30002
	ServiceRate		: Logical	: 30003
	
/*
	
[#Form:VCHPRICST Allocation]
	;Background	: Red
	Width		: 50% Page
	
[#Part:VCHCST Allocation]
	;Background		: Yellow
	
[#Part:VCHCST Column]
	;Background		: Grey
	
[#Line: VCHCST Column]
	Add			: Field		: After		: VCH NameTitle		: VCHCSTRateTitle, VCHCSTQtyTitle
	
[Field:VCHCST RateTitle]
	Use			: Name Field
	Width		: 8
	Info		: $$LocaleString:"Rate"

[Field:VCHCSTQtyTitle]
	Use			: Name Field
	Width		: 8
	Info		: $$LocaleString:"Quantity"

[#Line:VCHCST Line]
	Add			: Field		: After		: VCHCST Name	: VCHCST Rate, VCHCSTQty, 
	;Border		: Thick Box
	
	
	[Field:VCHCST Rate]
		Use			: Amount Field
		Storage		: VCHCSTRate
		Width		: 8
		
	[Field:VCHCSTQty]
		Use			: Number Field
		Storage		: VCHCSTQty
		Width		: 8
		Set as		: $$Number:(#VCHCSTAmt/#VCHCSTRate)
		Skip		: Yes
		
		

		

[#Collection: Sales VoucherDetails]; pymt
	;Color		: Red
	Object		: PPRWithCost



	
     [#Line: EXPINV AccDetails]
		
		Space Top	: 1
		Explode : ExpinvCostCentre   		: @@IsSales AND ##VoucherMode="Accounting Invoice" 

[Part:ExpinvCostCentre]
	;Invisible	: Yes
	Line		: ExpinvCostCentre
	Repeat		: ExpinvCostCentre		: LedgerEntries[1].CategoryAllocations[1].CostCentreAllocations
	
;	Width		: 
		[Line:ExpinvCostCentreTitle]
			Use			: ExpinvCostCentre
			Space Top	: 1
			Local		: Field		: default				: Type	: String
;			Local		: Field		: ExpinvCostCentre		: Info	: If $$IsEmpty:#ExpinvCostCentre Then "" Else $$LocaleString:"Name"
;			Local		: Field		: ExpinvCostCentreQty	: Info	: If $$IsEmpty:#ExpinvCostCentre Then "" Else  $$LocaleString:"Qty"
;			Local		: Field		: ExpinvCostCentreRate	: Info	: If $$IsEmpty:#ExpinvCostCentre Then "" Else $$LocaleString:"Rate"
;			Local		: Field		: ExpinvCostCentreAmt	: Info	: If $$IsEmpty:#ExpinvCostCentre Then "" Else $$LocaleString:"Amount"
			
			Local		: Field		: ExpinvCostCentre		: Info	:$$LocaleString:"Name"
			Local		: Field		: ExpinvCostCentreQty	: Info	: If $$IsEmpty:#ExpinvCostCentre Then "" Else  $$LocaleString:"Qty"
			Local		: Field		: ExpinvCostCentreRate	: Info	: If $$IsEmpty:#ExpinvCostCentre Then "" Else $$LocaleString:"Rate"
			;Local		: Field		: ExpinvCostCentreAmt	: Info	: If $$IsEmpty:#ExpinvCostCentre Then "" Else $$LocaleString:"Amount"
			Remove if	: $$IsEmpty:#ExpinvCostCentre
			
			
		[Line:ExpinvCostCentre]
			Field		: ExpinvCostCentre, ExpinvCostCentreQty, ExpinvCostCentreRate;, ExpinvCostCentreAmt
			;Border		: Thin Top
			[Field:ExpinvCostCentre]
				Set as		: $Name 
				Indent		: 5
				Width		: 20
			[Field:ExpinvCostCentreQty]
				Set as		: "Qty : "+$$String:$VCHCSTQty
				;Border		: Thin Left Right
				Width		: 8
				
			[Field:ExpinvCostCentreRate]
				Set as		: "Rate : "+$$String:$VCHCSTRate
				Width		: 12
			[Field:ExpinvCostCentreAmt]
				Set as		: $Amount
				Width		: 10
		;Print BG		: red
		
;[#Part: EXPINV Details]
;	Common Border	: No
*/
	
```
