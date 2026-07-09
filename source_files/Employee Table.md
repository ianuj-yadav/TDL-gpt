---
title: Employee Table
type: sample_code
objects: Report, Form, Part, Line, Field, Collection, Function, Button
source: Employee Table.txt
---

# Employee Table

## Source Code

```tdl
[#Menu:Gateway Of Tally]
	Add			: Item		: EmployeeTable	: Display	: EmployeeTable
[Report:EmployeeTable]
	Title	: "Employee Table"
	Form	: EmployeeTable
	
[Form:EmployeeTable]
	Part	: EmployeeTable
	Width	: 100% Page
	Height	: 100% Page
	Add		: Button	: ExportJsonEmployee ;; Export All Employees data to a portal "127.0.0.1:8000/empData" 
	
[Part:EmployeeTable]
	Line			: EmployeeTableTitle, EmployeeTableBody
	Bottom Line		: EmployeeTableBottom
	Repeat			: EmployeeTableBody		: EMployeeTable
	Scroll			: Vertical
	Common Border	: Yes
	Total			: EmpSalary

	[Line:EmployeeTableTitle]
		Use				: EmployeeTableBody
		Space Bottom	: 1
		Border			: Thick Bottom
		
		Local		: Field		: Default		: Style		: Normal Bold
		;Local		: Field		: Default		: Border	: Thick Bottom
		Local		: Field		: Default		: Align		: Center
		Local		: Field		: Default		: Lines		: 0
		
		
		Local		: Field		: EmpId			: Info	: $$LocaleString:"ID"
		Local		: Field		: EmpName		: Info	: $$LocaleString:"Name"
		Local		: Field		: EmpName		: Border	: Thin Left Right
		Local		: Field		: EmpAddress	: Info	: $$LocaleString:"Address"
		Local		: Field		: EmpDoj		: Info	: $$LocaleString:"Date Of Joining"
		Local		: Field		: EmpDoj		: Border	: Thin Left Right
		
		Local		: Field		: EmpSalary		: Info	: $$LocaleString:"Salary"
				
	[Line:EmployeeTableBody]
		Fields			: EmpId, EmpName, EmpAddress
		Right Fields	:EmpDoj, EmpSalary 
		
		[Field:EmpId]
			Use			: Number Field
			Set as		: $EmpId

		[Field:EmpName]
			Use			: Name Field
			Set as		: $EmpName
			
		[Field:EmpAddress]
			Width		: 50
			Set as		: $EmpAddress

		[Field:EmpDoj]
			Use			: Uni Date Field
			Set as		: $EmpDoj;:ShortDate$$String:
			Width		: 15 
			
		[Field:EmpSalary]
			Use			: Amount Field
			Set as		: $$AsAmount:$EmpSalary


	[Line:EmployeeTableBottom]
		Use				: EmployeeTableBody
		Space Top		: 1
		Border			: Thick Top
		
		Local		: Field		: Default		: Style		: Normal Bold
		
		Local		: Field		: EmpSalary		: Set as	: $$Total:EmpSalary
		
		

[Collection:EMployeeTable]
	Objects		: EmpMaster1, EmpMaster2, EmpMaster3, EmpMaster4,+
	EmpMaster5, EmpMaster6, EmpMaster7, EmpMaster8, EmpMaster9, EmpMaster10,+
	EmpMaster11, EmpMaster12, EmpMaster13, EmpMaster14, EmpMaster15, +
	EmpMaster16, EmpMaster17, EmpMaster18, EmpMaster19, EmpMaster20,

[Object:EmpMaster1]
    EmpId    	: 1
    EmpName     : "John Doe"
    EmpAddress  : "123 Main St, Cityville, State 12345"
    EmpDoj      : "05 01 2022"
    EmpSalary   : 50000

[Object:EmpMaster2]
    EmpId    	: 2
    EmpName     : "Jane Doe"
    EmpAddress  : "456 Oak Ave, Townsville, State 56789"
    EmpDoj      : "15 11 2021"
    EmpSalary   : 60000

[Object:EmpMaster3]
    EmpId    	: 3
    EmpName     : "Alice Smith"
    EmpAddress  : "789 Pine Rd, Villagetown, State 98765"
    EmpDoj      : "20 03 2022"
    EmpSalary   : 75000

[Object:EmpMaster4]
    EmpId    	: 4
    EmpName     : "Bob Johnson"
    EmpAddress  : "321 Elm St, Hamletville, State 54321"
    EmpDoj      : "10 09 2021"
    EmpSalary   : 90000

[Object:EmpMaster5]
    EmpId    	: 5
    EmpName     : "Eva Martinez"
    EmpAddress  : "567 Maple Ln, Suburbia, State 13579"
    EmpDoj      : "08 02 2022"
    EmpSalary   : 55000

[Object:EmpMaster6]
    EmpId    	: 6
    EmpName     : "Michael Brown"
    EmpAddress  : "890 Cedar Dr, Countryside, State 24680"
    EmpDoj      : "25 12 2021"
    EmpSalary   : 70000

[Object:EmpMaster7]
    EmpId    	: 7
    EmpName     : "Emily Davis"
    EmpAddress  : "234 Birch Blvd, Metropolis, State 97531"
    EmpDoj      : "03 04 2022"
    EmpSalary   : 80000

[Object:EmpMaster8]
    EmpId    	: 8
    EmpName     : "Daniel Wilson"
    EmpAddress  : "876 Spruce Ct, Megatown, State 86420"
    EmpDoj      : "12 08 2021"
    EmpSalary   : 95000

[Object:EmpMaster9]
    EmpId    	: 9
    EmpName     : "Olivia Garcia"
    EmpAddress  : "543 Redwood Pl, Capital City, State 31975"
    EmpDoj      : "18 05 2022"
    EmpSalary   : 62000

[Object:EmpMaster10]
	EmpId    	: 10
    EmpName     : "William Taylor"
    EmpAddress  : "987 Sequoia Ln, Riverside, State 62480"
    EmpDoj      : "30 06 2022"
    EmpSalary   : 78000

[Object:EmpMaster11]
    EmpId    	: 11
    EmpName     : "Sophia Anderson"
    EmpAddress  : "654 Pinehurst Dr, Mountainside, State 13579"
    EmpDoj      : "22 10 2021"
    EmpSalary   : 85000

[Object:EmpMaster12]
    EmpId    	: 12
    EmpName     : "James Miller"
    EmpAddress  : "210 Sycamore Ave, Oceanview, State 80246"
    EmpDoj      : "15 01 2022"
    EmpSalary   : 100000

[Object:EmpMaster13]
    EmpId    	: 13
    EmpName     : "Ava Thompson"
    EmpAddress  : "876 Cedarhurst Rd, Lakeside, State 13579"
    EmpDoj      : "05 07 2021"
    EmpSalary   : 58000

[Object:EmpMaster14]
    EmpId    	: 14
    EmpName     : "David White"
    EmpAddress  : "543 Willow Way, Beachtown, State 97531"
    EmpDoj      : "28 02 2022"
    EmpSalary   : 72000

[Object:EmpMaster15]
    EmpId    	: 15
    EmpName     : "Emma Harris"
    EmpAddress  : "123 Magnolia Blvd, Hilltop, State 86420"
    EmpDoj      : "10 03 2022"
    EmpSalary   : 88000

[Object:EmpMaster16]
    EmpId    	: 16
    EmpName     : "Joseph Martin"
    EmpAddress  : "789 Dogwood St, Valleyville, State 24680"
    EmpDoj      : "28 11 2021"
    EmpSalary   : 92000

[Object:EmpMaster17]
    EmpId    	: 17
    EmpName     : "Grace Martinez"
    EmpAddress  : "345 Aspen Rd, Harbor City, State 80246"
    EmpDoj      : "15 04 2022"
    EmpSalary   : 68000

[Object:EmpMaster18]
    EmpId    	: 18
    EmpName     : "Jacob Clark"
    EmpAddress  : "678 Chestnut Ct, Portside, State 31975"
    EmpDoj      : "01 07 2022"
    EmpSalary   : 83000

[Object:EmpMaster19]
    EmpId    	: 19
    EmpName     : "Lily Turner"
    EmpAddress  : "901 Juniper Dr, Bayville, State 62480"
    EmpDoj      : "10 12 2021"
    EmpSalary   : 96000

[Object:EmpMaster20]
    EmpId    	: 20
    EmpName     : "Matthew Moore"
    EmpAddress  : "234 Pinecone Ln, Lakeshore, State 80246"
    EmpDoj      : "05 05 2022"
    EmpSalary   : 70000
	
[Button:ExportJsonEmployee]
	Title		: "ExportJson"
	Key			: Ctrl+f10
	Action		: Call	: TlyExportJson
	
[Function:ExportEmpJson]


000: Set   :SVExportFormat  : $$SysName:UTF8JSON

005: Set   :SVExportLanguage: $$SysName:UTF8JSON

010: Set   :SVPrintFileName : "D:\Export\export.json"

015: Export:EmployeeTable  : Yes:Yes

[#Menu: Gateway of Tally]
	Add: Item: Daybook Json Export: Call: TlyExportJson
	
[Function: TlyExportJson]
	Variable: SVExportLocation
	Variable: SVExportFormat
	Variable: SVExportLanguage
	Variable: SVOpenFileAfterExport
	
	Variable: vExportResult: Logical
	Variable: vExportErrMsg: String
	
	Variable: vHideConfig: Logical: Yes
	Variable: vOverwriteFile: Logical: Yes
	
	Variable: vDocType, vJsonFileName: String
	
	500: 	Set: SVOpenFileAfterExport: Yes
	510: 	Set: SVExportLocation: $$SysInfo:ApplicationPath
	520: 	Set: SVExportFormat: $$SysName:Utf8JSON
	530:  	Set: SVExportLanguage: $$SysName:Multilingual
	550:	Set: vDocType: "Employee"
	540: 	Set: vJsonFileName: ##vDocType + ".json"
												
	610:	Set: SVPrintFileName: ##SVExportLocation+ "\" + ##vJsonFileName
	620:	Set: SVPrintFileName: $$MakeExportName:##SVPrintFileName:##SVExportFormat
		
	630:	Log: "SVExportLocation: " + ##SVExportLocation + ", SVPrintFileName: " + ##SVPrintFileName
		
	650:	Set: SVOpenFileAfterExport: Yes
	;710: 	Export: TlyJsonReport: ##vHideConfig: ##vOverwriteFile
	710: 	Export: EmployeeTable: ##vHideConfig: ##vOverwriteFile
	
;	770:	Set: vExportResult: $$LastResult
;	780:	Set: vExportErrMsg: $$LastError
;		
	
;[Report: TlyJsonReport]
[Report: EmployeeTableJson]
	Title: "JSON Export"
	Form: TlyJsonReport
	Variable: SVFromDate: Date: ##SVCurrentDate
	Variable: SVToDate: Date: ##SVCurrentDate

	
[Form: TlyJsonReport]
	Part: TlyJsonDataVchDtls	;TlyJsonDataMain
	Delete: XMLTag: "ENVELOPE"

	[Part: TlyJsonDataMain]
		Line: TlyJsonDataMain
		Repeat: TlyJsonDataMain	;: Daybook Vouchers of Company;TlyDBVchColl
		Set: 1
		Scroll: Vertical
;		JSONTag: "vouchers"
		
		[Line: TlyJsonDataMain]
			Field: Name Field
			Local: Field: Name Field: Set as: ""
			Local: Field: Name Field: JSONTag: "daybook"
			Explode: TlyJsonDataVchDtls
;			JSONTag: "daybook"
;			JSONTag: "vouchers"
		
		[Part: TlyJsonDataVchDtls]
			Line: TlyJsonDataVchDtls
			Repeat: TlyJsonDataVchDtls: TlyJsonDataVchColl
			
			Scroll: Vertical
;			JSONTag: "vouchers"
     	
		[Line: TlyJsonDataVchDtls]
			Field: Name Field, TlyJsonVchName
		 	Local: Field: Name Field: Set as: $VoucherNumber
		 
			Local: Field: Name Field: JSONTag: "vchNo"
     ;			Explode: TlyJsonDataLedDtls
			 JSONTag: "sas"
		;	Invisible:Yes
			
			[Field: TlyJsonVchName]
				Use: Name Field
				Set as: $VoucherTypeName
				JSONTag: "vchName"
				
			[Part: TlyJsonDataLedDtls]
				Line: TlyJsonDataLedDtls
				Repeat: TlyJsonDataLedDtls: LedgerEntries
;				Set: 1
				Scroll: Vertical
;				JSONTag: "vouchers"
				
				[Line: TlyJsonDataLedDtls]
					Field: Short Name Field
					Local: Field: Short Name Field: Set as: $LedgerName	;VoucherTypeName
					Local: Field: Short Name Field: JSONTag: "ledName"
					JSONTag: "ledgers"
					
[Collection: TlyJsonDataVchColl]
	Type: Voucher
	Fetch: *.*, LedgerEntries.*
	
[Collection: TlyDBVchColl]
	Data Source: Parent Report: All
	Fetch: *.*
```
