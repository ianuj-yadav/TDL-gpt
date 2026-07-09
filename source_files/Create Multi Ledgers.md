---
title: Create Multi Ledgers
type: sample_code
objects: Report, Form, Part, Line, Field, Collection, Function
source: Create Multi Ledgers.txt
---

# Create Multi Ledgers

## Source Code

```tdl

[#Menu: Gateway of Tally] 
	Add: Key Item	: At End: "Multi Ledger Entry" : L	: Alter :LearnWellQuickVC
	Add	: Key Item	: At End	: Multi Ledger Delete	: B		: Alter	: LearnWellQuickDL
[Report :LearnWellQuickVC]
	Form	: LearnWellQuickVCF
	Title	: $$LocaleString:"Multi Ledger Entry"
	Object	: Company
[Form: LearnWellQuickVCF]
	Part			: Form SubTitle, LWQuickDF
	Width 			: 100% Page
	Height			: 100% Page
	Space Left		: 0.25
	Space Right		: 0.25
	Horizontal Align: Left
	Local	: Field : Form SubTitle	: Info	: "Multi Ledger Entry"
	On : Form Accept: yes	: Form Accept
	On : Form Accept: yes	: Call: LWQuickCall Function
[Part: LWQuickDF]
	Line 			: LearnWellQTitle, LearnwellQDetails
	Repeat			: LearnWellQDetails	: LearnwellQVCColl
	Scroll			: Vertical
	Common Border	: Yes
	Break On		: $$IsEndOfList:$LedgParent Or $$IsEmpty:$PartyLedgerName
	[Line: LearnWellQTitle]
		Field		: LWQuickSN, LWQuickDT, LWQuickVCT, LWQuickDRL, LWQuickAMT   
		Right Field	: LwDrCrT
		Local		: Field	: Default	: Type	: String
		Local		: Field	: Default 	: Style	: Normal Bold
		Local		: Field	: Default	: Align	: Center
		Local		: Field	: Default 	: Border: Thin Box
		[Field:LWQuickSN]
			Width 	: 5
			Set as	: "Srn."
			Skip	: Yes
		[Field:LWQuickDT]
			Width	: 20
			Set as	: "Ledger Name"
			Skip	: Yes
		[Field:LWQuickVCT]
			Width 	: 10
			Set as	: "Under"
			Skip 	: Yes
		[Field: LWQuickDRL]
			Width	: 25
			Set as	: "State"
			Skip	: Yes

		[Field: LWQuickAMT]
			Set as	: "OpeningBal"
			Width	: 10
			Skip 	: Yes	
			
		[Field: LwDrCrT]
			Set as	: "Dr/Cr"
			Width	: 10
			Skip 	: Yes	

	[Line:LearnWellQDetails]
		Field		: LWQuickSRND, LWQuickDND, LWQuickVCD, LWQuickDLD, LWQuickAMD
		Right Field	: LwDrCrD
		Space Top	: 0.25
		[Field :LWQuickSRND]
			Use 		:Short Name Field
			Width 		:5
			Set as 		:$$Line
			Skip 		: Yes
		[Field :LWQuickDND]
			Type		: String
			Use 		: Name Field
			Storage		: PartyLedgerName
			Width		: 20
			Border 		: Thin Box
			
		[Field :LWQuickVCD ]
			
			Table		: Group, EndOfList
			Use			: Name Field
			Set always 	: Yes
			Storage 	: LedgParent
			Show Table	: Always
			Case		: Title Case
			Width 		: 10
			Align 		: Left
			Border		: Thin Box
			Background	: Red
			Inactive	: $$IsEmpty:$PartyLedgerName
		[Field:LWQuickDLD]
			Type		: String
			Table		: Indian States
			
			Storage		: StateName
			Show Table	: Always
			Width 		: 25
			Border 		: Thin Box
			Background	: Yellow
			Inactive	: $$IsEmpty:$PartyLedgerName

		[Field: LWQuickAMD] 
			Type		: Amount
			Use			: Amount Field 
			Storage		: Amount
			Width		: 10
			Inactive	: $$IsEmpty:$PartyLedgerName
			Border		: Thin Box

		[Field: LwDrCrD] 
			Type		: String
			Use			: Name Field 
			Storage		: LwDrCr
			Width		: 10
			Inactive	: $$IsEmpty:$PartyLedgerName
			Border		: Thin Box
			Show Table	: Always
			Table		: DrCrTable
		
;[Collection:DrCrTable]
;	Objects	: DrTable, CrTable
;	
;[Object:DrTable]
;	Name		: "Dr"
;	
;[Object:CrTable]
;	Name		: "Cr"
[Collection: LearnWellQVCColl]
	Title		: "Ledger Entry"
	Type		: LearnWellQuickEntry	: Company
	Child of 	: ##SVCurrentCompany
[System: UDF]
	LearnwellQuickEntry		: Aggregate 	: 41071
	LedgParent				: String			: 41072
	PartyLedgerName			: String		: 41073 
	Amount					: Amount		: 41074
	StateName				: String		: 41075
	LwDrCr					: String		: 41076
[System: UDF]
	LedgerName				: String		: 41068
[System: Variable]
[Variable: LearnWellGETD]
	Type		: Number
[Function: LWQuickCall Function]
	;Parameter		: LearnWellVCGT	: String	: ##SVVoucherType
	Variable		: LedgName		: String 
	Variable		: LedgParent	: String 
	Variable		: LedgState		: String 
	Variable 		: LedgeAmt 		: Amount 
	Variable		: LWLDrCr		: String
;	Variable		: LWLBnkt		: String
	Variable 		: LearnWellGETD	: Number	: 1
	001: Start Batch Post	: 10
	005: START PROGRESS		: ($$NumItems:LearnWellQVCColl): "In process" : @@CmpMailName: "Ledger Creation in Process" 
	007: WALK COLLECTION	: LearnWellQVCColl
	010: SET	: LedgName 	: $PartyLedgerName
	;010a: Set	: LWLBnkt 	: ""
	015: SET 	: LedgParent 	: $LedgParent 
	020: SET	: LedgState	: $StateName 
	030: SET	: LedgeAmt	: $$AsAmount:$Amount
	040: SET	: LWLDrCr	: $LwDrCr
;	045: SET	: LWLNarr	: $Narration
;	050: SET	: SVViewName: $$SysName:AcctgVchView 
	060: NEW OBJECT	: Ledger
	070: SET VALUE	: Name			: ##LedgName
	080: SET VALUE	: Parent			: ##LedgParent
	090: SET VALUE	: LedState	: ##LedgState
	091	: Set Value	: LedMailingCountryName	: "India"
	092	: Set Value	: CountryofResidence	: "India"
	
	095: Log		: $name+ "  == "+ $Parent+ "  == "+ $LedStateName+ "  == "+ ##LedgState
;	100: SET VALUE	: OpeningBalance			: ##LedgeAmt
;	110: INSERT COLLECTION OBJECT		: AllLedgerEntries
;	120: SET VALUE	: Ledger Name 		: ##LWLDrL
	140: SET VALUE	: IsDeemedPositive	: If ##LWLDrCr="Dr" Then "Yes" Else "No" 
	141: SET VALUE	: OpeningBalance : If ##LWLDrCr="Dr" Then (##LedgeAmt * (-1)) Else ##LedgeAmt
;	150: SET TARGET	: ..
;	150a: LOG		: $$String:##LWLDrL
;	160: INSERT COLLECTION OBJECT	: AllLedgerEntries
;	170: SET VALUE	: Ledger Name : ##LWLCrL 
;	180: SET VALUE	: Amount : ##LWLAMt
;	190: SET VALUE	: IsDeemedPositive: "No"
	200: SET TARGET	: ..
;	210: SET VALUE	: PersistedView: ##SVViewName
	220: CREATE TARGET
	230: INCREMENT	: LearnWellGETD
	230a: SHOW PROGRESS	: ##LearnWellGETD
	240: END WALK
	260: END PROGRESS
	280: RETURN
	290: End Batch Post
	
[Report: LearnwellRepTdd]
	Use		: Daybook
	Set		: SVFromDate: $$FinYearBeg:##StartDate:$StartingFrom:Company:##SVCurrentCompany 
	Set		: SVToDate	: $$FinYearEnd:##StartDate:$StartingFrom:Company:##SVCurrentCompany
	


;;;;;===========================


[Report :LearnWellQuickDL]
	Form	: LearnWellQuickDL
	Title	: $$LocaleString:"Multi Ledger Delete"
	Object	: Company

[Form:LearnWellQuickDL]
	Part	: LearnWellQuickDL
	On : Form Accept: yes	: Form Accept
	On : Form Accept: yes	: Call: LWQuickDeleteCallFunction
[Part:LearnWellQuickDL]
	Lines		: LearnWellQuickDLT, LearnWellQuickDLD
	Repeat		: LearnWellQuickDLD		: LearnWellDeleteLedgColl
	Scroll			: Vertical
	Common Border	: Yes
	Break On		: $$IsEndOfList:$DeleteLedgName 
	[Line:LearnWellQuickDLT]
		Fields		: LwDLSrNoT, LwDLLedgNameT
		[Field:LwDLSrNoT]
			Set as		: "Sr No"
			Skip		: Yes
			Width		: 5
			
		[Field:LwDLLedgNameT]
			Set as		: "Ledger Name"
			Skip		: Yes
			Width		: 25
			
	[Line:LearnWellQuickDLD]
		Fields		: LwDLSrNoD, LwDLLedgNameD
		[Field:LwDLSrNoD]
			Set as		: $$Line
			Skip		: Yes
			Width		: 5
			
		[Field:LwDLLedgNameD]
			Use			: Name Field
			Storage		: DeleteLedgName
			Table		: LWQuickBNKDLCOll, EndOfList
			Show Table	: Always
			Width		: 25
			Dynamic		: ""
			

[Collection: LWQuickBNKDLCOll]
	Title		: "List of Ledgers"
	Type 		: Ledger
	Belongs to 	: yes
	Format		: $Name, 30
	Align 		: Right
	Full Height : Yes


[Collection: LearnWellDeleteLedgColl]
	Title		: "Ledger Delete"
	Type		: LearnWellQuickDelete	: Company
	Child of 	: ##SVCurrentCompany
	
[System:UDF]
	LearnWellQuickDelete	: Aggregate		: 45011
	DeleteLedgName			: String		: 45012
	
[Function:LWQuickDeleteCallFunction]
	Variable	: LedgName1		: String
	Variable 	: LearnWellGETD	: Number	: 1
	001: Start Batch Post	: 10
	005: START PROGRESS		: ($$NumItems:LearnWellDeleteLedgColl): "In process" : @@CmpMailName: "Ledger Delete in Process" 
	007: WALK COLLECTION	: LearnWellDeleteLedgColl
	010: SET	: LedgName1 	: $PartyLedgerName
	;010a: Set	: LWLBnkt 	: ""
	060: Delete OBJECT	: Ledger	: ##LedgName1
	;200: SET TARGET	: ..
;	210: SET VALUE	: PersistedView: ##SVViewName
	;220: Delete TARGET
	230: INCREMENT	: LearnWellGETD
	230a: SHOW PROGRESS	: ##LearnWellGETD
	240: END WALK
	260: END PROGRESS
	280: RETURN
	290: End Batch Post
	
```
