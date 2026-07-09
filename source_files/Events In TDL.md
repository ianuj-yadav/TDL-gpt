---
title: Events In TDL
type: sample_code
objects: Menu
source: Events In TDL.txt
---

# Events In TDL

## Source Code

```tdl
[Include: System Events.txt]
[Include: NatLangQuery.txt]
[Include: Form Accept.txt]
[Include: Focus In Sales Voucher.txt]
[Include: Before After Delete Object.txt]
[Include: Before After Cancel Object.txt]
[Include: Timer Event.txt]





[#Menu:GatewayOf Tally]
	Add		: Item	:"Events Tdl"		: Menu		: EventsInTDL
	

[Menu: EventsInTDL]
	Add		: Item	: "Create Ledger"		: Alter	: EventsInTDL
	Key Item		: "On Focus"			: F		: CALL	: OnFocusSalesVoucherFunction

```
