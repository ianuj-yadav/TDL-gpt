---
title: Add extra column in vouchers
type: sample_code
objects: Field
source: Add extra column in vouchers.txt
---

# Add extra column in vouchers

## Source Code

```tdl
[#Line:EI ColumnOne]
	Add:Right Field:Before:VCH QtyTitle:ShowPercent
	[Field:ShowPercent]
		Width:8
		Use:Name Field
		Skip:Yes
		Set as:"Commission"
		Background:Red
	
```
