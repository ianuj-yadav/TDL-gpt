---
title: Tirlok Receipt Customization
type: sample_code
objects: Part, Line, Field, Collection
source: Tirlok Receipt Customization.txt
---

# Tirlok Receipt Customization

## Source Code

```tdl

[#Form: NormalPRPrint]
	/*
	Delete		: Parts
	Delete		: Bottom Parts
	Delete		: Page Break
		Height	: 100% page
		Width 	: 100% page

		Space Top   : 10% Page
		Space Bottom: 10% Page
		Space Left  : 10% PAge
		Space Right : 10% PAge
		
		Add		: Parts		: TirlokReceiptLogo, TirlokReceiptCompany, TirlokReceiptDetails, TirlokCostCentre
		Add		: Bottom Parts:  TirlokReceiptBottom
	
		Local       : Part      : Default   : PrePrintedBorder  : Yes
		Local       : Line      : Default   : PrePrintedBorder  : Yes
		Local       : Field     : Default   : PrePrintedBorder  : Yes
		Empty       : $IsDeleted OR $IsCancelled
		;Page Break	: PPRClPage Break, PPR Title

		;Option      : PPRLogoPrint : @@IsReceipt And @@IsLogoEnabled
;		Option      : PPRLogoPrint : @@IsLogoEnabled
;		Option      : WithBankTransaction	 : ##PPRWithPymtDetails AND Not $$IsEmpty:@@BankingVoucherBankLedger 
;		Option		: PRWithCostCentreDtls   : ##PPRCostExplodeFlag AND NOT ##PPRWithPymtDetails
;		Option		: DSC NormalPRPrint		 : @@IsDigitalSignApplied
	
	
[#Part: Receipt Print Config]
	Background		: Magenta
	
;[Part:TirlokCostCentre]
;	 Line        : VCHCST ExplLine1
;    Repeat      : VCHCST ExplLine1 : Cost Centre Allocations
;    Break After : $$SubTotal:VCHCSTAmt = $$BaseValue:@@OwnerTotal
;    Total       : VCHCSTAmt
;	Print BG	: Red
;	Height		: 4
;
;    [Line: VCHCST ExplLine1]
;
;        Fields  : DSP VchDate, VCHCST Name, VCHCST Amt
;		Local	: Field: DSP VchDate			: Set as	: "" 
;		Local	: Field: DSP VchDate			: Invisible	: NOT $$InExportMode
;		Local	: Field: DSP VchDate			: Delete	: Display
;		Local	: Field: DSP VchDate			: Delete	: Alter
;        Local   : Field: VCHCSTAmt 				: Format	: "Commas,DrCr"
;        Indent  : @@IndentByLevel
;		Option	: VCHCST ExplLine Excel Export	: $$InExportMode
;		Local	: Field	: VCHCSTName	: Width	: if $$IsEmpty:$$ExplodeLevel then 25 + 5 else 16 + 5
	
[Part: TirlokCostCentre]
	Line	: TirlokCostCentre
	Repeat	: TirlokCostCentre	:AllLedgerEntries.CategoryAllocations.CostCentreAllocations
	Scroll	: Vertical
	Print BG	: Grey
	;Height		: 5
[Line:TirlokCostCentre]
	Field		: TirlokCostCentre
	[Field:TirlokCostCentre]
		Set as			: $Amount;$AllLedgerEntries[-1].CategoryAllocations[-1].CostCentreAllocations.Name
		Print BG	: Magenta
		

[Collection:ReceiptVch]
	Type : Vouchers 

[Collection : MyReceiptColl]
	Source Collection : ReceiptVch
	Walk	: Cost Center Allocations
	Fetch	: Name

[Collection : MyReceiptColl1]
	Source Collection : ReceiptVch
	Walk : CategoryAllocations
	


[#Line        : VCHCST ExplLine]
	Border		: Thick Box
		
;[#Field:VCHCST Name]
;	Print BG	: Red
;	Background	: red
[Part: TirlokReceiptLogo]
	Part			: NewReceiptLogo
	Horizontal Align	: center
	Border		: Thin Cover
	Vertical	: No
	;Print BG	: Red
	;Width		: 100% Page
	
[Part:NewReceiptLogo]
	Use			: PRCT Image
	
[#Part: EXPSMP Logo]
	;Width		: 30% Page
	Height		: 10% PAge
[Part:TirlokReceiptCompany]
	Use			: PPR Title;PRCT Company Addr
	;Print BG	: Yellow
	Border		: Thin Cover
	Space Top	: 1
	
[Part:TirlokReceiptDetails]
	Parts		: Part1;,TirlokCostCentre
	
[Part:Part1]
	Use			: PPRDetailed
	Border		: Thick Box
	;Parts		: Receipt1,Receipt2
	;Vertical	: No
	Print BG	: Yellow
	

    [#Part: PPRBottomDetails]
		Print BG	: Green
		

	
[Part:REceipt1]
	Use			: PPRDetailed
	Border		: Thick Box
	Width			: 100% Page
	
[#Part: VCHCSTAlloc Explosion]
	Print BG	: Green
[Part:REceipt2]
	Use			: VCHFirstPartyBILAlloc Explosion
	Border		: Thick Box
	Width			: 100% Page
	[Line:REceipt2]
		Use			: VCHBILL ExplLine
	
[#Line: PPR Accts]
	Border		: Thick Bottom
[#Part		: PPRDetails]
	Delete		: Page Break
	;Add			: Line		: NewLIne
	
	;Print BG	: REd
	[Line:NewLine]
		Use		: PPR Accts
[#Field:PPRAcctAmts]
	;Print BG		: Yellow
[#Part: VCHCSTAlloc Explosion]
	;Print BG		: Yellow
[#Field:PPR Less]
	;Print BG	: Red
[#Field: PPR Accts]
	;Print BG	: Red
[#Part: PPR WithBills]
	;Print BG	: Red
[#Field: PPR AcctAmts]
	;Print BG	: Red
	
 [#Field: PPR AcctAmts]
	 ;Print BG	: Yellow
[#Part: VCHCSTCAT Explosion]
	;Print BG	: Red
	
[#Field: VCHCST Name]
	;Print BG	: Red
	
[#Field: VCHBILL Type]
	;Background	: Red
	
[#Part: BPA BillDetails Explosion]
	Background	: Red
	Print BG	: Yellow
[#Field: DSP VchDate]
	;Print BG	: Red
	
[#Line: DSPVCHBILAllocExplosion]
	Border		: Thick Box
	
[#Part: VCHBILAlloc Explosion]
	;Background	: Red
	
[#Part: BPA BillDetails Explosion]
	;Background	: Red
	
[#Field: ACLSLed]
	Background	: Red
[#Part: VCHCST Explosion]
	Print BG	: Yellow
[#Line:Vch Acc Cl Page Break]
	Border		: Thick Bottom
	
[#Line: Vch Acc Op Page Break]
	Border		: Thick Top
[#Line      : PPR AcctTitles]
	;Border		: Thin Box
[#Line: PPR Accts]
	Border		: Thin Box
[#Part : PPRBottomDetails]
	;Print BG	: Yellow
	
[#Part: PPR WithBills]

	Local       : Style  : Default 				: Height	: 13
	
[#Form: Receipt Color]
	;Background	: Yellow
    
[#Form: VCH ReceiptDetails]
	Background	: Red
	
[Part:TirlokReceiptBottom]
	Parts		: ReceiptDigitalSign, FinalPart
	Vertical	: Yes
	
[#Line:VCHCST ExplLine]
	Border		: Thin Top Bottom



[Part: ReceiptDigitalSign]
	
	Right Part		: ReceiptDigitalSign1
	;Option	    	: ReceiptDigitalSign2	: ##DigitalSignEnable
	Space Top		: (If ##DigitalSignEnable Then 0.1  Else 0) inch
	

[Part:ReceiptDigitalSign1]
	Lines		: Empty
	Option		: ReceiptDigitalSign2	: ##DigitalSignEnable
	Invisible	: ($$InExportMode AND @@IsExcelFormat) OR ##SvPreprinted OR NOT ($IsSales OR $IsDebitNote OR $IsCreditNote OR $IsDelNote OR $IsReceipt OR $IsPurcOrder OR $IsSalesOrder OR $IsOutSourceOrder OR $IsJobWorkOrder OR $IsMaterialIn OR $IsMaterialOut) OR NOT @@EcoIsLogoEnabled
	Horizontal Align	: Right
	Width			: 100% Page
	;Print BG		: Yellow
			
[!Part: ReceiptDigitalSign2]
	Graph Type	: $DigitalSignFullPath:Company:##SVCurrentCompany
	Height		: 5% PAge;If ((NOT $$InPrintMode) AND ($$InExportAction OR $$InMailAction OR $$InWhatsAppAction)) Then 15% Else 8% Page
	Invisible	: If $$InPrintMode OR $$InMailAction OR $$InWhatsAppAction OR ($$InExportMode And $$IsSysNameEqual:HTML:##SVExportFormat) then No Else Yes
	;Width		: 20% PAge
	;Print BG		: Red
	
[Part: FInalPart]
	Use			:   PPR Sign;Digital Auth Signature
	
[#Part:PPR Sign]
	Space Top   : (If ##DigitalSignEnable Then 0.1  Else 0.75) inch
	;Add		: Part	: At Beginning	: ReceiptDigitalSign
	;pOption	: ReceiptDigitalSign	: ##DigitalSignEnable







[Part:NewReceiptPart]
	Line		: NewReceiptPart
	
	[Line:NewReceiptPart]
		Field		: NewReceiptPart
		
		[Field:NewReceiptPart]
			Set as		: If ##SACompDigitalSign Then $$String:@@CfgDigitalSignPath Else "Not Found";If ##TirlokYes Then "Tirlok" Else "Hello"
			Full Width	: Yes
			;Print BG	: Yellow
			Style		: Normal Bold
			
	


[#Part:PPR Sign]
	;Print BG	: Green
	
[#Part: PPRDetailed]
	;Print BG	: Red;
	
[#Part:PPR Title]
	;Print BG	: AppInactiveClr
	
[#Part: PPRClPage Break]
	;Print BG	: Red
	
[#Form : PPRLogoPrint]
	;Print BG	: Magenta

[#Collection: Rcpt VoucherDetails]; pymt
	Color		: Red
	Object		: TirlokYesNo
	
[Object: TirlokYesNo]
	Use         : Vch Output Configuration
	Name		: "Show Name Tirlok"
	Value		: ##TirlokYes
	Action		: ConfigAction :  Do If : @@IsReceipt	: Set   : TirlokYes    : NOT ##TirlokYes

[Variable: TirlokYes]
    Type        : Logical
    Persistent  : Yes

[System: Formulae]
	TirlokYes	: ##TirlokYes
	;TirlokYes	: If @@IsReceipt Then ##TirlokYes Else ""
		

[System: Variable]
 	TirlokYes    : No
	
	
[#Part: Receipt Print Config]
	Background	: Red
	
[#Part: PPR WithBills]
	;Print BG		: Red
;; [Object: PPRCheckedFlag]
/*
[#Form: PymtRcpt Print]
	Delete	: Option
	Delete	: Switch
	Use		: ESI CombChallan
	*/
	

[#Part: PPR Company Addr]
	Print BG		: Red
	;Add				: Line	: NewLine
	[Line:NewLine]
		Field		: NewLine
		
		[Field:NewLine]
			Set as		: "NewLine"
			Print BG	: Red


```
