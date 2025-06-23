# Documentacion

----
# Sistema de Gestión CMDB

Sistema completo para la gestión de Elementos de Configuración (CI) conforme a ITIL.

## Características principales
- Gestión centralizada de activos de TI
- Control de versiones y configuraciones
- Mapeo de relaciones entre componentes
- Historial de cambios y actualizaciones

## Tecnologías utilizadas
- Backend: Node.js + Express
- Base de datos: PostgreSQL
- Autenticación: JWT

## Estructura de la Base de Datos
### Diagrama Entidad-Relación
![ER](ER_gestion_configuracion.png)

### Datos de Ejemplo
### Tabla Responsable

```sql
INSERT INTO Responsable (nombre, equipo) VALUES 
('Equipo de Infraestructura', 'Infraestructura'),
('Equipo de Desarrollo', 'Desarrollo'),
('Equipo de Seguridad', 'Cybersecurity');
```
### Tabla ElementoConfiguracion
```sql
INSERT INTO ElementoConfiguracion (
    nombre, tipo, descripcion, numero_serie, version, fecha_adquisicion, 
    estado_actual, ubicacion_fisica, nivel_seguridad, cumplimiento, 
    estado_configuracion, numero_licencia, fecha_vencimiento, responsable_id
) VALUES 
('Servidor Web', 'Hardware', 'Servidor para aplicaciones web', 'SRV-001', 'v2.1', '2023-01-15', 
 'Activo', 'Sala A1', 'Alto', 'Cumple', 'Aprobado', 'LIC-WEB-001', '2025-12-31', 1),
('ERP Corporativo', 'Software', 'Sistema de planificación de recursos', NULL, 'v3.5', '2023-03-20', 
 'Activo', 'Servidor DB01', 'Crítico', 'Cumple', 'Aprobado', 'LIC-ERP-004', '2024-06-30', 2);
```
### Tabla RelacionCI
```sql
INSERT INTO RelacionCI (ci_padre_id, ci_hijo_id, tipo_relacion) VALUES
(1, 2, 'Hosting'),
(3, 1, 'Dependencia');
```

## Documentación de la API
### Base URL
http://localhost:5000

### Autenticación
Bearer Token en el header Authorization

### Endpoints

#### 1. Elementos de Configuración

| Método | Endpoint                     | Descripción                          |
|--------|------------------------------|--------------------------------------|
| GET    | `/obtener-elementos-config`  | Obtener todos los elementos          |
| POST   | `/obtener-elemento-config`   | Obtener un elemento específico       |
| POST   | `/elementos`                 | Crear un nuevo elemento              |
| PUT    | `/modificar-elemento-config` | Actualizar un elemento               |
| DELETE | `/eliminar-elemento-config`  | Eliminar un elemento                 |

# Documentación de la API - Elementos de Configuración (CI)

## Descripción
Esta API permite gestionar los Elementos de Configuración (CI) del sistema CMDB, incluyendo hardware, software y sus relaciones.

## Autenticación
Todas las rutas requieren autenticación mediante JWT:
```
Authorization: Bearer <token>
```

---

## Endpoints

### 1. Crear Elemento de Configuración (POST)

**URL**: `http://localhost:5000/crear-elemento-config`

**Descripción**: Crea un nuevo elemento de configuración en el sistema.

**Body** (application/json):
```json
{
  "nombre": "Servidor DB-01",
  "tipo": "Hardware",
  "descripcion": "Servidor de base de datos principal",
  "numero_serie": "SRV-DB-001",
  "version": "v3.2",
  "fecha_adquisicion": "2023-05-15",
  "estado_actual": "Activo",
  "ubicacion_fisica": "Sala de Servidores A",
  "nivel_seguridad": "Alto",
  "cumplimiento": "Cumple",
  "estado_configuracion": "Aprobado",
  "numero_licencia": "LIC-DB-2023",
  "fecha_vencimiento": "2025-05-14",
  "responsable_id": 2
}
```

**Respuesta Exitosa** (201 Created):
```json
{
  "status": 201,
  "data": {
    "elemento": {
      "ci_id": 5,
      "nombre": "Servidor DB-01",
      "tipo": "Hardware",
      
    },
    "mensaje": "Elemento de configuración creado exitosamente"
  }
}
```

**Errores**:
- 400: Datos de entrada inválidos
- 409: El elemento ya existe
- 500: Error del servidor

---

### 2. Obtener Todos los Elementos (GET)

**URL**: `http://localhost:5000/obtener-elementos-config`

**Descripción**: Retorna todos los elementos de configuración registrados.

**Parámetros Query Opcionales**:
- `tipo`: Filtrar por tipo (Hardware/Software)
- `estado`: Filtrar por estado
- `responsable_id`: Filtrar por responsable

**Respuesta Exitosa** (200 OK):
```json
{
  "status": 200,
  "data": {
    "elementos": [
      {
        "ci_id": 1,
        "nombre": "Servidor Web",
        "tipo": "Hardware",
        
      },
      {
        "ci_id": 2,
        "nombre": "ERP Corporativo",
        "tipo": "Software",
        
      }
    ]
  }
}
```

---

### 3. Obtener Elemento Específico (GET)

**URL**: `http://localhost:5000/obtener-elemento-config`

**Descripción**: Obtiene los detalles de un elemento específico.

**Respuesta Exitosa** (200 OK):
```json
{
  "status": 200,
  "data": {
    "elemento": {
      "ci_id": 1,
      "nombre": "Servidor Web",
      "tipo": "Hardware",

      "responsable": {
        "responsable_id": 1,
        "nombre": "Equipo de Infraestructura"
      }
    }
  }
}
```

**Errores**:
- 404: Elemento no encontrado

---

### 4. Actualizar Elemento (PUT)

**URL**: `http://localhost:5000/modificar-elemento-config`

**Descripción**: Actualiza los datos de un elemento existente.

**Body** (application/json):
```json
{
  "nombre": "Servidor Web Actualizado",
  "estado_actual": "En Mantenimiento",
  "nivel_seguridad": "Crítico"
}
```

**Respuesta Exitosa** (200 OK):
```json
{
  "status": 200,
  "data": {
    "elemento": {
      "ci_id": 1,
      "nombre": "Servidor Web Actualizado",
      
    },
    "mensaje": "Elemento de configuración actualizado exitosamente"
  }
}
```

**Errores**:
- 400: Datos de entrada inválidos
- 404: Elemento no encontrado
- 500: Error del servidor

---

### 5. Eliminar Elemento (DELETE)

**URL**: `http://localhost:5000/eliminar-elemento-config`

**Descripción**: Elimina un elemento de configuración.

**Respuesta Exitosa** (200 OK):
```json
{
  "status": 200,
  "data": {
    "elemento": {
      "ci_id": 3,
      "nombre": "Firewall Antiguo"
    },
    "mensaje": "Elemento de configuración eliminado exitosamente"
  }
}
```

**Errores**:
- 404: Elemento no encontrado
- 409: El elemento tiene relaciones dependientes
- 500: Error del servidor

---

## Ejemplos Completos

### Crear un nuevo elemento:
```bash
curl -X POST 'http://localhost:5000/crear-elemento-config' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
-H 'Content-Type: application/json' \
-d '{
  "nombre": "Switch Core",
  "tipo": "Hardware",
  "descripcion": "Switch principal del data center",
  "estado_actual": "Activo",
  "nivel_seguridad": "Crítico"
}'
```

### Actualizar un elemento:
```bash
curl -X PUT 'http://localhost:5000/modificar-elemento-config' \
-H 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...' \
-H 'Content-Type: application/json' \
-d '{
  "estado_actual": "Retirado",
  "fecha_vencimiento": "2023-12-31"
}'
```

---

## Esquema de Validación
Todos los endpoints validan el siguiente esquema básico:

```javascript
{
  nombre: { type: String, required: true, maxlength: 100 },
  tipo: { type: String, required: true, enum: ['Hardware', 'Software'] },
  estado_actual: { type: String, required: true },
  nivel_seguridad: { type: String, enum: ['Bajo', 'Medio', 'Alto', 'Crítico'] }
}
```
