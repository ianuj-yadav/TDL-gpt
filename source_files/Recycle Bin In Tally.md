---
title: Recycle Bin In Tally
type: sample_code
objects: Report, Form, Part, Line, Field, Button
source: Recycle Bin In Tally.txt
---

# Recycle Bin In Tally

## Source Code

```tdl
[#Menu: GatewayofTally]
	Add: Button:/*After:HelpButton:*/TirlokRecycleBin
	Control :@@locRecyclebin: $$Allow:Create:Vouchers
  
[Button : TirlokRecycleBin]
Title : $$LocaleString:"RecycleBin"
Key : Ctrl + 9
Action : Display : RecycleBin

[#Form:Default]
	Add: Button:/*After:HelpButton:*/TirlokRecycleBin
	
[#Form:Daybook]
	Add: Button:/*After:HelpButton:*/TirlokRecycleBin
	
[#Menu:Main Menu]
	Add: Button:/*After:HelpButton:*/TirlokRecycleBin
	
[#Menu:Default]
	Add: Button:/*After:HelpButton:*/TirlokRecycleBin
	
[#Form:Voucher]
	Add: Button:/*After:HelpButton:*/TirlokRecycleBin
	
[Report: RecycleBin]
	Use		: Voucher Register
	Title   : "Recycle Bin"
	Local	: Line: DSP Vchdetail	: Empty		: NOT $fldDeleted
	Set		: FamilyVoucherFlag		: Yes
	Set		: IsRestoreMode			: Yes
	Set		: SV To Date 			: $$YearEnd:##SVCurrentDate 
	Set		: lConfirmation			: Yes

[#Form: Voucher]
  Local: Line : VCH NarrPrompt: Add: Fields: Recycle Bin
  Set Always: RecycleBinFlag: If ##IsRestoreMode then ##RecyclebinFlag else No
 
[Field: Recycle Bin]
  Use: Logical field
  Storage: fldDeleted
  Set as: If ##IsRestoreMode then No else ##RecyclebinFlag
  Set Always: Yes                                         
  Type: Logical 
  Invisible: Yes

[#Collection: DayBook Vouchers of Company]
  Fetch	: fldDeleted 
  
[#Key: BottomToolBarBtn3_Delete]
  Title   : $$LocaleString:"Delete"
  Option: RbinFormDelete: if ($$IsVoucher AND NOT ##IsRestoreMode) then Yes else No

[#Key: BottomToolBarBtn3]  
  Title   : $$LocaleString:"Delete"
  Option: RbinDeleteLineObject: Yes
  
[#Key: Delete Line Object]
  Key     : Alt+D
  Option: RbinDeleteLineObject: Yes
 
[#Key: Delete Line ObjectEx]
  Key     : Alt+D
  Option: RbinDeleteLineObject: Yes
  
[#Key: Form Delete]
  Key : Alt+D
  Option: RbinFormDelete: Yes

[!Key: RbinFormDelete]
  Key: Alt+D
  Action: Alter: Rpt Confirmation

[!Key: RbinDeleteLineObject]
  Key: Alt+D
  Action: Alter Object

[Key: Restore from Bin]
  Key: CTRL+R
  Action: Alter Object

[Report: Rpt Confirmation]
  Add: Form: frm Confirmation
  Variable: lConfirmation
  Set: lConfirmation: Yes
  Title: "Confirm"
	
[Form: frm Confirmation]
  Add: Part: LWhead,LWtt, LWdoubl
  Add: Bottom Part: LWlower
  Full Width  : No
  No Confirm  : Yes
  Space Left  : 5
  Space Right : 5
  Space Top   : 2
  Space Bottom: 1
  Width: 25% screen
  Height: 25% screen

[Part: LWhead]
  Horizontal Align: Centre
  Lines : ln Heading

[Part: LWtt]
  Horizontal Align: Centre
  Lines : Form SubTitle
  Local : Field : Form SubTitle : Info : $$LocaleString:"Delete?? [Yes/No]"

[Part: LWdoubl]
  Horizontal Align: Centre
  Lines : ln Confirmation

[Part: LWlower] 
  Horizontal Align: Centre
  Lines : ln Caption1

[Line: ln Heading]
  Add: Field : fldHeading 

[Line: ln Confirmation]
  Add: Field: LearnWellC,LearnWellR,LearnWellO

[Line: ln Caption1]
  Add: Field: fldCaption1

[Field: LearnWellC]
  Use: Logical Field
  Set as: ##lConfirmation          
  Modifies: lConfirmation

[Field: LearnWellR]
  Use: Logical Field
  Set as: #LearnWellC
  Set Always: Yes
  Modifies: RecycleBinFlag
  Skip: Yes
  Invisible: Yes

[Field: LearnWellO]
  Use: Logical Field
  Set as: #LearnWellC
  Set Always: Yes
  Modifies: OptionalFlag
  Skip: Yes
  Invisible: Yes

[Field: fldHeading]
  Info: "Tally-RECYCLE BIN"
  Color:Blue
  Style:Bold

[Field: fldCaption1]
  Info: "www.Learnwells.com"
  Color:Red
  Style:Bold

[#Report: Daybook]
  Local: Line: DSP VchDetail: Empty : $fldDeleted
  Set: IsRestoreMode: No

[#Report: Ledger Vouchers]
  Local: Line: DSP VchDetail: Empty : $fldDeleted
  Set: IsRestoreMode: No

[#Line: DSP VchDetail]
  Add: Option: DSP VchDetail Restore: $fldDeleted

[!Line: DSP VchDetail Restore]
  Add: Keys: Restore from Bin

[#Field: VCH Optional]
  Option: Rbin VCH Delete: ##OptionalFlag and NOT ##IsRestoreMode
  Option: Rbin VCH Restore: ##OptionalFlag and ##IsRestoreMode 

[!Field: Rbin VCH Delete]

  Style: My Style
  Set as: if #Recyclebin then "PRESS ENTER to DELETE" else @UseOptStr
  Skip: if #Recyclebin then No else Yes
  Color:Red
  
[Style: My Style]
  Font: Verdana
  Height: 18
  Bold: Yes
  

[!Field: Rbin VCH Restore]


  Add: Fields: Long Prompt,LearnWellC,FlgLWr,FlgLWrf,FlgLWop,FlgLWfld
  Local: Field: Long Prompt: Info: "PRESS ENTER to RESTORE"
  Local: Field: Long Prompt: Full Width: Yes
  Local: Field: Long Prompt: Align: Right
  Local: Field: Long Prompt: Style: My Style
  Color: Red
[Field: FlgLWr]
  Use: Logical field
  Type: Logical : Forced
  Modifies: RecyclebinFlag
  Set as: NOT #LearnWellC
  Set Always: Yes                                        
  Invisible: Yes
  Skip: Yes

[Field: FlgLWrf]
  Use: Logical field
  Type: Logical 
  Storage: fldDeleted
  Set as: #FlgLWr
  Set Always: Yes                                     
  Invisible: Yes
  Skip: Yes

[Field: FlgLWop]
  Use: Logical field
  Type: Logical 
  Modifies: OptionalFlag
  Set as: #FlgLWr
  Set Always: Yes                                
  Invisible: Yes
  Skip: Yes

[Field: FlgLWfld]
  Use         : Logical Field
  Storage     : Is Optional
  Set as      : #FlgLWop
  Set always  : Yes
  Invisible   : Yes
  Skip        : Yes

[#Form: Voucher]
  Option: RbinVoucher: ##OptionalFlag

[!Form: RbinVoucher]
  Key: SaveVoucher

[Key: SaveVoucher]
  Key: Enter
  Action: Form Accept

[#Field: Plain VCH Date]
  Option: Rbin Plain VCH Date: ##OptionalFlag

[!Field: RBin Plain VCH Date]
  Skip: if #RecycleBin then Yes else No
  
[System: Variable]
  RecycleBinFlag: "No"
  IsRestoreMode: "No"
  lConfirmation: "No"

[System: Formula]
  locRecyclebin : $$LocaleString:"Recycle Bin"

[System: UDF]
  fldDeleted: Logical : 10001

[Variable: RecycleBinFlag]
	Type			: Logical
	Volatile		: Yes
	Persistent		: No

[Variable: IsRestoreMode]
	Type			: Logical
	Volatile		: No
	Persistent		: no

[Variable: lConfirmation]
	Type			: Logical
	Persistent		: No
	Volatile 		: Yes
	Default			: No
```
