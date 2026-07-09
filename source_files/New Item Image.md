---
title: New Item Image
type: sample_code
objects: Report, Form, Part, Line, Field, Collection, Function, Button
source: New Item Image.txt
---

# New Item Image

## Source Code

```tdl


;........... [Include    : Taxo_Image_Report.tdl]  ; if in new file


[#Menu    : Gateway of tally]

    Add: Item        : Item Image Gallery :    Call    : Taxo_OpenReport Menu :NOT $$IsEmpty:$$SelectedCmps ;;AND @@RBC_TM_IsOn Display: Txo_Image_Report


;; Variables
;----------------------------------------------------------------------------------------------------------------------------------------------
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
    Repeat        : ##DSPRepeatCollection

[Variable    : svNumPages]
    Type    : Number
    Default    : 1
    Volatile: Yes

[Variable    :svTxoPageChng ]
    Type    : Logical
    Volatile: Yes
    Default    :1

[Variable    :svTxoImgPageNo]
    Type    : Number
    Volatile: No
    Default    :1

[Variable    : svNumItemsHrz]
    Type    : Number
    Volatile: Yes
    Default    :4

[Variable    : svNumItemsVrt]
    Type    : Number
    Volatile: Yes
    Default    :4



[Variable    : vItemFsMatch]
    Type        : FlagSet
    Volatile    : Yes

[Variable:    svFsUpdated]
    Type    : Logical
    Default    : No
	
[System    : Formula]
    IsMultiColImagePrintEnabled    : Yes

[Variable: Txo_DynMic_TDLLoaded ]
    Type        : Logical
    Persistent    : Yes
    Volatile    : No


[Variable: Txo_DynMic_LocalTDL ]
    Type        : String
    Persistent    : Yes
    Volatile    : Yes

[System    : Variable]
         Txo_DynMic_TDLLoaded : No
         Txo_DynMic_LocalTDL  : ""



;; List Variables
;----------------------------------------------------------------------------------------------------------------------------------------------


[System    : Variable]
    List Variable : lstStockItemsHrz
    List Variable : lstStockItemsVrt
    List Variable : lstNumberOfPages
    List Variable : lstStockItemsPages

[Variable    :lstStockItemsHrz]
    Variable    : lvRowNum      : Number

[Variable    :lstStockItemsVrt]
    Variable    : lvRowNum      : Number

[Variable    :lstNumberOfPages]
    Variable    : lvPgeNum              : Number
    Variable    : lvLastNumInPge    : Number
    Variable    : lvFrstNumInPge    : Number


[Variable : lstStockItemsPages]
    Variable    : lvPgeNum      : Number
    Variable    : lvColNum      : Number
    Variable    : lvRowNum      : Number
    Variable    : lvItemName  : String
    Variable    : lvItemPart  : String
    Variable    : lvItemClos  : Quantity
    Variable    : lvItemRate  : Rate



;; Objects and Collections
;----------------------------------------------------------------------------------------------------------------------------------------------


[Object    : lstStockItemsHrz]
[Object    : lstStockItemsVrt]

[Object : lstNumberOfPages     ]
[Object : lstStockItemsPages   ]

[Collection        : StockItemsHrz Src]
    Data Source    : Variable    :lstStockItemsHrz
    Fetch    : lvRowNum

[Collection    : StockItemsVrt Src]
    Data Source    : Variable    : lstStockItemsVrt
    Fetch    : lvRowNum

[Collection    : NumberOfPages Src]
    Data Source    : Variable    : lstNumberOfPages
    Fetch    : lvPgeNum, lvLastNumInPge, lvFrstNumInPge

[Collection    : StockItemsPge Src]
    Data Source    : Variable    : lstStockItemsPages
    Fetch    : lvPgeNum    , lvColNum    , lvRowNum, lvItemName, lvItemPart, lvItemClos ,lvItemRate



[Collection    : xTxo_StockItemsHrz]
    Source Collection        : StockItemsHrz Src
    Compute            : ItemColNo : $lvRowNum
    Is ODBC Table    : Yes


[Collection    : xTxo_StockItemsVrt]
    Source Collection    : StockItemsVrt Src
    Compute    : ItemRowNo : $lvRowNum

[Collection    : xTxo_NumberOfPages]
    Source Collection    : NumberOfPages Src
    Compute    : ItemPgeNo         : $lvPgeNum
    Compute    : LastInPgeNo    : $lvLastNumInPge
    Compute    : FrstInPgeNo      : $lvFrstNumInPge


[Collection    : xTxo_StockItemsPge]

    Source Collection    : StockItemsPge Src
    Compute    : PgeNum    : $lvPgeNum
    Compute    : ColNum    : $lvColNum
    Compute    : RowNum    : $lvRowNum
    Compute    : ItemName  : $lvItemName
    Compute    : ItemPart  : $lvItemPart
    Compute    : ItemClos  : $lvItemClos
    Compute    : ItemRate  : $lvItemRate


    Search Key    : $$String:$PgeNum+"."+$$String:$RowNum+"."+$$String:$ColNum


[Collection: Taxo List Stock Items]

    Use         : Alias Collection
    Title       : $$LocaleString:"List of Stock Items"
    Type        : Stock Item
    Fetch       : Name, PartNo, ClosingBalance, Rate
	


;; Functions
;----------------------------------------------------------------------------------------------------------------------------------------------

[Function    : Taxo_OpenReport Menu]
    100        :     Call    :    Taxo_Walk_Hrz_Vrt
    200        :    Display    :     Txo_Image_Report


[Function    : Taxo_Walk_Hrz_Vrt]
    Variable    : vFunctionName    : String    : "Main"

    030        :     List Delete Ex    :lstStockItemsHrz
    040        :     List Delete Ex    :lstStockItemsVrt

    100        :    Call    : Taxo_Walk_Hrz_Coll
    200        :    Call    : Taxo_Walk_Vrt_Coll
    250        :    Call    : Taxo_Write_NumPages
    300        :    Call    : Txo_DynMicImageWrite
    400        :    Return

[Function    : Taxo_Walk_Hrz_Coll]

    Variable    : vStkKey    : String
    Variable    : vStkIdx    : Number

    005    : Set    : vFunctionName : "Walk Horizontal"
    010 : For Range : Itrt : Number: 1: ##svNumItemsHrz :1

    020    :        Set        : vStkKey    : $$String:##Itrt
    030    :        Do If    :  NOT ($$ListFind:lstStockItemsHrz:##vStkKey)  : List Add :lstStockItemsHrz:##vStkKey
    040    :         Set        : vStkIdx : $$ListIndex:lstStockItemsHrz:##vStkKeY
    070    :         Set        : lstStockItemsHrz[##vStkIdx].lvRowNum        : ##Itrt
;    080    :        Call    : Taxo_Log_Variables
    060 : End For


[Function    : Taxo_Walk_Vrt_Coll]
    Variable    : vStkKey    : String
    Variable    : vStkIdx    : Number

    005    : Set    : vFunctionName : "Walk Vertical"
    010 : For Range : Itrt : Number: 1:##svNumItemsHrz :1
    020    :        Set        : vStkKey    : $$String:##Itrt
    025    :        Log        : "Hi---" + $$String:##Itrt
    030    :        Do If    :  NOT ($$ListFind:lstStockItemsVrt:##vStkKey)  : List Add :lstStockItemsVrt:##vStkKey
    040    :         Set        : vStkIdx : $$ListIndex:lstStockItemsVrt:##vStkKeY
    055    :         Set        : lstStockItemsVrt[##vStkIdx].lvRowNum        : ##Itrt
    090 : End For


[Function    : Taxo_Write_NumPages]
    Variable    : flgStockImage : FlagSet

    Variable    : vFunctionName    : String    : "Main"
    Variable    : vIsDivByPge     : Logical
    Variable    : vHrzNum        : Number

    Variable    : vItemPerPage    : Number    : ##svNumItemsHrz * ##svNumItemsVrt
    Variable    : vInitNum        : Number    : 1
    Variable    : vNumStkItems    : Number
    Variable    : vItemRowNum    : Number

    010        :     List Delete Ex    :lstNumberOfPages
    020        :    List Delete Ex    : lstStockItemsPages
    025        :    Log: "Main Function"
    030        :    Set: vNumStkItems : $$NumItems:TaxoListStockItems
    040        :    Set: vIsDivByPge  : $$CanDivide:##vNumStkItems:##vItemPerPage
    050        :    Do If    : ##vIsDivByPge       AND (##vNumStkItems > ##svNumItemsHrz):Set: svNumPages    : (##vNumStkItems/##vItemPerPage)
    060        :    Do If    : (NOT ##vIsDivByPge) AND (##vNumStkItems > ##svNumItemsHrz):Set: svNumPages    : ($$RoundDown:(##vNumStkItems/##vItemPerPage):1)+1
    065        :    Call    : Taxo_Log_Variables
    100        :    Call    : Txo_Walk_NumPages

    200        :    Return

[Function    : Txo_Walk_NumPages]
    Variable    : vStkKey        : String
    Variable    : vStkIdx        : Number

    Variable    : vLastNumInPge    : Number    : 0
    Variable    : vFrstNumInPge    : Number    : 0

    005        : Log : "Walk Pages"
    010     : For Range : Itrt : Number: 1:##svNumPages :1
    020        :        Set        : vStkKey    : $$String:##Itrt
    025        :        Log        : "Hi---" + $$String:##Itrt
    030        :        Do If    :  NOT ($$ListFind:lstNumberofPages:##vStkKey)  : List Add :lstNumberofPages:##vStkKey
    040        :         Set        : vStkIdx : $$ListIndex:lstNumberofPages:##vStkKeY
    055        :         Set        : lstNumberofPages[##vStkIdx].lvPgeNum        : ##Itrt
    060        :        Set        : vFrstNumInPge : ##vLastNumInPge + 1
    070        :        Set        : vLastNumInPge : ##vLastNumInPge + ##vItemPerPage

    080        :         Set        : lstNumberofPages[##vStkIdx].lvLastNumInPge    : ##vLastNumInPge
    090        :         Set        : lstNumberofPages[##vStkIdx].lvFrstNumInPge    : ##vFrstNumInPge

    100     : End For
    200        : Call    : Txo_Write_ImageMaster



;; Function to create Image Master as per Page Size
;----------------------------------------------------------------------------------------------------------------------------------------------


[Function    : Txo_Write_ImageMaster]

    Variable    : vNumItems : Number
    Variable    : vPgeNum    : Number    :1
    Variable    : vRowNum    : Number    :1
    Variable    : vColNum    : Number    :1
    Variable    : vItmNum    : Number

    Variable    : vIsDivByHrz  : Logical
    Variable    : vIsDivByVrt  : Logical

    Variable    : vLastNumPge    : Number
    Variable    : vFrstNumPge    : Number
    Variable    : vFrstNumInRow    : Number
    Variable    : vLastNumInRow    : Number

    Variable    : vItemName     : String
    Variable    : vItemPart     : String
    Variable    : vItemClos     : Quantity
    Variable    : vItemRate     : Rate

    005        : Set    : vFunctionName : "Write Iamge Master"
    010        : Set    : vNumItems : $$NumItems:TaxoListStockItems
    020        : Do If    : ##vNumItems <=1 :    Return

    025        : Walk Collection    : TaxoListStockItems
    030        : Set    : vItemName     : $Name
    035        : Set    : vItemPart     : $PartNo
    040        : Set    : vItemClos     : $ClosingBalance
    045        : Set    : vItemRate     : $Rate
    050        : Set    : vFrstNumInRow    : 0
    055        : Set    : vLastNumInRow    : 0
    060        : Set    : vItmNum        : $$LoopIndex
    070        : Set    : vIsDivByHrz  : $$CanDivide:##vItmNum:##svNumItemsHrz
    075        : Set    : vIsDivByVrt  : $$CanDivide:##vItmNum:##vItemPerPage
    080        : Call    : Taxo_Write_Image_Coll
    085        : Do If    :  NOT ##vIsDivByHrz  :  Increment    :  vColNum
    090        : Do If    :  ##vIsDivByHrz       :  Set        :  vColNum : 1
    095        : Do If    :  ##vIsDivByHrz       :  Increment    :  vRowNum
    100        : Do If    :  ##vIsDivByVrt       :  Increment    :  vPgeNum +1
    110        : Do If    :  ##vIsDivByVrt       :  Set        :  vRowNum : 1
    120        : Call    : Txo_Print_PageVariable

;    085        : Call    : Taxo_Match_ColNum

    200        : End Walk

[Function    : Taxo_Match_ColNum]
    Local Formula    : IsColNumMatch    : ##vColNum Between ##vFrstNumInRow AND ##vLastNumInRow
    Variable    : vThisRowColNum    : Number

    005        :     Log    :" Wiriting Col numbers"
    010     :     For Range : Itrt : Number: 1:##svNumItemsHrz :1
    060        :        Set        : vFrstNumInRow : ##vLastNumInRow +1
    065        :        Set        : vLastNumInRow : ##vLastNumInRow + ##svNumItemsHrz
    070        :        Set        : vThisRowColNum : ##Itrt
    085        :        Do If    : @IsColNumMatch    : Call    : Txo_Print_PageVariable
    090        :         Do If    : @IsColNumMatch    : Call    : Taxo_Write_Image_Coll
    095     : End For

                               
[Function    : Taxo_Write_Image_Coll]
    Variable    : vStkKey    : String
    Variable    : vStkIdx    : Number

    005    : Set    : vFunctionName : "Write Image Coll"
    020    :        Set        	: vStkKey    : $$String:##vItmNum
    025    :        Log        	: "Hi---" + $$String:##vItmNum
    030    :        Do If    	:  NOT ($$ListFind:lstStockItemsPages:##vStkKey)  : List Add :lstStockItemsPages:##vStkKey
    040    :         Set        : vStkIdx : $$ListIndex:lstStockItemsPages:##vStkKeY
    050    :         Set        : lstStockItemsPages[##vStkIdx].lvPgeNum      : ##vPgeNum
    060    :         Set        : lstStockItemsPages[##vStkIdx].lvColNum      : ##vColNum
    070    :         Set        : lstStockItemsPages[##vStkIdx].lvRowNum      : ##vRowNum
    080    :         Set        : lstStockItemsPages[##vStkIdx].lvItemName    : ##vItemName
    090    :         Set        : lstStockItemsPages[##vStkIdx].lvItemPart    : ##vItemPart
    100    :         Set        : lstStockItemsPages[##vStkIdx].lvItemClos    : ##vItemClos
    120    :         Set        : lstStockItemsPages[##vStkIdx].lvItemRate    : ##vItemRate


;; Not used I think
;----------------------------------------------------------------------------------------------------------------------------------------------


[Function:     Txo_DynMic_DelTdlFiles]

    125        :    do if    : ( $$isfileexists:##Txo_DynMic_LocalTDL) : delete file:##Txo_DynMic_LocalTDL
    130        :    Set        : Txo_DynMic_TDLLoaded : No
    150        :    Set        : Txo_DynMic_LocalTDL : ""
;    Add        : Button : Taxo_TDLRefresh, Taxo_InvFrmt_Rule


;; Function to creat TDL file at run time to load at the time of Page Dimenstion change
;----------------------------------------------------------------------------------------------------------------------------------------------

[Function    : Txo_DynMicImageWrite]

    Variable    :      vNumColls     : Number
    Variable    :      vNumRows     : Number

    Variable    :     vAppPath    : String

    Variable    :    vRghtPart    : String    :"Right Parts"
    Variable    :    vLeftPart    : String    :"Left Parts"


    100        :    Set    : vAppPath    :  $$ApplicationPath + "\DynMicImageWrite.ini"           
;    105        :    Log    : ##vAppPath               

    110        :    Set        :    vNumColls : $$NumItems:xTxo_StockItemsHrz
    115        :    Do If    :    ##vNumColls <= 1 : Return           
;    120                               
    125        :    do if    : ( $$isfileexists:##vAppPath) : delete file:##vAppPath               
    130        :    open file : ##vAppPath: Text : Write : ASCII                   
    135        :    truncate file                   
    140        :     Start Batch Post    ;               
    150        :    Call    : Txo_Write_Image_Coll_Hrz


    210        :    Set        :    vNumRows : $$NumItems:xTxo_StockItemsVrt
    215        :    Do If    :    ##vNumRows > 1 : Call    : Txo_Write_Image_Coll_Vrt


    675        :     Write File Line    : $$StrByCharCode:0013               
;    680                               
    685        :     Start Batch Post                   
    690        :    close target file                   
;    695        :    msg box    :"saved": "file saved to directory"
;    696        :     Open File    :  ##vAppPath: Text : Read : ASCII                   
    700        :    Load TDL    : ##vAppPath
    750        :    Set    : Txo_DynMic_LocalTDL : ##vAppPath
    760        :    Set    : Txo_DynMic_TDLLoaded : Yes
    780        :    Refresh TDL
    800        :    return : true                   




[Function    :Txo_Write_Image_Coll_Hrz]

    Variable    : vColNum    : Number

    100        :    Write File Line     : "[#Part: Txo_Image_Body_Hrz]" ;+ $$String:##vColNum+ "]"               

    110        :    Walk Collection    : xTxo_StockItemsHrz
    120        :        Do If    : $$LoopIndex = 1 : Continue
    130        :        Set    : vColNum : $$LoopIndex       
    140        :        Call:Txo_Image_Body_Hrz_Add               
    150        :    End Walk                   
    160        :     Write File Line    : $$StrByCharCode:0013               

    250        :    Walk Collection    : xTxo_StockItemsHrz
    260        :        Do If    : $$LoopIndex =1 : Continue
    270        :        Set    : vColNum : $$LoopIndex   
    280        :        Call:Txo_Image_Body_Hrz_Def               
    290        :    End Walk                   
    300        :     Write File Line    : $$StrByCharCode:0013               



    [Function    :Txo_Image_Body_Hrz_Add]

        220        :    Write File Line     : "        Add: Right Part: "+"Txo_Image_Col_"+$$String:##vColNum



    [Function    :Txo_Image_Body_Hrz_Def]

        220        :    Write File Line     : "[Part    : Txo_Image_Col_"+$$String:##vColNum + "]"
        230        :    Write File Line     : "            Use    : Txo_Image_Part_A"
        240        :    Write File Line     : "            Access Name    : Txo_Image_Col_"+$$String:##vColNum
        250        :    Write File Line     : "            Local : Field    :  Txo_ExpInv_ColFld :Set As : " +$$String:##vColNum

        300        :     Write File Line    : $$StrByCharCode:0013



[Function    :Txo_Write_Image_Coll_Vrt]

        Variable    : vRowNum    : Number

        100            :    Write File Line     : "[#Part:  Txo_Image_Body_Vrt]"

        110            :    Walk Collection    : xTxo_StockItemsVrt
        120            :        Do If    : $$LoopIndex <= 2 : Continue
        130            :        Set    : vRowNum : $$LoopIndex       
        140            :        Call:Txo_Image_Body_Vrt_Add               
        150            :    End Walk                   
        160            :     Write File Line    : $$StrByCharCode:0013               

        250            :    Walk Collection    : xTxo_StockItemsVrt
        260            :        Do If    : $$LoopIndex <=2 : Continue
        270            :        Set    : vRowNum : $$LoopIndex       
        280            :        Call:Txo_Image_Body_Vrt_Def               
        290            :    End Walk                   
        300            :     Write File Line    : $$StrByCharCode:0013               



    [Function    :Txo_Image_Body_Vrt_Add]

        220        :    Write File Line     : "        Add    : Part: Txo_Image_Row_"+$$String:##vRowNum



    [Function    :Txo_Image_Body_Vrt_Def]

        220        :    Write File Line     : "[Part    : Txo_Image_Row_"+$$String:##vRowNum+ "]"
        230        :    Write File Line     : "            Use    : Txo_Image_Body_Hrz "
        240        :    Write File Line     : "            Access Name    : Txo_Image_Row_"+$$String:##vRowNum
        250        :    Write File Line     : "            Local : Field    :  Txo_ExpInv_RowFld :Set As : "+$$String:(##vRowNum)
        300        :     Write File Line    : $$StrByCharCode:0013

;; Helper functions to check working of variables
;----------------------------------------------------------------------------------------------------------------------------------------------



[Function    : Taxo_Log_Variables]

    005    :    Log:     "---------------------------------"
;    006    :    Return
    008    :    Log:     "                                    "
    010    :    Log:    "##vFunctionName    " +    "- "+    $$String:##vFunctionName
    100    :    Log:    "##vIsDivByPge         " +    "- "+    $$String:##vIsDivByPge
    110    :    Log:    "##svNumItemsHrz    " +    "- "+    $$String:##svNumItemsHrz
    120    :    Log:    "##vHrzNum            " +    "- "+    $$String:##vHrzNum
    130    :    Log:    "##svNumPages        " +    "- "+    $$String:##svNumPages
    160    :    Log:    "##vInitNum            " +    "- "+    $$String:##vInitNum
    170    :    Log:    "##vNumStkItems        " +    "- "+    $$String:##vNumStkItems
    180    :    Log:    "##vItemRowNum        " +    "- "+    $$String:##vItemRowNum
    190    :    Log:    "##vItemPerPage        " + "- "+    $$String:##vItemPerPage


[Function    : Txo_Print_PageVariable]

    010        :     Log : "##vPgeNum            "+$$String:##vPgeNum
    020        :     Log    : "##vColNum            "+$$String:##vColNum
    030        :    Log : "##vLastNumInPge        "+$$String:##vLastNumInPge
    040        :    Log : "##vFrstNumInPge        "+$$String:##vFrstNumInPge
    045        :    Log    : "##vFrstNumInRow        "+$$String:##vFrstNumInRow
    050        :    Log    : "##vLastNumInRow        "+$$String:##vLastNumInRow

    055        :    Log    : "##vItemName          "+$$String:##vItemName
    060        :    Log    : "##vItemPart          "+$$String:##vItemPart
    070        :    Log    : "##vItemClos          "+$$String:##vItemClos
    080        :    Log    : "##vItemRate          "+$$String:##vItemRate
	



;; Multi Page Report for printing
;----------------------------------------------------------------------------------------------------------------------------------------------


[Report:Txo_Print_Image_Report]

    Use            : Txo_Image_Report
    Collection    : xTxo_NumberOfPages

    Variable     : svTxoImgPageNo

    Filtered    : Yes
    Local        : Form: Txo_Image_Report : Set Always:  svTxoImgPageNo : $ItemPgeNo


;; Main report which holds the base structure and displays the image
;----------------------------------------------------------------------------------------------------------------------------------------------

[Report: Txo_Image_Report]

    Title        : $$LocaleString:"Image Gallery"
    Form        : Txo_Image_Report

    Set         : DoSetAutoColumn         : Yes
    Variable    : svTxoImgPageNo,  svTxoPageChng, svNumPages


    Variable      : SVPrintOrientation  : String
    PrintSet    : Report Title    : $$LocaleString:"Image Gallery"
    Set           :  SVPrintOrientation  : "Landscape"


; Option to refersh Report after Dynamic TDL is created and loaded
;----------------------------------------------------------------------------------------------------------------------------------------------
[#Report    :Txo_Image_Report]
        Add    : Option    : Txo_DynMic_ImageCol    : Yes


    [!Report    : Txo_DynMic_ImageCol]
        Variable    :  Txo_DynMic_TDLLoaded
        Variable    :  Txo_DynMic_LocalTDL
        On        : Load    : @@IsMultiColImagePrintEnabled            : Call    :  Txo_DynMicImageWrite
        On        : Load    : Not @@IsMultiColImagePrintEnabled        : Call    :  Txo_DynMic_DelTdlFiles
        On        : Load    : Not @@IsMultiColImagePrintEnabled        : UnLoad TDL    :    ##Txo_DynMic_LocalTDL


; Part Defintions
;----------------------------------------------------------------------------------------------------------------------------------------------
[Part: Txo ClPageBreak]

    Line    : DSP ContLine
    Border  : Full Thin Top



[Form: Txo_Image_Report]
;    BottomButton: Btn_Txo_Auto
    Buttons        : PrintButton, ExportButton


    Button        : Txo_StkImage_Refresh
    Button        : Txo_PrintImageReport

    Buttons            : PrintButton, ExportButton, UploadButton, MailButton
    Bottom ToolBar Button:  FirstBottomBlankButton , SecondBottomBlankButton, ThirdBottomBlankButton    ;, ForthBottomBlankButton
    Bottom ToolBar Button:  Txo_Image_First, Txo_Image_Prev, Txo_Image_GoTo, Txo_Image_Next, Txo_Image_Last

    Parts        : Txo_Image_Title, Txo_Impage_Part; Txo_Image_Body;    Txo_Parts_A_B
    Page Break  : Txo ClPageBreak, Txo_Image_OpPage
    Height        : 100% Page
    Width        : 100% Page
    Space Top    : 0
    Space Left    : 0
    Background    : Released Pale Yellow
    Option        : Txo_Image_Prnt_Titles    : $$InPrintMode
    Option        : Taxo_Auto_Option     : ##svTxoPageChng
    Set            : svTxoPageChng : No
    Set            : svTxoImgPageNo : ##svTxoImgPageNo
    Set            : svNumPages     : ##svNumPages

    [!Form: Taxo_Auto_Option]




    [!Form: Txo_Image_Prnt_Titles]

        Add         : Parts     : At Beginning  : DSP CompanyName, DSP CompanyAddress, DSP ReportTitle
           Space Left    : 0.25 inch
           Space Right    : 0.25 inch


    [Part: Txo_Image_OpPage]

        Parts       : DSP CompanyName, DSP CompanyAddress, DSP ReportTitle, Txo_Image_Title
        Vertical    : Yes


    [Part: Txo_Image_Title]

        Lines        : Txo_Image_Title1, Txo_Image_Title2
        Border      : Thin Top

        [Line: Txo_Image_Title1]

            Use            : Txo_Image_Title2
            Local        : Field        : Name Field            : Set as        : "Image Gallery"
            Local        : Field        : Name Field            : Space Left    : 2
            Local        : Field        : Txo_ExpInv_Logo_A_A    : Set as        : $$LocaleString:"Page " + $$String:##svTxoImgPageNo + " of (" + $$String:##SvNumPages+ ")"
            Local        : Field        : Txo_ExpInv_Logo_A_A    : Lines            : 0
            Local        : Field        : Txo_ExpInv_Logo_A_A    : Style            : Tiny Bold
            Local        : Field        : Txo_ExpInv_Logo_A_A    : Alignment        : Right
            Local        : Field        : Txo_ExpInv_Logo_A_A    : Space Right    : 5
            Invisible   : $$IsCommon:SVCurrentCompany AND $$InPrintMode
            Space Top    : 1

        [Line: Txo_Image_Title2]

            Fields        : Name Field, Txo_ExpInv_Logo_A_A
            Local        : Field        : Default                : Style            : Normal
            Local        : Field        : Name Field            : Set as        : $$LocaleString:"Page " + $$String:$$PageNo    ;+ " (" + $$PartNo + ")"
            Local        : Field        : Name Field            : Style            : Normal Bold
            Local        : Field        : Name Field            : WideSpaced    : Yes
            Local        : Field        : Txo_ExpInv_Logo_A_A    : Set as        :""

            Repeat        : Txo_ExpInv_Logo_A_A



    [Part: Txo_Impage_Part]
        Part    :  Txo_Image_Body_Hrz
        Vertical    : Yes

        Common Border    : Yes
        Space Left    : 2
        Space Right    : 2
        Space Top    : 0.50

        Option    : Add_Txo_Image_Body_Vrt : ##svNumItemsVrt > 1
   

    [!Part    : Add_Txo_Image_Body_Vrt]
        Add    : Part    : Txo_Image_Body_Vrt


    [Part: Txo_Image_Body_Hrz]
        Left Part    : Txo_Image_Col_1
        Vertical    : No
        Common Border    : Yes

        [Part    : Txo_Image_Col_1]
            Use    : Txo_Image_Part_A

            Local : Field    :  Txo_ExpInv_ColFld :Set As : 1

    [Part    :Txo_Image_Body_Vrt]
        Part    : Txo_Image_Row_1
        Vertical: Yes
        Common Border    : Yes
   
        [Part    : Txo_Image_Row_1]
            Use    : Txo_Image_Body_Hrz
            Local : Field    :  Txo_ExpInv_RowFld :Set As : 2

[Part: Txo_Image_Part_A]
        Part    : Txo_Parts_A_A, Txo_Parts_A_B, Txo_Image_Empty_Part
        ;ght Part    :
        Vertical    : No
        Width        : 50 % Screen
        Height        : 20 % Screen
        Common Border    : Yes
        Space Bottom    :0.2

[Part    :Txo_Image_Empty_Part]
        Line    : Txo_Image_Empty_Line
        Width    : .50

        [Line    :Txo_Image_Empty_Line]
            Field : Txo_Image_Empty_Field

            [Field : Txo_Image_Empty_Field]
                Set as    :""

[Part: Txo_Parts_A_A]

        Lines         : Txo_ExpInv_Logo_A_A

        space Left         : 1
        space Top         : 1
        space bottom     : 1
        Vertical        : Yes

        Graph Type        : if NOT $$IsFileExists:@ImagePath then @EmptyPath else @ImagePath
        Height             : If $$InPrintMode    Then 10 Else 8;25% Screen
        Width              : If $$InPrintMode    Then 50* (100/##svNumItemsHrz)/ 50 else 25 * (100/##svNumItemsHrz)/25
        HorizontalAlign : Left
        Vertical    : Centre
        lclCurrentPath     : ($$CurrentTableObj:$Path)
        lclDataPath        : $Destination:Company:##SvCurrentCompany
        lclCompNum        : $CompanyNumber:Company:##SVCurrentCompany
        Border            : Taxo_Left_Thin_Cover

        PartKey            : $$CollectionFieldByKey:$ItemPart:@NameSearchKey:xTxo_StockItemsPge


        NameSearchKey    : $$String:#Txo_ExpInv_PgeFld+"."+$$String:#Txo_ExpInv_RowFld+"."+$$String:#Txo_ExpInv_ColFld
        ImagePath        : $$LocaleString:@lclDataPath+"\Itempic\"+@PartKey+".jpg"
        EmptyPath        : $$LocaleString:@lclDataPath+"\Itempic\Empty.jpg"


[Line: Txo_ExpInv_Logo_A_A]
        Field     :Txo_ExpInv_Logo_A_A
        Repeat    :Txo_ExpInv_Logo_A_A
        Height    : 1.5
    ;    Space Top    : 1
    ;    Space Bottom    : 1

[Field: Txo_ExpInv_Logo_A_A]
        Set as: ""

; Borders
;;----------------------------------------------------------------------------------------------------------------------------------------
[Border: Taxo_Left_Thin_Cover]

    Top         : Thin
    Left        : Thin
    Bottom       : Thin

[Border: Taxo_Right_Thin_Cover]

    Top         : Thin
    Bottom       : Thin
    Right       : Thin


[Part: Txo_Parts_A_B]
        Line    :Txo_Parts_A_B
        Border    : Taxo_Right_Thin_Cover
    ;    Scroll    : Vertical
        Height        : If $$InPrintMode Then 8 else 6
        Vertical    : Yes
    ;    Height        : 20 % Screen

[Line    :Txo_Parts_A_B]
        Lines : Txo_ExpInv_AccLine, Txo_ExpInv_Name_AB, Txo_ExpInv_Part_AB, Txo_ExpInv_Price_AB, Txo_ExpInv_Stock_AB
        Space Bottom    : 1


[Line    : Txo_ExpInv_AccLine]
        Field    :  Txo_ExpInv_PgeFld, Txo_ExpInv_RowFld, Txo_ExpInv_ColFld
        Invisible    : Yes

    [Field    :  Txo_ExpInv_PgeFld]
        Use : Name Field
        Set as    : ##svTxoImgPageNo
        Set Always    : Yes

    [Field    :  Txo_ExpInv_RowFld]
        Use : Name Field
        Set as    : 1
        Set Always    : Yes

    [Field    :  Txo_ExpInv_ColFld]
        Use : Number Field
        Set Always    : Yes
        Set as    : 1

[Line: Txo_ExpInv_Name_AB]
    Field : Txo_ExpInv_Name_AB
    Repeat: Txo_ExpInv_Name_AB
    Local   : Field : Simple Prompt : Style       : Small Bold
    Local   : Field : Simple Prompt : Type        : String
    Local   : Field : Simple Prompt : Width       : 15
    Local   : Field : Simple Prompt : Color       : Blue

    Local     : Field :Simple Prompt     : Info      : "Item Name"

    Height        : 1.5
    Space Top    : 1


[Field: Txo_ExpInv_Name_AB]
    Field : Simple Prompt, Txo_ExpInv_Name_ABField

[Field: Txo_ExpInv_Name_ABField]
    Use        : Name Field
    Set as  : $$CollectionFieldByKey:$ItemName:@NameSearchKey:xTxo_StockItemsPge
    Width    : 30
    Style    : Tiny
    NameSearchKey    : $$String:#Txo_ExpInv_PgeFld+"."+$$String:#Txo_ExpInv_RowFld+"."+$$String:#Txo_ExpInv_ColFld

[Line: Txo_ExpInv_Part_AB]
    Field     : Txo_ExpInv_Part_AB
    Repeat     : Txo_ExpInv_Part_AB
    Local   : Field :Simple Prompt : Style       : Small Bold
    Local   : Field :Simple Prompt : Type        : String
    Local   : Field :Simple Prompt : Width       : 15
    Local   : Field :Simple Prompt : Color       : Blue

    Local     : Field :Simple Prompt : Info          : "Part No."
    Height    : 1.5

[Field: Txo_ExpInv_Part_AB]
    Field : Simple Prompt, Txo_ExpInv_Part_ABField

[Field: Txo_ExpInv_Part_ABField]
    Use        : Name Field
    ;Set as : $$DescName

    Set as  : $$CollectionFieldByKey:$ItemPart:@NameSearchKey:xTxo_StockItemsPge
    Width    : 30
    Style    : Tiny
    NameSearchKey    : $$String:#Txo_ExpInv_PgeFld+"."+$$String:#Txo_ExpInv_RowFld+"."+$$String:#Txo_ExpInv_ColFld


[Line: Txo_ExpInv_Price_AB]
    Field     : Txo_ExpInv_Price_AB
    Repeat     : Txo_ExpInv_Price_AB
    Local   : Field : Simple Prompt : Style       : Small Bold
    Local   : Field : Simple Prompt : Type        : String
    Local   : Field : Simple Prompt : Width       : 15
    Local   : Field : Simple Prompt : Color       : Blue

    Local     : Field : Simple Prompt  : Info       : "Price"
    Height    : 1.5

[Field: Txo_ExpInv_Price_AB]
    Field : Simple Prompt,Txo_ExpInv_Price_ABField

[Field: Txo_ExpInv_Price_ABField]
    Use        : Rate Price Field
    Set as  : $$CollectionFieldByKey:$ItemRate:@NameSearchKey:xTxo_StockItemsPge
    Width    : 30
    Style    : Tiny
    NameSearchKey    : $$String:#Txo_ExpInv_PgeFld+"."+$$String:#Txo_ExpInv_RowFld+"."+$$String:#Txo_ExpInv_ColFld


[Line: Txo_ExpInv_Stock_AB]
    Field     : Txo_ExpInv_Stock_AB
    Repeat     : Txo_ExpInv_Stock_AB
    Local   : Field : Simple Prompt : Style       : Small Bold
    Local   : Field : Simple Prompt : Type        : String
    Local   : Field : Simple Prompt : Width       : 15
    Local   : Field : Simple Prompt : Color       : Blue

    Local     : Field :Simple Prompt : Info          : "Stock "
    Space Bottom    : 1
    ;Border            : Thin Bottom
    Height    : 1.5
    Space Bottom    : 1

[Field: Txo_ExpInv_Stock_AB]
    Field     : Simple Prompt,Txo_ExpInv_Stock_ABField


[Field: Txo_ExpInv_Stock_ABField]
    Use        : Qty Primary Field
    Set as  : $$CollectionFieldByKey:$ItemClos:@NameSearchKey:xTxo_StockItemsPge
    Width    : 30
    Style    : Tiny
    NameSearchKey    : $$String:#Txo_ExpInv_PgeFld+"."+$$String:#Txo_ExpInv_RowFld+"."+$$String:#Txo_ExpInv_ColFld
    Alignment    : Left


; Helper Button to Refersh the TDL during code check
;;----------------------------------------------------------------------------------------------------------------------------------------

[Button        : Txo_StkImage_Refresh]
    Key        : Ctrl + F5
    Title    : Refresh
    Action    : Refresh TDL
    Inactive: No

; Image Bottom Key, buttons and Functions
;;----------------------------------------------------------------------------------------------------------------------------------------


[Button    : FirstBottomBlankButton]
    Title   : $$LocaleString:""

    Inactive: Yes
    Key        : Alt + X

[Key    : SecondBottomBlankButton]
    Title   : $$LocaleString:""
    Inactive: Yes
    Key        : Alt + Y

[Key    : ThirdBottomBlankButton]
    Title   : $$LocaleString:""
    Inactive: Yes
    Key        : Alt + Z

[Key    : ForthBottomBlankButton]
    Title   : $$LocaleString:""
    Inactive: Yes
    Key        : Alt + Z


[Button    : Txo_Image_First]
    Title   : $$LocaleString:"  First Page"
    Inactive: ##svTxoImgPageNo =1
    Key        : Ctrl + Home
    Mode    : Display

    ActionEx    :001 :Set    : svTxoImgPageNo : 1
    ActionEx    :002 :Set    : svTxoPageChng : Yes

[Button    : Txo_Image_Prev]
    Title   : $$LocaleString:" Prev Page"
    Inactive: ##svTxoImgPageNo =1
    Key     : Ctrl + PgDn
    Mode    : Display
    ActionEx    :001 : Call    : Txo_DecrementPage


[Button    : Txo_Image_GoTo]
    Title   : $$LocaleString:"  Go  To  "
;    Inactive: Yes
    Key        : Ctrl + G
    Mode    : Display
    ActionEx    :001  : Modify Variables    : Txo_Got_ImagePage; : $$Min:(##svTxoImgPageNo +1):##svNumPages

[Button    : Txo_Image_Next]
    Title   : $$LocaleString:"  Next Page"
    Inactive: ##svTxoImgPageNo = ##svNumPages
    Key     : Ctrl + PgUp
    Mode    : Display
    ActionEx    :001  : Call    : Txo_IncrementPage; : $$Min:(##svTxoImgPageNo +1):##svNumPages


[Function    : Txo_IncrementPage]
    100 : Set    : svTxoImgPageNo :  $$Min:(##svTxoImgPageNo +1):##svNumPages
    200 : Log    : ##svTxoImgPageNo
    300    : Log    : ##svNumPages
    400 : Set    : svTxoPageChng : Yes

[Function    : Txo_DecrementPage]
    100 : Set    : svTxoImgPageNo :  $$Max:(##svTxoImgPageNo -1):1
    200 : Log    : ##svTxoImgPageNo
    300    : Log    : ##svNumPages
    400 : Set    : svTxoPageChng : Yes

[Button    : Txo_Image_Last]
    Title   : $$LocaleString:"  Last Page"
    Inactive: ##svTxoImgPageNo = ##svNumPages
    Key        : Ctrl + End
    Mode    : Display
    ActionEx    :001 :Set    : svTxoImgPageNo : ##svNumPages
    ActionEx    :002 :Set    : svTxoPageChng : Yes

[Button        : Txo_PrintImageReport]
    Title   : $$LocaleString:"  Print Iamges"

    Key        : Ctrl + P
    Mode    : Display
    ActionEx    :001 : Print: Txo_Print_Image_Report

[Report: Txo_Image_Columns]

    Auto        : Yes
    Title       : $$LocaleString:"Image Setting"

[Form: Txo_Image_Columns]

    No Confirm  : No
    Full Width  : No

    Space Top   : 1
    Space Bottom: 1
    Space Left  : 1
    Space Right : 1

    Background  : @@SV_UNYELLOW
    Parts       : Txo_Image_Columns
    Option      : Small Size Form
;    Output        : Txo_Image_Columns

    On             : Form Accept    : Yes  : Set    :  svNumItemsHrz: $$Number:#Txo_Image_CollHrz
    On             : Form Accept    : Yes  : Set    :  svNumItemsVrt: $$Number:#Txo_Image_CollVrt
                     
    On             : Form Accept    : Yes   : Call    : Taxo_Walk_Hrz_Vrt
                    
    On             : Form Accept    : Yes      : Form Accept



[Part: Txo_Image_Columns]

    Lines       : Form SubTitle, Txo_Image_Columns
    Local       : Field : Form SubTitle         : Info      : $$LocaleString:"Iamges Per Page"



    [Line:  Txo_Image_AutoTitle]

        Fields      : Medium Prompt

        Local       : Field : Medium Prompt     : Info         : $$LocaleString:" Set Automatic "

        SpaceTop : 1

    [Line: Txo_Image_Columns]

        Fields      : Medium Prompt, Txo_Image_Columns, Txo_Image_CollHrz, Txo_Image_CollVrt
        Local       : Field : Medium Prompt     : Info         : $$LocaleString:" Image : Row x Col :"
        SpaceBottom : 0.25

        [Field: Txo_Image_Columns]

            Use         : Short Name Field
            Table       : Txo_Image_Columns
            Show Table  : Always
            Inactive    : #Txo_Image_Define

        [Field: Txo_Image_CollHrz]

            Use            : Number Field
        ;    Invisible   : Yes
            Set as      : $$Table:Txo_Image_Columns:$VarValueHrz
            Modifies    : svNumItemsHrz
            Set always  : Yes
            Skip        : Yes

        [Field: Txo_Image_CollVrt]

            Use            : Number Field
        ;    Invisible   : Yes
            Set as      : $$Table:Txo_Image_Columns:$VarValueVrt
            Modifies    : svNumItemsVrt
            Set always  : Yes
            Skip        : Yes


;; Object Based Collections to hold Image Col x Row
;------------------------------------------------------------------------------------------------------------------------------------------------


[Collection: Txo_Image_Columns]

    Title       : $$LocaleString:"Rows x Column"

    Object        : Image_Column_2by2, Image_Column_2by3, Image_Column_3by2
    Object        : Image_Column_3by3, Image_Column_3by4, Image_Column_4by3
    Object        : Image_Column_4by4, Image_Column_5by4, Image_Column_4by5
    Object        : Image_Column_5by5, Image_Column_5by6, Image_Column_6by5
    Object        : Image_Column_6by6
    Fetch        : Name, VarValueHrz, VarValueVrt
;    Filter        : Belongs
    Format      : $$Name, 12

    Client Only : Yes





[Object: Image_Column_2by2]

    Name        : $$LocaleString:"2  x  2"
    VarValueHrz    :  2
    VarValueVrt    :  2
    Order        :  1


[Object: Image_Column_2by3]

    Name        : $$LocaleString:"2  x  3"
    VarValueHrz    :  2
    VarValueVrt    :  3
    Order        :  2

[Object: Image_Column_3by2]

    Name        : $$LocaleString:"3  x  2"
    VarValueHrz    :  3
    VarValueVrt    :  2
    Order        :  3

[Object: Image_Column_3by3]

    Name        : $$LocaleString:"3  x  3"
    VarValueHrz    :  3
    VarValueVrt    :  3
    Order        :  4

[Object: Image_Column_3by4]

    Name        : $$LocaleString:"3  x  4 "
    VarValueHrz    :  3
    VarValueVrt    :  4
    Order        :  5

[Object: Image_Column_4by3]

    Name        : $$LocaleString:"4  x  3"
    VarValueHrz    :  4
    VarValueVrt    :  3
    Order        :  6

[Object: Image_Column_4by4]

    Name        : $$LocaleString:"4  x  4"
    VarValueHrz    :  4
    VarValueVrt    :  4
    Order        :  7

[Object: Image_Column_4by5]

    Name        : $$LocaleString:"4  x  5"
    VarValueHrz    :  4
    VarValueVrt    :  5
    Order        :  7


[Object: Image_Column_5by4]

    Name        : $$LocaleString:"5  x  4"
    VarValueHrz    :  5
    VarValueVrt    :  4
    Order        :  9

[Object: Image_Column_5by5]

    Name        : $$LocaleString:"5  x  5"
    VarValueHrz    :  5
    VarValueVrt    :  5
    Order        :  10


[Object: Image_Column_6by4]

    Name        : $$LocaleString:"6  x  4"
    VarValueHrz    :  6
    VarValueVrt    :  4
    Order        :  11

[Object: Image_Column_4by6]

    Name        : $$LocaleString:"4  x  6"
    VarValueHrz    :  4
    VarValueVrt    :  6
    Order        :  12

[Object: Image_Column_6by5]

    Name        : $$LocaleString:"6  x  5"
    VarValueHrz    :  6
    VarValueVrt    :  5
    Order        :  13

[Object: Image_Column_5by6]

    Name        : $$LocaleString:"5  x  6"
    VarValueHrz    :  5
    VarValueVrt    :  6
    Order        :  14

[Object: Image_Column_6by6]

    Name        : $$LocaleString:"6  x  6"
    VarValueHrz    :  6
    VarValueVrt    :  6
    Order        :  15

; Collections that can be used to select Image Row x Col.. for future use
;-------------------------------------------------------------------------------------------------------------------------------------
[Collection: Image_Column_Col]

    Title        : $$LocaleString:"Columns"
    List Name    : 1,2,3,4,5,6,7,8
    Fetch        : Name
    Format        : $$Number:$Name, 5

[Collection: Image_Column_Row]

    Title        : $$LocaleString:"Rows"
    List Name    : 1,2,3,4,5,6,7,8
    Fetch        : Name
    Format        : $$Number:$Name, 5


```
