DROP TABLE IF EXISTS usuarios CASCADE;
CREATE TABLE usuarios (
    id_usuario_dni VARCHAR(9) PRIMARY KEY,
    rol VARCHAR(50) NOT NULL CHECK (rol IN ('admin', 'empleado', 'cliente')),
    nombre_completo VARCHAR(150) NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    telefono VARCHAR(20),
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    salt VARCHAR(32) NOT NULL
);

DROP TABLE IF EXISTS datos_bancarios CASCADE;
CREATE TABLE datos_bancarios (
    id_dato_bancario SERIAL PRIMARY KEY,
    id_usuario VARCHAR(9) REFERENCES usuarios(id_usuario_dni) ON DELETE CASCADE,
    IBAN VARCHAR(34),
    num_tarjeta VARCHAR(20),
    fecha_tarjeta DATE,
    CVV CHAR(3)
);

DROP TABLE IF EXISTS recursos CASCADE;
CREATE TABLE recursos (
    id_recurso SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('sala', 'mesa', 'oficina_privada')),
    descripcion TEXT,
    capacidad INT CHECK (capacidad >= 1),
    estado VARCHAR(20) DEFAULT 'disponible' CHECK (estado IN ('disponible', 'ocupado', 'mantenimiento')),
    precio_hora DECIMAL(10,2) NOT NULL CHECK (precio_hora > 0)
);

DROP TABLE IF EXISTS reservas CASCADE;
CREATE TABLE reservas (
    id_reserva SERIAL PRIMARY KEY,
    id_usuario VARCHAR(9) REFERENCES usuarios(id_usuario_dni) ON DELETE CASCADE,
    id_recurso INT REFERENCES recursos(id_recurso) ON DELETE CASCADE,
    fecha_inicio TIMESTAMP WITH TIME ZONE NOT NULL,
    fecha_fin TIMESTAMP WITH TIME ZONE NOT NULL,
    estado VARCHAR(20) NOT NULL CHECK (estado IN ('pendiente', 'confirmada', 'completada', 'cancelada'))
);

DROP TABLE IF EXISTS pagos CASCADE;
CREATE TABLE pagos (
    id_pago SERIAL PRIMARY KEY,
    id_reserva INT REFERENCES reservas(id_reserva) ON DELETE CASCADE,
    precio_total DECIMAL(10,2) NOT NULL CHECK (precio_total > 0),
    metodo_pago VARCHAR(50) CHECK (metodo_pago IN ('tarjeta', 'efectivo', 'transferencia')),
    fecha_pago TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    devolucion BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS facturas CASCADE;
CREATE TABLE facturas (
    id_factura SERIAL PRIMARY KEY,
    fecha_factura DATE NOT NULL DEFAULT CURRENT_DATE,
    total_bruto DECIMAL(12,2) NOT NULL DEFAULT 0,
    total_IVA DECIMAL(12,2) NOT NULL DEFAULT 0,
    total_neto DECIMAL(12,2) NOT NULL DEFAULT 0,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('diaria', 'mensual'))
);

DROP TABLE IF EXISTS detalle_factura CASCADE;
CREATE TABLE detalle_factura (
    id_detalle SERIAL PRIMARY KEY,
    id_factura INT REFERENCES facturas(id_factura) ON DELETE CASCADE,
    id_pago INT REFERENCES pagos(id_pago) ON DELETE CASCADE,
    subtotal DECIMAL(10,2) NOT NULL,
    IVA DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL
);

DROP TABLE IF EXISTS mensajes CASCADE;
CREATE TABLE mensajes (
    id_mensaje SERIAL PRIMARY KEY,
    id_emisor VARCHAR(9) REFERENCES usuarios(id_usuario_dni) ON DELETE CASCADE,
    id_receptor VARCHAR(9) REFERENCES usuarios(id_usuario_dni) ON DELETE CASCADE,
    fecha_mensaje TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    mensaje TEXT NOT NULL
);

DROP TABLE IF EXISTS logs CASCADE;
CREATE TABLE logs (
    id_log SERIAL PRIMARY KEY,
    id_usuario VARCHAR(9) REFERENCES usuarios(id_usuario_dni) ON DELETE SET NULL,
    fecha_log TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    metodo VARCHAR(10) NOT NULL,
    ip VARCHAR(45) NOT NULL,
    url VARCHAR(255) NOT NULL
);