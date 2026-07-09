---
title: System Events
type: sample_code
objects: Function
source: System Events.txt
---

# System Events

## Source Code

```tdl
[System:Events]
;	AppStartLabel	: System Start	: Yes	: Call	: AppStartFunction
;	AppEndLabel		: System End	: Yes	: Call	: AppEndFunction
;	AppTimerLabel	: Timer			: Yes	: Call	: AppTimerFunction
;	LoadCmpLabel	: Load Company	: Yes	: Display	: Profit And Loss; Call	: LoadCmpFunction
;	CloseCmpLabel	: Close Company	: Yes	: Call	: CloseCmpFunction
	
[Function:AppStartFunction]
	001	: Msg Box	: "Welcome"			: "Welcome To Tally On System Start"
	
[Function:AppEndFunction]
	001	: Msg Box	: "Good Bye"		: "Welcome To Tally On System End"
	
[Function:AppTimerFunction]
	001	: Msg Box	: "Timer"			: "Welcome To Tally On Timer"

[Function:LoadCmpFunction]
	001	: Msg Box	: "Load Cmp"		: "Welcome To Tally On Load Company";+##SVCurrentCompany

[Function:CloseCmpFunction]
	001	: Msg Box	: "Close Cmp"		: "Welcome To Tally On Close Company";+##SVCurrentCompany





















```
