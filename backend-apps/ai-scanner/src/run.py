
from app import app
from app import Config


if __name__ == '__main__':
    app.run(
        debug=Config.debugMode,
        port=Config.port,
        host=Config.host,
    )
