---
title: Notes
type: sample_code
objects: Line, Collection
source: Notes.txt
---

# Notes

## Source Code

```tdl
[Include:E:\tirlok\tdl files\Notes\Recycle Bin In Tally.txt]
;[Collection: Opt Vouchers of Company]



/*
Button		: Print Button, Export Button, Mail Button
At line level we use explode like below

[Line:''''']
	Explode		: LedgerPart(part)	: Yes
	Remove if	: $$NumChildren=0 ; It prevent the groups that do not have sub groups
	REmove If 	: ($$NumItems:MyLedgerColl=0) ; It prevent the groups having no chilren or having no ledger
	
	
Variable : ExplodeFlag
Button		: Explodeflag



[Collection: CurrentLineColl]
Data Source: Report: Current Line
Fetch: ;;; Method Names Which you want to fetch from current line
 
$$FullList:CompanyAddress:$Address

1.) 	Field Attributes		:: 
		Case	: To control the case like upper case or lower case
		validate	: to control the error
		control	: to control the error and show the message
		inactive	: to inactive at a condition
		invisible	: 




$$AsAmount:$Value   ; To print the value which is a number in Amount Field


[#Collection:List of Banks] ; FOr see bank in ledger create report in tally
	Title:"Tirlok Bank"
*/

;;     ..Address Means .. Means we are going at owners scope



;;  Variables Attributes	1.) TYPE: To Set the type of the variable
2.) DEFAULT		: To set the default or initial value of variable
3.) VOLATILE	: By default Yes ,  the "Volatile" attribute is used to indicate that a variable can take on a 
				new value when a new report is started using the variable from the previous report. The current 
				value of the volatile variable is saved as a stack, and the variable can take on a new value in 
				the new report. The previous value of the variable is restored after the previous report is retrieved from the new report. 
				
4.) PERSISTENT	: The Persistent attribute in Tally Definition Language (TDL) determines how often an attribute is retained. 
					If the Persistent attribute is set to YES, the latest value of the variable will be saved across sessions, 
					unless the variable is local. For example, the Persistent attribute of the variable SV Backup Path will 
					save the user's latest path, even during concurrent sessions of Tally. 
					All Persistent Variable Values are stored in a file named TallySav.Cfg, in the folder path specified for 
					Tally Configuration file in F12 -> Data Configuration. When Tally is restarted, these variable values 
					are accessed from this file.











```
