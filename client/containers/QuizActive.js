import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  replaceThreeQuestionMarks,
  highlightCode
} from '../helpers';
import {
  fetchQuestions,
  shuffleQuestions,
  resetQuiz,
  setActiveQuestionIndex,
  setVisitedQuestionsIDs,
  setSelectedAnswersIDs,
  setEvaluation,
  fetchResults,
  submitResults,
  openShareModal
} from '../redux/actions/quizActions';
import {
  setSelection,
  setSelectedLessonsIDs
} from '../redux/actions/topicsActions';
import { fetchUser, saveUser } from '../redux/actions/authActions';
import Spinner from '../components/Spinner';
import QuizFinished from '../components/quiz/QuizFinished';

class QuizActive extends React.Component {
  async componentDidMount() {
    const { dispatch, questions, selectedLessonsIDs } = this.props;
    if (questions.length > 0) return;
    await dispatch(fetchQuestions(selectedLessonsIDs));
    await dispatch(shuffleQuestions());
  }

  componentWillUnmount() {
    const { dispatch } = this.props;
    dispatch(resetQuiz());
  }

  backSelection() {
    const { dispatch } = this.props;
    dispatch(setSelection('lessons'));
  }

  closeQuiz() {
    const { dispatch } = this.props;
    dispatch(setSelectedLessonsIDs([]));
    dispatch(setSelection('topics'));
  }

  backQuestion() {
    const { dispatch, activeQuestionIndex } = this.props;
    if (activeQuestionIndex > 0) dispatch(setActiveQuestionIndex(activeQuestionIndex - 1));
  }

  forwardQuestion() {
    const { dispatch, activeQuestionIndex, questions, visitedQuestionsIDs } = this.props;
    if (activeQuestionIndex < questions.length - 1) {
      dispatch(setActiveQuestionIndex(activeQuestionIndex + 1));
      const visited = Object.assign([], visitedQuestionsIDs);
      const index = visited.indexOf(activeQuestionIndex + 1);
      if (index === -1) {
        visited.push(activeQuestionIndex + 1);
      }
      dispatch(setVisitedQuestionsIDs(visited));
    }
  }

  selectAnswers(answerId) {
    const { dispatch, selectedAnswersIDs } = this.props;
    const selected = Object.assign([], selectedAnswersIDs);
    const index = selected.indexOf(answerId);
    if (index === -1) {
      selected.push(answerId);
    } else {
      selected.splice(index, 1);
    }
    dispatch(setSelectedAnswersIDs(selected));
  }

  progressBarNavigate(index) {
    const { dispatch } = this.props;
    dispatch(setActiveQuestionIndex(index));
  }

  evaluate() {
    const { dispatch, questions, selectedAnswersIDs } = this.props;
    dispatch(setEvaluation(true));
    dispatch(fetchResults(questions, selectedAnswersIDs));
    dispatch(setActiveQuestionIndex(0));
  }

  async submit() {
    const { dispatch, questions, selectedAnswersIDs } = this.props;
    await dispatch(submitResults(questions, selectedAnswersIDs));
    const { submitted } = this.props;
    if (submitted) {
      const user = await fetchUser();
      dispatch(saveUser(user));
      dispatch(openShareModal(true));
    }
  }

  showShareModal() {
    const { dispatch } = this.props;
    dispatch(openShareModal(true));
  }

  render() {
    let loading = true;
    if (!this.props.evaluation && this.props.questions.length > 0) loading = false;
    else if (this.props.evaluation && this.props.results.length > 0) loading = false;

    if (loading) return <Spinner />;

    // Selection
    let answersSelection = [];
    let progressBar = [];
    const questions = this.props.questions;
    const activeQuestionIndex = this.props.activeQuestionIndex;
    const visitedQuestionsIDs = this.props.visitedQuestionsIDs;
    const selectedAnswersIDs = this.props.selectedAnswersIDs;

    // Evaluation
    const evaluation = this.props.evaluation;
    const correctQuestionsIDs = this.props.correctQuestionsIDs;
    const correctAnswersIDs = this.props.correctAnswersIDs;
    const incorrectAnswersIDs = this.props.incorrectAnswersIDs;
    const missedAnswersIDs = this.props.missedAnswersIDs;
    const submitted = this.props.submitted;
    const openShareModal = this.props.openShareModal;

    function calculateAnswersClassName(answerID) {
      // Selection
      if (!evaluation && selectedAnswersIDs.includes(answerID)) return ' selection-card-selected ';
      else if (evaluation) {
        // Evaluation
        if (correctAnswersIDs.includes(answerID)) return ' selection-card-correct ';
        else if (incorrectAnswersIDs.includes(answerID)) return ' selection-card-false ';
        else if (missedAnswersIDs.includes(answerID)) return ' selection-card-missed ';
      }
      return '';
    }

    answersSelection = questions[activeQuestionIndex].answers
      .map(answer =>
        <li
          key={answer.id}
          className={' selection-card ' + calculateAnswersClassName(answer.id)}>
          <button
            type="button"
            className="button is-rounded is-warning is-small"
            disabled={evaluation}
            onClick={() => this.selectAnswers(answer.id)}
          >
            {answer.text}
          </button>
        </li>
      );

    function calculateProgressBarQuestionsClassName(questionID, index) {
      if (!evaluation) {
        // Selection
        if (activeQuestionIndex === index) return ' active-question ';
        else if (visitedQuestionsIDs.includes(index)) return ' visited-question ';
        return ' unvisited-question ';
      } else {
        // Evaluation
        if (correctQuestionsIDs.includes(questionID)) {
          if (activeQuestionIndex === index) return ' correct-question-active ';
          return ' correct-question ';
        } else {
          if (activeQuestionIndex === index) return ' incorrect-question-active ';
          return ' incorrect-question ';
        }
      }
    }

    progressBar = questions
      .map((question, index) =>
        <li
          style={{ display: 'inline' }}
          key={index}>
          <button
            type="button"
            disabled={!visitedQuestionsIDs.includes(index) && !evaluation}
            onClick={() => this.progressBarNavigate(index)}
            className={calculateProgressBarQuestionsClassName(question.id, index)}
          ></button>
        </li>
      );

    return (
      <div className="columns">
        <div className="quiz-Active-Container column">
          <div className="field is-grouped">
            <div className="control">
              <button
                type="button"
                className="button is-rounded  is-primary"
                disabled={activeQuestionIndex === 0}
                onClick={() => this.backQuestion()}
              >
                <i className="fa fa-arrow-left" />
              </button>
            </div>

            <div className="question">
              <div
                dangerouslySetInnerHTML={{__html: highlightCode(replaceThreeQuestionMarks(questions[activeQuestionIndex].text))}}
              ></div>

              <div>
                <ul>
                  {answersSelection}
                </ul>
              </div>

              <div className="progress-Bar">
                <div className="question-Num">
                  <div>
                    {activeQuestionIndex + 1} / {questions.length}
                  </div>
                </div>
                <ul>
                  {progressBar}
                </ul>
              </div>
            </div>

            <div className="control">
              <button
                type="button"
                className="button is-rounded is-primary"
                disabled={activeQuestionIndex === questions.length - 1}
                onClick={() => this.forwardQuestion()}
              >
                <i className="fa fa-arrow-right" />
              </button>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button
                type="button"
                className="btn-Back"
                hidden={evaluation}
                disabled={evaluation}
                onClick={() => this.backSelection()}
              >
                Back
              </button>
            </div>

            <div className="control">
              <button
                type="button"
                className="btn-Eval"
                disabled={activeQuestionIndex < questions.length - 1 || evaluation}
                hidden={evaluation}
                onClick={() => this.evaluate()}
              >
                Evaluate
              </button>
            </div>

            <div className="control">
              <button
                type="button"
                className="btn-Close"
                hidden={!evaluation}
                disabled={!evaluation}
                onClick={() => this.closeQuiz()}
              >
                Close
              </button>
            </div>

            <div className="control">
              <button
                type="button"
                className="btn-Sub"
                disabled={!evaluation}
                hidden={!evaluation || submitted}
                onClick={() => this.submit()}
              >
                Submit
              </button>
            </div>

            <div className="control">
              <button
                type="button"
                className="btn-Share"
                disabled={!evaluation || !submitted}
                hidden={!evaluation || !submitted}
                onClick={() => this.showShareModal()}
              >
                Share
              </button>
            </div>
          </div>

          {openShareModal ? <QuizFinished /> : null}
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { selectedLessonsIDs, selection } = state.topics;
  const {
    questions,
    activeQuestionIndex,
    visitedQuestionsIDs,
    selectedAnswersIDs,
    evaluation,
    results,
    correctQuestionsIDs,
    correctAnswersIDs,
    incorrectAnswersIDs,
    missedAnswersIDs,
    submitted,
    openShareModal
  } = state.quiz;
  return {
    selectedLessonsIDs,
    questions,
    activeQuestionIndex,
    visitedQuestionsIDs,
    selectedAnswersIDs,
    selection,
    evaluation,
    results,
    correctQuestionsIDs,
    correctAnswersIDs,
    incorrectAnswersIDs,
    missedAnswersIDs,
    submitted,
    openShareModal
  };
}

QuizActive.propTypes = {
  dispatch: PropTypes.func,
  selectedLessonsIDs: PropTypes.array,
  questions: PropTypes.array,
  activeQuestionIndex: PropTypes.number,
  visitedQuestionsIDs: PropTypes.array,
  selectedAnswersIDs: PropTypes.array,
  selection: PropTypes.string,
  evaluation: PropTypes.bool,
  results: PropTypes.array,
  correctQuestionsIDs: PropTypes.array,
  correctAnswersIDs: PropTypes.array,
  incorrectAnswersIDs: PropTypes.array,
  missedAnswersIDs: PropTypes.array,
  submitted: PropTypes.bool,
  openShareModal: PropTypes.bool
};

export default connect(mapStateToProps)(QuizActive);
