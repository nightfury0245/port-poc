from flask_cors import CORS
from flask import Flask,request,jsonify
# from config import Config
from mysql import connector
import pandas as pd
import json



app = Flask(__name__)
CORS(app)


def Dbconnect(dictionary):
    print("dictionary : ",dictionary)
    mydb = connector.connect(
    host="localhost",
    user="root",
    password="",
    database="itms"
    )
    mycur = mydb.cursor(dictionary = True) if dictionary else mydb.cursor()
    return mydb,mycur


@app.route('/',methods=['GET','POST'])
def home():
    return "Homepage"

@app.route('/addVehicle',methods=['POST','GET'])
def insert():
    # lpt = request.json("lpt")
    # wbl = request.json("wbl")
    # rfid = request.json("rfid")
    # log = request.json("log")
    # ocr = request.json("ocr")
    # status = request.json("status")
    values = (
        "test-licence6",
        "test-waybill6",
        "test-RFID6",
        '{"testlog6":"testlog6"}',
        '{"testocr6":"testocr6"}',
        'Did not report'
    )
    conn,cur = Dbconnect(dictionary = False)
    cur.execute("INSERT INTO vehicledata values(%s,%s,%s,%s,%s,%s)",values)
    conn.commit()
    # insert into sql db
    return '200 OK'

@app.route('/updateStatus',methods=['POST','GET'])
# %%
def updateStatus():
    conn,cur = Dbconnect(dictionary = False)
    lpt = str(request.json["lpt"])
    wbl = str(request.json["wbl"])
    status = str(request.json["status"])
    cur.execute("UPDATE vehicledata SET status = %s WHERE Licence_Plate = %s and Waybill = %s",(status,lpt,wbl))
    conn.commit()
    return "200 OK"
# %%

@app.route("/getVehicles",methods=['GET'])
def readVehicles():
    conn,cur = Dbconnect(dictionary = True)
    res = pd.read_sql_query("SELECT * FROM vehicledata",conn)
    return res.to_json(orient = 'records')

@app.route('/getSampleJson',methods=['GET'])
def sample_json():
    lines = []
    with open("./data/sample.json") as f:
        lines = f.read()
    return json.loads(lines)
@app.route('/getAdvantages',methods=['GET'])
def advantages_json():
    lines = []
    with open("./data/advantages.json") as f:
        lines = f.read()
    return json.loads(lines)
@app.route('/getTrucks',methods=['GET','POST','OPTIONS'])
# @crossdomain(origin='*')
def getTrucks():
    conn,cur = Dbconnect(dictionary = True)
    res = pd.read_sql_query("SELECT * FROM vehicledata WHERE status!='GT' and Position !='NULL'",conn)
    return res.to_json(orient = 'records')


if __name__ == '__main__':
    app.run(use_reloader=True,debug=True)   
    