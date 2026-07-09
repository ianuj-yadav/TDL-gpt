---
title: Gold Dynamic Rate
type: sample_code
objects: Report, Form, Part, Line, Field, Collection, Button
source: Gold Dynamic Rate.txt
---

# Gold Dynamic Rate

## Source Code

```tdl
;[Include:HttpJson.txt]

[#Menu: Gateway Of Tally]
	Add		: Key Item	: At End	: GoldDynamicRate	: Y	: Alter		: GoldDynamicRate
	Add		: Key Item	: At End	: EmployeeData		: L	: Display	: EmployeeData
	
	
[Report:GoldDynamicRate]
	Form	: GoldDynamicRate
	
[Form:GoldDynamicRate]
	Height	: 100% Screen
	Width	: 100% Screen
	Part	: GoldDynamicRate
	
[Part:GoldDynamicRate]
	Width	: 100% Page
	Line	: GoldDynamicRateLine
	Repeat	: GoldDynamicRateLine	: GoldDynamicRate
	
	[Line:GoldDynamicRateLine]
		Field	: GoldDynamicRateQuality, GoldDynamicRatePrice
		
		[Field:GoldDynamicRateQuality]
			Set as		: $quality
			Width		: 10
			Skip		: Yes
			
		[Field:GoldDynamicRatePrice]
			Set as		: $ratepergram
			Width		: 10
			Skip		: Yes


;[#Field: VCH Rate]
;	Background	: Yellow
;	Rate		: $ratepergram:StockItem:StockItemName
;	Set as		: @Rate;If  @@IsEmpty:@Rate Then 0 else $ratepergram
	

[#Report:StockItem]
	Fetch Collection	: GoldDynamicRate	
	;Local	: Collection	: Fetch		: GoldDynamicRate
[#Part: STKI Batch]
	;Line		: GoldQuality, DynamicRate
	Background	: Yellow

	[Line:GoldQuality]
		Fields      : GoldQualityTitle, GoldQuality
		Space Top	: 1
		Remove if	: Not @@ContainGold

		[Field:GoldQualityTitle]
			Align       : Prompt
			Width       : 28
			Skip        : Yes
			Fixed       : Yes
			Set as		: "Quality Of Gold " 
			Background	: Yellow
        
		
		[Field:GoldQuality]
			Storage		: GoldQuality
			Table		: GoldQualityColl
			Show Table	: Always
			Width		: 10
			
			
    
	[Line:DynamicRate]
		Fields      : DynamicRateTitle, DynamicRate
		Space Top	: 1
		Remove if	: Not @@ContainGold
		[Field:DynamicRateTitle]
			Align       : Prompt
			Width       : 28
			Skip        : Yes
			Fixed       : Yes
			ItemName	: $Name:StockItem:$StockitemName
			Set as		: "Today's " +@ItemName	+	" Rate"
			Background	: Yellow
        
		
		[Field:DynamicRate]
			Use			: Amount Field
			Set as		: $$Table:GoldQuality:$ratepergram 
			Set Always	: Yes
			;Table		: GoldRateColl
;			Show Table	: Always
			;Quality		: $quality:GoldDynamicRate:#GoldQuality
			;Rate		: $ratepergram:GoldDynamicRate:#GoldQuality
			;Set as		: @Quality;$$AsAmount:@Rate
			;Set as		: #GoldQuality
			;Dynamic		: Yes
			;skip		: Yes
			;Width		: 10
			;Storage		: GoldRate
    
;[#Field: VCH Rate]
;	Delete		: Switch
;	Set as		: If @@ContainGoldInvoice then $ratepergram:StockItem:$quality:Stockitem:$Stockitemname else 0
;	Background	: Red
	 

[System:UDF]

	GoldQuality	: String	: 20056
	
[System:Formulae]
	ContainGold			: $StockItem contains "Gold"
	ContainGoldInvoice	: $StockItem:StockItem:$StockItemName contains "Gold"
	
	
[System : Formula]
	StkNameFilter : $quality = #GoldQuality
[Collection: GoldDynamicRate]
	Data Source 		: File JSON 	: "E:\tirlok\tdl files\Gold Rate\Gold Rate Json File.json" 	; File Path/Name
	JSON Object Path	: goldrates		: 1				; Main object path
	Client Only			: Yes							; For client side only 
;	Remote Request  : GoldDynamicRate [:ASCII]
;	JSON Object Path: "."
;    Type: GoldRate
	
[Collection:EmployeeData]
	Data Source			: File JSON		: "C:\Users\user\Desktop\Assignment\excel-to-json 1000.json"
	JSON Object Path	: Sheet2		: 1
	Client Only			: Yes
	
[Collection:GoldQualityColl]
	Title	: "Gold Quality"
	Source Collection	: GoldDynamicRate
	Fetch	: Quality, ratepergram
	Format	: $Quality, 10
	Format	: $ratepergram, 10
	

	
	
;[Collection:GoldRateColl]
	;Title	: "Gold Rate"
	;Source Collection	: GoldDynamicRate
	;Fetch	: *;ratepergram
	;Object	: goldrates
	;Format	: $ratepergram, 10

[Collection : Emp]

Object : E mp1, Emp2

[Object : E mp1]

EmpName : " Ram Kumar"

Age     : "25"

[Object : E mp2]

EmpName : " Krishna Yadav"

Age     : "30"

;;====================Add Quality and rate in tally voucher fill form==========

[#Line: EI ColumnOne]
	Option:Optionrate1
[!Line:Optionrate1]
	Add		: Right Fields		: Before		:	VCH QtyTitle	:	GoldQualityTitleVoucher;, GoldRateTitleVoucher
	
	[Field:GoldQualityTitleVoucher]
		Use			: VCH QtyTitle
		Set as		: "Quality"
		Color		: Red
		
		
[#Field: VCH Rate]
	Delete		: Switch	: VCH Rate	: VCH NrmlRate 
	Delete		: Switch		: VCH Rate	: VCH JrnlRate
	Delete		: Switch		: VCH Rate	: VCH POS Rate
	Switch		: VCH Rate	:  VCH GoldRate	: $$IsEqual:$StockitemName:"Gold" 
	;Set as		: $$Table:GoldQualityInVoucher:$ratepergram
	Switch		: VCH Rate  : VCH NrmlRate : NOT @@IsStockJrnl AND NOT @@IsPOSInvoice
    Switch		: VCH Rate	: VCH JrnlRate : @@IsStockJrnl
    Switch		: VCH Rate	: VCH POS Rate : NOT @@IsStockJrnl AND @@IsPOSInvoice 
;	Set as		: If @YesNo Then @GoldRate Else @ItemRate
;	YesNo		: If $StockitemName="Gold" Then Yes Else No
;	GoldRate	: $$Table:GoldQualityInVoucher:$ratepergram
;	ItemRate	: $Rate:StockItem:$StockitemName
	
[!Field:VCH GoldRate]
	Set as		: @GoldRate
	GoldRate	: $$Table:GoldQualityInVoucher:$ratepergram
	Skip		: Yes
	Background	: Yellow
	Color		: Red
	Set Always	: Yes
	
	
[#Line:Ei invinfo]
	Option	: GoldQualityInVoucher	: $$Issales:$vouchertypename
[!Line:GoldQualityInVoucher]
	Add		: Right Field	: At Beginning	: GoldQualityInVoucher
	[Field:GoldQualityInVoucher]
	
		Use			: Name Field
		Storage		: GoldQuality
		Table		: GoldQualityColl
		Show Table	: Always
		Align		: Right
		Width		: 8
		Set Always	: Yes
		Skip		: If $StockitemName="Gold" Then No Else Yes
		YesNo		: If $StockitemName="Gold" Then Yes Else No
		
		


;;=========================================================
[Report:EmployeeData]
	Form	: EmployeeData
	
[Form:EmployeeData]
	Height		: 100% Screen
	Width		: 100% Screen
	
	Part		: EmployeeDataTitle, EmployeeData
	;Bottom Part	: EmloyeeDataTotal
	
	
	
	Bottom Button		: PrintThis
	
[Part:EmployeeDataTitle]
	Line		: EmployeeDataTitle
	
	Border		: Thick Bottom
	
	
	[Line:EmployeeDataTitle]
		Use		: EmployeeData
		
		Local	: Field		: Default				: Align		: Center
		Local	: Field		: Default				: Type		: String
		Local	: Field		: Default				: Style		: Normal Bold
		Local	: Field		: Default				: Skip		: Yes
		;Local	: Field		: Default				: Delete	: Border
		
		Local	: Field		: EmployeeDataSrNo		: Set as	: "Sr. No."
		Local	: Field		: EmployeeDataName		: Set as	: "Name"
		Local	: Field		: EmployeeDataGender	: Set as	: "Gender"
		Local	: Field		: EmployeeDataCountry	: Set as	: "Country"
		Local	: Field		: EmployeeDataAge		: Set as	: "Age"
		Local	: Field		: EmployeeDataDate		: Set as	: "Date"
		Local	: Field		: EmployeeDataID		: Set as	: "Salary ($)"
		
[Part:EmployeeData]
	Parts			: EmployeeDataBody
	Vertical		: Yes
	Common Border	: Yes
	


[Part:EmployeeDataBody]
	Width		: 100% Page
	Line		: EmployeeData
	Repeat		: EmployeeData	: EmployeeData
	Bottom Line	: EmloyeeDataTotal
	Total		: EmployeeDataID
	Scroll		: Vertical
	
	[Line:EmployeeData]
		Field			: EmployeeDataSrNo, EmployeeDataName,
		Right Fields	:  EmployeeDataGender, EmployeeDataCountry, EmployeeDataAge, EmployeeDataDate, EmployeeDataID
		;Height			: 3
		[Field:EmployeeDataSrNo]
			Use			: Number Field
			Set as		: $SrNo
			Width		: 10
			Skip		: Yes
			Border		: Thin Right
			
			
		[Field:EmployeeDataName]
			Use			: Name Field
			Set as		: $FirstName+" "+$LastName
			Full Width		: Yes
			;Border		: Thin right
			
			
			
		[Field:EmployeeDataGender]
			Set as		: $Gender
			Width		: 30
			Space Right		: @Align
			Alin		: If $Gender="Male" Then 5 Else 0
			Border		: Thin left
			

		[Field:EmployeeDataCountry]
			Set as		: $Country
			Width		: 36
			
			Border		: Thin Left Right

		[Field:EmployeeDataAge]
			Set as		: $Age
			Width		: 12
			Skip		: Yes

		[Field:EmployeeDataDate]
			Use			: Date Field
			Set as		: $$CurrentDate;$Date
			Width		: 12
			Border		: Thin Left Right

		[Field:EmployeeDataID]
			Use			: Amount Forex FIeld
			Set as		: $$AsAmount:$Salary
			Width		: 15
			


	
	[Line:EmloyeeDataTotal]
		Use		: EmployeeData
		Border	: Thick Top 
		
		
		;Local	: Field		: Default				: Align		: Center
		Local	: Field		: Default				: Type		: String
		;Local	: Field		: Default				: Style		: Normal Bold
		;Local	: Field		: Default				: Skip		: Yes
		;Local	: Field		: Default				: Delete	: Border
		
		Local	: Field		: EmployeeDataSrNo		: Set as	: ""
		Local	: Field		: EmployeeDataName		: Set as	: ""
		Local	: Field		: EmployeeDataGender	: Set as	: ""
		Local	: Field		: EmployeeDataCountry	: Set as	: ""
		Local	: Field		: EmployeeDataAge		: Set as	: ""
		Local	: Field		: EmployeeDataDate		: Set as	: "Total"
		Local	: Field		: EmployeeDataID		: Set as	: $$Total:EmployeeDataID


[Button:PrintThis]
	Title	: "Print This Page"
	Key		: Alt+8
	Action	: Print		: PrintEmployeeData
	




















;;===================Print Employee Data
[Report:PrintEmployeeData]
	Form		: PrintEmployeeData
	
[Form: PrintEmployeeData]
	;Space Bottom	: 1
	Space Left		: 5
	Space Right		: 5
	Space Top		: 3
	Part		: EmployeeDataOpPgBrk, PrintEmployeeData;, PrintFinalTotal
	Bottom Part	: PrintFinalTotal
	Page Break	: EmployeeDataClPgBrk, EmployeeDataOpPgBrk
	
[Part:PrintFinalTotal]
	Use		: PrintTotal
	Space Top	: 0
[Part:PrintTotal]
	Lines		: PrintTotal
	[Line:PrintTotal]
		Right Fields	: PrintTotalTitle, PrintTotal
		Border		: Thin Box
		[Field:PrintTotalTitle]
			Use			: PrintEmployeeDataDate
			Set as		: "Total"
			
		[Field:PrintTotal]
			Use			: PrintEmployeeDataID
			Set as		: $$Total:PrintEmployeeDataID
			

[Part: EmployeeDataClPgBrk]
	
	Lines		: PrintTotal, EmployeeDataClPgBrk
	
	
	
	[Line: EmployeeDataClPgBrk]

		Fields		: Simple Field
		Local: Field: Simple Field	: Set As	: "Continued..."
		Local: Field: Simple Field	: FullWidth	: Yes
		Local: Field: Simple Field	: Align		: Right
		Border		: Full Thin Top
		Space Bottom	: 4
[Part:EmployeeDataOpPgBrk]
	Part		: EmployeeCmpName, EmpTitles
	Vertical	: Yes
[Part:EmployeeCmpName]
	Line		: EmployeeCmpName
	Height		: 2
	[Line:EmployeeCmpName]
		Field		: EmployeeCmpName
		
		[Field:EmployeeCmpName]
			Set as		: ##SVCurrentCompany
			Full Width	: Yes
			Align		: Center
			Style		: Normal Bold
			
			
[Part:EmpTitles ]
	Line		: EmpTitles
	Border		: Thin Cover
	Common Borders	: Yes
	
	[Line:EmpTitles]
		Use		: PrintEmployeeData
		Border	: Thin Top Bottom
		Space Bottom	: 0.5
		Space Top		: 0.5
		
		Local	: Field		: Default				: Align		: Center
		Local	: Field		: Default				: Type		: String
		Local	: Field		: Default				: Style		: Normal Bold
		Local	: Field		: Default				: Skip		: Yes
		;Local	: Field		: Default				: Delete	: Border
		
		Local	: Field		: PrintEmployeeDataSrNo		: Set as	: "Sr. No."
		Local	: Field		: PrintEmployeeDataName		: Set as	: "Name"
		Local	: Field		: PrintEmployeeDataGender	: Set as	: "Gender"
		Local	: Field		: PrintEmployeeDataCountry	: Set as	: "Country"
		Local	: Field		: PrintEmployeeDataAge		: Set as	: "Age"
		Local	: Field		: PrintEmployeeDataDate		: Set as	: "Date"
		Local	: Field		: PrintEmployeeDataID		: Set as	: "Salary ($)"
	
[Part: PrintEmployeeData]
	Line	: PrintEmployeeData
	Repeat	: PrintEmployeeData	: EmployeeData
	Scroll	: Vertical
	Border		: Thin Box
	Common Borders	: Yes
	Total		: PrintEmployeeDataID
	;Border	: Thick Bottom
	[Line:PrintEmployeeData]
		Fields			: PrintEmployeeDataSrNo, PrintEmployeeDataName,
		Right Fields	:  PrintEmployeeDataGender,PrintEmployeeDataCountry, PrintEmployeeDataAge, PrintEmployeeDataDate, PrintEmployeeDataID
		
		[Field:PrintEmployeeDataSrNo]
			Use		: Number Field
			Set as	: $$Line
			Width	: 6% Page
			Border	: Thin Right
		[Field:PrintEmployeeDataName]
			Use			: Name Field
			Set as		: $FirstName+" "+$LastName
			Full Width	: Yes
			Indent		: 1
			;Border		: Thin Left Right
		
		[Field:PrintEmployeeDataGender]
			Use		: Name Field
			Set as	: $Gender
			Width	: 10% Page
			Align	: Center
			Border	: Thin Left
		
		[Field:PrintEmployeeDataCountry]
			Use		: Name Field
			Set as	: $Country
			Border		: Thin Left Right
			Width	: 20% Page
		
		[Field:PrintEmployeeDataAge]
			Use		: Number Field
			Set as	: $Age
			Width	: 8% Page
			Align	: Right
		
		[Field:PrintEmployeeDataDate]
			Use		: Date Field
			Set as	: $Date
			Border		: Thin Left Right
			Width	: 15% Page
			Align	: Right
		
		[Field:PrintEmployeeDataID]
			Use		: Amount Forex FIeld
			Set as	: $$AsAmount:$Salary
			Width	: 10% Page
			
		
		

		
		
































;; create a collection to read json data

[Collection:JsonUsersColl]
	Data Source:File JSON:"E:\tirlok\tdl files\Gold Rate\UserReport.json"     ; file path/name
	;;https://jsonplaceholder.typicode.com/comments
	;;https://jsonplaceholder.typicode.com/users
	JSON Object Path:users:1                          ;main object path
    Client Only:Yes                                        ;for client side only


;; let me quickly create a report to show the users data

/*
[#Menu:gatewayoftally]
	;Add:Item:Display User Data:Display:User Report
	
[Report:User Report]
	Form:User Report
	
[Form:User Report]
	Part:User Report
	
[Part:User Report]
	Scroll:Both
	Common Border:Yes
	Line:User Report Titles,User Report Data
	Repeat:User Report Data:JsonUsersColl
	
[Line:User Report Titles]
	Fields:UserIdNo,UserFirstName,UserLastName,UserNumber,UserEmail
	Local:Field:UserIdNo:Set as:"Id"
	Local:Field:UserFirstName:Set as:"FirstName"
	Local:Field:UserLastName:Set as:"LastName"
	Local:Field:UserNumber:Set as:"Contact"
	Local:Field:UserEmail:Set as:"Email"
	Local:Field:default:Style:Normal Bold
	Local:Field:default:Align:Left
	Local:Field:default:Border:thinright
	Border:thickbottom



[Line:User Report Data]
	Space Top:0.5
	Fields:UserIdNo,UserFirstName,UserLastName,UserNumber,UserEmail
    Border:thinbottom

[Field:UserIdNo]
	Set as:$UserId
	Width:5
	
	
[Field:UserFirstName]
	Set as:$firstName
	Width:20
	
[Field:UserLastName]
	Set as:$lastName
	Width:20
	
[Field:UserNumber]
	Set as:$phoneNumber
	Width:20
	
[Field:UserEmail]
	Set as:$emailAddress
	Width:30

	
*/
    
	;; load and run 


```
