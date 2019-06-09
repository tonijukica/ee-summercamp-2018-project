import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Topics from '../../containers/Topics';
import QuizActive from '../../containers/QuizActive';

class Quiz extends React.Component {
  render() {
    const user = this.props.user;

    if (!user) {
      return (
        <div className="column is-half is-uppercase is-italic has-text-weight-bold">You have to log in to play!</div>
      );
    }

    return (
      <div className="quiz-Container column is-half">
        {this.props.selection !== 'quiz' ? <Topics /> : null}

        {this.props.selection === 'quiz' ? <QuizActive /> : null}
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const { selection } = state.topics;
  return { user, selection };
}

Quiz.propTypes = {
  user: PropTypes.object,
  selection: PropTypes.string
};

export default connect(mapStateToProps)(Quiz);
