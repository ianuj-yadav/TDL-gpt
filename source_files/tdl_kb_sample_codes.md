TDL Sample Codes and Practical Implementations

TDL_Topic: Module Enablement (F11 Features)

TDL_Subtopic: Adding Custom Features to F11

To add a custom feature to the F11 Company Features screen and create a Boolean UDF, you modify the default Company F11 Other Features part.

[#Part: Company F11 Other Features]
	Local	: Part	: Cfg PartContent		:Add			: Lines	: CMP EnableAgent
	
    [Line: CMP EnableAgent]
		Use			: Cmp Ops More Config	
		Fields		: Medium Prompt, CMP EnableAgent
		Space Top	: 0.6
		Local  		: Field : Medium Prompt : Info    		: $$LocaleString:"Enable Agent Module :"
		Local  		: Field : Medium Prompt : Background	: Yellow
	
		[Field:CMP EnableAgent]
			Type		: Logical
			Storage		: IsAgentModuleEnabled
			Width		: 3
			Max			: 3
			Table		: YesNoTable
			Show Table	: On Error
			Key			: LogicalToggle		
			Style		: Normal Bold
			Sub Form	: AgentNameCreation	: $$Value=Yes  ;; Sub Form attribute is always open in alter mode.
			Background	: Yellow

[System:UDF]
	IsAgentModuleEnabled	: Logical	: 20001



TDL_Topic: Master Creation

TDL_Subtopic: Agent Name Creation Report

This code demonstrates how to create a simple Master Creation screen with a repeating line to add multiple Agent Names. It includes a Report, Form, Part, Line, and Field definition.

[Report:AgentNameCreation]
	Title	: "Agent Name Creation"
	Form	: AgentNameCreation
	
[Form:AgentNameCreation]
	Part	: AgentNameCreation
	
[Part:AgentNameCreation]
	Lines		: AgentNameTitle, AgentNameBody
	Repeat		: AgentNameBody		: CmpAgentName
	Scroll		: Vertical
	Break On	: $$IsEmpty:$CmpAgentName  ;; If it is not given repetition never start because it has no end point
	
	[Line:AgentNameTitle]
		Use	: AgentNameBody
		Local	: Field	: Default	: Type	: String
		Local	: Field	: Default	: Line	: 0
		Local	: Field	: Default	: Align	: Center
		Local	: Field	: Default	: Style	: Normal Bold
		Local	: Field	: Default	: Delete: Storage
		Local	: Field	: CmpAgentName	: Info		: "Name of Agent"
		Local	: Field	: CmpAgentName	: Border	: Thin Bottom
		Space Bottom	: 1

	[Line:AgentNameBody]
		Field	: CmpAgentName
		
        [Field:CmpAgentName]
			Type	: String
			Width	: 30
			Max		: 251
			Storage	: CmpAgentName
			Case	: First Upper Case
			Unique	: Yes



TDL_Topic: Invoice Customization

TDL_Subtopic: Showing Agent Name in Invoice Fill Form

This snippet shows how to modify the default Sales Invoice screen (EI Consignee) to include custom fields. It also demonstrates how to fetch data from a collection table using $$Table.

[#Line: EI Consignee]
	Border		: Thick Box
	
[#Part: EI Consignee]
	 Background		: Yellow
	 Add			: Line	: At Beginning	: EIAgentName		
	 
	[Line:EIAgentName]
		Fields		: Simple Prompt, EIAgentName, EiAgentCommission
		Local       : Field : Simple Prompt: Info       : $$LocaleString:"Agent name:"
		Local 		: Field : Simple Prompt: Width		: @@VchLeftPromptWidth % Page
		Invisible	: Not @@IsSales
		
		[Field:EIAgentName]
			Table		: AgentDtlsColl
			Show Table	: Always
			Storage		: EIAgentName
			Width       : @@VCHNameWidth
			Max			: 251
			Type		: String
			
		[Field:EiAgentCommission]
			Storage		: EIAgentCommission
			Width       : 5
			Type		: Number
			Format		: "Percentage,No Zero"
			Set as		: $$Table:EIAgentName:$AgentComm 
            ;; $$Table Defines that it comes from a table.
            ;; The table is used in EIAgentName Field.
            ;; $AgentComm is used to Fetch That data from the above collection.
			Skip		: Yes
			Set Always	: Yes  ;; It is used to keep refreshing the data as the field EIAgentName changed
			
[System:UDF]
	EIAgentName         : String    : 20005
    EIAgentCommission   : Number    : 20006



TDL_Topic: UI Customization

TDL_Subtopic: Modifying Gateway of Tally and Colors

This code shows how to add a new menu item to the Gateway of Tally and how to conditionally change the background color of a Form.

[#Menu:Gateway Of Tally]
	Add	: Key Item	: Before	: @@LocQuit	: Change Background	: E	: Display	: ChgBgColor
	
[Report:ChgBgColor]
	Title		: "ChgBgColor"
	Form		: ChgBgColor
	
[Form:ChgBgColor]
	Part		: ChgBgColor
	Button		: ChgBgButton
	Option		: OpColored		: ##ChgColor
	Background	: "Green"
	Width		: 50% Page
	Height		: 40% Page
	
	[!Form:OpColored]
		Background	: IF ##ChgColor THEN "Red" Else ""

[Part:ChgBgColor]
	Line		: ChgBgColor
	
    [Line:ChgBgColor]
		Field	: ChgBgColor, DateBg
		
        [Field:ChgBgColor]
			Set as	: "This is the changed background colored field."



TDL_Topic: Basic Reporting

TDL_Subtopic: Hello World Report

This code demonstrates how to add a simple menu item to the Gateway of Tally that opens a basic "Hello World" report.

[#Menu:Gateway Of Tally]
	Add		: Item		: DisplayHello		: Display	: HelloWorld
	
[Report:HelloWorld]
	Form		: HelloWorld
	
[Form:HelloWorld]
	Height		: 100% Page
	Width		: 100% Page
	Part		: HelloWorld
	
[Part: HelloWorld]
	Line		: HelloWorld

[Line:HelloWorld]
	Field		: LongPrompt, HelloWorld
	Local		: Field		: LongPrompt	: Info	: $$LocaleString:"HelloWorldPrompt"

	[Field:HelloWorld]
		Use			: Name Field
		Set as		: "HelloWorld"
		Background	: Yellow



TDL_Topic: Printing Customization

TDL_Subtopic: Envelope Printing

This snippet shows how to add a button to the Purchase and Sales forms to print a custom Envelope format. It introduces custom printing styles (EnvStyleBOLD) and uses the PartyAddress collection to repeat address lines including Phone and Email.

[#Form : Purchase Color]
	Button	: Address Print 

[#Form : Sales Color]
	Button	: Address Print 

[Button : Address Print ]
	Key 		: 	Ctrl + E
	Action 		: 	Print Report	: EnvelopePrint

[Report	: EnvelopePrint]
	Form		: 	EnvPrintForm
	Object		: 	Ledger
	Object		: 	Voucher
		
[Form	: EnvPrintForm]
	Width		:	100% Page
	Height		:	100% Page
	Space Top	:	0.5 inch	
	Space Left	:	0.5 inch	
	Space Right	:	0.5 inch	
	Part		:	EnvPrintBody
			
[Part	: EnvPrintBody]
	Part		:	EnvPrintBodyTop
					
[Part	: EnvPrintBodyTop]
	Width		:	100 % page
	Height		:	3 inch		
	Space Top	:	0.5 inch	
	Space Left	:	0.5 inch	
	Space Right	:	0.5 inch	
	Line		:	EnvelopeHead1, EnvelopeHead2, FullAddress, PhoneNumbers, EmailAdd
	Repeat		:	FullAddress:PartyAddress
	Vertical	:	Yes

[Line	: EnvelopeHead1]
	Field		:	ToAddress, EnvelopeHead1
	Space Top	:	1	

[Field	: ToAddress]
	Use			:	Name Field
	Set as		:	"To, "
	Width		:	15		
	Align		:	Centre
	Style		:	EnvStyleBOLD
	PrintFG		:	Red
			
[Field	: EnvelopeHead1]
	Use			:	Name Field
	Setas		:	$LedgerName:Ledger:$PartyLedgerName 
	Width		:	50		
	style		:	EnvStyleBOLD
	Align		:	Left
	Object		:	Ledger

[Line	: EnvelopeHead2]
	Field		:	KindAttn, ContactPerson

[Field	: KindAttn]
	Use			:	Name Field
	Set as		:	"Kind Attn : "
	Width		:	15		
	Align		:	Centre
	Style		:	EnvStyleNormal
	Space Left	:	9		
	PrintFG		:	Red
			
[Field	: ContactPerson]
	Use			:	Name Field
	Setas		:	$LedgerContact:Ledger:$PartyLedgerName
	Set Always	:	Yes
	Width		:	50		
	Style		:	EnvStyleNormal
	Align		:	Left
	Border		:	thin Bottom
	PrintFG		:	Red
	
[Style	: EnvStyleBOLD]
	Font		:	"Arial Bold"
	Height		:	16
	Bold		:	yes

[Line	: FullAddress]
	Field		:	FullAddress
					
[Field	: FullAddress]
	Use			:	Name Field
	Setas		:	$Address
	Width		:	50		
	Style		:	EnvStyleNormal
	Space Left	:	25		
	PrintFG		:	Red

[Style	: EnvStyleNormal]
	Font		:	"Arial"
	Height		:	12
	Bold		:	No

[Line	: PhoneNumbers]
	Field		:	PhoneLabel, PhoneNumbers

[Field	: PhoneLabel]
	Use			:	Name Field
	Set as		:	"Phone No. : "
	Width		:	15		
	Align		:	Centre
	Style		:	EnvStyleNormal
	Space Left	:	9		
	PrintFG		:	Red

[Field	: PhoneNumbers]
	Use			:	Name Field
	Setas		:	$LedgerPhone:Ledger:$PartyLedgerName
	Set Always	:	Yes
	Width		:	50		
	Style		:	EnvStyleNormal
	Align		:	Left
	PrintFG		:	Red

[Line	: EmailAdd]
	Field		:	EmailLabel, EmailAdd

[Field	: EmailLabel]
	Use			:	Name Field
	Set as		:	"Email ID : "
	Width		:	15		
	Align		:	Centre
	Style		:	EnvStyleNormal
	Space Left	:	9		
	PrintFG		:	Red

[Field	: EmailAdd]
	Use			:	Name Field
	Setas		:	$Email:Ledger:$PartyLedgerName
	Set Always	:	Yes
	Width		:	50		
	Style		:	EnvStyleNormal
	Align		:	Left
	PrintFG		:	Red



TDL_Topic: System Variables and Definitions

TDL_Subtopic: Variables, Formulae, and Static Objects

This code illustrates how to define system formulae ([System: Formulae]), variables ([System: Variable]), and static objects that can act as data structures (e.g., for an image gallery grid).

[System:Formulae]
	 ShowLogoTirlok	: $$LocaleString:"Show Logo Tirlok"

[#Menu    : Gateway of tally]
    Add: Item        : Item Image Gallery :    Call    : Taxo_OpenReport Menu :NOT $$IsEmpty:$$SelectedCmps ;;AND @@RBC_TM_IsOn Display: Txo_Image_Report

[System    : Variable]
    svNumItemsHrz     : 4
    svNumItemsVrt     : 4
    svTxoImgPageNo     : 1
    svTxoPageChng      : No
    svNumPages         : 1
    vItemFsMatch    : ""
    svFsUpdated     : No

[Variable: DefsvNumItemsHrz]
    Type        : Number
    Repeat      : ##DSPRepeatCollection

[Variable    : svNumPages]
    Type        : Number
    Default     : 1
    Volatile    : Yes

[Object: Image_Column_5by5]
    Name        : $$LocaleString:"5  x  5"
    VarValueHrz : 5
    VarValueVrt : 5
    Order       : 10

[Object: Image_Column_6by4]
    Name        : $$LocaleString:"6  x  4"
    VarValueHrz : 6
    VarValueVrt : 4
    Order       : 11

