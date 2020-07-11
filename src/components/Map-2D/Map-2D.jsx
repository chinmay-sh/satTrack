import React from "react";
import './Map-2D.css';
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
import colors from './colors.json';

const geoUrl = data;
const lineClrs = colors;

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

    const [orbitArray,setOrbitArray] = useState([]);

    const [nameArray,setNameArray] = useState([]);

    const [wer,setWer] = useState([]);

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

      async function orbitApiCall(){
        //const res = await axios.get(`http://ec2-3-6-69-206.ap-south-1.compute.amazonaws.com:4243/api/orbitOverlap`);
        const res = await axios.get(`https://sat-track.azurewebsites.net/api/orbitOverlap`);
        const dataArray = res.data.data;
        const reqArray = [];
        const Satname = [];
        for (let i = 0; i < dataArray.length; i++) {
          let x = {"number": dataArray[i].number, "orbitalData": dataArray[i].orbitalData};
          let y = {"number": dataArray[i].number, "name": dataArray[i].name};
          reqArray.push(x);
          Satname.push(y);
        }
        setWer(reqArray);
        setNameArray(Satname);
      }

      async function apiCall(){
        const response = await axios.get(`https://sat-track.azurewebsites.net/api/iss`);
        // console.log(response.data.data)
        //console.log(`Latitude -> ${response.data.data.Latitude} , Longitude -> ${response.data.data.Longitude}`)
        setMarkers([{
            markerOffset: -30,
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

      function handlechange(satnumber,wer) {
        //console.log("changed",satnumber);
        const g = [];
        //console.log(g);
        for (let i = 0; i < wer.length; i++){
          if(wer[i].number === satnumber){
            wer[i] = {"number": wer[i].number, "orbitalData": wer[i].orbitalData, "orbitcolor":lineClrs.colors[i]}
            g.push(wer[i]);
            console.log(g);
          }
        }
        setOrbitArray(orbitArray.concat(g[0]));
        //console.log(orbitArray);     
      }

      useEffect(()=>{
        orbitApiCall();
        apiCall();
      },[]);

      useEffect(()=>{  
        const timer = setInterval(()=>{
            apiCall();
        },6000);
        return () => clearInterval(timer);
      },[markers]);


  return (
    <div>
    
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
              scale(0.09 0.09)"
            >
              <path d="m120 32v146c0 8.837-7.163 16-16 16h-72c-8.837 0-16-7.163-16-16v-146c0-8.837 7.163-16 16-16h72c8.837 0 16 7.163 16 16z"/><path d="m480 318v146c0 8.837-7.163 16-16 16h-72c-8.837 0-16-7.163-16-16v-146c0-8.837 7.163-16 16-16h72c8.837 0 16 7.163 16 16z"/><path d="m480 32v146c0 8.837-7.163 16-16 16h-72c-8.837 0-16-7.163-16-16v-146c0-8.837 7.163-16 16-16h72c8.837 0 16 7.163 16 16z"/><path d="m120 318v146c0 8.837-7.163 16-16 16h-72c-8.837 0-16-7.163-16-16v-146c0-8.837 7.163-16 16-16h72c8.837 0 16 7.163 16 16z"/><path d="m312 432v32c0 8.837-7.163 16-16 16h-96c-8.837 0-16-7.163-16-16v-32c0-8.837 7.163-16 16-16h96c8.837 0 16 7.163 16 16z" fill="#e8f8fc"/><path d="m312 32v32c0 8.837-7.163 16-16 16h-96c-8.837 0-16-7.163-16-16v-32c0-8.837 7.163-16 16-16h96c8.837 0 16 7.163 16 16z" fill="#e8f8fc"/><path d="m296.248 32h-76.248c-8.837 0-16 7.163-16 16v16.084c0 12.914-20 13.852-20-.084v-32c0-8.837 7.163-16 16-16 101.804 0 96.209-.015 96.94.027 10.199.591 9.524 15.973-.692 15.973z" fill="#f1fafc"/><path d="m296.248 432h-76.248c-8.837 0-16 7.163-16 16v16.084c0 12.914-20 13.852-20-.084v-32c0-8.837 7.163-16 16-16 101.804 0 96.209-.015 96.94.027 10.199.591 9.524 15.973-.692 15.973z" fill="#f1fafc"/><path d="m296 368h-96c-8.837 0-16-7.163-16-16v-208c0-8.837 7.163-16 16-16h96c8.837 0 16 7.163 16 16v208c0 8.837-7.163 16-16 16z" fill="#e8f8fc"/><path d="m248 280c-17.645 0-32-14.355-32-32s14.355-32 32-32 32 14.355 32 32-14.355 32-32 32z" fill="#75f6fc"/><path d="m257.886 231.622c-13.154 2.325-23.953 13.056-26.286 26.223-1.259 7.106-11.139 7.971-13.636 1.2-9.434-25.582 15.718-50.487 41.134-41.062 6.772 2.511 5.9 12.381-1.212 13.639z" fill="#aefcfc"/><path d="m36.652 194h-4.652c-8.837 0-16-7.163-16-16v-146c0-8.837 7.163-16 16-16h4.724c7.987 0 15.276 6.226 15.276 16 0 .211-.001 146.053.002 146.264.119 8.631-6.718 15.736-15.35 15.736z" fill="#4d4e59"/><path d="m36.652 480h-4.652c-8.837 0-16-7.163-16-16v-146c0-8.837 7.163-16 16-16h4.724c7.987 0 15.276 6.226 15.276 16 0 .211-.001 146.053.002 146.264.119 8.631-6.718 15.736-15.35 15.736z" fill="#4d4e59"/><path d="m396.652 194h-4.652c-8.837 0-16-7.163-16-16v-146c0-8.837 7.163-16 16-16h4.724c7.987 0 15.276 6.226 15.276 16 0 .211-.001 146.053.002 146.264.119 8.631-6.718 15.736-15.35 15.736z" fill="#4d4e59"/><path d="m396.652 480h-4.652c-8.837 0-16-7.163-16-16v-146c0-8.837 7.163-16 16-16h4.724c7.988 0 15.276 6.226 15.276 16 0 .211-.001 146.053.002 146.264.119 8.631-6.718 15.736-15.35 15.736z" fill="#4d4e59"/><path d="m304.929 130.721c7.691 5.182 3.775 17.279-5.499 17.279h-80.43c-8.837 0-16 7.163-16 16v188.13c0 12.078-18.19 12.967-18.967.914-.052-.809-.033-209.855-.033-209.044 0-8.837 7.163-16 16-16h96c3.307 0 6.379 1.003 8.929 2.721z" fill="#f1fafc"/><path d="m280 248c0 17.645-14.355 32-32 32s-32-14.355-32-32 14.355-32 32-32 32 14.355 32 32zm164 38h36c8.836 0 16 7.164 16 16v178c0 8.836-7.164 16-16 16h-104c-8.836 0-16-7.164-16-16v-178c0-8.836 7.164-16 16-16h36v-22h-84v104c0 8.836-7.164 16-16 16h-48v16h48c8.836 0 16 7.164 16 16v64c0 8.836-7.164 16-16 16h-128c-8.836 0-16-7.164-16-16v-64c0-8.836 7.164-16 16-16h48v-16h-48c-8.836 0-16-7.164-16-16v-104h-84v22h36c8.836 0 16 7.164 16 16v178c0 8.836-7.164 16-16 16h-104c-8.836 0-16-7.164-16-16v-178c0-8.836 7.164-16 16-16h36v-76h-36c-8.836 0-16-7.164-16-16v-178c0-8.836 7.164-16 16-16h104c8.836 0 16 7.164 16 16v178c0 8.836-7.164 16-16 16h-36v22h84v-104c0-8.836 7.164-16 16-16h48v-16h-48c-8.836 0-16-7.164-16-16v-64c0-8.836 7.164-16 16-16h128c8.836 0 16 7.164 16 16v64c0 8.836-7.164 16-16 16h-48v16h48c8.836 0 16 7.164 16 16v104h84v-22h-36c-8.836 0-16-7.164-16-16v-178c0-8.836 7.164-16 16-16h104c8.836 0 16 7.164 16 16v178c0 8.836-7.164 16-16 16h-36zm-52-108h72v-146h-72zm-192-114h96v-32h-96zm-168 114h72v-146h-72zm72 140h-72v146h72zm192 114h-96v32h96zm0-288h-96v208h96zm168 174h-72v146h72z"/>
            </g>
          
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
      {/* Current orbit */}
      {orbitArray.map((eachOrbitalArray) => (
        <Line
        coordinates={eachOrbitalArray.orbitalData.slice(0,900)}
        stroke={eachOrbitalArray.orbitcolor}
        strokeWidth={4}
      />
      ))}
    </ComposableMap>
    
    <h1>Check Boxes for orbits of respective stations</h1>
    
    <div className="checkcontainer">
      {nameArray.map((eachname) => (
         <div className="child">
          <input type="checkbox" onChange={() =>{handlechange(eachname.number,wer)}}/>
          <p><h1>{eachname.name}</h1></p>
         </div>
        ))}
    </div>

    </div>
  );
}

export default MapChart;
