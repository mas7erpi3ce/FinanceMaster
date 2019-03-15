
from app import services
from app import models
from sanic import response
from sanic.log import logger
from pymongo import MongoClient
from .api_config import Config
from .api_preloader import preloader

client = MongoClient(Config.MONGO_URI)
db = client[Config.mongoColection]


@preloader(["billID", "base64String"], models.Bill.verify)
async def scanAndSave(request):
    base64String = await services.image.resizeImage(
        request['base64String'], 200, 200
    )
    # TODO -> points = AI.findCorners(base64String) [100]
    # TODO -> resBase64String = imgService.fromQuadrangeToRect(reqBase64String, corners) [10]
    # TODO -> add also the points [1]
    bill = models.Bill(base64String, request['billID'])
    db.bills.insert(bill.get())

    # TODO -> response with billID and resBase64String [1]

    return response.json(
        {'message': 'succesfull', 'bill': bill.get()},
        status=200
    )


async def get(request, billID):
    # TODO -> Delete this function or make it work
    # bill = db.bills.find_one({'billID': billID})
    return "get"


@preloader(['points'], models.Bill.verify)
async def update(request, billID):
    db.bills.find_and_modify(
        query={'billID': billID},
        update={"$set": {'points': request['points']}},
        upsert=False,
        full_response=True
    )

    # Todo crop image and send back

    return response.json(
        {'status': 'succesfull'},
        status=200
    )
