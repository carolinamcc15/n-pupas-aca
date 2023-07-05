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