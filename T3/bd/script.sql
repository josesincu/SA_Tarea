-- Creación de la base de datos
CREATE DATABASE gestion_configuracion;

-- Tabla de Responsables
CREATE TABLE Responsable (
    responsable_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    equipo VARCHAR(100) NOT NULL
);

-- Tabla de Documentación
CREATE TABLE Documentacion (
    doc_id SERIAL PRIMARY KEY,
    tipo_documento VARCHAR(100),
    enlace TEXT,
    descripcion TEXT
);

-- Tabla de Elementos de Configuración (CI)
CREATE TABLE ElementoConfiguracion (
    ci_id SERIAL PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    tipo VARCHAR(50) NOT NULL CHECK (tipo IN ('Hardware', 'Software')),
    descripcion TEXT,
    numero_serie VARCHAR(100),
    version VARCHAR(50),
    fecha_adquisicion DATE,
    estado_actual VARCHAR(50) NOT NULL,
    ubicacion_fisica VARCHAR(100),
    nivel_seguridad VARCHAR(50),
    cumplimiento VARCHAR(50),
    estado_configuracion VARCHAR(50),
    numero_licencia VARCHAR(100),
    fecha_vencimiento DATE,
    responsable_id INTEGER REFERENCES Responsable(responsable_id)
);

-- Tabla de Cambios
CREATE TABLE Cambio (
    cambio_id SERIAL PRIMARY KEY,
    ci_id INTEGER NOT NULL REFERENCES ElementoConfiguracion(ci_id),
    fecha_cambio DATE NOT NULL,
    descripcion_cambio TEXT NOT NULL,
    documentacion_relacionada TEXT,
    enlace_incidentes TEXT
);

-- Tabla de Relaciones entre CIs (relación recursiva)
CREATE TABLE RelacionCI (
    relacion_id SERIAL PRIMARY KEY,
    ci_padre_id INTEGER NOT NULL REFERENCES ElementoConfiguracion(ci_id),
    ci_hijo_id INTEGER NOT NULL REFERENCES ElementoConfiguracion(ci_id),
    tipo_relacion VARCHAR(100) NOT NULL,
    UNIQUE (ci_padre_id, ci_hijo_id, tipo_relacion)
);

-- Tabla intermedia para relación muchos-a-muchos entre CI y Documentación
CREATE TABLE CI_Documentacion (
    ci_doc_id SERIAL PRIMARY KEY,
    ci_id INTEGER NOT NULL REFERENCES ElementoConfiguracion(ci_id),
    doc_id INTEGER NOT NULL REFERENCES Documentacion(doc_id),
    UNIQUE (ci_id, doc_id)
);

-- Índices para mejorar el rendimiento
CREATE INDEX idx_elemento_config_nombre ON ElementoConfiguracion(nombre);
CREATE INDEX idx_elemento_config_tipo ON ElementoConfiguracion(tipo);
CREATE INDEX idx_elemento_config_responsable ON ElementoConfiguracion(responsable_id);
CREATE INDEX idx_cambio_ci ON Cambio(ci_id);
CREATE INDEX idx_relacion_ci_padre ON RelacionCI(ci_padre_id);
CREATE INDEX idx_relacion_ci_hijo ON RelacionCI(ci_hijo_id);