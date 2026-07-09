---
title: Quick Entry
type: sample_code
objects: Report, Form, Part, Line, Field, Collection, Function, Button
source: Quick Entry.txt
---

# Quick Entry

## Source Code

```tdl

[#Menu: Gateway of Tally] 
	Add: Key Item	: At End: "Quick Entry" : L	: Alter :LearnWellQuickVC
[Report :LearnWellQuickVC]
	Form	: LearnWellQuickVCF
	Title	: $$LocaleString:"Quick Entry"
	Object	: Company
[Form: LearnWellQuickVCF]
	Part			: Form SubTitle, LWQuickDF
	Width 			: 100% Page
	Height			: 100% Page
	Space Left		: 0.25
	Space Right		: 0.25
	Horizontal Align: Left
	Local	: Field : Form SubTitle	: Info	: "Quick Entry"
	On : Form Accept: yes	: Form Accept
	On : Form Accept: yes	: Call: LWQuickCall Function
[Part: LWQuickDF]
	Line 			: LearnWellQTitle, LearnwellQDetails
	Repeat			: LearnWellQDetails	: LearnwellQVCColl
	Scroll			: Vertical
	Common Border	: Yes
	Break On		: $$IsEndOfList:$PartyLedgerName
	[Line: LearnWellQTitle]
		Field		: LWQuickSN, LWQuickDT, LWQuickVCT, LWQuickDRL, LWQuickCRL, LWQuickBNKL, LWQuickAMT 
		Right Field	: LWQuickNarration
		Local		: Field	: Default	: Type	: String
		Local		: Field	: Default 	: Style	: Normal Bold
		Local		: Field	: Default	: Align	: Center
		Local		: Field	: Default 	: Border: Thin Box
		[Field:LWQuickSN]
			Width 	: 5
			Set as	: "Srn."
			Skip	: Yes
		[Field:LWQuickDT]
			Width	: @@ShortWidth
			Set as	: "Date"
			Skip	: Yes
		[Field:LWQuickVCT]
			Width 	: 8
			Set as	: "Voucher Type"
			Skip 	: Yes
		[Field: LWQuickDRL]
			Width	: 25
			Set as	: "Dr Ledger"
			Skip	: Yes
		[Field:LWQuickCRL]
			Width	: 25
			Set as	: "Cr Ledger"
			Skip	: Yes
			Skip	: Yes
		[Field: LWQuickAMT]
			Set as	: "Amount"
			Width	: @@ShortWidth
			Skip 	: Yes	
		[Field :LWQuickBNKL]
			Set as	: "BLedger"
			Width	: 5
			Skip	: Yes
			Invisible	: Yes
		[Field: LWQuickNarration]
			Set as		: "Narration"
			Full Width	: Yes
			Skip		: Yes 
	[Line:LearnWellQDetails]
		Field		: LWQuickSRND, LWQuickDND, LWQuickVCD, LWQuickDLD, LWQuickCLD, LWQuickBND, LWQuickAMD 
		Right Field	: LWQuickNARRD
		Space Top	: 0.25
		[Field :LWQuickSRND]
			Use 		:Short Name Field
			Width 		:5
			Set as 		:$$Line
			Skip 		: Yes
		[Field :LWQuickDND]
			Type		: Date
			Use			: Short Date Field
			Storage		: Date
			Width		: @@ShortWidth
			Border 		: Thin Box
		[Field :LWQuickVCD ]
			Type		: String
			Table		: LWQuickVCTColl, EndOfList
			Use			: Name Field
			Set always 	: Yes
			Storage 	: LWQuickVCD
			Show Table	: Always
			Case		: Title Case
			Width 		: 8
			Align 		: Left
			Border		: Thin Box
			Background	: Red
		[Field:LWQuickDLD]
			Type		: String
			Use 		: Name Field
			Table		: LWQuickVCDLColl, EndOfList
			Storage		: PartyLedgerName
			Show Table	: Always
			Case		: Title Case
			Width		: 25
			Align 		: Left
			Inactive 	: $$IsEndOfList:$PartyLedgerName
			Border 		: Thin Box
			Background	: Yellow
		[Field : LWQuickCLD]
			Type		: String
			Use 		: Name Field
			Table		: LWQuickBNKDLColl
			Storage		: LedgerName
			Show Table	: Always
			Case		: Title Case 
			Width		: 25
			Align		: Left
			Border		: Thin Box
			Inactive	: $$IsEndOfList:$PartyLedgerName
			Background	: Green
		[Field:LWQuickBND]
			Type		: String
			Set as		: #LWQuickCLD
			Storage		: SalesLedgerName
			Width		: 5
			Skip		: Yes
			Align		: Left
			Invisible	: Yes
		[Field: LWQuickAMD] 
			Type		: Amount
			Use			: Amount Field 
			Storage		: Amount
			Width		: @@ShortWidth
			Inactive	: $$IsEndOfList:$PartyLedgerName
			Border		: Thin Box
		[Field: LWQuickNARRD]
			Type		: String
			Use			: Name Field
			Storage		: Narration
			Full Width	: Yes
			Inactive	: $$IsEndOfList:$PartyLedgerName
			
[Collection: LearnWellQVCColl]
	Title		: "Bulk Payment Entry"
	Type		: LearnWellQuickEntry	: Company
	Child of 	: ##SVCurrentCompany
[System: UDF]
	LearnwellQuickEntry		: Aggregate 	: 41071
	Date					: Date			: 41072
	PartyLedgerName			: String		: 41073 
	Amount					: Amount		: 41074
	SalesLedgerName			: String		: 41075
	Narration				: String		: 41076
	LWQuickVCD				: String		: 41077
[System: UDF]
	LedgerName				: String		: 41068
[System: Variable]
[Variable: LearnWellGETD]
	Type		: Number
[Function: LWQuickCall Function]
	Parameter		: LearnWellVCGT	: String	: ##SVVoucherType
	Variable 		: SVVoucherType	: String
	Variable		: LWLDate		: Date 
	Variable		: LWLDrL		: String 
	Variable		: LWLCrL		: String 
	Variable 		: LWLAMT 		: Amount 
	Variable		: LWLNarr		: String
	Variable		: LWLBnkt		: String
	Variable 		: LearnWellGETD	: Number	: 1
	001: Start Batch Post	: 10
	005: START PROGRESS		: ($$NumItems:LearnWellQVCColl): "In process" : @@CmpMailName: "Voucher Creation in Process" 
	007: WALK COLLECTION	: LearnWellQVCColl
	010: SET	: LWLDate 	: $$Date:$Date
	010a: Set	: LWLBnkt 	: ""
	015: SET 	: LWLBnkt 	: $LWQuickVCD 
	020: SET	: LWLDrL	: $PartyLedgerName 
	030: SET	: LWLCrL	: $SalesLedgerName 
	040: SET	: LWLAMt	: $$AsAmount:$Amount
	045: SET	: LWLNarr	: $Narration
	050: SET	: SVViewName: $$SysName:AcctgVchView 
	060: NEW OBJECT	: Voucher
	070: SET VALUE	: Date : ##LWLDate
	080: SET VALUE	: VoucherTypeName 	: ##LWLBnkt
	080a: Log		: #LWQuickVCD
	090: SET VALUE	: Narration			: $Narration
	110: INSERT COLLECTION OBJECT		: AllLedgerEntries
	120: SET VALUE	: Ledger Name 		: ##LWLDrL
	140: SET VALUE	: IsDeemedPositive	: "Yes" 
	141: SET VALUE	: Amount : ##LWLAMt * (-1) 
	150: SET TARGET	: ..
	150a: LOG		: $$String:##LWLDrL
	160: INSERT COLLECTION OBJECT	: AllLedgerEntries
	170: SET VALUE	: Ledger Name : ##LWLCrL 
	180: SET VALUE	: Amount : ##LWLAMt
	190: SET VALUE	: IsDeemedPositive: "No"
	200: SET TARGET	: ..
	210: SET VALUE	: PersistedView: ##SVViewName
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
	
[Collection: LWQuickVCTColl]
	Title		: $$LocaleString:"Voucher Types" 
	Collection	: Journal Vouchers
	Collection	: Payment Vouchers 
	Collection	: Receipt Vouchers 
	Collection	: Contra Vouchers 
	;Collection	: Sales Vouchers 
	Fetch 		: Name, Actual VoucherType 
	Format		: $$Name, 10
	
[Collection: LWQuickVCDLColl] 
	Title		: "List of Ledgers"
	Type		: Ledger
	Belongs to	: yes
	Format		: $Name, 30
	Align 		: Right
	Full Height : Yes
	
[Collection: LWQuickBNKDLCOll]
	Title		: "List of Ledgers"
	Type 		: Ledger
	Belongs to 	: yes
	Format		: $Name, 30
	Align 		: Right
	Full Height : Yes



;;;;;;;;;==================================

/*Trigger Key
Auto Press Button on Behalf of user
Trigger Key, which sends the list of keys in
sequence to the system as if an User/operator is
pressing those Keys*/
[#Form: Voucher]
Add: Button:Autowork
[#Form: Daybook]
Add: Button:Autowork
[Button: Autowork]

Title: "Autowork"
Key:Alt+U
Action	: Trigger Key	: Ctrl+C,Alt+P, Ctrl+P,i,
;Action: Trigger Key: Ctrl+c, Ctrl+E,c, "FileName", Enter, Ctrl+V, Enter,Esc:2, E



```
