import random
import threading
import time
from mysql import connector
import pandas as pd

url = 'http://localhost:5000' 

def Dbconnect():
    mydb = connector.connect(
    host="localhost",
    user="root",
    password="",
    database="itms"
    )
    mycur = mydb.cursor(dictionary = True)
    return mydb,mycur

def updateDB(data):
    # check if the vehicle number + waybill already exists in DB
    conn,cur = Dbconnect()
    result = pd.read_sql_query("Select * from vehicledata where Licence_Plate = '"+data["numberplate"]+"' and Waybill = '"+data["waybill"]+"'",conn)
    res = result.to_records()
    if len(res) > 0:
        # data exists, update state only
        print('exists, updating status')
        cur.execute("update vehicledata set Status = '"+data["Status"]+"' where Licence_Plate = '"+data["numberplate"]+"' and Waybill = '"+data["waybill"]+"'",conn)
        conn.commit()
        print('updated status')
    else:
        # insert new row
        values = (
            data["numberplate"],
            data["waybill"],
            data["rfid"],
            '{"testlog":"testlog"}',
            '{"testocr":"testocr"}',
            data["Status"],
            data["Position"],
            data["AssignFlag"],
            data["Type"]
            )
        cur.execute("insert into vehicledata values(%s,%s,%s,%s,%s,%s,%s,%s,%s)",values)
        conn.commit()
    return "100"
def genVehicalnum():
    state_codes = ["AN", "AP", "AR", "AS", "BR", "CH", "CT", "DN", "DL", "GA", "GJ", "HR", "HP", "JH", "KA", "KL", "LA", "LD", "MP", "MH", "MN", "ML", "MZ", "NL", "OR", "PY", "PB", "RJ", "SK", "TN", "TS", "TR", "UP", "UT", "WB"]
    uppercase_alphabet = [chr(i) for i in range(65, 91)]
        
    state=random.choice(state_codes)
    a=random.randint(10,99)
    alpha=random.choice(uppercase_alphabet)
    b=random.randint(1000,9999)
    return state+str(a)+alpha+str(b)

def genwaybill():
    return str(random.randint(1000000000,9999999999))

def genrfid():
    return str(random.randint(100000000000000000,999999999999999999))

def genPosition():
    gate_ids = ["Gate001", "Gate002", "Gate003", "Gate004", "Gate005"]
    return random.choice(gate_ids)

def genOCR():
    return "None"

def genStatus():
    status = ["WB","PT"] #WB is weigh bridge, PT is cargo pick up
    return random.choice(status)

def genType():
    status = ["Drop","Pick"] 
    return random.choice(status)


Trucks=[]
def spawn(): #spawn truck
    time.sleep(random.randint(2,6))
    delayed_spawn = threading.Thread(target=spawn)
    delayed_spawn.start()
    Trucks.append({'numberplate':genVehicalnum(),
            'waybill':genwaybill(),
            'rfid':genrfid(),
            'Position':genPosition(),
            'OCR':genOCR(),
            'Status':genStatus(),
            'AssignFlag':False,
            'Type':genType()
            })

def checkfordata(): # check in future database
    pass

def bestroute(destination): # send app the next location route
    pass

def TimeRoute(truck):
    time.sleep(random.randint(2,6))
    if(truck['Type']=="Drop"):
        if(truck['Status']=="WB"):
            truck['Status']="PT"
        elif(truck['Status']=="PT"):
            truck['Status']="GT"
    elif(truck['Type']=="Pick"):
        if(truck['Status']=="WB"):
            truck['Status']="GT"
        elif(truck['Status']=="PT"):
            truck['Status']="WB"
    delayed_spawn = threading.Thread(target=TimeRoute,args=([truck]))
    delayed_spawn.start()

 

delayed_spawn = threading.Thread(target=spawn)
delayed_spawn.start()
while(True):
    time.sleep(random.randint(1,9))
    for truck in Trucks:
        print(truck)
        updateDB(truck)
        if(truck['AssignFlag'] == False):
            if(truck['Status'] == "WB"):
                bestroute("to weighBridge")
                truck['AssignFlag']=True
                delayed_spawn = threading.Thread(target=TimeRoute,args=([truck]))
                delayed_spawn.start()
            elif(truck['Status'] == "PT"): # go port to drop load
                bestroute("to Port")
                truck['AssignFlag']=True
                delayed_spawn = threading.Thread(target=TimeRoute,args=([truck]))
                delayed_spawn.start()
            elif(truck['Status'] == "GT"): # exit gate
                bestroute("to Gate")
                truck['AssignFlag']=True
                delayed_spawn = threading.Thread(target=TimeRoute,args=([truck]))
                delayed_spawn.start()
            elif(truck['Status'] == "PK"): # Parking
                bestroute("to Parking")
                truck['AssignFlag']=True
                delayed_spawn = threading.Thread(target=TimeRoute,args=([truck]))
                delayed_spawn.start()
    Trucks = [item for item in Trucks if "GT" not in item['Status']]
    print("Total No of Truck: ",len(Trucks))
