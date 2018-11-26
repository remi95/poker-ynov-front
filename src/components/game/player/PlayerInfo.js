import React, {Component} from 'react';

class PlayerInfo extends Component {

    addTimer = () => {
        const timer = document.querySelector('.timer');
        timer.classList.remove('active');
        timer.classList.add('active');
    };

    render() {
        return (
            <div className={'player-info text-center ' + (this.props.active ? 'active' : '')}>
                <div className={'username'}>{this.props.username}</div>
                <span className={'money'}>{this.props.money} €</span>
                {
                    this.props.active
                        ?   <div className={'timer-container'}>
                                <div className={'timer'} />
                            </div>
                        : null
                }
            </div>
        )
    }

    componentDidMount() {
        if (this.props.active) {
            this.addTimer()
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.active) {
           this.addTimer()
        }
    }
}

export default PlayerInfo;