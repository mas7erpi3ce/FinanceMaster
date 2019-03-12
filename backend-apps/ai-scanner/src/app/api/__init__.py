from app import app
import apiController as ctr

prefix = '/api/'

# TODO -> Blueprint [2] #34

app.add_url_rule(prefix, 'scanAndSave', ctr.scanAndSave, methods=['POST'])
app.add_url_rule(prefix + 'get/<billID>', 'get', ctr.get, methods=['GET'])
app.add_url_rule(prefix + 'update/<billID>', 'update', ctr.update, methods=['PUT'])
