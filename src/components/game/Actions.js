import React, { Component } from 'react';
import bet from '../../images/bet.png';

class Actions extends Component {

    render() {
        return (
            <div id={'actions'}>
                <div className={'action'}>
                    <img src={bet} alt="" />Se coucher
                </div>
                <div className={'action'}>
                    <img src={bet} alt="" />Check / Suivre
                </div>
                <div className={'action'}>
                    <img src={bet} alt="" /> Miser plus
                </div>

                <input type="range"/>
            </div>
        )
    }
}

export default Actions;