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

## FECHA: [14/11/2025]

### AUTOR: [Jose]

### ARCHIVOS MODIFICADOS

- docs/individual/Jose.md (modificado)
- database/procedures/11-crear_reserva_sin_solapamiento (creado)
- database/procedures/12-cancelar_reserva (creado)

### DESCRIPCION

- Estuve observando los procedimientos que hemos estado haciendo y me dí cuenta que en las reservas podría haber conflicto al crear una reserva por culpa de que dos o más reservas se solapasen, así que decidí crear un procedimiento para impedir esto. Tras crear este procedimiento, observé que habia un procedimiento para crear la reserva, pero no existía uno para cancelarla, así que decidí hacer estos dos procedimientos, mejorando la base de datos.

### OBSERVACIONES

- Cuando terminé los dos procedimientos, estuve hablando con Nicolás Blasco sobre que podía seguir haciendo, así que nos decantamos con que me ayudase a pensar que procedimientos podíamos implementar y posteriormente ponernos a crearlos. Así que eso hicimos, nos dividimos el trabajo para poder finalizar los procedimientos cuanto antes y seguir con otras partes del proyecto.

## FECHA: [20/11/2025]

### AUTOR: [Jose]

### ARCHIVOS MODIFICADOS

- backend/services/auth_service.js (modificado)
- backend/services/datosBancarios.service.js (modificado)
- backend/services/pagos.service.js (modificado)
- backend/services/recursos.service.js (modificado)
- backend/services/usuarios.service.js (modificado)


### DESCRIPCION

- He movido la carpeta de database, la cual se encontraba en la carpeta raíz, dentro del backend. Además he cambiado las rutas de los archivos dentro de services para que se importe correctamente.

### OBSERVACIONES

- Un problema que tuve fue que cuando me he puesto a crear una nueva rama, se me ha olvidado hacer un pull, asi que me he puesto a cambiar la estructura de carpetas y me he dado cuenta que tenia muy pocos procedimientos, entonces me he dado cuenta de que no tenía actualizado el código, por lo que he hecho un git pull origin main desde mi nueva rama, y tras eso me he puesto a meter la carpeta database en el backend.

## FECHA: [23/11/2025]

### AUTOR: [Jose]

### ARCHIVOS MODIFICADOS

- backend/services/reservas.service.js (modificado)
- backend/services/usuarios.service.js (modificado)


### DESCRIPCION

- Empecé a crear todos los servicios del archivo reservas.service.js, tras terminarlos empecé con algunos del archivo usuarios.service.js. Gracias a estas implementaciones, ahora se pueden realizar diversas querys en estos archivos, como crear una reserva, actualizar un usuario, cancelar una reserva, etc.

### OBSERVACIONES

- Me di cuenta que muchos de los archivos tenian que tener mismas querys, esto me ahorró trabajo, pues como ya tenia hecho alguna query en reservas.service.js, la pude realizar de nuevo en usuarios.service.js, pero cambiando la informacion de las tablas.

## FECHA: [24/11/2025]

### AUTOR: [Jose]

### ARCHIVOS MODIFICADOS

- backend/services/usuarios.service.js (modificado)

### DESCRIPCION

- Comencé creando los servicios que me faltaban para completar el archivo usuarios.service.js. La estructura que llevé fue la misma que llevé con el archivo reservas.service.js, primero poner la query de crear un usuario, despues las que iban relacionadas con obtener información y verificar dicha información, y por último, actualizar un recurso, buscarlo por nombre, email o username, y eliminar un recurso.

### OBSERVACIONES

- Este dia traté de terminar con el archivo de usuarios, para el dia siguiente seguir con los archivos que faltan.