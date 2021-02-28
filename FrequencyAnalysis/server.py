import os
from urllib import response

import flask
from flask import Flask, json, request, flash, url_for
from werkzeug.utils import redirect, secure_filename

from main import getKeywords, shortVoiceToText

UPLOAD_FOLDER = 'D:/Job/Python/FrequencyAnalysis'
app = Flask(__name__)
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
ALLOWED_EXTENSIONS = set(['ogg'])


@app.route('/', methods=['GET', 'POST'])
def index():
    response = flask.jsonify(getKeywords(request.args.get('text')))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS


@app.route('/voice/', methods=['GET', 'POST'])
def voiceToText():
    global filename
    if request.method == 'POST':
        if 'file' not in request.files:
            flash('No file part')
            return redirect(request.url)
        file = request.files['file']
        if file.filename == '':
            flash('No selected file')
            return redirect(request.url)
        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))

        response = flask.jsonify(shortVoiceToText(filename))
        response.headers.add('Access-Control-Allow-Origin', '*')
        return response


if __name__ == "__main__":
    app.config['JSON_AS_ASCII'] = False
    app.run(host='192.168.1.151', port=8080)
