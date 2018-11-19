import React, { Component } from 'react';

class Actions extends Component {

    render() {
        return (
            <div>
                Actions

                <button onClick={ this.props.fold }>Se coucher</button>
                <button>Check / suivre</button>
                <button>Miser plus</button>

                <input type="range"/>
            </div>
        )
    }
}

export default Actions;