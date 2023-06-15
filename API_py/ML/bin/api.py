from flask import Flask, request, jsonify
import numpy as np
import psycopg2
from sklearn.linear_model import LinearRegression

app = Flask(__name__)

#Definimos la conexion a la base de datos de la app
conn = psycopg2.connect(
    host="localhost",
    database="npupas",
    user="postgres",
    password="cmcc"
)

#Creamos metodo POST para la prediccion para sucursales especificas
@app.route('/Branchpredictions', methods=['POST'])
def predict_sales():
    data = request.get_json()
    id_branch = data['id_branch']

    #Definimos query de extraccion con la cantidad total de productos y del valor de estos para el training de la regresion lineal
    Query = "select row_number() OVER(order by tabla.sale_date), tabla.sale_date, sum(tabla.amount), sum(tabla.valor) from (select date_trunc('month', s.sale_date) sale_date, pu.name nombre, b.name sucursal, b.address, sd.amount, (sd.amount * p.price) valor 	 		from public.sale s inner join public.sales_detail sd ON (s.id = sd.id_sale) inner join public.product p ON (sd.id_product = p.id) 			 inner join public.branch b ON (s.id_branch = b.id) inner join public.pupuseria pu ON (pu.id = b.id_pupuseria) 	 		where b.id = %s 		order by pu.name, b.name, b.address, date_trunc('month', s.sale_date) asc) tabla group by tabla.sale_date, tabla.nombre, tabla.sucursal, tabla.address order by tabla.sale_date, tabla.nombre, tabla.sucursal asc"

    month = []
    sales = []
    with conn:
        with conn.cursor() as cursor:
            cursor.execute(Query, id_branch)
            rows = cursor.fetchall()

            #Arriba utilizamos la conexion y creamos cursor para recorrer la informacion extraida. Abajo vamos creando un arreglo con la
            #info de la primera columna y cuarta columna (correlativo de meses y valor vendido por mes)
            for row in rows:
                month.append(row[0])
                sales.append(row[3])

    #Creamos los objetos tipo array usando numpy para ingresarlos a la regresion lineal
    month1 = np.array(month).reshape(-1, 1)
    sales1 = np.array(sales)
    # Crear el modelo de regresión lineal
    model = LinearRegression()
    model.fit(month1, sales1)

    #TODO volver dinamico el numero de meses a partir de la cantidad extraida de la BD
    future_month = np.array([13, 14, 15]).reshape(-1, 1)
    predictions = model.predict(future_month)
    response = {'predictions': predictions.tolist()}

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
