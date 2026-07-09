---
title: local variable
type: sample_code
objects: Report, Form, Part, Line, Field
source: local variable.txt
---

# local variable

## Source Code

```tdl
[Variable:LocalVar1]
	Type:Number
[#Menu:Gateway of tally]
	Item:LocalVar:Alter:LocalVar
	[Report:LocalVar]
		Variable:LocalVar1
		Set:LocalVar1:100
			Form:LocalVar
			[Form:LocalVar]
				Part:LocalVar
				[Part:LocalVar]
					Line:LocalVar
					[Line:LocalVar]
						Field:LocalVar,GVar
						[Field:LocalVar]
							Use:Number Field
							Set as:##LocalVar1
						[Field:GVar]
							Use:String Field
							Set as:##NewVar
							
						

[#Menu:Gateway of tally]
	Item:LocalVar2:Alter:LocalVar2
	[Report:LocalVar2]
		;Variable:LocalVar1
		;Set:LocalVar1:100
			Form:LocalVar2
			[Form:LocalVar2]
				Part:LocalVar2
				[Part:LocalVar2]
					Line:LocalVar2
					[Line:LocalVar2]
						Field:LocalVar2,GVar2
						[Field:LocalVar2]
							Use:Number Field
							Set as:##LocalVar1
						[Field:GVar2]
							Use:String Field
							Set as:##NewVar
```
