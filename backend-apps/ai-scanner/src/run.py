from run_config import Config
from app import app

if __name__ == '__main__':
    app.run(
        debug=Config.debugMode,
        port=Config.port,
        host=Config.host,
        access_log=Config.access_log,
    )
