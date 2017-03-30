import json
from collections import OrderedDict
from pprint import pprint

from flask import *
from peewee import *
from playhouse.shortcuts import dict_to_model, model_to_dict

from build import Build
from connect_database import ConnectDatabase
from models import *

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


@app.route('/query', methods=['GET'])
def query():
    board = Board.select().order_by(Board.position.asc())
    card = Card.select()
    all_data = OrderedDict()
    for b in board:
        all_data['board' + str(b.id)] = {'id': b.id, 'title': b.title, "description": b.description,
                                         "timestamp": str(b.date), "position": b.position, 'cards': []}
    for c in card:
        temp_dict = {'status': c.status, 'position': c.position, 'description': c.description, 'id': c.id}
        all_data['board' + str(c.board.id)]['cards'].append(temp_dict)
    return json.dumps(all_data)


@app.route('/saveBoard', methods=['POST'])
def save():
    if request.method == "POST":
        board = request.form['json_str']
        data = json.loads(board)
        board_count = Board.select().count()
        Board.create(title=data["title"],
                     description=data["description"],
                     date=data["timestamp"],
                     position=(board_count + 1))
        return board


@app.route('/deleteBoard', methods=['POST'])
def delete():
    if request.method == "POST":
        board_id = request.form['json_str']
        board_query = Board.delete().where(Board.id == board_id)
        card_query = Card.delete().where(Card.board == board_id)
        card_query.execute()
        board_query.execute()

        return board_id


@app.route("/index")
def index():
    return render_template("index.html")

init_db()
build_db()
# get_all_data()
if __name__ == "__main__":
    app.run(debug=True)
