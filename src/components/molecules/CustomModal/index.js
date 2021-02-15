import React, { useEffect, useRef } from 'react';
import { Text, View, Modal, TouchableOpacity, Image, FlatList, Linking } from 'react-native';
import { CustomTouchableIcon, CustomButton, CustomImage, ScreenHOC, CustomFloatButton, } from '../../../components';
import { ICONS, ILLUSTRATIONS, _scaleText, COLORS, BASE_URL, TEXT_CONST } from '../../../shared';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HTMLView from 'react-native-htmlview';
import Share from 'react-native-share';
import { isTablet } from 'react-native-device-info';

const CustomModal = ({
    buttonLabel,
    icon = ILLUSTRATIONS.FRIEND_MOVED(150, 120),
    onButtonPress = () => { },
    onButtonPress2 = () => { },
    onClose = () => { },
    visible,
    showExit,
    children,
    _toggleFilterModal,
    answersListObj,
    data,
    goToQuestion,
    resultObj,
    name,
    date
}) => {
    const quesRef = useRef();
    const renderQuestionitem = ({ item, index }) => {
        const { qId, _quest, answer, status, remark, _opt1, _opt2, _opt3, _opt4, _yourAnswer } = item
        let icon, color
        if (status == 0) {
            icon = 'close-circle-outline'
            color = 'red'
        }
        else if (status == 1) {
            icon = 'checkbox-marked-circle'
            color = COLORS.GREEN
        }
        else {
            icon = 'checkbox-blank-circle'
            color = '#c2c2c2'
        }
        return (
            <View style={{ flexDirection: 'row', marginVertical: _scaleText(5).fontSize, marginHorizontal: _scaleText(10).fontSize, borderWidth: 0.5, padding: _scaleText(5).fontSize, borderRadius: _scaleText(5).fontSize }}>
                <MaterialCommunityIcons name={icon}
                    color={color} size={_scaleText(isTablet() ? 16 : 15).fontSize} />
                <View style={{ borderWidth: 0, marginLeft: _scaleText(5).fontSize }}>
                    <View>
                        <HTMLView addLineBreaks={true} style={{ width: '90%' }} stylesheet={styles} value={_quest.replace(/(\r\n|\n|\r)/gm, "")} />
                        <View>
                            <Text style={{ color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{'1. '}{_opt1}</Text>
                            <Text style={{ color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{'2. '}{_opt2}</Text>
                            <Text style={{ color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{'3. '}{_opt3}</Text>
                            <Text style={{ color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{'4. '}{_opt4}</Text>
                        </View>
                        {_yourAnswer ? <View style={{ marginVertical: _scaleText(10).fontSize }}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{'Your Answer'}</Text>
                            <Text style={{ color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{_yourAnswer}</Text>
                        </View> : null}

                        <View style={{ marginVertical: _scaleText(10).fontSize }}>
                            <Text style={{ fontWeight: 'bold', color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{'Correct Answer'}</Text>
                            <Text style={{ color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{answer}</Text>
                        </View>
                        {remark ?
                            <View>
                                <Text style={{ fontWeight: 'bold', color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>Remark</Text>

                                <View style={{ width: '95%' }}>
                                    <Text style={{ fontSize: _scaleText(13).fontSize, flex: 1, borderWidth: 0, flexWrap: 'wrap', color: COLORS.BLUE_FONT }}>{remark}</Text>
                                </View></View> : null}
                    </View>
                </View>
            </View>
        )
    }
    const showShareModal = () => {
        let appUrl = Platform.OS === 'ios' ? 'https://apps.apple.com/us/app/edumandala' : 'https://play.google.com/store/apps/details?id=com.edumandala'
        const shareOptions = {
            title: 'Share EduMandala',
            failOnCancel: false,
            urls: [appUrl],
            message: 'Hey! I scored ' + resultObj.score + ' while attempting ' + (date ? date : '') + ' ' + name + '\n\nDownload the EduMandala App for latest Current Affairs, Articles, MCQs and Study Materials! \n\n'
        };
        Share.open(shareOptions)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                err && console.log(err);
            });
    }
    return (
        <Modal
            animated
            animationType='slide'
            onRequestClose={onClose}
            // statusBarTranslucent
            // transparent
            visible={visible}

        >

            <ScreenHOC
                bottomSafeArea
                headerTitle={TEXT_CONST.TEST_RESULT}
                showHeader
                showBackIcon
                backIcon={ICONS.CLOSE_WHITE(30)}
                onBackPress={_toggleFilterModal}
                onRightPress={showShareModal}
                headerRight={<MaterialCommunityIcons name={'share-variant'}
                    color={'white'} size={_scaleText(isTablet() ? 16 : 15).fontSize} />}
            >


                <View style={{ flex: 1 }}>
                    <View style={{ alignItems: 'center' }}>
                        {
                            ICONS.MEDAL(70)
                        }
                        {resultObj.grade ? <Text style={{ marginVertical: _scaleText(10).fontSize, color: COLORS.BLUE_FONT }}>{'Your grade is ' + resultObj.grade}</Text> : <Text style={{ marginVertical: _scaleText(10).fontSize, color: COLORS.BLUE_FONT }}>{''}</Text>}
                        <View style={{ flexDirection: 'row', borderTopWidth: 0.5, width: '100%', padding: _scaleText(10).fontSize }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' }}><MaterialCommunityIcons name={'circle-double'}
                                color={'red'} size={_scaleText(isTablet() ? 16 : 15).fontSize} /><View style={{ marginLeft: _scaleText(20).fontSize, color: COLORS.BLUE_FONT }}><Text style={{ minWidth: 100, color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{TEXT_CONST.SCORE} </Text><Text style={{ color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{resultObj.score}</Text></View></View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' }}><MaterialCommunityIcons name={'checkbox-marked-circle'}
                                color={COLORS.GREEN} size={_scaleText(isTablet() ? 16 : 15).fontSize} /><View style={{ marginLeft: _scaleText(20).fontSize }}><Text style={{ minWidth: 100, color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{TEXT_CONST.CORRECT} </Text><Text style={{ color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{resultObj.correct}</Text></View></View>
                        </View>
                        <View style={{ flexDirection: 'row', borderTopWidth: 0.5, width: '100%', padding: _scaleText(10).fontSize }}>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' }}><MaterialCommunityIcons name={'close-circle-outline'}
                                color={'red'} size={_scaleText(isTablet() ? 16 : 15).fontSize} /><View style={{ marginLeft: _scaleText(20).fontSize }}><Text style={{ minWidth: 100, color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{TEXT_CONST.WRONG} </Text><Text style={{ color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{resultObj.wrong}</Text></View></View>
                            <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' }}><MaterialCommunityIcons name={'checkbox-blank-circle'}
                                color={'#c2c2c2'} size={_scaleText(isTablet() ? 16 : 15).fontSize} /><View style={{ marginLeft: _scaleText(20).fontSize }}><Text style={{ minWidth: 100, color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{TEXT_CONST.LEFT} </Text><Text style={{ color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{resultObj.left}</Text></View></View>
                        </View>
                        <View style={{ flexDirection: 'row', borderTopWidth: 0.5, width: '100%', padding: _scaleText(10).fontSize }}>
                            {resultObj.pdf ? <View style={{ flexDirection: 'row', alignItems: 'center', flex: 1, justifyContent: 'center' }}><MaterialCommunityIcons name={'file-pdf'}
                                color={'red'} size={_scaleText(isTablet() ? 16 : 15).fontSize} /><View style={{ marginLeft: _scaleText(20).fontSize }}><Text style={{ minWidth: 100, color: COLORS.BLUE_FONT, fontSize: _scaleText(13).fontSize }}>{TEXT_CONST.RESULT_PDF} </Text><TouchableOpacity onPress={() => {
                                    try {
                                        Linking.openURL(resultObj.pdf)
                                    } catch (error) {
                                        console.log("error", error)
                                    }
                                }}><Text style={{ color: 'blue', fontSize: _scaleText(13).fontSize }}>{TEXT_CONST.DOWNLOAD_PDF}</Text></TouchableOpacity></View></View> : null}

                        </View>

                    </View>
                    <FlatList
                        ref={quesRef}
                        keyExtractor={(item, index) => item.qId + '' + index}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={true}
                        data={data}
                        extraData={data}
                        renderItem={(item) => renderQuestionitem(item)}
                    />
                </View>
                <CustomFloatButton
                    icon={ICONS.UP_ARROW(30)}
                    style={{ zIndex: 10000000000 }}
                    onPress={() => quesRef.current.scrollToIndex({ index: 0, animated: true })}
                />
            </ScreenHOC>
        </Modal >
    );
}

export default CustomModal;
