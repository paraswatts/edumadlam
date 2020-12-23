import React, { useEffect, useRef } from 'react';
import { Text, View, Modal, TouchableOpacity, Image, FlatList } from 'react-native';
import { CustomTouchableIcon, CustomButton, CustomImage, ScreenHOC, CustomFloatButton } from '../../../components';
import { ICONS, ILLUSTRATIONS, _scaleText, COLORS, BASE_URL, TEXT_CONST } from '../../../shared';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import HTMLView from 'react-native-htmlview';

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
    resultObj
}) => {
    const quesRef = useRef();
    const renderQuestionitem = ({ item, index }) => {
        const { qId, _quest, answer, status, remark } = item
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
            <View onPress={() => {
                // _toggleFilterModal()
                // try {
                //     goToQuestion(index)
                // } catch (e) {
                //     console.log("eeeee", e)
                // }
            }} style={{ flexDirection: 'row', marginVertical: _scaleText(5).fontSize, marginHorizontal: _scaleText(10).fontSize, borderWidth: 0.5, padding: _scaleText(5).fontSize, borderRadius: _scaleText(5).fontSize }}>
                <MaterialCommunityIcons name={icon}
                    color={color} size={20} />
                <View>
                    <View>
                        <Text style={{ marginLeft: _scaleText(5).fontSize }}>{ }</Text>{<HTMLView style={{ flex: 1 }} value={_quest.replace(/(\r\n|\n|\r)/gm, "")} />}
                        <Text >{remark}</Text>
                    </View>
                </View>
            </View>
        )
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
                headerTitle={TEXT_CONST.SELECT_QUESTION}
                showHeader
                showBackIcon
                backIcon={ICONS.CLOSE_WHITE(30)}
                onBackPress={_toggleFilterModal}
            >


                <View style={{ flex: 1 }}>
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
