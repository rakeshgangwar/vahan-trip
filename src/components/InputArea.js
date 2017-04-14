import React, { Component } from 'react'

class InputArea extends Component {

    constructor (props, context) {
        super(props, context)
        this.fetchRoute = this.fetchRoute.bind(this);
    }
    

    listTrips() {
        let items = [];
        var trips = this.props.tripIds;
        if (trips.constructor === Array) {
            trips.map((trip) => {
                items.push(<option key={trip} value={trip}>{trip}</option>);
                return null;
            })
        }
        return items;
    }

    fetchRoute(e) {
        var selectedTrip=e.target.value;
        this.props.getTripRoute(selectedTrip);
    }

    render() {
        return (
            <div>
                <select ref="tripId" type="select" onChange={this.fetchRoute}>
                    {this.listTrips()}
                </select>
            </div>
        )
    }
}

export default InputArea