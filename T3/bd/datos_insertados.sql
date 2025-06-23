-- Insertar responsables
INSERT INTO Responsable (nombre, equipo) VALUES 
('Equipo de Infraestructura', 'Infraestructura'),
('Equipo de Desarrollo', 'Desarrollo');

-- Insertar elementos de configuración
INSERT INTO ElementoConfiguracion (
    nombre, tipo, descripcion, numero_serie, version, fecha_adquisicion, 
    estado_actual, ubicacion_fisica, nivel_seguridad, cumplimiento, 
    estado_configuracion, numero_licencia, fecha_vencimiento, responsable_id
) VALUES 
('Servidor1', 'Hardware', 'Servidor de Aplicaciones', 'SN123456', 'v1.0', '2022-01-01', 
 'Activo', 'Sala de Servidores 1', 'Alto', 'Cumple', 
 'Aprobado', 'ABC123', '2023-01-01', 1),
('Aplicación', 'Software', 'Aplicación de contabilidad', NULL, 'v2.5', '2022-03-15', 
 'Activo', 'Servidor1', 'Medio', 'Cumple', 
 'Aprobado', 'XYZ456', '2024-01-01', 2);

-- Insertar documentación
INSERT INTO Documentacion (tipo_documento, enlace, descripcion) VALUES
('Manual', '[Enlace a Manual](url)', 'Manual de usuario para el servidor'),
('Documentación Técnica', '[Enlace a Documentacion Tecnica](url)', 'Documentación técnica de la aplicación');

-- Insertar cambios
INSERT INTO Cambio (ci_id, fecha_cambio, descripcion_cambio, documentacion_relacionada, enlace_incidentes) VALUES
(1, '2022-02-01', 'Actualización de Software', '[Enlace a Manual](url)', '[Enlace a Incidente](url)'),
(2, '2022-04-01', 'Parche de Seguridad', '[Enlace a Documentacion Tecnica](url)', '[Enlace a Incidente](url)');


-- Primero insertar Base de Datos1 si no existe
INSERT INTO ElementoConfiguracion (
    nombre, tipo, descripcion, estado_actual, responsable_id
) VALUES 
('Base de Datos1', 'Software', 'Base de datos principal', 'Activo', 1);

-- Luego crear las relaciones
INSERT INTO RelacionCI (ci_padre_id, ci_hijo_id, tipo_relacion) VALUES
(1, 3, 'Dependencia'),  -- Servidor1 depende de Base de Datos1
(2, 3, 'Dependencia');  -- Aplicación depende de Base de Datos1

-- Relacionar documentos con CIs
INSERT INTO CI_Documentacion (ci_id, doc_id) VALUES
(1, 1),  -- Servidor1 tiene Manual
(2, 2);  -- Aplicación tiene Documentación Técnica