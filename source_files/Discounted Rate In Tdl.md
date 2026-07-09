---
title: Discounted Rate In Tdl
type: sample_code
objects: Field
source: Discounted Rate In Tdl.txt
---

# Discounted Rate In Tdl

## Source Code

```tdl
[#Line:EI ColumnOne]
	Switch		: EI ColumnOne	: EIColumnOneDiscounted	: @@IsMultiCurrency
	
	
	
[!Line	: EIColumnOneDiscounted]
	Use			: EI ColumnOne
	;Delete		: Left Field	: VCH ItemTitle
	Delete		: RIght Field	: VCH QtyTitle, VCH InclRateTitle, VCH RateTitle, VCH RateUnitsTitle, VCH DiscTitle, VCH AmtTitle
				
	;Add			: Left Fields : VCH ItemTitle
	Add			: Right Fields : VCH QtyTitle, VCH InclRateTitle, VCH RateTitle, VchDiscountedRate, VCH RateUnitsTitle, VCH AmtTitle
	;Border		: Thick Box
				
	[Field:CurrencyTitle]
		Set as		: "Curr"
		Skip		: Yes
		Style		: Normal Bold
		Width		: 5
		
	[Field:ROETitle]
		Set as		: "ROE"
		Skip		: Yes
		Style		: Normal Bold
		Width		: 5
```
