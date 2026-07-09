---
title: ShowSignature
type: sample_code
objects: Report, Form, Part
source: ShowSignature.txt
---

# ShowSignature

## Source Code

```tdl
[Report:CompanySignature]
	Form	: CompanySignature
	
[Form:CompanySignature]
	Part:/*CompanySignature, */Sign2
	
;[Part:CompanySignature]
;	Line 		: Empty
;;	Image		: SignImage1
;;	Width		: 100%
;	Graph Type	: "E:\tirlok\tdl files\Sign.bmp"
;	Vertical Align:Right
	
[Part:Sign2]
	Line 		: Empty
	Image		: SignImage1
	;Graph Type	: "E:\tirlok\tdl files\Sign.bmp"
	Vertical Align:Right
	Height		: 50 mms
	Width		: 50 mms
```
