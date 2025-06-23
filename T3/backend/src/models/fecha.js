function obtenerFechaHoraActual() {
  const ahora = new Date();
  const pad = (n) => n.toString().padStart(2, '0');

  const año = ahora.getFullYear();
  const mes = pad(ahora.getMonth() + 1);
  const dia = pad(ahora.getDate());
  const hora = pad(ahora.getHours());
  const minuto = pad(ahora.getMinutes());
  const segundo = pad(ahora.getSeconds());

  return `${año}-${mes}-${dia} ${hora}:${minuto}:${segundo}`;
}

module.exports = {obtenerFechaHoraActual}