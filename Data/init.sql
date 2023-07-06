CREATE TABLE IF NOT EXISTS public."user"
(
    id serial NOT NULL,
    username character varying COLLATE pg_catalog."default" NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    password character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT user_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.admin
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    dui character varying COLLATE pg_catalog."default" NOT NULL,
    nit character varying COLLATE pg_catalog."default" NOT NULL,
    phone_number character varying(9) COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT admin_pkey PRIMARY KEY (id),
    CONSTRAINT unique_dui UNIQUE (dui),
    CONSTRAINT fk_admin_user_user_id FOREIGN KEY (user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);



CREATE TABLE IF NOT EXISTS public.pupuseria
(
    id serial NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    id_admin integer NOT NULL,
    CONSTRAINT unique_pupuseria_admin_id PRIMARY KEY (id),
    CONSTRAINT fk_pupuseria_admin_id FOREIGN KEY (id_admin)
        REFERENCES public.admin (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.type
(
    id serial NOT NULL,
    type character varying COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT pk_type PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.product
(
    id serial NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    price decimal NOT NULL,
    id_pupuseria integer NOT NULL,
    image bytea,
    id_type integer NOT NULL,
    CONSTRAINT pk_product PRIMARY KEY (id),
    CONSTRAINT fk_product_pupuseria_id FOREIGN KEY (id_pupuseria)
        REFERENCES public.pupuseria (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_product_type_id FOREIGN KEY (id_type)
        REFERENCES public.type (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);

CREATE TABLE IF NOT EXISTS public.branch
(
    id serial NOT NULL,
    name character varying COLLATE pg_catalog."default" NOT NULL,
    address character varying COLLATE pg_catalog."default" NOT NULL,
    opening_date timestamp without time zone NOT NULL,
    id_pupuseria integer NOT NULL,
    CONSTRAINT pk_branch PRIMARY KEY (id),
    CONSTRAINT fk_branch_pupuseria_id FOREIGN KEY (id_pupuseria)
        REFERENCES public.pupuseria (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.employee
(
    id serial NOT NULL,
    user_id integer NOT NULL,
    salary decimal NOT NULL,
    afp_accumulated decimal NOT NULL,
    isss_accumulated decimal NOT NULL,
    rent_accumulated decimal NOT NULL,
    hiring_date timestamp without time zone NOT NULL,
    branch_id integer NOT NULL,
    CONSTRAINT employee_pkey PRIMARY KEY (id),
    CONSTRAINT fk_employee_branch_id FOREIGN KEY (branch_id)
        REFERENCES public.branch (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT fk_user_employee_user_id FOREIGN KEY (user_id)
        REFERENCES public."user" (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.report
(
    id serial NOT NULL,
    comment character varying COLLATE pg_catalog."default" NOT NULL,
    report_date timestamp without time zone NOT NULL,
    id_admin integer NOT NULL,
    id_employee integer NOT NULL,
    CONSTRAINT report_pkey PRIMARY KEY (id),
    CONSTRAINT fk_report_admin_id FOREIGN KEY (id_admin)
        REFERENCES public.admin (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_report_employee_id FOREIGN KEY (id_employee)
        REFERENCES public.employee (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.purchase
(
    id serial NOT NULL,
    purchase_date timestamp without time zone NOT NULL,
    concept character varying COLLATE pg_catalog."default" NOT NULL,
    amount decimal NOT NULL,
    id_branch integer NOT NULL,
    CONSTRAINT pk_purchase PRIMARY KEY (id),
    CONSTRAINT fk_purchase_branch_id FOREIGN KEY (id_branch)
        REFERENCES public.branch (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.sale
(
    id serial NOT NULL,
    sale_date timestamp without time zone NOT NULL,
    id_branch integer NOT NULL,
    CONSTRAINT pk_sale PRIMARY KEY (id),
    CONSTRAINT fk_sale_branch_id FOREIGN KEY (id_branch)
        REFERENCES public.branch (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE IF NOT EXISTS public.sales_detail
(
    id serial NOT NULL,
    amount integer NOT NULL,
    total decimal NOT NULL,
    id_sale integer NOT NULL,
    id_product integer NOT NULL,
    mass character varying COLLATE pg_catalog."default" NULL,
    CONSTRAINT pk_sales_detail PRIMARY KEY (id),
    CONSTRAINT fk_sales_detail_id_product FOREIGN KEY (id_product)
        REFERENCES public.product (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION,
    CONSTRAINT fk_sales_detail_id_sale FOREIGN KEY (id_sale)
        REFERENCES public.sale (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
);

CREATE TABLE public."token" (
	id serial NOT NULL,
	"content" varchar NOT NULL,
	active boolean NOT NULL DEFAULT true,
	"timestamp" timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
	id_user integer NOT NULL,
	CONSTRAINT token_pk PRIMARY KEY (id),
	CONSTRAINT token_fk FOREIGN KEY (id_user) REFERENCES public."user"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

INSERT INTO type(id, type) VALUES( 1, 'Pupusas'), (2, 'Bebidas'), (3, 'Otros');
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
    date_trunc('minute', timestamp '2022-08-01 00:00:00' + random() * (timestamp '2023-08-01 23:59:00' - timestamp '2022-08-01  00:00:00')),
    (random() * 10 + 1)::int
FROM generate_series(1, 25000);

-- Generar detalles de ventas
INSERT INTO public.sales_detail (amount, total, id_sale, id_product)
SELECT
    (random() * 10 + 1)::int,
    COALESCE((random() * 10 + 1) * (SELECT price FROM public.product WHERE id = (random() * (SELECT COUNT(s.id) FROM sale s))::int)::numeric, 100),
    id,
    (random() * 44 + 1)::int
FROM public.sale;

insert into purchase (id, purchase_date, concept, amount, id_branch) values (1, '2023-02-25 06:41:32', 'Mushroom - White Button', 17.42, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (2, '2023-05-16 05:02:34', 'Crab - Dungeness, Whole', 60.03, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (3, '2022-08-20 00:25:59', 'Cabbage - Red', 68.07, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (4, '2023-03-28 23:02:04', 'Wine - Blue Nun Qualitatswein', 14.86, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (5, '2022-11-24 00:42:20', 'Latex Rubber Gloves Size 9', 24.0, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (6, '2022-10-18 12:46:02', 'Yoplait Drink', 9.4, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (7, '2022-08-27 15:20:02', 'Pork - Sausage Casing', 48.1, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (8, '2023-06-13 01:00:18', 'Cabbage - Nappa', 88.5, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (9, '2023-03-18 21:35:57', 'Wine - Beaujolais Villages', 12.09, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (10, '2023-06-17 00:22:47', 'Egg Patty Fried', 58.8, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (11, '2023-06-21 22:10:57', 'Shrimp - Baby, Cold Water', 6.16, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (12, '2022-12-21 03:46:30', 'Appetizer - Escargot Puff', 95.16, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (13, '2023-02-04 06:51:22', 'Cheese - Brie, Triple Creme', 89.13, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (14, '2023-03-14 13:08:46', 'Turkey - Oven Roast Breast', 51.75, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (15, '2023-01-19 16:39:11', 'Bagel - Whole White Sesame', 53.82, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (16, '2023-03-21 21:31:21', 'Sultanas', 7.03, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (17, '2023-03-21 02:22:19', 'Wine - Magnotta - Cab Sauv', 60.94, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (18, '2023-03-18 01:23:26', 'Chicken - Bones', 9.03, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (19, '2023-01-06 17:13:09', 'Wine - Dubouef Macon - Villages', 6.99, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (20, '2023-01-12 17:27:25', 'Rabbit - Whole', 56.18, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (21, '2023-02-26 15:02:10', 'Juice - Apple 284ml', 13.33, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (22, '2022-10-30 04:22:50', 'Bread - Corn Muffaleta Onion', 20.31, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (23, '2023-02-03 15:06:57', 'Stainless Steel Cleaner Vision', 97.31, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (24, '2022-09-07 01:39:54', 'Sauce - Hollandaise', 62.05, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (25, '2023-04-23 08:11:37', 'Bread Roll Foccacia', 34.53, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (26, '2023-07-02 18:47:00', 'Fennel - Seeds', 71.22, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (27, '2023-01-21 20:27:46', 'Yeast Dry - Fermipan', 14.35, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (28, '2023-03-30 20:10:44', 'Pork - Bacon Cooked Slcd', 44.65, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (29, '2022-10-04 20:59:13', 'Bread - Rosemary Focaccia', 92.25, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (30, '2023-02-12 00:36:56', 'Stock - Veal, White', 99.42, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (31, '2022-12-08 04:57:38', 'Seedlings - Mix, Organic', 25.23, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (32, '2022-10-19 13:08:32', 'Papadam', 19.52, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (33, '2023-07-31 20:54:48', 'Cocoa Butter', 88.21, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (34, '2023-04-13 17:49:47', 'Honey - Liquid', 83.21, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (35, '2022-12-17 20:16:00', 'Wine - Vineland Estate Semi - Dry', 44.89, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (36, '2022-09-06 16:23:47', 'Spinach - Baby', 65.85, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (37, '2022-09-17 09:12:33', 'Beets - Pickled', 59.34, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (38, '2023-03-28 04:51:03', 'Wine - Kwv Chenin Blanc South', 35.71, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (39, '2023-04-25 06:43:04', 'Okra', 15.67, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (40, '2022-10-03 11:10:57', 'Beer - Pilsner Urquell', 51.42, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (41, '2022-08-14 19:08:32', 'Wine - Tio Pepe Sherry Fino', 62.44, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (42, '2023-05-26 15:00:47', 'Beans - Black Bean, Canned', 35.25, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (43, '2022-12-21 15:43:06', 'Cabbage - Red', 66.05, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (44, '2022-10-24 11:10:54', 'Veal - Ground', 33.38, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (45, '2023-06-19 19:49:29', 'Bread - Multigrain', 83.5, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (46, '2023-07-30 12:42:18', 'Cheese - Goat', 87.02, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (47, '2022-10-31 03:02:24', 'Mustard - Individual Pkg', 72.08, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (48, '2023-02-09 17:07:55', 'Bread - White, Unsliced', 10.57, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (49, '2022-12-06 21:08:27', 'Apples - Sliced / Wedge', 20.86, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (50, '2023-03-01 23:07:00', 'Sole - Fillet', 61.21, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (51, '2022-10-07 02:31:03', 'Tea - Honey Green Tea', 7.19, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (52, '2022-10-09 10:02:24', 'Chicken - Bones', 48.59, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (53, '2022-11-26 15:13:45', 'Muffin Mix - Carrot', 35.43, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (54, '2022-11-16 06:45:27', 'Pernod', 89.18, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (55, '2023-04-22 00:53:51', 'Sprouts - Corn', 50.66, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (56, '2022-08-11 13:33:03', 'Peas - Frozen', 79.8, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (57, '2023-01-09 04:38:03', 'Soup - Canadian Pea, Dry Mix', 88.65, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (58, '2023-07-07 03:30:00', 'Sauce - Roasted Red Pepper', 54.54, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (59, '2023-05-20 20:35:40', 'Cabbage Roll', 23.47, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (60, '2023-02-19 00:10:19', 'Puree - Mango', 9.04, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (61, '2022-11-09 20:49:51', 'Pate - Peppercorn', 6.0, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (62, '2022-12-08 07:53:17', 'Chips Potato Salt Vinegar 43g', 12.68, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (63, '2023-05-28 01:36:40', 'Banana Turning', 78.68, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (64, '2023-07-17 01:44:33', 'Pasta - Cappellini, Dry', 6.98, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (65, '2022-08-25 10:04:27', 'Bread - Raisin Walnut Pull', 57.42, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (66, '2023-04-28 22:28:57', 'Muffin Orange Individual', 32.97, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (67, '2023-07-22 10:15:51', 'Beef - Striploin', 84.04, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (68, '2023-04-16 05:02:02', 'Pepper - Paprika, Spanish', 29.21, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (69, '2023-01-07 03:09:16', 'Sardines', 68.16, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (70, '2023-04-14 06:47:45', 'Bar Mix - Lemon', 30.71, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (71, '2023-07-29 13:40:45', 'Crab - Imitation Flakes', 40.72, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (72, '2023-03-23 02:38:15', 'Sage Ground Wiberg', 38.96, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (73, '2022-09-17 05:33:48', 'Soup - Campbells Beef Noodle', 93.2, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (74, '2022-11-05 04:23:22', 'Cheese - Comtomme', 1.1, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (75, '2022-10-07 23:39:52', 'Flour - Chickpea', 21.62, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (76, '2022-09-08 16:38:43', 'Venison - Denver Leg Boneless', 9.67, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (77, '2023-01-20 12:57:01', 'Beer - Original Organic Lager', 29.23, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (78, '2022-10-20 11:44:45', 'Milk - Chocolate 250 Ml', 76.09, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (79, '2023-07-29 06:39:33', 'Sauce - Hollandaise', 41.55, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (80, '2022-08-29 19:30:11', 'Horseradish Root', 54.69, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (81, '2022-10-27 00:58:44', 'Spinach - Frozen', 29.19, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (82, '2022-11-12 23:04:42', 'Wine - White, French Cross', 47.04, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (83, '2023-05-21 21:22:24', 'Table Cloth 62x114 White', 76.12, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (84, '2023-07-08 21:19:42', 'Seedlings - Clamshell', 61.51, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (85, '2023-03-22 18:46:13', 'Cheese - Taleggio D.o.p.', 19.2, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (86, '2023-03-22 01:40:14', 'Snapple Raspberry Tea', 25.02, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (87, '2023-03-31 10:16:05', 'Doilies - 12, Paper', 76.11, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (88, '2022-09-02 10:44:52', 'Pepper - White, Ground', 88.97, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (89, '2022-11-09 08:31:15', 'Wonton Wrappers', 22.35, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (90, '2023-02-21 22:39:46', 'Sugar - White Packet', 90.37, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (91, '2022-12-05 19:51:34', 'Juice - Grapefruit, 341 Ml', 99.86, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (92, '2022-11-24 12:22:42', 'Flour - Chickpea', 89.0, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (93, '2023-07-10 14:26:00', 'Irish Cream - Baileys', 79.65, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (94, '2023-03-08 16:45:35', 'Cookie Choc', 19.6, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (95, '2023-05-20 08:38:01', 'Container - Clear 16 Oz', 86.28, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (96, '2022-10-05 18:38:05', 'Dill - Primerba, Paste', 53.36, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (97, '2023-07-16 03:26:06', 'Cheese - Pont Couvert', 6.75, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (98, '2022-09-27 08:59:08', 'Juice - Apple, 1.36l', 53.94, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (99, '2023-01-20 11:10:08', 'Oyster - In Shell', 42.56, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (100, '2023-05-18 10:53:05', 'Pork - Loin, Bone - In', 49.08, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (101, '2023-01-08 17:58:48', 'Lettuce - Belgian Endive', 84.68, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (102, '2023-02-22 10:41:48', 'Veal - Nuckle', 65.66, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (103, '2023-01-24 11:17:17', 'Longos - Penne With Pesto', 48.3, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (104, '2022-12-26 15:06:25', 'Wine - Fat Bastard Merlot', 28.22, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (105, '2023-01-11 01:46:44', 'Bread - Pain Au Liat X12', 51.08, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (106, '2022-12-28 20:26:03', 'Vinegar - Balsamic, White', 18.02, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (107, '2023-03-07 14:27:49', 'Puree - Strawberry', 16.54, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (108, '2022-12-02 21:29:07', 'Magnotta - Bel Paese White', 10.25, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (109, '2022-10-29 12:17:22', 'Cookies - Fortune', 27.41, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (110, '2022-12-01 15:40:52', 'Pizza Pizza Dough', 89.05, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (111, '2023-06-10 06:00:05', 'Nut - Almond, Blanched, Sliced', 20.98, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (112, '2022-10-13 22:56:42', 'Butcher Twine 4r', 36.65, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (113, '2022-12-04 20:03:23', 'Wine - Hardys Bankside Shiraz', 6.84, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (114, '2023-07-19 16:05:37', 'Beef - Ox Tongue, Pickled', 7.59, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (115, '2023-07-13 07:45:31', 'Beans - Black Bean, Dry', 19.91, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (116, '2023-07-11 19:48:04', 'Cookie - Oatmeal', 7.63, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (117, '2022-08-17 21:15:18', 'Cheese - Cream Cheese', 4.3, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (118, '2022-08-26 12:01:51', 'Oil - Margarine', 9.56, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (119, '2023-04-03 11:53:10', 'Puree - Pear', 10.85, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (120, '2022-10-10 14:57:45', 'Tarragon - Fresh', 72.99, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (121, '2023-07-11 01:25:08', 'Water, Tap', 24.38, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (122, '2023-01-26 08:41:36', 'Beef Flat Iron Steak', 78.88, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (123, '2022-10-05 07:07:46', 'Wine - Cahors Ac 2000, Clos', 58.93, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (124, '2022-12-10 17:50:51', 'Muffin - Bran Ind Wrpd', 22.62, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (125, '2022-12-30 11:35:30', 'Beer - Corona', 96.95, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (126, '2023-01-05 10:49:01', 'Longos - Grilled Veg Sandwiches', 15.44, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (127, '2023-02-15 02:39:57', 'Tarts Assorted', 12.21, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (128, '2023-05-28 16:16:09', 'Remy Red Berry Infusion', 63.55, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (129, '2023-04-28 21:02:31', 'Brandy Cherry - Mcguinness', 97.67, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (130, '2022-12-23 06:39:48', 'Bread - Assorted Rolls', 8.58, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (131, '2023-03-30 13:38:49', 'Pork - Bacon Cooked Slcd', 7.37, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (132, '2023-06-23 04:05:40', 'Lobster - Base', 58.99, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (133, '2023-01-01 09:53:09', 'Pork - Chop, Frenched', 6.62, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (134, '2023-02-11 02:25:14', 'Oats Large Flake', 2.01, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (135, '2023-05-20 14:43:34', 'Lid - 3oz Med Rec', 94.18, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (136, '2023-06-11 13:21:53', 'Capers - Pickled', 73.7, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (137, '2023-01-27 01:44:40', 'Fennel - Seeds', 93.36, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (138, '2022-11-20 14:37:01', 'Gelatine Powder', 79.06, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (139, '2023-07-01 13:49:38', 'Vaccum Bag - 14x20', 67.76, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (140, '2023-03-24 16:44:18', 'Lumpfish Black', 64.41, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (141, '2023-02-13 10:46:25', 'Wine - Fontanafredda Barolo', 72.44, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (142, '2023-02-02 14:47:27', 'Pepper - Red Thai', 38.78, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (143, '2023-02-13 10:56:01', 'Crab - Blue, Frozen', 9.74, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (144, '2022-12-31 15:44:45', 'Curry Powder', 13.75, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (145, '2022-12-31 17:15:26', 'Juice - Apple, 341 Ml', 65.52, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (146, '2023-05-20 14:40:09', 'Chocolate - Compound Coating', 90.45, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (147, '2022-09-16 11:43:29', 'Soup Campbells - Italian Wedding', 25.44, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (148, '2022-08-09 14:56:48', 'Peas - Frozen', 12.93, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (149, '2023-03-08 08:04:39', 'Cut Wakame - Hanawakaba', 60.79, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (150, '2023-03-02 18:26:24', 'Bread Crumbs - Panko', 7.98, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (151, '2023-01-05 22:19:25', 'Wine - Red, Black Opal Shiraz', 10.01, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (152, '2022-12-29 22:28:47', 'Pastry - French Mini Assorted', 69.99, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (153, '2022-08-31 20:10:03', 'Roe - Lump Fish, Black', 2.76, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (154, '2023-06-22 23:26:31', 'Pepper - Julienne, Frozen', 6.43, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (155, '2023-05-16 08:52:27', 'Dooleys Toffee', 55.45, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (156, '2022-11-11 16:13:49', 'Pepper - Red Chili', 77.82, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (157, '2023-05-17 03:56:47', 'Chicken - Livers', 17.69, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (158, '2023-03-07 16:33:00', 'Trueblue - Blueberry Cranberry', 84.6, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (159, '2022-12-06 23:32:04', 'Soup Bowl Clear 8oz92008', 1.7, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (160, '2023-02-22 08:50:49', 'Syrup - Monin - Granny Smith', 46.81, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (161, '2022-08-13 11:58:04', 'Chicken Breast Halal', 59.06, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (162, '2023-06-13 17:38:11', 'Bread Crumbs - Panko', 69.66, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (163, '2022-09-14 22:39:18', 'Beef - Ground Lean Fresh', 2.42, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (164, '2022-08-27 03:08:52', 'Wine - Dubouef Macon - Villages', 59.11, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (165, '2023-03-11 23:48:54', 'Papadam', 83.99, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (166, '2023-02-22 15:36:15', 'Meldea Green Tea Liquor', 25.69, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (167, '2023-05-17 04:49:46', 'Remy Red Berry Infusion', 3.96, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (168, '2022-10-31 20:45:26', 'Soup - Campbells, Beef Barley', 48.81, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (169, '2023-03-26 04:42:54', 'Tamarillo', 22.05, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (170, '2022-08-15 00:12:22', 'Sage Derby', 85.2, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (171, '2022-09-28 09:45:19', 'Wine - Red, Lurton Merlot De', 65.29, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (172, '2022-09-23 12:33:39', 'Bandage - Flexible Neon', 36.7, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (173, '2023-01-15 01:47:53', 'Longos - Chicken Wings', 82.87, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (174, '2023-06-15 13:38:59', 'Celery Root', 77.71, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (175, '2022-09-11 11:54:16', 'Flour - Strong', 1.25, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (176, '2023-02-03 14:13:27', 'Soup - Chicken And Wild Rice', 76.38, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (177, '2022-11-05 12:36:57', 'Oil - Grapeseed Oil', 50.52, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (178, '2022-11-07 00:04:48', 'V8 Splash Strawberry Banana', 20.67, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (179, '2023-06-04 08:34:13', 'Soup - Campbells Asian Noodle', 98.17, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (180, '2022-10-30 23:01:23', 'Island Oasis - Cappucino Mix', 49.56, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (181, '2023-01-18 16:16:44', 'Fish - Halibut, Cold Smoked', 64.27, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (182, '2023-05-16 13:44:00', 'Juice - Orangina', 8.61, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (183, '2023-03-12 10:05:00', 'Cabbage - Red', 78.23, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (184, '2023-07-15 07:41:52', 'Squash - Sunburst', 99.75, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (185, '2022-12-31 13:56:05', 'Rabbit - Legs', 72.11, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (186, '2023-04-18 09:52:26', 'Salt - Rock, Course', 88.01, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (187, '2022-10-07 08:30:13', 'Wine - Pinot Grigio Collavini', 5.56, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (188, '2022-11-14 22:10:16', 'Pomello', 77.07, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (189, '2023-05-10 16:11:49', 'V8 Splash Strawberry Banana', 26.54, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (190, '2023-03-06 10:41:54', 'Crab - Dungeness, Whole, live', 33.1, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (191, '2022-12-04 18:31:22', 'Wasabi Paste', 63.47, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (192, '2023-01-23 04:48:28', 'Pastry - Raisin Muffin - Mini', 63.36, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (193, '2023-06-20 04:47:10', 'Snapple Lemon Tea', 78.75, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (194, '2022-11-29 06:13:02', 'Mortadella', 22.99, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (195, '2022-09-26 08:00:08', 'Island Oasis - Wildberry', 21.31, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (196, '2023-07-12 02:40:38', 'Beef - Top Butt', 34.5, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (197, '2023-02-10 23:29:30', 'Lettuce - Lolla Rosa', 22.6, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (198, '2022-11-13 03:00:37', 'Sugar - Splenda Sweetener', 43.92, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (199, '2023-03-27 23:37:22', 'Bread - Rolls, Corn', 58.37, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (200, '2022-12-22 19:44:37', 'Sage - Rubbed', 45.82, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (201, '2023-07-28 10:57:09', 'Flavouring Vanilla Artificial', 97.8, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (202, '2023-05-23 15:30:14', 'Wine - Magnotta, White', 24.06, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (203, '2022-12-29 00:20:24', 'Veal - Tenderloin, Untrimmed', 43.75, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (204, '2022-09-24 21:51:17', 'Juice - Lime', 67.07, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (205, '2022-11-29 10:45:13', 'Ecolab - Hand Soap Form Antibac', 37.88, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (206, '2022-11-11 07:27:20', 'Cocoa Powder - Dutched', 92.37, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (207, '2022-09-28 14:10:28', 'Squid - U - 10 Thailand', 54.78, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (208, '2022-09-27 05:10:05', 'Rootbeer', 76.74, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (209, '2023-06-23 18:46:53', 'Pork Loin Cutlets', 45.13, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (210, '2022-08-22 10:15:01', 'Dehydrated Kelp Kombo', 85.78, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (211, '2023-01-05 06:12:57', 'Plasticspoonblack', 26.09, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (212, '2022-11-11 14:11:59', 'Tilapia - Fillets', 51.22, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (213, '2023-06-22 22:56:06', 'Sauce - Roasted Red Pepper', 42.21, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (214, '2022-08-23 14:10:37', 'Mountain Dew', 13.78, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (215, '2022-09-21 15:39:58', 'Creme De Menthe Green', 92.13, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (216, '2023-02-05 23:39:20', 'Spinach - Packaged', 26.79, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (217, '2023-01-15 11:05:33', 'Water - Aquafina Vitamin', 2.05, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (218, '2023-01-29 21:17:28', 'Vermouth - Sweet, Cinzano', 94.27, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (219, '2022-10-11 02:56:59', 'Schnappes Peppermint - Walker', 80.68, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (220, '2022-12-05 04:51:43', 'Ham - Black Forest', 38.52, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (221, '2023-07-23 15:58:39', 'Dill Weed - Dry', 19.7, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (222, '2023-04-16 20:34:07', 'Cherries - Bing, Canned', 21.59, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (223, '2023-04-20 09:44:58', 'Bread - 10 Grain', 26.57, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (224, '2023-05-08 17:03:29', 'Beer - True North Strong Ale', 83.01, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (225, '2023-02-09 15:35:27', 'Gatorade - Lemon Lime', 35.94, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (226, '2023-04-28 04:23:17', 'Shrimp - 100 / 200 Cold Water', 28.18, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (227, '2023-07-18 15:41:31', 'Goat - Whole Cut', 43.48, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (228, '2022-10-04 19:53:58', 'Syrup - Kahlua Chocolate', 37.33, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (229, '2023-07-11 15:57:47', 'Lid Coffeecup 12oz D9542b', 12.77, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (230, '2023-04-22 16:53:00', 'Stock - Chicken, White', 84.71, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (231, '2023-04-21 15:36:58', 'Lemonade - Strawberry, 591 Ml', 57.26, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (232, '2022-12-24 22:31:00', 'Milk - 1%', 30.27, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (233, '2023-05-03 05:30:31', 'Vaccum Bag - 14x20', 88.09, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (234, '2022-09-03 00:55:59', 'Sproutsmustard Cress', 10.48, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (235, '2023-03-01 20:27:43', 'Lid - 0090 Clear', 25.86, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (236, '2022-09-22 16:31:08', 'Wine - White, Colubia Cresh', 30.36, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (237, '2022-10-02 06:54:41', 'Wine - Semi Dry Riesling Vineland', 87.12, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (238, '2022-12-30 19:14:22', 'Lid Coffeecup 12oz D9542b', 66.11, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (239, '2023-04-08 08:46:25', 'Shrimp - Black Tiger 13/15', 1.12, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (240, '2023-07-22 01:19:55', 'Chocolate - Dark', 18.32, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (241, '2023-04-25 18:11:03', 'Energy Drink - Franks Original', 33.94, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (242, '2023-03-18 11:55:09', 'Hot Choc Vending', 62.72, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (243, '2022-12-18 15:10:56', 'Wine - Rioja Campo Viejo', 41.08, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (244, '2023-07-13 23:40:31', 'Water - San Pellegrino', 56.57, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (245, '2023-07-24 08:45:16', 'Kellogs Special K Cereal', 58.99, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (246, '2023-07-03 11:53:23', 'Onions - Red Pearl', 60.72, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (247, '2023-07-30 11:43:02', 'Puff Pastry - Slab', 4.02, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (248, '2022-09-27 14:08:58', 'Lamb - Whole Head Off,nz', 96.32, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (249, '2022-12-19 08:40:57', 'Beef - Cooked, Corned', 98.88, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (250, '2022-10-02 02:09:03', 'Frangelico', 94.1, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (251, '2023-03-23 02:34:44', 'Southern Comfort', 8.13, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (252, '2022-09-07 10:55:02', 'Muffin - Mix - Creme Brule 15l', 7.85, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (253, '2023-02-21 23:17:01', 'Flour - Bran, Red', 5.76, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (254, '2023-04-16 07:54:52', 'Tea - Green', 59.73, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (255, '2022-12-10 00:53:53', 'Mushroom - Shitake, Fresh', 21.94, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (256, '2022-09-05 13:46:28', 'Sugar - Brown, Individual', 89.73, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (257, '2023-03-20 23:48:21', 'Melon - Watermelon Yellow', 79.87, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (258, '2022-10-19 03:04:42', 'Jagermeister', 93.82, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (259, '2022-09-06 20:00:38', 'Versatainer Nc - 8288', 64.35, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (260, '2022-08-15 11:36:49', 'Potatoes - Peeled', 38.68, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (261, '2023-06-18 17:59:58', 'Capers - Ox Eye Daisy', 81.25, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (262, '2022-11-27 20:06:00', 'Bagel - Plain', 51.75, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (263, '2023-06-10 23:36:23', 'Puree - Mango', 74.63, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (264, '2022-11-23 17:19:52', 'Bread - Pumpernickle, Rounds', 2.22, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (265, '2022-08-02 19:48:15', 'Beef - Ground Medium', 1.49, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (266, '2022-10-12 07:16:18', 'Ezy Change Mophandle', 53.71, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (267, '2023-02-04 07:02:41', 'Bread - Triangle White', 58.45, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (268, '2022-11-19 18:20:29', 'Wine - Savigny - Les - Beaune', 1.2, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (269, '2022-12-06 08:29:02', 'Milk Powder', 33.07, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (270, '2023-01-28 19:02:21', 'Sprouts - Bean', 4.2, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (271, '2022-10-14 23:09:53', 'Fish - Soup Base, Bouillon', 2.37, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (272, '2023-01-17 22:48:37', 'Wine - Bourgogne 2002, La', 89.92, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (273, '2022-12-11 00:21:19', 'Scrubbie - Scotchbrite Hand Pad', 30.3, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (274, '2023-01-05 22:16:28', 'Halibut - Whole, Fresh', 40.12, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (275, '2022-08-04 14:49:01', 'Pear - Asian', 17.43, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (276, '2023-07-09 16:05:17', 'Lamb - Bones', 79.52, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (277, '2022-11-08 00:51:12', 'Whmis - Spray Bottle Trigger', 80.48, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (278, '2023-05-08 12:53:04', 'Cup - 8oz Coffee Perforated', 16.45, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (279, '2022-08-23 22:45:16', 'Plastic Arrow Stir Stick', 26.54, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (280, '2022-08-04 16:06:48', 'Hold Up Tool Storage Rack', 67.3, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (281, '2022-11-12 10:01:12', 'Cocktail Napkin Blue', 91.3, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (282, '2023-01-09 10:25:16', 'Wine - Fume Blanc Fetzer', 6.64, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (283, '2022-09-08 17:57:10', 'Foil - Round Foil', 61.36, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (284, '2023-05-15 07:48:45', 'Kellogs Raisan Bran Bars', 80.4, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (285, '2022-08-23 21:52:10', 'Olives - Morracan Dired', 89.83, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (286, '2023-07-03 11:52:34', 'Spring Roll Veg Mini', 17.41, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (287, '2023-06-30 09:18:01', 'Mint - Fresh', 55.65, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (288, '2022-11-14 04:35:36', 'Brandy Apricot', 92.57, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (289, '2022-12-21 19:11:18', 'Veal - Inside', 44.68, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (290, '2022-08-10 09:54:26', 'Tart - Lemon', 17.24, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (291, '2022-11-05 16:32:59', 'Fiddlehead - Frozen', 35.89, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (292, '2023-06-05 22:22:50', 'Versatainer Nc - 8288', 34.95, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (293, '2023-01-09 07:39:41', 'Soup - Campbells Chicken', 36.4, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (294, '2022-12-11 09:51:33', 'Wine - Puligny Montrachet A.', 56.43, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (295, '2023-01-20 17:12:15', 'Arizona - Plum Green Tea', 66.3, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (296, '2022-12-27 15:36:10', 'Clam Nectar', 49.43, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (297, '2023-01-12 08:21:41', 'Garbage Bags - Clear', 13.22, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (298, '2022-12-15 06:46:06', 'Beef - Kindney, Whole', 43.52, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (299, '2022-09-09 07:02:30', 'Chocolate - Milk, Callets', 85.09, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (300, '2023-06-24 03:53:25', 'Muffin - Zero Transfat', 6.82, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (301, '2023-02-03 18:29:57', 'Chick Peas - Canned', 25.57, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (302, '2022-08-21 01:39:24', 'Mushrooms - Black, Dried', 24.97, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (303, '2022-12-08 19:00:40', 'Beef Ground Medium', 13.64, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (304, '2023-04-17 10:34:15', 'Wine - Carmenere Casillero Del', 55.45, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (305, '2023-05-05 11:24:35', 'Wine - Vineland Estate Semi - Dry', 82.89, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (306, '2023-07-23 15:03:26', 'Split Peas - Green, Dry', 2.62, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (307, '2022-10-05 03:05:46', 'Wine - Vovray Sec Domaine Huet', 69.44, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (308, '2022-09-20 23:27:10', 'Salmon - Canned', 60.23, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (309, '2022-10-13 03:34:20', 'Turkey - Breast, Bone - In', 9.25, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (310, '2023-06-03 06:47:54', 'Flower - Carnations', 40.68, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (311, '2023-07-26 13:42:08', 'Napkin White - Starched', 57.46, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (312, '2023-04-24 13:18:17', 'Pimento - Canned', 18.12, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (313, '2023-03-18 09:10:44', 'Bar - Granola Trail Mix Fruit Nut', 38.91, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (314, '2023-03-03 04:01:32', 'Split Peas - Yellow, Dry', 75.22, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (315, '2023-01-12 08:34:46', 'Browning Caramel Glace', 57.12, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (316, '2022-12-24 04:38:09', 'Onions - Dried, Chopped', 21.42, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (317, '2023-03-23 17:25:11', 'Steam Pan - Half Size Deep', 55.53, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (318, '2022-11-01 09:23:35', 'Beef - Montreal Smoked Brisket', 32.17, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (319, '2023-06-09 15:03:33', 'Otomegusa Dashi Konbu', 58.59, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (320, '2023-04-29 00:52:35', 'Carbonated Water - Wildberry', 43.71, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (321, '2023-03-16 11:54:06', 'Wine - White, Ej Gallo', 52.75, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (322, '2023-03-07 03:03:14', 'Juice - Pineapple, 341 Ml', 11.23, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (323, '2022-08-26 02:40:57', 'Corn - On The Cob', 9.73, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (324, '2022-12-29 21:20:54', 'Foil Wrap', 41.58, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (325, '2023-02-14 09:32:54', 'Wine - Red, Mouton Cadet', 71.86, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (326, '2023-03-29 20:27:54', 'Stock - Veal, White', 52.49, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (327, '2022-08-06 19:44:02', 'Shrimp - 21/25, Peel And Deviened', 44.37, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (328, '2023-07-04 09:20:58', 'Salmon - Canned', 9.78, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (329, '2023-05-27 03:37:46', 'Sauce - Apple, Unsweetened', 86.45, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (330, '2022-11-20 17:45:43', 'Mountain Dew', 97.29, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (331, '2022-09-16 11:11:40', 'Five Alive Citrus', 69.77, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (332, '2022-09-05 11:30:49', 'Mustard Prepared', 36.88, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (333, '2023-06-02 02:42:53', 'Stock - Veal, White', 4.49, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (334, '2023-04-10 17:56:17', 'Pastry - Mini French Pastries', 33.91, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (335, '2023-02-16 20:47:09', 'Marsala - Sperone, Fine, D.o.c.', 19.52, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (336, '2022-08-30 23:10:49', 'Rice Wine - Aji Mirin', 37.56, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (337, '2022-09-15 01:48:34', 'Mushroom - Porcini Frozen', 62.49, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (338, '2022-10-17 04:27:04', 'Yogurt - Cherry, 175 Gr', 90.82, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (339, '2022-11-16 08:55:45', 'Water - Mineral, Natural', 7.8, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (340, '2023-05-16 14:27:10', 'Chocolate Eclairs', 48.23, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (341, '2023-06-12 03:19:09', 'Sage - Fresh', 5.93, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (342, '2023-04-10 23:10:22', 'Squid - U 5', 20.04, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (343, '2023-07-22 10:38:17', 'Cheese - Stilton', 2.16, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (344, '2023-06-04 00:04:54', 'Lamb - Whole Head Off', 82.35, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (345, '2023-06-30 04:08:23', 'Pork - Ground', 48.09, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (346, '2022-08-12 06:28:14', 'Bread - Ciabatta Buns', 25.02, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (347, '2023-07-09 13:49:52', 'Pepper - Red, Finger Hot', 65.55, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (348, '2022-12-31 04:25:36', 'Lid - 0090 Clear', 80.36, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (349, '2022-11-17 11:41:25', 'Orange - Blood', 31.18, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (350, '2023-04-08 15:01:36', 'Chocolate - Pistoles, Lactee, Milk', 28.1, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (351, '2022-09-25 09:21:05', 'Table Cloth 120 Round White', 18.06, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (352, '2022-08-19 19:16:41', 'Oil - Truffle, Black', 62.04, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (353, '2023-05-10 15:33:23', 'Sparkling Wine - Rose, Freixenet', 28.15, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (354, '2023-06-01 22:49:42', 'Remy Red Berry Infusion', 72.83, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (355, '2023-07-24 06:08:14', 'Turkey - Breast, Smoked', 6.81, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (356, '2023-04-30 21:17:48', 'Cheese - Cambozola', 93.41, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (357, '2023-02-11 11:36:40', 'Roe - Lump Fish, Black', 52.98, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (358, '2023-01-07 04:54:24', 'Tart - Raisin And Pecan', 19.1, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (359, '2023-06-25 17:57:32', 'Ecolab - Balanced Fusion', 43.32, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (360, '2023-05-03 04:00:29', 'Corn - Mini', 99.38, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (361, '2022-08-27 09:09:57', 'Kellogs All Bran Bars', 63.86, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (362, '2022-09-12 01:28:25', 'Pie Filling - Cherry', 63.7, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (363, '2023-06-04 09:25:54', 'Coffee - Dark Roast', 84.23, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (364, '2022-08-10 03:24:28', 'Tomatoes Tear Drop', 15.88, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (365, '2022-08-18 13:25:53', 'Cheese - Asiago', 1.79, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (366, '2022-10-21 15:50:35', 'Hickory Smoke, Liquid', 44.33, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (367, '2023-02-15 18:04:28', 'Rice - 7 Grain Blend', 93.84, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (368, '2022-08-04 21:13:56', 'Dates', 51.55, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (369, '2023-05-23 18:05:55', 'Scallops - Live In Shell', 18.43, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (370, '2022-11-04 16:39:36', 'Flour - Masa De Harina Mexican', 80.99, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (371, '2023-07-01 15:42:48', 'Cotton Wet Mop 16 Oz', 29.63, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (372, '2023-06-07 15:36:54', 'Milk - Chocolate 500ml', 32.45, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (373, '2022-11-07 09:48:25', 'Syrup - Golden, Lyles', 77.58, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (374, '2022-08-31 07:38:04', 'Beef - Short Ribs', 4.88, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (375, '2023-03-27 23:27:46', 'Yucca', 37.18, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (376, '2023-05-07 16:30:49', 'Beer - Blue Light', 81.48, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (377, '2023-06-13 15:24:37', 'Schnappes - Peach, Walkers', 23.58, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (378, '2022-10-12 05:51:12', 'Chocolate - Pistoles, Lactee, Milk', 25.3, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (379, '2023-04-15 02:36:24', 'Absolut Citron', 12.72, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (380, '2022-08-26 03:35:08', 'Wine - Sauvignon Blanc', 37.48, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (381, '2023-02-24 05:45:14', 'Pecan Raisin - Tarts', 19.04, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (382, '2022-09-16 11:14:42', 'Tomatoes - Heirloom', 54.24, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (383, '2022-10-29 04:46:10', 'Wine - Red, Cabernet Merlot', 46.79, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (384, '2022-11-07 04:33:40', 'Soup V8 Roasted Red Pepper', 65.72, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (385, '2023-02-28 03:34:43', 'Wine - Red, Lurton Merlot De', 92.54, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (386, '2023-05-18 04:25:26', 'Curry Paste - Madras', 85.33, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (387, '2022-12-02 17:13:37', 'Miso - Soy Bean Paste', 36.94, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (388, '2023-05-16 17:50:53', 'Milk - Homo', 89.63, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (389, '2022-11-22 07:12:17', 'Lime Cordial - Roses', 22.95, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (390, '2022-08-05 17:09:08', 'Cheese - Mozzarella', 66.91, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (391, '2023-06-05 06:27:11', 'Beef - Chuck, Boneless', 70.22, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (392, '2023-03-06 10:09:30', 'Butter - Unsalted', 50.46, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (393, '2022-09-30 12:34:44', 'Wine - Pinot Noir Stoneleigh', 77.98, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (394, '2022-12-19 21:53:09', 'Ecolab Digiclean Mild Fm', 75.29, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (395, '2023-04-14 16:59:11', 'Juice - Lime', 48.56, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (396, '2022-10-27 17:39:56', 'Cake - Mini Cheesecake', 58.14, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (397, '2023-07-27 22:10:05', 'Cheese - Havarti, Salsa', 76.42, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (398, '2023-05-14 00:23:47', 'Pea - Snow', 94.27, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (399, '2022-11-16 14:38:42', 'Wine - Pinot Noir Mondavi Coastal', 90.92, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (400, '2022-09-03 14:07:58', 'Parsley Italian - Fresh', 12.21, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (401, '2022-10-31 17:57:41', 'Chocolate - Compound Coating', 38.3, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (402, '2023-01-19 21:04:02', 'Beer - Molson Excel', 48.16, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (403, '2022-08-12 12:47:02', 'Curry Powder Madras', 21.12, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (404, '2023-04-28 21:41:22', 'Lettuce - Sea / Sea Asparagus', 16.11, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (405, '2023-07-24 09:47:38', 'Okra', 43.63, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (406, '2023-02-09 22:02:53', 'Chutney Sauce - Mango', 65.25, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (407, '2023-03-26 13:41:50', 'Muffin Mix - Carrot', 78.59, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (408, '2022-08-17 12:37:00', 'Lotus Rootlets - Canned', 24.49, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (409, '2023-01-25 21:28:42', 'Garlic Powder', 56.45, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (410, '2023-05-12 20:55:37', 'Flower - Commercial Spider', 95.26, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (411, '2022-09-09 12:43:58', 'Foam Cup 6 Oz', 24.95, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (412, '2023-07-02 04:07:59', 'Butter - Salted, Micro', 24.2, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (413, '2023-06-26 17:13:49', 'Milk - Homo', 30.03, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (414, '2022-08-11 12:24:58', 'Bacardi Raspberry', 9.7, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (415, '2023-05-18 14:35:38', 'Cassis', 47.69, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (416, '2023-06-28 18:30:00', 'Water Chestnut - Canned', 67.09, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (417, '2022-10-08 03:41:06', 'Soup - Chicken And Wild Rice', 23.24, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (418, '2023-02-13 04:39:23', 'Mushroom - Morels, Dry', 64.83, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (419, '2022-09-14 10:27:31', 'Beer - Original Organic Lager', 85.33, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (420, '2022-10-14 10:31:19', 'Champagne - Brights, Dry', 49.37, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (421, '2023-05-04 17:20:11', 'Beer - Upper Canada Light', 5.16, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (422, '2022-12-21 16:14:29', 'Wine - White, Antinore Orvieto', 23.62, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (423, '2022-09-29 15:32:14', 'Wine - Red, Mouton Cadet', 77.91, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (424, '2023-04-06 13:02:10', 'Poppy Seed', 8.1, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (425, '2023-02-03 02:31:17', 'Paste - Black Olive', 70.05, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (426, '2022-10-28 13:34:23', 'Mustard - Pommery', 1.64, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (427, '2023-02-10 16:48:03', 'Water - Spring 1.5lit', 55.55, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (428, '2022-08-28 20:29:02', 'Sugar - Palm', 57.65, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (429, '2023-06-16 13:40:39', 'Cheese - Cheddar With Claret', 38.3, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (430, '2023-07-25 21:38:10', 'Pear - Halves', 31.89, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (431, '2022-09-16 09:08:54', 'Fond - Chocolate', 96.75, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (432, '2022-11-19 16:16:06', 'Bay Leaf', 93.9, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (433, '2023-06-29 22:47:37', 'Mushroom - Enoki, Dry', 57.3, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (434, '2023-01-28 06:27:28', 'Quinoa', 70.88, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (435, '2023-02-25 07:12:46', 'Spinach - Spinach Leaf', 47.78, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (436, '2023-03-02 03:54:38', 'Chilli Paste, Sambal Oelek', 55.29, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (437, '2022-11-13 01:34:36', 'Yogurt - Raspberry, 175 Gr', 74.87, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (438, '2022-09-16 15:01:16', 'Pasta - Orecchiette', 12.05, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (439, '2023-07-28 10:12:48', 'Plate Pie Foil', 49.06, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (440, '2023-02-23 23:17:05', 'Stock - Beef, Brown', 91.29, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (441, '2022-10-14 05:21:35', 'Cheese - Mozzarella', 66.03, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (442, '2023-01-06 21:05:47', 'Wine - Saint - Bris 2002, Sauv', 67.31, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (443, '2022-12-27 08:35:40', 'Cabbage - Nappa', 9.39, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (444, '2023-01-24 18:33:03', 'Table Cloth 62x120 Colour', 25.23, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (445, '2023-01-22 19:12:55', 'Steam Pan - Half Size Deep', 31.51, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (446, '2023-03-16 09:29:31', 'Tea - Honey Green Tea', 1.21, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (447, '2023-03-31 05:49:59', 'Bread - White, Sliced', 26.71, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (448, '2022-08-08 20:02:02', 'Compound - Rum', 87.16, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (449, '2022-12-25 15:13:39', 'Potatoes - Idaho 80 Count', 58.77, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (450, '2023-02-13 00:25:21', 'Table Cloth 62x114 Colour', 14.13, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (451, '2023-01-05 19:08:01', 'Dooleys Toffee', 15.52, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (452, '2022-10-03 18:36:21', 'Beans - French', 69.96, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (453, '2023-02-23 00:55:02', 'Flower - Carnations', 71.81, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (454, '2023-02-03 12:53:01', 'Gatorade - Fruit Punch', 9.28, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (455, '2023-04-24 14:14:19', 'Pears - Bosc', 83.38, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (456, '2022-12-15 01:17:55', 'Pasta - Tortellini, Fresh', 37.01, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (457, '2022-10-09 04:57:21', 'Pastry - Key Limepoppy Seed Tea', 46.69, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (458, '2023-03-08 13:26:02', 'Juice - V8 Splash', 68.45, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (459, '2023-02-10 23:33:44', 'Garlic - Elephant', 88.16, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (460, '2023-07-14 16:37:15', 'Bandage - Flexible Neon', 67.38, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (461, '2023-05-08 18:07:11', 'Papayas', 11.09, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (462, '2023-07-23 11:27:23', 'Goldschalger', 68.0, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (463, '2023-02-13 10:21:54', 'Cheese - Ricotta', 35.81, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (464, '2022-12-21 17:27:51', 'Flour - Corn, Fine', 65.5, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (465, '2022-12-01 11:21:34', 'Syrup - Monin, Irish Cream', 69.86, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (466, '2023-03-11 06:12:03', 'Egg - Salad Premix', 20.33, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (467, '2022-09-06 10:24:03', 'Pecan Raisin - Tarts', 43.6, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (468, '2022-09-18 08:35:35', 'Potatoes - Pei 10 Oz', 57.31, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (469, '2023-04-23 13:02:09', 'Asparagus - White, Canned', 62.71, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (470, '2023-03-20 10:27:58', 'Flour - Rye', 74.81, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (471, '2023-03-25 15:33:17', 'Peas - Pigeon, Dry', 78.29, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (472, '2023-03-09 09:44:50', 'Split Peas - Green, Dry', 7.12, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (473, '2023-07-26 20:50:30', 'Fish - Scallops, Cold Smoked', 8.35, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (474, '2023-04-11 13:00:26', 'Table Cloth 144x90 White', 2.0, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (475, '2023-01-15 19:05:27', 'Langers - Ruby Red Grapfruit', 20.54, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (476, '2022-08-15 11:03:46', 'Fruit Mix - Light', 30.35, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (477, '2023-05-17 03:02:27', 'Soup - Campbells, Lentil', 30.73, 5);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (478, '2022-09-10 21:46:50', 'Beans - Butter Lrg Lima', 65.92, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (479, '2023-07-26 15:27:05', 'Cognac - Courvaisier', 48.11, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (480, '2023-02-08 18:49:50', 'Container - Clear 32 Oz', 57.1, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (481, '2022-10-16 10:04:33', 'Apples - Spartan', 26.76, 1);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (482, '2023-06-03 00:26:55', 'Wine - Chablis J Moreau Et Fils', 15.02, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (483, '2023-04-05 09:17:02', 'Wine - Crozes Hermitage E.', 5.15, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (484, '2023-03-22 11:49:11', 'Macaroons - Homestyle Two Bit', 26.82, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (485, '2022-11-20 12:33:29', 'Doilies - 8, Paper', 46.39, 10);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (486, '2023-01-07 15:57:33', 'Jam - Apricot', 46.73, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (487, '2023-02-02 20:04:27', 'Cake - French Pear Tart', 98.18, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (488, '2022-12-29 14:49:23', 'Plasticforkblack', 67.39, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (489, '2023-01-13 09:11:21', 'Watercress', 38.72, 11);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (490, '2023-05-06 10:18:10', 'Carbonated Water - Cherry', 83.2, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (491, '2022-10-18 16:53:16', 'Crab - Dungeness, Whole, live', 4.54, 2);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (492, '2022-08-29 07:14:02', 'Bok Choy - Baby', 45.93, 8);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (493, '2023-01-24 21:52:00', 'Chicken - Leg / Back Attach', 37.14, 6);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (494, '2023-05-15 21:16:08', 'V8 Pet', 14.1, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (495, '2023-01-08 02:42:36', 'Mushroom - Enoki, Dry', 4.38, 7);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (496, '2022-10-09 19:01:13', 'Mustard - Dijon', 19.44, 9);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (497, '2022-12-22 10:08:45', 'Trueblue - Blueberry', 94.79, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (498, '2023-01-07 04:13:20', 'Split Peas - Green, Dry', 82.66, 4);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (499, '2023-02-21 07:06:08', 'Pork - Bacon,back Peameal', 47.22, 3);
insert into purchase (id, purchase_date, concept, amount, id_branch) values (500, '2022-08-14 00:21:49', 'Soup - Tomato Mush. Florentine', 71.52, 8);
