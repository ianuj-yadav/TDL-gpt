---
title: Backup Company
type: sample_code
objects: Function, Button
source: Backup Company.txt
---

# Backup Company

## Source Code

```tdl
[Button: BackupCompany]
	Title		: "Backup Your Company"
	Key			: Alt+B
	Action		: Call		: BackupCompanyFunction
	
[Function:BackupCompanyFunction]
	Variable		: Backup		: String
	
	001:Log		: @@Destination
	002:Log		: ##SVCurrentPath
	003:Log		: @@CoNumber
	003a:Log		:##SVCurrentCompany
	
	004:Set		:Backup		: @@Destination+","+##SVCurrentPath+","+##SVCurrentCompany+","+@@CoNumber
	005:Backup Company	: ",":##Backup
	
[System:Formulae]
	Destination		: "E:\Backup"
	CoNumber		: "100004"
	
	
[Button: OpenNotepad]
	Title		: "Open Notepad"
	Key			: Alt+N
	Action		: Browse Url	: "Notepad++"


```
