from flask import request, render_template

from app import app

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api', methods=['POST'])
def api():
    if request.method == 'POST':
        return request.json
