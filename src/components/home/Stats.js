import React, { Component } from 'react';
import { connect } from "react-redux";
import {logoutAndRedirect} from "../../actions/authAction";

class Stats extends Component {

    render() {
        const { birthdate, username } = this.props.userReducer.user;
        const birthYearDate = birthdate.split('-');
        const now = new Date().getFullYear();

        return (
            <div className="container modal-content-container">

                <div className="stat-user-info-container">
                    <div>{ username }</div>
                    <div>{ now - birthYearDate[0] } ans</div>
                    <div><button onClick={ this.props.logout }>Déconnexion</button></div>
                </div>

                <h2>Statistiques</h2>
                <div className="stat-container">
                    <div className="row">
                        <div className="column column-50">Nombre de parties jouées</div>
                        <div className="column column-50 txt-right">
                            <span className="stat-result">5</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column column-50">Nombre de parties gagnées</div>
                        <div className="column column-50 txt-right">
                            <span className="stat-result">2</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column column-50">Nombres de manches jouées</div>
                        <div className="column column-50 txt-right">
                            <span className="stat-result">2</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column column-50"> Nombre de manches gagnées</div>
                        <div className="column column-50 txt-right">
                            <span className="stat-result">8</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column column-50">Argent gagné total</div>
                        <div className="column column-50 txt-right">
                            <span className="stat-result">12 000</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column column-50">Plus gros pot remporté</div>
                        <div className="column column-50 txt-right">
                            <span className="stat-result">3500</span>
                        </div>
                    </div>
                    <div className="row">
                        <div className="column column-50">Meilleur combinaison</div>
                        <div className="column column-50 txt-right">
                            <span className="stat-result">Double pair</span>
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

const mapDispatchToProps = (dispatch) => {
    return {
        logout: (alert) => dispatch(logoutAndRedirect(alert))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Stats);