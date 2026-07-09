---
title: Change Background Color
type: sample_code
objects: Report, Form, Part, Line, Field, Button
source: Change Background Color.txt
---

# Change Background Color

## Source Code

```tdl
[#Menu:Gateway Of Tally]
	Add	: Key Item	: Before	: @@LocQuit	: Change Background	: E	: Display	: ChgBgColor
	

[Report:ChgBgColor]
	Title		: "ChgBgColor"
	Form		: ChgBgColor
	
[Form:ChgBgColor]
	Part		: ChgBgColor
	Button		: ChgBgButton
	Option		: OpColored		: ##ChgColor
	Background	: "Green"
	Width		: 50% Page
	Height		: 40% Page
	
	[!Form:OpColored]
		Background	: IF ##ChgColor THEN "Red" Else ""
		
/*
[Part:SignImage]
	Line 		: Expinv Logo
;	Image		: SignImage1
;	Width		: 100%
	Graph Type	: "E:\tirlok\tdl files\Sign.bmp"
	Height		: 50 mms
	Width		: 50 mms
	Vertical Align:Right
*/	

[Part:ChgBgColor]
	Line		: ChgBgColor
	[Line:ChgBgColor]
		Field	: ChgBgColor, DateBg
		[Field:ChgBgColor]
			Set as	: "This is the changed background colored field."
			;ITChlnReco DateConfig
		[Field:DateBg]
			Set as 		: ##SVCurrentDate
			Format		: "Short Date";, Separator:"/"
			


[Button:ChgBgButton]
	Title	: IF ##ChgColor Then "Green Bg" Else "Red Bg"
	Key		: Alt+C
	Action	: Set	: ChgColor	: NOT ##ChgColor



[Variable:ChgColor]
	Type	: Logical
	
[System:Variables]
	ChgColor	: Yes




```
