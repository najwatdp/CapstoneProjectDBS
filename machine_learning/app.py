import joblib as jb
from flask import Flask, request, jsonify

model = jb.load("model2.h5")

app = Flask(__name__)

@app.route('/predict', methods=["POST"])
def predict():
    data = request.get_json()
    symptoms = data.get('symptoms')
    pred = model.predict([symptoms])[0]
    return jsonify({ "predicted_diseas": pred })

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0" , port=3000)