import React from 'react';

class Carousel extends React.Component {
  constructor() {
    super();
    this.state = {
      selectedCarousel: 0,
      carousel: [{
        thumbnailTitle: 'Multiple selection',
        thumbtxt: `This is multiple selection quiz, your goal is to fill in the blank ____ spots`
      }, {
        thumbnailTitle: 'Can I google?',
        thumbtxt: 'You may google, but the point of quiz is to learn on your mistakes, so google it after the quiz, once we evaluate your answers'
      }, {
        thumbnailTitle: 'Be helpful',
        thumbtxt: `Don't be that guy in the middle. If you have knowledge share it, use github, stackoverflow etc.`
      }, {
        thumbnailTitle: 'Sign up',
        thumbtxt: 'Sign up to play, share your score, expand your knowledge...'
      }, {
        thumbnailTitle: 'Have fun',
        thumbtxt: 'Most of all, have fun'
      }]
    };
  }
  componentDidMount() {
    const intervalId = setInterval(() => this.changeSelectedCarousel('next'), 10000);
    this.setState({intervalId: intervalId});
  }
  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }
  changeSelectedCarousel(command) {
    let selectedCarousel = this.state.selectedCarousel;
    const lastIndex = this.state.carousel.length - 1;

    if (command === 'previous') {
      if (selectedCarousel <= 0) selectedCarousel = lastIndex;
      else selectedCarousel--;
    } else if (command === 'next') {
      if (selectedCarousel < lastIndex) selectedCarousel++;
      else selectedCarousel = 0;
    }

    clearInterval(this.state.intervalId);
    const intervalId = setInterval(() => this.changeSelectedCarousel('next'), 10000);
    this.setState({ selectedCarousel, intervalId });
  }

  render() {
    return (
      <div className="carouselContainer carousel-wrapper column">
        <article className="carousel-display">
          <div className="carousel-box">
            <h3>
              {this.state.carousel[this.state.selectedCarousel].thumbnailTitle}
            </h3>
            <p>
              {this.state.carousel[this.state.selectedCarousel].thumbtxt}
            </p>
          </div>
        </article>
      </div>
    );
  }
}

export default Carousel;
