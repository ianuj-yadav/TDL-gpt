---
title: Tally Prime Barcode Printing TDL Code
type: sample_code
objects: Report, Form, Part, Line, Field, Function
source: Tally Prime Barcode Printing TDL Code.txt
---

# Tally Prime Barcode Printing TDL Code

## Source Code

```tdl
/*
Objective(s) :-
 To Print Barcode for the Stock Items

Specific TDL Feature(s) used :-
 Repeat attribute at Part Level
 Explode attribute at Line Level
 Creation of new Style using Bar coding Font IDAutomationHC39S
 User Defined Function to replace  (Space) with = symbol as this font IDAutomationHC39S treats = as space.

Last Updation :-
 Altered on 17/06/2010
*/

;; Adding Label Printing Report to the already existing Report

[#Form: Sales Color]

Add : Print : TSPL FFE LabelPrint

;;Label Printing Report

[Report: TSPL FFE LabelPrint]

Form : TSPL FFE LabelPrint
Object : Voucher

[Form: TSPL FFE LabelPrint]

Part : TSPL FFE LabelPrint

[Part: TSPL FFE LabelPrint]

Line : TSPL FFE LabelPrint
Repeat : TSPL FFE LabelPrint : Inventory Entries
Scroll : Vertical

[Line: TSPL FFE LabelPrint]

Field : TSPL FFE StkItemLabel1
Explode : TSPL FFE MoreLabels : $$Number:$BilledQty > 1
Space Bottom : 1

[Part: TSPL FFE MoreLabels]

Line : TSPL FFE MoreLabels

[Line: TSPL FFE MoreLabels]

Field : TSPL FFE StkItemLabel1
Explode : TSPL FFE MoreLabels : $$Number:$BilledQty >($$ExplodeLevel+$$Line)
Space bottom : 1

[Field: TSPL FFE StkItemLabel1]

Use : Name Field
Set as : ( + @TSPLFEEBarcodeLF + )
TSPLFEEBarcodeLF : $$TSPLFFEBarcodeString:@TSPLFEEStkName
TSPLFEEStkName : If $$IsEmpty:($TSPLFEEStkAlias:StockItem:$StockItemName) then $StockItemName +
else ($TSPLFEEStkAlias:StockItem:$StockItemName)
Style : TSPL FFE BarCode

[Style: TSPL FFE BarCode]

Font : IDAutomationHC39S
Height : 10

[#Object: StockItem]

TSPLFEEStkAlias : $$Alias

;; Function to replace space with =

[Function: TSPL FFE BarcodeString]

Parameter : TSPLFFEEBarcodeInput : String

Variable : TSPLFFE Temp : String
Variable : TSPLFFE Count : Number
Variable : TSPLFFEEBarcodeOutput : String

10 : Set : TSPLFFE Temp : 
20 : FOR TOKEN : TSPL TokenVar : ##TSPLFFEEBarcodeInput :  
30 : Set : TSPLFFE Temp : ##TSPLFFETemp + $$String:##TSPLTokenVar + =
40 : END FOR
50 : SET : TSPLFFE Count : $$StringLength:##TSPLFFETemp
60 : SET : TSPLFFEEBarcodeOutput : $$StringPart:##TSPLFFETemp:0:(##TSPLFFECount-1)
70 : RETURN : ##TSPLFFEEBarcodeOutput

;; End-of-File
```
