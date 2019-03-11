from flask import request, json, jsonify
from services import imageProcessorService as imgService
from models.billModel import BillModel as Bill

db = None

# TODO -> make this with import [2]


def setDB(database):
    global db
    db = database

# TODO -> Interceptor - headers [7]
# TODO -> Interceptor - static preloader [7]


def scanAndSave():
    if request.headers['Content-Type'] == 'application/json':
        body = request.json

        try:
            billID = body['billID']
            reqBase64String = body['base64String']
        except:
            res = jsonify(
                {'message': 'Request body needs to include base64String and billID'}
            )
            res.status_code = 400
            return res

        base64String = imgService.resizeImage(reqBase64String, 200, 200)
        # TODO -> points = AI.findCorners(base64String) [100]
        # TODO -> resBase64String = imgService.fromQuadrangeToRect(reqBase64String, corners) [10]
        bill = Bill(base64String, billID)  # TODO -> add also the points [1]
        db.bills.insert(bill.get())

        # TODO -> response with billID and resBase64String [1]
        res = jsonify({'message': 'succesfull', 'bill': bill.get()})
        res.status_code = 200
        return res

    else:
        res = jsonify({'message': 'Unsupported Media Type'})
        res .status_code = 415
        return res


def get(billID):
    # TODO -> Delete this function or make it work
    bill = db.bills.find_one({'billID': billID})
    return "get"


def update(billID):
    if request.headers['Content-Type'] == 'application/json':
        body = request.json

        try:
            # TODO -> new points structure
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

        res = jsonify({'status': 'succesfull'})
        res.status_code = 200
        return res

    else:
        res = jsonify({'message': 'Unsupported Media Type'})
        res .status_code = 415
        return res

    return "update"
