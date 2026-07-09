---
title: Replace Ledger And Stock Item Learnwell
type: sample_code
objects: Report, Form, Part, Line, Field, Collection, Function, Button
source: Replace Ledger And Stock Item Learnwell.txt
---

# Replace Ledger And Stock Item Learnwell

## Source Code

```tdl


[#Form: Day Book]
	Add: Button: After : DSPShowGP : RBCRPLCBTNDB

[#Report: Day Book]
	Variable:  vRBCRplcSource

[#Form: Ledger Vouchers]
	Add	: Button	: After	: ChangeCompany : RBCRPLCBTNLD
    Set: vRbcOldLedName: #LedgerName

[#Report: Ledger Vouchers]	
	Variable:  vRBCRplcSource

[#Form: Stock Vouchers]
	Add	: Button	: After	: ChangeCompany : RBCRPLCBTNST
    Set: vRbcOldItemName: #StockItemName

[#Report:  Stock Vouchers]	
	Variable:  vRBCRplcSource
	
	
[Button:  RBCRPLCBTNDB]
	Title: "Replace Ledger"
	Key: Ctrl+R
	Action List     : RBCRPLCDayBk, RBCRPLCDayBkRep

[Key: RBCRPLCDayBk]
	Key: Ctrl + R
	Action: Set: vRBCRplcSource : "DayBook"

[Key: RBCRPLCDayBkRep]
	Key: Ctrl + R
	Action: Execute : RBCAlterVoucherReport

[Button:  RBCRPLCBTNLD]
	Title: "Replace Ledger"
	Key: Ctrl+L
	Action List     : RBCRPLCLed,RBCRPLCSetLed, RBCRPLCLedExe
	
	
[Key: RBCRPLCLed]
	Key: Ctrl+L
	Action: Set: vRBCRplcSource : "Ledger"

[Key: RBCRPLCSetLed]
	Key: Ctrl+L
	Action: Set: vRBCSelectedType : "Ledger"
	
[Button:  RBCRPLCBTNST]
	Title: "Replace Item"
	Key: Ctrl+L
	 Action List     : RBCRPLCItem,RBCRPLCSetItem, RBCRPLCLedExe
	
[Key: RBCRPLCItem]
	Key: Ctrl+L
	Action: Set: vRBCRplcSource : "Stock Item"
		
[Key: RBCRPLCSetItem]
	Key: Ctrl+S
	Action: Set: vRBCSelectedType : "Stock Item"
	
[Key: RBCRPLCLedExe]
	Key: Ctrl+L
	Action: Execute : RBCAlterVoucherReport
	
	
;; SOURCE COLLECTION EXPECTED TO BE USED BY DAY BOOK REPORT OF TALLY


[Report: RBCAlterVoucherReport]
	
	Form		: RBCAlterVoucherForm
	Variable	: SVFromDate, SVToDate

	Title		: "Replace Selected Ledger Here"
	

[Form: RBCAlterVoucherForm]
	
	Width	: 50% Screen
	Height	: 40% Screen
	Top Part	:  RBCRPLCLSELECTPart
	Part	: RBCRPLCLEDPart
	Bottom Part : RBCRPLCSTKPart
	Local	: Field	: RBCRPLCLEDField	: Modifies	: vRbcOldLedName	: Yes
	Local	: Field	: RBCRPLCLEDField	: Variable	: vRbcOldLedName	
	Local	: Field	: RBCRPLCNEWLEDField: Modifies	: vRbcNewLedName	: Yes
	Local	: Field	: RBCRPLCNEWLEDField: Variable	: vRbcNewLedName
	Local	: Field	: RBCRPLCITEMField	: Modifies	: vRbcOldItemName	: Yes
	Local	: Field	: RBCRPLCITEMField	: Variable	: vRbcOldItemName	
	Local	: Field	: RBCRPLCNEWITEMField: Modifies	: vRbcNewItemName	: Yes
	Local	: Field	: RBCRPLCNEWITEMField: Variable	: vRbcNewItemName
	Local	: Field	: RBCRPLCSELField	: Modifies	: vRBCSelectedType : Yes
	Local	: Field	: RBCRPLCSELField	:Variable	: vRBCSelectedType
	
	Set		: SVFromDate : ##SVFromDate	
	Set		: SVToDate 	 : ##SVToDate		
	On		: Form Accept: Yes: Call: RBCAlterSelectedVchrs
	
[Part	: RBCRPLCLSELECTPart]
	Lines	: RBCRPLCSELLine1
	Space Top	: 1
	
[Part	: RBCRPLCLEDPart]
	Lines	: RBCRPLCLEDLine1, RBCRPLCLEDLine2
	Space Bottom	: 1
	Invisible	:  ##vRBCSelectedType ="Stock Item"
	
[Part	: RBCRPLCSTKPart]
	Lines	: RBCRPLCItemLine1, RBCRPLCItemLine2
	Space Bottom	: 1
	Invisible	: ##vRBCSelectedType = "Ledger"  OR $$NumItems:RBCStockItemVouchers <=0
	
	[Line		: RBCRPLCSELLine1]
		Field  	: Long Prompt, RBCRPLCSELField, 
		Local   : Field   : Long Prompt	: Info 	: $$LocaleString:"Replace:"
		Space Bottom	: 1
		Space Top	: 1
		
	[Line		: RBCRPLCLEDLine1]
		Field  	: Long Prompt	, RBCRPLCLEDField, 
		Local   : Field   : Long Prompt	: Info 	: $$LocaleString:"Select Ledger to be replaced:"
		Space Bottom	: 1
		Space Top	: 1
		
	[Line		: RBCRPLCLEDLine2]
		Right Fields	: Long Prompt	, RBCRPLCNEWLEDField
		Local  		: Field   : Long	Prompt: Info 		: $$LocaleString:"New Ledger:"
		Space Bottom	: 1
	
	[Field	:RBCRPLCSELField]
		Use			 	: Short Name Field
		Table			: ListOfRBCSelect
		Set as			: ##vRBCSelectedType
		Modifies		: vRBCSelectedType
		Variable		: vRBCSelectedType
		Set Always		: YEs 
		Show Table		: Always
		
	[Field		: RBCRPLCLEDField]
		Use			 	: Name Field
		Table			: ListOfLedgers,EndOfList
		Show Table		: Always
		Set as			: ##vRbcOldLedName
		Modifies		: vRbcOldLedName
		Variable		: vRbcOldLedName
		Set Always		: if #RBCRPLCSELField = "Ledger" or ##vRBCSelectedType = "Both" then Yes else No 
		Width        	: @@NarrWidth
		;Skip			: if (##vRBCRplcSource = "Ledger") then yes else no 

	[Field			: RBCRPLCNEWLEDField]
		Use			 	: Name Field
		Table			: ListOfLedgers,EndOfList
		Show Table		: Always
		Set as			: ##vRbcNewLedName
		Modifies		: vRbcNewLedName
		Variable		: vRbcNewLedName
		Width        	: @@NarrWidth
		Set Always		: if #RBCRPLCSELField = "Ledger" or ##vRBCSelectedType = "Both" then Yes else No 
		
	[Line		: RBCRPLCItemLine1]
		Field  	: Long Prompt	, RBCRPLCItemField, 
		Local   : Field   : Long Prompt	: Info 	: $$LocaleString:"Select Stock Item to be replaced:"
		Space Bottom	: 1
		
		
	[Line		: RBCRPLCItemLine2]
		Right Fields	: Long Prompt, RBCRPLCNEWItemField
		Local  		: Field   : long Prompt: Info 	: $$LocaleString:"New Stock Item:"
		Space Bottom	: 1
		
	[Field		: RBCRPLCItemField]
		Use			 	: Name Field
		Table			: ListOfStockItems, EndOfList
		Show Table		: Always
		Set as			: ##vRbcOldItemName
		Modifies		: vRbcOldItemName
		Variable		: vRbcOldItemName
		Set Always		: if #RBCRPLCSELField = "Stock Item" or ##vRBCSelectedType = "Both" then Yes else No 
		Width        	: @@NarrWidth
		;Skip			: if (##vRBCRplcSource = "Ledger") then yes else no 

	[Field			: RBCRPLCNEWItemField]
		Use			 	: Name Field
		Table			: ListOfStockItems, EndOfList
		Show Table		: Always
		Set as			: ##vRbcNewItemName
		Modifies		: vRbcNewItemName
		Variable		: vRbcNewItemName
		Width        	: @@NarrWidth
		Set Always		:  if #RBCRPLCSELField = "Stock Item" or ##vRBCSelectedType = "Both" then Yes else No 


/*---------------------------------------------------------------------------------------------------------------------*/
[Collection: RBCVchCollection]
		
	Switch: RBCOptn : RBC SpeciFic Vouchers    	: ##vRBCRplcSource = "DayBook"
    Switch: RBCOptn : RBC Ledger Vouchers    	: ##vRBCRplcSource = "Ledger"
	Switch: RBCOptn : RBC StockItem Vouchers    : ##vRBCRplcSource = "Stock Item"
	
	[!Collection : RBC SpeciFic Vouchers]
		Source Collection:Vouchers of Company
		Fetch   : *, AllLedgerEntries.* ;, CategoryAllocations.*, CostCentreAllocations.*
		
	[!Collection: RBC Ledger Vouchers]
		Type: Vouchers : Ledger
		Child of : ##vRbcOldLedName 
		Fetch   : *, AllLedgerEntries.* ;, CategoryAllocations.*, CostCentreAllocations.*

	[!Collection: RBC Stock Item Vouchers]
		Type: Vouchers : StockItem
		Child of : ##vRbcOldItemName 
		Fetch   : *, AllLedgerEntries.* , AllInventoryEntries.*;, CategoryAllocations.*, CostCentreAllocations.*

	[Collection: ListOfRBCSelect]
		List Name: "Ledger", "Stock Item", "Both"
		Title: "To Replace"
		

[System: Variable]
	vRBCOldLedName : ""
	vRBCNewLedName : ""
	vRBCOldItemName : ""
	vRBCNewItemName : ""
	vRBCSelectedType : ""
	
	[Variable: vRBCRplcSource]
		Type: String
		Default     : ""
        Volatile    : No
		
	[Variable : vRbcVchPrgCnt]
		Type: Number
				
	[Variable: vRBCOldLedName]
		Type :String
		Default: ""
		
	[Variable: vRBCNewLedName]
		Type :String
		Default: ""
		
	[Variable: vRBCOldItemName]
		Type :String
		Default: ""
		
	[Variable: vRBCNewItemName]
		Type :String
		Default: ""
	
	[Variable: vRBCSelectedType]
		Type :String
		Default: ""
		
/*--------------------------------------------------------------------*/
;; COLLECTIONS BASED ON PrcED VOUHCERS IN REQUIRED FORMAT

	

/*--------------------------------------------------------------------------------------------------------------------*/
	
	
	[Function: RBCAlterSelectedVchrs]

	VARIABLE	: ProgressCount		: Number
	VARIABLE	: LastStatus		: String
	Variable	: YesToAll			: String
	Variable	: pExlVchId			: String
	
	05	:	Set File Log On
	07	:	Log: $$String:##vRBCRplcSource
	10	: QUERY BOX : "Alter Voucher ?  \n Are You Sure?" :	Yes: No
	20	: 	IF : NOT $$LastResult
	30	: 		BREAK
	40	:	ENDIF
	50	: 	SET 		: ProgressCount		: 1
	60	:	SET			: LastStatus :	 ""
	70	:	SET			:	YesToAll	: "No"
	110	: 	IF	: NOT ($$NumItems:RBCVchCollection > 0)
	
	120	: 		MSGBOX : "Status" : "No Data to Process!!"
	130	:		RETURN
	140	: 	END IF
	
	145	:	Set: vRbcNewItemName : if #RBCRPLCSELField = "Ledger"  then "" else  ##vRbcNewItemName
	146	:	Set: vRbcOldItemName : if #RBCRPLCSELField = "Ledger"  then "" else  ##vRbcOldItemName
	147	:	Set: vRbcNewLedName : if #RBCRPLCSELField = "Stock Item"  then "" else  ##vRbcNewLedName
	148	:	Set: vRbcOldLedName : if #RBCRPLCSELField = "Stock Item"  then "" else  ##vRbcOldLedName
	

	150	: 	START PROGRESS 	: ($$NumItems:RBCVchCollection) : "Voucher" : "Alteration"
	160	: 	WALK COLLECTION 	: RBCVchCollection
	165	:		Set: pExlVchId : "ID:"+ $$String:$MasterId
	190	:		SET		: LastStatus :	""
	195	: 		Log: $$String:##pExlVchId
	
	210:		Call: RNGAlterLedEntries:##pExlVchId
	
	
	370	: 	SHOW PROGRESS 	: ##ProgressCount
	380	:	Log: $$String:##ProgressCount+ "-Updated Voucher No " + "- " +$$String:##pExlVchId

	400	: 	SET 			: ProgressCount	: ##ProgressCount + 1
	410	: 	END WALK
	420	: 	END PROGRESS
	440	: 	MSGBOX : "Status" : "Process completed !!"
	
 	450	:	 RETURN 	: TRUE
	

[Function: RNGAlterLedEntries]

    
    Parameter   : ExlVchMasterId   : String
	Variable	: vCountUpdate : Number
	Variable	: vRateUOM	: String
	Variable	: StrRate : String
	Variable	: vRate : Number
	Variable	: vBilledQty : Number
	Variable	: vActualQty : Number
	Variable	: strBilledQty : Quantity
	Variable	: strActualQty : Quantity
	Variable	: vItemAmount : Amount
	Variable	: vQtySign : Logical
	Variable	: vGSTTransType : String
		
	Object	: Voucher	:##ExlVchMasterId 
	0120	: SET TARGET
	0130	: SET OBJECT
	0135	: Set: vCountUpdate : 0
	
	0140	: 	WALK : LedgerEntries
	0160	: 		SET TARGET	: LedgerEntries[$$LoopIndex]
	0180	:		IF	: (Not  $$IsEmpty:##vRbcNewLedName) AND ##vRbcOldLedName = $LedgerName
	0190	: 			SET TARGET	: LedgerEntries[$$LoopIndex]
	0200	:			Set: vGSTTransType :$$String:($(Ledger, ##vRbcNewLedName).GSTDetails[1].GSTNatureofTransaction)
	0205	:			Set Value: LedgerName:$$String:##vRbcNewLedName
	0210 	:   		SET VALUE   : TaxClassificationName	: $TaxClassificationName:ledger:$$String:##vRbcNewLedName
	0215	:			Log: $$String:##vGSTTransType
	0218	:			Set Value	: GSTOVRDNNATURE :##vGSTTransType
	0220	: 			SET TARGET	: ..
	0225	:		END IF
	;0235	:		If:	$IsBankingEnabled:Ledger:$LedgerName
	0240	:			WALK		: Bank Allocations
	0250	: 			SET TARGET	: BankAllocations[$$LoopIndex]
	0260	:			Set Value: BankPartyName:$$String:##vRbcNewLedName;
	;0290	:			Set Value: InstrumentDate:##ExlInstDate;@@RbcInsDate
	;0300	:			Set Value: BankersDate:##ExlBankDate;@@RbcBankDate	
	0410	: 			SET TARGET	: ..
	0420	: 			END WALK
	;0430	:		END IF
	
	0520	: END WALK
	
	0540	: Walk : Inventory Entries
	0545	: 	SET TARGET	: Inventory Entries[$$LoopIndex]
	0550	:		IF	:(Not $$IsEmpty:##vRbcNewItemName)AND ##vRbcOldItemName = $StockItemName
	0555	: 			SET TARGET	: Inventory Entries[$$LoopIndex]
	0557	:			Set: vQtySign : $$IsInwards:$BilledQty 
	0558	:			Log: $$String:##vQtySign 
	0560	:			Set Value: StockItemName:$$String:##vRbcNewItemName
	0565	:			SET	: vRateUOM : $Baseunits:StockItem:##vRbcNewItemName	
	0570	:			Set	: vRate :$$Number:$Rate 
	0575	:			Set	: StrRate : $$String:##vRate + "/" + $$String:##vRateUOM
	0580	:			Set Value: Rate: $$AsRate:##StrRate
	0630	:			SET	: vBilledQty : $$Number:$BilledQty
	0640	:			SET	: vActualQty : $$Number:$ActualQty
	0645	:			Set	: vItemAmount : $Amount 
	0650	:			Set	: strBilledQty :$$AsQty:($$String:##VBilledQty+ " "+ $$String:##vRateUOM)
	0660	:			Set	: strActualQty :$$AsQty:($$String:##vActualQty+ " "+ $$String:##vRateUOM)
	0681	:			SET VALUE	: ActualQty	:0
	0682	:			SET VALUE	: BilledQty	:0
	0683	:			SET VALUE	: Amount	:0
	
	0685	:  			SET VALUE	: ActualQty	: if ##vQtySign= Yes then $$TgtObject:$$AsQty:##strActualQty *1  else $$TgtObject:$$AsQty:##strActualQty *-1
	0690	:   		SET VALUE	: BilledQty	: if ##vQtySign= Yes then $$TgtObject:$$AsQty:##strBilledQty *1  else $$TgtObject:$$AsQty:##strBilledQty *-1
	0695	:			SET VALUE	: Amount	:##vItemAmount
	
	0700	:			Walk : Batch Allocations
	0710	: 			SET TARGET	:  BatchAllocations[$$LoopIndex]
	0730	:			SET	: vBilledQty : $$Number:$BilledQty
	0740	:			SET	: vActualQty : $$Number:$ActualQty
	0745	:			Set	: vItemAmount : $Amount 
	0750	:			Set	: strBilledQty :$$AsQty:($$String:##VBilledQty+ " "+ $$String:##vRateUOM)
	0760	:			Set	: strActualQty :$$AsQty:($$String:##vActualQty+ " "+ $$String:##vRateUOM)

	0781	:			SET VALUE	: ActualQty	:0
	0782	:			SET VALUE	: BilledQty	:0
	0783	:			SET VALUE	: Amount	:0
	
	0785	:  			SET VALUE	: ActualQty	:if ##vQtySign = Yes then $$TgtObject:$$AsQty:##strActualQty * 1 else  $$TgtObject:$$AsQty:##strActualQty *-1
	0790	:   		SET VALUE	: BilledQty	:if ##vQtySign = Yes then $$TgtObject:$$AsQty:##strBilledQty * 1 else $$TgtObject:$$AsQty:##strBilledQty *-1
	0795	:			SET VALUE	: Amount	:##vItemAmount
	0800	:			Set Target: ..
	0820	:			End Walk

	0830	:		Walk : Accounting Allocations
	0840	:		IF	: (Not $$IsEmpty:##vRbcNewLedName) AND ##vRbcOldLedName= $LedgerName
	0850	: 			SET TARGET	: Accounting Allocations[$$LoopIndex]
	0860	:			Set Value:  LedgerName :##vRbcNewLedName
	0870	:			Set Target: ..
	0880	:		End If
	0890	:		End Walk
	0900	:		 END IF
	0910	: 			SET TARGET	: ..
	0920	: 	End Walk
	0930	: SET TARGET				: ..
	0940	: ACCEPT ALTER
	
	0945	:		Set: vCountUpdate : ##vCountUpdate+1
	0950	: 		SET TARGET			: ..
	
	1000	:	Return: True
	
```
