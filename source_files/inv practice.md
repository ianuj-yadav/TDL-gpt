---
title: inv practice
type: sample_code
objects: Part, Line
source: inv practice.txt
---

# inv practice

## Source Code

```tdl
[#Form: Comprehensive Invoice]

	Option: Global Invoice    : @@IsSales; AND ##InvVarC1

[#Form: Simple Printed Invoice]

	Option: Global Invoice    : @@IsSales; AND ##InvVarC1

[!Form : Global Invoice]

	Delete  	: Parts
	Delete	    : Bottom Parts
	Delete	    : PageBreak
	Space Bottom: 0
	Space Left	: 0.25 inch
	Space Right	: 0
	Add         : Parts	        : Global Invoice Top Part
	;Add         : Parts	        : Global Invoice Body Part
	;Add         : Bottom Parts  : Global Invoice Bottom Part

[Part:Global Invoice Top Part]
	;Use		: EXPINV OpPageBreak ; Inside this three parts available  ;;;;EXPINV Title, EXPINV Leading, EXPINV Column
	;Use		: EXPINV Leading ;; Inside this :::Parts       : EXPINV TopLeft,        Right Parts : EXPINV TopRight, Vertical    : No
	;Use		: EXPINV TopLeft
	;Use		: EXPINV Company
	Line	:EXPINV AddressTirlok
	;Use		: EXPSMP OpPageBreak
	;Use		: EXPSMP Company
	;Use		: EXPSMP CompanyAddress ;To Print Full Address Of Company
	;Line		: INV LINE
	Repeat      : EXPINV AddressTirlok : Company Address
	
	[Line:EXPINV AddressTirlok]
		Use		: EXPINV Address
	[Line:INV LINE]
		Use		: EXPSMP Company
```
