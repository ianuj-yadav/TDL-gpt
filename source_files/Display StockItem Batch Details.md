---
title: Display StockItem Batch Details
type: sample_code
objects: Report, Part, Line, Field
source: Display StockItem Batch Details.txt
---

# Display StockItem Batch Details

## Source Code

```tdl
[Report:Display StockItem Batch Details]
	Title	:"StockItem Batch Details"
	Use		:Display StockItem Details
	Local	:Form	:StkItem Dtls	:Add	:Part	: StkBatch Dtls
	
[Part:StkBatch Dtls]
	Object	:Batch Allocations	:First
	Line	:StkBatch Name
	
	[Line:StkBatch Name]
		Field	:Medium Prompt, StkBatch Name
		Local	:Field	:Medium Prompt	:Set as	:"Batch Name"
		
		[Field:StkBatch Name]
			Set as	:$BatchName ;+" "  + $ClosingBalance
```
