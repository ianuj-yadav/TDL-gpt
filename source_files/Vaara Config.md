---
title: Vaara Config
type: sample_code
objects: Line, Field
source: Vaara Config.txt
---

# Vaara Config

## Source Code

```tdl
[Include:New Vaara Clothing Print.txt]
[Include:show Gst Percent.txt]
[Include:Vaara Clothing.txt]
[Include:Vaara HSN.txt]
[Include:Vaara Collections.txt]
[Include:Vaara Conditions.txt]
[Include:Aggregate Udf Practice.txt]
;[Include:Purchase Voucher Vaara.txt]


[#Menu:Gateway of Tally]
	Add		: Key Item	: Before	: @@LocQuit		: Terms And Conditions	: I	: Alter		: VaaraConditions
	



;[#Part: Sales InvMode Right Config]
;	Add 	: Line	: After	:  ICFG EditeWayBill	: Vaara Cloting Config
;	
;	[Line:Vaara Cloting Config]
;		Field		: Long Prompt, Vaara Cloting Config
;		Local		: Field	: Long Prompt	: Info	:  $$LocaleString:"Open Vaara Clothing Type :" 
;		
;		[Field: Vaara Cloting Config]
;			Use        	: Logical Field		
;			Background	: Yellow
;			Modifies	: VaaraClotingConfig
;			
;
;
;	
;
;
;
;[System:UDF]
;
;	IsVaaraModeEnabled        : Logical		: 20530
;	
;[Variable:VaaraClotingConfig]
;	Type		: Logical
;	Persistent	: Yes
;	Volatile	: No
;	
;[System:Variables]
;	VaaraClotingConfig	: Yes
```
