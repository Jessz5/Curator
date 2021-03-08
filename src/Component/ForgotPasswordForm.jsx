import "../App.css";
import "../darkpages.css";
import React from "react";

class ForgotPasswordForm extends React.Component {
    state = {}

    render() {
        return(
            <div className="fPasswordDiv">
                <form onSubmit={this.submitHandler} className="fPasswordForm">
                <input className="fPasswordInput" type="text" email="email"></input>
                </form>
            </div>
        );
    }
}

export default ForgotPasswordForm;