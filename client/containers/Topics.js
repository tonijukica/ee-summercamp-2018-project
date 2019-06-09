import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  fetchTopics,
  setSelection,
  fetchLessons,
  fetchCourses,
  setSelectedLessonsIDs
} from '..//redux/actions/topicsActions';

class Topics extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    await dispatch(fetchTopics());
  }

  async openCurses(topicId) {
    const { dispatch } = this.props;
    await dispatch(fetchCourses(topicId));
    await dispatch(setSelection('courses'));
  }

  async openLessons(courseId) {
    const { dispatch } = this.props;
    await dispatch(fetchLessons(courseId));
    await dispatch(setSelection('lessons'));
  }

  backSelection() {
    const { dispatch, selection } = this.props;
    if (selection === 'courses') dispatch(setSelection('topics'));
    else if (selection === 'lessons') {
      dispatch(setSelection('courses'));
      dispatch(setSelectedLessonsIDs([]));
    }
  }

  selectLessons(lessonId) {
    const { dispatch, selectedLessonsIDs } = this.props;
    const selected = Object.assign([], selectedLessonsIDs);
    const index = selected.indexOf(lessonId);
    if (index === -1) {
      selected.push(lessonId);
    } else {
      selected.splice(index, 1);
    }
    dispatch(setSelectedLessonsIDs(selected));
  }

  async startQuiz() {
    const { dispatch } = this.props;
    await dispatch(setSelection('quiz'));
  }

  render() {
    let selectionCards = [];

    if (this.props.selection === 'topics' && this.props.topics) {
      selectionCards = this.props.topics.map((topic) =>
        <li
          key={topic.id}
          className='selection-card'
          onClick={() => this.openCurses(topic.id)}>
          <button type="button" className="button is-rounded is-warning">{topic.title}</button>
        </li>
      );
    } else if (this.props.selection === 'courses' && this.props.courses) {
      selectionCards = this.props.courses.map((course) =>
        <li
          key={course.id}
          className='selection-card'
          onClick={() => this.openLessons(course.id)}>
          <button type="button" className="button is-rounded is-warning">{course.title}</button>
        </li>
      );
    } else if (this.props.selection === 'lessons' && this.props.lessons) {
      selectionCards = this.props.lessons.map((lesson) =>
        <li
          key={lesson.id}
          className={'selection-card' +
            (
              this.props.selectedLessonsIDs.includes(lesson.id)
                ? ' selection-card-selected'
                : ''
            )
          }
          onClick={() => this.selectLessons(lesson.id)}>
          <button type="button" className="button is-rounded is-warning">{lesson.title}</button>
        </li>
      );
    }

    return (
      <div className="topics-Container">
        <h3 className="title is-1">Select your <span>{this.props.selection.slice(0, -1)}</span></h3>

        {selectionCards.length > 0 ? <ul>{selectionCards}</ul> : null}
        {selectionCards.length === 0 ? <p>Selection is empty</p> : null}

        {
          (this.props.selection === 'courses' ||
            this.props.selection === 'lessons')
            ? (
              <button
                type="button"
                className="button is-rounded is-info is-medium"
                onClick={() => this.backSelection()}
              >Back</button>
            )
            : null
        }

        {
          this.props.selection === 'lessons'
            ? (
              <button
                type="button"
                className="button is-rounded is-link is-medium"
                onClick={() => this.startQuiz()}
                disabled={this.props.selectedLessonsIDs.length === 0}
              >Lets get it on!</button>
            )
            : null
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    topics,
    courses,
    lessons,
    selection,
    selectedLessonsIDs
  } = state.topics;
  return {
    topics,
    courses,
    lessons,
    selection,
    selectedLessonsIDs
  };
}

Topics.propTypes = {
  dispatch: PropTypes.func,
  topics: PropTypes.array,
  courses: PropTypes.array,
  lessons: PropTypes.array,
  selectedLessonsIDs: PropTypes.array,
  selection: PropTypes.string
};

export default connect(mapStateToProps)(Topics);
