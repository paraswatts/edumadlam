import React from 'react';
import { Text, UIManager, View } from 'react-native';
import { ScreenHOC } from '../../../../../components';
import { COLORS } from '../../../../../shared';
import Video from 'react-native-video';
import YouTube from 'react-native-youtube';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const FriendsScreen = ({
    navigation
}) => {
    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHTER, }}
            headerTitle={'Video Series'}
            showHeader
            showMenuIcon
            onBackPress={navigation.toggleDrawer}
        >
            <Text>Video Series Screen</Text>
            <View style={{ flex: 1, borderWidth: 0 }}>
                <YouTube
                    videoId="KVZ-P-ZI6W4" // The YouTube video ID
                    play // control playback of video with true/false
                    fullscreen // control whether the video should play in fullscreen or inline
                    loop // control whether the video should loop when ended
                    // onReady={e => this.setState({ isReady: true })}
                    // onChangeState={e => this.setState({ status: e.state })}
                    // onChangeQuality={e => this.setState({ quality: e.quality })}
                    // onError={e => this.setState({ error: e.error })}
                    style={{ alignSelf: 'stretch', height: 300 }}
                />
                {/* <Video
                    // playInBackground
                    // playWhenInactive
                    // hideShutterView
                    fullscreen

                    controls
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        bottom: 0,
                        right: 0,
                    }}
                    source={{
                        uri:
                            'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
                    }}
                /> */}
            </View>
        </ScreenHOC>
    );
}

export default FriendsScreen;