import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  FacebookShareButton,
  FacebookIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon
} from 'react-share';

import { APP_URL } from '../../config';
import { openShareModal } from '../../redux/actions/quizActions';

class QuizFinished extends React.Component {
  backSelection() {
    const { dispatch } = this.props;
    dispatch(openShareModal(false));
  }

  render() {
    const user = this.props.user;
    const correctQuestions = this.props.correctQuestionsIDs.length;
    const totalQuestions = this.props.questions.length;
    const correctAnswers = this.props.correctAnswersIDs.length;
    const incorrectAnswers = this.props.incorrectAnswersIDs.length;
    const missedAnswers = this.props.missedAnswersIDs.length;
    const score = this.props.score;
    const totalScore = user.totalScore;

    return (
      <div className="quiz-Finished-Container">
        <div className="modal-Log">
          <div>
            Congratulations, you earned {score} points!
          </div>

          <div>
            <p>Correct questions: {correctQuestions} / {totalQuestions}</p>
            <p>Correct answers: {correctAnswers}</p>
            <p>Incorrect answers: {incorrectAnswers}</p>
            <p>Missed answers: {missedAnswers}</p>
          </div>

          <div>
            Your score is: {totalScore}!
          </div>

          <div className="share-results">
            Share on:
            <div className="field is-grouped">
              <div className="control">
                <FacebookShareButton url={APP_URL} quote={`My score is ${totalScore}, come play with me!`}>
                  <FacebookIcon size={40} round />
                </FacebookShareButton>
              </div>

              <div className="control">
                <LinkedinShareButton url={APP_URL} title={`My score is ${totalScore}, come play with me!`}>
                  <LinkedinIcon size={40} round />
                </LinkedinShareButton>
              </div>

              <div className="control">
                <RedditShareButton url={APP_URL} title={`My score is ${totalScore}, come play with me!`}>
                  <RedditIcon size={40} round />
                </RedditShareButton>
              </div>
            </div>
          </div>

          <a className="btn-close">
            <button
              type="button"
              className="button is-rounded is-danger"
              onClick={() => this.backSelection()}
            >
              Close
            </button>
          </a>
        </div>

        <div className="login-Backdrop" />
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  const {
    questions,
    correctQuestionsIDs,
    correctAnswersIDs,
    incorrectAnswersIDs,
    missedAnswersIDs,
    score
  } = state.quiz;
  return {
    user,
    questions,
    correctQuestionsIDs,
    correctAnswersIDs,
    incorrectAnswersIDs,
    missedAnswersIDs,
    score
  };
}

QuizFinished.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object,
  questions: PropTypes.array,
  correctQuestionsIDs: PropTypes.array,
  correctAnswersIDs: PropTypes.array,
  incorrectAnswersIDs: PropTypes.array,
  missedAnswersIDs: PropTypes.array,
  score: PropTypes.number
};

export default connect(mapStateToProps)(QuizFinished);
