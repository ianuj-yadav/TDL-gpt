---
title: BinarySoft Print
type: sample_code
objects: Part, Line, Field, Collection
source: BinarySoft Print.txt
---

# BinarySoft Print

## Source Code

```tdl
[#Form: Comprehensive Invoice]

	Option: Global Invoice    : #DSPVchType="SV Type1"

[#Form: Simple Printed Invoice]

	Option: Global Invoice    :  #DSPVchType="SV Type1"
	
[!Form : Global Invoice]

	Delete  	: Parts
	Delete	    : Bottom Parts
	Delete	    : PageBreak
	Space Top:3
 	Space Right	: 3
	
	add:Parts		: STD Invoice Top, GI OpPgBrk, Global Invoice Body,GI Inventory Total, GI Inventory Gst,	+
						Blank Part2, GI Inventory Net Amount
	add:Bottom Parts: Global Invoice Bottom Tirlok

	add:Page Break	: GI ClPgBrk, GI OpPgBrk
	;Print BG		: Yellow
	
[#Part:MST Basic]
	Background	: Yellow
	
[#Line: MST Name]
	Border: Thin Box
	
[#Form: Voucher Type]
	Background	: Yellow
[Part: GI ClPgBrk]

	Lines		: GI ClPgBrk

	[Line: GI ClPgBrk]

		Fields		: Simple Field
		Local: Field: Simple Field	: Set As	: "Continued..."
		Local: Field: Simple Field	: FullWidth	: Yes
		Local: Field: Simple Field	: Align		: Right
		Border		: Full Thin Top

[Part: GI OpPgBrk]

	Parts		: Logo Invoice,Invoice Type,GI Top,Global Invoice Top, Blank Part1, GI Inventory Title
	Vertical	: Yes
[Part: Logo Invoice]

	Line			: empty
	Graph Type:$Logopath:Company:#SVCurrentCompany
	Width:100% Page
	Height:10% Page
	Space Left:2.8 Inch
	Border:Thin Box
	
	/*
	[Line:Logo Line]
		Field:Logo Field
		[Field:Logo Field]
			Set as:""
			Align:Center
	*/
	
[Part:Invoice Type]
	Line		: Invoice Type
	Border		: Thin Cover
	;Print BG   	: Red
	[Line:Invoice Type]
		Field:Invoice Field
		[Field:Invoice Field]
			Set as:"Tax Invoice"
			Style:Head Style
			Align:Center
			Full Width:Yes
			


[Part:GI Top]
	Background	: Red
	Line:VCH Details1

	[Line:VCH Details1]
		Field:Sup,Cus
		[Field:Sup]
			Fields:Sup1,Sup2
			Width:50% Page
			Border:Thin Box
			[Field:Sup1]
				Set as:"Invoice No: "
				Style:Head Style
			[Field:Sup2]
				Set as:$VoucherNumber
				Style:Head Style
		[Field:Cus]
			Fields:Cus1,Cus2
			
			Border:Thin Box
			Full Width:Yes
			[Field:Cus1]
				Set as:"Dated: "
				Style:Head Style
			[Field:Cus2]
				Set as:$Date
				Style:Head Style
				Format:Short Date, Separator:"/"
		

[Part: Global Invoice Top]
	Left Parts:Supplier Part
	Right Parts:Customer Part
	Border			: Thin Cover
	
[Part:Supplier Part]
	Line:SupplierVendor,Supplier Name,SupplierAddress,SupplierState,SupplierPhone,SupplierMobile,SupplierEmail,SupplierGSTIN
	Width:50% Page
	Border:Thin Box
	[Line:SupplierVendor]
		Field:SupplierVendor
		Space Bottom:1.5
		[Field:SupplierVendor]
			Set as:"Supplier/Vendor"
			Style:SupplierVendor
	[Line:Supplier Name]
		Field:Supplier Name
		[Field:Supplier Name]
			Set as:@@CmpMailName
			Style:Details
			
	[Line:SupplierAddress]
		Field:SupplierAddress
		[Field:SupplierAddress]
			Set as:$Address:Company:@@CmpMailName
			Style:Details
		
	[Line:SupplierState]
		Field:SupplierState
		Space Bottom:1
		[Field:SupplierState]
			Set as:$PriorStateName:Company:@@CmpMailName + "-" +$Pincode:Company:@@CmpMailName 
			Style:Details
			
	[Line:SupplierPhone]
		Field:SupplierPhone
		[Field:SupplierPhone]
			Set as:$PhoneNumber:Company:@@CmpMailName 
			Style:Details
			
	[Line:SupplierMobile]
		Field:SupplierMobile
		[Field:SupplierMobile]
			Set as:$MobileNumbers:Company:@@CmpMailName
			Style:Details
			
	[Line:SupplierEmail]
		Field:SupplierEmail
		Space Bottom:1
		[Field:SupplierEmail]
			Set as:$Email:Company:@@CmpMailName
			Style:Details
			
	[Line:SupplierGSTIN]
		Field:Short Prompt,SupplierGSTIN
		Local:Field:Short Prompt:Set as:"GSTIN" 
		Local:Field:Short Prompt:Style:Details
		Space Bottom:1
		[Field:SupplierGSTIN]
			Set as:@@CMPGSTCurrRegNumber ;$GSTRegNumber:TaxUnit: ($ExciseUnitName:Company:##SVCurrentCompany)
			Style:Details


[Part:Customer Part]
	Line:CustomerClient,Customer Name,CustomerAddress,CustomerPerson,CustomerMobile,CustomerState1,CustomerPincode,CustomerGSTIN,CustomerState
	
	Border:Thin Box
	Width:50% Page
	[Line:CustomerClient]
		Field:CustomerClient
		Space Bottom:1.5
		[Field:CustomerClient]
			Set as:"Customer/Client"
			Style:SupplierVendor
			Widespaced : Yes
	[Line:Customer Name]
		Field:Customer Name
		[Field:Customer Name]
			Set as:$PartyLedgerName + $Address:Ledger:$PartyLedgerName
			Style:Details
	[Line:CustomerAddress]
		Field:CustomerAddress
		[Field:CustomerAddress]
			Set as: $Address:Ledger:$PartyLedgerName
			Style:Details
		
;	[Line:CustomerState]
;		Field:CustomerState
;		Space Bottom:1
;		[Field:CustomerState]
;			Set as:$PriorStateName:Ledger:$PartyLedgerName 
;			Style:Details
			
	[Line:CustomerPerson]
		Field:Short Prompt,CustomerPerson
		Local:Field:Short Prompt:Set as:"Contact Person : " 
		[Field:CustomerPerson]
			Set as:$Person:Ledger:$PartyLedgerName 
			Style:Details
			
	[Line:CustomerMobile]
		Field:Short Prompt,CustomerMobile
		Local:Field:Short Prompt:Set as:"Contact : "
		[Field:CustomerMobile]
			Set as:$MobileNumbers:Ledger:$PartyLedgerName + $Email:Ledger:$PartyLedgerName 
			Style:Details
		
	[Line:CustomerState1]
		Field:Short Prompt,CustomerState1,Customer State Code
		Local:Field:Short Prompt:Set as:"Place of Supply : " 
		Local:Field:Short Prompt:Style:Details
		Space Bottom:1
		[Field:CustomerState1]
			Set as:$PriorStateName:Ledger:$PartyLedgerName  + ", "
			Style:Details
		[Field:Customer State Code]
			Set as:"State Code : " + $$getgststatecode:($LedStateName:Ledger:$PartyLedgerName )
			Style:Details
			
	[Line:CustomerPincode]
		Field:Short Prompt,CustomerPincode
		Local:Field:Short Prompt:Set as:"PinCode : "
		[Field:CustomerPincode]
			Set as:$Pincode:Ledger:$PartyLedgerName
			Style:Details
		
	[Line:CustomerGSTIN]
		Field:Short Prompt,CustomerGSTIN
		Local:Field:Short Prompt:Set as:"GSTIN" 
		Local:Field:Short Prompt:Style:Details
		Space Bottom:1
		[Field:CustomerGSTIN]
			Set as:$PartyGSTIN
			Style:Details

	[Line:CustomerState]
		Field:Short Prompt,CustomerState
		Local:Field:Short Prompt:Set as:"State : " 
		Local:Field:Short Prompt:Style:Details
		Space Bottom:1
		[Field:CustomerState]
			Set as:$PriorStateName:Ledger:$PartyLedgerName
			Style:Details

[Part:Blank Part1]
	Line:Blank Part1
	
	[Line:Blank Part1]
		Field: Blank Part1
		[Field:Blank Part1]
			Set as: ""

[Part: GI Inventory Title]

	Lines	: GI Inventory Title
	Border	: Thin Box

	[Line: GI Inventory Title]

		Use		: GI Inventory Details

		Local	: Field	: Default			: Type	: String
		Local	: Field	: Default			: Style	: Normal Bold
		Local	: Field	: Default			: Align	: Center

		Local	: Field	: GI SI No			: Set as: "Sr."
		Local	: Field	: GI Item Name		: Set as: "Particulars"
		Local	: Field	: GI Part Num		: Set as: "Part No."
		Local	: Field	: GI HSN			: Set as: "HSN"
		Local	: Field	: GI Qty			: Set as: "Qty"
		Local	: Field	: GI Rate			: Set as: "Price"
		Local	: Field	: GI Amount			: Set as: "Amount INR"

		Border	: Thick Bottom
		SpaceTop: 0

[Part: Global Invoice Body]

	Lines			: GI Inventory Details
	Repeat			: GI Inventory Details	: Inventory Entries
	Scroll			: Vertical
	Border			: Thin Left Right Bottom
	Common Borders	: Yes

	[Line: GI Inventory Details]

		Fields		: GI SI No, GI Item Name, GI Part Num
		Right Fields: GI HSN, GI Qty, GI Rate, GI Amount

		Space Top	: if $$Line = 1 then 1 else 0

		[Field: GI SI No]

			Use			: Number Field	
			Set as		: $$Line
			Border		: Thin Right
			Width		: 5% Page

		[Field: GI Item Name]

			Use			: Name Field
			Set as		: if NOT $$IsSysName:$StockItemName then @@InvItemName else ""
			Width		: 25% Page
			

		[Field: GI Part Num]

			Use			: Name Field
			Set as		: "("+$PartNumberStki:Stockitem:$stockitemName+")"
			;Width		: 30% Page
			;Border		: Thin Left
			Style		: TSPL FFE BarCode
			;Style		: Code39barcode
			;Style		: EAN13
			Align		: Center
			

		[Field: GI HSN]
			
			Use			: Name Field
			Set as		: $GSTHSNCode:Stockitem:$stockitemName
			;Set as		: $GSTItemHSNCodeEx
			;Set as:  If ##IsVCHObjChange Then $GSTItemHSNCodeEx Else IF ##vHighValue < $GSTAssesableValEx Then $GSTItemHSNCodeEx Else ##vHighHSN 
			;Set as		: $(Stockitem,$stockitem).HsnDetails[LAst].dpk;##tempGSTHSNCode:StockItem:$StockItemName;if NOT $$IsSysName:$StockItemName then @@InvItemName else ""
			Width		: 10% Page
			;Border		: Thin Left
				;tempGSTHSNCode,HSNCode
	
		[Field: GI Qty]

			Use			: Qty Primary Field
			Set as		: $BilledQty
			Border		: Thin Left
			Width		: 8% Page

		[Field: GI Rate]

			Use         : Rate Price Field
			Border		: Thin Left
			Set as		: $Rate
			Width		: 12% Page

		[Field: GI Amount]

			Use			: Amount Forex Field
			Border		: Thin Left
			Set as		: $Amount
			Width		: 10% Page
			
[Part:GI Inventory Total]
	Lines	: GI Total
	;Repeat			: GI Acc Det Gst	: Ledger Entries
	
	;Common Borders	: Yes
	Border	: Thin Bottom Left Right
	
	[Line:GI Total]
		Right Field:GI Total Title, Total Sum
		
		[Field:GI Total Title]
			Set as		: "Total = "
			
		[Field:Total Sum]
			
			Set as      :$$CollAmtTotal:InventoryEntries:$Amount
			Style		: Normal Bold
			Read Only	: Yes
[Part: GI Inventory Gst]
	Line	: GI Acc Det Gst
	Repeat	: GI Acc Det Gst	: Ledger Entries
	Border	: Thin Box
	/*
	
	Fields		: GI SI No, GI Item Name, GI Part Num
		Right Fields: GI HSN, GI Qty, GI Rate, GI Amount

		Space Top	: if $$Line = 1 then 1 else 0
		
		
		*/
	[Line:GI Acc Det Gst]
		Fields			: GI Gst Sr, GI Gst Name, 
		Right Fields	: GI Gst Rate, GI Gst Amount
		[Field: GI Gst Sr]
			Set as		: " "
			;Border		: Full Thin Top Left
			Width		: 10% Page

		[Field: GI Gst Name]

			Use			: Name Field
			Set as		: $LedgerName
			Width		: 40% Page
			Align		: Right
			Border		: Thin Left
		
		
		[Field: GI Gst Rate]
			
			Use			: Name Field
			Set as		: If ##GstVAr = "Yes" Then $CGSTRATE Else $IGSTRate
			Width		: 10% Page
			Border		: Full Thin Top Left
			Type		: Number
			Format		: "Percentage"
			Align		: Center
				
	
		[Field: GI Gst Amount]

			Use			: Amount Forex Field
			Border		: Full Thin Top Left
			Set as		: $Amount
			Width		: 40% Page
			Align		: Right
			


/*
	[Line: GI Acc Det Gst]
			Right Fields: GI LedgerName, GI Amount Gst
			[Field:GI LedgerName]
				Set as:$LedgerName
				
			[Field:GI Amount Gst]
				Set as	: $Amount
				Style	: Normal
			*/
			
[Part:Blank Part2]
	Line:Blank Part2
	
	[Line:Blank Part2]
		Field: Blank Part2
		[Field:Blank Part2]
			Set as: ""
			

[Part:GI Inventory Net Amount]
	Lines:Net Amount Digit, Net Amount Words, Payment Titles, Payment Details, Additional Remarks,BinarySoft, Signatory
	Border:Thin box
	
	[Line:Net Amount Digit]
		Right Fields	: Net Amount Digit1,Net Amount Digit2
		Border			: Thin Bottom
		
		[Field:Net Amount Digit1]
			Set as	: "Net Amount INR "
			Style	: Normal Bold
			
		[Field:Net Amount Digit2]
			Set as	: $Amount
			Style	: Normal Bold
		
	[Line:Net Amount Words]
		Right Fields	: Net Amount Words1, Net Amount Words2
		Border			: Thin Bottom
		
		[Field:Net Amount Words1]
			Set as	: "Amount Chargeable (in words): "
			Style	: Normal Bold
		
		[Field:Net Amount Words2]
			Set as	: $$InWords:$Amount
			Style	: Normal Bold
		
		

	[Line:Payment Titles]
		Left Fields		: Bl Field1
		Right Fields	: Payment Bank Title, Payment Mode Title, Payment Date Title, Payment Amount Title
		;Border			: Thin Box
		
		Space Top	: 3
		[Field:Bl Field1]
			Set as: ""
			
		[Field:Payment Bank Title]
			Set as	: "Payment Details"
			Width	: 24% Page
			Border	: Full Thin Top Left
			Align	: Center
			
		[Field:Payment Mode Title]
			Set as	: "Payment Mode"
			Width	: 24% Page
			Border	: Full Thin Top Left
			Align	: Center
			
		[Field:Payment Date Title]
			Set as	: "Payment Date"
			Width	: 24% Page
			Border	: Full Thin Top Left
			Align	: Center
			
		[Field:Payment Amount Title]
			Set as	: "Payment Amount"
			Width	: 24% Page
			Align	: Center
			Border	: Full Thin Top Left
			
			
		[Line:Payment Details]
			Left Fields		: Bl Field2
			Right Fields	: Payment Bank Name, Payment Mode Name, Payment Date Name, Payment Amount Name
			;Border			: Thin Box
		[Field:Bl Field2]
			Set as: ""
			
		[Field:Payment Bank Name]
			Set as	: "Payment Details"
			Width	: 24% Page
			Border	: Full Thin Top Left
			Align	: Center
			
		[Field:Payment Mode Name]
			Set as	:  $$getgststatecode:$LedStateName:Ledger:$PartyLedgerName; =$$getgststatecode:($PriorStateName:Company:@@CmpMailName ) Then $CGSTRATE
			Width	: 24% Page
			Border	: Full Thin Top Left
			Align	: Center
			
		[Field:Payment Date Name]
			Set as	: $$String:$Date:UniversalDate
			Width	: 24% Page
			Border	: Full Thin Top Left
			Align	: Center
			
		[Field:Payment Amount Name]
			Set as	: $Amount
			Width	: 24% Page
			Align	: Center
			Border	: Full Thin Top Left
			
			
	[Line: Additional Remarks]
		Left Fields	: Bl Field3
		Right Field	:  Additional Remarks
		[Field:Bl Field3]
			Set as: ""
			
		[Field: Additional Remarks]
			Set as	:  "Additional Remarks :"
			Width	: 95.9% Page
			Border	: Thin Box
		
		
	[Line:BinarySoft]
		Field		: BinarySoft
		Space Top	: 3
		[Field:BinarySoft]
			Set as	: "For BinarySoft"
	
	[Line:Signatory]
		Field		: Signatory
		
		[Field:Signatory]
			Set as	: "Authorised Signatory"



[Part: Global Invoice Bottom Tirlok]
	Lines		: Bottom Part
	Width		: 100% Page
	[Line:Bottom Part]
		Field		: Bottom Part
		Space Top	: 1
		[Field:Bottom Part]
			Set as	: "Note : Normal processing time for your Order is 2-4 Hrs. Incase of Holidays, Your order will be processed on the next business day"
			Align	: Center
			Full Width	: Yes
			Style : Bottom style

	

	



;; Style Definition

[Style: Cmp Style]

	Font Name	: "Times New Roman"
	Height		: 10
[Style: Invoice Style]

	Font Name	: "Times New Roman"
	Height		: 10
	Bold		: Yes
	
[Style: Head Style]
	Height:8
	Bold:Yes
	Font Name:"Times New Roman"
[Style: Performa Style]
	Height		: 15
	Font Name	: "Impact"
[Style:Invoice Number Style]
	Height:10
	Font Name:"Times New Roman"
	
[Style:SupplierVendor]
	Height:14
	Font Name:"Times New Roman"
	Bold		: Yes
	
	
[Style:Details]
	Height:10
	Font Name:"Times New Roman"
	Bold		: Yes
[Style : Bottom style]
	Height:8
	Font Name:"Times New Roman"
	
[Style:All Font]
	Font Name:"Times New Roman"
[Border: Thin Bottom Left Right]

    Bottom      : Thin
	Left		: Thin
	Right		: Thin
[System: Formula]

	DueDtCalc	: $Date + $$Number:$BasicDueDateofPymt
	
[Style:C39HrP24DhTtBar]
	Font Name:"IDAutomationHC39M Free Version"
[Collection:TirlokGST]
	Collection:CompanyGSTINumber
	

[Style: IDAutomationHC39M_Free_Version]

	Font 	: IDAutomationHC39M Free Version
	Height 	: 14
	
[Style: EAN13]
	Font: "FontCode"
	Height 	: 14

;; End-of-File



```
