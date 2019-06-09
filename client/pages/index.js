import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Carousel from '../components/Carousel';
import Credits from '../components/Credits';
import Header from '../containers/Header';
import Results from '../components/quiz/Results';
import Quiz from '../components/quiz/Quiz';

class Index extends React.Component {
  render() {
    return (
      <div className="indexContainer">
        <Header />
        <div className="columns is-marginless">
          <Carousel />
          <Quiz />
          <Results />
        </div>
        <Credits />
      </div>
    );
  }
}

Index.propTypes = {
  dispatch: PropTypes.func
};

export default connect()(Index);
