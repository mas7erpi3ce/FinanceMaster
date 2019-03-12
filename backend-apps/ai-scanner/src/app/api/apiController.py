from flask import request, json, jsonify
from app import services
from app import models
from app import db


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

        base64String = services.image.resizeImage(reqBase64String, 200, 200)
        # TODO -> points = AI.findCorners(base64String) [100]
        # TODO -> resBase64String = imgService.fromQuadrangeToRect(reqBase64String, corners) [10]
        # TODO -> add also the points [1]
        bill = models.Bill(base64String, billID)
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
            points = body['points']
        except:
            res = jsonify(
                {'message': 'Request body needs to include 4 points as { points:  [{ x: int, y: int } * 4 ]}'}
            )
            res.status_code = 400
            return res

        bill = db.bills.find_and_modify(
            query={'billID': billID},
            update={"$set": {'points': points}},
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
