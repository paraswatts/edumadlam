import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { _scaleText, COLORS, TEXT_STYLES, ICONS } from '../../../shared';
import NoTaskImage from '../../../assets/illustrations/no_task.svg';

const EmptyDataUI = ({
    children,
    image = <NoTaskImage {...styles.iconstyle(180, 150)} />,
    showSubTitleImage = false,
    style,
    subTitle1 = '',
    subTitle2 = '',
    subTitleImage = ICONS.CREATE_TASK(16),
    subTitleStyle,
    title = '',
    titleStyle,
}) => (
        <View style={[styles.container, style]}>
            {/* {image} */}
            {!!title && <Text style={[styles.title, titleStyle]}>{title}</Text>}
            {!!subTitle1 && <Text style={[styles.subTitle, subTitleStyle]}>{subTitle1}{showSubTitleImage ? subTitleImage : ''}{subTitle2}</Text>}
            {children}
        </View>
    );

export default EmptyDataUI;

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: _scaleText(24).fontSize,
        alignItems: 'center',
        paddingVertical: _scaleText(40).fontSize
    },
    title: {
        paddingVertical: _scaleText(16).fontSize,
        color: COLORS.GREY._1,
        textAlign: 'center',
        ...TEXT_STYLES.H3
    },
    subTitle: {
        color: COLORS.GREY._2,
        textAlign: 'center',
        ...TEXT_STYLES.BODY3
    },
    iconstyle: (width, height) => ({
        width: _scaleText(width).fontSize,
        height: _scaleText(height).fontSize
    })
});
