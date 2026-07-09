---
title: Before After Delete Object
type: sample_code
objects: Function
source: Before After Delete Object.txt
---

# Before After Delete Object

## Source Code

```tdl
[System:Events]
	BeforeStockItemDelete	: Before Delete Object	: $$IsStockItem:Call:BeforeDeleteFunction
	AfterStockItemDelete	: After Delete Object	: $$IsStockItem:Call:AfterDeleteFunction
	
[Function:BeforeDeleteFunction]
	01	: Log	: "Before Delete Object Here"
	02	: Log	: $Name+" under Group "+$Parent+" is going to deleted by "+$$CmpUserName
	03	: Log	: "Master Id Is " + $MasterId

[Function:AfterDeleteFunction]
	01	: Log	: "After Delete Object Here Is done by You"




```
