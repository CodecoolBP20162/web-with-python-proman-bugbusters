import json
from collections import OrderedDict
from pprint import pprint
from flask import *
from peewee import *
from build import Build
from connect_database import ConnectDatabase
from models import *
from data_handler import *
from collections import OrderedDict


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
    t = DataGetter()
    data = t.run()
    return json.dumps(data)


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


@app.route('/saveCard', methods=['POST'])
def save_card():
    if request.method == "POST":
        card = request.form['json_str']
        data = json.loads(card)
        Card.create(description=data["description"],
                    position=data["position"],
                    status=data["status"],
                    board=data["board"])
        return card


@app.route('/deleteBoard', methods=['POST'])
def delete():
    if request.method == "POST":
        board_id = request.form['json_str']
        board_query = Board.delete().where(Board.id == board_id)
        card_query = Card.delete().where(Card.board == board_id)
        card_query.execute()
        board_query.execute()
        return board_id


@app.route('/update', methods=['POST'])
def update():
    data = request.form['json_str']
    data_to_use = json.loads(data)
    update = DataUpdater(data_to_use)
    update.run()
    return data


@app.route("/boardLength")
def boardLength():
    board_length = Board.select().count()
    return jsonify(board_length)


@app.route("/index")
def index():
    return render_template("index.html")


init_db()
build_db()
if __name__ == "__main__":
    app.run(debug=True)
