from flask import *
from peewee import *
from connect_database import ConnectDatabase
from models import *
from build import Build

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


@app.route("/index")
def index():
    return render_template("index.html")

if __name__ == "__main__":
    #init_db()
    #build_db()
    app.run(debug=True)
