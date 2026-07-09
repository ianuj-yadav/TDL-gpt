---
title: Auto Quit Tally
type: sample_code
objects: Function
source: Auto Quit Tally.txt
---

# Auto Quit Tally

## Source Code

```tdl
[System: Events]
TimerStart	: System Start 	: NOT $$IsRemoteCompany : CALL : StartTimer
TimerQuit 	: Timer			: True					: CALL : AutoQuitTally

[Function: AutoQuitTally]

01 : Msg Box		: ""	: "Time Out\n\n" + "Tally Auto Quit"
02 : Trigger Key	: Ctrl + Q

[Function: StartTimer]
100 	: Start Timer	: TimerQuit 	: 10
```
