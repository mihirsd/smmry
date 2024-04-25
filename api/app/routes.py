from flask import render_template, request, jsonify

from app import app
from app import utils

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api', methods=['POST'])
def api():
    if request.method == 'POST':
        query = request.json['query']
        summary, urls = utils.get_summary(query)
        return jsonify({'summary': summary, 'urls': urls})
