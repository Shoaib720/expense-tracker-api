from uuid import uuid4
import json

def main():
  category_subcategory_mapper = {
    "Health Care": ["Medicines","Doctor Fees"],
    "Investments": [],
    "Food": [],
    "Shopping": ["Amazon","Flipkart","Street"],
    "Education": ["Fees", "Stationeries"],
    "Subscriptions": ["Netflix","Medium","Youtube","Amazon Prime","Google Drive"],
    "Recharges": ["Mobile", "Wifi","Railway Pass"],
    "Travel": ["Daily Commute"],
    "Bills": ["Maintenance","Tax","AWS","Azure","Electricity","Gas"],
    "House Expense": []
  }

  categories = []

  for k,v in category_subcategory_mapper.items():
    categories.append({
      "id": str(uuid4()),
      "category": k,
      "sub_categories": v
    })
  
  with open('expense-categories.json','w') as file:
    json.dump(categories,file)

if __name__ == '__main__':
  main()