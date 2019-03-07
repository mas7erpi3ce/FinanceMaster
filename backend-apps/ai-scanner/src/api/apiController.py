from flask import request, json, jsonify
from services import imageProcessorService as imgService
from models.billModel import BillModel as Bill

db = None


def setDB(database):
    global db
    db = database


def create():
    if request.headers['Content-Type'] == 'application/json':
        body = request.json

        try:
            billID = body['billID']
            base64String = body['base64String']
        except:
            res = jsonify(
                {'message': 'Request body needs to include base64String and billID'}
            )
            res.status_code = 400
            return res

        base64String = imgService.resizeImage(base64String, 200, 200)
        bill = Bill(base64String, billID)
        db.bills.insert(bill.get())

        res = jsonify({'message': 'succesfull', 'bill': bill.get()})
        res.status_code = 200
        return res

    else:
        res = jsonify({'message': 'Unsupported Media Type'})
        res .status_code = 415
        return res


def get(billID):
    bill = db.bills.find_one({'billID': billID})
    return "get"


def update(billID):
    if request.headers['Content-Type'] == 'application/json':
        body = request.json

        try:
            points = {
                'point1': {'x': body['point1']['x'], 'y': body['point1']['y']},
                'point2': {'x': body['point2']['x'], 'y': body['point2']['y']},
                'point3': {'x': body['point3']['x'], 'y': body['point3']['y']},
                'point4': {'x': body['point4']['x'], 'y': body['point4']['y']},
            }
        except:
            res = jsonify(
                {'message': 'Request body needs to include point1 to 4 { x: int, y: int }'}
            )
            res.status_code = 400
            return res

        bill = db.bills.find_and_modify(
            query={'billID': billID},
            update={"$set": points},
            upsert=False,
            full_response=True
        )

        res = jsonify({'message': 'succesfull'})
        res.status_code = 200
        return res

    else:
        res = jsonify({'message': 'Unsupported Media Type'})
        res .status_code = 415
        return res

    return "update"
