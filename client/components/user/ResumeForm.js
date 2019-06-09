import React from 'react';
import PropTypes from 'prop-types';

class ResumeForm extends React.Component {
  render() {
    return (
      <div className="login-Form-Container">
        <div className="modal-Log">
          <h1 className="title is-5">Resume last quiz session?</h1>
          <div className="resume-Form">
            <button type="button" className="button is-rounded is-danger is-small" onClick={this.props.handleReject}>Cancel</button>
            <button type="button" className="button is-rounded is-info is-small" onClick={this.props.handleResume}>Resume</button>
          </div>
        </div>

        <div className="login-Backdrop" />
      </div>
    );
  }
}

ResumeForm.propTypes = {
  handleResume: PropTypes.func,
  handleReject: PropTypes.func
};

export default ResumeForm;
