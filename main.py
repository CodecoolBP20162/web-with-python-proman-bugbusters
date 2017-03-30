from flask import *
from peewee import *
from connect_database import ConnectDatabase
from models import *
from build import Build
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
    board = Board.select().order_by(Board.position.asc())
    card = Card.select()
    all_data = OrderedDict()
    for b in board:
        all_data['board'+str(b.id)] = {'id': b.id, 'title': b.title,"description": b.description,"timestamp": str(b.date),"position": b.position,'cards': []}
    for c in card:
        temp_dict = {'status': c.status, 'position': c.position, 'description': c.description, 'id': c.id}
        all_data['board'+str(c.board.id)]['cards'].append(temp_dict)
    return json.dumps(all_data)


@app.route('/save', methods=['GET', 'POST'])
def save():
    if request.method == "POST":
        # board = request.json[]
        a = request.form['json_str']
        data = json.loads(a)
        print(data[0]["title"])
        return a


def save_board(data):
    board = Board.select()
    for b in board:

        app_slot = choice(free_slot)
        app_slot.reserved = True
        app_slot.save()
        Interview.create(interview_slot=app_slot, applicant=applicant)


@app.route("/index")
def index():
    return render_template("index.html")

# init_db()
# build_db()
# get_all_data()
if __name__ == "__main__":
    app.run(debug=True)
