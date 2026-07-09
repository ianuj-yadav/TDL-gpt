---
title: tally-colors
type: sample_code
objects: Report, Form, Part, Line, Field, Collection
source: tally-colors.txt
---

# tally-colors

## Source Code

```tdl
[#Menu:Gateway of tally]
	Add		: Item	: Tally Colors		: Display	: TallyColors
	

[Report:TallyColors]
	Form		: TallyColors
	
[Form:TallyColors]
	Height	: 100% Page
	Width	: 100% Page
	Part	: TallyColors
	
[Part:TallyColors]
	Line		: TallyColor
	Repeat		: TallyColor		: TallyColors
	Scroll		: Vertical
	[Line:TallyColor]
		Field		: TallyColor
		Height		: 1
		[Field:TallyColor]
			Set as		: $Name
			Background	: $name
			Full Width	: Yes


[Collection:TallyColors]
	Object	: White,Cyan Blue,CmpTitleFG,Light Grey,Line Selection Monochrome,Primary Cursor On Selected Line MonoChrome,Primary Cursor MonoChrome,Split Cursor Monochrome,Split Cursor On Line Selection,VeryLightGrey,DeepBlue,Black,Warning Amber,Error Red,ReportTitle Color,Inactive Grey,MenuIndentFG,Blanched Almond,Deep Grey,Deeper Grey,Alice Blue,TrialMenuBG,SymbolFG,MidGrey,Tile Border,Tile Title,TopButton Border,Right Bar Border,CmpZoneTitleBorder,PaleCyan,TopButtonTitleFGClr,TopButtonInActiveKeyFGClr,Tory Blue,Grey,Nero Shadow,StoneGrey,TopNonMenuButtonBG,TopNonMenuButtonKeyFG,TopNonMenuButtonInactiveFG,Sky Blue Lighter,Right ButtonBar BG,RightButtonKeyFGClr,RightButtonTitleFGClr,LemonChiffon,LightCyan,InlineButtonKeyFG,InlineButtonTitleFG,InlineButtonFocusBG,InlineButton Border,CalcBGClr,DashBoardClr,ActiveHeaderText,VocherTypeClr,Pattens Blue,Light Black,Menu Grey,Cerulean Blue,MsgBG,QueryBg,Amber Yellow,Red,Ruler Grey,Ruler Yellow,Zoom Preview Pink,QueryBox Border,TitleTxt,MenuParentFG,Karry Orange,YesNoQry,Strong Cyan Blue,TopNonMenuButtonHoverBG,Stone Wash Yellow,Stone Wash Red,InactiveHeaderText,Amber,Amber Primary Cursor,Indochine,EditFieldBG,EditFieldBorderFG,AppTitleBarBG,SearchBarButtonBG,MenuHotKeyFG,MenuCursorHotKeyFG,TopButtonShortcutFG,TopButtonFG,Server License Color,Top Btn Mgmt,AppTitleFG,Blue,Soft Violet,Magenta,Yellow,Green,AppInactiveClr,Border Color For Server,FormBG,Grey SearchBar,SearchBarBG,SearchBar Color,Popup BG,Popup FG,Popup Cursor BG,Popup Inactive FG,Popup Indented FG,Popup Hotkey FG,Popup Cursor Hotkey FG,Popup Shortcut FG,Popup Symbol FG,Popup Border,Cascade Border Color,Cascade FG Color,CascadeArrowBorderInactive,CascadeArrowSelectedBG,Popup BG Monochrome,Popup FG Monochrome,Popup Cursor BG Monochrome,Popup Cursor FG Monochrome,Popup Inactive FG Monochrome,Popup Indented FG Monochrome,Popup Hotkey FG Monochrome,Popup Cursor Hotkey FG Monochrome,Popup Shortcut FG Monochrome,Popup Symbol FG Monochrome,Popup Border Monochrome,Alert Symbol FG Monochrome,BottomButtonKeyFGClr,BottomButtonTitleFGClr,BottomToolBar BG,Active Tile Border,Graph Cursor Border,Carolina Blue,Water Blue,Iceberg Blue,Jumbo Grey,Grey Light,Smalt Blue,Onahau Blue,Storm Dust Grey,Zeus Grey,Gainsboro White,Dark Cerulean Blue,Tuatara Grey,Note Grey,SearchBarTxtColor
	

[Object:White]
	Name		: 'White'


[Object:Cyan Blue]
	Name		: 'Cyan Blue'


[Object:CmpTitleFG]
	Name		: 'CmpTitleFG'


[Object:Light Grey]
	Name		: 'Light Grey'


[Object:Line Selection Monochrome]
	Name		: 'Line Selection Monochrome'


[Object:Primary Cursor On Selected Line MonoChrome]
	Name		: 'Primary Cursor On Selected Line MonoChrome'


[Object:Primary Cursor MonoChrome]
	Name		: 'Primary Cursor MonoChrome'


[Object:Split Cursor Monochrome]
	Name		: 'Split Cursor Monochrome'


[Object:Split Cursor On Line Selection]
	Name		: 'Split Cursor On Line Selection'


[Object:VeryLightGrey]
	Name		: 'VeryLightGrey'


[Object:DeepBlue]
	Name		: 'DeepBlue'


[Object:Black]
	Name		: 'Black'


[Object:Warning Amber]
	Name		: 'Warning Amber'


[Object:Error Red]
	Name		: 'Error Red'


[Object:ReportTitle Color]
	Name		: 'ReportTitle Color'


[Object:Inactive Grey]
	Name		: 'Inactive Grey'


[Object:MenuIndentFG]
	Name		: 'MenuIndentFG'


[Object:Blanched Almond]
	Name		: 'Blanched Almond'


[Object:Deep Grey]
	Name		: 'Deep Grey'


[Object:Deeper Grey]
	Name		: 'Deeper Grey'


[Object:Alice Blue]
	Name		: 'Alice Blue'


[Object:TrialMenuBG]
	Name		: 'TrialMenuBG'


[Object:SymbolFG]
	Name		: 'SymbolFG'


[Object:MidGrey]
	Name		: 'MidGrey'


[Object:Tile Border]
	Name		: 'Tile Border'


[Object:Tile Title]
	Name		: 'Tile Title'


[Object:TopButton Border]
	Name		: 'TopButton Border'


[Object:Right Bar Border]
	Name		: 'Right Bar Border'


[Object:CmpZoneTitleBorder]
	Name		: 'CmpZoneTitleBorder'


[Object:PaleCyan]
	Name		: 'PaleCyan'


[Object:TopButtonTitleFGClr]
	Name		: 'TopButtonTitleFGClr'


[Object:TopButtonInActiveKeyFGClr]
	Name		: 'TopButtonInActiveKeyFGClr'


[Object:Tory Blue]
	Name		: 'Tory Blue'


[Object:Grey]
	Name		: 'Grey'


[Object:Nero Shadow]
	Name		: 'Nero Shadow'


[Object:StoneGrey]
	Name		: 'StoneGrey'


[Object:TopNonMenuButtonBG]
	Name		: 'TopNonMenuButtonBG'


[Object:TopNonMenuButtonKeyFG]
	Name		: 'TopNonMenuButtonKeyFG'


[Object:TopNonMenuButtonInactiveFG]
	Name		: 'TopNonMenuButtonInactiveFG'


[Object:Sky Blue Lighter]
	Name		: 'Sky Blue Lighter'


[Object:Right ButtonBar BG]
	Name		: 'Right ButtonBar BG'


[Object:RightButtonKeyFGClr]
	Name		: 'RightButtonKeyFGClr'


[Object:RightButtonTitleFGClr]
	Name		: 'RightButtonTitleFGClr'


[Object:LemonChiffon]
	Name		: 'LemonChiffon'


[Object:LightCyan]
	Name		: 'LightCyan'


[Object:InlineButtonKeyFG]
	Name		: 'InlineButtonKeyFG'


[Object:InlineButtonTitleFG]
	Name		: 'InlineButtonTitleFG'


[Object:InlineButtonFocusBG]
	Name		: 'InlineButtonFocusBG'


[Object:InlineButton Border]
	Name		: 'InlineButton Border'


[Object:CalcBGClr]
	Name		: 'CalcBGClr'


[Object:DashBoardClr]
	Name		: 'DashBoardClr'


[Object:ActiveHeaderText]
	Name		: 'ActiveHeaderText'


[Object:VocherTypeClr]
	Name		: 'VocherTypeClr'


[Object:Pattens Blue]
	Name		: 'Pattens Blue'


[Object:Light Black]
	Name		: 'Light Black'


[Object:Menu Grey]
	Name		: 'Menu Grey'


[Object:Cerulean Blue]
	Name		: 'Cerulean Blue'


[Object:MsgBG]
	Name		: 'MsgBG'


[Object:QueryBg]
	Name		: 'QueryBg'


[Object:Amber Yellow]
	Name		: 'Amber Yellow'


[Object:Red]
	Name		: 'Red'


[Object:Ruler Grey]
	Name		: 'Ruler Grey'


[Object:Ruler Yellow]
	Name		: 'Ruler Yellow'


[Object:Zoom Preview Pink]
	Name		: 'Zoom Preview Pink'


[Object:QueryBox Border]
	Name		: 'QueryBox Border'


[Object:TitleTxt]
	Name		: 'TitleTxt'


[Object:MenuParentFG]
	Name		: 'MenuParentFG'


[Object:Karry Orange]
	Name		: 'Karry Orange'


[Object:YesNoQry]
	Name		: 'YesNoQry'


[Object:Strong Cyan Blue]
	Name		: 'Strong Cyan Blue'


[Object:TopNonMenuButtonHoverBG]
	Name		: 'TopNonMenuButtonHoverBG'


[Object:Stone Wash Yellow]
	Name		: 'Stone Wash Yellow'


[Object:Stone Wash Red]
	Name		: 'Stone Wash Red'


[Object:InactiveHeaderText]
	Name		: 'InactiveHeaderText'


[Object:Amber]
	Name		: 'Amber'


[Object:Amber Primary Cursor]
	Name		: 'Amber Primary Cursor'


[Object:Indochine]
	Name		: 'Indochine'


[Object:EditFieldBG]
	Name		: 'EditFieldBG'


[Object:EditFieldBorderFG]
	Name		: 'EditFieldBorderFG'


[Object:AppTitleBarBG]
	Name		: 'AppTitleBarBG'


[Object:SearchBarButtonBG]
	Name		: 'SearchBarButtonBG'


[Object:MenuHotKeyFG]
	Name		: 'MenuHotKeyFG'


[Object:MenuCursorHotKeyFG]
	Name		: 'MenuCursorHotKeyFG'


[Object:TopButtonShortcutFG]
	Name		: 'TopButtonShortcutFG'


[Object:TopButtonFG]
	Name		: 'TopButtonFG'


[Object:Server License Color]
	Name		: 'Server License Color'


[Object:Top Btn Mgmt]
	Name		: 'Top Btn Mgmt'


[Object:AppTitleFG]
	Name		: 'AppTitleFG'


[Object:Blue]
	Name		: 'Blue'


[Object:Soft Violet]
	Name		: 'Soft Violet'


[Object:Magenta]
	Name		: 'Magenta'


[Object:Yellow]
	Name		: 'Yellow'


[Object:Green]
	Name		: 'Green'


[Object:AppInactiveClr]
	Name		: 'AppInactiveClr'


[Object:Border Color For Server]
	Name		: 'Border Color For Server'


[Object:FormBG]
	Name		: 'FormBG'


[Object:Grey SearchBar]
	Name		: 'Grey SearchBar'


[Object:SearchBarBG]
	Name		: 'SearchBarBG'


[Object:SearchBar Color]
	Name		: 'SearchBar Color'


[Object:Popup BG]
	Name		: 'Popup BG'


[Object:Popup FG]
	Name		: 'Popup FG'


[Object:Popup Cursor BG]
	Name		: 'Popup Cursor BG'


[Object:Popup Inactive FG]
	Name		: 'Popup Inactive FG'


[Object:Popup Indented FG]
	Name		: 'Popup Indented FG'


[Object:Popup Hotkey FG]
	Name		: 'Popup Hotkey FG'


[Object:Popup Cursor Hotkey FG]
	Name		: 'Popup Cursor Hotkey FG'


[Object:Popup Shortcut FG]
	Name		: 'Popup Shortcut FG'


[Object:Popup Symbol FG]
	Name		: 'Popup Symbol FG'


[Object:Popup Border]
	Name		: 'Popup Border'


[Object:Cascade Border Color]
	Name		: 'Cascade Border Color'


[Object:Cascade FG Color]
	Name		: 'Cascade FG Color'


[Object:CascadeArrowBorderInactive]
	Name		: 'CascadeArrowBorderInactive'


[Object:CascadeArrowSelectedBG]
	Name		: 'CascadeArrowSelectedBG'


[Object:Popup BG Monochrome]
	Name		: 'Popup BG Monochrome'


[Object:Popup FG Monochrome]
	Name		: 'Popup FG Monochrome'


[Object:Popup Cursor BG Monochrome]
	Name		: 'Popup Cursor BG Monochrome'


[Object:Popup Cursor FG Monochrome]
	Name		: 'Popup Cursor FG Monochrome'


[Object:Popup Inactive FG Monochrome]
	Name		: 'Popup Inactive FG Monochrome'


[Object:Popup Indented FG Monochrome]
	Name		: 'Popup Indented FG Monochrome'


[Object:Popup Hotkey FG Monochrome]
	Name		: 'Popup Hotkey FG Monochrome'


[Object:Popup Cursor Hotkey FG Monochrome]
	Name		: 'Popup Cursor Hotkey FG Monochrome'


[Object:Popup Shortcut FG Monochrome]
	Name		: 'Popup Shortcut FG Monochrome'


[Object:Popup Symbol FG Monochrome]
	Name		: 'Popup Symbol FG Monochrome'


[Object:Popup Border Monochrome]
	Name		: 'Popup Border Monochrome'


[Object:Alert Symbol FG Monochrome]
	Name		: 'Alert Symbol FG Monochrome'


[Object:BottomButtonKeyFGClr]
	Name		: 'BottomButtonKeyFGClr'


[Object:BottomButtonTitleFGClr]
	Name		: 'BottomButtonTitleFGClr'


[Object:BottomToolBar BG]
	Name		: 'BottomToolBar BG'


[Object:Active Tile Border]
	Name		: 'Active Tile Border'


[Object:Graph Cursor Border]
	Name		: 'Graph Cursor Border'


[Object:Carolina Blue]
	Name		: 'Carolina Blue'


[Object:Water Blue]
	Name		: 'Water Blue'


[Object:Iceberg Blue]
	Name		: 'Iceberg Blue'


[Object:Jumbo Grey]
	Name		: 'Jumbo Grey'


[Object:Grey Light]
	Name		: 'Grey Light'


[Object:Smalt Blue]
	Name		: 'Smalt Blue'


[Object:Onahau Blue]
	Name		: 'Onahau Blue'


[Object:Storm Dust Grey]
	Name		: 'Storm Dust Grey'


[Object:Zeus Grey]
	Name		: 'Zeus Grey'


[Object:Gainsboro White]
	Name		: 'Gainsboro White'


[Object:Dark Cerulean Blue]
	Name		: 'Dark Cerulean Blue'


[Object:Tuatara Grey]
	Name		: 'Tuatara Grey'


[Object:Note Grey]
	Name		: 'Note Grey'


[Object:SearchBarTxtColor]
	Name		: 'SearchBarTxtColor'
```
