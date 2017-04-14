import React, { Component } from 'react';
import './App.css';
import Header from './components/Header.js'
import InputArea from './components/InputArea.js'
import GoogleMap from './components/GoogleMap.js'

class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      tripIds: {},
      selectedTripId: '',
      snap_points: {},
      original_points: {}
    };
    this.setTripIds = this.setTripIds.bind(this);
    this.setSnapPoint = this.setSnapPoint.bind(this);
    this.getRoute = this.getRoute.bind(this);
  }

  setTripIds(tripIds) {
    this.setState({
      tripIds: tripIds
    })
  }

  setSnapPoint(data){
    this.setState({
      snap_points: data
    })
  }

  componentDidMount() {
    var self = this;
    fetch('https://adani.vahanalytics.com', {
      method: 'post',
      headers: {
        "source": 'dashboard',
        "path": '/api/v2/group/all_trips',
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      body:"group_id=ADA-MUN-ROR-1488018819301&manager_id=57ebb12afd2468914acd95c0&android_id=a495c8341233d5f9&app_version=1"
      // {
      //   "group_id":"ADA-MUN-ROR-1488018819301",
      //   "manager_id":"57ebb12afd2468914acd95c0",
      //   "android_id":"a495c8341233d5f9",
      //   "app_version":"1"
      // }
    }).then(function (data) {
      if (data.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          data.status);
        return;
      }
      // Examine the text in the response  
      data.json().then(function (data) {
        var result=data.body;
        var trips=result.map((trip) => {
          return trip.trip_id;
        });
        self.setTripIds(trips);
      });
    }).catch(function (error) {
        console.log('Request failed', error);
      });
  }

  

  getRoute(tripId) {
    var self = this;
    fetch('https://adani.vahanalytics.com', {
      method: 'post',
      headers: {
        "source": 'dashboard',
        "path": '/api/v1/tracking/snap_points',
        "Content-Type": 'application/x-www-form-urlencoded'
      },
      body:"trip_id="+tripId+"&manager_id=57ebb12afd2468914acd95c0&android_id=a495c8341233d5f9&app_version=1"
    }).then(function (data) {
      if (data.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          data.status);
        return;
      }
      // Examine the text in the response  
      data.json().then(function (data) {
        self.setState({
          snap_points: data
        })
      });
    }).catch(function (error) {
        console.log('Request failed', error);
      });
  }


  render() {
    return (
      <div className="App">
        <Header />
        <InputArea tripIds={this.state.tripIds} getTripRoute={this.getRoute}/>
        <GoogleMap />
      </div>
    );
  }
}

export default App;
