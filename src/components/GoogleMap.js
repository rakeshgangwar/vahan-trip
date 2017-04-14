import React, { Component } from 'react'
import GoogleMapReact from 'google-map-react';

class GoogleMap extends Component {

    static defaultProps = {
        center: { lat: 59.95, lng: 30.33 },
        zoom: 11,
        apiKey: 'AIzaSyBKazAyYLQ1WG6SOW4GpCPvA8D2X-QwQPw'
    };

    render() {
        return (
            <GoogleMapReact
                defaultCenter={this.props.center}
                defaultZoom={this.props.zoom}
            />
        )
    }
}

export default GoogleMap