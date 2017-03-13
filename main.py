from flask import *

app = Flask(__name__)
app.secret_key = 'development key'


@app.route("/")
def home():
    return render_template("index_test.html")

if __name__ == "__main__":
    app.run(debug=True)

