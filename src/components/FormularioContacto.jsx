import { useState } from 'react';
import { Form, Button, Alert, Row, Col } from 'react-bootstrap';

const estadoInicial = {
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  mensaje: '',
};

function validarFormulario(formData) {
  const errores = {};

  if (!formData.nombre.trim()) {
    errores.nombre = 'El nombre es obligatorio';
  } else if (formData.nombre.trim().length < 3) {
    errores.nombre = 'El nombre debe tener al menos 3 caracteres';
  }
  if (formData.apellido.trim() && formData.apellido.trim().length < 3) {
    errores.apellido = 'El apellido debe tener al menos 3 caracteres';
  }
  if (!formData.email.trim()) {
    errores.email = 'El email es obligatorio';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
    errores.email = 'Ingresá un email válido';
  }
  if (!formData.telefono.trim()) {
    errores.telefono = 'El teléfono es obligatorio';
  }

  return errores;
}

function FormularioContacto() {
  const [formData, setFormData] = useState(estadoInicial);
  const [errores, setErrores] = useState({});
  const [enviado, setEnviado] = useState(false);
  const [nombreConfirmado, setNombreConfirmado] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = name === 'telefono' ? value.replace(/\D/g, '') : value;
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    setErrores((prev) => ({ ...prev, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const nuevosErrores = validarFormulario(formData);
    setErrores(nuevosErrores);
    if (Object.keys(nuevosErrores).length > 0) return;

    setNombreConfirmado(formData.nombre.trim());
    setEnviado(true);
  };

  const volverAlFormulario = () => {
    setEnviado(false);
    setFormData(estadoInicial);
    setErrores({});
  };

  if (enviado) {
    return (
      <Alert variant="success" className="border-0">
        <Alert.Heading>¡Mensaje enviado!</Alert.Heading>
        <p className="mb-3">
          Gracias {nombreConfirmado}. Recibimos tu consulta y te responderemos a la brevedad por
          email o teléfono.
        </p>
        <Button variant="outline-accent" size="sm" onClick={volverAlFormulario}>
          Volver al formulario
        </Button>
      </Alert>
    );
  }

  return (
    <Form onSubmit={handleSubmit} noValidate>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Nombre *</Form.Label>
            <Form.Control
              name="nombre"
              value={formData.nombre}
              onChange={handleChange}
              isInvalid={!!errores.nombre}
              placeholder="Ej: Juan"
            />
            <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Apellido</Form.Label>
            <Form.Control
              name="apellido"
              value={formData.apellido}
              onChange={handleChange}
              isInvalid={!!errores.apellido}
              placeholder="Ej: Perez"
            />
            <Form.Control.Feedback type="invalid">{errores.apellido}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Email *</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              isInvalid={!!errores.email}
              placeholder="ejemplo@mail.com"
            />
            <Form.Control.Feedback type="invalid">{errores.email}</Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Teléfono *</Form.Label>
            <Form.Control
              type="tel"
              inputMode="numeric"
              pattern="[0-9]*"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
              isInvalid={!!errores.telefono}
              placeholder="Ej: 1112345678"
            />
            <Form.Control.Feedback type="invalid">{errores.telefono}</Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-4">
        <Form.Label>Mensaje o aclaración (opcional)</Form.Label>
        <Form.Control
          as="textarea"
          rows={4}
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Contanos en qué podemos ayudarte..."
        />
      </Form.Group>

      <Button type="submit" variant="accent" size="lg">
        Enviar consulta
      </Button>
    </Form>
  );
}

export default FormularioContacto;
