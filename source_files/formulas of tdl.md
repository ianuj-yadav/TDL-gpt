---
title: formulas of tdl
type: sample_code
objects: Form
source: formulas of tdl.txt
---

# formulas of tdl

## Source Code

```tdl
;; Sri Ganeshji : Sri Balaji : Sri Pitreshwarji : Sri Durgaji : Sri Venkateshwara

[System: Formula]              ;; Std Sizes and other global formulae
                               ;; suited for 640x480 resolution

    ShortWidth          : 10
    MediumWidth         : 20
    LongWidth           : 30
	InfoWidth			: 2
	SubHeaderWidth		: 9

    NameWidth           : 23
    ShortNameWidth      : 15
    TrackingWidth       : 8
    SymWidth            : 6
    LogicalWidth        : If $$IsUnicodeSupported then 6 else 3
    CompoundSymWidth    : 14
    ShortDateWidth      : if NOT $$InPixelMode then 11 else 7
    DueDateWidth        : 7
    NumberWidth         : if NOT $$InPixelMode then 7 else 8
    AmountWidth         : if NOT $$InPixelMode then 18 else 12
    FullQtyWidth        : if NOT $$InPixelMode then 15 else 12
    QtyWidth            : if NOT $$InPixelMode then 15 else 8
    CompactQtyWidth     : if NOT $$InPixelMode then 10 else 6
    RateWidth           : if NOT $$InPixelMode then 9 else 8
    CompactRateWidth    : if NOT $$InPixelMode then 9 else 5
    UnitsWidth          : 3
    NarrWidth           : 40
	OutputConfigWidth   : 40

    MaxNarrWidth        : 251
    MaxNameWidth        : 51
    MaxNumberWidth      : 31
    MaxSymWidth         : 15
    MaxLogicalWidth     : 5
    VCHDateWidth		: If NOT $$InPixelMode then 13 else 9

	;for explodes
    IndentByLevel       : 2 + ($$ExplodeLevel * 2)

    FlagExplode         : ##ExplodeFlag AND (($$IsEmpty:$$ExplodeLevel) OR ##ExplodeAllLevels)
    Explodable          : $$KeyExplode OR @@FlagExplode
    NextExplodable      : $$KeyExplode OR (##ExplodeFlag AND (($$ExplodeLevel = 1) OR ##ExplodeAllLevels))
	
	ParticularsWidth	: if ##SVExport then 30 else 0
	
	;for printing
    PageNoFormat		: $$LocaleString:"(Page  %s)"										;;; eg. Page 10
    PageNoFormula		: $$String:$$PageNo
	ExtraPageNo 		: if $$PageNo = 1 then "" else $$Sprintf:@@PageNoFormat:@@PageNoFormula
    PagePartNoFormat	: $$LocaleString:"Page %s %s"										;;; Page 10 (Part No)	

							  
    ActualStr       	: $$LocaleString:"Actuals"

    EnglishLanguageId   : 1033  ;; 1033(0x0409) is English Language Id	
	
	;;Formats
    AddressFromFormat		: $$LocaleString:"From" + ":"
    AddressToFormat			: $$LocaleString:"To" + ":"
    Particulars         	: $$LocaleString:"Particulars"
    DuplicateEntry      	: $$LocaleString:"Name already exists.\n Enter a different name."	
	DuplicateEntryErrObjStr	: $$LocaleString:"A master with same name exists \n as an exception.\n\n Resolve the exception from\n Data > All Exceptions.\nAlternatively, delete the existing master\n and try again."      	
    BeginsAtFormat			: $$LocaleString:" (begins at  %s )"								;;; Begins at Page No
    RequestImportDataString	: "Type:Import Data"
    HTTPContentTypeAscii	: "Content-type: text/xml; charset=utf-8"
	

    ;;Formats for From/To
    DateFromFormat	            : $$LocaleString:"From" + ":"
    DateToFormat	            : $$LocaleString:"To" + ":"	
	ToDateFormat				: $$LocaleString:"%s to %s"
	
    OutputActionFormat			: "%s %s"														   ;;; Example: Printing ListOfAccount
	OutputActionConfig			: "%s %s Configuration"
	SeparatorStrFormat			: "%s/%s"
	CmpStatVersion	  			: $StatutoryVersion:Company:$$CurrentCompany ;; New Stat version which needs to be created is 


	;; Max Attribute Values Country Wise -(Income Tax Number (PAN) / Labour Card Number / NI Number etc)
	MaxCountryWise				: If @@IsIndia Then 10 Else +
									If @@IsCountryUAE Then 14 Else +
									51
									
	ExplodeStr  				: if ##ExplodeFlag then $$LocaleString:"Detailed" else $$LocaleString:"Condensed"
	PymntReconTitle				: $$LocaleString:"Show All"
	NoteColor					: "DeeperGrey"
	locTotal					: $$LocaleString:"Total"

	FetchMasterMethods			: ##IsRangeApplied
	FetchVoucherMethods			: ##DBFilterVar OR ##IsRangeApplied
	
;;Formulae for Table Configuration Template
[System: Formulae]
	
	TabularCfgSpaceTop		: 0.5
    TabularCfgSpaceBottom	: 0.5
    TabularCfgSpaceLeft		: 0.75
    TabularCfgSpaceRight	: 0.75
	TableTitleSpaceBottom	: 0.5
	TableItemValue			: $Value
	ValueExistsString		: $$LocaleString:"<Value exists>"
	ValueExistsSymbol		: $$StrByCharCode:8230
	MSTTriggerWidth			: 30
	
[System: Formulae]
	
	;; Universal Date Format Configuration
	UniDateYYYYAlways			: $$SysName:UniDateYYYYAlways	
	UniDateYY20					: $$SysName:UniDateYY20
	UniDateYY19					: $$SysName:UniDateYY19

;*************** Infowin Keys **************; 		
[System: Formula]
	
	;TallyURL                : "www.tallysolutions.com/index.shtml"
	TallyURL                : "http://www.tallysolutions.com/website/html/index.php?utm_source=productbutton&utm_medium=tallyerp9&utm_campaign=default"
	ProductURL              : If $$IsProdTallyServer Then @@TallyServerInfoURL ELSE @@TallyInfoURL
	TallyInfoURL            : "http://www.tallysolutions.com/website/html/tallyerp9/tallyerp9-topics.php"	
	TallyServerInfoURL      : "http://www.tallysolutions.com/website/html/tallyserver9/tallyserver9.php"	

	

;; Formulae for States 
[System: Formulae]
	
	State1	: $$SysName:AndamanNicobarIslands
	State2	: $$SysName:AndhraPradesh
	State3	: $$SysName:ArunachalPradesh
	State4	: $$SysName:Assam
	State5	: $$SysName:Bihar
	State6	: $$SysName:Chandigarh
	State7	: $$SysName:Chhattisgarh
	State8	: $$SysName:DadraNagarHaveli
	State9	: $$SysName:DamanDiu
	State10	: $$SysName:Delhi
	State11	: $$SysName:Goa
	State12	: $$SysName:Gujarat
	State13	: $$SysName:Haryana
	State14	: $$SysName:HimachalPradesh
	State15	: $$SysName:JammuKashmir
	State16	: $$SysName:Jharkhand
	State17	: $$SysName:Karnataka
	State18	: $$SysName:Kerala
	State19	: $$SysName:Lakshadweep
	State20	: $$SysName:MadhyaPradesh
	State21	: $$SysName:Maharashtra
	State22	: $$SysName:Manipur
	State23	: $$SysName:Meghalaya
	State24	: $$SysName:Mizoram
	State25	: $$SysName:Nagaland
	State26	: $$SysName:Odisha
	State27	: $$SysName:Puducherry
 	State28	: $$SysName:Punjab
	State29	: $$SysName:Rajasthan
	State30	: $$SysName:Sikkim
	State31	: $$SysName:TamilNadu
	State32 : $$SysName:Telangana
	State33	: $$SysName:Tripura
	State34	: $$SysName:Uttarakhand
	State35	: $$SysName:UttarPradesh
	State36	: $$SysName:WestBengal
    State37	: $$SysName:Ladakh
	State38	: $$SysName:DadraNagarHaveliDamanDiu


	
;; Used in App title bar
[System: Formula]

	SV_TITLE_BAR_PRODUCT_STR		 : "TallyPrime"
	SV_TITLE_BAR_PRODUCT_SUB_STR	 : "Edit Log"
	SV_TITLE_BAR_BTN_MGMT_STR   	 : $$LocaleString:"MANAGE"
	SV_TITLE_BAR_LEADING_PADDING	 : "8% screen"
	SV_TITLE_BAR_LEADING_GAP		 : "0.6% screen"
	SV_LICENSE_TRIAL			     : $$LicenseInfo:IsEducationalMode
	SV_LICENSE_SILVER				 : $$ProdInfo:ProdFlavour = 1
	SV_LICENSE_GOLD					 : $$ProdInfo:ProdFlavour = 2
	SV_LICENSE_TRIAL_STR			 : If $$IsProdTallyServer Then $$LocaleString:"Server (EDU)" ELSE $$LocaleString:"EDU"
	SV_LICENSE_SILVER_STR		 	 : If $$IsProdTallyServer Then $$LocaleString:"Server" ELSE $$LocaleString:"SILVER"
	SV_LICENSE_GOLD_STR  			 : If $$IsProdTallyServer Then $$LocaleString:"Server" ELSE $$LocaleString:"GOLD"

;;File folder selection formulae
[System: Formulae]

	NotHiddenFolders		: NOT @@HiddenFolders
	NotSystemFolders		: NOT @@SystemFolders
	NotMigReqFolders		: $$StringLength:$CmpNumStr > 5	AND $CmpStatus NOT IN ("Migration Required", "Migration in Progress", "Continue Migration")
	NotMigReqCompany		: If $IsCompany Then @@NotMigReqFolders Else Yes
	
	/* @@IsSysNameUp check is added in these two filter. Because in some directory "Path to parent directory is hidden in windows 11" */
	HiddenFolders			: $IsHidden AND NOT @@IsSysNameUp
	SystemFolders			: $IsSystem AND NOT @@IsSysNameUp
	
	RootName				: $$SysName:Root
	PathDependencyFilter	: ##vCurrentPath != ""

	FileFolderFormat		: If $$IsSysName:$Name OR ($$IsSysNameEqual:Root:($$GetParentDirectory:$Path)) Then "" Else If $IsDirectory Then $$LocaleString:"Folder" Else "File"
	FolderFormatForNonRoot	: If $$IsSysName:$Name Then "" Else If $IsDirectory Then $$LocaleString:"Folder" Else "File"
	TableFolderFormat    	: IF @@IsDataFolderPath Then @@FileFolderFormat Else @@FolderFormatForNonRoot 
	IsDataFolderPath		: $$IsSysNameEqual:Root:##vDataFolderPath


	TableDefaultCursor		: NOT $$IsSysName:$Name AND NOT $$IsLabelObject AND NOT $$IsActionObject

	FileTableDefaultCursor	: If $$NumItems:FileSelectionTableForCount = 1 Then @@IsSysNameUp Else @@TableDefaultCursor
	IsSysNameUp				: ($$IsSysNameEqual:Up:$Name)

	NonXMLFiles				: If ##ShowMore OR $IsDirectory OR @@IsSysNameUp Then @@HiddenFolders Else ($FileExtension NOT IN ("xml", "txt") OR $IsHidden)
	NonExcelFiles			: If ##ShowMore OR $IsDirectory OR @@IsSysNameUp Then @@HiddenFolders Else ($FileExtension NOT IN ("xlsx", "xls") OR $IsHidden)
	NonImgFiles				: (If ##ShowMore OR $IsDirectory OR @@IsSysNameUp Then @@HiddenFolders Else +
								If NOT $$IsEmpty:##vCurrentFile AND ##vCurrentFile = $Name Then No Else ($FileExtension NOT IN ("bmp", "jpg", "jpeg") OR $IsHidden)) 
	
	ValidXMLFilesFolders	: If ##ShowMore Then Yes Else If $IsDirectory Then Yes Else $FileExtension IN ("xml", "txt")
	ValidExcelFilesFolders	: If ##ShowMore Then Yes Else If $IsDirectory Then Yes Else $FileExtension IN ("xlsx", "xls")
	ValidImgFilesFolders	: If $IsDirectory Then Yes Else $FileExtension IN ("bmp", "jpg", "jpeg")

	SelectVchrStr			: $$LocaleString:"Type of Voucher entries"
	TransactionsOptionTitle	: $$LocaleString:"Transaction Options"
	ExcludeOrderVchrs		: $$LocaleString:"Exclude order vouchers"

	locTransTitle			: If $$IsSysNameEqual:AllItems:##VoucherTypeName Then "" Else +
								If ($$IsEmpty:##VoucherTypeName AND ##OnlyAccVouchers) Then "Accounting" Else +
								If ($$IsEmpty:##VoucherTypeName AND ##OnlyInvVouchers) Then "Inventory" Else ##VoucherTypeName

    NoAccessAllowedMsg		: $$LocaleString:"No Access \n Allowed !"
	
	IncorrectPathMsg		: $$LocaleString:"Incorrect File/Folder Path !"
	
	IsActiveObj				: $IsActive AND NOT @@IsCurrPathRoot
	
	IsCurrPathRoot			: ($$IsSysNameEqual:Root:##vCurrentPath)
	
	BankStatementPath		: $$LocaleString:"Folder Path for Bank Statements"

;	GTReportDisplayAccess	: $$IsFamilyAllowed:CreateAlter
	GTReportDisplayAccess	: $$IsFamilyAllowed:Display
	GTReportOutputAccess	: $$IsFamilyAllowed:Print

;;; Used in change view, Basus of Values templates
[System: Formula]

	PreviousTitle				: $$LocaleString:($$ContextKeyword:Yes:No)
	ParentReportTitle			: If $$IsVoucher Then $$Sprintf:"%s Voucher":@@BaseVchType Else @@PreviousTitle
	BaseVchType					: $$GetVchBaseType:##SVVoucherType

	BasisOfValues				: $$LocaleString:"Basis of Values"
	ChangeView					: $$LocaleString:"Change View"
	MultiMasters				: $$LocaleString:"Multi-Masters"
	ExceptionsTitle				: $$LocaleString:"Exception Reports"
	
	ButtonExplodeString			: If ##ExplodeFlag Then $$LocaleString:"Condensed" Else $$LocaleString:"Detailed"
	
	MoreDtlsValueExsits			: $$LocaleString:"<Value exists>"
	PreDefinedTextValue			: $$Sprintf:("< %s %s >"):@@PreDefinedTextCount:@@PreDefinedText
	MailProfileTextValue		: $$Sprintf:("< %s %s >"):@@MailProfileCount:@@PreDefinedText
	PreDefinedText				: ($$LocaleString:"defined")
	PreDefinedTextCount			: ($$NumItems:EmailAdditionalText)
	MailProfileCount			: ($$NumItems:EmailProfile)
	IsViewTitle					: $$Type = "ViewTitle"
	IsRelReportTitle			: $$Type = "RelatedReportsTitle"
	
	IsValidGeoCmpLoaded			: $GeoApplicable
	IsActionApplicable			: $ActionFilter
	IsReportViewApplicable		: $IsViewApplicable
	ViewNameValue				: If $$IsEmpty:$ViewName Then $Name Else $ViewName
	
	IsTADSExists				: $$IsValidTSEndPointPath:$$Value
	;;	$Name will contain alongwith its Server Name when more than one server end points are found with same name. For Example, Data:TallyServer1, Data:TallyServer2, Data:TallyServer3, ...
	;;	When the user types TS data point including hidden data, the name will be displayed as the data point when one server only exists, other wise it will be displayed as <datapointname:ServerName>
	;;	For example data: for one server, Data:TallyServer1, Data:TallyServer2, for more than one server.
	;;	Here $$StringwordEx function is used extract the data point name from $Name and added ":" to identify the path is TSPath
	HasTADSPoint				: @@DataPointName = $$Value
	
	FolderSelectionTitle		: $$LocaleString:"List of Folders"

	AllowAllMastersImp			: ($$GlobalAllow:Create:AccountsMasters:$$CurrentSimpleCompany AND +
									$$GlobalAllow:Create:InventoryMasters:$$CurrentSimpleCompany AND $$GlobalAllow:Access:ImportData:$$CurrentSimpleCompany AND +
									$$GlobalAllow:Create:PayrollMasters:$$CurrentSimpleCompany AND $$GlobalAllow:Create:StatutoryMasters:$$CurrentSimpleCompany)

	AllowAllMastersExp			: ($$GlobalAllow:Create:AccountsMasters:$$CurrentSimpleCompany AND $$GlobalAllow:Create:InventoryMasters:$$CurrentSimpleCompany AND +
									$$GlobalAllow:Create:PayrollMasters:$$CurrentSimpleCompany AND $$GlobalAllow:Create:StatutoryMasters:$$CurrentSimpleCompany)  +
									OR ($$GlobalAllow:Alter:AccountsMasters:$$CurrentSimpleCompany AND $$GlobalAllow:Alter:InventoryMasters:$$CurrentSimpleCompany AND +
									$$GlobalAllow:Alter:PayrollMasters:$$CurrentSimpleCompany AND $$GlobalAllow:Alter:StatutoryMasters:$$CurrentSimpleCompany) +
									OR ($$GlobalAllow:Display:AccountsMasters:$$CurrentSimpleCompany AND $$GlobalAllow:Display:InventoryMasters:$$CurrentSimpleCompany AND +
									$$GlobalAllow:Display:PayrollMasters:$$CurrentSimpleCompany AND $$GlobalAllow:Display:StatutoryMasters:$$CurrentSimpleCompany)

;; Common Formula used in Vouchers
[System: Formula]

    IsTraderSVCommercialInvoice	: $$ClassLogicalValue:##SVVoucherType:##SVClass:$UseForExciseCommercialInvoice
	
[System: Formula]

	/* Multi Address */
	IsMultiAddressOn			: $IsMultiAddressOn:Company:##SVCurrentCompany
	
	PrintAddressType			: If @@IsMultiAddressOn Then +
									If @@IsIndianGSTOn Then +
									  If NOT $$IsEmpty:$GSTAddressName:Taxunit:##VchGSTRegistration Then $GSTAddressName:Taxunit:##VchGSTRegistration Else $$SysName:Primary +
									Else ##SVAddressToPrint +
								  Else $$SysName:Primary

	/* Used in Button */
	ButtonShutCmpString 		: $$LocaleString:"Shut Company"

	/* Used in VAT */
	IsUAEVATOn					: @@IsUAECountry AND ($IsSalesTaxOn:Company:##SVCurrentCompany)

	IsUAECountry				: $$IsSysNameEqual:UAE:@@CountryName
	IsKSACountry         		: $$IsSysNameEqual:KSA:@@CountryName
	IsOmanCountryCmp     	 	: $$IsSysNameEqual:CountrySultanateofOman:@@CountryName OR $$IsSysNameEqual:CountryOman:@@CountryName
	IsIndonesiaCountry        	: $$IsSysNameEqual:CountryIndonesia:@@CountryName


	IsOnlyIndonesianVAT   		: @@IsIndonesiaVAT AND $IsSalesTaxOn:Company:##SVCurrentCompany
	IsIndonesiaVat        		: $$IsSysNameEqual:CountryIndonesia:@@CountryName

	/* Used in Payroll */
	IsOnlyPFESIPaymentChallan 	: @@IsPFPaymentChallan OR @@IsESIPaymentChallan

	/* Checking for ESI or PF */
	IsPFPaymentChallan			: $$IsSysNameEqual:PFChallan:$$Owner:$ChallanType 
	IsESIPaymentChallan			: $$IsSysNameEqual:ESIChallan:$$Owner:$ChallanType
	IsITPaymentChallan			: $$IsSysNameEqual:ITChallan:$$Owner:$ChallanType


/*Used in multiple module */

	IsCompany           	: $Name = ##SVCurrentCompany
    pwdchangeNotAllowed 	: $$LocaleString:"You do not have the permissions to change/alter the Password, as per the Password Policy set by your Administrator."
	NotifyIsSamePwd			: $$LocaleString:"New Password and Confirm New Password do not match."
		
/*Below formulas used in [Form: Company Action Template] which is used in multiple modules, rewrite, migrate etc*/
	CmpNavFormSpaceBottom	: 0.5
	CmpNavFormSpaceLeft		: 1
	CmpNavFormSpaceRight	: 1
	CmpNavFormSpaceTop		: 0.5
	

/*Used in Top menu, voucher and reports etc*/
	SALogoPathExist			: If $$IsEmpty:@@SALogoPath then $$LocaleString:"Logo path cannot be empty." +
							  Else If NOT $$IsFileExists:@@SALogoPath Then $$LocaleString:"Logo path specified is invalid or file not found." +
								   Else If $$FileSize:@@SALogoPath > 1048577 Then "File size exceeds 1 MB." +
									    Else $$LocaleString:"Format Not Supported"
	

	
	

	
	

	
	GSTINLedStateName	: If NOT $$IsSysNameEqual:NotApplicable:@@GSTLedPlaceOfSupply Then $$getGSTStateCode:@@GSTLedPlaceOfSupply + @@GSTINExample Else $$LocaleString:"29AAAAA1234A1Z0"
    GSTLedPlaceOfSupply : If $IsOthTerritoryAssessee Then $$SysName:GSTOtherTerritory Else $LedStateName
	GSTINExample		: $$LocaleString:"AAAAA1234A1Z0"
    GSTLadakhStateCode  : "38"

;;Company operations related system formulae	
[System: Formula]

	IsCompanySecurityOn			: If $$SelectedCmps > 1 Then $IsSecurityOn:Company:@@CurrentCmpName Else @@IsCmpSecurityEnabled
	IsCmpSecurityEnabled		: $IsSecurityOn:Company:##SVCurrentCompany
	CurrentCmpName				: If $$IsEmpty:##CompanyName Then $$CurrentSimpleCompany Else ##CompanyName
	AllowCMPOperations			: NOT ($$IsCompany OR $$IsSubReport OR $$IsAutoReport) 
	IsCmpOwnerLoggedIn			: $IsUserOwner
	IsCmpOwner					: $$IsCmpOwnerEx:$Name	
	IsCmpConnected				: $$IsCompanyConnectedForBrowserAccess:$Name OR $$IsCompanyConnectedForRemoteAccess:$Name
	IsAnyCmpConnected			: $$IsCompanyConnectedForBrowserAccess OR $$IsCompanyConnectedForRemoteAccess
	
	locClientServerConfig		: $$LocaleString:"Client/Server configuration"
	IsEditLogEnabled			: $$IsEditLogOn:$$CurrentSimpleCompany
	SingleEditLogCompany		: If $$NumItems:CompanyEditLogOperations>1 Then "" Else $$CollectionField:$Name:1:CompanyEditLogOperations
	IsOriginalCmpChanged		: (NOT $$IsEqual:$$OriginalCompany:$$CurrentCompany)

;; Report Save Formulae
[System: Formulae]

	SaveViewApplicable	: $$InDisplayMode

	DefaultView			: $$LocaleString:"Set/Alter Default View"
	DeleteView			: $$LocaleString:"Delete Saved View"

	IsSavedViewTitle	: $$Type = "SavedViewTitle"
	IsAppViewTitle		: $$Type = "ApplicationTitle"
	IsCmpViewTitle		: $$Type = "CompanyTitle"

	GotoLocationFormat	: $$Sprintf:"%s (%s)":@@SaveViewReportTitle:@@SavedLocation
	SaveViewReportTitle	: $$MakeEllipsis:$ReportTitle:@@EllipsisLimit
	SavedLocation		: (If $IsApplicationView Then @@AppLevelView Else @@CompanyLevelView)

	SaveViewTitleName	: $Name
	
	;; The below formula is used to identify the current report's name in order to evaluate the count of the saved views
	;; from current report to activate the change view button if it is initially inactive. 
	IsCurrRptHasViews	: @@CurrentDescName = $ConfigTypeName
	
	;; The Variable ##ParentReportName gathers the parent report's definition name. This formula is used in the collection
	;; to list out company and application views for the desired report.
	IsParentRptHasViews	: ##ParentReportName = $ConfigTypeName
	
	CurrentDescName		: ($$ContextKeyword:No:Yes)

	IsChangeViewDisabled: NOT $$IsAnyViewFound:@@CurrentDescName

	IsStandAloneReport	: $IsStandAloneReport
	ViewCreatedBy		: ""
	
	HasSyncDataErrors		: $$HasDataErrors:@@SyncActivityType
	HasImpDataErrors		: $$HasDataErrors:@@ImportActivityType
	HasRepairMigDataErrors	: ($$HasDataErrors:@@MigActivityType OR $$HasDataErrors:@@RepairActivityType)

	;; Import GSTR Data
	IsGSTRDataImpMenuActive		: ($$HasTaxUnitByRegType:($$SysName:Regular) OR $$HasTaxUnitByRegType:($$SysName:GSTRegularSEZ)) AND ($$GlobalAllow:Display:GSTReturns:$$CurrentSimpleCompany) +
									AND ($$GlobalAllow:Create:Vouchers:$$CurrentSimpleCompany OR $$GlobalAllow:Alter:Vouchers:$$CurrentSimpleCompany)
									
	IsGSTExchangeLoginAppl		: NOT ($$IsEmpty:$$SelectedCmps OR $$IsRemoteCompany) AND ($$Allow:Create:Vouchers OR $$Allow:Alter:Vouchers OR $$Allow:Display:GSTReturns)  +
													AND (@@IsGSTeWayBillApplMenu OR @@IsGSTeInvoiceApplCmpMenu)

	MST PartyName					: "Party"
	MST BuyerName					: "Buyer"
	MST Group						: $$SysName:Group
	MST Ledger						: $$SysName:Ledger
	MST StockItem					: $$SysName:StockItem
	MST StockGroup					: $$SysName:StockGroup
	MST VoucherType					: $$SysName:VoucherType
	MST Stock Category				: $$SysName:StockCategory
	MST CostCentre					: $$SysName:CostCentre
	MST CostCategory				: $$SysName:CostCategory
	MST Godown						: $$SysName:Godown
	MST Employee					: $$SysName:Employee
	MST UQC							: "UQC"

	MST GSTR1						: "GSTR1"
	MST GSTR2						: "GSTR2"
	MST OtherGSTR					: "OtherGSTR"
	RangeFilter						: $$SysName:RangeFilter
	ValueFilter						: $$SysName:ValueFilter

;;End of File

```
