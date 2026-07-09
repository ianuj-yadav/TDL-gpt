---
title: Binary new
type: sample_code
objects: Part, Line, Field, Collection
source: Binary new.txt
---

# Binary new

## Source Code

```tdl
/*
[#Form: Comprehensive Invoice]

	Option: Global Invoice    : @@IsSales 
	;Width	: 100% Page

[#Form: Simple Printed Invoice]

	Option: Global Invoice    : @@IsSales  
	;Width	: 100% Page
	
[!Form : Global Invoice]

	Delete  	: Parts
	Delete	    : Bottom Parts
	Delete	    : PageBreak
	Space Top	: 0.2 Inch
 	Space Right	: 0.2 Inch
	Space Left	: 0.2 Inch
	Space Bottom: 0.2 Inch
	
	add			:Parts			: STD Invoice Top,GI OpPgBrk, ItemDtlsPart, ItemTotalAmtBase, GstPercent, BlkPart2, BasePart
	add			:Bottom Parts	: Global Invoice Bottom Tirlok

	add			:Page Break		: GI ClPgBrk, GI OpPgBrk
	Full Height	: Yes
	Full Width	: Yes
	
	;Print BG	: Yellow
	

[Part: GI ClPgBrk]

	Lines		: GI ClPgBrk

	[Line: GI ClPgBrk]

		Fields		: Simple Field
		Local		: Field			: Simple Field	: Set As	: "Continued..."
		Local		: Field			: Simple Field	: FullWidth	: Yes
		Local		: Field			: Simple Field	: Align		: Right
		Border		: Full Thin Top

[Part: GI OpPgBrk]

	Parts		: Logo Invoice,  Invoice Type, SupplierCustomerDetails,BlkPart1,ItemDtlsTitle
	Vertical	: Yes
	;Width		: 7.27 Inch
	;Print BG	: Red
	


[Part: Logo Invoice]
	Part		: LogoImage
	Width		: 100% Page
	Border			: Thin Cover
	Horizontal Align	: Center
[Part:LogoImage]

	Line			: empty
	Graph Type		: $Logopath:Company:#SVCurrentCompany
	;Width			: 100% Screen
	Height			: 10% Page
	;Space Left		: auto
	;Horizontal Align	: Center
	

[Part: Invoice Type]

	Line	: InvoiceTypeLn
	Border	: Thin Cover
	Width	: 100% Screen
	[Line:InvoiceTypeLn]
		Field			: InvoiceTypeFld
		Space Top		: 0.2
		Space Bottom	: 0.2
		
		[Field:InvoiceTypeFld]
			Set as		: $$Date:$$PrintDate;"Tax Invoice"
			Style		: TimesBold8
			Type		: String
			Align		: Center
			Full Width	: Yes
			

[Part:SupplierCustomerDetails]
	Parts		: SupplierDetails, CustomerDetails
	Border		: Thin Box
	Width		: 100% Page
	

;; -----------------Supplier Details--------------------
[Part:SupplierDetails]
	Line	: InvoiceNo, SupplierTitle, SupName, SupAdd1, SupAdd2, SupPhone, SupMob, SupEmail, SupGst
	Width	: 50% Page
	Border	: Thin Right
	Object		: Company
			
	[Line: InvoiceNo]
		Field			: InvoiceNoTitle,InvoiceNoBody
		Space Top		: 0.2
		Space Bottom	: 0.2
		Border			: Thin Bottom Right
		[Field:InvoiceNoTitle]
			Set as		: "Invoice No:"
			Style		: TimesBold8
			Type		: String
			
			
		[Field:InvoiceNoBody]
			Set as		: $VoucherNumber
			Style		: TimesNormal9
			Type		: String
			
	[Line:SupplierTitle]
		Field			: SupplierTitle
		Space Top		: 1
		Space Bottom	: 1
		
		[Field:SupplierTitle]
			Set as		: "Supplier/Vendor:"
			Style		: TimesBold16
			Full Width	: Yes
	
	[Line:SupName]
		Field			: SupName
		
		[Field:SupName]
			Set as		: $VchEntryMode;@@CmpMailName
			Style		: TimesBold8
			Full Width	: Yes
	
	[Line:SupAdd1]
		Field			: SupAdd1
		
		[Field:SupAdd1]
			Set as		: $$FullList:Address:$address;$Address:Company:@@CmpMailName
			Style		: TimesNormal8
			Full Width	: Yes
	
	[Line:SupAdd2]
		Field			: SupAdd2
		Space Bottom	: 1
		
		[Field:SupAdd2]
			Set as		: $PriorStateName:Company:@@CmpMailName + "-" +$Pincode:Company:@@CmpMailName 
			Style		: TimesNormal8
			Full Width	: Yes
	
	[Line:SupPhone]
		Field			: SupPhone
		
		[Field:SupPhone]
			Set as		: $PhoneNumber:Company:@@CmpMailName 
			Style		: TimesNormal8
			Full Width	: Yes

	[Line:SupMob]
		Field			: SupMob
		
		[Field:SupMob]
			Set as		: $MobileNumbers:Company:@@CmpMailName
			Style		: TimesNormal8
			Full Width	: Yes
			
	[Line:SupEmail]
		Field			: SupEmail
		
		[Field:SupEmail]
			Set as		: $Email:Company:@@CmpMailName
			Style		: TimesNormal8
			Full Width	: Yes
	
	[Line:SupGst]
		Field			: SupGst
		Space Bottom	: 1
		Space Top		: 1
		[Field:SupGst]
			Set as		: "GstIn : " + @@CMPGSTCurrRegNumber 
			Style		: TimesNormal8
			Full Width	: Yes
			Type		: String
	

;; -----------------Customer Details--------------------
	
[Part:CustomerDetails]
	Line	: DateInfo,CustomerTitle, CusName, CusAdd1, CusContactPerson, CusPhone, CusPlace, CusPincode, CusGst


	Width	: 50% Page
	[Line: DateInfo]
		Field			: DateInfoTitle,DateInfoBody
		Space Top		: 0.2
		Space Bottom	: 0.2
		Border			: Thin Bottom
		[Field:DateInfoTitle]
			Set as		: "Dated: " 
			Style		: TimesBold8
			Type		: String
			
		[Field:DateInfoBody]
			Set as		: $$String:$Date:ShortDate
			Style		: TimesNormal9
			
			
	
	[Line:CustomerTitle]
		Field			: CustomerTitle
		Space Top		: 1
		Space Bottom	: 1
		
		[Field:CustomerTitle]
			Set as		: "Customer/Client:"
			Style		: TimesBold16
			Full Width	: Yes
	
	[Line:CusName]
		Field			: CusName
		
		[Field:CusName]
			Set as		: $PartyLedgerName
			Style		: TimesBold8
			Full Width	: Yes
	
	[Line:CusAdd1]
		Field			: CusAdd1
		
		[Field:CusAdd1]
			Set as		: $$String:$PartyLedgerName+ ", " +$Address:Ledger:$PartyLedgerName
			Style		: TimesNormal8
			Full Width	: Yes
	
	[Line:CusContactPerson]
		Field			: CusContactPerson1, CusContactPerson
		Space Bottom	: 1
		
		[Field:CusContactPerson1]
			Set as		: "Contact Person -"
			Width		: 20
		[Field:CusContactPerson]
			Set as		: $LedgerContact:Ledger:$PartyLedgerName; Then $Person:Ledger:$PartyLedgerName Else "No One"
			Style		: TimesNormal8
			Full Width	: Yes
			
	
	[Line:CusPhone]
		Field			: CusPhone
		
		[Field:CusPhone]
			Set as		: "Contact : " +$LedgerMobile:Ledger:$PartyLedgerName  + ", " +$Email:Ledger:$PartyLedgerName 
			Style		: TimesNormal8
			Full Width	: Yes

	[Line:CusPlace]
		Field			: CusPlace
		
		[Field:CusPlace]
			Set as		: "Place Of Supply : "+$PriorStateName:Ledger:$PartyLedgerName  + ", State Code : " + $$getgststatecode:($LedStateName:Ledger:$PartyLedgerName )
			Style		: TimesNormal8
			Full Width	: Yes
			
	[Line:CusPincode]
		Field			: CusPincode
		
		[Field:CusPincode]
			Set as		: $Pincode:Ledger:$PartyLedgerName
			Style		: TimesNormal8
			Full Width	: Yes
	
	[Line:CusGst]
		Field			: CusGst
		Space Bottom	: 1
		Space Top		: 1
		[Field:CusGst]
			Set as		: "GstIn : " + $PartyGSTIN
			Style		: TimesNormal8
			Full Width	: Yes
			Type		: String
	
	
	
[Part:BlkPart1]
	Line	: BlankLine1
;	
;	[Line:BlkPart1]
;		Field: BlkPart1
;		[Field:BlkPart1]
;			Set as: ""

[Part:ItemDtlsTitle]
	Line	: ItemDtlsTitle
	Width	: 100% Page
	Border	: Thin Cover
	Common Borders	: Yes
	[Line:ItemDtlsTitle]
		Use		: ItemDtlsDtls
		Space Top		: 0.3
		Space Bottom	: 0.3
		Local	: Field: Default	: Style	: TimesBold9
		Local	: Field: Default	: Align	: Center
		Local	: Field: Default	: Type	: String
		
		Local	: Field	: SINoB			: Set as: "Sr."
		Local	: Field	: ParticularsB	: Set as: "Particulars"
		Local	: Field	: PartNoD		: Set as: "Part No."
		Local	: Field	: HSNB			: Set as: "HSN"
		Local	: Field	: QtyB			: Set as: "Qty"
		Local	: Field	: PriceB		: Set as: "Price"
		Local	: Field	: AmountB		: Set as: "Amount INR"
		
		;Border	: Thick Bottom
		SpaceTop: 0
		
[Part:ItemDtlsPart]
	Lines			:  ItemDtlsDtls
	Width			: 100% Page
	Border			: Thin Box
	Repeat			: ItemDtlsDtls	: Inventory Entries
	Scroll			: Vertical
	Common Borders	: Yes
		
	[Line:ItemDtlsDtls]
		Left Fields		: SINoB, ParticularsB, PartNoD
		Right Fields	: HSNB, QtyB, PriceB, AmountB
		
		Space Top	: if $$Line = 1 then 1 else 0
		[Field:SINoB]
			Width	: 5% Page
			Set as	: $$Line
			Style	: TimesNormal9
			
		[Field:ParticularsB]
			Width	: 20% Page
			Set as	: $$PrevObj:$Amount; if NOT $$IsSysName:$StockItemName then @@InvItemName else ""
			Border	: Thin Left Right
			Style	: TimesNormal9
			
		[Field:PartNoD]
			;Width	: 5% Page
			Set as	: If $$IsEmpty:@PartNo Then "" Else "("+@PartNo+")"
			PartNo	: $PartNo:Stockitem:$stockitemName
			Style	: TSPL FFE BarCode
			Align	: Center
			Full Width	: Yes
			
		[Field:HSNB]
			Width	: 10% Page
			Set as	: $GSTHSNCode:Stockitem:$stockitemName
			Border	: Thin Left Right
			Style	: TimesNormal9
			
		[Field:QtyB]
			Use		: Qty Primary Field
			Width	: 10% Page
			Set as	: $BilledQty
			Style	: TimesNormal9
			
		[Field:PriceB]
			Use     : Rate Price Field
			Width	: 10% Page
			Set as	: $Rate
			Border	: Thin Left Right
			Style	: TimesNormal9
			
		[Field:AmountB]
			Use		: Amount Forex Field
			Width	: 10% Page
			Set as	: $Amount
			Style	: TimesNormal9
			
		

[Part:ItemTotalAmtBase]
	Line	: ItemTotalAmtBase
	Width	: 100% Page
	Border	: Thin Left Right
	
	[Line:ItemTotalAmtBase]
		Right Fields	: TotalAmtT, TotalAmtBase
		
		[Field:TotalAmtT]
			Set as		: "Total = "
			Style		: TimesNormal9
			Width		: 10
			
		[Field:TotalAmtBase]
			Set as		: $$CollAmtTotal:InventoryEntries:$Amount
			Width		: 10
			Style		: TimesBold9
			

[Part:GstPercent]
	Line		: GstPercent
	Repeat		: GstPercent	: Ledger Entries
	Border		: Thin Box
	Width		: 100% Page
	
	[Line:GstPercent]
		Left Fields			: GstSr, GstName
		Right Fields		: GstRateBi, GstAmount
		[Field: GstSr]
			Set as		: " "
			;Border		: Full Thin Top Left
			Width		: 5% Page

		[Field: GstName]

			Use			: Name Field
			Set as		: $LedgerName
			Width		: 40% Page
			Align		: Right
			Border		: Thin Left
		
		
		[Field: GstRateBi]
			
			Use			: Name Field
			Set as		: ($Amount*100)/( $$CollAmtTotal:InventoryEntries:$Amount);If ##GstVAr = "Yes" Then $CGSTRATE Else $IGSTRate
			Width		: 10% Page
			Border		: Thin Left Right
			Type		: Number
			Format		: "Percentage"
			Align		: Center
				
	
		[Field: GstAmount]

			Use			: Amount Forex Field
			;Border		: Full Thin Top Left
			Set as		: $Amount
			Width		: 30% Page
			Align		: Right
			
[Part:BlkPart2]
	Line	: BlankLine1
		

[Part:BasePart]
	Parts		: NetAmtDigit, NetAmtWords, PaymentPart, BinarySoft, SignImage, Signatory
	Width		: 100% Page
	Vertical	: Yes
	Border		: Thin Box
	
[Part:NetAmtDigit]
	Line	: NetAmtDigit
	Border	: Thin Bottom
	Width	: 100% Page
	
	[Line:NetAmtDigit]
		Right Fields	: NetAmtDigitT, NetAmtDigitB
		[Field:NetAmtDigitT]
			Use			: TotalAmtT
			Set as		: "Net Amount "
			Style		: TimesNormal9

		[Field:NetAmtDigitB]
			Use			: TotalAmtBase
			Set as		: $Amount
			Style		: TimesBold9
			
[Part:NetAmtWords]
	Line	: NetAmtWords
	Border	: Thin Bottom
	Width	: 100% Page
	[Line:NetAmtWords]
		Right Field	: Netinwords
		;Right Fields	: NetAmtWordsT, NetAmtWordsB
		[Field:NetAmtWordsT]
			Align		: Right
			Set as		: "Amount Chargeable (in words): "
			Style		: TimesNormal9
			
		[Field:NetAmtWordsB]
			Align		: Right
			Set as		: $$InWords:$Amount
			Style		: TimesNormal9
			;Full Width	: Yes
			
		[Field:Netinwords]
			Width	: 100% Page
			Set as	: @Title1+@Amount
			Title1	: "Amount Chargeable (in words): "
			Amount	: $$InWords:$Amount
			Align	: Right
			Style		: TimesNormal9

[Part:PaymentPart]
	Width			: 96% Page
	;Border			: Thin Top Left Bottom
	Space Left		: 4% Page
	Space Top		: 3
	Space Bottom	: 3
	Parts			: PaymentT,PaymentB,PaymentRemarks
	Vertical		: Yes
	
[Part:PaymentT]
	Line	: PaymentT
	
	[Line:PaymentT]
		Right Fields	: PaymentTDtls, PaymentTMode, PaymentTDate, PaymentTAmt
		Border			: Thin Top Left
		[Field:PaymentTDtls]
			Style	: TimesBold9
			Set as	: "Payment Details"
			Align	: Center
			Width	: 24% Page
			
			
		[Field:PaymentTMode]
			Style	: TimesBold9
			Set as	: "Payment Mode"
			Align	: Center
			Width	: 24% Page
			Border	: Thin Left Right
			
		[Field:PaymentTDate]
			Style	: TimesBold9
			Set as	: "Payment Date"
			Align	: Center
			Width	: 24% Page
			Border	: Thin Right
			
		[Field:PaymentTAmt]
			Style	: TimesBold9
			Set as	: "Amount INR"
			Align	: Center
			Width	: 24% Page
			
[Part:PaymentB]
	Line	: PaymentB
	
	[Line:PaymentB]
		
		Right Fields	: PaymentBDtls, PaymentBMode, PaymentBDate, PaymentBAmt
		Border	: Thin Top Left
		[Field:PaymentBDtls]
			Style	: TimesNormal8
			Set as	: $PaymentDetails
			Align	: Center
			Width	: 24% Page
			

		[Field:PaymentBMode]
			Style	: TimesNormal8
			Set as	: $PaymentMode
			Align	: Center
			Width	: 24% Page
			Border	: Thin Left Right
			
		[Field:PaymentBDate]
			Style	: TimesNormal8
			Set as	: $$String:$PaymentDate
			Align	: Center
			Width	: 24% Page
			Border	: Thin Right
			
		[Field:PaymentBAmt]
			Style	: TimesNormal8
			Set as	: $PaymentAmount
			Align	: Center
			Width	: 24% Page
			
[Part:PaymentRemarks]
	Line:PaymentRemarks
	
	[Line:PaymentRemarks]
		Field:Medium Prompt, PaymentRemarks
		Border	: Thin Top Left Bottom
		Local	: Field	: Medium Prompt		: Info	: $$LocaleString:"Payment Remarks  "
		Local	: Field	: Medium Prompt		: Style	: TimesBold9
		[Field:PaymentRemarks]
			Set as		: @Remark
			Remark		: $PaymentRemarks
			Style		: TimesNormal9
			Full Width	: Yes
			Lines		: 0
		
		

[Part:BinarySoft]
	;Use		: VCH GST AnalysisDetails
	
;[#Part: VCH GST AnalysisDetailsActual]
;	Repeat			: GST VCHGSTInvPrintBody	 : GSTAnalysisPrintSummary
	Line	: BinarySoft;, TAxPayment
	;Repeat	: Taxpayment		: GSTAnalysisPrintSummary
	Width		: 100% Page
	[Line:BinarySoft]
		Field:BinarySoft
		[Field:BinarySoft]
			Set as	: "For Binarysoft"
			Style	: TimesBold9
			Full Width: Yes
		


[Line:TAxPayment]
	Field	: TAxPayment
	[Field:TAxPayment]
		Use		: VCHGSTInvPrint IGSTRate
;[Part:SignImage]
;	Line 		: Empty
;	Image		: SignImage1
;	;Vertical Align:Right
;	Height		: 10 mms
;	Width		: 100% Page

	
[Part:Signatory]
	Line	: Signatory
	Width		: 100% Page
	[Line:Signatory]
		Field:Signatory
		[Field:Signatory]
			Set as	: "Authorised Signatory"
			Style	: TimesNormal9
			Full Width: Yes
		



[Part: Global Invoice Bottom Tirlok]
	Lines		: Bottom Part
	Width		: 100% Page
	[Line:Bottom Part]
		Field		: Bottom Part
		Space Top	: 1
		[Field:Bottom Part]
			Fields		: BottomFld1,BottomFld2
			Align		: Center
			Full Width	: Yes
			[Field:BottomFld1]
				Set as	: "Note : "
				Style	: TimesBold9
				Print FG	: Red
				Width		: 5
			[Field:BottomFld2]
				Set as	: "Normal processing time for your Order is 2-4 Hrs. Incase of Holidays, Your order will be processed on the next business day"
				
				Style	: TimesNormal9
				Width	: 110




[Part: SignImage]
	Part		: Empty		
	Option	    : SignImage2	: ##DigitalSignEnable
	Height		: If ##DigitalSignEnable Then 0 Else 3
		
[Part:HElloDigi]
	Line		: HElloDigi
	
	[Line:HElloDigi]
		Field		: HElloDigi
		
		[Field:HElloDigi]
			Set as		: @FullPath;"Hello"
			FullPath	: @Path1+"\"+@File
			Path1		: #SADigitalSignPathPopUp
			File		: ##SADigitalFileName
		
[!Part:SignImage2]
					Part		: SignImage1, Empty
					Vertical	: Yes
				 	;Invisible	: ($$InExportMode AND @@IsExcelFormat) OR ##SvPreprinted OR NOT ($IsSales OR $IsDebitNote OR $IsCreditNote OR $IsDelNote OR $IsReceipt OR $IsPurcOrder OR $IsSalesOrder OR $IsOutSourceOrder OR $IsJobWorkOrder OR $IsMaterialIn OR $IsMaterialOut) OR NOT @@EcoIsLogoEnabled
					
[Part: SignImage1]
		
		Lines		: SignImage
		
		FullPath	: @Path1+"\"+@File
		Path1		: ##vCurrentPath
		File		: ##SADigitalFileName
		Graph Type	: ##vCurrentPath+"\"+##SADigitalFileName;@FullPath;;$DigitalSignFullPath:Company:##SVCurrentCompany
		Height		: 4;If ((NOT $$InPrintMode) AND ($$InExportAction OR $$InMailAction OR $$InWhatsAppAction)) Then 15% Else 8% Page
		;Width		: 15% Page
		Invisible	: If $$InPrintMode OR $$InMailAction OR $$InWhatsAppAction OR ($$InExportMode And $$IsSysNameEqual:HTML:##SVExportFormat) then No Else Yes
		
		[Line: SignImage]
			
			Field	: EXPINV Logo



[Style: TimesBold8]
	Font Name	: "Times New Roman"
	Height		: 8
	Bold		: Yes
	
[Style: TimesBold9]
	Font Name	: "Times New Roman"
	Height		: 9
	Bold		: Yes
	
[Style: TimesBold16]
	Font Name	: "Times New Roman"
	Height		: 16
	Bold		: Yes

[Style: TimesNormal9]
	Font Name	: "Times New Roman"
	Height		: 9

[Style: TimesNormal8]
	Font Name	: "Times New Roman"
	Height		: 8
	
[Style: TSPL FFE BarCode]
	Font 	: IDAutomationHC39S
	Height 	: 15
	
[Line	: BlankLine1]
	Field		: Simple Field
	Height		: 1
	
[Resource : SignImage1]
	Source :'C:\Program Files\TallyPrime (1)\Sign.bmp'
	Resource Type: Bmp
	Resource :'TITLEICON'
*/

;; End-of-File

[#Form: Comprehensive Invoice]

	Option: Global Invoice    : @@IsSales 
	;Width	: 100% Page

[#Form: Simple Printed Invoice]

	Option: Global Invoice    : @@IsSales  
	;Width	: 100% Page
	
[!Form : Global Invoice]

	Delete  	: Parts
	Delete	    : Bottom Parts
	Delete	    : PageBreak
	Space Top	: 0.2 Inch
 	Space Right	: 0.2 Inch
	Space Left	: 0.2 Inch
	Space Bottom: 0.2 Inch
	
	add			:Parts			: STD Invoice Top,GI OpPgBrk, ItemDtlsPart, 
	add			:Bottom Parts	: ItemTotalAmtBase, GstPercent, BlkPart2, BasePart,Global Invoice Bottom Tirlok

	;add			:Page Break		: GI ClPgBrk, GI OpPgBrk
	Full Height	: Yes
	Full Width	: Yes
	
	;Print BG	: Yellow
	

[Part: GI ClPgBrk]

	Lines		: GI ClPgBrk

	[Line: GI ClPgBrk]

		Fields		: Simple Field
		Local		: Field			: Simple Field	: Set As	: "Continued..."
		Local		: Field			: Simple Field	: FullWidth	: Yes
		Local		: Field			: Simple Field	: Align		: Right
		Border		: Full Thin Top

[Part: GI OpPgBrk]

	Parts		: Logo Invoice,  Invoice Type, SupplierCustomerDetails,BlkPart1,ItemDtlsTitle
	Vertical	: Yes
	;Width		: 7.27 Inch
	;Print BG	: Red
	


[Part: Logo Invoice]
	Part		: LogoImage
	Width		: 100% Page
	Border			: Thin Cover
	Horizontal Align	: Center
[Part:LogoImage]

	Line			: empty
	Graph Type		: $Logopath:Company:#SVCurrentCompany
	;Width			: 100% Screen
	Height			: 10% Page
	;Space Left		: auto
	;Horizontal Align	: Center
	

[Part: Invoice Type]

	Line	: InvoiceTypeLn
	Border	: Thin Cover
	Width	: 100% Screen
	[Line:InvoiceTypeLn]
		Field			: InvoiceTypeFld
		Space Top		: 0.2
		Space Bottom	: 0.2
		
		[Field:InvoiceTypeFld]
			Set as		: $$Date:$$PrintDate;"Tax Invoice"
			Style		: TimesBold8
			Type		: String
			Align		: Center
			Full Width	: Yes
			

[Part:SupplierCustomerDetails]
	Parts		: SupplierDetails, CustomerDetails
	Border		: Thin Box
	Width		: 100% Page
	

;; -----------------Supplier Details--------------------
[Part:SupplierDetails]
	Line	: InvoiceNo, SupplierTitle, SupName, SupAdd1, SupAdd2, SupPhone, SupMob, SupEmail, SupGst
	Width	: 50% Page
	Border	: Thin Right
	Object		: Company
			
	[Line: InvoiceNo]
		Field			: InvoiceNoTitle,InvoiceNoBody
		Space Top		: 0.2
		Space Bottom	: 0.2
		Border			: Thin Bottom Right
		[Field:InvoiceNoTitle]
			Set as		: "Invoice No:"
			Style		: TimesBold8
			Type		: String
			
			
		[Field:InvoiceNoBody]
			Set as		: $VoucherNumber
			Style		: TimesNormal9
			Type		: String
			
	[Line:SupplierTitle]
		Field			: SupplierTitle
		Space Top		: 1
		Space Bottom	: 1
		
		[Field:SupplierTitle]
			Set as		: "Supplier/Vendor:"
			Style		: TimesBold16
			Full Width	: Yes
	
	[Line:SupName]
		Field			: SupName
		
		[Field:SupName]
			Set as		: $VchEntryMode;@@CmpMailName
			Style		: TimesBold8
			Full Width	: Yes
	
	[Line:SupAdd1]
		Field			: SupAdd1
		
		[Field:SupAdd1]
			Set as		: $$FullList:Address:$address;$Address:Company:@@CmpMailName
			Style		: TimesNormal8
			Full Width	: Yes
	
	[Line:SupAdd2]
		Field			: SupAdd2
		Space Bottom	: 1
		
		[Field:SupAdd2]
			Set as		: $PriorStateName:Company:@@CmpMailName + "-" +$Pincode:Company:@@CmpMailName 
			Style		: TimesNormal8
			Full Width	: Yes
	
	[Line:SupPhone]
		Field			: SupPhone
		
		[Field:SupPhone]
			Set as		: $PhoneNumber:Company:@@CmpMailName 
			Style		: TimesNormal8
			Full Width	: Yes

	[Line:SupMob]
		Field			: SupMob
		
		[Field:SupMob]
			Set as		: $MobileNumbers:Company:@@CmpMailName
			Style		: TimesNormal8
			Full Width	: Yes
			
	[Line:SupEmail]
		Field			: SupEmail
		
		[Field:SupEmail]
			Set as		: $Email:Company:@@CmpMailName
			Style		: TimesNormal8
			Full Width	: Yes
	
	[Line:SupGst]
		Field			: SupGst
		Space Bottom	: 1
		Space Top		: 1
		[Field:SupGst]
			Set as		: "GstIn : " + @@CMPGSTCurrRegNumber 
			Style		: TimesNormal8
			Full Width	: Yes
			Type		: String
	

;; -----------------Customer Details--------------------
	
[Part:CustomerDetails]
	Line	: DateInfo,CustomerTitle, CusName, CusAdd1, CusContactPerson, CusPhone, CusPlace, CusPincode, CusGst


	Width	: 50% Page
	[Line: DateInfo]
		Field			: DateInfoTitle,DateInfoBody
		Space Top		: 0.2
		Space Bottom	: 0.2
		Border			: Thin Bottom
		[Field:DateInfoTitle]
			Set as		: "Dated: " 
			Style		: TimesBold8
			Type		: String
			
		[Field:DateInfoBody]
			Set as		: $$String:$Date:ShortDate
			Style		: TimesNormal9
			
			
	
	[Line:CustomerTitle]
		Field			: CustomerTitle
		Space Top		: 1
		Space Bottom	: 1
		
		[Field:CustomerTitle]
			Set as		: "Customer/Client:"
			Style		: TimesBold16
			Full Width	: Yes
	
	[Line:CusName]
		Field			: CusName
		
		[Field:CusName]
			Set as		: $PartyLedgerName
			Style		: TimesBold8
			Full Width	: Yes
	
	[Line:CusAdd1]
		Field			: CusAdd1
		
		[Field:CusAdd1]
			Set as		: $$String:$PartyLedgerName+ ", " +$Address:Ledger:$PartyLedgerName
			Style		: TimesNormal8
			Full Width	: Yes
	
	[Line:CusContactPerson]
		Field			: CusContactPerson1, CusContactPerson
		Space Bottom	: 1
		
		[Field:CusContactPerson1]
			Set as		: "Contact Person -"
			Width		: 20
		[Field:CusContactPerson]
			Set as		: $LedgerContact:Ledger:$PartyLedgerName; Then $Person:Ledger:$PartyLedgerName Else "No One"
			Style		: TimesNormal8
			Full Width	: Yes
			
	
	[Line:CusPhone]
		Field			: CusPhone
		
		[Field:CusPhone]
			Set as		: "Contact : " +$LedgerMobile:Ledger:$PartyLedgerName  + ", " +$Email:Ledger:$PartyLedgerName 
			Style		: TimesNormal8
			Full Width	: Yes

	[Line:CusPlace]
		Field			: CusPlace
		
		[Field:CusPlace]
			Set as		: "Place Of Supply : "+$PriorStateName:Ledger:$PartyLedgerName  + ", State Code : " + $$getgststatecode:($LedStateName:Ledger:$PartyLedgerName )
			Style		: TimesNormal8
			Full Width	: Yes
			
	[Line:CusPincode]
		Field			: CusPincode
		
		[Field:CusPincode]
			Set as		: $Pincode:Ledger:$PartyLedgerName
			Style		: TimesNormal8
			Full Width	: Yes
			Print BG	: Red
	
	[Line:CusGst]
		Field			: CusGst
		Space Bottom	: 1
		Space Top		: 1
		[Field:CusGst]
			Set as		: "GstIn : " + $PartyGSTIN
			Style		: TimesNormal8
			Full Width	: Yes
			Type		: String
	
	
	
[Part:BlkPart1]
	Line	: BlankLine1
;	
;	[Line:BlkPart1]
;		Field: BlkPart1
;		[Field:BlkPart1]
;			Set as: ""

[Part:ItemDtlsTitle]
	Line	: ItemDtlsTitle
	Width	: 100% Page
	Border	: Thin Cover
	Common Borders	: Yes
	[Line:ItemDtlsTitle]
		Use		: ItemDtlsDtls
		Space Top		: 0.3
		Space Bottom	: 0.3
		Local	: Field: Default	: Style	: TimesBold9
		Local	: Field: Default	: Align	: Center
		Local	: Field: Default	: Type	: String
		
		Local	: Field	: SINoB			: Set as: "Sr."
		Local	: Field	: ParticularsB	: Set as: "Particulars"
		Local	: Field	: PartNoD		: Set as: "Part No."
		Local	: Field	: HSNB			: Set as: "HSN"
		Local	: Field	: QtyB			: Set as: "Qty"
		Local	: Field	: PriceB		: Set as: "Price"
		Local	: Field	: AmountB		: Set as: "Amount INR"
		
		;Border	: Thick Bottom
		SpaceTop: 0
		
[Part:ItemDtlsPart]
	Lines			:  ItemDtlsDtls
	Width			: 100% Page
	Border			: Thin Box
	Repeat			: ItemDtlsDtls	: Inventory Entries
	Scroll			: Vertical
	Common Borders	: Yes
		
	[Line:ItemDtlsDtls]
		Left Fields		: SINoB, ParticularsB, PartNoD
		Right Fields	: HSNB, QtyB, PriceB, AmountB
		
		Space Top	: if $$Line = 1 then 1 else 0
		[Field:SINoB]
			Width	: 5% Page
			Set as	: $$Line
			Style	: TimesNormal9
			
		[Field:ParticularsB]
			Width	: 20% Page
			Set as	: if NOT $$IsSysName:$StockItemName then @@InvItemName else ""
			Border	: Thin Left Right
			Style	: TimesNormal9
			
		[Field:PartNoD]
			;Width	: 5% Page
			Set as	: If $$IsEmpty:@PartNo Then "" Else "("+@PartNo+")" ; "*"+@PartNo+"*";
			PartNo	: $PartNo:Stockitem:$stockitemName
			Style	: TSPL FFE BarCode
			Align	: Center
			Full Width	: Yes
			
		[Field:HSNB]
			Width	: 10% Page
			Set as	: $(StockItem,$Name).GstDetails[Last].StateWiseDetails[1].RateDetails[1].GSTRate;$GSTHSNCode:Stockitem:$stockitemName
			Border	: Thin Left Right
			Style	: TimesNormal9
			
		[Field:QtyB]
			Use		: Qty Primary Field
			Width	: 10% Page
			Set as	: $BilledQty
			Style	: TimesNormal9
			
		[Field:PriceB]
			Use     : Rate Price Field
			Width	: 10% Page
			Set as	: $Rate
			Border	: Thin Left Right
			Style	: TimesNormal9
			
		[Field:AmountB]
			Use		: Amount Forex Field
			Width	: 10% Page
			Set as	: $Amount
			Style	: TimesNormal9
			
		

[Part:ItemTotalAmtBase]
	Line	: ItemTotalAmtBase
	Width	: 100% Page
	Border	: Thin Left Right
	
	[Line:ItemTotalAmtBase]
		Right Fields	: TotalAmtT, TotalAmtBase
		
		[Field:TotalAmtT]
			Set as		: "Total = "
			Style		: TimesNormal9
			Width		: 10
			
		[Field:TotalAmtBase]
			Set as		: $$CollAmtTotal:InventoryEntries:$Amount
			Width		: 10
			Style		: TimesBold9
			

[Part:GstPercent]
	Line		: GstPercent
	Repeat		: GstPercent	: Ledger Entries
	Border		: Thin Box
	Width		: 100% Page
	
	[Line:GstPercent]
		Left Fields			: GstSr, GstName
		Right Fields		: GstRateBi, GstAmount
		[Field: GstSr]
			Set as		: " "
			;Border		: Full Thin Top Left
			Width		: 5% Page

		[Field: GstName]

			Use			: Name Field
			Set as		: $LedgerName
			Width		: 40% Page
			Align		: Right
			Border		: Thin Left
		
		
		[Field: GstRateBi]
			
			Use			: Name Field
			Set as		: ($Amount*100)/( $$CollAmtTotal:InventoryEntries:$Amount);If ##GstVAr = "Yes" Then $CGSTRATE Else $IGSTRate
			Width		: 10% Page
			Border		: Thin Left Right
			Type		: Number
			Format		: "Percentage"
			Align		: Center
				
	
		[Field: GstAmount]

			Use			: Amount Forex Field
			;Border		: Full Thin Top Left
			Set as		: $Amount
			Width		: 30% Page
			Align		: Right
			
[Part:BlkPart2]
	;Line	: BlankLine1
	Line	: LedgersEntry
	Repeat	: LedgersEntry		: All Ledger Entries
	[Line:LedgersEntry]
		Field		: LedgersEntry
		[Field:LedgersEntry]
			Set as		: $$Name

[Part:BasePart]
	Parts		: NetAmtDigit, NetAmtWords, PaymentPart, BinarySoft, SignImage, Signatory
	Width		: 100% Page
	Vertical	: Yes
	Border		: Thin Box
	Space Top	: 3
	
[Part:NetAmtDigit]
	Line	: NetAmtDigit
	Border	: Thin Bottom
	Width	: 100% Page
	
	[Line:NetAmtDigit]
		Right Fields	: NetAmtDigitT, NetAmtDigitB
		[Field:NetAmtDigitT]
			Use			: TotalAmtT
			Set as		: "Net Amount "
			Style		: TimesNormal9

		[Field:NetAmtDigitB]
			Use			: TotalAmtBase
			Set as		: $Amount
			Style		: TimesBold9
			
[Part:NetAmtWords]
	Line	: NetAmtWords
	Border	: Thin Bottom
	Width	: 100% Page
	[Line:NetAmtWords]
		Right Field	: Netinwords
		;Right Fields	: NetAmtWordsT, NetAmtWordsB
		[Field:NetAmtWordsT]
			Align		: Right
			Set as		: "Amount Chargeable (in words): "
			Style		: TimesNormal9
			
		[Field:NetAmtWordsB]
			Align		: Right
			Set as		: $$InWords:$Amount
			Style		: TimesNormal9
			;Full Width	: Yes
			
		[Field:Netinwords]
			Width	: 100% Page
			Set as	: @Title1+@Amount
			Title1	: "Amount Chargeable (in words): "
			Amount	: $$InWords:$Amount
			Align	: Right
			Style		: TimesNormal9

[Part:PaymentPart]
	Width			: 96% Page
	;Border			: Thin Top Left Bottom
	Space Left		: 4% Page
	Space Top		: 3
	Space Bottom	: 3
	Parts			: PaymentT,PaymentB,PaymentRemarks
	Vertical		: Yes
	
[Part:PaymentT]
	Line	: PaymentT
	
	[Line:PaymentT]
		Right Fields	: PaymentTDtls, PaymentTMode, PaymentTDate, PaymentTAmt
		Border			: Thin Top Left
		[Field:PaymentTDtls]
			Style	: TimesBold9
			Set as	: "Payment Details"
			Align	: Center
			Width	: 24% Page
			
			
		[Field:PaymentTMode]
			Style	: TimesBold9
			Set as	: "Payment Mode"
			Align	: Center
			Width	: 24% Page
			Border	: Thin Left Right
			
		[Field:PaymentTDate]
			Style	: TimesBold9
			Set as	: "Payment Date"
			Align	: Center
			Width	: 24% Page
			Border	: Thin Right
			
		[Field:PaymentTAmt]
			Style	: TimesBold9
			Set as	: "Amount INR"
			Align	: Center
			Width	: 24% Page
			
[Part:PaymentB]
	Line	: PaymentB
	
	[Line:PaymentB]
		
		Right Fields	: PaymentBDtls, PaymentBMode, PaymentBDate, PaymentBAmt
		Border	: Thin Top Left
		[Field:PaymentBDtls]
			Style	: TimesNormal8
			Set as	: $PaymentDetails
			Align	: Center
			Width	: 24% Page
			

		[Field:PaymentBMode]
			Style	: TimesNormal8
			Set as	: $PaymentMode
			Align	: Center
			Width	: 24% Page
			Border	: Thin Left Right
			
		[Field:PaymentBDate]
			Style	: TimesNormal8
			Set as	: $$String:$PaymentDate
			Align	: Center
			Width	: 24% Page
			Border	: Thin Right
			
		[Field:PaymentBAmt]
			Style	: TimesNormal8
			Set as	: $PaymentAmount
			Align	: Center
			Width	: 24% Page
			
[Part:PaymentRemarks]
	Line:PaymentRemarks
	
	[Line:PaymentRemarks]
		Field:Medium Prompt, PaymentRemarks
		Border	: Thin Top Left Bottom
		Local	: Field	: Medium Prompt		: Info	: $$LocaleString:"Payment Remarks  "
		Local	: Field	: Medium Prompt		: Style	: TimesBold9
		[Field:PaymentRemarks]
			Set as		: @Remark
			Remark		: $PaymentRemarks
			Style		: TimesNormal9
			Full Width	: Yes
			Lines		: 0
		
		

[Part:BinarySoft]
	;Use		: VCH GST AnalysisDetails
	
;[#Part: VCH GST AnalysisDetailsActual]
;	Repeat			: GST VCHGSTInvPrintBody	 : GSTAnalysisPrintSummary
	Line	: BinarySoft;, TAxPayment
	;Repeat	: Taxpayment		: GSTAnalysisPrintSummary
	Width		: 100% Page
	[Line:BinarySoft]
		Field:BinarySoft
		[Field:BinarySoft]
			Set as	: "For Binarysoft"
			Style	: TimesBold9
			Full Width: Yes
		

[Collection: GSTAnalysisPrintSummary1]

	Source Collection	: GST Invoice TaxAnalysisIESrc, GST Invoice TaxAnalysisLESrc

    Compute Var	: GSTItemLedRate	: String		: $$Sprintf:"%s~%s~%s~%s~%s":$CGSTRate:$SGSTRate:$IGSTRate:$CessGSTRate:$CessGSTRatePerUnit
 
    By           : GSTInvoice_ItemHSNCode			: $ComputedHSNCode
    By           : GSTInvoice_ItemLedRate   		: ##GSTItemLedRate
 
[Line:TAxPayment]
	Field	: TAxPayment
	[Field:TAxPayment]
		Set as	:$$String:$GSTInvoice_IGSTClsfnRate    + $$String:$GSTInvoice_IGSTClsTaxAmt; 
		

;[Part:SignImage]
;	Line 		: Empty
;	Image		: SignImage1
;	;Vertical Align:Right
;	Height		: 10 mms
;	Width		: 100% Page

	
[Part:Signatory]
	Line	: Signatory
	Width		: 100% Page
	[Line:Signatory]
		Field:Signatory
		[Field:Signatory]
			Set as	: "Authorised Signatory"
			Style	: TimesNormal9
			Full Width: Yes
		



[Part: Global Invoice Bottom Tirlok]
	Lines		: Bottom Part
	Width		: 100% Page
	[Line:Bottom Part]
		Field		: Bottom Part
		Space Top	: 1
		[Field:Bottom Part]
			Fields		: BottomFld1,BottomFld2
			Align		: Center
			Full Width	: Yes
			[Field:BottomFld1]
				Set as	: "Note : "
				Style	: TimesBold9
				Print FG	: Red
				Width		: 5
			[Field:BottomFld2]
				Set as	: "Normal processing time for your Order is 2-4 Hrs. Incase of Holidays, Your order will be processed on the next business day"
				
				Style	: TimesNormal9
				Width	: 110




[Part: SignImage]
	Part		: Empty		
	Option	    : SignImage2	: ##DigitalSignEnable
	Height		: If ##DigitalSignEnable Then 0 Else 3
		
[Part:HElloDigi]
	Line		: HElloDigi
	
	[Line:HElloDigi]
		Field		: HElloDigi
		
		[Field:HElloDigi]
			Set as		: @FullPath;"Hello"
			FullPath	: @Path1+"\"+@File
			Path1		: #SADigitalSignPathPopUp
			File		: ##SADigitalFileName
		
[!Part:SignImage2]
					Part		: SignImage1, Empty
					Vertical	: Yes
				 	;Invisible	: ($$InExportMode AND @@IsExcelFormat) OR ##SvPreprinted OR NOT ($IsSales OR $IsDebitNote OR $IsCreditNote OR $IsDelNote OR $IsReceipt OR $IsPurcOrder OR $IsSalesOrder OR $IsOutSourceOrder OR $IsJobWorkOrder OR $IsMaterialIn OR $IsMaterialOut) OR NOT @@EcoIsLogoEnabled
					
[Part: SignImage1]
		
		Lines		: SignImage
		
		FullPath	: @Path1+"\"+@File
		Path1		: ##vCurrentPath
		File		: ##SADigitalFileName
		Graph Type	: ##vCurrentPath+"\"+##SADigitalFileName;@FullPath;;$DigitalSignFullPath:Company:##SVCurrentCompany
		Height		: 4;If ((NOT $$InPrintMode) AND ($$InExportAction OR $$InMailAction OR $$InWhatsAppAction)) Then 15% Else 8% Page
		;Width		: 15% Page
		Invisible	: If $$InPrintMode OR $$InMailAction OR $$InWhatsAppAction OR ($$InExportMode And $$IsSysNameEqual:HTML:##SVExportFormat) then No Else Yes
		
		[Line: SignImage]
			
			Field	: EXPINV Logo



[Style: TimesBold8]
	Font Name	: "Times New Roman"
	Height		: 8
	Bold		: Yes
	
[Style: TimesBold9]
	Font Name	: "Times New Roman"
	Height		: 9
	Bold		: Yes
	
[Style: TimesBold16]
	Font Name	: "Times New Roman"
	Height		: 16
	Bold		: Yes

[Style: TimesNormal9]
	Font Name	: "Times New Roman"
	Height		: 9

[Style: TimesNormal8]
	Font Name	: "Times New Roman"
	Height		: 8
	
[Style: TSPL FFE BarCode]
	Font 	: IDAutomationHC39S ; Libre Barcode 39  ; 
	Height 	: 15
	
[Line	: BlankLine1]
	Field		: Simple Field
	Height		: 1
	
[Resource : SignImage1]
	Source :'C:\Program Files\TallyPrime (1)\Sign.bmp'
	Resource Type: Bmp
	Resource :'TITLEICON'

;; End-of-File






```
