const reglasPorCampo = {
  nombre: (valor) => {
    if (!valor.trim()) return 'El nombre es obligatorio';
    if (valor.trim().length < 3) return 'El nombre debe tener al menos 3 caracteres';
    return null;
  },
  apellido: (valor) => {
    if (!valor.trim()) return 'El apellido es obligatorio';
    if (valor.trim().length < 3) return 'El apellido debe tener al menos 3 caracteres';
    return null;
  },
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
