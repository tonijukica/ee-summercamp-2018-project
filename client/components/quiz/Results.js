import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchTopScores } from '../../redux/actions/quizActions';

class Results extends React.Component {
  constructor() {
    super();
    this.state = { topScores: [] };
  }

  async componentDidMount() {
    const topScores = await fetchTopScores();
    this.setState({ topScores });
  }

  render() {
    const user = this.props.user;
    let showUserTotalScore;

    if (user) showUserTotalScore = <h4>Your score: {user.totalScore}</h4>;

    const ladder = this.state.topScores
      .map(score =>
        <tr key={score.username}>
          <td>{score.username}</td>
          <td>{score.total_score}</td>
        </tr>
      );

    return (
      <div className="results-Container column">

        <div className="results">

          {showUserTotalScore}

          <h4 className="title is-5">Top scores:</h4>

          <table className="table is-hoverable is-fullwidth is-bordered">
            <tbody>
              <tr>
                <th>UserName</th>
                <th>Score</th>
              </tr>
              {ladder}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { user } = state.auth;
  return { user };
}

Results.propTypes = {
  dispatch: PropTypes.func,
  user: PropTypes.object
};

export default connect(mapStateToProps)(Results);
