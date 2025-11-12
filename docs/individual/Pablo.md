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


-
## FECHA:

### AUTOR

Pablo

### ARCHIVOS MODIFICADOS

-

### DESCRIPCION

### OBSERVACIONES

-
