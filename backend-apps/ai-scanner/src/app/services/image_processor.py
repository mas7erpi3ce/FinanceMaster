import requests
import json

baseUrl = 'http://localhost:5001/api'
headers = {'content-type': 'application/json'}


async def resizeImage(base64String: str, width: int, height: int):
    url = baseUrl + '/resize'
    body = {'base64String': base64String, 'width': width, 'height': height}

    res = requests.post(url, data=json.dumps(body), headers=headers)
    data = res.json()

    return data['base64String']
