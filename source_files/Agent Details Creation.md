---
title: Agent Details Creation
type: sample_code
objects: Report, Form, Part, Line, Field, Collection
source: Agent Details Creation.txt
---

# Agent Details Creation

## Source Code

```tdl
[#Menu:Gateway Of tally]
	Add		: Key Item    : After:@@locChartofAccounts  : Agent Details : G :Alter   	: Agent Details Creation	: $IsAgentModuleEnabled:Company:##SVCurrentCompany
	;; Control	: Agent Details: $IsAgentModuleEnabled:Company:##SVCurrentCompany
	;; We can remove control and give it to the add item as above.
	;; The control validation can completly remove the link.
	;; But the above method at declaration can show the link but it is disabled.
	
[Report:Agent Details Creation]
	Title	: "Agent Details Creation"
	Form	: Agent Details Creation
	Object	: Company	: ##SVCurrentCompany
	Family	: "Agent Master"
	
[Form:Agent Details Creation]
	Part				: Agent Details Creation
	Vertical Align		: Top
	Horizontal Align	: Center
	Background			: Very Light Magenta
	
[Part:Agent Details Creation]
	Line		: AgentDtlsTitle, AgentDtlsBody 
	Repeat		: AgentDtlsBody	: AgentDtls ;; AgentDtls is an aggregate UDF which is defined below
	Scroll		: Vertical
	Break On	: $$IsEndOfList:$AgentName ;; End of list is a default collection
					;; By above code the cursor go another fields after we select end of list in agent name
					;; So we have to write skip conditions in other fields as given 
	
	Common Border	: Yes
	[Line:AgentDtlsTitle]
		
		Use		: AgentDtlsBody
		
		Local	: Field	: Default	: Type	: String
		Local	: Field	: Default	: Line	: 0
		Local	: Field	: Default	: Align	: Center
		Local	: Field	: Default	: Style	: Normal Bold
		Local	: Field	: Default	: Delete: Storage
		
		Local	: Field	: AgentName	: Info	: "Name"
		Local	: Field	: AgentDOJ	: Info	: "Date Of Joining"
		Local	: Field	: AgentComm	: Info	: "Commission (%)"
		
		Border	: Thin Bottom
		
		Space Top	: 1
	[Line:AgentDtlsBody]
		Fields		: AgentName, AgentDOJ, AgentComm
		
		[Field:AgentName]
			Type		: String
			Table		: AgentNameCollection, End Of List ;; This show End of List in Table
			Show Table	: Always
			Width		: 25
			Max			: 251
			Storage		: AgentName
			;Unique		: Yes
			Dynamic		: "" ;; This do not show used name in Previous fields

		[Field:AgentDOJ]
			Type		: Date
			Width		: 12
			Max			: 12
			Storage		: AgentDOJ
			Skip		: $$IsEndOfList:$AgentName 
			Border		: Thin left right
			Valid		: NOT $$IsEmpty:$$Value
			;;  Notify	: @@DOJLessThanBookBeginning : $$Value < $BooksFrom:Company:##SVCurrentCompany ;; This will work in tally erp not in prime
			Notify		: DOJLessThanBookBeginning : $$Value < $BooksFrom:Company:##SVCurrentCompany

		[Field:AgentComm]
			Type		: Number
			Align		: Right
			Width		: 25
			Max			: 251
			Storage		: AgentComm
			Skip		: $$IsEndOfList:$AgentName
			Valid		: NOT $$IsEmpty:$$Value
			Control		: HighCommission:$$Value > $$Number:15
			Control		: LowCommission:$$Value < $$Number:0
			Format		: "NoZero, Percentage"



[System:UDF]
	
	AgentDtls	: Aggregate	: 20007
	AgentName	: String	: 20004
	AgentDOJ	: Date		: 20005
	AgentComm	: Number	: 20006


[System:Formula]
	DOJLessThanBookBeginning 	: "Date Of Joining Less Than Book Of Beginning" 
	HighCommission				: "The commission is higher than 15%"
	LowCommission				: "The commission is lower than 0%"
	


[Collection:AgentDtlsColl]
	Title		: "List of Active Agents"
	Type		: AgentDtls		: Company
	Child Of	: ##SVCurrentCompany
	Format		: $AgentName, 30 ;;(30 shows the width of collection)

```
