import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import {pushAlert} from "../../actions/alertAction";

class Alert extends Component {

    render() {
        let alert = this.props.alertReducer;

        return alert != null ?
            (
                <div className={ alert.type }>
                    { alert.message }
                </div>
            )
            : null
    }
}

const mapStateToProps = ({ alertReducer }) => {
    return {
        alertReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        pushAlert: (alert) => dispatch(pushAlert(alert))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Alert);