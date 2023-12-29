from uuid import uuid4
import json

def main():
  
  pms = ["CASH","CARD","NET BANKING","UPI"]

  payment_modes = []

  for mode in pms:
    payment_modes.append({
      "id": str(uuid4()),
      "mode": mode
    })
  
  with open('payment-modes.json','w') as file:
    json.dump(payment_modes,file)

if __name__ == '__main__':
  main()