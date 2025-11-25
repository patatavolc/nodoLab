## FECHA:12/11/25

### AUTOR

Pablo

### ARCHIVOS MODIFICADOS

- index.js
- chatHandlers.socket
- manager.socket.js
- socket.middleware.js
- .env.example

### DESCRIPCION
Se modifica index para crear instancia del servidor http, este maneja las peticiones RESt gestionadas por express y las conexiones de websocket gestionadas por socket.io.
Se crean dos archivos chatHandlers.socket y manager.socket.js y socket.middleware.js, manager.socket.js escucha en el puerto por si se conecta un suario, lo añada al mapa de usuarios conectados, delega la comunicación al archivo chatHandlers.socket y borra del mapa de usuarios cuando este se desconecta.
chatHandlers.socket recibe el mensaje, busca el destinatario y se lo envia solamente a el, finalmente recibe un aviso de que ha sido entregado o que el usuario no esta conectado.
Se añade la obtencion del token del usuario al iniciar sesion.
Se añade al .env.example la variable necesaria para cifrar el toquen

### OBSERVACIONES
Pendiente de revision
Falta añadir:
    -Implemeentacion en frontedn


## FECHA:

### AUTOR

Pablo

### ARCHIVOS MODIFICADOS

- index.js
- mainRouter.js
- usuarios.routes.js
- datosBancarios.routes.js
- recursos.routes.js

### DESCRIPCION
modificacion de raiz con mainRouter
creacion de los archivos:
    usuariosRouter
    mainRouter
    usuarios.routes.js
    datosBancarios.routes.js
    recursos.routes.js
    reservas.routes.js

se crean todas las rutas de los diferentes archivos con los metodos get, post y update

### OBSERVACIONES

-
-
## FECHA:

### AUTOR

Pablo

### ARCHIVOS MODIFICADOS

-datosBancarios.controller
- detallesFactura.controller
- facturas.controller
- reservas.controller
- usuarios.controller

### DESCRIPCION

Se crean todos los controladores de los archivos en referencia a las rutas creadas con anterioridad, solamente se crea el create

### OBSERVACIONES

## FECHA:

### AUTOR

Pablo

### ARCHIVOS MODIFICADOS

-datosBancarios.controller
- detallesFactura.controller
- facturas.controller
- reservas.controller
- usuarios.controller

### DESCRIPCION

Se crean todos los get, post y update de los diferntes archivos

### OBSERVACIONES



## FECHA:

### AUTOR

Pablo

### ARCHIVOS MODIFICADOS

- index.js

### DESCRIPCION

Se modifica para implementar el archivo de mainRoutes donde estan todas las rutas de los diferentes archivos según su método

### OBSERVACIONES

-
## FECHA:

### AUTOR

Pablo

### ARCHIVOS MODIFICADOS

- logger.js
- index.js

### DESCRIPCION

Se modifica para implementar el archivo index para incorgporar los loogers y se crea el archivo looger que guarda en la base de adtos, ip, metodo url. fecha

### OBSERVACIONES

-
## FECHA:

### AUTOR

Pablo

### ARCHIVOS MODIFICADOS

- .controller

### DESCRIPCION

Se modifican archivos .controller implementando los services
### OBSERVACIONES

-






