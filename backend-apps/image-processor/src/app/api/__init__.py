
from sanic import Blueprint, response
from . import api_controller as ctr

api = Blueprint('api', url_prefix='/api/')


@api.middleware('request')
async def check_headers(request):
    if request.headers['Content-Type'] != 'application/json':
        return response.json(
            {'message': 'Unsupported Media Type'},
            status=415
        )


# @api.middleware('response')
# async def cookies(request, response):
#     response.headers["Server"] = "Fake-Server"


api.add_route(ctr.resize, 'resize', methods=['POST'])
