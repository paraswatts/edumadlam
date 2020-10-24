import React, { useState } from 'react';
import { StyleSheet, View, ActivityIndicator, TouchableOpacity, Modal, Text } from 'react-native';
import { _scaleText, ICONS, COLORS } from '../../../shared';
import { ScreenHOC } from '../../'
import CustomTouchableIcon from '../CustomTouchableIcon';
import FastImage from 'react-native-fast-image';

const CustomImage = ({
    container,
    profileFav,
    size = 48,
    style,
    viewable = false,
    uri,
    topImageIcon,
}) => {
    const [loading, toggleLoading] = useState(false);
    const [fullscreen, toggleFullscreen] = useState(false);
    const [error, toggleError] = useState(false);
    return (
        <TouchableOpacity
            activeOpacity={0.8}
            disabled={!viewable}
            onPress={() => toggleFullscreen(true)}
            style={container}
        >
            {(error || !uri) ?
                <View style={[styles.image(size), style]}>
                    {ICONS.DEFAULT_PROFILE(size)}
                </View>
                : <FastImage
                    onError={() => toggleError(true)}
                    onLoadEnd={() => toggleLoading(false)}
                    onLoadStart={() => toggleLoading(true)}
                    source={{ uri }}
                    style={[styles.image(size), style]}
                >
                    {loading && <ActivityIndicator color={COLORS.GREY._2} />}
                </FastImage>}
            {profileFav && <View style={styles.fav}>
                {ICONS.FAVORITE(20)}
            </View>}
            {topImageIcon && <View style={styles.fav}>
                {topImageIcon(20)}
            </View>}
            <Modal
                animated
                animationType='slide'
                onRequestClose={() => toggleFullscreen(false)}
                visible={fullscreen}
            >
                <ScreenHOC
                    barStyle='light-content'
                    statusBarColor='black'
                >
                    <View style={{ flex: 1, backgroundColor: 'black', }}>
                        <View style={{ height: _scaleText(50).fontSize, }}>
                            <CustomTouchableIcon
                                onPress={() => toggleFullscreen(false)}
                                style={{ alignSelf: 'flex-end', padding: _scaleText(5).fontSize }}
                            >
                                {ICONS.CLOSE_WHITE(24)}
                            </CustomTouchableIcon>
                        </View>
                        <View style={{ flex: 1, }}>
                            <FastImage
                                onError={() => toggleError(true)}
                                onLoadEnd={() => toggleLoading(false)}
                                onLoadStart={() => toggleLoading(true)}
                                resizeMode='contain'
                                source={{ uri }}
                                style={{ width: '100%', height: '100%', }}
                            >
                                {loading && <ActivityIndicator color={COLORS.GREY._2} />}
                            </FastImage>
                        </View>
                        <View style={{ height: _scaleText(50).fontSize, }} />
                    </View>
                </ScreenHOC>
            </Modal>
        </TouchableOpacity >
    );
}

export default CustomImage;

const styles = StyleSheet.create({
    image: size => ({
        alignItems: 'center',
        backgroundColor: COLORS.GREY.LIGHT,
        borderRadius: _scaleText(size).fontSize,
        height: _scaleText(size).fontSize,
        justifyContent: 'center',
        overflow: 'hidden',
        width: _scaleText(size).fontSize,
    }),
    fav: {
        position: 'absolute',
        bottom: -_scaleText(2).fontSize,
        right: -_scaleText(5).fontSize,
    },
    topIcon: {
        position: 'absolute',
        top: -_scaleText(2).fontSize,
        right: -_scaleText(5).fontSize,
    }
});