## FECHA: [10/11/2025]

### AUTOR

Carlos

### ARCHIVOS MODIFICADOS
backend/
    controllers/
        auth_controller.js
    routers/
        auth.js
    services/
        auth_service.js
.env.example
database/
    schema.sql

### DESCRIPCION
He creado tanto el endpoint necesario para que los usuarios se registren, asi como toda su logica, sus comprobaciones, y su servicio. Tambien he modificado 3 campos de la tabla usuario de la DB para corregir errores relacionados.


### OBSERVACIONES
La contraseña no tiene limitaciones de caracteres especiales, longitud, etc, ya que de momento no se cuales quieren que tenga, o si quieren que tenga alguno en general.

/////////////////////////////////////////////////////////

## FECHA: [15/11/2025]

### AUTOR

Carlos

### ARCHIVOS MODIFICADOS

backend/
    database/
        procedures/
            event01-optimizar-db.sql
            event02-generar-factura-diaria.sql
            event03-generar-factura-mensual.sql
README.md

### DESCRIPCION
He creado el procedimiento de optimizacion de la DB. Tambien uno que al ser llamado genera la factura diaria y cambia todos los datos necesarios en la db y otro que hace lo mismo con la mensual.
Por ultimo he incluido en el README.md los cronjobs necesarios para que estos procedimientos operen como pseudo-eventos.

### OBSERVACIONES
En PostgreSQL no hay eventos de manera nativa, por lo que el uso de los cronjobs seria indispensable. Siendo un entorno ficticio los dejo en el README.md para que quede constancia de ellos.

/////////////////////////////////////////////////////////

## FECHA:

### AUTOR

Carlos

### ARCHIVOS MODIFICADOS



### DESCRIPCION

### OBSERVACIONES


/////////////////////////////////////////////////////////

## FECHA:

### AUTOR

Carlos

### ARCHIVOS MODIFICADOS
backend/
    controllers/
        auth_controller.js
    routers/
        auth.js
    services/
        auth_service.js
    middewares/
    auth.middleware.js
    index.js
.vscode/
    settings.json

### DESCRIPCION
He creado la ruta del login y su controlador. Tambien los servicios necesarios para que funcione. Un login correcto genera un token que se guarda en una cookie. Uno incorrecto devuelve null o false dependiendo de si la cuenta no se encuentra o si la contraseña es incorrecta.
Tambien he añadido una linea para definir el tabSize de prettier al settings.json, ya que al guardar manualmente el tabSize base de prettier hacia override al de vscode.

He creado el middleware que verifica y procesa el token para devolver req.user
### OBSERVACIONES
La cookie y el token duran 30 dias. La cookie se llama "nodolab_auth_token".
La cookie contiene un payload de usuario y fingerprint, y el fingerprint se forma a partir de el socket.remoteAddress y el User-Agent.
La request que hay que mandar a /login ha de tener:
req.logData = email o username
req.password = contraseña
Si pasa por el middleware correctamente, todos los datos del usuario de la sesion se pueden encontrar en req.user.<nombreDelDatoEnLaDB>