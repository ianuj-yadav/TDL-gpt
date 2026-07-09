---
title: functions practice
type: sample_code
objects: Report, Form, Part, Line, Field, Function, Button
source: functions practice.txt
---

# functions practice

## Source Code

```tdl
[#Menu: Gateway of Tally] 
	Add: Key Item	: At End: "SumEntry" 			: S	: Alter : Sum Report
	Add: Key Item	: At End: "Interest Calculator" : C	: Alter : CompoundInterest
	Add: Key Item	: At End: "Exchange Numbers" 	: A	: Alter : Exchange
	Add: Key Item	: At End: "Check Odd Even"		: O	: Alter	: OddEven
[Report: Sum Report]
    Form: Sum Form
    Title: "Sum Report"
    Object: Sum Line

[Form: Sum Form]
    Part: Sum Part

[Part: Sum Part]
    Line:QLine, Sum Line
[Line:Qline]
	Fields	: Qline1, Qline2, Qline3
	[Field:Qline1]
		Set as : "Give Two Numbers"
		Skip :Yes
	[Field:Qline2]
		Type	: Number
		Use	: NumberField
		;Set as	: "Give Two Numbers"
		
	[Field:Qline3]
		Type	: Number
		Use	: NumberField
		;Set as	: "Give Two Numbers"
		
[Line: Sum Line]
    Field: Sum Field

[Field: Sum Field]
    ;Use: Name Field
    Set As	: $$Sum:#Qline2:#Qline3;$$FactorialOf:7;"Sum of 10 and 20 is : " + $$String:@Sum
	Sum		: $$Sum:#Qline2:#Qline3
	;Skip	: Yes
	Width	: 5
	Set Always	: Yes
	Full Width	: yes
	
[Report:OddEven]
	Form	: OddEven
	
[Form:OddEven]
	Part	: OddEvenT, OddEvenB
	
[Part:OddEvenT]
	Line	: OddEvenT
	[Line:OddEvenT]
		Field	: Name Field
		Local	: Field	: Name Field	: Info	: "Check Odd Even"
		Local	: Field	: Name Field	: Align	: Center
		Local	: Field	: Name Field	: Full Width	: Yes
		
[Part:OddEvenB]
	Line	: OddEvenB
	[Line:OddEvenB]
		Field	: Long Prompt, InputNumber, ResultNumber
		Local	: Field	: Long Prompt	: Info	: "Enter Number"
		
		[Field:InputNumber]
			Use		: Number Field
			Background	: Yellow
			
		[Field:ResultNumber]
			Use		: Name Field
			Background	: Green
			Set as		: If $$TirlokEven:#InputNumber Then "Even Number" Else "Odd Number"
			Set Always	: Yes
			
[Function:TirlokEven]
	Parameter	: Number		: Number
	Returns		: Logical
	Variable	: YesNo			: Logical
	;Variable	: New			: Number
	Variable	: Round			: Number
	;005	: Set	: New			: ##Number/2
	010	: Set 	: Round			: $$RoundDown:##Number:2
	
	015	: If	: ##Number-##Round=0
	020	: Set	: YesNo	: Yes
	025	: Else
	030	: Set	: YesNo	: No
	035	: End If
	040	: Log	: ##YesNo
	041	: Log	: ##Number
	042	: Log	: ##Round
	045	: Return	: ##YesNo
	
		
[Function: Sum]
    Parameter: Num1 : Number
    Parameter: Num2 : Number
	Returns	: Number
	Variable	: Sum: Number
    ;001:Set	: Sum	: 1
	
	;004:Set:Sum:##Num1*##Num2
	005:Return :##Num1+##Num2  ;##Sum
[Function : FactorialOf]
Parameter : InputNumber : Number 
Returns : Number
Variable : Counter : Number
Variable : Factorial : Number
01:Set:Counter:1
02:Set:Factorial:1
03:While:##Counter<=##InputNumber
04:Set:Factorial:##Factorial*##Counter
05:Set:Counter:##Counter+1
06:End While
07:Return:##Factorial

[Function : Exponential]
Parameter : InputNumber1 : Number 
Parameter : InputNumber2 : Number 
Returns : Number
Variable : Counter : Number
Variable : Expo : Number
01:Set:Counter:1
02:Set:Expo:1
03:While:##Counter<=##InputNumber2
04:Set:Expo:##Expo*##InputNumber1
05:Set:Counter:##Counter+1
06:End While
07:Return:##Expo

[Report: CompoundInterest]
    Form: CompoundInterest
    Title: "Compound Interest"
    

[Form: CompoundInterest]
    Part: CompoundInterest

[Part: CompoundInterest]
    Line:CompoundInterest1, CompoundInterest2, CompoundInterest3, CompoundInterest4, CompoundInterest5
	[Line:CompoundInterest1]
		Fields	: Long Prompt, CompoundInterest12
		Local	: Field	: Long Prompt	: Set as	: "Principal Amount"
			
		[Field:CompoundInterest12]
			Type	: Number
			Use		: NumberField
			
	[Line:CompoundInterest2]
		Fields	: Long Prompt, CompoundInterest22
		Local	: Field	: Long Prompt	: Set as	: "Rate"
			
		[Field:CompoundInterest22]
			Type	: Number
			Use		: NumberField
			
	[Line:CompoundInterest3]
		Fields	: Long Prompt, CompoundInterest32
		Local	: Field	: Long Prompt	: Set as	: "Time In Years"
			
		[Field:CompoundInterest32]
			Type	: Number
			Use		: NumberField
			
	[Line:CompoundInterest4]
		Fields	: Long Prompt, CompoundInterest42
		Local	: Field	: Long Prompt	: Set as	: "Compound Interest Amount"
			
		[Field:CompoundInterest42]
			Type	: Number
			Use		: NumberField
			Set as	: $$CIFunction:#CompoundInterest12:#CompoundInterest22:#CompoundInterest32
			Set Always	: Yes

	[Line:CompoundInterest5]
		Fields	: Long Prompt, CompoundInterest52
		Local	: Field	: Long Prompt	: Set as	: "Simple Interest Amount"
			
		[Field:CompoundInterest52]
			Type	: Number
			Use		: NumberField
			Set as	: $$SIFunction:#CompoundInterest12:#CompoundInterest22:#CompoundInterest32
			Set Always	: Yes
		
[Function:CIFunction]
	Parameter	: Principal		: Number
	Parameter	: Rate			: Number
	Parameter	: Time			: Number
	Returns		: Number
	Variable	: CIValue		: Number
	Variable	: RateTime		: Number
	01:Set	: CIValue			: 0
	02:Set	: RateTime			: $$Exponential:((100+##Rate)/100):($$RoundUp:##Time:1)
	03:Set	: CIValue			: ##Principal*##RateTime
	04:Set	: CIValue			: ##CIValue-##Principal
	05:Return:##CIValue
	
[Function:SIFunction]
	Parameter	: Principal		: Number
	Parameter	: Rate			: Number
	Parameter	: Time			: Number
	Returns		: Number
	Variable	: SIValue		: Number
	Variable	: RateTime		: Number
	01:Set	: SIValue			: 0
	03:Set	: SIValue			: ##Principal*##Rate*##Time/100
	05:Return	: ##SIValue
	

[Report: Exchange]
    Form: Exchange
    Title: "Exchange Numbers"
    

[Form: Exchange]
    Part: Exchange

[Part: Exchange]
    Line:Exchange1, Exchange2, Exchange3, Exchange4
	[Line:Exchange1]
		Fields	: Long Prompt, Exchange1
		Local	: Field	: Long Prompt	: Set as	: "Enter Number 1"
			
		[Field:Exchange1]
			Type	: Number
			Use		: NumberField
			
	[Line:Exchange2]
		Fields	: Long Prompt, Exchange2
		Local	: Field	: Long Prompt	: Set as	: "Enter Number 2"
			
		[Field:Exchange2]
			Type	: Number
			Use		: NumberField
			
	[Line:Exchange3]
		Fields	: Long Prompt, Exchange3
		Local	: Field	: Long Prompt	: Set as	: "Number 1 After Exchange"
			
		[Field:Exchange3]
			;Type	: Number
			;Use		: NumberField
			Set as	: $$ConvertNumber:10
			;Set Always	: Yes
			
	[Line:Exchange4]
		Fields	: Long Prompt, Exchange4
		Local	: Field	: Long Prompt	: Set as	: "Number 2 After Exchange"
			
		[Field:Exchange4]
			;Type	: Number
			;Use		: NumberField
			Set as	: $$ConvertNumber:#Exchange1
			Set Always	: Yes

[Function:Exchange]
	Parameter	: Num1		: Number
	Parameter	: Num2			: Number
	Returns: Number
	
	01:Exchange	: ##Num1:##Num2
	05:Return	: ##Num2
	
		

[#Form:Daybook]
	;Add	: Button	: Duplicatebutton
	
[Button:Duplicatebutton]
	Title: "Dupicate vouchers"
	Key		: Alt+8
	Action	: Call	: DuplicatePaymentVouchers
	

[Function : DuplicatePaymentVouchers]

;;Process for each Payment Voucher

01 : WALK COLLECTION : My Vouchers

;; Create new Voucher Object as Target Object

02 : NEW OBJECT : Voucher

;;For New Object, set methods from the First Object of the Walk Collection, i.e., from the Current Object

03 : SET VALUE : Date : $Date

04 : SET VALUE : VoucherTypeName : $VoucherTypeName

05 : SET VALUE : Narration : $Narration + " Duplicated"

;; Walk over Ledger Entries of the current Object

05a : WALK COLLECTION : LedgerEntries

;;Insert Collection Object to the Target Object and make it the present Target Object

06 : INSERT COLLECTION OBJECT : Ledger Entries

;;Set the Values of the Target Objects Method from Current Objects Methods

07 : SET VALUE : Ledger Name : $LedgerName

08 : SET VALUE : IsDeemedPositive : $IsDeemedPositive

09 : SET VALUE : Amount : $Amount

;;Set the Voucher Object as Target, (which is 1 level up in the hierarchy) as Voucher is already having

;;Object specification

10 : SET TARGET : ..

11 : END WALK

;;Save the Duplicated Voucher to the DB.

12 : CREATE TARGET

13 : End Walk

14 : RETURN


;;;;;========================================================

[Function: ConvertNumber]

;; This code snippet converts only the numbers between 1 and 50 to the corresponding Roman numeral. You need to add appropriate validations to exclude values below 1 and above 50.

Parameter : InputValue      : Number

Variable     : VarReturnVal  : String:  ""

01 : While :##InputValue = 50

05 :   Set:VarReturnVal:##VarReturnVal+"L"

10 :   Set:InputValue:##InputValue-50

15 : End While

20 : While :##InputValue >= 40

25 :   Set :VarReturnVal:##VarReturnVal+"XL"

30 :   Set:InputValue:##InputValue-40

35 : End While

40 : While:##InputValue >= 10

45 :   Set:VarReturnVal: ##VarReturnVal+"X"

50 :   Set:InputValue:##InputValue-10

55 : End While

60 : While:##InputValue >= 9

65 :   Set:VarReturnVal:##VarReturnVal +"IX"

70 :   Set:InputValue:##InputValue-9

75 : End While

80 : While:##InputValue >= 5

85 :   Set:VarReturnVal:##VarReturnVal+"V"

90 :   Set:InputValue:##InputValue-5

95 : End While

100: While:##InputValue >= 4

105:   Set:VarReturnVal:##VarReturnVal+"IV"

110:   Set:InputValue:##InputValue-4

115: End While

120: While:##InputValue >= 1

125:   Set:VarReturnVal:##VarReturnVal+"I"

130:   Set:InputValue:##InputValue-1;

135: End While

140: Return: ##VarReturnValFunction







;;==========================================
[#Menu:Gateway of tally]
	Add	: Button	: ChageLedger
[Button:ChageLedger]
	Key			: Alt+3
	Title		: "Change Ledger"
	;Action		: Modify Object	: (Ledger,$LedgerEntries[2].LedgerName).LedgerName :$LedgerEntries[1].LedgerName
	Action		: Call	: ChangeLedgerFun;:#VchParticulars
	;Inactive	: NOT ($$Owner:$$InDuplicateMode) or Not @@IsJournal
	
[Function:ChangeLedgerFun]
	Object: Ledger		: "ABC Company"
	1:New Object	: Ledger	: "Cash"
	2	: Set Value	: OpeningBalance		: $openingBalance+$$TgtObject:$openingbalance
	3	: Accept alter


```
