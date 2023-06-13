from flask import Flask, request, jsonify
import numpy as np
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

# Datos de entrenamiento (años) y ventas correspondientes
years = np.array([2015, 2016, 2017, 2018, 2019, 2020]).reshape(-1, 1)
sales = np.array([300, 400, 450, 480, 550, 600])

# Crear el modelo de regresión lineal
model = LinearRegression()
model.fit(years, sales)

@app.route('/predictions', methods=['POST'])
def predict_sales():
    data = request.get_json()
    future_years = np.array(data['years']).reshape(-1, 1)
    predictions = model.predict(future_years)
    response = {'predictions': predictions.tolist()}
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
