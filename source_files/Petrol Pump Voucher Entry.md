---
title: Petrol Pump Voucher Entry
type: sample_code
objects: Line, Field
source: Petrol Pump Voucher Entry.txt
---

# Petrol Pump Voucher Entry

## Source Code

```tdl
[#Line:EI ColumnOne]
	Switch		: EI ColumnOne	: EIColumnOnePetrol	: @@IsSalesItem
	
	
	
[!Line	: EIColumnOnePetrol]
	Use			: EI ColumnOne
	;Delete		: Left Field	: VCH ItemTitle
	Delete		: RIght Field	: VCH QtyTitle, VCH InclRateTitle, VCH RateTitle, VCH RateUnitsTitle, VCH DiscTitle, VCH AmtTitle
				
	;Add			: Left Fields : VCH ItemTitle
	Add			: Right Fields : OpeningStockTitle, ClosingStockTitle, VCH QtyTitle, VCH RateTitle, VCH RateUnitsTitle, VCH AmtTitle
	Border		: Thick Box
				
	[Field:OpeningStockTitle]
		Set as		: "Opening Stock"
		Skip		: Yes
		Style		: Normal Bold
		Width		: 8
		Line		: 0
		;Background	: Yellow
		
	[Field:ClosingStockTitle]
		Set as		: "Closing Stock"
		Skip		: Yes
		Style		: Normal Bold
		Width		: 8
		Line		: 0
		;Background	: Red
		

[#Line: EI InvInfo]
	Switch		: EI InvInfo 	: EIColumnOnePetrolInfo	: @@IsSalesItem
	
[!Line:EIColumnOnePetrolInfo]
	Use		: EI InvInfo
	Delete	: Right Fields : VCH ActualQty, VCH BilledQty, VCH RateIncl, VCH Rate, VCH RateUnit, VCH PrevItem, VCH Discount, VCH Value
	Add		: Right Field	: OpeningStock, ClosingStock, VCH ActualQty,VCH BilledQty,VCH Rate, VCH RateUnit, VCH PrevItem, VCH Value


	[Field:OpeningStock]
		Use			: Qty Primary Field
		Width		: 8
		Inactive    : $$IsEnd:$StockItemName 
		Storage		: OpeningStockPetrol
	
	[Field:ClosingStock]
		Use			: Qty Primary Field
		Width		: 8
		Inactive    : $$IsEnd:$StockItemName 
		Storage		: ClosingStockPetrol
	
[#Field: VCH BilledQty]
	Set By Condition	:  @@IsSalesItem	:  @OpStock-@ClStock
	OpStock				: $$Number:#OpeningStock
	ClStock				: $$Number:#ClosingStock
;	clo					: $$QtySubtract:
	;Background		: Red
	Skip			: @@IsSalesItem
	
		

/*
	
[#Field: VCH NrmlValue]
	; Background	: Green
	 
	Set By Condition	: ($$IsEmpty:#ROE)	: @Amount
	Qty			: $$Number:#VCHBilledQty
	RAte		: $$Number:#VCHRate
	Disc		: If $$IsEmpty:#VCHDiscount Then 0 Else $$Number:#VCHDiscount
	Amount		: @ROE*@Qty*@RAte*(100-@Disc)/100
	ROE			: If $$IsEmpty:#ROE Then 1 Else $$Number:#ROE
	Set as      : @Amount;if @@IsExciseSupplementaryInv Then If $$IsEmpty:@@SuppleInvItemValue Then ($OrigBilledQty*$EscalationRate) +
					 ; Else @@SuppleInvItemValue Else +
					 ; If @HasInvAlloc Then @BatchTotal else @ResetVal



[#Part : VCH Narration]
	Add		: Line	: At Beginning	: DollarAdvanceVch
	
[Line:DollarAdvanceVch]
	Space Bottom	: 1
	Fields		: MediumPrompt, DollarAdvanceVch
	Local		: Field		: MediumPrompt		: Info	: $$LocaleString:"Advance"
	Local		: Field		: MediumPrompt		: Style	: Normal Bold
	Invisible	: NOT @@IsMultiCurrency
	[Field: DollarAdvanceVch]
		Use			: Amount Field
		Set Always	: Yes
		Storage		: AdvanceAmount

			*/
		




						  
	
```
