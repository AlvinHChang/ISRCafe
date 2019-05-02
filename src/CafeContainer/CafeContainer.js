import React from 'react';
import config from '../config';
import CafeTitle from '../CafeTitle/CafeTitle';

class CafeContainer extends React.Component{
    refreshInterval = 8;
    constructor(props){
        super(props);
        this.state = {
            orders: [],
            error: null,
            refreshTime: this.refreshInterval
        };
        this.intervalHandle = setInterval(this.tick, 1000);
    }
    componentDidMount() {
        // 1. Load the JavaScript client library.
        window.gapi.load("client", this.initClient);
    }
    initClient = () => {
        // 2. Initialize the JavaScript client library.
        window.gapi.client
            .init({
                apiKey: config.apiKey,
                // Your API key will be automatically added to the Discovery Document URLs.
                discoveryDocs: config.discoveryDocs
            })
            .then(() => {
                // 3. Initialize and make the API request.
                load(this.onLoad);
            });
    };
    onLoad = (data, error) => {
        if (data) {
            const orders = data.orders;
            this.setState({ orders });
        } else {
            this.setState({ error });
        }
    };

    tick = () => {
        // runs every time a tick is called
        let refreshTime = this.state.refreshTime - 1;
        if (refreshTime <= 0) {
            refreshTime = this.refreshInterval;
            load(this.onLoad);
        }
        this.setState({refreshTime})

    };
    render() {
        const {error, orders, refreshTime} = this.state;
        if (error) {
            console.log(error);
        }
        return (
            <CafeTitle orders={orders} refreshTime={refreshTime} />
        );
    }
}


export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
          spreadsheetId: config.spreadsheetId,
          // Modify according to correct sheet information
          range: "Sheet4!A3:E",
      })
      .then(
        response => {
            console.log(response);
          const data = response.result.values || [];
          const orders = data.map(order => ({
              time: order[0],
              name: order[1],
              drink: order[2],
              isReady: (order[3] === 'TRUE'),
              hasReceived: (order[4] === 'TRUE'),

          })) || [];
          callback({
            orders
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}

export default CafeContainer;