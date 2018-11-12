import React, { Component } from 'react';
import { connect } from "react-redux";

class Stats extends Component {

    render() {
        const { birthdate, username } = this.props.userReducer.user;
        const birthYearDate = birthdate.split('-');
        const now = new Date().getFullYear();

        return (
            <div>

                <div>
                    <div>{ username }</div>
                    <div>{ now - birthYearDate[0] } ans</div>
                </div>

                <h2>Statistiques</h2>
                <div className="stat-content-container">
                    <div className="col col-50">Nombre de parties jouées</div>
                    <div className="col col-50 txt-right">qsdqsd</div>
                </div>
                <div className="stat-content-container">
                    <div className="col col-50">Nombre de parties gagnées</div>
                    <div className="col col-50 txt-right">qsdqsd</div>
                </div>
                <div className="stat-content-container">
                    <div className="col col-50">Nombres de manches jouées</div>
                    <div className="col col-50 txt-right">qsdqsd</div>
                </div>
                <div className="stat-content-container">
                    <div className="col col-50"> Nombre de manches gagnées</div>
                    <div className="col col-50 txt-right">qsdqsd</div>
                </div>
                <div className="stat-content-container">
                    <div className="col col-50">Argent gagné total</div>
                    <div className="col col-50 txt-right">qsdqsd</div>
                </div>
                <div className="stat-content-container">
                    <div className="col col-50">Plus gros pot remporté</div>
                    <div className="col col-50 txt-right">qsdqsd</div>
                </div>
                <div className="stat-content-container">
                    <div className="col col-50">Meilleur combinaison</div>
                    <div className="col col-50 txt-right">qsdqsd</div>
                </div>
                <div className="stat-content-container">
                    <div className="col col-50">Informations du joueur</div>
                    <div className="col col-50 txt-right">qsdqsd</div>
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