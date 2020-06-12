import React from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Graticule,
  Line,
  Sphere,
  Marker
} from "react-simple-maps";
import { PatternLines } from "@vx/pattern";
import data from './world-110m.json';
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';

const geoUrl = data;

function generateCircle(deg) {
  if (!deg) return [[-180, 0], [-90, 0], [0, 0], [90, 0], [180, 0]];
  return new Array(361).fill(1).map((d, i) => {
    return [-180 + i, deg];
  });
}

function MapChart() {
    const [markers,setMarkers] = useState([
        {
          markerOffset: 0,
          name: "ISS",
          coordinates: [0,0]
        }
      ]);
/*
      const [issData,setIssData] = useState([
          {
              speed: 0,
              altitude: 0,
              lat: 0,
              long: 0
          }
      ]);
*/
      async function apiCall(){
        const response = await axios.get(`https://sat-track.azurewebsites.net/api/iss`);
        console.log(response.data.data)
        //console.log(`Latitude -> ${response.data.data.Latitude} , Longitude -> ${response.data.data.Longitude}`)
        setMarkers([{
            markerOffset: -15,
            name: "ISS",
            coordinates: [response.data.data.Longitude, response.data.data.Latitude]
          }]);
/*
          setIssData([
              {
                speed: 0,
                altitude: response.data.data["Elevation-m"],
                lat: 0,
                long: 0
              }
          ]);
*/
      }

      useEffect(()=>{
        apiCall();
      },[]);

      useEffect(()=>{  
        const timer = setInterval(()=>{
            apiCall();
        },6000);
        return () => clearInterval(timer);
      },[markers]);


  return (
    <ComposableMap projection="geoEquirectangular" width={980} height={480}>
      <PatternLines
        id="lines"
        height={6}
        width={6}
        stroke="#776865"
        strokeWidth={1}
        background="#F6F0E9"
        orientation={["diagonal"]}
      />
      <Sphere stroke="#DDD" />
      <Graticule stroke="#DDD" />
      <Geographies geography={geoUrl} stroke="#FFF" strokeWidth={0.5}>
        {({ geographies }) =>
          geographies.map(geo => {
            return (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill={"#81c784"}
                onClick={() => console.log(geo.properties.ISO_A3)}
              />
            );
          })
        }
      </Geographies>
      {markers.map(({ name, coordinates, markerOffset }) => (
        <Marker key={name} coordinates={coordinates}>
            {/* <circle r={20} fill="#F00" stroke="#5100ff" strokeWidth={2} /> */}
            <g id="flat" 
            transform="translate(-22,-22)
              scale(0.7 0.7)"
            ><path d="m5 28h2v8h-2z" fill="#32b1cc"/><path d="m15 28h2v8h-2z" fill="#32b1cc"/><path d="m5 31h18v2h-18z" fill="#195c85"/><path d="m23 30h5v4h-5z" fill="#f9bb4b"/><path d="m28 24h8v16h-8z" fill="#4da6ea"/><path d="m24 20h4v4h-4z" fill="#f9bb4b"/><path d="m28 20h8v4h-8z" fill="#4f83d1"/><path d="m30 12h4v8h-4z" fill="#f9bb4b"/><path d="m26 12h4v4h-4z" fill="#4da6ea"/><path d="m31 31h2v2h-2z" fill="#dd3e46"/><path d="m31 27h2v2h-2z" fill="#dd3e46"/><path d="m28 36h8v4h-8z" fill="#4f83d1"/><path d="m3 8h6v4h-6z" fill="#ffd782"/><path d="m3 12h6v4h-6z" fill="#f9bb4b"/><path d="m3 16h6v4h-6z" fill="#ffd782"/><path d="m3 20h6v4h-6z" fill="#f9bb4b"/><path d="m3 24h6v4h-6z" fill="#ffd782"/><path d="m13 8h6v4h-6z" fill="#f9bb4b"/><path d="m13 12h6v4h-6z" fill="#ffd782"/><path d="m13 16h6v4h-6z" fill="#f9bb4b"/><path d="m13 20h6v4h-6z" fill="#ffd782"/><path d="m13 24h6v4h-6z" fill="#f9bb4b"/><path d="m3 36h6v4h-6z" fill="#f9bb4b"/><path d="m3 40h6v4h-6z" fill="#ffd782"/><path d="m3 44h6v4h-6z" fill="#f9bb4b"/><path d="m3 48h6v4h-6z" fill="#ffd782"/><path d="m3 52h6v4h-6z" fill="#f9bb4b"/><path d="m13 36h6v4h-6z" fill="#ffd782"/><path d="m13 40h6v4h-6z" fill="#f9bb4b"/><path d="m13 44h6v4h-6z" fill="#ffd782"/><path d="m13 48h6v4h-6z" fill="#f9bb4b"/><path d="m13 52h6v4h-6z" fill="#ffd782"/><path d="m57 28h2v8h-2z" fill="#32b1cc"/><path d="m47 28h2v8h-2z" fill="#32b1cc"/><path d="m41 31h18v2h-18z" fill="#195c85"/><path d="m36 30h5v4h-5z" fill="#f9bb4b" transform="matrix(-1 0 0 -1 77 64)"/><path d="m36 20h4v4h-4z" fill="#f9bb4b" transform="matrix(-1 0 0 -1 76 44)"/><path d="m34 12h4v4h-4z" fill="#4da6ea" transform="matrix(-1 0 0 -1 72 28)"/><path d="m55 8h6v4h-6z" fill="#ffd782" transform="matrix(-1 0 0 -1 116 20)"/><path d="m55 12h6v4h-6z" fill="#f9bb4b" transform="matrix(-1 0 0 -1 116 28)"/><path d="m55 16h6v4h-6z" fill="#ffd782" transform="matrix(-1 0 0 -1 116 36)"/><path d="m55 20h6v4h-6z" fill="#f9bb4b" transform="matrix(-1 0 0 -1 116 44)"/><path d="m55 24h6v4h-6z" fill="#ffd782" transform="matrix(-1 0 0 -1 116 52)"/><path d="m45 8h6v4h-6z" fill="#f9bb4b" transform="matrix(-1 0 0 -1 96 20)"/><path d="m45 12h6v4h-6z" fill="#ffd782" transform="matrix(-1 0 0 -1 96 28)"/><path d="m45 16h6v4h-6z" fill="#f9bb4b" transform="matrix(-1 0 0 -1 96 36)"/><path d="m45 20h6v4h-6z" fill="#ffd782" transform="matrix(-1 0 0 -1 96 44)"/><path d="m45 24h6v4h-6z" fill="#f9bb4b" transform="matrix(-1 0 0 -1 96 52)"/><path d="m55 36h6v4h-6z" fill="#f9bb4b" transform="matrix(-1 0 0 -1 116 76)"/><path d="m55 40h6v4h-6z" fill="#ffd782" transform="matrix(-1 0 0 -1 116 84)"/><path d="m55 44h6v4h-6z" fill="#f9bb4b" transform="matrix(-1 0 0 -1 116 92)"/><path d="m55 48h6v4h-6z" fill="#ffd782" transform="matrix(-1 0 0 -1 116 100)"/><path d="m55 52h6v4h-6z" fill="#f9bb4b" transform="matrix(-1 0 0 -1 116 108)"/><path d="m45 36h6v4h-6z" fill="#ffd782" transform="matrix(-1 0 0 -1 96 76)"/><path d="m45 40h6v4h-6z" fill="#f9bb4b" transform="matrix(-1 0 0 -1 96 84)"/><path d="m45 44h6v4h-6z" fill="#ffd782" transform="matrix(-1 0 0 -1 96 92)"/><path d="m45 48h6v4h-6z" fill="#f9bb4b" transform="matrix(-1 0 0 -1 96 100)"/><path d="m45 52h6v4h-6z" fill="#ffd782" transform="matrix(-1 0 0 -1 96 108)"/><path d="m30 40h4v4h-4z" fill="#f9bb4b"/><path d="m25 44h14v4h-14z" fill="#4da6ea"/><path d="m30 48h4v4h-4z" fill="#f9bb4b"/></g>
          <text
            textAnchor="middle"
            y={markerOffset}
            style={{ fontFamily: "system-ui", fill: "#000", fontWeight:"bold" }}
          >
            {name}
          </text>
        </Marker>
      ))}
      <Line coordinates={generateCircle(0)} stroke="#F53" strokeWidth={2} />
      <Line
        coordinates={generateCircle(23)}
        stroke="#776865"
        strokeWidth={1}
        strokeDasharray={[5, 5]}
      />
      <Line
        coordinates={generateCircle(-24)}
        stroke="#776865"
        strokeWidth={1}
        strokeDasharray={[5, 5]}
      />
      {/* ISS Orbital Lines */}
      <Line
        from={[2.3522, 48.8566]}
        to={[-74.006, 40.7128]}
        stroke="#8c00ff"
        strokeWidth={4}
      />
    </ComposableMap>
  );
}

export default MapChart;
