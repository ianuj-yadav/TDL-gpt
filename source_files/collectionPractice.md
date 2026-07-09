---
title: collectionPractice
type: sample_code
objects: Collection
source: collectionPractice.txt
---

# collectionPractice

## Source Code

```tdl
[Collection:MyColl]
	Type:Ledger
	Child Of:"Sundry Debtors"
	Filter:FilName
[Collection:MyColl1]
	Type:Ledger
	Filter:FilName
[Collection:MyStock]
	Type:StockItem
	Filter:FilName;,FilNameByU
	;Filter:FilNameByU
[System:Formulae]
	FilName:$Name contains "i"
	;FilNameByU:$Name contains "u"

```
