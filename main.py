from flask import *
from peewee import *
from connect_database import ConnectDatabase
from models import *
from build import Build
from playhouse.shortcuts import model_to_dict, dict_to_model
import json

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


# @app.route('/query')
def get_all_data():
    board = Board.select(Board, Card).join(Card)
    for b in board:
        print(b)
    # return jsonify([model_to_dict(i) for i in board])


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

init_db()
build_db()
get_all_data()
# if __name__ == "__main__":
#     # init_db()
#     # build_db()
#     app.run(debug=True)
