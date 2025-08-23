from flask import Flask, request, jsonify

app = Flask(__name__)

data_store = []

@app.route("/submit", methods=["POST"])
def submit():
    data = request.get_json()
    data_store.append(data)
    return jsonify({"status": "success", "data": data_store})

@app.route("/get_data", methods=["GET"])
def get_data():
    return jsonify(data_store)

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
