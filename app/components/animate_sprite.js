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
    this.animation = Animated.timing(                
      this.state.count,          
      {
        toValue: this.frameCount,
        duration: this.fps,
      }
    );
  }

  componentDidMount() {
    this.activateAnimation();
    this.incrementFrame();
  }

  componentWillUnmount() {
    this.animation.stop();
  }

  incrementFrame() {
    this.frame = (this.frame + 1) % this.props.frameCount;
    requestAnimationFrame(this.incrementFrame);
  }

  repeatAnimation(animation) {
    if(animation.finished){
      this.setState({
        count: new Animated.Value(0)
      });
      this.activateAnimation();
    }
  }

  activateAnimation() {
    this.animation.start(this.repeatAnimation);  
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