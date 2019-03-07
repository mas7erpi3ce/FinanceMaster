import apiController as ctr

prefix = '/api/'

def initApi(app, db):
    ctr.setDB(db)
    app.add_url_rule(prefix, 'create', ctr.create, methods=['POST'])
    app.add_url_rule(prefix + 'get/<billID>', 'get', ctr.get, methods=['GET'])
    app.add_url_rule(prefix + 'update/<billID>', 'update', ctr.update, methods=['PUT'])
