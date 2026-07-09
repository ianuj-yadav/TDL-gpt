---
title: Binary Final
type: sample_code
objects: Report, Form, Part, Line, Field
source: Binary Final.txt
---

# Binary Final

## Source Code

```tdl
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
	
	add			:Parts			: STD Invoice Top,GI OpPgBrk, ItemDtlsPart, ItemTotalAmtBase, GstPercent, BlkPart2, 
	add			:Bottom Parts	:  Global Invoice Bottom Tirlok

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
	Border			: Thin Cover
	Horizontal Align	: Center
[Part:LogoImage]

	Line			: empty
	Graph Type		: $Logopath:Company:#SVCurrentCompany
	Width			: 100% Page
	Height			: 10% Page
	Horizontal Align	: Center
	

[Part: Invoice Type]

	Line	: InvoiceTypeLn
	Border	: Thin Cover
	;Width	: 100% Screen
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
	Left Parts		: SupplierDetails
	Right Parts		: CustomerDetails
	Border			: Thin Box
	Common Border	: Yes
	Vertical		: No
	;Width		: 100% Page
	

;; -----------------Supplier Details--------------------
[Part:SupplierDetails]
	Line	: InvoiceNo, SupplierTitle, SupName, SupAdd1, SupAdd2, SupPhone, SupMob, SupEmail, SupGst
	;Width	: 50% Screen
	Border	: Thin Right
	[Line: InvoiceNo]
		Field			: InvoiceNoTitle;,InvoiceNoBody
		Space Top		: 0.2
		Space Bottom	: 0.2
		Border			: Thin Bottom
		[Field:InvoiceNoTitle]
			Set as		: "Invoice No: "+ @VchNo
			VchNo		: $$String:$VoucherNumber
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
			Set as		: @@CmpMailName
			Style		: TimesBold8
			Full Width	: Yes
	
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
			Set as		: "Phone : "+@Phone
			Phone		: $PhoneNumber:Company:@@CmpMailName 
			Style		: TimesNormal8
			Full Width	: Yes

	[Line:SupMob]
		Field			: SupMob
		
		[Field:SupMob]
			Set as		: "Mob : "+@Mobile
			Mobile		: $MobileNumbers:Company:@@CmpMailName
			Style		: TimesNormal8
			Full Width	: Yes
			
	[Line:SupEmail]
		Field			: SupEmail
		
		[Field:SupEmail]
			Set as		: "E-Mail : "+$Email:Company:@@CmpMailName
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
	Line	: DateInfo,CustomerTitle, CusName, CusAdd1, /*CusContactPerson, */CusPhone, CusPlace, CusPincode, CusGst
	
	[Line: DateInfo]
		Field			: DateInfoTitle;,DateInfoBody
		Space Top		: 0.2
		Space Bottom	: 0.2
		Border			: Thin Bottom
		[Field:DateInfoTitle]
			Set as		: "Dated: " + @Date
			Date		: $$String:$Date:ShortDate
			Style		: TimesBold8
			Type		: String
			
		[Field:DateInfoBody]
			Set as		: $$String:$Date:ShortDate
			Style		: TimesNormal9
			
			
	
	[Line:CustomerTitle]
		Use		: SupplierTitle
		Local	: Field		: SupplierTitle	: Set as	: "Customer/Client:"
;		Field			: CustomerTitle
;		Space Top		: 1
;		Space Bottom	: 1
;		
;		[Field:CustomerTitle]
;			Set as		: "Customer/Client:"
;			Style		: TimesBold16
;			Full Width	: Yes
	
	[Line:CusName]
		Field			: CusName
		
		[Field:CusName]
			Set as		: $PartyLedgerName
			Style		: TimesBold8
			Full Width	: Yes
	
	[Line:CusAdd1]
		Field			: CusAdd1
		
		[Field:CusAdd1]
			Set as		: $_Address1:Ledger:$PartyLedgerName+ ", " +$_Address2:Ledger:$PartyLedgerName+ ", " +$_Address3:Ledger:$PartyLedgerName
			Style		: TimesNormal8
			Full Width	: Yes
	
	[Line:CusContactPerson]
		Field			: CusContactPerson1;, CusContactPerson
		Space Bottom	: 1
		
		[Field:CusContactPerson1]
			Set as		: "Contact Person -"+$LedgerContact:Ledger:$PartyLedgerName
			Style		: TimesNormal8
			Full Width	: Yes
		[Field:CusContactPerson]
			Set as		: $LedgerContact:Ledger:$PartyLedgerName; Then $Person:Ledger:$PartyLedgerName Else "No One"
			Style		: TimesNormal8
			Full Width	: Yes
			
	
	[Line:CusPhone]
		Field			: CusPhone
		Space Top		: 1
		[Field:CusPhone]
			Set as		: "Contact : " +$LedgerMobile:Ledger:$PartyLedgerName  + ", " +$Email:Ledger:$PartyLedgerName 
			Style		: TimesNormal8
			Full Width	: Yes

	[Line:CusPlace]
		Field			: CusPlace
		
		[Field:CusPlace]
			Set as		: "Place Of Supply : "+$PlaceOfSupply  + ", State Code : " + $$getgststatecode:$PlaceOfSupply;($LedStateName:Ledger:$PartyLedgerName )
			Style		: TimesNormal8
			Full Width	: Yes
			
	[Line:CusPincode]
		Field			: CusPincode
		
		[Field:CusPincode]
			Set as		: "PinCode : "+$Pincode:Ledger:$PartyLedgerName
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
	;Width	: 100% Page
	Border	: Thin Cover
	Common Borders	: Yes
	[Line:ItemDtlsTitle]
		Use		: ItemDtlsDtls
		Space Top		: 0.3
		Space Bottom	: 0.3
		Local	: Field: Default	: Style	: TimesBold9
		Local	: Field: Default	: Align	: Center
		Local	: Field: Default	: Type	: String
		
		Local	: Field	: SINoB			: Set as: "Sl no"
		Local	: Field	: ParticularsB	: Set as: "Particulars"
		Local	: Field	: PartNoD		: Set as: "Part No."
		Local	: Field	: HSNB			: Set as: "HSN/SAC"
		Local	: Field	: QtyB			: Set as: "Quantity"
		Local	: Field	: PriceB		: Set as: "Price"
		Local	: Field	: AmountB		: Set as: "Amount INR"
		
		;Border	: Thick Bottom
		SpaceTop: 0
		
[Part:ItemDtlsPart]
	Lines			: ItemDtlsDtls
	;Width			: 100% Page
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
			Width	: 30% Page
			Set as	: if NOT $$IsSysName:$StockItemName then @@InvItemName else ""
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
	;Width	: 100% Page
	Border	: Thin Left Right
	
	[Line:ItemTotalAmtBase]
		Right Fields	: TotalAmtT;, TotalAmtBase
		
		[Field:TotalAmtT]
			Set as		: "Total = " +$$String:@TotalAmt
			TotalAmt	: $$CollAmtTotal:InventoryEntries:$Amount
			Style		: TimesNormal9
			Full Width		: Yes
			Align		: Right
			
		[Field:TotalAmtBase]
			Set as		: $$CollAmtTotal:InventoryEntries:$Amount
			Width		: 10
			Style		: TimesBold9
			

[Part:GstPercent]
	Line		: GstPercent
	Repeat		: GstPercent	: Ledger Entries
	Border		: Thin Box
	;Width		: 100% Page
	
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
			Style		: TimesNormal9
			Full Width	: Yes
		
		
		[Field: GstRateBi]
			
			Use			: Name Field
			Set as		: If @Head = "IGST" Then $IGSTRate Else $CGSTRATE
			Head		: $GSTDutyHead:ledger:$$Name
			Width		: 10% Page
			Border		: Thin Left Right
			Type		: Number
			Format		: "Percentage"
			Align		: Center
			Style		: TimesNormal9
				
	
		[Field: GstAmount]

			Use			: Amount Forex Field
			;Border		: Full Thin Top Left
			Set as		: $Amount
			Width		: 30% Page
			Align		: Right
			Style		: TimesBold9
			
[Part:BlkPart2]
	Line	: BlankLine1
		




[Part: Global Invoice Bottom Tirlok]
	Part		: BasePart
	
[Part:BasePart]
	Parts		: NetAmtDigit, NetAmtWords, PaymentPart, BinarySoft, SignImage, Signatory
	;Right Part	: 
	Vertical	: Yes
	Border		: Thin Box
	
[Part:NetAmtDigit]
	Line	: NetAmtDigit
	Border	: Thin Bottom
	;Width	: 100% Page
	
	[Line:NetAmtDigit]
		Right Fields	: NetAmtDigitT;, NetAmtDigitB
		[Field:NetAmtDigitT]
			Use			: TotalAmtT
			Set as		: "Net Amount INR  " +$$String:$Amount
			Style		: TimesBold9

		[Field:NetAmtDigitB]
			Use			: TotalAmtBase
			Set as		: $Amount
			Style		: TimesBold9
			
[Part:NetAmtWords]
	Use		: NetAmtDigit
	Local	: Field	: NetAmtDigitT	: Set as	: "Amount Chargeable (in words): " +$$InWords:$Amount
	Local	: Field	: NetAmtDigitT	: Style		: TimesNormal9

[Part:PaymentPart]
	;Part		: EmptyPart
	Right Part		: PaymentPartBody
	;Width			: 100% Page
	Space Bottom	: 3
	Space Top		: 3
	
[Part:EmptyPart]
	;Width		: 4% Page
	Lines		: Empty
[Part:PaymentPartBody]
	Width		: 96% Page
	Lines		: PaymentTitle, PaymentBody, PaymentRemarks
	
	
	[Line:PaymentTitle]
		Fields		: PaymentDetails, PaymentMode1, PaymentDate, PaymentAmount
		Border		: Thin Full Top Left;Thin Full Top Left Bottom
		[Field:PaymentDetails]
			Set as		: "Payment Details"
			Width		: 24% Page
			Align		: Center
			Style		: TimesBold9
	
		[Field:PaymentMode1]
			Set as		: "Payment Mode"
			Width		: 24% Page
			Border		: Thin Left
			Align		: Center
			Style		: TimesBold9
	
		[Field:PaymentDate]
			Set as		: "Payment Date"
			Width		: 24% Page
			Border		: Thin Left
			Align		: Center
			Style		: TimesBold9
		
		[Field:PaymentAmount]
			Set as		: "Payment Amount"
			Width		: 24% Page
			Border		: Thin Left
			Align		: Center
			Style		: TimesBold9
	
	[Line:PaymentBody]
		Use			: PaymentTitle
		Local		: Field		: Default			: Style			: TimesNormal9
		
		Local		: Field		: PaymentDetails	: Set as		: $PaymentDetails
		Local		: Field		: PaymentMode1		: Set as		: $PaymentMode
		Local		: Field		: PaymentDate		: Set as		: $$String:$PaymentDate
		Local		: Field		: PaymentAmount		: Set as		: $PaymentAmount
		
	[Line:PaymentRemarks]
		Field		: PaymentRemarks
		Border		: Thin Full Top Left Bottom
		
		[Field:PaymentRemarks]
			Set as		: "Additional Remarks : "+$PaymentRemarks
			Style		: TimesNormal9
			Full Width	: Yes
			
		
		

[Part:BinarySoft]

	Line			: BinarySoft
	Width			: 100% Page
	Space Bottom	: If ##DigitalSignEnable Then 0 Else 3
	[Line:BinarySoft]
		Field:BinarySoft
		[Field:BinarySoft]
			Set as	: "For " + @@CmpMailName
			Style	: TimesBold9
			Full Width: Yes
		



[Part:Signatory]
	Line	: Signatory
	Width		: 100% Page
	[Line:Signatory]
		Field:Signatory
		[Field:Signatory]
			Set as	: "Authorised Signatory"
			Style	: TimesNormal9
			Full Width: Yes
		

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
				Set as	: "Normal processing time for your Order is 2-4 Hrs. Incase of Holidays, Your order will be processed on the next business day";##vCurrentPath+"\"+##SADigitalFileName;
				
				Style	: TimesNormal9
				Width	: 110




[Part: SignImage]
	Part		: Empty		
	Option	    : SignImage2	: ##DigitalSignEnable
	
	;Height		: 
		

		
[!Part:SignImage2]
					Part		: SignImage1;, Empty
					;Vertical	: Yes
				 	;Invisible	: ($$InExportMode AND @@IsExcelFormat) OR ##SvPreprinted OR NOT ($IsSales OR $IsDebitNote OR $IsCreditNote OR $IsDelNote OR $IsReceipt OR $IsPurcOrder OR $IsSalesOrder OR $IsOutSourceOrder OR $IsJobWorkOrder OR $IsMaterialIn OR $IsMaterialOut) OR NOT @@EcoIsLogoEnabled
					
[Part: SignImage1]
		
		Lines		: SignImage
		
		FullPath	: @Path1+"\"+@File
		Path1		: #SADigitalSignPathPopUp;##vCurrentPath
		File		: ##SADigitalFileName
		Graph Type	: ##vCurrentPath+"\"+##SADigitalFileName;@FullPath;;$DigitalSignFullPath:Company:##SVCurrentCompany
		Height		: If ##DigitalSignEnable Then 3 Else 0;If ((NOT $$InPrintMode) AND ($$InExportAction OR $$InMailAction OR $$InWhatsAppAction)) Then 15% Else 8% Page
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

;; End-of-File






















;;=====================Digital Sign Configuration=====================


[#Collection: Company Details]
	;Color		: Red
	Add			: Object		: Before		: Cfg ShowCompanyName		: ShowDigitalSign
	;Object		: ShowDigitalSign
	
[Object: ShowDigitalSign]
	Use         : Vch Output Configuration
	Name		: "Show Digital Sign of Company"
	Value		: ##DigitalSignEnable
	;Action		: ConfigAction : /* Do If : @@IsSales Or @@IsPurchase	:*/ Set   : DigitalSignEnable    : NOT ##DigitalSignEnable
	Action      : ConfigAction   : Modify Variables		: Cfg ShowDigitalSign
	

[Variable:DigitalSignEnable]
	Type        : Logical
    Persistent  : Yes
	Default		: Yes
	

[System: Variable]
	DigitalSignEnable	: No
	

;;-=========================Digital Sign Like Logo Path===========================

[Report:Cfg ShowDigitalSign]
	Use		: OutputConfig Form
	Set		: SubFormTitle	: @@CompanyDetails
	Set		: ShowMoreApplicable	: Yes
	Set		: ShowMore				: No
	Delete	: Form
	Add		: Form	: Cfg ShowDigitalSign
	Local	: Collection			: File Selection Table		: Add	: Advanced	: @@NonImgFiles
	
[Form: Cfg ShowDigitalSign]
	
	Use		: Company Logo path
	Replace	: Part	: Form SubTitle		: MV Title
	Replace	: Part	: Company Logo path	: Cfg ShowCompanyDigitalSign

	Local	: Part	: MV Title	: Space Bottom	: 1

[Part: Cfg ShowCompanyDigitalSign]	

	Line	: Cfg ShowCmpDigitalSign, Cfg LocationOfDigitalSign, Cfg DigitalSignFileName, CompanyLogo NotesOne, CompanyLogo NotesTwo, +
				CompanyLogoNotesThree
	
	Local	: Field	: Medium Prompt	: Width	: @@LongWidth
	Local	: Line	: CompanyLogoNotesThree	: Local : Field : CompanyLogoNotes: Set as      : "- " + $$LocaleString:"Company Digital Sign can be printed only on specific reports and vouchers."

	[Line: Cfg ShowCmpDigitalSign]

		Field           : Medium Prompt, SACompDigitalSign
		Local           : Field: Medium Prompt : Set as      : "Show Company Digital Sign"
		[Field: SACompDigitalSign]
    
			Use					: Logical Field
			Set as      		: ##DigitalSignEnable
			;Skip        		: NOT ##DigitalSignEnable;(@@IsCmpLogoEnabled OR $$ParentIsMenu)
			Set Always			: Yes
			Modifies			: DigitalSignEnable
			Variable			: DigitalSignEnable
			;Validate    		: ($$RepLogoSpecific:##ReportNameVar:$$Value)

	
	[Line: Cfg LocationOfDigitalSign]
	
		Fields			: Medium Prompt, SADigitalSignPathPopUp
		Local			: Field	: Medium Prompt	: Set as	: @@ImagePath
		Local           : Field	: Medium Prompt : Inactive  : NOT #SACompDigitalSign
		
		[Field: SADigitalSignPathPopUp]
	
			Use			: Name Field
			Width		: @@NarrWidth
			Set as		: ##vCurrentPath;
			Inactive  	: NOT #SACompDigitalSign
			Skip		: Yes
			
	[Line: Cfg DigitalSignFileName]

		Field           : Medium Prompt, SADigitalSignPath, DigitalSignAbsolutePath
		Local           : Field: Medium Prompt : Set as     : @@ImageFileName
		Local           : Field: Medium Prompt : Inactive  	: NOT #SACompDigitalSign
		Space Bottom	: 0.25
		
		[Field: SADigitalSignPath]
    
			Use			: File Selection Template 
			Width		: @@NarrWidth
			Inactive    : NOT #SACompDigitalSign
			Set as		: ##SADigitalFileName
			Modifies	: SADigitalFileName
			Variable	: SADigitalFileName
			Control 	: SADigitalSignPathExist : ($$IsEmpty:@@SADigitalSignPath OR Not $$IsFileExists:@@SADigitalSignPath OR ($$FileSize:@@CfgDigitalSignPath > 1048577))
			Act on Table Element: (@ShowMore OR @ShowLess)	: Execute Obj Actions	: ShowMoreLess

			ShowMore	: ($$IsSysNameEqual:ShowMore:($$CurrentTableObj:$Name))
			ShowLess	: ($$IsSysNameEqual:ShowLess:($$CurrentTableObj:$Name))
	
		[Field: DigitalSignAbsolutePath]
	
			Use			: Name Field
			Type		: String		: Forced
			Set as		: @@SADigitalSignPath
			Set Always	: Yes
			Width		: 50
			Skip		: Yes
			Invisible	: Yes
			
[System:Formula]
	SADigitalSignPathExist			: If $$IsEmpty:@@SADigitalSignPath then $$LocaleString:"Digital Sign path cannot be empty." +
							  Else If NOT $$IsFileExists:@@SADigitalSignPath Then $$LocaleString:"Digital Sign path specified is invalid or file not found." +
								   Else If $$FileSize:@@SADigitalSignPath > 1048577 Then "File size exceeds 1 MB." +
									    Else $$LocaleString:"Format Not Supported"
										
[System: Formulae]
	SADigitalSignPath				: $$GetFileFullPath:(#SADigitalSignPathPopUp + "\" + #SADigitalSignPath)
	CfgDigitalSignPath				: $$GetFileFullPath:(#SADigitalSignPathPopUp + "\" + #SADigitalSignPath)
	
		
	
[Variable: SADigitalFileName]
	Use			: Skip Save Variable
	Type 		: String
	Persistent  : Yes
	

[Variable: SADigitalSignPath]

	Use			: Skip Save Variable
	Type 		: String
	Persistent  : Yes
	
[System:Variable]
	SADigitalSignPath  	: #SADigitalSignPathPopUp + "\" + #SADigitalSignPath
	SADigitalFileName	: ""
	
	
```
