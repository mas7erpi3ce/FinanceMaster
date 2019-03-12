
from flask import Flask
from appConfig import Config
from flask_pymongo import PyMongo

app = Flask(__name__)

app.config['MONGO_URI'] = Config.MONGO_URI
mongo = PyMongo(app)
db = mongo.db

from app import api
