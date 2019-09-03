import React, { Component } from 'react';
import {
    View,
    Text,
    Animated,
    Easing,
} from 'react-native';
import PropTypes from 'prop-types';

export default class AnimatableProgressBar extends Component {

    constructor(props) {
        super(props);
        this.state = {
            progress: props.value,
        }
        this.widthAnimation = new Animated.Value(0);
        this.backgroundAnimation = new Animated.Value(0);
        this.backgroundInterpolationValue = null;
        this.textPosition = new Animated.Value(10);
    }

    componentDidMount() {
        if (this.state.progress > 0) {
            this.animateWidth();
        }
    }

    animateWidth() {
        const toValue = ((this.props.width * this.state.progress) / 100) - this.props.borderWidth * 2;
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

    render() {
        return (
            <View>
                <Text>My progress</Text>
            </View>
        )
    }
}

AnimatableProgressBar.propTypes = {
    /**
   * Bar values
   */
    value: PropTypes.number,
    maxValue: PropTypes.number,

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

    /**
     * Callbacks
     */
    onComplete: PropTypes.func,
}

AnimatableProgressBar.defaultProps = {
    value: 0,
    maxValue: 100,

    barEasing: 'linear',
    barAnimationDuration: 500,
    backgroundAnimationDuration: 2500,

    height: 15,

    backgroundColor: '#148cF0',
    backgroundColorOnComplete: null,

    borderWidth: 1,
    borderColor: '#C8CCCE',
    borderRadius: 6,

    onComplete: null,
}