import React, { Component } from 'react';
import { connect } from "react-redux";
import logo from "../../logo.png";

class Stats extends Component {

    render() {
        const { username } = this.props.userReducer.user;

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
                            <div className="text-right d-flex align-items-center">Nombre de parties gagnées</div>
                            <div className="text-right d-flex align-items-center">Nombre de manches jouées</div>
                            <div className="text-right d-flex align-items-center">Nombre de manches gagnées</div>
                            <div className="text-right d-flex align-items-center">Argent gagné total</div>
                            <div className="text-right d-flex align-items-center">Plus gros pot remporté</div>
                            <div className="text-right d-flex align-items-center">Meilleur combinaison</div>
                        </div>
                        <div className="column column-50">
                            <div className="stat-result d-flex align-items-center justify-center">12</div>
                            <div className="stat-result d-flex align-items-center justify-center">12</div>
                            <div className="stat-result d-flex align-items-center justify-center">12</div>
                            <div className="stat-result d-flex align-items-center justify-center">12</div>
                            <div className="stat-result d-flex align-items-center justify-center">12</div>
                            <div className="stat-result d-flex align-items-center justify-center">12</div>
                            <div className="stat-result d-flex align-items-center justify-center">12</div>
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