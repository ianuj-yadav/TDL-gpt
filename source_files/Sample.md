---
title: Sample
type: sample_code
objects: Report, Form, Part, Line, Field
source: Sample.txt
---

# Sample

## Source Code

```tdl
[#Menu:Gateway Of Tally]
	Add		: Item		: DisplayHello		: Display	: HelloWorld
	
[Report:HelloWorld]
	Form		: HelloWorld
	
[Form:HelloWorld]
	Height		: 100% Page
	Width		: 100% Page
	
	Part		: HelloWorld
	
[Part: HelloWorld]
	Line		: HelloWorld
	[Line:HelloWorld]
		Field		: LongPrompt, HelloWorld
		Local		: Field		: LongPrompt	: Info	: $$LocaleString:"HelloWorldPrompt"
		[Field:HelloWorld]
			Use			: Name Field
			Set as		: "HelloWorld"
			Background	: Yellow
			
		
	
```
