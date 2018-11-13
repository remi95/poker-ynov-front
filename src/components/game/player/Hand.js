import React, { Component } from 'react';
import {checkUser} from "../../../actions/authAction";
import {pushAlert} from "../../../actions/alertAction";
import connect from "react-redux/es/connect/connect";
import {Card} from "../Card";

class Hand extends Component {

    render() {
        return (
            <div>
                {
                    this.props.gameReducer.hand.map(card =>
                        <Card key={card.value + card.color} card={card} />
                    )
                }
            </div>
        )
    }
}

const mapStateToProps = ({ gameReducer }) => {
    return {
        gameReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        login: (user) => dispatch(checkUser(user)),
        alert: (alert) => dispatch(pushAlert(alert))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Hand);