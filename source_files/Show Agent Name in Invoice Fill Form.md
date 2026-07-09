---
title: Show Agent Name in Invoice Fill Form
type: sample_code
objects: Line, Field, Collection
source: Show Agent Name in Invoice Fill Form.txt
---

# Show Agent Name in Invoice Fill Form

## Source Code

```tdl
[#Line: EI Consignee]
	Border		: Thick Box
	
 [#Part: EI Consignee]
	 Background		: Yellow
	 Add			: Line	: At Beginning	: EIAgentName		
	 
	[Line:EIAgentName]
		Fields		: Simple Prompt, EIAgentName, EiAgentCommission
		Local       : Field : Simple Prompt: Info       : $$LocaleString:"Agent name:"
		Local 		: Field : Simple Prompt: Width		: @@VchLeftPromptWidth % Page
		Invisible	: Not @@IsSales
		
		[Field:EIAgentName]
			Table		: AgentDtlsColl
			Show Table	: Always
			Storage		: EIAgentName
			Width       : @@VCHNameWidth
			Max			: 251
			Type		: String
			
		[Field:EiAgentCommission]
			Storage		: EIAgentCommission
			Width       : 5
			Type		: Number
			Format		: "Percentage,No Zero"
			Set as		: $$Table:EIAgentName:$AgentComm ;; $$TAble Defines that it comes from a table And EIAgentName Shows that 
							;; The table used in EIAgentName Field ,In this field a collection is used 
							;; So $AgentComm Is used to FEtch That data from the above collection
			Skip		: Yes
			Set Always	: Yes  ;; It is used to keep refreshing the data as the field EIAgentName changed
			

[System:UDF]
	EIAgentName			: String		: 20010
	EIAgentCommission	: Number		: 20011
	



[Collection:SaleVoucher]
	Type        : Voucher Type
    Child of    : $$VchTypeSales
    Belongs To  : Yes

```
