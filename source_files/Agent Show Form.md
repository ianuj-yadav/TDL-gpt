---
title: Agent Show Form
type: sample_code
objects: Report, Form, Part, Line, Field, Collection
source: Agent Show Form.txt
---

# Agent Show Form

## Source Code

```tdl
[Report:Agent Show Form Of Company]
	Form:Agent Show Form Of Company
	
[Form:Agent Show Form Of Company]
	Part: Agent Show Form Of Company
	
[Part:Agent Show Form Of Company]
	Line:Agent Show Form Of Company
	;Repeat:Agent Show Form Of Company:CmpAgentName

	[Line:Agent Show Form Of Company]
		Field:Agent Show Form Of Company
		[Field:Agent Show Form Of Company]
			;Set as: "Hello";$CmpAgentName:Company:##SVCurrentCompany
			Type		: String
			Table		: AgentNameCollection,Not Applicable
			Show Table	: Always
			Width		: 20
			;Set as: $CmpAgentName:Company:##SVCurrentCompany
			Set as		: $AgentDOJ:AgentNameCollection:$CmpAgentName:Company:##SVCUrrentCompany




;;; For Practice


[Collection: SaleVCH]
	Type: Vouchers: VoucherType
	Child of: $$VchTypeSales
	Belong to : Yes
	
[Collection: PurchaseVCH]
	Type: Vouchers: VoucherType
	Child of: $$VchTypePurchase
	Belong to : Yes
```
