import React, { Component } from 'react';
import connect from "react-redux/es/connect/connect";
import {Card} from "../Card";

class Hand extends Component {

    render() {
        const game = this.props.gameReducer;
        const {user} = this.props.userReducer;

        return (
            <div className={'hand d-flex justify-around pos-' + this.props.position}>
                {
                    game.playersCards.length > 0
                        ? game.playersCards.map(player =>
                            player.userId === this.props.player.id
                                ? player.previousDownCards.map(card =>
                                    <Card key={card.rank + card.suit} card={card} />
                                )
                                : null
                        )
                        : this.props.player.id === user.id
                            ?   this.props.gameReducer.hand.map(card =>
                                    <Card key={card.rank + card.suit} card={card} />
                                )
                            :   <div className={'hand d-flex justify-around'}>
                                    <Card hidden={true} />
                                    <Card hidden={true} />
                                </div>
                }
            </div>
        )
    }
}

const mapStateToProps = ({ gameReducer, userReducer }) => {
    return {
        gameReducer, userReducer
    }
};

export default connect(mapStateToProps, null)(Hand);