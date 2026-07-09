---
title: add mode in list
type: sample_code
objects: Field
source: add mode in list.txt
---

# add mode in list

## Source Code

```tdl
[System: UDF]
	Mode: String: 1006
	Mode12:String:1005

/*
[#Line: DSP VchAccTitles]
	Add : Right Fields:DSP VchModeTitle
	*/


[#Line:DSP VchAccTitles]
	Add: Field:At Beginning:DSP VchModeTitle
	
[Field: DSP VchModeTitle]
	Use         : Short Name Title Field
	;Width       : @@DSPNumberWidth - 2
	Set as        :"Mode Of Payment"
	Background:Yellow
	Storage:Mode12
[#Field: MST Name]
	Background:Red
[#Part: LEDNotes]
	Background:Yellow

[#Field: ACLSLed]
	Background:Red
[#Part: MST Basic]
	Background:Yellow
[#Field: DSP VchNumberTitle]
	Background:Red

```
