import React, { Component } from 'react'
import Loader from 'react-loader-spinner'
import {
  FeatureGroup,
  Map,
  Popup,
  TileLayer,
  Polygon,
  Tooltip,
  flyTo
} from 'react-leaflet'
import { Typography } from '@material-ui/core';
import Legend from './Legend';
import DiscreteSlider from './Slider';

const API = 'https://api-covid.victorbarbat.com/';


export default class OtherLayersExample extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lat: 46.0,
            lng: 25.096306,
            zoom: 7,
            draggable: false,
            day: props.day,
            dataRomania: undefined,
            dataCounties: [],
            knownCounties: [],
            loadingCounties: []
        };
    }

    componentDidMount() {
      fetch(API + 'romania')
      .then(response => response.json())
      .then(data => {
        this.setState({ dataRomania: data })
      }); 
  }

    static getDerivedStateFromProps(props, state) {
      if (props.day !== state.day) {
        return {
          day: props.day
        }
      }
      return null;
    }

    map;
    actualCountySelected = undefined;
    getRandomColor = () => {
        const c0 = '#980230';
        const c1 = '#AF0238'
        const c2 = '#F17481';
        const c3 = '#D50747';
        const random = (Math.random() * 4);
        
        switch(Math.floor(random)){
          case 0: 
            return c0;
          case 1: 
            return c1;
          case 2:
            return c2;
          case 3: 
            return c3;
        }
    }
    
    fetchCounty = (countyName) => {
        fetch(API + 'romania/' + countyName)
        .then(response => response.json())
        .then(data => {
          this.setState(prevState => ({
              dataCounties: [...prevState.dataCounties, data],
              loadingCounties: [...prevState.loadingCounties, data.name]
          }));
        }
        )
    };

    countyUnknow = (countyName) => {
        if(this.state.knownCounties.find(element => element === countyName)){
          return false;
        }
          this.state.knownCounties.push(countyName);
          return true;      
    };

    getMapZoom = () => {
      return this.map && this.map.leafletElement.getZoom();
    }

    enableDragging = () => {
      if (this.getMapZoom() < 8) {
        this.setState({
          draggable: false,
        });
        return;
    }
    this.setState({draggable: true});
    }

    setZoomPosition = () => {
      
          const position = [this.state.lat, this.state.lng];
          this.map.leafletElement.flyTo(position, 7)
    }
  
    handleZoom = () => {
      this.enableDragging();
    };

    mouseOver = (countyName) => {
      this.actualCountySelected = countyName;
    };

    findCounty = (countyName) => {
       return this.state.dataRomania.findIndex(county => {
          return county.name === countyName;
        });
    };

    getRegion = (countyName) => {
        return this.state.dataCounties.findIndex(county => {
          return county.name === countyName;
        })
        
    };

    countyIsLoaded = () => {
      return this.state.loadingCounties.findIndex(county => {
          return county === this.actualCountySelected;
      });
    };

    handleCountyClicked = (countyName) => {
        if(this.getMapZoom() > 8) {
            this.actualCountySelected = countyName;
            this.forceUpdate();
        }
    };

  render() {
    
    if(this.state.dataRomania) {
    const position = [this.state.lat, this.state.lng];
    let arrCities = [];
    let arrCityNames = [];
    if ((this.getMapZoom() > 8)) {
      if(this.countyUnknow(this.actualCountySelected)) {    
         this.fetchCounty(this.actualCountySelected);
      }
      
      if(this.state.dataCounties[this.getRegion(this.actualCountySelected)]){
  
        for(let city in this.state.dataCounties[this.getRegion(this.actualCountySelected)].cities) {
          let item = this.state.dataCounties[this.getRegion(this.actualCountySelected)].cities[city];
          arrCities.push(item);
          arrCityNames.push(city);
        }
    }

    }
        return (
          <div>

            <Legend></Legend>
            <DiscreteSlider></DiscreteSlider>
  <Map style={{ height: "91vh", marginTop: "64px" }}
        ref = {(ref) => {this.map = ref}}
      center={position}
      zoom={this.state.zoom}
      dragging={this.state.draggable}
      minZoom={7}
      maxZoom={10}
      onzoomend={this.handleZoom}
      >>
          {
            this.getMapZoom() > 8 
            ?
              this.countyIsLoaded() <= -1 ? 
              <Polygon
              positions={this.state.dataRomania[this.findCounty(this.actualCountySelected)].geometry.coordinates}
              color={'white'}
              >
                  <Tooltip direction={"center"} permanent>
                      <center>
                      <Loader
                          type="Circles"
                          color="#000"
                          height={25}
                          width={25}
                          timeout={10000}
                      />
                      </center>
                    </Tooltip>
              </Polygon> 
              :
              arrCities.map((city, i ) => {
                let randomColor = this.getRandomColor()
                return <Polygon
                key={i}
                positions={city.geometry.coordinates}
                color={randomColor}
                fillColor = {randomColor}
                fillOpacity = '0.5'
                >
                  <Tooltip>
                    {city.natLevName}: {arrCityNames[i]}
                    <br/>
                    Populatie: {city.population}
                  </Tooltip>
                </Polygon>
            })
          :
          null
          }

          {
            this.state.dataRomania.map((county, i ) => {
              let  randomFillColor = this.countyIsLoaded() <= -1 || this.getMapZoom() < 9 ? this.getRandomColor() : 'white';
              return <Polygon
               key={i}
               positions={county.geometry.coordinates}
               color= {'white'}
               fillColor = {randomFillColor}
               fillOpacity= "0.9"
               onmouseover = {() => this.mouseOver(county.name)}
               onClick={() => this.handleCountyClicked(county.name)}
              >
                  <Tooltip>
                   Judet: {county.name}
                   <br/>
                    Populatie: {county.population}
                  </Tooltip>
              </Polygon>
            })
          }
              
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}"
        />
        <FeatureGroup color="purple">
          <Popup>Popup in FeatureGroup</Popup>
        </FeatureGroup>
      </Map>
      <button className='center-map'
              onClick={this.setZoomPosition}>
        Centreaza harta
      </button>
      </div>
    )
  }
  return (
      <div style={{ position: 'relative'}}>
        <div style={{ position: 'absolute', marginTop: '25%',  marginLeft: '50%',  transform: 'translate(-50%, -50%)'}}>
        <center>
          <Typography variant='h4'>Se incarca harta</Typography>
         
          <Loader style={{marginTop:'10px'}}
              type="Grid"
              color="#000"
              height={100}
              width={100}
              timeout={10000}
          />
          </center>
          </div>
      </div>
  )
  } 

}