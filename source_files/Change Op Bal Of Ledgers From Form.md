---
title: Change Op Bal Of Ledgers From Form
type: sample_code
objects: Report, Form, Part, Line, Field, Collection, Function
source: Change Op Bal Of Ledgers From Form.txt
---

# Change Op Bal Of Ledgers From Form

## Source Code

```tdl
/*

[#Menu: Gateway of Tally] 
	Add: Key Item	: At End: "Change Ledgers Values" : L	: Alter :ChangeLedgers
[Report :ChangeLedgers]
	Form	: ChangeLedgers
	Title	: $$LocaleString:"Change Ledgers Values"
	Object	: Company
[Form: ChangeLedgers]
	Part			: Form SubTitle, ChangeLedgers
	Width 			: 100% Page
	Height			: 100% Page
	Space Left		: 0.25
	Space Right		: 0.25
	Horizontal Align: Left
	Local	: Field : Form SubTitle	: Info	: "Change Ledgers"
	On : Form Accept: yes	: Form Accept
	On : Form Accept: yes	: Call: ChangeLedgerValFunction
[Part: ChangeLedgers]
	Line 			: ChangeLedgersTitle, ChangeLedgersDetails
	Repeat			: ChangeLedgersDetails	: ChangeLedgerColl
	Scroll			: Vertical
	Common Border	: Yes
	Break On		: $$IsEndOfList:$OldName
	[Line: ChangeLedgersTitle]
		Use			: ChangeLedgersDetails
		Local		: Field	: Default	: Type	: String
		Local		: Field	: Default 	: Style	: Normal Bold
		Local		: Field	: Default	: Align	: Center
		;Local		: Field	: Default 	: Border: Thin Box
		
		Local		: Field	: ChangeLedgerSrNo	 	: Info	: $$LocaleString:"SR No"
		Local		: Field	: ChangeLedgerName1	 	: Info	: $$LocaleString:"Old Name"
		Local		: Field	: ChangeLedgerNewName 	: Info	: $$LocaleString:"New Name"
		Local		: Field	: ChangeLedgerOpBal1 	: Info	: $$LocaleString:"New Opening Balance"
		

	[Line:ChangeLedgersDetails]
		Field		: ChangeLedgerSrNo, ChangeLedgerName1, ChangeLedgerOpBal1, ChangeLedgerNewName
		Space Top	: 0.25
		[Field :ChangeLedgerSrNo]
			Use 		:Short Name Field
			Width 		:5
			Set as 		:$$Line
			Skip 		: Yes
			Border		: Thin Right
		[Field :ChangeLedgerName1]
			Type		: String
			Use			: Name Field
			Storage		: OldName
			Width		: 30
			Border 		: Thin Right
			Table		: AllLedgerColl1,EndOfList
			Show Table	: Always
		[Field :ChangeLedgerNewName ]
			Type		: String
			Use			: Name Field
			Set as		: $OldName
			Set always 	: Yes
			Storage 	: NewName
			Case		: Title Case
			Full Width 	: Yes
			Align 		: Left
			Background	: Red
			Inactive	: $$IsEndOfList:$OldName
		
		[Field: ChangeLedgerOpBal1] 
			Type		: Number
			;Use			: Amount Forex Field
			Storage		: Amount1
			Border		: Thin Left
			Inactive	: $$IsEndOfList:$OldName
		
[Collection: ChangeLedgerColl]
	Title		: "Ledger Entry"
	Type		: LearnWellQuickLedger	: Company
	Child of 	: ##SVCurrentCompany
	Belongs To	: Yes
[Collection: AllLedgerColl1] 
	Title		: "List of Ledgers"
	Type		: Ledger
	Belongs to	: yes
	Format		: $Name, 30
	Align 		: Right
	Full Height : Yes
[System: UDF]
	LearnWellQuickLedger	: Aggregate 	: 40071
	;Date					: Date			: 40072
	OldName					: String		: 40073 
	Amount1					: Number		: 40080
	NewName					: String		: 40075
	;Narration				: String		: 40076
	;LWQuickVCD				: String		: 40077
[System: UDF]
	;OldName				: String		: 40068
[System: Variable]
[Variable: LearnWellGETD1]
	Type		: Number
[Function: ChangeLedgerValFunction]
	Variable		: OldName1		: String 
	Variable		: NewName1		: String 
	Variable 		: OpBalAmt1 	: Number 
	007: WALK COLLECTION	: ChangeLedgerColl
	020: SET	: OldName1	: $OldName 
	030: SET	: NewName1	: $NewName 
	040: SET	: OpBalAmt1	: $Amount1
	060: NEw OBJECT	: Ledger	: ##OldName1
	070: Set Value		: Name		: ##NewName1
	070: Set Value		: OpeningBalance		: $$AsAmount:##OpBalAmt1
	220: Accept Alter
	240: END WALK

*/
;;==================================
/*
[#Menu: Gateway of Tally] 
	Add: Key Item	: At End: "Create Emplyees" : L	: Alter :ChangeLedgers
[Report :ChangeLedgers]
	Form	: ChangeLedgers
	Title	: $$LocaleString:"Change Ledgers Values"
	Object	: Company
[Form: ChangeLedgers]
	Part			: Form SubTitle, ChangeLedgers
	Width 			: 100% Page
	Height			: 100% Page
	Space Left		: 0.25
	Space Right		: 0.25
	Horizontal Align: Left
	Local	: Field : Form SubTitle	: Info	: "Change Ledgers"
	On : Form Accept: yes	: Form Accept
	On : Form Accept: yes	: Call: ChangeLedgerValFunction
[Part: ChangeLedgers]
	Line 			: ChangeLedgersTitle, ChangeLedgersDetails
	Repeat			: ChangeLedgersDetails	: ChangeLedgerColl
	Scroll			: Vertical
	Common Border	: Yes
	Break On		: $$IsEndOfList:$EmpName
	[Line: ChangeLedgersTitle]
		Use			: ChangeLedgersDetails
		Local		: Field	: Default	: Type	: String
		Local		: Field	: Default 	: Style	: Normal Bold
		Local		: Field	: Default	: Align	: Center
		;Local		: Field	: Default 	: Border: Thin Box
		
		Local		: Field	: ChangeLedgerSrNo	 	: Info	: $$LocaleString:"SR No"
		Local		: Field	: ChangeLedgerName1	 	: Info	: $$LocaleString:"Old Name"
		Local		: Field	: ChangeLedgerNewName 	: Info	: $$LocaleString:"New Name"
		Local		: Field	: ChangeLedgerOpBal1 	: Info	: $$LocaleString:"New Opening Balance"
		

	[Line:ChangeLedgersDetails]
		Field		: ChangeLedgerSrNo, ChangeLedgerName1, ChangeLedgerOpBal1, ChangeLedgerNewName
		Space Top	: 0.25
		[Field :ChangeLedgerSrNo]
			Use 		:Short Name Field
			Width 		:5
			Set as 		:$$Line
			Skip 		: Yes
			Border		: Thin Right
		[Field :ChangeLedgerName1]
			Type		: String
			Use			: Name Field
			Storage		: EmpName
			Width		: 30
			Border 		: Thin Right
			
		[Field :ChangeLedgerNewName ]
			Type		: String
			Use			: Name Field
			Set as		: $OldName
			Set always 	: Yes
			Storage 	: EmpDoj
			Case		: Title Case
			Full Width 	: Yes
			Align 		: Left
			Background	: Red
			Inactive	: $$IsEndOfList:$EmpName
		
		[Field: ChangeLedgerOpBal1] 
			Use			: Amount Forex Field
			Storage		: EmpSalary
			Border		: Thin Left
			Inactive	: $$IsEndOfList:$EmpName
		
[Collection: ChangeLedgerColl]
	Title		: "Employee Entry"
	Type		: Employee	: Company
	Child of 	: ##SVCurrentCompany
	Belongs To	: Yes

[System: UDF]
	LearnWellQuickLedger	: Aggregate 	: 40071
	;Date					: Date			: 40072
	EmpName					: String		: 40073 
	EmpSalary				: Amount		: 40080
	EmpDoj					: Date			: 40075
	;Narration				: String		: 40076
	;LWQuickVCD				: String		: 40077
[System: UDF]
	;OldName				: String		: 40068
[System: Variable]
[Variable: LearnWellGETD1]
	Type		: Number
[Function: ChangeLedgerValFunction]
	Variable		: OldName1		: String 
	Variable		: NewName1		: String 
	Variable 		: OpBalAmt1 	: Number 
	007: WALK COLLECTION	: ChangeLedgerColl
	020: SET	: OldName1	: $OldName 
	030: SET	: NewName1	: $NewName 
	040: SET	: OpBalAmt1	: $Amount1
	060: NEw OBJECT	: Employee	: ##OldName1
	070: Set Value		: EmpName		: ##NewName1
	080: Set Value		: EmpSalary		: $$AsAmount:##OpBalAmt1
	090: Set Value		: EmpDoj		: $$AsAmount:##OpBalAmt1
	220: Accept Alter
	240: END WALK
*/
[Object:Employee]
	Storage 	: EmpName 			: String
	Storage 	: EmpDoj	 		: Date
	Storage 	: EmpSalary 		: Amount
	;Storage		: TankCapacity		: Number
[Collection:EmpColl]
	Object	: Employee
;	Title	: $$LocaleString:"List Of Employees"
	;Type	: Employee	;: Company
	Report		: EmpReport
	
	
[#Menu: Gateway of Tally] 
	Add: Key Item	: At End: "Create Emplyees" : L	: Create Collection : EmpColl
	Add: Key Item	: At End: "Show Emplyees" 	: M	: Display 			: Emprepo
	
[Report:EmpReport]
	
	Title		: "Emp Creation"
	Form		: EmpReport
	Object		: Employee
	
[Form:EmpReport]
	Use			: Master Form Template
	Part		: EmpReportName, EmpReportDoj, EmpReportSalary
	
[Part:EmpReportName]
	Line		: EmpReportName
	
	[Line:EmpReportName]
		Fields			: MediumPrompt, EmpReportName
		Local			: Field			: MediumPrompt		: Info	: $$LocaleString:"Emp Name"
		
		[Field:EmpReportName]
			Use			: Name Field
			Storage		: EmpName
			Case		: First Upper Case
			Unique		: Yes
			
[Part:EmpReportDoj]
	Line		: EmpReportDoj
	
	[Line:EmpReportDoj]
		Fields			: MediumPrompt, EmpReportDoj
		Local			: Field			: MediumPrompt		: Info	: $$LocaleString:"Date Of Joining"
		
		[Field:EmpReportDoj]
			Use			: Uni Date Field
			Storage		: EmpDoj
			

[Part:EmpReportSalary]
	Line		: EmpReportSalary
	
	[Line:EmpReportSalary]
		Fields			: MediumPrompt, EmpReportSalary
		Local			: Field			: MediumPrompt		: Info	: $$LocaleString:"Salary"
		
		[Field:EmpReportSalary]
			Use			: Amount Field
			Storage		: EmpSalary
			


			
[Report:Emprepo]
	Form		: Emprepo
	
[Form:Emprepo]
	Part		: Emprepo
	
[Part:Emprepo]
	Line		: Emprepo	
	Repeat		: Emprepo		: EmpColl
	[Line:Emprepo]
		Field		: Emprepo1, Emprepo2, Emprepo3
		[Field:Emprepo1]
			Set as		: $EmpName
			Width		: 10
		[Field:Emprepo2]
			Use			: DateField
			Set as		: $EmpDoj
			Width		: 10
		[Field:Emprepo3]
			Use			: Amount Field
			Set as		: $EmpSalary
			Width		: 10
			





```
