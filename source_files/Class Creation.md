---
title: Class Creation
type: sample_code
objects: Report, Form, Part, Line, Field, Collection
source: Class Creation.txt
---

# Class Creation

## Source Code

```tdl
	
[Collection:ClassColl]
	Type		: Group
	Report		: ClassReport
	
[Report:ClassReport]
	Title		: "Class Creation"
	Form		: ClassForm
	Object		: Group
	
[Form:ClassForm]
	;Use			: Master Form Template
	Part		: ClassNamePart
	
[Part:ClassNamePart]
	Line		: ClassNameLine
	
	[Line:ClassNameLine]
		Fields			: MediumPrompt, ClassNameField
		Local			: Field			: MediumPrompt		: Info	: $$LocaleString:"Class Name"
		
		[Field:ClassNameField]
			Use			: Name Field
			Storage		: Name
			Case		: First Upper Case
			Unique		: Yes




	
[#Menu:Gateway Of Tally]
	Add		: Item	: Create Class	: Create Collection		: ClassColl
	

```
