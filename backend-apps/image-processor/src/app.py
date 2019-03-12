from flask import Flask
from appConfig import Config
from api import api

app = Flask(__name__)

api.initApi(app)

if __name__ == '__main__':
    app.run(
        debug=Config.debugMode,
        port=Config.port,
        host=Config.host,
    )
