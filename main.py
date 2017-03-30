from flask import *
from peewee import *
from connect_database import ConnectDatabase
from models import *
from build import Build
from data_handler import *
from playhouse.shortcuts import model_to_dict, dict_to_model
import json
from collections import OrderedDict
from pprint import pprint

app = Flask(__name__)
app.secret_key = 'development key'


def init_db():
    ConnectDatabase.db.connect()
    ConnectDatabase.db.drop_tables([Board, Card], True, True)
    ConnectDatabase.db.create_tables([Board, Card], safe=True)


def build_db():
    Build.generate_data()


@app.route("/")
def home():
    return render_template("main.html")


@app.route('/example')
def example():
    return render_template('example.html')


@app.route('/query', methods=['GET'])
def query():
    t = DataGetter()
    data = t.run()
    return json.dumps(data)


@app.route('/update', methods=['POST'])
def update():
    data = request.form['update']
    data_to_use = json.loads(data)
    update = DataUpdater(data_to_use)
    update.run()
    return data




@app.route("/index")
def index():
    return render_template("index.html")

# init_db()
# build_db()
# get_all_data()
if __name__ == "__main__":
    app.run(debug=True)
