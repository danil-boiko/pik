from flask import Flask
from flask_cors import CORS
import db

app = Flask(__name__)
cors = CORS(app)


@app.route('/')
def default():
    return db.get_all()

@app.route('/layers/<int:layer_id>')
def get_layer_by_id(layer_id):
    return db.get_by_id(layer_id)

@app.route('/layers-intersection')
def get_intersection():
    return db.get_intersection()

if __name__ == "__main__":
    app.run(debug = True)
