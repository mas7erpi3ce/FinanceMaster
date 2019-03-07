from flask import request, json, jsonify
from PIL import Image
from io import BytesIO
import base64


def resize():
    if request.headers['Content-Type'] == 'application/json':
        body = request.json

        try:
            height = int(body['height'])
            width = int(body['width'])
            base64String = body['base64String']
        except:
            res = jsonify(
                {'message': 'Request body needs to include base64String, height and width'}
            )
            res.status_code = 400
            return res

        img = Image.open(BytesIO(base64.b64decode(base64String)))
        img = img.resize((width, height))
        img = img.convert('RGB')

        buffer = BytesIO()
        img.save(buffer, format='JPEG')
        base64String = base64.b64encode(buffer.getvalue())

        res = jsonify({'message': height, '2': width, '3': base64String})
        res.status_code = 200
        return res

    else:
        res = jsonify({'message': 'Unsupported Media Type'})
        res.status_code = 415
        return res
