create table usuarios(
	id serial primary key,
	nombre varchar(100),
	password varchar(255)
);
create table videojuegos(
	id serial primary key,
	nombre varchar(255)
);
create table compras(
	usuario integer,
	videojuego integer,
	fechaCompra timestamp,
	primary key(usuario, videojuego),
	foreign key (usuario) references usuarios(id),
	foreign key (videojuego) references videojuegos(id)
);