---
title: financial year button
type: sample_code
objects: Button
source: financial year button.txt
---

# financial year button

## Source Code

```tdl
[#Form: Ledger Vouchers]
Add: Button:from 2023
[#Form : DayBook]
Add: Button:from 2023
[Button:from 2023]
Key : Alt+n
Title	: "Hello"
;Action : Set : from 2023 : Not ##from 2023
;Title : IF ##from 2023 then "from 2023- NO " else "from 2023- YES"

;-------- multiple financial year ledger veiw default


[#Report : Ledger Vouchers]

Delete:set : SVFromDate : If $$ParentIsMenu AND NOT $$InPrintMode AND NOT $$InChangeView Then $$MonthStart:@@LastVoucher Else ##SVFromDate
Delete:set : SVToDate : @@DSPToDate
Add:set:SVfromDate:"1.4.19"
Add:set : SVToDate : "8.4.19"
```
