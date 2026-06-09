import { useState } from 'react';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { ejecutarValidacionCompra } from '../utils/validacionCompra.js';

const estadoInicial = {
  nombre: '',
  apellido: '',
  email: '',
  telefono: '',
  direccion: '',
  metodoEntrega: 'envio-domicilio',
  mensaje: '',
};

function FormularioCompra({ onConfirmar }) {
  const [formData, setFormData] = useState(estadoInicial);
  const [errores, setErrores] = useState({});

  const validar = () => {
    const { esValido, errores: nuevosErrores } = ejecutarValidacionCompra(formData);
    setErrores(nuevosErrores);
    return esValido;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validar()) return;

    onConfirmar?.(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const sanitizedValue = name === 'telefono' ? value.replace(/\D/g, '') : value;
    setFormData((prev) => ({ ...prev, [name]: sanitizedValue }));
    setErrores((prev) => ({ ...prev, [name]: '' }));
  };

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
            <Form.Label>Apellido *</Form.Label>
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

      <Form.Group className="mb-3">
        <Form.Label>Dirección o localidad *</Form.Label>
        <Form.Control
          name="direccion"
          value={formData.direccion}
          onChange={handleChange}
          isInvalid={!!errores.direccion}
          placeholder="Calle, número, ciudad"
        />
        <Form.Control.Feedback type="invalid">{errores.direccion}</Form.Control.Feedback>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Método de entrega *</Form.Label>
        <Form.Select name="metodoEntrega" value={formData.metodoEntrega} onChange={handleChange}>
          <option value="envio-domicilio">Envío a domicilio</option>
          <option value="retiro-sucursal">Retiro en sucursal</option>
          <option value="correo-argentino">Correo Argentino</option>
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Mensaje o aclaración (opcional)</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          name="mensaje"
          value={formData.mensaje}
          onChange={handleChange}
          placeholder="Horario de entrega, instrucciones especiales..."
        />
      </Form.Group>

      <Button type="submit" variant="accent" size="lg">
        Confirmar compra
      </Button>
    </Form>
  );
}

export default FormularioCompra;
