from sanic import response
from sanic.log import logger
from PIL import Image
from io import BytesIO
import base64
from .api_preloader import preloader
from sanic import response


@preloader(['height', 'width', 'base64String'])
async def resize(request):
    img = Image.open(BytesIO(base64.b64decode(request['base64String'])))
    img = img.resize((int(request['width']), int(request['height'])))
    img = img.convert('RGB')

    buffer = BytesIO()
    img.save(buffer, format='JPEG')
    base64String = base64.b64encode(buffer.getvalue()).decode("utf-8") 

    return response.json(
        {'base64String': base64String},
        status=200
    )
