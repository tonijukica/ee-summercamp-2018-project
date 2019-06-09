import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { AUTH_URL } from '../config';
import { loadState } from '../redux/localStorage';
import { userInLocalStorage, quizInLocalStorage } from '../helpers';
import { fetchUser, setAuthStateFromLocalStorage, saveUser } from '../redux/actions/authActions';
import { setTopicsStateFromLocalStorage } from '../redux/actions/topicsActions';
import { setQuizStateFromLocalStorage } from '../redux/actions/quizActions';

import ResumeForm from '../components/user/ResumeForm';
import LoginForm from '../components/user/LoginForm';
import Spinner from '../components/Spinner';

class Header extends React.Component {
  constructor() {
    super();
    this.state = {
      showResumeForm: false,
      showLoginForm: false
    };
  }

  async componentDidMount() {
    const { dispatch } = this.props;
    const persistedState = loadState();
    const user = await fetchUser();

    if (!user) return dispatch(saveUser(null));
    if (persistedState === undefined) return dispatch(saveUser(user));

    const userMatch = userInLocalStorage(persistedState, user);
    const quizExists = quizInLocalStorage(persistedState);
    if (userMatch === true && quizExists === true) {
      return this.setState({ showResumeForm: true });
    }
    return dispatch(saveUser(user));
  }

  async handleResume() {
    const { dispatch } = this.props;
    const persistedState = loadState();
    await dispatch(setQuizStateFromLocalStorage(persistedState.quiz));
    await dispatch(setTopicsStateFromLocalStorage(persistedState.topics));
    await dispatch(setAuthStateFromLocalStorage(persistedState.auth));
    this.setState({ showResumeForm: false });
  }

  async handleReject() {
    const { dispatch } = this.props;
    const user = await fetchUser();
    dispatch(saveUser(user));
    this.setState({ showResumeForm: false });
  }

  handleShowLoginForm() {
    this.setState({ showLoginForm: !this.state.showLoginForm });
  }

  render() {
    const user = this.props.user;
    let spinner = null;
    let loginButton = null;
    let logoutButton = null;

    if (user === undefined) spinner = <Spinner />;
    else if (!user) {
      loginButton = (
        <a onClick={this.handleShowLoginForm.bind(this)}>
          <button type="button" className="button is-rounded is-warning is-small">Log In</button>
        </a>
      );
    } else {
      logoutButton = (
        <a href={`${AUTH_URL}/logout`}>
          <button type="button" className="button is-rounded is-warning is-small">Log Out</button>
        </a>
      );
    }

    return (
      <header className="headerContainer">
        <h1 className="title has-text-warning">Kviskoteka - one quiz to rule them all</h1>

        {
          this.state.showResumeForm &&
          <ResumeForm
            handleResume={this.handleResume.bind(this)}
            handleReject={this.handleReject.bind(this)}
          />
        }

        <div>
          {spinner}
          {loginButton}
          {logoutButton}
        </div>

        {
          this.state.showLoginForm &&
          <LoginForm
            handleShowLoginForm={this.handleShowLoginForm.bind(this)}
          />
        }
      </header>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return { user };
}

Header.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object
};

export default connect(mapStateToProps)(Header);
