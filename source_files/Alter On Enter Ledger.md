---
title: Alter On Enter Ledger
type: sample_code
objects: Report, Form, Part, Line, Field, Collection, Button
source: Alter On Enter Ledger.txt
---

# Alter On Enter Ledger

## Source Code

```tdl
[#Menu:Gateway Of Tally]
	Add		: Button		: AlterOnEnter	
	
[Button:AlterOnEnter]
	Title		: "Alter On Enter"
	Key			: alt+A
	Action		: Display		: AllLedgersNew
	

[Report:AllLedgersNew]
	Title			: "All Ledgers of "+##SvCurrentCompany
	Form			: AllLedgers
	
[Form:AllLedgers]
	Parts			: AllLedgers
	
[Part:AllLedgers]
	Parts			: AllLedgersHeader, AllLedgersBody
	Scroll			: Both
	Vertical		: Yes
	Common Border	: Yes
	
[Part:AllLedgersHeader]
	Lines			: AllLedgersHeader
	
	[Line:AllLedgersHeader]
		Use			: AllLedgersBody
		Border		: Thick Bottom
		Space Bottom	: 1
		Local		: Field			: Default				: Style		: Normal Bold
		Local		: Field			: Default				: Align		: Center
		Local		: Field			: Default				: Skip		: Yes
		Local		: Field			: Default				: Border	: Thin Left
		
		Local		: Field			: AllLedgersBodyName			: Info		: $$String:"Name"
		Local		: Field			: AllLedgersBodySrNo			: Info		: $$String:"Sr No"
		Local		: Field			: AllLedgersBodyEMail			: Info		: $$String:"EMail"    
		Local		: Field			: AllLedgersBodyPriorStateName	: Info		: $$String:"PriorStateName"    
		Local		: Field			: AllLedgersBodyWebsite			: Info		: $$String:"Website"    
		Local		: Field			: AllLedgersBodyBranchName		: Info		: $$String:"BranchName"    
		Local		: Field			: AllLedgersBodyParent			: Info		: $$String:"Parent"    
		Local		: Field			: AllLedgersBodyGSTApplicable	: Info		: $$String:"GSTApplicable"    
		Local		: Field			: AllLedgersBodyLedgerPhone		: Info		: $$String:"LedgerPhone"    
		Local		: Field			: AllLedgersBodyLedgerContact	: Info		: $$String:"LedgerContact"    
		Local		: Field			: AllLedgersBodyLedgerMobile	: Info		: $$String:"LedgerMobile"  
		Local		: Field			: AllLedgersBodyGSTTypeofSupply	: Info		: $$String:"GSTTypeofSupply"    
		Local		: Field			: AllLedgersBodyVATDealerNature	: Info		: $$String:"VATDealerNature"    
		Local		: Field			: AllLedgersBodyOpeningBalance	: Info		: $$String:"OpeningBalance"    
		Local		: Field			: AllLedgersBody_PartyGSTIN		: Info		: $$String:"_PartyGSTIN"


[Part:AllLedgersBody]
	Line			: AllLedgersBody
	Repeat			: AllLedgersBody		: AllLedgersColl
	
	[Line:AllLedgersBody]
		Fields		: AllLedgersBodySrNo, AllLedgersBodyName
		Right Fields	: AllLedgersBodyEMail, AllLedgersBodyPriorStateName, AllLedgersBodyWebsite, AllLedgersBodyBranchName,+
						AllLedgersBodyParent, AllLedgersBodyGSTApplicable, AllLedgersBodyLedgerPhone, AllLedgersBodyLedgerContact,+
						AllLedgersBodyLedgerMobile, AllLedgersBodyGSTTypeofSupply, AllLedgersBodyVATDealerNature, +
						AllLedgersBodyOpeningBalance, AllLedgersBody_PartyGSTIN
		Option		: Alter on Enter
		[Field:AllLedgersBodySrNo]
			Set as			: $$Line
			Width			: 5
			
		
		[Field:AllLedgersBodyName]
			Set as			: $Name
			Width			: 20
			Alter			: Ledger
            ;;
		
		[Field:AllLedgersBodyEMail]
			Set as			: $EMail
			Width			: 15
            ;;

    
		[Field:AllLedgersBodyPriorStateName]
			Set as			: $PriorStateName
			Width			: 15
            ;;

    
		[Field:AllLedgersBodyWebsite]
			Set as			: $Website
			Width			: 10
            ;;

    
		[Field:AllLedgersBodyBranchName]
			Set as			: $BranchName
			Width			: 15
            ;;

    
		[Field:AllLedgersBodyParent]
			Set as			: $Parent
			Width			: 20
            ;;

    
		[Field:AllLedgersBodyGSTApplicable]
			Set as			: $GSTApplicable
			Width			: 15
            ;;

    
		[Field:AllLedgersBodyLedgerPhone]
			Set as			: $LedgerPhone
			Width			: 15
            ;;

    
		[Field:AllLedgersBodyLedgerContact]
			Set as			: $LedgerContact
			Width			: 15
            ;;

    
		[Field:AllLedgersBodyLedgerMobile]
			Set as			: $LedgerMobile
			Width			: 15
            ;;

		[Field:AllLedgersBodyGSTTypeofSupply]
			Set as			: $GSTTypeofSupply
			Width			: 20
            ;;

    
		[Field:AllLedgersBodyVATDealerNature]
			Set as			: $VATDealerNature
			Width			: 20
            ;;

    
		[Field:AllLedgersBodyOpeningBalance]
			Set as			: $OpeningBalance
			Width			: 20
            ;;

    
		[Field:AllLedgersBody_PartyGSTIN]
			Set as			: $_PartyGSTIN
			Width			: 20
            ;;






[Collection:AllLedgersColl]
	Type		: Ledger
	
[Collection:AllVouchers]
	Type		: Voucher
	

[Collection:MyAllVouchers]
	Type		: Voucher
	Walk		: Inventory Entries
	
;; Select $Name from ODBCTables
;; HSN Details		== $HSNDetails.HsnCode
;; GstRate			== $(StockItem, $Name).GstDetails[Last].StateWiseDetails[1].RateDetails[1, @@isIGST].GSTRate











```
