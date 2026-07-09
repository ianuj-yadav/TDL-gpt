---
title: HttpJson
type: sample_code
objects: Report, Form, Part, Line, Field, Collection
source: HttpJson.txt
---

# HttpJson

## Source Code

```tdl


;; create a collection to get remote data

[Collection:HttpJsonColl]
	Data Source:HTTP JSON:"http://dummy.restapiexample.com/api/v1/employees" ;; server url 
	;Data Source:HTTP JSON:"https://jsonplaceholder.typicode.com/users"
	JSON Object Path:data:1  ;; path to block we want to fetch 


	;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;
	
		
[Collection:HttpJsonCollUsers]
	
	Data Source:HTTP JSON:"https://jsonplaceholder.typicode.com/users"
	JSON Object Path:""  ;; path to block we want to fetch 


;; let me quickly create a report


 [#Menu:GateWayOfTally]
	 Add:Item:Employee Report:Display:Employee Report
	
	 ;Add:Item:User Report:Display:User Report
	 
[Report:UserReport]
	Form:UserReport
	Title:"User Report"
	
[Form:UserReport]
	Part:UserReport
	
[Part:UserReport]
	Line:UserHeaders,UserData
	Repeat:UserData:HttpJsonCollUsers
	Width:100% page
	Height:100% page
	Scroll:Vertical
	Common Border:Yes
	
[Line:UserHeaders]
	Border:ThickTopBottom
	Space Top:0.5
	Fields:UserID,UserName,UserUSername,UserEMail
	Local:Field:UserID:Set as:"User Id"
	Local:Field:UserName:Set as:"User Name"
	Local:Field:UserUSername:Set as:"User Username"
	Local:Field:UserEMail:Set as:"User Email"
	Local:Field:default:Border:thinright
	Local:Field:default:Style:EmployeeHdStyle
	Local:Field:default:Align:Left

[Line:USerData]
	Fields:UserID1,UserName,UserUSername,UserEMail
	Border:thinbottom
	Space Top:0.5
	Local:Field:default:Style:EmployeeStyle
	Local:Field:default:Align:Left
	Local:Field:default:Border:thinright
	
[Field:UserID1]
	Set as:$id
	Width:20
	
[Field:UserName]
	Set as:$name
	Width:30
	
[Field:UserUSername]
	Set as:$username
	Width:20
	
[Field:UserEMail]
	Set as:$email
	Width:20



[Report:EmployeeReport]
	Form:EmployeeReport
	Title:"Employee Report"
	
[Form:EmployeeReport]
	Part:EmployeeReport
	
[Part:EmployeeReport]
	Line:EmployeeHeaders,EmployeeData
	Repeat:EmployeeData:HttpJsonColl
	Width:100% page
	Height:100% page
	Scroll:Vertical
	Common Border:Yes
	
[Line:EmployeeHeaders]
	Border:ThickTopBottom
	Space Top:0.5
	Fields:EmpID,EmpName,EmpSalary,EmpAge
	Local:Field:EmpID:Set as:"Employee Id"
	Local:Field:EmpName:Set as:"Employee Name"
	Local:Field:EmpSalary:Set as:"Employee Salary"
	Local:Field:EmpAge:Set as:"Employee Age"
	Local:Field:default:Border:thinright
	Local:Field:default:Style:EmployeeHdStyle
	Local:Field:default:Align:Left

[Line:EmployeeData]
	Fields:EmpID,EmpName,EmpSalary,EmpAge
	Border:thinbottom
	Space Top:0.5
	Local:Field:default:Style:EmployeeStyle
	Local:Field:default:Align:Left
	Local:Field:default:Border:thinright
	
[Field:EmpID]
	Set as:$Id
	Width:20
	
[Field:EmpName]
	Set as:$employee_name
	Width:30
	
[Field:EmpSalary]
	Set as:$employee_salary
	Width:20
	
[Field:EmpAge]
	Set as:$employee_age
	Width:20
	
[Style:EmployeeStyle]
	Font:"Sans-serif"
	Height:12

[Style:EmployeeHdStyle]
	Font:"Sans-Serif"
	Height:12
	Bold:yes

```
