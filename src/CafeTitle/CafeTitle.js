import React from 'react';
import PropTypes from 'prop-types';

import QueueAnim from 'rc-queue-anim';
import afroCaleb from '../afrocalebCrop.png';
import petrolIcon from '../PetrolIcon.png';
import './CafeTitle.css';

class CafeTitle extends React.Component {
    render(){
        const {orders, refreshTime} = this.props;
        return (
            <div className="flex-box">
                <div className="pending-container">
                    <div className="title">
                    Pending
                    </div>
                    <QueueAnim>
                        {orders.map((cafe) => {
                                const orderItem = cafe.drink;
                                const orderName = cafe.name;
                                return(
                                    cafe.isReady? null :
                                        <li key={cafe.time + "pend"} className="cafe-order pending">
                                            <div className="order-item">
                                                {orderItem}
                                            </div>
                                            <div className="order-name">
                                                {orderName}
                                            </div>
                                        </li>)
                            }
                        )}
                    </QueueAnim>
                </div>
                <div className="cafe-container">
                    <div>
                        <h2 className="welcome">Welcome to </h2>
                        <h1 className="petrol">Petrol Café </h1>
                    </div>
                    <img src={petrolIcon} className="afro-caleb" alt={"AfroCaleb"}/>
                    <div className="timer-container">
                        Drink status will refresh in {refreshTime} seconds
                    </div>
                </div>
                <div className="ready-container">
                    <div className="title">
                    Ready
                    </div>
                    <QueueAnim>
                        {orders.map((cafe) => {
                            const orderItem = cafe.drink;
                            const orderName = cafe.name;
                                return(
                                    cafe.isReady?
                                        <li key={cafe.time + "ready"} className="cafe-order ready">
                                            <div className="order-item">
                                                {orderItem}
                                            </div>
                                            <div className="order-name">
                                                {orderName}
                                            </div>
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
    orders: PropTypes.array
};

export default CafeTitle;
