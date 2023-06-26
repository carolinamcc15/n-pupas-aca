from flask import Flask, request, jsonify
import numpy as np
import datetime
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

#Creamos metodo POST para la prediccion para sucursales especificas. Devolvera unicamente las ventas predichas de los siguientes 3 meses
@app.route('/Branchpredictions', methods=['POST'])
def predict_branch_sales():
    data = request.get_json()
    id_branch = data['id_branch']

    #Definimos query de extraccion con la cantidad total de productos y del valor de estos para el training de la regresion lineal
    Query = "select row_number() OVER(order by tabla.sale_date), tabla.sale_date, sum(tabla.amount), sum(tabla.valor) from (select date_trunc('month', s.sale_date) sale_date, pu.name nombre, b.name sucursal, b.address, sd.amount, (sd.amount * p.price) valor 	 		from public.sale s inner join public.sales_detail sd ON (s.id = sd.id_sale) inner join public.product p ON (sd.id_product = p.id) 			 inner join public.branch b ON (s.id_branch = b.id) inner join public.pupuseria pu ON (pu.id = b.id_pupuseria) 	 		where b.id = %s 		order by pu.name, b.name, b.address, date_trunc('month', s.sale_date) asc) tabla group by tabla.sale_date, tabla.nombre, tabla.sucursal, tabla.address order by tabla.sale_date, tabla.nombre, tabla.sucursal asc"

    month = []
    sales = []
    lastmonth = 0
    with conn:
        with conn.cursor() as cursor:
            cursor.execute(Query, id_branch)
            rows = cursor.fetchall()

            #Arriba utilizamos la conexion y creamos cursor para recorrer la informacion extraida. Abajo vamos creando un arreglo con la
            #info de la primera columna y cuarta columna (correlativo de meses y valor vendido por mes)
            for row in rows:
                month.append(row[0])
                sales.append(row[3])
                lastmonth = lastmonth + 1

    #Creamos los objetos tipo array usando numpy para ingresarlos a la regresion lineal
    monthNP = np.array(month).reshape(-1, 1)
    salesNP = np.array(sales)
    # Crear el modelo de regresión lineal
    model = LinearRegression()
    model.fit(monthNP, salesNP)

    #Realizamos la prediccion de los 3 siguientes meses a partir de la info extraida de la BD
    future_month = np.array([lastmonth + 1, lastmonth + 2, lastmonth + 3]).reshape(-1, 1)
    predictions = model.predict(future_month)
    response = {'predictions': predictions.tolist()}

    return jsonify(response)

#Creamos metodo POST para la prediccion para pupuserias especificas. Devolvera unicamente las ventas predichas de los siguientes 3 meses
@app.route('/Pupuseriaprediction', methods=['POST'])
def predic_pupuseria_sales():
    data = request.get_json()
    id_pupuseria = data['id_pupuseria']

    #Definimos query de extraccion con la cantidad total de productos y del valor de estos para el training de la regresion lineal
    Query = "select row_number() OVER(order by tabla.sale_date), tabla.sale_date, sum(tabla.amount), sum(tabla.valor) from (select 	date_trunc('month', s.sale_date) sale_date, pu.name nombre, b.name sucursal, b.address, sd.amount, 	  			(sd.amount * p.price) valor, b.id 	 		 	  from 	public.sale s inner join public.sales_detail sd ON (s.id = sd.id_sale) 	  		inner join public.product p ON (sd.id_product = p.id) 			 	  		inner join public.branch b ON (s.id_branch = b.id) 	  		inner join public.pupuseria pu ON (pu.id = b.id_pupuseria) 	 		 	  where pu.id = %s 	  order by pu.name, b.name, b.address, date_trunc('month', s.sale_date), b.id asc) tabla group by tabla.sale_date order by tabla.sale_date asc"

    month = []
    sales = []
    lastmonth = 0
    with conn:
        with conn.cursor() as cursor:
            cursor.execute(Query, id_pupuseria)
            rows = cursor.fetchall()

            #Arriba utilizamos la conexion y creamos cursor para recorrer la informacion extraida. Abajo vamos creando un arreglo con la
            #info de la primera columna y cuarta columna (correlativo de meses y valor vendido por mes)
            for row in rows:
                month.append(row[0])
                sales.append(row[3])
                lastmonth = lastmonth + 1

    #Creamos los objetos tipo array usando numpy para ingresarlos a la regresion lineal
    monthNP = np.array(month).reshape(-1, 1)
    salesNP = np.array(sales)
    # Crear el modelo de regresión lineal
    model = LinearRegression()
    model.fit(monthNP, salesNP)

    #Realizamos la prediccion de los 3 siguientes meses a partir de la info extraida de la BD
    future_month = np.array([lastmonth + 1, lastmonth + 2, lastmonth + 3]).reshape(-1, 1)
    predictions = model.predict(future_month)
    response = {'predictions': predictions.tolist()}

    return jsonify(response)

#Creamos metodo POST para la prediccion para pupuserias especificas. Devolvera toda la informacion con la que se hizo la prediccion
@app.route('/PupuseriapredictionReport', methods=['POST'])
def predic_pupuseria_sales_report():
    data = request.get_json()
    id_pupuseria = data['id_pupuseria']

    #Definimos query de extraccion con la cantidad total de productos y del valor de estos para el training de la regresion lineal
    Query = "select row_number() OVER(order by tabla.sale_date), tabla.sale_date, sum(tabla.amount), sum(tabla.valor) from (select 	date_trunc('month', s.sale_date) sale_date, pu.name nombre, b.name sucursal, b.address, sd.amount, 	  			(sd.amount * p.price) valor, b.id 	 		 	  from 	public.sale s inner join public.sales_detail sd ON (s.id = sd.id_sale) 	  		inner join public.product p ON (sd.id_product = p.id) 			 	  		inner join public.branch b ON (s.id_branch = b.id) 	  		inner join public.pupuseria pu ON (pu.id = b.id_pupuseria) 	 		 	  where pu.id = %s 	  order by pu.name, b.name, b.address, date_trunc('month', s.sale_date), b.id asc) tabla group by tabla.sale_date order by tabla.sale_date asc"

    month = []
    monthDisplay = []
    monthBase = []
    sales = []
    lastmonth = 0
    with conn:
        with conn.cursor() as cursor:
            cursor.execute(Query, id_pupuseria)
            rows = cursor.fetchall()

            #Arriba utilizamos la conexion y creamos cursor para recorrer la informacion extraida. Abajo vamos creando un arreglo con la
            #info de la primera columna y cuarta columna (correlativo de meses y valor vendido por mes)
            for row in rows:
                month.append(row[0])
                monthDisplay.append(row[1].strftime("%b") + ', ' + row[1].strftime("%Y"))
                monthBase.append(row[1])
                sales.append(row[3])
                lastmonth = lastmonth + 1

    #Creamos los objetos tipo array usando numpy para ingresarlos a la regresion lineal
    monthNP = np.array(month).reshape(-1, 1)
    monthDNP = np.array(monthDisplay).reshape(-1, 1)
    salesNP = np.array(sales)
    # Crear el modelo de regresión lineal
    model = LinearRegression()
    model.fit(monthNP, salesNP)

    #Realizamos la prediccion de los 3 siguientes meses a partir de la info extraida de la BD
    future_month = np.array([lastmonth + 1, lastmonth + 2, lastmonth + 3]).reshape(-1, 1)
    lastMonthDate = monthBase[-1]
    future_month2 = np.array([1, 2, 3])
    predictions = model.predict(future_month)
    prevMonth = monthDNP.tolist()
    prevSales = salesNP.tolist()
    response = {'1PrevMonth': prevMonth, '2PrevSales': prevSales, '3MonthPrediction': future_month2.tolist(), '4SalesPredictions': predictions.tolist()}

    return jsonify(response)

#Creamos metodo POST para la prediccion para sucursales especificas. Devolvera toda la informacion con la que se hizo la prediccion
@app.route('/BranchpredictionReport', methods=['POST'])
def predic_branch_sales_report():
    data = request.get_json()
    id_branch = data['id_branch']

    #Definimos query de extraccion con la cantidad total de productos y del valor de estos para el training de la regresion lineal
    Query = "select row_number() OVER(order by tabla.sale_date), tabla.sale_date, sum(tabla.amount), sum(tabla.valor) from (select date_trunc('month', s.sale_date) sale_date, pu.name nombre, b.name sucursal, b.address, sd.amount, (sd.amount * p.price) valor 	 		from public.sale s inner join public.sales_detail sd ON (s.id = sd.id_sale) inner join public.product p ON (sd.id_product = p.id) 			 inner join public.branch b ON (s.id_branch = b.id) inner join public.pupuseria pu ON (pu.id = b.id_pupuseria) 	 		where b.id = %s 		order by pu.name, b.name, b.address, date_trunc('month', s.sale_date) asc) tabla group by tabla.sale_date, tabla.nombre, tabla.sucursal, tabla.address order by tabla.sale_date, tabla.nombre, tabla.sucursal asc"

    month = []
    monthDisplay = []
    monthBase = []
    sales = []
    lastmonth = 0
    with conn:
        with conn.cursor() as cursor:
            cursor.execute(Query, id_branch)
            rows = cursor.fetchall()

            #Arriba utilizamos la conexion y creamos cursor para recorrer la informacion extraida. Abajo vamos creando un arreglo con la
            #info de la primera columna y cuarta columna (correlativo de meses y valor vendido por mes)
            for row in rows:
                month.append(row[0])
                monthDisplay.append(row[1].strftime("%b") + ', ' + row[1].strftime("%Y"))
                monthBase.append(row[1])
                sales.append(row[3])
                lastmonth = lastmonth + 1

    #Creamos los objetos tipo array usando numpy para ingresarlos a la regresion lineal
    monthNP = np.array(month).reshape(-1, 1)
    monthDNP = np.array(monthDisplay).reshape(-1, 1)
    salesNP = np.array(sales)
    # Crear el modelo de regresión lineal
    model = LinearRegression()
    model.fit(monthNP, salesNP)

    #Realizamos la prediccion de los 3 siguientes meses a partir de la info extraida de la BD
    future_month = np.array([lastmonth + 1, lastmonth + 2, lastmonth + 3]).reshape(-1, 1)
    lastMonthDate = monthBase[-1]
    future_month2 = np.array([1, 2, 3])
    predictions = model.predict(future_month)
    prevMonth = monthDNP.tolist()
    prevSales = salesNP.tolist()
    response = {'1PrevMonth': prevMonth, '2PrevSales': prevSales, '3MonthPrediction': future_month2.tolist(), '4SalesPredictions': predictions.tolist()}

    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)
