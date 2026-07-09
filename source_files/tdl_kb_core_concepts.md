TDL Architecture and Core Concepts

TDL_Topic: Introduction to TDL

TDL_Subtopic: What is TDL?

Tally Definition Language (TDL) is the application development language of Tally. It is an action-driven, object-oriented language used to customize and extend Tally's default capabilities. Everything you see in Tally (screens, reports, menus) is built using TDL.

TDL_Topic: TDL Components

TDL_Subtopic: Definitions and Attributes

A Definition is the core building block in TDL. It defines the characteristics of an object. Every definition has Attributes that assign specific values or behaviors to it. For example, a Field definition might have attributes like Set as (to assign a value) or Width (to set its size on screen).

TDL_Topic: Objects in TDL

TDL_Subtopic: Interface Objects

Interface Objects define the user interface and what the user sees on the screen. The hierarchy of Interface Objects from top to bottom is: Report -> Form -> Part -> Line -> Field. A Report contains Forms, a Form contains Parts, a Part contains Lines, and a Line contains Fields.

TDL_Subtopic: Data Objects

Data Objects represent the actual data stored in the Tally Database. Examples of Data Objects include Ledger, Group, Voucher, Stock Item, and Company. While Interface Objects handle the visual display, Data Objects handle the underlying information. Interface Objects pull data from Data Objects to display to the user.

TDL_Topic: Formatting and Syntax

TDL_Subtopic: Symbols and Prefixes

TDL uses specific symbols to identify object types:

[ ] (Square Brackets): Used to define a Definition (e.g., [Field: My Field]).

# (Hash): Used to modify an existing default Tally definition (e.g., [#Menu: Gateway of Tally]).

$ (Dollar): Used to access a method or value from a Data Object (e.g., $LedgerName).

$$ (Double Dollar): Used to call a system function (e.g., $$StringLength).