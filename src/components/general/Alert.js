import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";

class Alert extends Component {

    render() {
        let alert = this.props.alertReducer;

        return alert.type != null && alert.message != null ?
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

export default connect(mapStateToProps, null)(Alert);