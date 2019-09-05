import React, { Component } from 'react';
import {
    View,
    Animated,
    Easing
} from 'react-native';
import PropTypes from 'prop-types';

export default class AnimatableProgressBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            current: props.current,
            One_Percent: props.width / 100,
            minimum: props.minimum,
            maximum: props.maximum,
            stripeLine: []
        }
        this.widthAnimation = new Animated.Value(0);
        this.backgroundAnimation = new Animated.Value(0);
        this.backgroundInterpolationValue = null;
        this.textPosition = new Animated.Value(10);
    }

    componentDidMount() {
        if (this.state.current > 0) {
            switch (this.props.type) {
                case "increase":
                    this.animateSuddendly();
                    break;
                case "progress":
                    this.startProgress();
                    break;
                case "decrease":
                    this.animateWidth();
                    break;
            }
        }
    }

    startProgress = () => {
        this.animateWidth();
        this.value = setInterval(() => {
            if (this.state.current >= this.state.minimum) {
                this.setState({
                    current: this.state.current - this.state.One_Percent
                }, () => {
                    this.animateWidth();
                })
            }
            else {
                this.stopProgress();
            }
        }, this.props.interval);
    }

    animateBackground() {
        Animated.timing(this.backgroundAnimation, {
            toValue: 1,
            duration: this.props.backgroundAnimationDuration,
        }).start();
        Animated.timing(this.textPosition, {
            toValue: 1,
            duration: this.props.barAnimationDuration,
        }).start();
    }

    stopProgress = () => {
        clearInterval(this.value);
    }

    clearProgress = () => {
        this.setState({ current: 0 })
    }

    animateWidth() {
        const currentPercent = (this.state.current * 100) / this.state.maximum;
        const toValue = currentPercent * this.state.One_Percent.toFixed(0);
        Animated.timing(this.widthAnimation, {
            easing: Easing[this.props.barEasing],
            toValue: toValue > 0 ? toValue : 0,
            duration: this.props.barAnimationDuration,
        }).start();
        Animated.timing(this.textPosition, {
            toValue: toValue,
            duration: this.props.barAnimationDuration,
        }).start();
    }

    animateSuddendly() {
        const currentPercent = (this.state.current * 100) / this.state.maximum;
        const toValue = currentPercent * this.state.One_Percent.toFixed(0);
        Animated.parallel([
            Animated.timing(this.widthAnimation, {
                toValue: toValue,
                duration: this.props.barAnimationDuration
            }),
            Animated.timing(this.textPosition, {
                toValue: toValue > 0 ? toValue : 0,
                duration: this.props.barAnimationDuration,
            })
        ]).start();

    }

    createStripedLines() {
        let lines = [];
        for (var i = 0; i < this.props.width / 12; i++) {
            lines.push(<View style={{
                backgroundColor: this.props.lineBackgroundColor, height: 2,
                width: '100%', marginTop: 10
            }} />)
        }
        return lines;
    }

    render() {
        return (
            <View style={{
                width: this.props.height,
                height: this.props.width,
                borderWidth: this.props.borderWidth,
                borderColor: this.props.borderColor,
                borderRadius: this.props.borderRadius,
                overflow: 'visible',
                transform: [{ rotate: '180deg' }]
            }}
            >
                <View style={{
                    position: 'absolute',
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    padding: 5,
                    zIndex: 11,
                    overflow: 'hidden',
                    width: '100%',
                    height: '100%',
                    borderRadius: this.props.borderRadius
                }}>
                    {
                        this.createStripedLines()
                    }
                </View>

                <Animated.View style={{
                    height: this.widthAnimation,
                    width: this.props.height - (this.props.borderWidth * 2),
                    backgroundColor: this.backgroundInterpolationValue || this.props.backgroundColor,
                    borderRadius: this.props.borderRadius,
                    zIndex: 10,
                }}
                >
                </Animated.View>
                <Animated.View style={{
                    backgroundColor: 'black',
                    marginLeft: -20,
                    top: this.textPosition,
                    position: 'absolute',
                    height: this.props.height,
                    width: this.props.height + 20,
                    maxHeight: this.props.height,
                    maxWidth: this.props.height + 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    zIndex: 999,
                    transform: [{ rotate: '180deg' }],
                    backfaceVisibility: 'hidden'
                }}>

                    <Animated.Text
                        numberOfLines={1}
                        adjustsFontSizeToFit={true}
                        minimumFontScale={.5}
                        style={[
                            {
                                color: this.props.textColor,
                                fontSize: 14,
                                fontWeight: 'bold'
                            }
                        ]}

                    >
                        ${this.state.current}
                    </Animated.Text>
                </Animated.View>
            </View>
        )
    }
}

AnimatableProgressBar.propTypes = {
    /**
   * Bar values
   */
    minimum: PropTypes.number,
    maximum: PropTypes.number,
    current: PropTypes.number.isRequired,
    /**
     * Animations
     */
    barEasing: PropTypes.oneOf([
        'bounce',
        'cubic',
        'ease',
        'sin',
        'linear',
        'quad',
    ]),
    barAnimationDuration: PropTypes.number,
    backgroundAnimationDuration: PropTypes.number,

    /**
     * StyleSheet props
     */
    width: PropTypes.number.isRequired,
    height: PropTypes.number,
    backgroundColor: PropTypes.string,
    backgroundColorOnComplete: PropTypes.string,
    borderWidth: PropTypes.number,
    borderColor: PropTypes.string,
    borderRadius: PropTypes.number,
    lineBackgroundColor: PropTypes.string,
    textColor: PropTypes.string,
    interval: PropTypes.number,

    /**
     * Callbacks
     */
    onComplete: PropTypes.func,
    type: PropTypes.oneOf(["decrease", "increase", "progress"])
}

AnimatableProgressBar.defaultProps = {
    minimum: 0,
    maximum: 100,

    barEasing: 'linear',
    barAnimationDuration: 1000,
    backgroundAnimationDuration: 2500,

    height: 15,

    backgroundColor: 'green',
    backgroundColorOnComplete: null,

    lineBackgroundColor: '#fff',
    textColor: '#fff',

    borderWidth: 1,
    borderColor: '#C8CCCE',
    borderRadius: 6,

    onComplete: null,
    type: 'decrease',
    minimum: 0,
    interval: 1000
}