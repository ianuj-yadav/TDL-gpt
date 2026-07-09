---
title: Duplicate
type: sample_code
objects: Form, Function
source: Duplicate.txt
---

# Duplicate

## Source Code

```tdl
;[#Report: Voucher]
;Form: Swap Dr and Cr on opening
;
;[Form: Swap Dr and Cr on opening]
;Action: Load : SwapDrCrValues
;
;[Function: SwapDrCrValues]
;Variable: LedgerEntry
;Action: Walk LedgerEntries
;Set As: If $$IsDr:$LedgerEntry, $$SetCredit:$LedgerEntry, $$SetDebit:$LedgerEntry
;
;[System: Formula]
;IsDr: $$IsDr:$LedgerEntry
;SetCredit: $$SetCredit:$LedgerEntry
;SetDebit: $$SetDebit:$LedgerEntry
;
;

[#Key: Form Duplicate]
	Title		: $$LocaleString:"Dupl"
	Key     	: Alt+4
	Inactive    : NOT $$HasVouchers OR (NOT $$Allow:Create:Vouchers) OR NOT ##OnFocusInactiveCreate
	Action List      : DateChangeDup
	Scope	    : Current
	BottomToolbar Position : BottomToolBarBtn5	
	Action List	: 	DateChangeDup
	Background	: Yellow
	
[Key: DateChangeDup]
		
		Key		: Enter
		Action	: Duplicate	: Voucher;SET	: Varvchdate	: $$Date:$$SysInfo:SystemDate
	
```
