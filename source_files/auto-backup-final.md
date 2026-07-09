---
title: auto-backup-final
type: sample_code
objects: Report, Form, Part, Line, Field, Function, Button
source: auto-backup-final.txt
---

# auto-backup-final

## Source Code

```tdl
[#Menu : Gateway of Tally]

Button : TestFunction
Add		: Item		: BcakupPath		: Display	: BackupPathDrive


[Button : TestFunction]

Key : Alt + F9

Title :  Backup

Action		: Call : TestFunction



[System: Events]
	TSPL Smp CmpLoadEvent2	: Load Company		: NOT $$IsRemoteCompany	: Call: TestFunction
	CmpCloseEvent			: NatLang Query		: True 					: Call: TestFunction
	onquit					: Close Company		: True 					: Trigger Key		: "Alt + F9"
	
/*
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
	*/
[Function: Backup Company]
	
	;10 	: SET	: SVBackupPath	: @@DestPath + ", " +  ##SVCurrentPath +", "+ ##SVCurrentCompany + ", " +@@CoNumber
	
	;20	: BACKUP COMPANY: ", " : ##BackupDetVar
	30 	: SET	:  SVBackupDefaultDrivePath	: @@DestPath
	
	40	: Log	: ##SVBackupPath
	50	: Log	:##SVBackupDefaultDrivePath

[System: Formula]
	DestPath: @@DefaultBackupPathDrive+ "\"  + @@DateForm + "\" + @@TimeForm 
	CoNumber: $$String:($CompanyNumber:Company:##SVCurrentCompany):5 
	DateForm: $$String:$$MachineDate
	TimeForm: @@HrsForm + @@MtsForm
	HrsForm: If $$StringPart:$$MachineTime:0:2 CONTAINS ":" Then $$StringPart:$$MachineTime:0:1 Else $$StringPart:$$MachineTime:0:2
	MtsForm: if $$StringPart:$$MachineTime:0:2 CONTAINS ":" Then $$StringPart:$$MachineTime:2:2 Else $$StringPart:$$MachineTime:3:2
	DefaultBackupPathDrive		: If $$SysInfo:IsWindows Then ##SVBackupPath Else ##SVBackupPath
	NotDisk						: If ##SVBackupDefaultDrivePath contains ":" Then Yes Else No
	
/*
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



;;;;==========================================


[#Table: TP Data Configurations]
	Add		: Objects		: Cfg SV Data BackupPathDrive
	
[#Table: TS Data Configurations]
	Add		: Objects		: Cfg SV Data BackupPathDrive
	

[Object: Cfg SV Data BackupPathDrive]
	
	Use		: Output Configuration	

	Name	: $$LocaleString:"Company Backup Path On Google Drive"
	Value	: If $$IsEmpty:##SVBackupDefaultDrivePath Then @@DefaultBackupPathDrive Else ##SVBackupDefaultDrivePath

	Action	: Cfg Action 	: Alter	: CFG Data BackupPathDrive
	
[Report: CFG Data BackupPathDrive]
	
	Use		: OutputConfig Form
	Auto	: No
	Variable: vCurrentPath
	Title	: $$LocaleString:"Data Path Configuration"
	Set		: SubFormTitle			: $$LocaleString:"Data Path Configuration"
	Set     : SVBackupDefaultDrivePath	: If $$IsEmpty:##SVBackupDefaultDrivePath Then @@DefaultBackupPathDrive Else ##SVBackupDefaultDrivePath	
	;Set		: vCurrentPath			: If $$IsEmpty:##SVBackupDefaultDrivePath Then @@DefaultBackupPathDrive Else ##SVBackupDefaultDrivePath
	
	Local	: Part	: Modify Variables	: Add	: Line	: CFG Data BackupPathDrive
	;Local	: Form	: OutputConfig Form : Option: DisableTSTopMenuItems : $$IsProdTallyServer AND $$IsLicensed AND NOT $$NumItems:LicAdminUsers > 0

[Line: CFG Data BackupPathDrive]

	Field			: Long Prompt, CFG Data BackupPathDrive
	
	Local			: Field	: Long Prompt	: Set as	: $$LocaleString:"Company Drive Backup Path"
	Space Bottom	: 0.30
	
[Field: CFG Data BackupPathDrive]

	Use			: Name Field
	Max			: 128
	Modifies	: SVBackupDefaultDrivePath
	Set as		: ##SVBackupDefaultDrivePath
	Width		: @@NameWidth + @@NameWidth
	Set Always	: Yes
*/
[Variable: SVBackupDefaultDrivePath]

    Type        : String
    Persistent  : Yes
	
[System:Variable]
	SVBackupDefaultDrivePath	: ""
;[#Report: IMP ExlPreDefTemplate]
;
;		Add		: Variable	: vCurrentPathDrive				: String
;		
;[Variable: vCurrentPathDrive]
;	
;	Use			: Skip Save Variable
;	Type		: String

;;;;;;;;;;;;;Test Backup PAth


[Report:BackupPathDrive]
	Form		: BackupPathDrive
	
[Form:BackupPathDrive]
	Part		: BackupPathDrive
	;Add			: Button		: ChangeBackupPath
[Part:BackupPathDrive]
	Line		: BackupPathDrive,Dline
	[Line:Dline]
		Field	: Dline
		[Field:Dline]
			Set as		: ##SVBackupPath
			Set Always	: Yes
	[Line:BackupPathDrive]
		Field		:LongPrompt, BackupPathDrive
		Local		: Field	: LongPrompt	: Info		: "Backup Path"
		[Field:BackupPathDrive]
			Use			: NameField
			Width		: 100% Page
			Modifies	: SVBackupPath	: yes
			Set as		: @@DestPath
			Set Always			: Yes
			;Set as		: ##SVBackupPath +" ,,,,,," +##SVBackupDefaultDrivePath+",,,----" +@@DestPath;@@DefaultBackupPathDrive
			
[#Part: SV Backup]
	On : FOCUS : Yes : Set		: SVBackupPath	: @@DestPath
	
[#Field: Fld BackupPath]
	On : FOCUS : Yes : Set		: SVBackupPath	: @@DestPath
	
[#Collection: DefaultPath]
	Delete		: Object		: DefaultPath
	Add			: Object		: DefaultPathDrive

[Object: DefaultPathDrive]
	
	Name		: @@DestPath
	
[#Object: DefaultPath]
	
	Name		: @@DestPath
	DefPath     : @@DefaultBackupPath
[#Form:SV Backup]
	Add			: Key		: ChangeBackupPath
	Add			: Key			: ChgPath
	
[Key:ChangeBackupPath]
	Title		: "Change Path"
	Key			: Ctrl+1
	Action		: Alter	: BackupPathDrive
	
[Key:ChgPath]
	Title		: "Chg Path"
	Key			: Ctrl+2
	Action		: Alter	: CFG Data BackupPath
	

	
[#Form:SV Backup]	
	;Background		: "Red"
	;Delete		: On 				: Form Accept		: @@BackUpAllItems 		: Backup Company:"":$$FullListEx:"":ListofAllBackupCompanies:##SVBackupPath:##SVBackupSrc:$Name:$CmpNumStr
	;Add			: On				: Form Accept		: Yes					: Call	: Backup Company
	;Add			: On			 	: Form Accept		: Yes					: Display	: BackupPathDrive
	;Add			: On 				: Form Accept		: @@BackUpAllItems 		: Backup Company:"":$$FullListEx:"":ListofAllBackupCompanies:##SVBackupPath:##SVBackupSrc:$Name:$CmpNumStr
	;Add			: On 				: Form Accept		: @@BackUpAllItems 		: Backup Company:"":$$FullListEx:"":ListofAllBackupCompanies:##SVBackupDefaultDrivePath:##SVBackupSrc:$Name:$CmpNumStr



```
