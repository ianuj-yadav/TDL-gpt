---
title: Timer Event
type: sample_code
objects: Function, Button
source: Timer Event.txt
---

# Timer Event

## Source Code

```tdl
[System:Event]
	AutoLogMsg		: Timer		: True		: Call		: MessageLog
	;SchedureMsg		: System Start	: True		:  Start Timer	: AutoLogMsg	: 1
	
[Function:MessageLog]
	
	;Variable	: Num1		: Number
	;006	: Call		: NumberFunc
	;001	: Set		: Num1	: ##Num
	002	: Set	: Num1	: ##Num1+1
	003	: Log	: "Start Timer"
	004	: Log	: ##Num1
	
[Function: NumberFunc]
	Variable		: Num		: Number
	Returns		: Number
	001	: Set	: Num	: 1
	002	: Set	: Num	: ##Num1
	004	: Return	: ##Num
	
[Variable:Num1]
	Type	: Number
	Persist	: No
	Volatile	: Yes
	
[System	: Variable]
	Num1		: 1
	
[#Menu:Gateway Of Tally]
	Add		: Button	: StopTimer
	Add		: Button	: StartTimer
	
[Button:StopTimer]
	Title	: "Stop Timer"
	Key		: Alt + K
	Action	: Stop Timer	: AutoLogMsg
	
[Button:StartTimer]
	Title	: "Start Timer"
	Key		: Alt + S
	Action	: Start Timer	: AutoLogMsg	: 1
```
