---
title: Item Image
type: sample_code
objects: Report, Form, Part, Line, Field, Collection
source: Item Image.txt
---

# Item Image

## Source Code

```tdl

;; =========================Add Image in Stock Item 
[#Part:STKI Basic]
	Add		: Part	: ItemImage
	Height		: 20
[Part:ItemImage]
	Parts		:  ItemImageTitle, ItemImageFile
	Vertical	: Yes
	Width		: 30% Page
	
[Part:ItemImageFile]
	Background	: red
	Line		: Empty
	Graph Type	: $ItemImage+'/'+$ItemImagePath
	;Width		: 10% PAge
	Height		: 200
	
[#Field: SALogoPathPopUp]
	Background		: Red
	
[#Field: CMP LogoAbsolutePath]
	Invisible		: No
[Part:ItemImageTitle]
	;Use			: Company Logo path
	Line		: ItemImageTitle, ItemImageInput;,
	[Line:ItemImageTitle]
		Field		: Medium Prompt, FilePath
		Explode		: ItemImageFile		: Yes
		Local		: Field	: Medium Prompt	: Info:$$LocaleString:"Enter Image Link Here"
		[Field:FilePath]
			Use			: SALogoPathPopUp
			Set as		: $ItemImagePath
			Storage		: ItemImagePath
			Set Always	: Yes
	[Line:ItemImageInput]
		Field		: ItemImageInput, ImageFullPath
		
		[Field:ItemImageInput]
			Use					: Name Field
			Set Always			: Yes
			Width				: @@LongWidth
			Show Table			: Always
			Delete				: Case
			
			Table				: Current Folder, Provide Folder Path, SelectDrives
			Storage	: ItemImage
			Set as	: $ItemImage
		[Field:ImageFullPath]	
			Use			: Name Field
			Type		: String	: Forced
			Storage		: LogoPath
			Set as		: $$GetFileFullPath:(#SALogoPathPopUp + "\" + #SALogoFilePopUp)
			Set Always	: Yes

[System: UDF]
	ItemImage		: String		: 12001
	ItemImagePath	: String		: 12002
		
[#Form:CompanyLogo path]

;;==============================Image In Voucher
		;Local	: Collection			: File Selection Table		: Add	: Advanced	: @@NonImgFiles
[#Line:Ei invinfo]
	;Add				: Field		: After		: VCH StockItem	: VCHItemImage
	;Explode		: VCHItemImage	: Yes	;: After		: VCH StockItem	: VCHItemImage
	Explode		: VCHItemImage		: Yes
	
	
	
[#Field: VCH StockItem]
	Sub Form	: VChItemImageVoucher	: Not $$IsEmpty:$$Value And Not $$IsEmpty:$ItemImagePath:Stockitem:$StockItemName +
					And Not $$IsEmpty:$ItemImage:Stockitem:$StockItemName And  ##ItemImageCfg
					
	

	
[Report:VChItemImageVoucher]
	Form		:  VChItemImageVoucher
[Form:VChItemImageVoucher]
	Part		: VChItemImageVoucherTitle, VChItemImageVoucher,VChItemImageVoucherEnter
	;Button			: SubmitImage
	
[Part:VChItemImageVoucherTitle]
	Line		: VChItemImageVoucherTitle
	[Line:VChItemImageVoucherTitle]
		Field		: Name Field
		Local		: Field		: Name Field		: Info:$$LocaleString:"Item Image"
		
[Part:VChItemImageVoucherEnter]
	Line		: VChItemImageVoucherEnter
	[Line:VChItemImageVoucherEnter]
		Field		: Name Field
		Local		: Field		: Name Field		: Set as : $Name:Stockitem:$StockItemName;+"\"+$ItemImage:Stockitem:$StockItemName
		
[Part:VChItemImageVoucher]
	Line		: VChItemImageVoucher
	Graph Type	: $ItemImagePath:Stockitem:$StockItemName+"\"+$ItemImage:Stockitem:$StockItemName
	[Line:VChItemImageVoucher]
		Field	: VChItemImageVoucher
		[Field:VChItemImageVoucher]
			Set as		: $ItemImagePath:Stockitem:$StockItemName+"\"+$ItemImage:Stockitem:$StockItemName
			Background	: Red
			Skip		: Yes
			

	

[Part:VCHItemImage]
	Parts		:  VCHItemImageDisplay, VCHItemImageName,
	Vertical	: Yes
	
		
[Part:VCHItemImageName]
	Line		: VCHItemImageName
	[Line:VCHItemImageName]
		Field		: VCHItemImageName
		[Field:VCHItemImageName]
			Set as		: $Name:Stockitem:$StockItemName
			Skip		: Yes
			
[Part:VCHItemImageDisplay]
	Line		: VCHItemImageDisplay;VCHItemImage
	Graph Type	: $ItemImagePath:Stockitem:$StockItemName+"\"+$ItemImage:Stockitem:$StockItemName
	[Line:VCHItemImageDisplay]
		Field		: VCHItemImageDisplay
		[Field:VCHItemImageDisplay]
			Info		: $ItemImagePath:Stockitem:$StockItemName+"\"+$ItemImage:Stockitem:$StockItemName
	

[!Line:EIColumnOneImage]
	Use		: EI InvInfo
	Explode		: VCHItemImage		: ##ItemImageCfg

[#Line:EI InvInfo]
	Border		: Thick Box 
	
;;==========================Configuration


		
[#Part: Sales InvMode Right Config] 
	;Background	: Red
	Add			: Line		: After	: ICFG EditVATClass		: ItemImageCfg
	
[Line: ItemImageCfg]

    Field		    : Long Prompt, ItemImageCfg
    Local	  	    : Field	: Long Prompt : Set as 	: $$LocaleString:"Show Item Image :" 
	Space Top		: 2
	Border			: Thick Box
	
	    [Field: ItemImageCfg]

        Use        : Logical Field
        Modifies   : ItemImageCfg
		Table		: YesNoTable
		

[Variable: ItemImageCfg]

    Type        : Logical
	Default		: Yes
    Persistent  : Yes
	
[System: Variable]
	ItemImageCfg		: Yes
	
;;=========================IItem In InVoice print
 [#Part: EXPINV InvInfo]
;	 Add			: Line		: ImagePathLine
;	 Add			: Repeat	: ImagePathLine		: Inventory Entries
[#Line: EXPINV InvDetails]
	;Explode			: RightPart		: ##ItemImageCfg
	Add			: Field		: ImgePath
	
	
	[Field:ImgePath]
		Set as			: $ItemImagePath:Stockitem:$StockItemName+"\"+$ItemImage:Stockitem:$StockItemName
		;Act On Table Element	: @@IsSales	: Part Home	:


[Line:ImagePathLine]
	Explode		: ImagePathLine		: Yes
	Field		: Empty
	
[Part:ImagePathLine]
	Line		: Empty
	Print BG	: Red
	Graph Type	: $ItemImagePath:Stockitem:$StockItemName+"\"+$ItemImage:Stockitem:$StockItemName
	Background	: Red
	
;;===================================Voucher Creation


[Part:RightPart]
;	Lines		: Empty
;	Graph Type	: $ItemImagePath:Stockitem:$StockItemName+"\"+$ItemImage:Stockitem:$StockItemName

	Line		: Empty
	Image		: NewImg
	
[Line:Img]
	Field		: Img
	
[Field:Img]
	Set as		: "E:\tirlok\tdl files\vaara.bmp"
	
[Resource:NewImg]
	Source			: E:\tirlok\tdl files\vaara.bmp
	Resource Type	: BMP
	
	
[#Line:EiAccInfo]
	Border		: Thick Box

;;========================================================================


/*
;; Sri Ganeshji Maharaj : Sri Pitreshwarji Maharaj : Sri Balaji Maharaj

[#Form: Comprehensive Invoice]
Option: TlyTrng Invoice : @@IsSales

[#Form: Simple Printed Invoice]
Option: TlyTrng Invoice : @@IsSales

[!Form : TlyTrng Invoice]

Delete : Parts
Delete : Bottom Parts
Delete : PageBreak

Space Bottom : 0
Space Left : 0.25 inch
Space Right : 0
Height : 250 mms

Add : Parts : TlyTrng Invoice Top Part
Add : Parts : TlyTrng Invoice Title Part

Add : Parts : TlyTrng Invoice Body Part

Add : Parts : TlyTrng Invoice Center Part
Add : Bottom Parts : TlyTrng Invoice Bottom Part


[Part: TlyTrng Invoice Top Part] ;; ===================== Part 1 start

Lines : TlyTrng Name, TlyTrng CmpName, TlyTrng VCHDate, TlyTrng PartyName

[Line: TlyTrng Name]
Fields : TlyTrng Name
Space Bottom : 0.8

[Line: TlyTrng CmpName]
Fields : TlyTrng CmpName
Space Bottom : 0.8

[Field: TlyTrng Name]
Use : Name Field
Set as : "Invoice with Item Image"
FullWidth : Yes
Align : Centre
Style: Large Bold Italic
Print FG : @@SV_VCHCOLOR
Print BG : @@SV_VCHTYPE

[Field: TlyTrng CmpName]
Use : Name Field
Set as : @@CMPMailNAme
FullWidth : Yes
Align : Centre
Print FG : Blue
Style: Normal Bold Italic

[Line: TlyTrng VCHDate]
Fields : Short Prompt, TlyTrng VCHDate
Right Fields: Simple Prompt, TlyTrng VCHNo
Space Bottom : 0.2

Local: Field: Default : Print FG : @@SV_VCHCOLOR
Local: Field: Default : Print BG : Orchid

Local: Field: Short Prompt : Set as : "Invoice Date : "
Local: Field: Short Prompt : Style: Normal Bold Italic


Local: Field: Simple Prompt : Set as : "Invoice No : "
Local: Field: Simple Prompt : Style: Normal Bold Italic




[Field: TlyTrng VCHDate]
Use : Name Field
Set as : $Date



[Field: TlyTrng VCHNo]
Use : Name Field
Set as : $VoucherNumber


[Line: TlyTrng PartyName]
Fields : Short Prompt, TlyTrng PartyName
Space Bottom : 0.2

Local: Field: Short Prompt : Set as : "Party Name: "
Local: Field: Short Prompt : Print FG : @@SV_VCHCOLOR
Local: Field: Short Prompt : Print BG : @@SV_VCHTYPE

[Field: TlyTrng PartyName]
Use : Name Field
Set as : $PartyLedgerName
Print FG : @@SV_VCHCOLOR
Print BG : @@SV_VCHTYPE


[Part : TlyTrng Invoice Title Part] ;; ===================== Part 2 start
Line: TlyTrng Column Titles

[Line: TlyTrng Column Titles]
Use : TlyTrng IE Details

Local: Field: Default : Lines : 2
Local: Field: Default : Type : String
Local: Field: Default : Style : Normal Bold

Local: Field: Default : Print FG : Blue
Local: Field: Default : Print BG : Yellow Green
Local: Field: TlyTrng IE SrNo : Set as : "Sr No"
Local: Field: TlyTrng IE SiName : Set as : "Item Description "
Local: Field: TlyTrng IE HSN : Set as : "HSN/SAC"
Local: Field: TlyTrng IE Qty : Set as : "Qty"
Local: Field: TlyTrng IE Rate : Set as : "Rate"
Local: Field: TlyTrng IE Per : Set as : "Per"
Local: Field: TlyTrng IE Amount : Set as : "Amount"

Border : Column Titles


[Part: TlyTrng Invoice Body Part] ;; ===================== Part 3 start

Part: TlyTrng Body Title, TlyTrng Body Detail
Common Border: Yes
Vertical:yes

[Part: TlyTrng Body Title] ;; -----------------------Part 3-1 start
Lines : TlyTrng IE Details
Repeat : TlyTrng IE Details : Inventory Entries
Total : TlyTrng IE Qty, TlyTrng IE Discount, TlyTrng IE Amount

[Line: TlyTrng IE Details]
Fields : TlyTrng IE SrNo, TlyTrng IE SiName,
Right Fields : TlyTrng IE HSN, TlyTrng IE Qty, TlyTrng IE Rate, TlyTrng IE Per, TlyTrng IE Amount
Explode		: TlyTrng Body Detail	: Yes
[Field: TlyTrng IE SrNo]
Use : Short Name Field
Set as : $$Line
Border : Thin Left
Width : 5

[Field: TlyTrng IE SIName]
Use : Name Field
Set as : $StockItemName
Border : Thin Left
FullWIdth : Yes
Style : Normal

[Field: TlyTrng IE HSN]
Use : Name Field
Set as : $GSTHSNCode:StockItem:$StockItemName
Border : Thin Left
Align : Right
Width : 8

[Field: TlyTrng IE Qty]
Use : Number Field
Set as : $BilledQty
Border : Thin Left
Format : "NoSymbol"
Align : Right
Width : 6

[Field: TlyTrng IE Rate]
Use : Rate Price Field
Set as : $Rate
Border : Thin Left
Width : 6

[Field: TlyTrng IE Per]
Use : Rate Units Field
Width : @@VCHRateUnitsWidth
Style : Normal Bold
Storage : Rate
Skip On : @@HasInvSubAlloc OR $$IsEmpty:$BilledQty OR (NOT @@DoEditAll AND $$IsValidPriceLevel:$PriceLevel AND @@StdVchFldSkipCond)
SubForm : VCHFOREX Rate : @@HasMultiCurrencyRate
Inactive : $$IsEnd:$StockItemName OR @@NoBaseUnits
Option : VCH POSRateUnit : @@IsPOSInvoice
Border : Thin Left Right

[Field: TlyTrng IE Amount]
Use : Amount Field
Set as : $Amount
Border : Thin Left Right
Format : "NoComma, NoZero"
Width : 10


[Part: TlyTrng Body Detail] ;; -----------------------Part 3-2 start

Left Parts: TlyTrng Body Image Detail;, TlyTrng Body Desc Detail
Vertical: No
Height : 15 mms
Space Left: 12.5 mms

[Part: TlyTrng Body Image Detail] ;; ............... Part 3-2-1 start

Line : Empty
Print BG: Grey
Height: 15 mms
width : 20 mms
Border: Thin Top Bottom

Image : TlyTrngINVResource


[Resource: TlyTrngINVResource]
Source : E:\tirlok\tdl files\hard-disk.jpg;$StockItemImagepath:Company:##SVCurrentCompany+"\"+$stockitemname+".jpg"
;; Source : ##SALogoPath ;; ======= this is default tally logo path , only for testing
Resource Type :jpeg


[Part: TlyTrng Body Desc Detail] ;; ............... Part 3-2-2 start

Line: TlyTrng BDD Line
Height:15 mms
width:72 mms
Border: Thin Top Bottom
Print BG: Light Grey

[Line:TlyTrng BDD Line]
Field: TlyTrng BDD Field

[Field: TlyTrng BDD Field]
Set as : "User Description not Show in this Field" ;$UserDescription ;;$Description:StockItem:$StockItemName
Use : Name Field
Style : Normal Bold Italic
Print FG: Blue

[Part : TlyTrng Invoice Center Part] ;; ===================== Part 4 start
Scroll : Vertical
Common Border: Yes
Lines : TlyTrng IE Totl Details
Repeat : TlyTrng IE Totl Details : Ledger Entries
Scroll : Vertical

[Line: TlyTrng IE Totl Details]
Use : TlyTrng IE Details


Local: Field: TlyTrng IE SrNo : Set as : ""
Local: Field: TlyTrng IE SiName : Set as : $LedgerName
Local: Field: TlyTrng IE HSN : Set as : $GSTHSNCode:StockItem:$StockItemName
Local: Field: TlyTrng IE Qty : Set as : ""
Local: Field: TlyTrng IE Rate : Set as : $$String:$RateOfInvoiceTax + "%"
Local: Field: TlyTrng IE Per : Set as : ""
Local: Field: TlyTrng IE Amount : Set as : $Amount
Local: Field: TlyTrng IE SiName : Align : Right
Local: Field: TlyTrng IE Qty : Format : "NoZero"
Local: Field: TlyTrng IE Rate : Inactive : $RateOfInvoiceTax = 0
Local: Field: TlyTrng IE Rate : Type : String

Remove if : $LedgerName = $PartyLedgerName

[Part: TlyTrng Invoice Bottom Part] ;;; ===================== Part 5 start

Lines : TlyTrng Total Line, TlyTrng AmtInWords, TlyTrng ForCmp, TlyTrng AuthSign

[Line: TlyTrng Total Line]
Use : TlyTrng IE Details

Local: Field: Default : Style : Normal Bold

Local: Field: Default : Print FG : @@SV_VCHCOLOR
Local: Field: Default : Print BG : @@SV_VCHTYPE

Local: Field: TlyTrng IE SrNo : Set as : ""
Local: Field: TlyTrng IE SiName : Set as : "Totals"
Local: Field: TlyTrng IE Qty : Set as : $$Total:TlyTrngIEQty
Local: Field: TlyTrng IE Rate : Set as : ""
Local: Field: TlyTrng IE Amount : Set as : $$Total:TlyTrngIEAmount

Border : Totals

[Line: TlyTrng AmtInWords]
Fields : Short Prompt, TlyTrng AmtInWords
Local: Field: Short Prompt : Set as : "Amount in words : "

[Field: TlyTrng AmtInWords]
Use : Name Field
Set as : $$InWords:$Amount + " Only"
FullWidth : Yes
Style : Small

[Line: TlyTrng ForCmp]
Right Fields: TlyTrng ForCmp

[Field: TlyTrng ForCmp]
Use : Name Field
Set as : "For " + @@CMPMailNAme
Align : Right
Width : 0

[Line: TlyTrng AuthSign]
Right Fields: TlyTrng AuthSign
Space Top : 2

[Field: TlyTrng AuthSign]
Use : Name Field
Set as : "Authorised Signatory"
Width : 0
Align : Right

;; End-

[Color : Orchid]
RGB : 218,112,214

[Color : Yellow Green]
RGB : 154,205,50


*/


;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;


/*
[#Menu:gateway of tally]
Add :     Key Item        : "T : Item Retails Sales"            : T : Alter        : ItemList

[Report:ItemList]
    Form:ItemList
    Object:company
   
[Form:ItemList]
    Part:ItemList
    No Confirm:Yes
    Horizontal Align: Left
    On:Form Accept:Yes:Form Accept
    On:Form Accept:Yes:Display:ItemDisplay
       
[Part:ItemList]
    Line:ItemListTitle, ItemList
    Repeat:ItemList:ItemListVAL
    Break On:#ItemList = $$SysName:Endoflist
    Scroll:Vertical
   
[Line:ItemList title]
    Field:Sno, ItemList
    Local:Field:Sno:Info:"Sr No."
    Local:Field:ItemList:Info:"Select item list"
    Local:Field:default:Delete:Storage
    Border:column titles
   
[Line:ItemList]
    Field:Sno, ItemList
   
[Field:sno]
    Use:name field
    Set as:$$LocaleString:$$Line + "."
    Width:5
    Align:Right
    Space Right:1
    Skip:Yes
    Border:thin right
   
[Field:ItemList]
    Use:name field
    Table: ItemList,Endoflist
    Show Table: Always
    ;Storage:ItemList
    Width:28
	Unique	: yes

[System:UDF]
    ItemListVAL:Aggregate:11935
    ItemList:String:11931

[Collection:ItemList]
    Title: "Stock Item List"
    Sub Title: "Name", "Group", "Category", "StkItmName","Image"
    Type:Stockitem
    Fetch:*
    Align:Right
    Full Height:Yes
    Format: $stockitemname, 35
    Format: $parent, 15
    Format: $category, 20
    Format: $baseStkItmNames, 10
	Format: $ItemImagePath+"\"+$ItemImage, 20

;;===================================== Report ItemDisplay =======================================
[Report:ItemDisplay]
    Form:ItemDisplay
    Variable:svtodate, Svfromdate, ExplodeFlag
    Set: SVFromDate : $$CurrentDate - 7
    Set: SVtoDate : $$CurrentDate
    Set: Explode Flag : no

[Form:ItemDisplay]
    Top Part: ItemDisplay Heading, ItemDisplay titles
    Part: ItemDisplay Details
    Bottom Part: ItemDisplay Total;, Dev by
    Button: Change period, Explode Flag

;;--------------------------------------------------- Heading part
   
[Part:ItemDisplay Heading]
    Line:ItemDisplay Heading, DateLine
   
[Line:ItemDisplay Heading]
    Field:ItemDisplay Heading
   
[Field:ItemDisplay Heading]
    Field:Name field
    Local:Field:Name Field: Info:" ITEM RETAIL SALES "
    Local:Field:Name Field: Align:Center
    Local:Field:Name field: Wide Space: Yes
    Local:Field:Name field: Width:100% page
    Local:Field:Name field: Style:Normal bold
    Local:Field:name field: Local:Style:default:Height:12
   
[Line:Date line]
    Right Field: Date Field
   
[Field:Datefield]
    Use:Name field
    Set As : "Form " + $$String:##SVFromDate + " To " + $$String:##SVToDate

;;;------------------------ Title Part ---------------------------------

[Part:ItemDisplay Titles]
Line:ItemDisplay Titles

[Line:ItemDisplay Titles]
    Left Field: S no, ID List, Name field, ID Qty, ID PartyName, ID Parent
    Local:Field:S No            : Info        : "Sno"
    Local:Field:ID List            : Info        : "Items Name"
    Local:Field:name field        : Info        : "Sno"
    Local:Field:ID Qty            : Info        : "Qty"
    Local:Field:ID PartyName    : Info        : "Party"
    Local:Field:ID Parent        : Info        : "Market"
;    Local:Field:S No            : Width        : 5% screen
    Local:Field:name field        : Width        : 5% screen

    Border: Column Titles

[Part:ItemDisplay Details]
    Part:ItemDisplaylist, ItemDisplay Values
   
[Part:ItemDisplaylist]
    Line            : ItemDisplay List
    Repeat            : ItemDisplay List    : IDColl
    Break On        : $$IsEmpty:#ItemDisplayName
    Scroll            : Vertical
    Common Border    : Yes
   
[Collection:IDColl]
    Type:ItemListVAL:company
    Child Of:##SVCurrentCompany
   
[Line:ItemDisplay List]
    Field:S no, ID List
   
[Field: ID List]
    Use        : Name Field
    Set as    : $ItemList
    Width    : 30% Page
    Border    : thin right
    Indent    : 2
   
;;-------------------------------------------------------

[Part: ItemDisplayValues]
    Line:ItemDisplayValues
    Repeat:ItemDisplayValues: IDV COll
    Scroll: Vertical
   
[Line:ItemDisplayValues]
    Field: Sno, ID StkItmName, ID Qty, ID PartyName, ID Parent

[Field:ID StkItmName]
    Use        : StkItmName Field
    Set as    : $StkItmName
    Width    : 15% Page
    Style    : Normal

[Field:ID Qty]
    Use        : number Field
    Set as    : $qty
    Width    : 7.5% Page
    Style    : Normal
   
[Field:ID PartyName]
    Use:Name field
    Set as    : $name
    Width    : 25% page

[Field:ID Parent]
    Use        : Name Field
    Set as    : $parent:ledger:#IDPrtName
    Width    : 10% Page

[Collection: IDV Main Coll]
    Type: Vouchers:vouchertype
    Child Of: $$VchTypeSales
    Belongs To: Yes
    Fetch: *
   
[Collection:IDV Coll]
    Source Collection:IDV Main Coll
    Walk        : All Inventory Entries
    By: name     : $partyledgername
    By: StkItmName    : $Stockitemname
    Aggr Compute: qty : Sum:$billedqty
    Fetch        : stockitemname, partyledgername, billedqty , baseStkItmNames
;    Filter        : ID Filter
   
[System:Formulae]
    ID Filter : $stockitemname = $Itemlist
    ;$(Company,##svcurrentcompany).ItemListVal[1].stockitemname
    ;Contains #IDList

[Part:ItemDisplay Total]
    Line        : ItemDisplay Total

[Line: ItemDisplay Total]
    left Field:Short prompt, ItemDisplay Total
    Local:Field:Short Prompt : Info: "Total :"
    Local:Field:Short Prompt : Space Left: 5
    Local:Field:Short Prompt : Width: 10
    Border: Totals
   
[Field:ItemDisplay Total]
    Use:Number field
    Set as: 123
    Width: 15% page
    Style:Normal
    Space Left: 2
    Format: "No Zero, decimal : 2"
    Align: Left
*/
















;;=================================================




```
