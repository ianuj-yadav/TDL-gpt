---
title: stockitemImage03-02-2025
type: sample_code
objects: Part, Line, Field
source: stockitemImage03-02-2025.txt
---

# stockitemImage03-02-2025

## Source Code

```tdl
			

[#Part: STKI Basic]           
	Add  : Right Part: At End :LWStkImageLink,LearnwellSTKImage
 
[Part:LWStkImageLink]
	Line:linkline
[Line:linkline]
	Field:Short Prompt, StockimageLink
	Local: Field: Short Prompt: Info:$$LocaleString:"Image Link:"

[Field:StockimageLink]
	Use:Name Field
	Storage:Stockimagelink

[System:UDF]
	Stockimagelink:String:12100

[Part:LearnwellSTKImage] 
Line            : Empty                                                                
Image:LearnwellImageSource
Width     : 20% screen
Height    : 20% screen
[Resource:LearnwellImageSource]
Source:$Stockimagelink
Resource Type :jpeg

[#Form:ComprehensiveInvoice]
	Delete		: Parts
	Delete		: Bottom Parts
	Delete		: Page Break
	Add			: Part	: Namaste
    Repeat      : Namaste       : InventoryEntries
	
[Part:Namaste]
	Line		: namaste
    Repeat      : Namaste       : InventoryEntries
	[Line:Namaste]
		Field		: Namaste
        Explode     : ImageItem
        
		[Field:Namaste]
			Set as		: $StockItemName

[Part:ImageItem]
    Line        : Empty
    Image		: LearnwellImageSourceItem
	Width     	: 20% screen
	Height    	: 20% screen
[Resource:LearnwellImageSourceItem]
	Source			: $Stockimagelink:StockItem:$StockItemName
	Resource Type 	: jpeg
    

```
