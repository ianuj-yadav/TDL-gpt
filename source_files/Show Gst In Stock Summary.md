---
title: Show Gst In Stock Summary
type: sample_code
objects: Field
source: Show Gst In Stock Summary.txt
---

# Show Gst In Stock Summary

## Source Code

```tdl
[#Field:DSPQ QTYTitle]
	Add:Field:After:DSP DispTitle:TirlokHSNT
[Field:TirlokHSNT]
	Set as:"HSN"
	
[#Field:DSP CLQty]
	Add:Field:After:DSP DispName:TirlokHSND, NormalHSnCode
[Field:TirlokHSND]
	Set as:$GSTHSNCode
[Field:NormalHSnCode]
	Set as: $$IsEmpty:$GSTItemHSNCodeEx
```
