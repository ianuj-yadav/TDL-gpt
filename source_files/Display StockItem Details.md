---
title: Display StockItem Details
type: sample_code
objects: Report, Form, Part, Line, Field
source: Display StockItem Details.txt
---

# Display StockItem Details

## Source Code

```tdl
[Report:Display StockItem Details]
	Title	:"Stock Item Details"
	Form	:StkItem Dtls
	Object	:Stock Item : "Dell C2000"
	
[Form:StkItem Dtls]
	Part	:StkItem Dtls
	
[Part:StkItem Dtls]
	Line	:StkItemName, StkItemGroup, StkItemClosingBalance
	[Line:StkItemName]
		Fields	:Medium Prompt,StkItemName
		Local	:Field	:Medium Prompt	:Set as	:"Stock Item Name"
		[Field:StkItemName]
			Set as	:$Name
			Width	:20% Page
	[Line:StkItemGroup]
		Fields	:Medium Prompt,StkItemGroup
		Local	:Field	:Medium Prompt	:Set as	:"Stock Item Group"
		[Field:StkItemGroup]
			Set as	:$Parent
			Width	:20% Page

	[Line:StkItemClosingBalance]
		Fields	:Medium Prompt,StkItemClosingBalance
		Local	:Field	:Medium Prompt	:Set as	:"Stock Item Closing Balance"
		[Field:StkItemClosingBalance]
			Set as	:$ClosingBalance
			Width	:20% Page
	
```
