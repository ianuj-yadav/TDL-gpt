---
title: formNk sir
type: sample_code
objects: Report, Form, Part, Line, Field
source: formNk sir.txt
---

# formNk sir

## Source Code

```tdl
[#Menu:GAteway of Tally]
	Item:NksirForm:Alter:NksirForm
	
[Border : All thick]
	Bottom : Thick, Full Length
	Right  : Thick
	Top:Thick, Full Length
	Left:Thick, Full Length
	Color:"Black"
[Report:NksirForm]
	Form:NksirForm
	[Form:NksirForm]
		Part:Part1;;,Part2
		
		[Part:Part1]
			Line:NksirFormLine1;;,NksirFormLine2,NksirFormLine3,NksirFormLine4,NksirFormLine5
			Width:100% page
			[Line:NksirFormLine1]
				Left Fields:LeftField11,LeftField12
				Right Fields:RightField11,Rightfield12
				Border:All thick
				[Field:LeftField11]
					Use:Name Field
					Set as:"Client Name:"
				[Field:LeftField12]
					Use:Name Field
					Set as:"SUGO ADVERTISING "
				[Field:RightField11]
					Use:Name Field
					Set as:"Date:"
				[Field:Rightfield12]
					Use:Name Field
					Set as:"15/04/2023"
					/*
			[Line:NksirFormLine2]
			[Line:NksirFormLine3]
			[Line:NksirFormLine4]
			[Line:NksirFormLine5]
			*/
```
