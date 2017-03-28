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
    ConnectDatabase.db.drop_tables([User, Board, Card], True, True)
    ConnectDatabase.db.create_tables([User, Board, Card], safe=True)


def build_db():
    Build.generate_data()


@app.route("/")
def home():
    return render_template("main.html")


@app.route('/try')
def trying():
    return render_template('try.html')


@app.route('/user')
def probe():
    board = Board.select()
    # user_dict = {}
    # for i in user:
    #     user_dict[i.id] = {"title": i.title, "description": i.description,
    #                        "user": i.user.username, "date": i.date, "position": i.position}
    return jsonify([model_to_dict(i) for i in board])


@app.route('/save', methods=['POST'])
def save():
    board = request.form["board"]
    print(board)

    # i = json.loads(web.data())
    # print(type(i))

    # print(board)
    # return board
    # user_dict = {}
    # for i in user:
    #     user_dict[i.id] = {"title": i.title, "description": i.description,
    #                        "user": i.user.username, "date": i.date, "position": i.position}
    # return jsonify(user_dict)

    # for b in board:
    #     for i in range(len(changedData)):
    #         b.title = changedData[i]["title"]
    #         b.save()
    # return "good"


@app.route("/index")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    init_db()
    build_db()
    app.run(debug=True)
