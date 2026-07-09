---
title: api maker
type: sample_code
objects: 
source: api maker.txt
---

# api maker

## Source Code

```tdl


Make 100 api in below format 
{
  "transactions": [
    {
      "date": "21.03.2024",
      "voucher_type": "Contra",
      "dr_ledger": "ICICI Bank",
      "cr_ledger": "Cash",
      "amount": 500,
      "narration": "Transfer from Cash to Telephone Expense"
    }
]
}
In This Date ranges from 20.3.24 to 28.3.24, voucher_type is from [Contra,Journal,Payment,Receipt], If voucher_type is Contra then dr_Ledger From [ICICI Bank, Hdfc Bank A/c, Cash] And 
cr_ledger from [ICICI Bank, Hdfc Bank A/c, Cash] but not equal to dr_ledger, If voucher_type is Payment then dr_Ledger From [Jeevan Electronics, Khanna Jeweller, Mangla Steels] And 
cr_ledger from [ICICI Bank, Hdfc Bank A/c, Cash] , If voucher_type is Receipt then dr_Ledger From [ICICI Bank, Hdfc Bank A/c, Cash] And 
cr_ledger from  [ABC Company, Aniket Electronics, Dollar Company, Premium Electronics, Sawaria General Store], Amount Ranges from 10000 to 20000, Narration is "dr_ledger name is debited and 
cr_ledger name is credited on date value in voucher_type name with amount value" 







import random
from datetime import datetime, timedelta

# Define constants
voucher_types = ["Contra", "Journal", "Payment", "Receipt"]
contra_ledgers = ["ICICI Bank", "Hdfc Bank A/c", "Cash"]
payment_dr_ledgers = ["Jeevan Electronics", "Khanna Jeweller", "Mangla Steels"]
receipt_cr_ledgers = ["ABC Company", "Aniket Electronics", "Dollar Company", "Premium Electronics", "Sawaria General Store"]

# Generate 100 transactions
transactions = []

for _ in range(100):
    # Generate random date between 20.3.24 to 28.3.24
    date = datetime(2024, 3, random.randint(20, 28))

    # Choose random voucher type
    voucher_type = random.choice(voucher_types)

    if voucher_type == "Contra":
        dr_ledger = random.choice(contra_ledgers)
        cr_ledger = random.choice([ledger for ledger in contra_ledgers if ledger != dr_ledger])
    elif voucher_type == "Payment":
        dr_ledger = random.choice(payment_dr_ledgers)
        cr_ledger = random.choice(contra_ledgers)
    elif voucher_type == "Receipt":
        dr_ledger = random.choice(contra_ledgers)
        cr_ledger = random.choice(receipt_cr_ledgers)

    # Generate random amount based on voucher type
    if voucher_type == "Receipt":
        amount = random.randint(10000, 20000)
    else:
        amount = random.randint(500, 1500)

    # Generate narration
    narration = f"{dr_ledger} is debited and {cr_ledger} is credited on {date.strftime('%d.%m.%Y')} with {amount}.00 Rupees"

    # Append transaction to transactions list
    transactions.append({
        "date": date.strftime('%d.%m.%Y'),
        "voucher_type": voucher_type,
        "dr_ledger": dr_ledger,
        "cr_ledger": cr_ledger,
        "amount": amount,
        "narration": narration
    })

# Wrap transactions in a dictionary
response = {"transactions": transactions}

# Print the response
print(response)




;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;



import random
from datetime import datetime, timedelta

# Define constants
voucher_types = ["Contra", "Journal", "Payment", "Receipt"]
contra_ledgers = ["ICICI Bank", "Hdfc Bank A/c", "Cash"]
payment_dr_ledgers = ["Jeevan Electronics", "Khanna Jeweller", "Mangla Steels"]
receipt_cr_ledgers = ["ABC Company", "Aniket Electronics", "Dollar Company", "Premium Electronics", "Sawaria General Store"]

# Generate 100 transactions
transactions = []

for _ in range(10000):
    # Generate random date between 20.3.24 to 28.3.24
    d =  random.randint(2, 28)
 
    # Choose random voucher type
    voucher_type = random.choice(voucher_types)

    if voucher_type == "Contra":
        dr_ledger = random.choice(contra_ledgers)
        cr_ledger = random.choice([ledger for ledger in contra_ledgers if ledger != dr_ledger])
    elif voucher_type == "Payment":
        dr_ledger = random.choice(payment_dr_ledgers)
        cr_ledger = random.choice(contra_ledgers)
    elif voucher_type == "Receipt":
        dr_ledger = random.choice(contra_ledgers)
        cr_ledger = random.choice(receipt_cr_ledgers)

    # Generate random amount based on voucher type
    if voucher_type == "Receipt":
        amount = random.randint(10000, 20000)
    else:
        amount = random.randint(500, 1500)

    # Generate narration
    narration = f"{dr_ledger} is debited and {cr_ledger} is credited on {d}.03.2024 with {amount}.00 Rupees"

    # Append transaction to transactions list
    transactions.append({
        "date": f'{d}.03.2024',
        "voucher_type": voucher_type,
        "dr_ledger": dr_ledger,
        "cr_ledger": cr_ledger,
        "amount": amount,
        "narration": narration
    })

    
# Wrap transactions in a dictionary
response = {"transactions": transactions}

# Print the response
print(response)

```
