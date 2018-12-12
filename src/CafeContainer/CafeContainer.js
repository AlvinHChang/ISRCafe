import React, {Fragment} from 'react';
import config from '../config';
import './CafeContainer.css';

class CafeContainer extends React.Component{
    refreshInterval = 10;
    constructor(props){
        super(props);
        this.state = {
            cafes: [],
            error: null,
            refreshTime: this.refreshInterval
        }
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
            const cafes = data.cafes;
            this.setState({ cafes });
        } else {
            this.setState({ error });
        }
    };

    tick = () => {
        let refreshTime = this.state.refreshTime - 1;
        if (refreshTime <= 0) {
            refreshTime = this.refreshInterval;
            load(this.onLoad);
        }
        this.setState({refreshTime})

    }
    render() {
        const {cafes, error, refreshTime} = this.state;
        if (error) {
            console.log(error);
        }
        return (
            <Fragment>
                Will refresh in {refreshTime} seconds
                <ul>
                    {cafes.map((cafe) => {
                            const ready = "[READY] " + cafe.drink + " for " + cafe.name;
                            const notReady = "[PENDING] " + cafe.drink + " for " + cafe.name;
                            return(
                                <li key={cafe.time}>
                                    {cafe.isReady? ready: notReady}
                                </li>)
                        }
                    )}
                </ul>
            </Fragment>
        );
    }
}


export function load(callback) {
  window.gapi.client.load("sheets", "v4", () => {
    window.gapi.client.sheets.spreadsheets.values
      .get({
          spreadsheetId: config.spreadsheetId,
          range: "Sheet4!A3:E",
      })
      .then(
        response => {
            console.log(response);
          const data = response.result.values || [];
          const cafes = data.map(cafe => ({
              time: cafe[0],
              name: cafe[1],
              drink: cafe[2],
              isReady: (cafe[3] === 'TRUE'),
              hasReceived: (cafe[4] === 'TRUE'),

          })) || [];
          callback({
            cafes
          });
        },
        response => {
          callback(false, response.result.error);
        }
      );
  });
}

export default CafeContainer;