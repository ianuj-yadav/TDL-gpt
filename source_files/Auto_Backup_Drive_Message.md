---
title: Auto_Backup_Drive_Message
type: sample_code
objects: Report, Form, Part, Line, Field, Collection, Function, Button
source: Auto_Backup_Drive_Message.txt
---

# Auto_Backup_Drive_Message

## Source Code

```tdl
[Collection:SeraiNos]
	Data Source 		: File JSON 	: "E:\tirlok\tdl files\Gold Rate\srno.json";"E:\tirlok\tdl files\Gold Rate\New Transactions Api 1000.json";
	;Data Source     	: HTTP JSON		: "http://localhost/MasterAuto/wp-content/uploads/2024/04/new-1.json";"http://localhost/MasterAuto/wp-content/uploads/2024/04/New-Transaction-Api-1000-2-to-28-march.json"
	JSON Object Path	: SrNo	: 1				; Main object path
	Client Only			: Yes
	

[#Menu : Gateway of Tally]

Button : Call Function
Button	: CkeckSrNo
;Add		: Item	: "All Companies"	: Display	: AllCompanies
Add		: Item	: "All Serial No"	: Display	: AllSerials
Add		: Item	: "Expiry"	: Display	:TSS Expiry Date

[Report:AllSerials]
	Form		: AllSerials
	
[Form:AllSerials]
	Part		: AllSerials
	
[Part:AllSerials]
	Line		: AllSerials
	Repeat		: AllSerials		: SeraiNos
	Scroll		: Vertical
	Common Borders	: Yes
	[Line:AllSerials]
		Fields		: No, SrNo
		[Field:No]
			Use			: Number Field
			Set as		: $$Line
			
		[Field:SrNo]
			Use			: Name Field
			Set as		: $$String:$sr
			
[Button : Call Function]

Key : Alt + F9

Title :  Backup

Action		: Call : TestFunction

[Button : CkeckSrNo]
	Key : Alt + F10
	Title :  CkeckSrNo
	Action		: Call : CkeckSrNo

[System: Events]
;	TSPL Smp CmpLoadEvent2: Load Company	: NOT $$IsRemoteCompany: Call: Backup Function 
;	TSPL Smp CmpCloseEvent: Close Company	: NOT $$IsRemoteCompany: Call: Backup Function 

[Function: TestFunction]
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
[Function: Backup Function ]
	Variable	: Cmps		: String
	Variable	: BackupDetVar	: String
	1	: Set	: Cmps		: ""
	2	: Walk Collection	: List of All Backup Companies
	3	: Set		: Cmps	: @@DestPath + ", " +  ##SVCurrentPath +", "+ $name + ", " +$$String:@@CNumber+", "
	4   : SET	: BackupDetVar	: ##BackupDetVar+##Cmps
	5	: Log	: @@DestPath
	6	: End Walk
	;10 	: SET	: BackupDetVar	: @@DestPath + ", " +  ##SVCurrentPath +", "+ ##SVCurrentCompany + ", " +@@CoNumber
	;10 	: SET	: BackupDetVar	: @@DestPath + ", " +  ##SVCurrentPath +", "+ ##SVCurrentCompany + ", " +@@CoNumber
	;20	: BACKUP COMPANY: ", " : $$String:##BackupDetVar
	;30 	: SET	:  SVBackupPath	: @@DestPath
	40	: Log	: ##BackupDetVar

[Function:CkeckSrNo]
	Variable	: CmpSrNo		: Number
	Variable	: SrFound		: Logical
	Variable	: Message		: String
	100		: Set		: CmpSrNo	: $$LicenseInfo:SerialNumber
	200		: Walk Collection	: SeraiNos
	300		: If	: ##CmpSrNo = $sr
	400		: Set	: SrFound	:  Yes
	
	;410		: Log	: ##SrFound
	500		: Break
	600		: End If
	900		: End Walk
	920		: Set	: Message	: "Hello Sir/Madam Your Sr No " + $$String:##CmpSrNo + " is expiring on "
;	200		: Log	: "AccountID    " + $$LicenseInfo:AccountID
	;300		: Log	: "RemoteSerialNumber    " + $$LicenseInfo:RemoteSerialNumber
;	400		: Log	: "SiteID    " + $$LicenseInfo:SiteID
;	500		: Log	: "AdminEmailID    " + $$LicenseInfo:AdminEmailID
	;600		: Log	: "IsAdmin    " + $$LicenseInfo:IsAdmin
	;700		: Log	: "IsIndian    " + $$LicenseInfo:IsIndian
	;800		: Log	: "IsLicensedMode    " + $$LicenseInfo:IsLicensedMode
	;900		: Log	: "LicServerDate    " + $$LicenseInfo:LicServerDate
;	1000		: Log	: "LicServerTime    " + $$LicenseInfo:LicServerTime
;	1100		: Log	: "LicServerDateTime    " + $$LicenseInfo:LicServerDateTime
;	1200		: Log	: "LicExpiryDate    " + $$LicenseInfo:LicExpiryDate
;	
	;1400		: Log	: $$LicenseInfo:LicValidityDate
	;1300		: Msg Box	: "found"	: ##Message
	
[System: Formula]
	DestPath: "H:\My Drive\Backup-tally\" + @@DateForm + "\" + @@TimeForm 
	CoNumber: $$String:($CompanyNumber:Company:##SVCurrentCompany):5 
	CNumber	: $$Number:($$String:($CompanyNumber:Company:$name))
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
	DestinationPath			: "H:\My Drive\Backup-tally\" 
	AutoBackupPrompt		: Yes
;
;[Report: TSS Expiry Date]
;    Title: "TSS Expiry Date"
;    Form: TSS Expiry Form
;	Object	: End Point		
;[Form: TSS Expiry Form]
;    Part: TSS Expiry Part
;
;[Part: TSS Expiry Part]
;    Line: TSS Expiry Line
;	
;
;[Line: TSS Expiry Line]
;    Field: TSS Expiry Field
;    ;Local: Field: TSS Expiry Field: Info: "TSS Expiry Date: " + $$TSSExpiryDate
;[Field: TSS Expiry Field]
;	Set as		: $Name
;[Collection:tssc]
;Type		: Ts Hidden Endpoints
```
