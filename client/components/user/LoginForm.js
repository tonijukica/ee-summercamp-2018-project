import React from 'react';
import PropTypes from 'prop-types';
import { AUTH_URL } from '../../config';

class LoginForm extends React.Component {
  render() {
    return (
      <div className="login-Form-Container">
        <div className="modal-Log">
          <img src="/static/images/loginPicture.png" width="200" height="200" alt="Riddler" />

          <div className="btn-Log">
            <a href={`${AUTH_URL}/google`}>
              <button type="button" className="button is-rounded is-info">Log In With Google</button>
            </a>
          </div>

          <div className="btn-Log">
            <button
              type="button"
              className="button is-rounded is-link"
              onClick={this.props.handleShowLoginForm}>
              Cancel
            </button>
          </div>
        </div>

        <div
          className="login-Backdrop"
          onClick={this.props.handleShowLoginForm}>
        </div>
      </div>
    );
  }
}

LoginForm.propTypes = {
  handleShowLoginForm: PropTypes.func
};

export default LoginForm;
