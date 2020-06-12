import React, { useState, useEffect } from 'react';
import './App.css';
import MapChart from '../Map-2D/Map-2D';
import {Container, Row, Col} from 'react-bootstrap';

function App() {

  return (
    <Container className="container">
      <Row className="map2d">
        <Col> <MapChart /> </Col>
      </Row>
    </Container>
  );
}

export default App;
