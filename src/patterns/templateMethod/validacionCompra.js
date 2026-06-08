/**
 * Patrón Template Method: define el esqueleto del flujo de validación.
 * Los pasos concretos (reglas por campo) se delegan a estrategias/hooks.
 */

const reglasPorCampo = {
  nombre: (valor) => (!valor.trim() ? 'El nombre es obligatorio' : null),
  apellido: (valor) => (!valor.trim() ? 'El apellido es obligatorio' : null),
  email: (valor) => {
    if (!valor.trim()) return 'El email es obligatorio';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor)) return 'Ingresá un email válido';
    return null;
  },
  telefono: (valor) => (!valor.trim() ? 'El teléfono es obligatorio' : null),
  direccion: (valor) =>
    !valor.trim() ? 'La dirección o localidad es obligatoria' : null,
};

function validarCampos(formData, reglas = reglasPorCampo) {
  const errores = {};

  Object.entries(reglas).forEach(([campo, regla]) => {
    const error = regla(formData[campo], formData);
    if (error) errores[campo] = error;
  });

  return errores;
}

function validarReglasExtra(formData, reglasExtra = []) {
  return reglasExtra.reduce((errores, regla) => {
    const error = regla(formData);
    return error ? { ...errores, ...error } : errores;
  }, {});
}

/**
 * Template Method: siempre ejecuta validar campos → reglas extra → consolidar.
 */
export function ejecutarValidacionCompra(formData, opciones = {}) {
  const { reglasExtra = [], carritoVacio = false } = opciones;

  let errores = validarCampos(formData);

  errores = {
    ...errores,
    ...validarReglasExtra(formData, reglasExtra),
  };

  if (carritoVacio) {
    errores.carrito = 'El carrito está vacío';
  }

  return {
    esValido: Object.keys(errores).length === 0,
    errores,
  };
}