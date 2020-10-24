import React, { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { COLORS, _scaleText } from '../../../shared';
import styles from './styles'
import Slider from "react-native-slider";
import { isTablet } from 'react-native-device-info';

let sliderWidth = Dimensions.get('screen').width;

const CustomSlider = ({
    customLabel,
    customLeftLabel,
    customRightLabel,
    customSliderLabel,
    data = [1, 6, 11, 15],
    maxValue = 0,
    minimumValue = 0.2,
    onSlidingComplete = () => { },
    onSlidingStart = () => { },
    onValueChange = () => { },
    originalValue = 0,
    showLines,
    step = 0.2,
    thumbTouchSize = 60,
    value,
}) => {

    const [width, updateWidth] = useState(Dimensions.get('screen').width - _scaleText(32).fontSize);

    let eachWidth = width / maxValue;
    let left = (eachWidth * (originalValue - 1)) - _scaleText(22.5).fontSize;
    left = left > (width - _scaleText(50.5).fontSize) ? width - _scaleText(50.5).fontSize : left

    return (
        <View
            onLayout={({ nativeEvent: { layout: { width } } }) => updateWidth(width)}
            style={styles.sliderCont}
        >
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                {/* {data.map(item => <Text style={styles.miles(originalValue < 5 ? item == originalValue : item == '...')}>{customLabel ? customLabel(item) : item}</Text>)} */}
                <Text style={styles.miles()}>{customLeftLabel ? customLeftLabel : '1 mile'}</Text>
                {/* <Text style={styles.miles(true)}>{maxValue / 2} mile</Text> */}
                <Text style={styles.miles()}>{customRightLabel ? customRightLabel : `${maxValue} miles`}</Text>
            </View>
            <View style={{ position: 'absolute', alignItems: 'center', zIndex: 999999, bottom: -_scaleText(isTablet() ? 15 : 10).fontSize, ...(left >= width - _scaleText(80).fontSize ? { right: 0 } : { left: left < 0 ? -_scaleText(5).fontSize : left }) }}>
                <Text style={styles.miles(true)}>{customSliderLabel ? customSliderLabel : `${originalValue} mile${originalValue > 1 ? 's' : ''}`}</Text>
            </View>
            <Slider
                minimumTrackTintColor={COLORS.PRIMARY.PINK}
                minimumValue={minimumValue}
                onSlidingComplete={onSlidingComplete}
                onSlidingStart={onSlidingStart}
                onValueChange={value => onValueChange(value)}
                step={step}
                thumbTouchSize={{
                    width: _scaleText(thumbTouchSize).fontSize,
                    height: _scaleText(thumbTouchSize).fontSize
                }}
                thumbStyle={{ backgroundColor: COLORS.PRIMARY.PINK, width: _scaleText(15).fontSize, height: _scaleText(15).fontSize }}
                trackStyle={{ backgroundColor: COLORS.GREY.LIGHT, }}
                value={value}
            />
        </View>
    );
}

export default CustomSlider;
