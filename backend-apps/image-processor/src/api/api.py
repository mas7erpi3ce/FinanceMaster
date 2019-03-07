import apiController as ctr

prefix = '/api/'


def initApi(app):
    app.add_url_rule(prefix + 'resize', 'resize', ctr.resize, methods=['POST'])
