import './App.css';
import MapChart from '../Map-2D/Map-2D';
import {Container, Row, Col} from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import LoadingScreen from 'react-loading-screen';
import logo from '../../logo.svg';


function App() {
  const [loadingStatus,setLoadingStatus] = useState(true);

  useEffect(()=>{
    const timer = setInterval(()=>{
      setLoadingStatus(false)
  },2500);
  return () => clearInterval(timer);
  },[])

  return (
    <LoadingScreen
    loading={loadingStatus}
    bgColor='#f1f1f1'
    spinnerColor='#9ee5f8'
    textColor='#676767'
    logoSrc={logo}
    text='Loading ISS since Epoch!'
  >
    <Container className="container">
      <Row className="map2d">
        <Col>ISS Tracking</Col>
        <Col> <MapChart /> </Col>
      </Row>
      <Row>{/*
        <Col>
          <table>
            <tbody>
              <tr>
                <th>Speed</th>
                <th>Altitude</th>
                <th>Latitude</th>
                <th>Longitude</th>
              </tr>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
      </Col>*/}
      </Row>
    </Container>
  </LoadingScreen>
    
  );
}

export default App;
