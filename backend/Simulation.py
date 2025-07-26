
import random
import threading
import time
from mysql import connector
import pandas as pd

# TRUCK + WEIGHBRIDGE + DOCK SIMULATION

def Dbconnect():
    mydb = connector.connect(
        host="localhost",
        user="root",
        password="",
        database="itms"
    )
    mycur = mydb.cursor(dictionary=True)
    return mydb, mycur

def updateTruckDB(data):
    conn, cur = Dbconnect()
    result = pd.read_sql_query(
        "SELECT * FROM vehicledata WHERE Licence_Plate = '{}' AND Waybill = '{}'".format(
            data["numberplate"], data["waybill"]), conn)
    res = result.to_records()
    if len(res) > 0:
        print('exists, updating status')
        cur.execute(
            "UPDATE vehicledata SET Status = '{}' WHERE Licence_Plate = '{}' AND Waybill = '{}'".format(
                data["Status"], data["numberplate"], data["waybill"]))
        conn.commit()
        print('updated status')
    else:
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
        cur.execute("INSERT INTO vehicledata VALUES (%s,%s,%s,%s,%s,%s,%s,%s,%s)", values)
        conn.commit()
    return "100"

def updateWeighBridgeData(status):
    conn, cur = Dbconnect()
    weighbridge_id = f"W{random.randint(1, 5)}"
    truck_id = f"T{random.randint(1, 50)}"
    weight = round(random.uniform(5000, 30000), 2)
    time_stamp = time.strftime('%Y-%m-%d %H:%M:%S')
    query = "INSERT INTO weigh_bridge_data (Weigh_Bridge_ID, Truck_ID, Weight, Status, Timestamp) VALUES (%s, %s, %s, %s, %s)"
    cur.execute(query, (weighbridge_id, truck_id, weight, status, time_stamp))
    conn.commit()

def updateDockData():
    conn, cur = Dbconnect()
    dock_id = f"D{random.randint(1, 5)}"
    dock_name = f"Dock {random.randint(1, 5)}"
    port_id = f"P{random.randint(1, 3)}"
    statuses = ["Idle", "Occupied - Loading", "Occupied - Unloading", "Awaiting Truck", "Under Maintenance", "Closed for Inspection"]
    status = random.choice(statuses)
    query = "INSERT INTO dock_data (Dock_ID, Dock_Name, Port_ID, Status) VALUES (%s, %s, %s, %s)"
    cur.execute(query, (dock_id, dock_name, port_id, status))
    conn.commit()

def genVehicalnum():
    state_codes = ["AN", "AP", "AR", "AS", "BR", "CH", "CT", "DN", "DL", "GA", "GJ", "HR", "HP", "JH", "KA", "KL", "LA", "LD", "MP", "MH", "MN", "ML", "MZ", "NL", "OR", "PY", "PB", "RJ", "SK", "TN", "TS", "TR", "UP", "UT", "WB"]
    uppercase_alphabet = [chr(i) for i in range(65, 91)]
    state = random.choice(state_codes)
    a = random.randint(10, 99)
    alpha = random.choice(uppercase_alphabet)
    b = random.randint(1000, 9999)
    return state + str(a) + alpha + str(b)

def genwaybill():
    return str(random.randint(1000000000, 9999999999))

def genrfid():
    return str(random.randint(100000000000000000, 999999999999999999))

def genPosition():
    gate_ids = ["Gate001", "Gate002", "Gate003", "Gate004", "Gate005"]
    return random.choice(gate_ids)

def genOCR():
    return "None"

def genStatus():
    status = ["WB", "PT"]
    return random.choice(status)

def genType():
    status = ["Drop", "Pick"]
    return random.choice(status)

Trucks = []

def spawn():
    time.sleep(random.randint(2, 6))
    delayed_spawn = threading.Thread(target=spawn)
    delayed_spawn.start()
    Trucks.append({
        'numberplate': genVehicalnum(),
        'waybill': genwaybill(),
        'rfid': genrfid(),
        'Position': genPosition(),
        'OCR': genOCR(),
        'Status': genStatus(),
        'AssignFlag': False,
        'Type': genType()
    })

def bestroute(destination):
    pass

def TimeRoute(truck):
    time.sleep(random.randint(2, 6))
    if truck['Type'] == "Drop":
        if truck['Status'] == "WB":
            truck['Status'] = "PT"
        elif truck['Status'] == "PT":
            truck['Status'] = "GT"
    elif truck['Type'] == "Pick":
        if truck['Status'] == "WB":
            truck['Status'] = "GT"
        elif truck['Status'] == "PT":
            truck['Status'] = "WB"
    delayed_spawn = threading.Thread(target=TimeRoute, args=([truck]))
    delayed_spawn.start()

delayed_spawn = threading.Thread(target=spawn)
delayed_spawn.start()

while True:
    time.sleep(random.randint(1, 9))
    updateWeighBridgeData(random.choice(["In Use", "Available", "Under Maintenance"]))
    updateDockData()
    for truck in Trucks:
        print(truck)
        updateTruckDB(truck)
        if truck['AssignFlag'] == False:
            if truck['Status'] == "WB":
                bestroute("to weighBridge")
                truck['AssignFlag'] = True
                delayed_spawn = threading.Thread(target=TimeRoute, args=([truck]))
                delayed_spawn.start()
            elif truck['Status'] == "PT":
                bestroute("to Port")
                truck['AssignFlag'] = True
                delayed_spawn = threading.Thread(target=TimeRoute, args=([truck]))
                delayed_spawn.start()
            elif truck['Status'] == "GT":
                bestroute("to Gate")
                truck['AssignFlag'] = True
                delayed_spawn = threading.Thread(target=TimeRoute, args=([truck]))
                delayed_spawn.start()
            elif truck['Status'] == "PK":
                bestroute("to Parking")
                truck['AssignFlag'] = True
                delayed_spawn = threading.Thread(target=TimeRoute, args=([truck]))
                delayed_spawn.start()
    Trucks = [item for item in Trucks if "GT" not in item['Status']]
    print("Total No of Truck: ", len(Trucks))
