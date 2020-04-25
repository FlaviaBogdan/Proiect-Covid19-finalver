import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup, Polygon } from 'react-leaflet';
import data from './dataTimisoara.geojson';


const alcatraz = {
    type: 'FeatureCollection',
    features: [
      {
        type: 'Feature',
        properties: {},
        geometry: {
          type: 'Point',
          coordinates: [-122.42305755615234, 37.82687023785448],
        }
      }
    ]
  };
class test extends Component {
    constructor() {
        super();
        this.state = {
            lat: 44.439663,
            lng: 26.096306,
            zoom: 7
            
        }
    }

    render() {
        const position = [this.state.lat, this.state.lng];
       
        const staticPositions = [[51.505, -0.09], [51.4958128370432, -0.10728836059570314], [51.49602657961649, -0.09956359863281251], [51.49602657961649, -0.59956359863281251]];
        return (
            <div>
                  <GeoJsonCluster data={data} />
                <Map
                    style={{ height: "100vh" }}
                    center={position}
                    zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                     <Polygon positions={staticPositions} color="red" />
                </Map>

            </div>

        )
    }
}
export default test;