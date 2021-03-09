import "../App.css";
import "../darkpages.css";
import React from "react";

class ForgotPasswordForm extends React.Component {
    state = {}

    render() {
        return(
                <form onSubmit={this.submitHandler} className="fPasswordForm">
                <input className="fPasswordInput" type="text" email="email" placeholder="example@email.com"></input>
                </form>
        );
    }
}

export default ForgotPasswordForm;