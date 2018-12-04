import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from "../../logo.png";
import client from '../../clients/apiClient';
import Cookies from "js-cookie";

class Stats extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerStat: {}
        };
    }

    async getStat() {
        const user = this.props.userReducer.user;
        try {
            const playerStat = await client.get(`stat/${user.id}`, Cookies.get('user-token'));
            this.setState({
                playerStat
            });
            console.log(this.state.playerStat)
        }
        catch (e) {
            console.error(e)
        }
    }

    async componentDidMount() {
        await this.getStat();
    }


    render() {
        const { username } = this.props.userReducer.user;
        const { playerStat } = this.state;

        return (
            <div className="container modal-content-container">
                <div className="stat-title-container">
                    <img src={logo} alt="logo poker ynov"/>
                    <h2 className="text-center">Statistiques de { username }</h2>
                </div>

                <div className="stat-container">
                    <div className="row">
                        <div className="column column-50 _left">
                            <div className="text-right d-flex align-items-center">Nombre de parties jouées</div>
                            <div className="text-right d-flex align-items-center">Nombre de manches jouées</div>
                            <div className="text-right d-flex align-items-center">Nombre de manches gagnées</div>
                            <div className="text-right d-flex align-items-center">Argent total gagné</div>
                            <div className="text-right d-flex align-items-center">Plus gros pot remporté</div>
                        </div>
                        <div className="column column-50">
                            <div className="stat-result d-flex align-items-center justify-center">{ playerStat.nbGamePlayed }</div>
                            <div className="stat-result d-flex align-items-center justify-center">{ playerStat.nbRoundPlayed }</div>
                            <div className="stat-result d-flex align-items-center justify-center">{ playerStat.nbRoundWon }</div>
                            <div className="stat-result d-flex align-items-center justify-center">{ playerStat.totalMoneyWon }</div>
                            <div className="stat-result d-flex align-items-center justify-center">{ playerStat.biggestPotWon }</div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({  userReducer}) => {
    return {
        userReducer
    }
};

export default connect(mapStateToProps, null)(Stats);