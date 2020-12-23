import React from 'react';
import { Text, UIManager, View } from 'react-native';
import { ScreenHOC } from '../../../../../../../components';
import { COLORS } from '../../../../../../../shared';
import Video from 'react-native-video';
import YouTube from 'react-native-youtube';
import HTMLView from 'react-native-htmlview';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const YoutubePlayerScreen = ({
    navigation,
    route: { params: { _link, _name, _webPage } = {} }
}) => {

    const getVideoIdFromUrl = (_link) => {
        var p = /^(?:https?:\/\/)?(?:www\.)?(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})(?:\S+)?$/;
        return (_link.match(p)) ? RegExp.$1 : false;
    }
    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHTER, }}
            headerTitle={_name}
            showHeader
            showBackIcon
            onBackPress={navigation.goBack}
        >
            <View style={{ flex: 1, borderWidth: 0, alignItems: 'center', }}>
                <YouTube
                    apiKey='AIzaSyAanj5hB1lBH5XDmuTpLXoD47LM_0OerGI'
                    videoId={getVideoIdFromUrl(_link)} // The YouTube video ID
                    play // control playback of video with true/false
                    fullscreen // control whether the video should play in fullscreen or inline
                    loop // control whether the video should loop when ended
                    // onReady={e => this.setState({ isReady: true })}
                    // onChangeState={e => this.setState({ status: e.state })}
                    // onChangeQuality={e => this.setState({ quality: e.quality })}
                    // onError={e => this.setState({ error: e.error })}
                    style={{ alignSelf: 'stretch', height: 300 }}
                />
                {_webPage ?
                    <HTMLView addLineBreaks={false} value={_webPage.replace(/(\r\n|\n|\r)/gm, "")} /> : null}
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

export default YoutubePlayerScreen;