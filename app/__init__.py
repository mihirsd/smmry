from flask import Flask

from app import config

app = Flask(__name__, template_folder='templates/build', static_folder='templates/build/static')
app.config.from_object(config.Config)

from app import routes
