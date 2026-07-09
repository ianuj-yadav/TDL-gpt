---
title: Local Print
type: sample_code
objects: Report, Part, Line, Field
source: Local Print.txt
---

# Local Print

## Source Code

```tdl
[#Form: Comprehensive Invoice]

	Option: Global Invoice    : @@IsSales 

[#Form: Simple Printed Invoice]

	Option: Global Invoice    : @@IsSales  
	
[!Form : Global Invoice]

	Delete  	: Parts
	Delete	    : Bottom Parts
	Delete	    : PageBreak
	Space Top	: 3
 	Space Right	: 1
	Space Bottom: 1
	Space Left	: 2
	
	add			:Parts			: STD Invoice Top,GI OpPgBrk, ItemDtlsPart
	add			:Bottom Parts	: Global Invoice Bottom Tirlok

	add			:Page Break		: GI ClPgBrk, GI OpPgBrk
	
;	Full Height	: Yes
;	Full Width	: Yes
	;Print BG	: Yellow
	

[Part: GI ClPgBrk]

	Lines		: GI ClPgBrk
	
	[Line: GI ClPgBrk]

		Fields		: Simple Field
		Local		: Field			: Simple Field	: Set As	: "Continue...."; + $$PageNo+1
		Local		: Field			: Simple Field	: FullWidth	: Yes
		Local		: Field			: Simple Field	: Align		: Right
		

[Part: GI OpPgBrk]

	Parts		: Logo Invoice,  Invoice Type, SupplierCustomerDetails, BlkPart1, ItemDtlsTitle
	Vertical	: Yes


[Part: Logo Invoice]
	Part			: Logo Invoice1
	Height			: 1.3 Inch
	;Border			: Thin Box
	
	
[Part:Logo Invoice1]

	Line			: empty
	Graph Type		: If ##LogoEnable Then ##MyLogoPath Else "";
	Width			: 11.0 Inch
	Height			: 1.3 Inch
	Space Left		: 3.5 Inch
	Border			: Thin Cover

[Part: Invoice Type]

	Line	: InvoiceTypeLn
	Border	: Thin Cover
	Width	: 11.0 Inch
	[Line:InvoiceTypeLn]
		Field			: InvoiceTypeFld
		Space Top		: 0.2
		Space Bottom	: 0.2
		
		[Field:InvoiceTypeFld]
			Set as		: "Tax Invoice"
			Style		: TimesBold8
			Type		: String
			Align		: Center
			Full Width	: Yes
			

[Part:SupplierCustomerDetails]
	Parts		: SupplierDetails, CustomerDetails
	Border		: Thin Box
	Width		: 11.0 Inch
	

;; -----------------Supplier Details--------------------
[Part:SupplierDetails]
	Line	: InvoiceNo, SupplierTitle, SupName, SupAdd1, SupAdd2, SupPhone, SupMob, SupEmail, SupGst
	Width	: 5.5 Inch
	Border	: Thin Right
	[Line: InvoiceNo]
		Field			: InvoiceNoTitle
		Space Top		: 0.2
		Space Bottom	: 0.2
		Border			: Thin Bottom Right
		
		[Field:InvoiceNoTitle]
			Set as		: "Invoice No:" +$VoucherNumber
			Style		: TimesBold8
			Type		: String
			Full Width	: Yes
			
			
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
			Set as		: @@CmpMailName
			Style		: TimesBold8
			Full Width	: Yes
			DMPMode		: 'Underline'
	
	[Line:SupAdd1]
		Field			: SupAdd1
		
		[Field:SupAdd1]
			Set as		: $Address:Company:@@CmpMailName
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
			DMPMode		: 'Bold'

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

	Set:PincodeLEd:$Pincode:Ledger:$PartyLedgerName
	Width	: 5.5 Inch
	[Line: DateInfo]
		Field			: DateInfoTitle
		Space Top		: 0.2
		Space Bottom	: 0.2
		Border			: Thin Bottom
		[Field:DateInfoTitle]
			Set as		: "Dated: " + $$String:$Date:ShortDate
			Style		: TimesBold8
			Type		: String
			Full Width	: Yes
			

			
	
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
		Field			: CusAdd1,SD Address
		
		[Field:CusAdd1]
			Set as		: $$String:$PartyLedgerName+ ", " +$Address:Ledger:$PartyLedgerName
			Style		: TimesNormal8
			Full Width	: Yes
			
		[Field : SD Address]
			
			;Set as : $$FullList:Address:$Address+ , +$StateName:Ledger:$PartyLedgerName +, +$PinCode:Ledger:$PartyLedgerName
			Style : Normal
			Border : Thin Left
			Full Width : Yes
	
	[Line:CusContactPerson]
		Field			: CusContactPerson1
		Space Bottom	: 1
		
		[Field:CusContactPerson1]
			Set as		: "Contact Person -" +$LedgerContact:Ledger:$PartyLedgerName
			Full Width	: Yes
			Style		: TimesNormal8
			
	
	[Line:CusPhone]
		Field			: CusPhone
		
		[Field:CusPhone]
			Set as		: "Contact : " +$LedgerMobile:Ledger:$PartyLedgerName  + " ,Email :  +
			" +$Email:Ledger:$PartyLedgerName 
			Style		: TimesNormal8
			Full Width	: Yes

	[Line:CusPlace]
		Field			: CusPlace
		
		[Field:CusPlace]
			Set as		: "Place Of Supply : "+$PriorStateName:Ledger:$PartyLedgerName  + ", State Code :+
			" + $$getgststatecode:($LedStateName:Ledger:$PartyLedgerName )
			Style		: TimesNormal8
			Full Width	: Yes
			
	[Line:CusPincode]
		Field			: CusPincodeT,CusPincodeB
		
		[Field:CusPincodeT]
			Set as		: "Pincode : "
			Style		: TimesNormal8
			Width		: 7
			
			
		[Field:CusPincodeB]
			Set as		: $Pincode:Ledger:$PartyLedgerName ;$LedMailingAddress[1].Pincode:Ledger:$PartyLedgerName;
			Style		: TimesNormal8
			Width		: 6
			
	
	
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
	Width	: 11.0 Inch
	Border	: Thin Cover
	Common Borders	: Yes
	[Line:ItemDtlsTitle]
		Use		: ItemDtlsDtls
		Space Top		: 0.3
		Space Bottom	: 0.3
		Local	: Field: Default		: Style	: TimesBold9
		Local	: Field: Default		: Align	: Center
		Local	: Field: Default		: Type	: String
		
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
	Parts			: ItemDtlsDtls
	
[Part:ItemDtlsDtls]
	Line			: ItemDtlsDtls
	Width			: 11.0 Inch
	Border			: Thin Box
	Repeat			: ItemDtlsDtls	: Inventory Entries
	Scroll			: Vertical
	Common Borders	: Yes
		
	[Line:ItemDtlsDtls]
		Left Fields		: SINoB, ParticularsB, PartNoD
		Right Fields	: HSNB, QtyB, PriceB, AmountB
		
		Space Top	: if $$Line = 1 then 1 else 0
		[Field:SINoB]
			Width	: 0.5 Inch
			Set as	: $$Line
			Style	: TimesNormal9
			
		[Field:ParticularsB]
			Width	: 2.25 Inch
			Set as	: if NOT $$IsSysName:$StockItemName then @@InvItemName else ""
			Border	: Thin Left Right
			Style	: TimesNormal9
			
		[Field:PartNoD]
			;Width	: 3.95 Inch
			Set as	: "("+$PartNumberStki:Stockitem:$stockitemName+")"
			Style	: TSPL FFE BarCode
			Align	: Center
			Full Width	: Yes
			
		[Field:HSNB]
			Width	: 1.1 Inch
			Set as	: $GSTHSNCode:Stockitem:$stockitemName
			Border	: Thin Left Right
			Style	: TimesNormal9
			
		[Field:QtyB]
			Use		: Qty Primary Field
			Width	: 0.6 Inch
			Set as	: $BilledQty
			Style	: TimesNormal9
			
		[Field:PriceB]
			Use     : Rate Price Field
			Width	: 1.1 Inch
			Set as	: $Rate
			Border	: Thin Left Right
			Style	: TimesNormal9
			
		[Field:AmountB]
			Use		: Amount Forex Field
			Width	: 1.5 Inch
			Set as	: $Amount
			Style	: TimesNormal9
	

[Part:Global Invoice Bottom Tirlok]
	Parts	: ItemTotalAmtBase, GstPercent, BlkPart2,NetAmtDigit, NetAmtWords, PaymentPart, BinarySoft,+
	SignImage, Signatory,GI Bottom Tirlok
	Vertical: Yes
	;Width	: 11.0 Inch

[Part:ItemTotalAmtBase]
	Line	: ItemTotalAmtBase
	Width	: 11.0 Inch
	Border	: Thin Left Right
	
	[Line:ItemTotalAmtBase]
		Right Fields	: TotalAmtT
		
		[Field:TotalAmtT]
			Set as		: "Total = " +##BaseRateNumber
			Style		: TimesNormal9
			Full Width	: Yes
			Style		: TimesNormal9
			Align		: Right
			

[Part:GstPercent]
	Line		: GstPercent
	Repeat		: GstPercent	: Ledger Entries
	Border		: Thin Box
	Width		: 11.0 Inch
	
	[Line:GstPercent]
		Left Fields			: GstSr, GstName
		Right Fields		: GstRateBi, GstAmount
		[Field: GstSr]
			Set as		: " "
			;Border		: Full Thin Top Left
			Width		: 0.5 Inch

		[Field: GstName]

			Use			: Name Field
			Set as		: $LedgerName
			Full Width	: Yes
			Align		: Right
			Border		: Thin Left
			Style		: TimesNormal9
		
		
		[Field: GstRateBi]
			
			Use			: Name Field
			Set as		: If ##GstVAr = "Yes" Then $CGSTRATE Else $IGSTRate
			Width		: 2 Inch
			Border		: Thin Left Right
			Type		: Number
			Format		: "Percentage"
			Align		: Center
			Style		: TimesNormal9
				
	
		[Field: GstAmount]

			Use			: Amount Forex Field
			;Border		: Full Thin Top Left
			Set as		: $Amount
			Width		: 3 Inch
			Align		: Right
			Style		: TimesBold9
			
[Part:BlkPart2]
	Line	: BlankLine1
		

	
[Part:NetAmtDigit]
	Line	: NetAmtDigit
	Border	: Thin Cover
	Width	: 11.0 Inch
	
	[Line:NetAmtDigit]
		Right Fields	: NetAmtDigitT;, NetAmtDigitB
		[Field:NetAmtDigitT]
			Set as		: "Net Amount "+$CurrencyName:Company:@@CmpMailName +$$String:$Amount
			Style		: TimesNormal9
			Full Width	: Yes
			Align		: Right

;		[Field:NetAmtDigitB]
;			Use			: TotalAmtBase
;			Set as		: $Amount
;			Style		: TimesBold9
			
[Part:NetAmtWords]
	Line	: NetAmtWords
	Border	: Thin Box
	Width	: 11.0 Inch
	[Line:NetAmtWords]
		Right Fields	: NetAmtWordsT;, NetAmtWordsB
		[Field:NetAmtWordsT]
			Align		: Right
			Set as		: "Amount Chargeable (in words): "+$CurrencyName:Company:@@CmpMailName +$$InWords:$Amount +$FormalName:Company:@@CmpMailName 
			Style		: TimesNormal9
			Full Width	: Yes
			
;		[Field:NetAmtWordsB]
;			Align		: Right
;			Set as		: $$InWords:$Amount
;			Style		: TimesNormal9

[Part:PaymentPart]
	Width			: 10 Inch
	Border			: Thin Left Right
	Space Left		: 1 Inch
	Space Top		: 3
	Space Bottom	: 3
	Lines			: PaymentT,PaymentB,PaymentRemarks
	Vertical		: Yes
	

	[Line:PaymentT]
		Fields	: PaymentTDtls, PaymentTMode, PaymentTDate, PaymentTAmt
		Border			: Thin Left Top Bottom
		[Field:PaymentTDtls]
			Style	: TimesBold9
			Set as	: "Payment Details"
			Align	: Center
			Width	: 2.5 Inch
			
			
		[Field:PaymentTMode]
			Style	: TimesBold9
			Set as	: "Payment Mode"
			Align	: Center
			Width	: 2.5 Inch
			Border	: Thin Left Right
			
		[Field:PaymentTDate]
			Style	: TimesBold9
			Set as	: "Payment Date"
			Align	: Center
			Width	: 2.5 Inch
			Border	: Thin Right
			
		[Field:PaymentTAmt]
			Style	: TimesBold9
			Set as	: "Amount INR"
			Align	: Center
			Width	: 2.5 Inch
			

	[Line:PaymentB]
		
		Fields	: PaymentBDtls, PaymentBMode, PaymentBDate, PaymentBAmt
		Border	: Thin Top Left Bottom
		[Field:PaymentBDtls]
			Style	: TimesBold9
			Set as	: "Payment Details"
			Align	: Center
			Width	: 2.5 Inch
			
		[Field:PaymentBMode]
			Style	: TimesBold9
			Set as	: $$getgststatecode:$LedStateName:Ledger:$PartyLedgerName
			Align	: Center
			Width	: 2.5 Inch
			Border	: Thin Left Right
			
		[Field:PaymentBDate]
			Style	: TimesBold9
			Set as	: $$String:$Date:UniversalDate
			Align	: Center
			Width	: 2.5 Inch
			Border	: Thin Right
			
		[Field:PaymentBAmt]
			Style	: TimesBold9
			Set as	: $Amount
			Align	: Center
			Width	: 2.5 Inch
			

	
	[Line:PaymentRemarks]
		Field:PaymentRemarks
		Border	: Thin Bottom Left 
		[Field:PaymentRemarks]
			Set as		: "Payment Remarks : "
			Style		: TimesNormal9
			Width		: 10 Inch
		
		

[Part:BinarySoft]
	Line	: BinarySoft
	Width	: 11.0 Inch
	Border	: Thin Left Right
	[Line:BinarySoft]
		Field:BinarySoft
		[Field:BinarySoft]
			Set as	: "For Binarysoft"
			Style	: TimesBold9
			Full Width: Yes
		
[Part:SignImage]
	Line			: empty
	Graph Type		: If ##DigiSignEnable1 Then ##SignPAthFInal Else "";
	Height			: 10 mms
	Width			: 11 Inch
	Border			: Thin Left right
[Part:Signatory]
	Line		: Signatory
	Width		: 11.0 Inch
	Border		: Thin Left Right Bottom
	Space Top	: If ##DigiSignEnable1 THEN 1  ELSE 10 mms
	[Line:Signatory]
		Field:Signatory
		[Field:Signatory]
			Set as	: "Authorised Signatory"
			Style	: TimesNormal9
			Full Width: Yes
		



[Part: GI Bottom Tirlok]
	Lines		: Bottom Part
	Width		: 11.0 Inch
	[Line:Bottom Part]
		Field		: Bottom Part
		Space Top	: 1
		[Field:Bottom Part]
			Fields		: BottomFld1,BottomFld2
			Align		: Center
			
			[Field:BottomFld1]
				Set as		: "Note : "
				Style		: TimesBold9
				Print FG	: Red
				Width		: 5
				Space Left	: 7
			[Field:BottomFld2]
				Set as		: "Normal processing time for your Order is 2-4 Hrs. Incase of Holidays, +
				Your order will be processed on the next business day"
				Style		: TimesNormal9
				Full Width		: Yes






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
	
[Line	: BlankLine1]
	Field		: Simple Field
	Height		: 1
	
[Resource : SignImage1]
	Source 			: If ##DigiSignEnable1 Then '+##SignPAthFInal+' Else "";
	Resource Type	: Bmp
	Resource 		: 'TITLEICON'

[Variable:BaseRateNumber]
	Type:string
	
[Variable:Person1]
	Type:string
	
[Variable:PincodeLEd]
	Type:string
	
[Variable:SignPAthFInal]
	Type:String
	

[#Report: Voucher]
	VAriable:BaseRateNumber, Person1, SignPAthFInal
	Set:BaseRateNumber:$$CollAmtTotal:InventoryEntries:$Amount
	;Set:PincodeLEd:$Pincode:Ledger:$PartyLedgerName
	Set:Person1:IF $Person:Ledger:$PartyLedgerName Then $Person:Ledger:$PartyLedgerName Else "No One"
	Set:SignPAthFInal:$Signature:Company:##SVCurrentCompany

;; End-of-File
;Local : Field : BristleAmtInWords : Set as : continued
;
		

;[Report:Set_Logo_and_Digital_Signature]
;	Use		: OutputConfig Form
;	Set		: SubFormTitle	: "Enable Digital Sign and logo"
;	
;	Local	: Part	: Modify Variables	: Add	: Lines       : LogoEnable,LogoPath, DigiSignEnable, SignPath
;	
;	[Line: LogoEnable]
;
;		Fields      : Long Prompt, LogoEnable
;		Local       : Field : Long Prompt : Info : $$LocaleString:"Enable Logo"
;		SpaceBottom : 0.5
;		
;		[Field: LogoEnable]
;
;			Use     	: Name Field
;			Table		: YesNoTable
;			;Validate	: $$Value > 0
;			Type		: Logical
;			Storage		: LogoEnable
;			;Modifies	: LogoEnableVariable
;		
;[Line: LogoPath]
;
;		Fields      : Long Prompt, LogoPath
;		Local       : Field : Long Prompt : Info : $$LocaleString:"Logo Path"
;		SpaceBottom : 0.5
;		
;		[Field: LogoPath]
;
;			Use     	: Name Field
;			Type		: String
;			Storage		: LogoPath1
;			Inactive  	: NOT #LogoEnable
;			
;
;	[Line: DigiSignEnable]
;
;		Fields      : Long Prompt, DigiSignEnable
;		Local       : Field : Long Prompt : Info : $$LocaleString:"Enable Digital Signature"
;		
;		
;
;		[Field: DigiSignEnable]
;
;			Use     	: Name Field
;			Storage		: DigiSignEnable
;			;Validate	: $$PageRangeOk:$$Value
;			Table		: YesNoTable
;			Type		: Logical
;			Set as		: $DigiSignEnable:Company:##SvCurrentCompany
;;			Modifies	: SignEnableVariable
;;			
;[Line: SignPath]
;
;		Fields      : Long Prompt, SignPath
;		Local       : Field : Long Prompt : Info : $$LocaleString:"Sign Path"
;		SpaceBottom : 0.5
;		
;		[Field: SignPath]
;
;			Use     	: Name Field
;			Type		: String
;			Storage		: SignPath
;			Inactive  	: NOT #DigiSignEnable
;			Set as		: $$String:$SignPath:Company:##SVCurrentCompany
;			
;
;
;[Variable:LogoEnableVariable]
;	Type	: Logical
;	Persist	: Yes
;	
;[Variable:SignEnableVariable]
;	Type		: Logical
;	Volatile	: Yes
;	Default		: Yes
	
;[System:Variable]
;	LogoEnableVariable		: Set 	: 

;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;

;[#Collection: Company Details]
;	Explode		: Show Company Logo		: $Name = "Show Company Logo"
;	Explode		: Show Company DigiSign	: $Name = "Show Company Digital Signature"
;	
;	
;[Object: Show Company Logo]
;	
;	Use			: Output Configuration
;    Name        : "Show Logo Tirlok"
;    Value       : ##ShowCmpLogo
;	Action      : ConfigAction   : Modify Variables		: Cfg ShowCompanyLogo
;	
;[Variable: ShowCmpLogo]
;
;	Use			: Skip Save Variable
;	Type 		: Logical
;	Persistent  : Yes
;	
;[Object: Show Company DigiSign]
;	
;	Use			: Output Configuration
;    Name        : "Show Sign Tirlok"
;    Value       : ##ShowCmpLogo
;	Action      : ConfigAction   : Modify Variables		: Cfg ShowCompanyLogo
;	
;[Variable: ShowDigiSign]
;
;	Use			: Skip Save Variable
;	Type 		: Logical
;	Persistent  : Yes
	
;[#Collection: SalesOrder PartyDetails]
;	
;
;	

	

```
