from flask import Flask

from app import config

app = Flask(__name__, template_folder='../templates', static_folder='../static')
app.config.from_object(config.Config)

from app import routes
