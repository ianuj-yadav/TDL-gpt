---
title: Fast Entry
type: sample_code
objects: Function
source: Fast Entry.txt
---

# Fast Entry

## Source Code

```tdl
[#Line:DSP VchDetail]
	;Space Bottom	: 3
	

[#Line: DSP VchDybkDetail]
	Key		: LearnwellDouble
	
[Key:LearnwellDouble]
	Title		: "Voucher Entry"
	Key			: Left Double Click
	Action		: Call		: NewVoucher
	
[Function:NewVoucher]
	10	: Trigger Key	: Alt+2, Ctrl+A
```
