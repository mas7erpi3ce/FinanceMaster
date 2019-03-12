from flask import Flask
from appConfig import Config
from api import api
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_URI'] = Config.MONGO_URI
mongo = PyMongo(app)
db = mongo.db

api.initApi(app, mongo.db)

if __name__ == '__main__':
    app.run(
        debug=Config.debugMode,
        port=Config.port,
        host=Config.host,
    )
