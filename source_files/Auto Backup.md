---
title: Auto Backup
type: sample_code
objects: Function, Button
source: Auto Backup.txt
---

# Auto Backup

## Source Code

```tdl
[#Menu : Gateway of Tally]

Button : Call Function
[Button : Call Function]

Key : Alt + F9

Title :  Backup

Action		: Call : Backup Function 
[System: Events]
	TSPL Smp CmpLoadEvent2: Load Company	: NOT $$IsRemoteCompany: Call: Backup Function 
	TSPL Smp CmpCloseEvent: Close Company	: NOT $$IsRemoteCompany: Call: Backup Function 

[Function: Backup Function]
	Variable	: BackupDetVar	: String
	00	: IF	: ##EnableAutoBackup
	10 	: IF	: ##AutoBackupPrompt
	20 	: QUERYBOX : "Backup Company ?" :Yes:No
	30	: IF 	: $$LastResult
	40	: CALL	: Backup Company
	50	: ENDIF
	60	: ELSE	: 
	70	: CALL	: Backup Company 
	80 	: ENDIF
	90	: ENDIF
[Function: Backup Company]
	10 	: SET	: BackupDetVar	: @@DestPath + ", " +  ##SVCurrentPath +", "+ ##SVCurrentCompany + ", " +@@CoNumber
	
	20	: BACKUP COMPANY: ", " : ##BackupDetVar;+","+##BackupDetVar
	30 	: SET	:  SVBackupPath	: @@DestPath

[System: Formula]
	DestPath: ##DestinationPath + "\" + @@DateForm + "\" + @@TimeForm 
	CoNumber: $$String:($CompanyNumber:Company:##SVCurrentCompany):5 
	DateForm: $$String:$$MachineDate
	TimeForm: @@HrsForm + @@MtsForm
	HrsForm: If $$StringPart:$$MachineTime:0:2 CONTAINS ":" Then $$StringPart:$$MachineTime:0:1 Else $$StringPart:$$MachineTime:0:2
	MtsForm: if $$StringPart:$$MachineTime:0:2 CONTAINS ":" Then $$StringPart:$$MachineTime:2:2 Else $$StringPart:$$MachineTime:3:2
	
[Variable: EnableAutoBackup] 
	Type		: Logical
	Persistent	: Yes 
[Variable: DestinationPath] 
	Type		: String
	Persistent	: Yes
[Variable: AutoBackupPrompt]
	Type		: Logical
	Persistent	: Yes
[System: Variable]
	EnableAutoBackup		: Yes
	DestinationPath			: "E:\Autobackup" 
	AutoBackupPrompt		: Yes
```
