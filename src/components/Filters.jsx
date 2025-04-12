import React from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const Filters = ({ filters, onFilterChange }) => {
  return (
    <Form className="mb-4">
      <Row>
        <Col md={3}>
          <Form.Group controlId="brand">
            <Form.Label>Brand</Form.Label>
            <Form.Control
              type="text"
              placeholder="e.g. Toyota"
              value={filters.brand}
              onChange={e => onFilterChange('brand', e.target.value)}
            />
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="fuelType">
            <Form.Label>Fuel Type</Form.Label>
            <Form.Control
              as="select"
              value={filters.fuelType}
              onChange={e => onFilterChange('fuelType', e.target.value)}
            >
              <option value="">All</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="price">
            <Form.Label>Price Range</Form.Label>
            <Form.Control
              as="select"
              value={filters.price}
              onChange={e => onFilterChange('price', e.target.value)}
            >
              <option value="">All</option>
              <option value="0-20000">Below $20,000</option>
              <option value="20000-40000">$20,000 - $40,000</option>
              <option value="40000-100000">Above $40,000</option>
            </Form.Control>
          </Form.Group>
        </Col>
        <Col md={3}>
          <Form.Group controlId="sort">
            <Form.Label>Sort by Price</Form.Label>
            <Form.Control
              as="select"
              value={filters.sort}
              onChange={e => onFilterChange('sort', e.target.value)}
            >
              <option value="">None</option>
              <option value="asc">Low to High</option>
              <option value="desc">High to Low</option>
            </Form.Control>
          </Form.Group>
        </Col>
      </Row>
    </Form>
  );
};

export default Filters;
