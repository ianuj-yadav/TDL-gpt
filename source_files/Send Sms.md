---
title: Send Sms
type: sample_code
objects: Report, Form, Part, Line, Field
source: Send Sms.txt
---

# Send Sms

## Source Code

```tdl
[#Menu:Gateway Of Tally]
	Add		: Item	: Send Sms	: Alter		: SendSms
	
[Report:SendSms]
	Form		: SendSms

[Form:SendSms]
	Part		: SendSms
	
[Part:SendSms]
	Line		: SendSmsMobile, SendSmsLine1
	
	[Line:SendSmsMobile]
		Field		: MediumPrompt, SendSmsMobileBody
		Local		: Field		: MediumPrompt	: Info	: "Enter Mobile Number"
		
		[Field:SendSmsMobileBody]
			Use                 : Name FIeld
			

	[Line:SendSmsLine1]
		Field		: MediumPrompt, SendSmsBody
		Local		: Field		: MediumPrompt	: Info	: "Enter You Message here"
		
		[Field:SendSmsBody]
			Use                 : Voucher Narration Field
			Lines               : 6
[#Field: EI GSTPartyDealerType]
	Background		: Red



```
