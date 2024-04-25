from flask import render_template, request, jsonify

from app import app, utils

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api', methods=['POST'])
def api():
    if request.method == 'POST':
        query = request.json['query']
        word_limit = request.json['word_limit']
        result = utils.get_summary(query, word_limit)
        return jsonify(result)
