---
title: pdf vch name
type: sample_code
objects: Function, Button
source: pdf vch name.txt
---

# pdf vch name

## Source Code

```tdl
[#Form:Voucher]
	Add		: Button	: Printvch
	
[Button:Printvch]
	Title		: "Print Voucher"
	Key			: alt+0
	Action 		: Trigger Key	: Ctrl+p, P, 
	

[Function:PrintVchNew]
;	00	: Print		: Voucher
;	10	: Set		: SvExportLocation		: "D:"
;	20	: Set		: SvExportFormat		: $$SysName:PDF
;	30	: Set		: FileName				: "Tirlok"
;	40	: Export Report	
	50	: Trigger Key	: Ctrl+p,P, Hello, Enter
	
```
