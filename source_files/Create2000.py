'''
import random
from datetime import datetime, timedelta

def generate_transaction():
    voucher_types = ['Contra', 'Journal', 'Payment', 'Receipt']
    voucher_type = random.choice(voucher_types)
    
    start_date = datetime(2024, 1, 2)
    end_date = datetime(2024, 3, 28)
    date = start_date + timedelta(days=random.randint(0, (end_date - start_date).days))
    
    if voucher_type == 'Contra':
        dr_ledgers = ['ICICI Bank', 'Hdfc Bank A/c', 'Cash']
        cr_ledgers = [ledger for ledger in dr_ledgers if ledger != 'Cash']
        dr_ledger = random.choice(dr_ledgers)
        cr_ledger = random.choice(cr_ledgers)
    elif voucher_type == 'Payment':
        dr_ledgers = ['Jeevan Electronics', 'Khanna Jeweller', 'Mangla Steels']
        cr_ledgers = ['ICICI Bank', 'Hdfc Bank A/c', 'Cash']
        dr_ledger = random.choice(dr_ledgers)
        cr_ledger = random.choice(cr_ledgers)
    elif voucher_type == 'Receipt':
        dr_ledgers = ['ICICI Bank', 'Hdfc Bank A/c', 'Cash']
        cr_ledgers = ['ABC Company', 'Aniket Electronics', 'Dollar Company', 'Premium Electronics', 'Sawaria General Store']
        dr_ledger = random.choice(dr_ledgers)
        cr_ledger = random.choice(cr_ledgers)
    else:  # Journal
        dr_ledger = random.choice(['ICICI Bank', 'Hdfc Bank A/c', 'Cash'])
        cr_ledger = random.choice(['ICICI Bank', 'Hdfc Bank A/c', 'Cash'])
        
    amount = random.randint(10000, 20000)
    narration = f"{dr_ledger} is debited and {cr_ledger} is credited on {date.strftime('%d.%m.%Y')} with amount {amount}"
    
    transaction = {
        "date": date.strftime('%d.%m.%Y'),
        "voucher_type": voucher_type,
        "dr_ledger": dr_ledger,
        "cr_ledger": cr_ledger,
        "amount": amount,
        "narration": narration
    }
    
    return transaction

def generate_100_transactions():
    transactions = []
    for _ in range(2000):
        transaction = generate_transaction()
        transactions.append(transaction)
    return {"transactions": transactions}

api_data = generate_100_transactions()

# Printing the generated API data
print(api_data)
'''



'''
import random
from datetime import datetime, timedelta

def generate_transaction():
    voucher_types = ['Contra', 'Journal', 'Payment', 'Receipt']
    voucher_type = random.choice(voucher_types)
    
    start_date = datetime(2024, 1, 1)
    end_date = datetime(2024, 3, 28)
    date = start_date + timedelta(days=random.randint(0, (end_date - start_date).days))
    
    if voucher_type == 'Contra':
        dr_ledgers = ['ICICI Bank', 'Hdfc Bank A/c', 'Cash']
        dr_ledger = random.choice(dr_ledgers)
        cr_ledgers = [ledger for ledger in dr_ledgers if ledger != dr_ledger]
        cr_ledger = random.choice(cr_ledgers)
    elif voucher_type == 'Payment':
        dr_ledgers = ['Jeevan Electronics', 'Khanna Jeweller', 'Mangla Steels']
        cr_ledger = random.choice(['ICICI Bank', 'Hdfc Bank A/c', 'Cash'])
        dr_ledger = random.choice(dr_ledgers)
    elif voucher_type == 'Receipt':
        dr_ledgers = ['ICICI Bank', 'Hdfc Bank A/c', 'Cash']
        dr_ledger = random.choice([ledger for ledger in dr_ledgers if ledger != 'Cash'])
        cr_ledgers = ['ABC Company', 'Aniket Electronics', 'Dollar Company', 'Premium Electronics', 'Sawaria General Store']
        cr_ledger = random.choice(cr_ledgers)
    else:  # Journal
        dr_ledger = random.choice(['ICICI Bank', 'Hdfc Bank A/c', 'Cash'])
        cr_ledger = random.choice(['ICICI Bank', 'Hdfc Bank A/c', 'Cash'])
        
    amount = random.randint(10000, 20000)
    narration = f"{dr_ledger} is debited and {cr_ledger} is credited on {date.strftime('%d.%m.%Y')} with amount {amount}"
    
    transaction = {
        "date": date.strftime('%d.%m.%Y'),
        "voucher_type": voucher_type,
        "dr_ledger": dr_ledger,
        "cr_ledger": cr_ledger,
        "amount": amount,
        "narration": narration
    }
    
    return transaction

def generate_100_transactions():
    transactions = []
    for _ in range(2000):
        transaction = generate_transaction()
        transactions.append(transaction)
    return {"transactions": transactions}

api_data = generate_100_transactions()

# Printing the generated API data
print(api_data)

'''


import random
import json
from datetime import datetime, timedelta

x = 1
def generate_transaction():
    voucher_types = ['Contra', 'Journal', 'Payment', 'Receipt']
    voucher_type = random.choice(voucher_types)
    
    start_date = datetime(2023, 4, 1)
    end_date = datetime(2024, 3, 28)
    date = start_date + timedelta(days=random.randint(0, (end_date - start_date).days))
    
    if voucher_type == 'Contra':
        dr_ledgers = ['ICICI Bank', 'Hdfc Bank A/c', 'Cash']
        dr_ledger = random.choice(dr_ledgers)
        cr_ledgers = [ledger for ledger in dr_ledgers if ledger != dr_ledger]
        cr_ledger = random.choice(cr_ledgers)
    elif voucher_type == 'Payment':
        dr_ledgers = ['Jeevan Electronics', 'Khanna Jeweller', 'Mangla Steels']
        cr_ledger = random.choice(['ICICI Bank', 'Hdfc Bank A/c', 'Cash'])
        dr_ledger = random.choice(dr_ledgers)
    elif voucher_type == 'Receipt':
        dr_ledgers = ['ICICI Bank', 'Hdfc Bank A/c', 'Cash']
        dr_ledger = random.choice([ledger for ledger in dr_ledgers if ledger != 'Cash'])
        cr_ledgers = ['ABC Company', 'Aniket Electronics', 'Dollar Company', 'Premium Electronics', 'Sawaria General Store']
        cr_ledger = random.choice(cr_ledgers)
    else:  # Journal
        dr_ledger = random.choice(['ICICI Bank', 'Hdfc Bank A/c', 'Cash'])
        cr_ledger = random.choice(['ICICI Bank', 'Hdfc Bank A/c', 'Cash'])
        
    amount = random.randint(10000, 20000)
    narration = f"{dr_ledger} is debited and {cr_ledger} is credited on {date.strftime('%d.%m.%Y')} with amount {amount}"
    
    transaction = {
        "date": date.strftime('%d.%m.%Y'),
        "voucher_type": voucher_type,
        "dr_ledger": dr_ledger,
        "cr_ledger": cr_ledger,
        "amount": amount,
        "narration": narration
    }
    
    return transaction

def generate_100_transactions():
    transactions = []
    for _ in range(5000):
        transaction = generate_transaction()
        transactions.append(transaction)
    return {"transactions": transactions}

api_data = generate_100_transactions()

# Printing the generated API data




# Your code for generating transactions...

# Write the api_data to a JSON file
with open('api_data1.json', 'w') as file:
    json.dump(api_data, file)



#file1 = open("E:\tirlok\tdl files\Gold Rate\myfile.txt", "w")
