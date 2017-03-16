from flask import *

app = Flask(__name__)
app.secret_key = 'development key'


@app.route("/")
def home():
    return render_template("main.html")

@app.route("/index")
def index():
    return render_template("index.html")

@app.route("/index_m")
def index_m():
    return render_template("index_m.html")


if __name__ == "__main__":
    app.run(debug=True)
