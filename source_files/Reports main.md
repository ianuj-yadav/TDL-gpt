---
title: Reports main
type: sample_code
objects: 
source: Reports main.txt
---

# Reports main

## Source Code

```tdl
[Include:Tabular reports.txt]
[Include:ShowSignature.txt]



[#Menu:Display Menu]
	Add	: Key Item	: Before	: @@LocQuit		: Tabular Stk	: B	: Display	: StockTabular
	Add	: Key Item	: Before	: @@LocQuit		: Signature		: S	: Display	: CompanySignature
```
