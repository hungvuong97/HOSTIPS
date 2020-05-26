
from flask import Flask, render_template
# from flask import request
# from flask import json
# from flask import jsonify
# import subprocess
# import math
# from path import path

app = Flask(__name__)   

@app.route("/index", methods=['GET'])
def home():
  return render_template('index.html')


if __name__ == "__main__":
    app.run(host = '127.0.0.1', port = '3000', debug=False)