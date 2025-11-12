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

---

### OBSERVACIONES

- El campo id_usuario_dni en la tabla usuarios se ha definido como `VARCHAR(9)` para usar el DNI/NIF como clave primaria, lo que podría requerir ajuste si el sistema se internacionaliza.
- La conexión a PostgreSQL fue exitosa y está lista para la implementación del backend.