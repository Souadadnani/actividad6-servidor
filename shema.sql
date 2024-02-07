-- This script was generated by the ERD tool in pgAdmin 4.
-- Please log an issue at https://github.com/pgadmin-org/pgadmin4/issues/new/choose if you find any bugs, including reproduction steps.
BEGIN;


CREATE TABLE IF NOT EXISTS public.compras
(
    usuario integer NOT NULL,
    videojuego integer NOT NULL,
    comprado boolean,
    CONSTRAINT compras_pkey PRIMARY KEY (usuario, videojuego)
);

CREATE TABLE IF NOT EXISTS public.usuarios
(
    id integer NOT NULL DEFAULT nextval('usuarios_id_seq'::regclass),
    nombre text COLLATE pg_catalog."default",
    password text COLLATE pg_catalog."default" NOT NULL,
    CONSTRAINT usuarios_pkey PRIMARY KEY (id)
);

CREATE TABLE IF NOT EXISTS public.videojuegos
(
    id integer NOT NULL DEFAULT nextval('videojuegos_id_seq'::regclass),
    nombre text COLLATE pg_catalog."default",
    CONSTRAINT videojuegos_pkey PRIMARY KEY (id)
);

ALTER TABLE IF EXISTS public.compras
    ADD CONSTRAINT compras_usuario_fkey FOREIGN KEY (usuario)
    REFERENCES public.usuarios (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;


ALTER TABLE IF EXISTS public.compras
    ADD CONSTRAINT compras_videojuego_fkey FOREIGN KEY (videojuego)
    REFERENCES public.videojuegos (id) MATCH SIMPLE
    ON UPDATE NO ACTION
    ON DELETE NO ACTION;

END;