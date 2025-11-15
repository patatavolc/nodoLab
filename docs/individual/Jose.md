## FECHA: [08/11/2025]

### AUTOR: [Jose]

### ARCHIVOS MODIFICADOS

- database/schema.sql (creado)

### DESCRIPCION

Creación de la base de datos: Se realizó la configuración inicial del sistema de gestión de bases de datos (PostgreSQL). Se creó la base de datos en el servidor y se vinculó la conexión en VSCode para facilitar la gestión y tenerlo documentado.

Se creó la estructura de la base de datos para el proyecto, almacenada en la carpeta `database` con el archivo `schema.sql`. 

schema.sql:

- Tablas Principales: `usuarios`, `recursos`, `reservas`.
- Tablas Transaccionales: `datos_bancarios`, `pagos`, `facturas`, `detalle_factura`.
- Tablas de Soporte: `mensajes`, `logs`.

### OBSERVACIONES

- El campo id_usuario_dni en la tabla usuarios se ha definido como `VARCHAR(9)` para usar el DNI/NIF como clave primaria, lo que podría requerir ajuste si el sistema se internacionaliza.
- La conexión a PostgreSQL fue exitosa y está lista para la implementación del backend.

## FECHA: [12/11/2025]

### AUTOR: [Jose]

### ARCHIVOS MODIFICADOS

- docs/individual/Jose.md (modificado)
- database/schema.sql (modificado)

### DESCRIPCION

- He modificado el archivo docs/individual/Jose.md indicando que es lo que hice el dia 08/11/2025, pues ese dia se me olvidó documentar feat que implementé.
- Posteriormente he corregido un error que habia en el archivo database/schema.sql, pues estaba mal escrito el tipo de dato que tenía id_usuario_dni en la tabla usuarios, así que lo he cambiado de tipo SERIAL a VARCHAR. Seguidamente he cambiado esto mismo en las zonas en las que estaba referenciado el id de la tabla usuarios. 

### OBSERVACIONES

- Cambio importante en database/schema.sql, ahora he referenciado bien el id de usuario en las diversas tablas para que el funcionamiento sea correcto
- docs/individual/Jose.md actualizado para ir documentando el trabajo y asegurar un registro completo.

## FECHA: [13/11/2025]

### AUTOR: [Jose]

### ARCHIVOS MODIFICADOS

- database/procedures/01-crear-usuario.sql (creado)
- database/procedures/02-obtener-hash-salt.sql (creado)
- database/procedures/03-obtener-recursos-disponibles (creado)
- database/procedures/04-crear-nueva-reserva (creado)

### DESCRIPCION

- He creado dos procedimientos que son esenciales para el registro de la aplicación. 
    - 01-crear-usuario.sql => Registra un nuevo usuario, funciona insertando una nueva fila en la tabla usuarios.
    - 02-obtener-hash-salt.sql => Tras que un usuario haya escrito su username o email, la funcion devuelve el password_hash y el salt almacenados en la base de datos.
- Tras crear los dos primeros procedimientos de registro, me he puesto a crear el sistema de verificar la dispinibilidad y crear reservas.
    - 03-obtener-recursos-disponibles => Se encarga de ver qué se puede reservar, filtrando y validando los datos.
    - 04-crear-nueva-reserva => Trata de hacer una reserva, la cual valida anteriormente la disponibilidad.

Estas funcionalidades las he implementado primeramente en la base de datos de postgresSQL y tras ver que funcionaba correctamente me he puesto a crearlos en el proyecto nodoLab con VSCode.

### OBSERVACIONES

- Los porcedimientos los he almacenado en una carpeta llamada procedures para una mejor organización del proyecto.
- En el archivo database/procedures/02-obtener-hash-salt.sql, he usado FUNCTION en lugar de un PROCEDURE, pues en PostgreSQL no se permite hacer returns en los PROCEDURES.