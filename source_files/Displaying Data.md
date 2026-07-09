---
title: Displaying Data
type: sample_code
objects: Report, Form, Part, Line
source: Displaying Data.txt
---

# Displaying Data

## Source Code

```tdl
[Report:Displaying Data]
	Title	:"Displaying Data"
	Form	:Display Data
	
[Form:Display Data]
	Top Part	:StkItemDisplay
	Bottom Part	:LedgerDisplay
	
[Part:StkItemDisplay]
	Line		:StkItemDisplay
	ObjectEx	:(Stock Item,"Dell C2000").
	
	[Line:StkItemDisplay]
		Field	:StkItemName, StkItemGroup, StkItemClosingBalance
		Local	:Field	:StkItemName			:Set as	:$Name
		Local	:Field	:StkItemGroup			:Set as	:$Parent
		Local	:Field	:StkItemClosingBalance	:Set as	:$ClosingBalance
		

[Part:LedgerDisplay]
	Line		:LedgerDisplay
	ObjectEx	:(Ledger,"Jeevan Electronics").
	
	[Line:LedgerDisplay]
		Use:StkItemDisplay

;		Field:StkItemName, StkItemGroup, StkItemClosingBalance
;		Local:Field:StkItemName:Set as:$Name
;		Local:Field:StkItemGroup:Set as:$Parent
;		Local:Field:StkItemClosingBalance:Set as:$ClosingBalance
```
