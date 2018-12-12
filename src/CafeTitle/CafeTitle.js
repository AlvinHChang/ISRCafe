import React from 'react';
import PropTypes from 'prop-types';

import QueueAnim from 'rc-queue-anim';
import afroCaleb from '../afrocalebCrop.png';
import './CafeTitle.css';

class CafeTitle extends React.Component {
    render(){
        const {cafes, refreshTime} = this.props;
        return (
            <div className="flex-box">
                <div className="pending">
                    <div className="title">
                    PENDING
                    </div>
                    <QueueAnim>
                        {cafes.map((cafe) => {
                                const pending = cafe.drink + " for " + cafe.name;
                                return(
                                    cafe.isReady? null :
                                        <li key={cafe.time + "pend"}>
                                            {pending}
                                        </li>)
                            }
                        )}
                    </QueueAnim>
                </div>
                <div className="cafe-container">
                    <h1> Welcome to Petrol Cafe </h1>
                    <img src={afroCaleb} className="afro-caleb" alt={"AfroCaleb"}/>
                    Will refresh in {refreshTime} seconds
                </div>
                <div className="ready">
                    <div className="title">
                    READY
                    </div>
                    <QueueAnim>
                        {cafes.map((cafe) => {
                                const ready = cafe.drink + " for " + cafe.name;
                                return(
                                    cafe.isReady?
                                        <li key={cafe.time + "ready"}>
                                            {ready}
                                        </li> : null)
                            }
                        )}
                    </QueueAnim>
                </div>
            </div>)
    }

}
CafeTitle.propTypes = {
    refreshTime: PropTypes.number,
    cafes: PropTypes.object
};

export default CafeTitle;
