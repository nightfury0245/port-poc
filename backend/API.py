from flask_cors import CORS

from flask import Flask, request, jsonify

# from config import Config
from mysql import connector
import pandas as pd
import json


app = Flask(__name__)
CORS(app)


DB_NAME = "itms"


def Dbconnect(dictionary=False, create_if_missing=True):
    try:
        mydb = connector.connect(
            host="localhost", user="root", password="", database=DB_NAME
        )
        mycur = mydb.cursor(dictionary=dictionary) if dictionary else mydb.cursor()
        return mydb, mycur

    except connector.errors.DatabaseError as e:
        if create_if_missing and "Unknown database" in str(e):
            # Connect without specifying a database to create it
            tempdb = connector.connect(host="localhost", user="root", password="")
            tempcur = tempdb.cursor()
            tempcur.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME}")
            tempdb.commit()
            tempcur.close()
            tempdb.close()
            # Re-attempt connection now that DB exists
            return Dbconnect(dictionary, create_if_missing=False)
        else:
            raise e


@app.route("/", methods=["GET", "POST"])
def home():
    return "Homepage"


@app.route("/addVehicle", methods=["POST", "GET"])
def insert():
    values = (
        "test-licence6",
        "test-waybill6",
        "test-RFID6",
        '{"testlog6":"testlog6"}',
        '{"testocr6":"testocr6"}',
        "Did not report",
    )

    conn, cur = Dbconnect(dictionary=False)
    try:
        cur.execute(
            """
            CREATE TABLE IF NOT EXISTS vehicledata (
                Licence_Plate VARCHAR(255),
                Waybill VARCHAR(255),
                RFID VARCHAR(255),
                LOG JSON,
                OCR JSON,
                status VARCHAR(255),
                PRIMARY KEY (Licence_Plate, Waybill)
            )
        """
        )
        cur.execute("INSERT INTO vehicledata VALUES (%s, %s, %s, %s, %s, %s)", values)
        conn.commit()
        return "200 OK"
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()


@app.route("/updateStatus", methods=["POST", "GET"])
def updateStatus():
    conn, cur = Dbconnect(dictionary=False)
    lpt = str(request.json["lpt"])
    wbl = str(request.json["wbl"])
    status = str(request.json["status"])
    try:
        cur.execute(
            "UPDATE vehicledata SET status = %s WHERE Licence_Plate = %s AND Waybill = %s",
            (status, lpt, wbl),
        )
        conn.commit()
        return "200 OK"
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        conn.close()


@app.route("/getVehicles", methods=["GET"])
def readVehicles():
    conn, cur = Dbconnect(dictionary=True)
    res = pd.read_sql_query("SELECT * FROM vehicledata", conn)
    conn.close()
    return res.to_json(orient="records")


@app.route("/getSampleJson", methods=["GET"])
def sample_json():
    with open("./data/sample.json") as f:
        return json.load(f)


@app.route("/getAdvantages", methods=["GET"])
def advantages_json():
    with open("./data/advantages.json") as f:
        lines = f.read()
    return json.loads(lines)


@app.route("/getTrucks", methods=["GET", "POST", "OPTIONS"])
# @crossdomain(origin='*')
def getTrucks():
    conn, cur = Dbconnect(dictionary=True)
    res = pd.read_sql_query(
        "SELECT Licence_Plate,Waybill,Type,Status FROM vehicledata WHERE status!='GT' and Position !='NULL'",
        conn,
    )
    return res.to_json(orient="records")


@app.route("/api/weighbridges", methods=["GET"])
def get_all_weighbridges():
    conn, cur = Dbconnect(dictionary=True)
    cur.execute("SELECT * FROM weigh_bridge_data")
    data = cur.fetchall()
    conn.close()
    return jsonify(data)


@app.route("/api/weighbridge", methods=["POST"])
def add_weighbridge():
    data = request.get_json()
    conn, cur = Dbconnect()
    cur.execute(
        "INSERT INTO weighbridge (WB_ID, WB_Name, Port_ID) VALUES (%s, %s, %s)",
        (data["WB_ID"], data["WB_Name"], data["Port_ID"]),
    )
    conn.commit()
    return jsonify({"status": "success"}), 201

@app.route("/api/docks")
def get_docks():
    conn, cursor = Dbconnect()
    cursor.execute("SELECT * FROM dock_data")
    data = cursor.fetchall()
    conn.close()
    return jsonify(data)

if __name__ == "__main__":
    app.run(use_reloader=True, debug=True)
