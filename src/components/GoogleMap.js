import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';
import Polyline from './Polyline.js'

class GoogleMap extends Component {

    constructor (props, context) {
        super(props, context)
        this.state = ({
            map: null,
            maps: null,
            mapLoaded: false
        })
    }
    

    static defaultProps = {
        center: { lat: 59.95, lng: 30.33 },
        zoom: 11
    };

    render() {
        function _onClick(obj) { console.log(obj.x, obj.y, obj.lat, obj.lng, obj.event); }

        return (
            <div>
                <GoogleMapReact
                    onClick={_onClick}
                    defaultCenter={this.props.center}
                    defaultZoom={this.props.zoom}
                    onGoogleApiLoaded={({ map, maps }) => { this.setState({ map: map, maps:maps, mapLoaded: true }) }}
                    yesIWantToUseGoogleMapApiInternals>
                </GoogleMapReact>
                { this.state.mapLoaded && <Polyline map={this.state.map} maps={this.state.maps} /> }
            </div>


        )
    }
}

export default GoogleMap