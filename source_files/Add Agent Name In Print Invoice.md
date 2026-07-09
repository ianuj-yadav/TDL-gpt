---
title: Add Agent Name In Print Invoice
type: sample_code
objects: 
source: Add Agent Name In Print Invoice.txt
---

# Add Agent Name In Print Invoice

## Source Code

```tdl
[#Line: GST Print ItemTaxDetailsStyleTiny]
	Local	: Field	: Default	: Print BG	: Yellow
	Border	: Thick Box
	
;[#Part: EXPINV Details]
;	Print BG	: Yellow
[#Part: EXPINV Title]
	Border	: Double Right
	Print BG	: YEllow
```
