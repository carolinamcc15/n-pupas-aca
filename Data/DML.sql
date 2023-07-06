INSERT INTO type(id, type) VALUES( 1, 'Pupusas'), (2, 'Bebidas'), (3, 'Otros');
INSERT INTO mass(id, mass) VALUES(1, 'Arroz'), (2, 'Maíz');
INSERT INTO public."user" (username, name, password)
VALUES
-- La password es 'password' encriptada
('ana_jimenez', 'Ana Jiménez', '$2a$10$h4Pqkkq9bHTd7Ippk7Gste4tpm2BuKqJojeIOqPuQaw.xJKmsfbnC'),
('luis_garcia', 'Luis García', '$2a$10$h4Pqkkq9bHTd7Ippk7Gste4tpm2BuKqJojeIOqPuQaw.xJKmsfbnC'),
('maria_rodriguez', 'María Rodríguez', '$2a$10$h4Pqkkq9bHTd7Ippk7Gste4tpm2BuKqJojeIOqPuQaw.xJKmsfbnC'),
('pedro_hernandez', 'Pedro Hernández', '$2a$10$h4Pqkkq9bHTd7Ippk7Gste4tpm2BuKqJojeIOqPuQaw.xJKmsfbnC'),
('rosa_perez', 'Rosa Pérez', '$2a$10$h4Pqkkq9bHTd7Ippk7Gste4tpm2BuKqJojeIOqPuQaw.xJKmsfbnC');

INSERT INTO public.admin (user_id, dui, nit, phone_number)
VALUES
(1, '12345678-9', '1234-567890-123-4', '7777-7777'),
(2, '23456789-0', '2345-678901-234-5', '8888-8888'),
(3, '34567890-1', '3456-789012-345-6', '9999-9999'),
(4, '45678901-2', '4567-890123-456-7', '1111-1111'),
(5, '56789012-3', '5678-901234-567-8', '2222-2222');

-- Pupusería 1
INSERT INTO public.pupuseria(name, id_admin) VALUES('La Flor de Izote', 1);
INSERT INTO public.branch(name, address, opening_date, id_pupuseria) VALUES('Sucursal 1', 'Av. San Salvador #123', '2022-01-01', 1);
INSERT INTO public.branch(name, address, opening_date, id_pupuseria) VALUES('Sucursal 2', 'Calle El Progreso #456', '2022-02-01', 1);

-- Pupusería 2
INSERT INTO public.pupuseria(name, id_admin) VALUES('Pupusería La Ceiba', 2);
INSERT INTO public.branch(name, address, opening_date, id_pupuseria) VALUES('Sucursal 1', 'Calle Los Heroes #789', '2022-01-01', 2);
INSERT INTO public.branch(name, address, opening_date, id_pupuseria) VALUES('Sucursal 2', 'Av. El Espino #1011', '2022-02-01', 2);
INSERT INTO public.branch(name, address, opening_date, id_pupuseria) VALUES('Sucursal 3', 'Calle La Reforma #1213', '2022-03-01', 2);

-- Pupusería 3
INSERT INTO public.pupuseria(name, id_admin) VALUES('Pupusas El Salvador', 3);
INSERT INTO public.branch(name, address, opening_date, id_pupuseria) VALUES('Sucursal 1', 'Calle 5 de Noviembre #1415', '2022-01-01', 3);

-- Pupusería 4
INSERT INTO public.pupuseria(name, id_admin) VALUES('Doña Tita Pupusería', 4);
INSERT INTO public.branch(name, address, opening_date, id_pupuseria) VALUES('Sucursal 1', 'Calle Las Delicias #1617', '2022-01-01', 4);
INSERT INTO public.branch(name, address, opening_date, id_pupuseria) VALUES('Sucursal 2', 'Av. El Zapote #1819', '2022-02-01', 4);
INSERT INTO public.branch(name, address, opening_date, id_pupuseria) VALUES('Sucursal 3', 'Calle La Mascota #2021', '2022-03-01', 4);

-- Pupusería 5
INSERT INTO public.pupuseria(name, id_admin) VALUES('Pupusería El Catracho', 5);
INSERT INTO public.branch(name, address, opening_date, id_pupuseria) VALUES('Sucursal 1', 'Calle La Rábida #2223', '2022-01-01', 5);
INSERT INTO public.branch(name, address, opening_date, id_pupuseria) VALUES('Sucursal 2', 'Calle La Mascota #2425', '2022-02-01', 5);

INSERT INTO public.product (name, price, id_pupuseria, image, id_type)
VALUES
('Pupusa de Queso', 1.50, 1, NULL, 1),
('Pupusa de Frijol', 1.50, 1, NULL, 1),
('Pupusa de Chicharrón', 1.75, 1, NULL, 1),
('Pupusa de Revuelta', 1.75, 1, NULL, 1),
('Refresco de cola', 1.00, 1, NULL, 2),
('Refresco de naranja', 1.00, 1, NULL, 2),
('Refresco de limón', 1.00, 1, NULL, 2),
('Agua mineral', 0.75, 1, NULL, 2),
('Cerveza nacional', 2.00, 1, NULL, 2),
('Cerveza importada', 2.50, 1, NULL, 2),
('Té helado', 1.50, 1, NULL, 2),
('Jugo natural de naranja', 1.50, 1, NULL, 2),
('Horchata', 1.25, 1, NULL, 2),
('Atol de elote', 1.25, 1, NULL, 2),
('Plato de arroz con pollo', 6.50, 1, NULL, 3),
('Enchiladas salvadoreñas', 7.00, 1, NULL, 3),
('Tacos de carne asada', 7.50, 1, NULL, 3),
('Tamales de elote', 1.50, 1, NULL, 3),
('Empanadas de platano', 2.00, 1, NULL, 3),
('Plato de sopa de res', 7.00, 1, NULL, 3),
('Sopa de mariscos', 8.00, 1, NULL, 3),
('Fajitas de pollo', 6.75, 1, NULL, 3),
('Pollo asado', 8.00, 1, NULL, 3),
('Hamburguesa de carne', 5.00, 1, NULL, 3),
('Nachos con queso', 4.50, 1, NULL, 3),
('Pizza de pepperoni', 10.00, 1, NULL, 3),
('Alitas de pollo', 8.00, 1, NULL, 3),
('Papas fritas', 3.50, 1, NULL, 3),
('Palomitas de maíz', 2.50, 1, NULL, 3);


INSERT INTO public.product (name, price, id_pupuseria, id_type)
VALUES
('Coca-Cola', 1.50, 1, 2),
('Pepsi', 1.50, 1, 2),
('Fanta', 1.50, 1, 2),
('Sprite', 1.50, 1, 2),
('Agua pura', 1.00, 1, 2),
('Agua con gas', 1.50, 1, 2),
('Té helado', 2.00, 1, 2),
('Jugo de naranja', 2.50, 1, 2),
('Jugo de piña', 2.50, 1, 2),
('Jugo de manzana', 2.50, 1, 2),
('Cerveza Pilsener', 2.50, 1, 2),
('Cerveza Suprema', 2.50, 1, 2),
('Cerveza Regia', 2.50, 1, 2),
('Michelada', 3.00, 1, 2),
('Margarita', 5.00, 1, 2);

-- Inserción de productos para pupuseria con id 2
-- Tipos de producto: Pupusas, Bebidas, Otros

-- Pupusas
INSERT INTO public.product (name, price, id_pupuseria, image, id_type) 
VALUES ('Pupusa de queso', 1.5, 2, NULL, 1),
       ('Pupusa de chicharrón', 1.5, 2, NULL, 1),
       ('Pupusa de frijol con queso', 1.5, 2, NULL, 1),
       ('Pupusa de revuelta', 2.0, 2, NULL, 1),
       ('Pupusa de loroco con queso', 2.0, 2, NULL, 1),
       ('Pupusa de ayote con queso', 2.0, 2, NULL, 1),
       ('Pupusa de pollo', 2.5, 2, NULL, 1),
       ('Pupusa de camarón', 3.5, 2, NULL, 1),
       ('Pupusa de jaiba', 3.5, 2, NULL, 1),
       ('Pupusa de langosta', 5.0, 2, NULL, 1);

-- Bebidas
INSERT INTO public.product (name, price, id_pupuseria, image, id_type) 
VALUES ('Agua pura', 0.75, 2, NULL, 2),
       ('Refresco de cola', 1.5, 2, NULL, 2),
       ('Refresco de naranja', 1.5, 2, NULL, 2),
       ('Refresco de limón', 1.5, 2, NULL, 2),
       ('Refresco de uva', 1.5, 2, NULL, 2),
       ('Refresco de piña', 1.5, 2, NULL, 2),
       ('Jugo de naranja', 2.0, 2, NULL, 2),
       ('Jugo de piña', 2.0, 2, NULL, 2),
       ('Jugo de maracuyá', 2.5, 2, NULL, 2),
       ('Té helado', 2.5, 2, NULL, 2);

-- Otros
INSERT INTO public.product (name, price, id_pupuseria, image, id_type) 
VALUES ('Tamales de elote', 2.5, 2, NULL, 3),
       ('Tamales de frijol', 2.5, 2, NULL, 3),
       ('Yuca frita', 2.0, 2, NULL, 3),
       ('Ensalada de verduras', 3.0, 2, NULL, 3),
       ('Plato de arroz y frijoles', 3.5, 2, NULL, 3),
       ('Chicharrones con yuca', 5.0, 2, NULL, 3);

-- Insertar 30 productos de pupuseria para la pupuseria con id 3
INSERT INTO public.product (name, price, id_pupuseria, id_type)
VALUES
    ('Pupusa de frijol', 1.00, 3, 1),
    ('Pupusa de queso', 1.50, 3, 1),
    ('Pupusa de chicharrón', 2.00, 3, 1),
    ('Pupusa de loroco', 1.75, 3, 1),
    ('Pupusa revuelta', 2.25, 3, 1),
    ('Bebida de horchata', 1.50, 3, 2),
    ('Bebida de tamarindo', 2.00, 3, 2),
    ('Bebida de jamaica', 2.00, 3, 2),
    ('Bebida de ensalada', 3.00, 3, 2),
    ('Refresco de cola', 1.75, 3, 2),
    ('Agua embotellada', 1.00, 3, 2),
    ('Cerveza nacional', 2.50, 3, 2),
    ('Cerveza importada', 3.50, 3, 2),
    ('Tamal de elote', 2.00, 3, 3),
    ('Empanada de res', 2.50, 3, 3),
    ('Pastelito de pollo', 1.50, 3, 3),
    ('Nuegados de yuca', 2.25, 3, 3),
    ('Yucca con chicharrón', 3.00, 3, 3),
    ('Pupusa de ayote', 1.75, 3, 1),
    ('Pupusa de espinacas', 2.25, 3, 1),
    ('Pupusa de chipilín', 2.50, 3, 1),
    ('Pupusa de camarones', 3.00, 3, 1),
    ('Té helado', 1.50, 3, 2),
    ('Bebida de marañón', 2.00, 3, 2),
    ('Bebida de cebada', 2.00, 3, 2),
    ('Refresco de naranja', 1.75, 3, 2),
    ('Bebida de piña', 2.00, 3, 2),
    ('Cerveza artesanal', 4.00, 3, 2),
    ('Tamal de pollo', 2.00, 3, 3);

-- Insertar productos para pupuseria con id 4
-- Pupusas
INSERT INTO public.product(name, price, id_pupuseria, image, id_type)
VALUES ('Pupusa de frijol', 1.50, 4, NULL, 1);
INSERT INTO public.product(name, price, id_pupuseria, image, id_type)
VALUES ('Pupusa de queso', 1.75, 4, NULL, 1);
INSERT INTO public.product(name, price, id_pupuseria, image, id_type)
VALUES ('Pupusa de chicharrón', 2.00, 4, NULL, 1);
INSERT INTO public.product(name, price, id_pupuseria, image, id_type)
VALUES ('Pupusa de revuelta', 2.25, 4, NULL, 1);
INSERT INTO public.product(name, price, id_pupuseria, image, id_type)
VALUES ('Pupusa de ayote', 1.50, 4, NULL, 1);
INSERT INTO public.product(name, price, id_pupuseria, image, id_type)
VALUES ('Pupusa de loroco', 1.75, 4, NULL, 1);

-- Bebidas
INSERT INTO public.product(name, price, id_pupuseria, image, id_type)
VALUES ('Coca Cola', 1.00, 4, NULL, 2);
INSERT INTO public.product(name, price, id_pupuseria, image, id_type)
VALUES ('Fanta', 1.00, 4, NULL, 2);
INSERT INTO public.product(name, price, id_pupuseria, image, id_type)
VALUES ('Sprite', 1.00, 4, NULL, 2);
INSERT INTO public.product(name, price, id_pupuseria, image, id_type)
VALUES ('Agua', 0.75, 4, NULL, 2);
INSERT INTO public.product(name, price, id_pupuseria, image, id_type)
VALUES ('Jugos', 1.50, 4, NULL, 2);

-- Otros
INSERT INTO public.product(name, price, id_pupuseria, image, id_type)
VALUES ('Tamales', 2.00, 4, NULL, 3);
INSERT INTO public.product(name, price, id_pupuseria, image, id_type)
VALUES ('Yuca frita', 1.50, 4, NULL, 3);
INSERT INTO public.product(name, price, id_pupuseria, image, id_type)
VALUES ('Empanadas', 1.75, 4, NULL, 3);
INSERT INTO public.product(name, price, id_pupuseria, image, id_type)
VALUES ('Nachos', 2.00, 4, NULL, 3);
INSERT INTO public.product(name, price, id_pupuseria, image, id_type)
VALUES ('Ensalada', 2.25, 4, NULL, 3);

INSERT INTO public.product (name, price, id_pupuseria, image, id_type)
VALUES
('Pupusa de frijol y queso', 1.50, 5, NULL, 1),
('Pupusa de chicharrón', 1.75, 5, NULL, 1),
('Pupusa de loroco', 2.00, 5, NULL, 1),
('Pupusa de ayote', 1.50, 5, NULL, 1),
('Pupusa de revuelta', 2.25, 5, NULL, 1),
('Tamarindo', 1.00, 5, NULL, 2),
('Horchata', 1.25, 5, NULL, 2),
('Coca-Cola', 1.50, 5, NULL, 2),
('Jugo de Naranja', 1.75, 5, NULL, 2),
('Agua Pura', 0.75, 5, NULL, 2),
('Tostadas de Pollo', 3.50, 5, NULL, 3),
('Empanadas de Platano', 2.00, 5, NULL, 3),
('Nachos con Queso', 4.00, 5, NULL, 3),
('Ensalada de Aguacate', 3.25, 5, NULL, 3),
('Chips de Camote', 2.75, 5, NULL, 3),
('Pupusa de chicharrón con queso', 2.00, 5, NULL, 1),
('Pupusa de revuelta con queso', 2.50, 5, NULL, 1),
('Pupusa de frijol y queso con loroco', 2.25, 5, NULL, 1),
('Pupusa de ayote con queso', 1.75, 5, NULL, 1),
('Pupusa de loroco con queso', 2.25, 5, NULL, 1),
('Café', 1.00, 5, NULL, 2),
('Agua de Panela', 1.25, 5, NULL, 2),
('Jugo de Piña', 1.75, 5, NULL, 2),
('Refresco de Tamarindo', 1.50, 5, NULL, 2),
('Nachos con Guacamole', 4.25, 5, NULL, 3),
('Ensalada de Espinaca', 3.50, 5, NULL, 3),
('Chips de Camote con Guacamole', 3.00, 5, NULL, 3),
('Pupusa de queso con jalapeño', 2.25, 5, NULL, 1),
('Pupusa de calabaza con queso', 2.00, 5, NULL, 1);

-- Generar ventas desde el 01/01/2023 hasta el 14/12/2023 con branches desde 1 hasta 2
-- Productos desde id 1 hasta id 44
INSERT INTO public.sale (sale_date, id_branch)
SELECT
    date_trunc('minute', timestamp '2023-01-01 00:00:00' + random() * (timestamp '2023-12-14 23:59:00' - timestamp '2023-01-01 00:00:00')),
    (random() * 2 + 1)::int
FROM generate_series(1, 1000);

-- Generar detalles de ventas
INSERT INTO public.sales_detail (amount, total, id_sale, id_product)
SELECT
    (random() * 10 + 1)::int,
    COALESCE((random() * 10 + 1) * (SELECT price FROM public.product WHERE id = (random() * (SELECT COUNT(s.id) FROM sale s))::int)::numeric, 100),
    id,
    (random() * 44 + 1)::int
FROM public.sale;