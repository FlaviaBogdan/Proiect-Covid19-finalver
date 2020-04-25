import React, { Component } from 'react';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';

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

        return (
            <div>
                <Map
                    style={{ height: "100vh" }}
                    center={position}
                    zoom={this.state.zoom}>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png' />
                    <Marker position={position}>
                        <Popup>
                            <span>A pretty CSS3 popup. <br /> Easily customizable.</span>
                        </Popup>
                    </Marker>
                </Map>

            </div>

        )
    }
}

export default test;