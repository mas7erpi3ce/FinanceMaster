
from sanic import Sanic
from .api import api

app = Sanic(__name__)

app.blueprint(api)
