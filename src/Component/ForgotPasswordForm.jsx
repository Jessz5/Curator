import "../App.css";
import "../Darkpages.css";
import React from "react";

class ForgotPasswordForm extends React.Component {
    state = {}

    render() {
        return(
            <form onSubmit={this.submitHandler} className="fPasswordForm">
            <label className="fPasswordLabel">
              Enter your email address and we'll send you a recovery link:
              <br />
            </label>
            <input type="text" email="email"></input>
            </form>
        );
    }
}

export default ForgotPasswordForm;