import React from 'react';
import {
  Animated
} from 'react-native';



class AnimatedSprite extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: new Animated.Value(0)
    };
    this.frame = 0;
    this.spriteSheet = this.props.spriteSheet;
    this.frameCount = this.props.frameCount;
    this.fps = this.props.fps;
    this.activateAnimation = this.activateAnimation.bind(this);
    this.repeatAnimation = this.repeatAnimation.bind(this);
    this.incrementFrame = this.incrementFrame.bind(this);
    this.getImage = this.getImage.bind(this);
  }

  componentDidMount() {
    this.activateAnimation();
    this.incrementFrame();
  }

  incrementFrame() {
    this.frame = (this.frame + 1) % this.props.frameCount;
    requestAnimationFrame(this.incrementFrame);
  }

  repeatAnimation() {
    this.setState({
      count: new Animated.Value(0)
    });
    this.activateAnimation();
  }

  activateAnimation() {
    Animated.timing(                  // Animate over time
      this.state.count,            // The animated value to drive
      {
        toValue: this.frameCount,
        duration: this.fps,              // Make it take a while
      }
    ).start(this.repeatAnimation);  
  }

  getImage(frame) {
    return this.spriteSheet['image' + frame];
  }

  render() {
    return (
      <Animated.Image                 // Special animatable View
        source={this.getImage(this.frame)}
      >
      </Animated.Image>
    );
  }
}


function animateSprite(spriteSheet, frameCount, fps=60) {
  return (
    <AnimatedSprite 
      spriteSheet={spriteSheet}
      frameCount={frameCount}
      fps={fps} 
    />
  );
} 

export default animateSprite;