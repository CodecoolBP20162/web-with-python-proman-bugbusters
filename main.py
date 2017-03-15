from flask import *

app = Flask(__name__)
app.secret_key = 'development key'


@app.route("/")
def home():
    return render_template("main.html")


if __name__ == "__main__":
    app.run(debug=True)

