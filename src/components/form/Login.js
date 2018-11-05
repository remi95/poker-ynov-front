import React, { Component } from 'react';
import { connect } from "react-redux";
import { getUser } from "../../actions/authAction";

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
        this.props.getUser(e.target.value);
    }

    handleSubmit(e) {
        e.preventDefault();
        console.log(this.props.userReducer.user);
    }

    render() {
        return (
            <form onSubmit={ this.handleSubmit }>
                <input type="text" name="username" onChange={ this.handleChange }/>
            </form>
        )
    }
}

const mapStateToProps = ({ userReducer }) => {
    return {
        userReducer
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (user) => dispatch(getUser(user))
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);