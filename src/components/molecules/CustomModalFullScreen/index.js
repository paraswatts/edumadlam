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
    goToQuestion
}) => {
    // console.log("answersListObj", answersListObj)
    const quesRef = useRef();

    const renderQuestionitem = ({ item, index }) => {
        const { qId, _quest, answer } = item
        let _questUpdated = _quest.replace(/(\r\n|\n|\r)/gm, "")
        _questUpdated = _questUpdated.replace(/(<|&lt;)br\s*\/*(>|&gt;)/g, "")
        _questUpdated = _questUpdated.replace(/<[^/>][^>]*><\/[^>]+>/g, "")
        return (
            <TouchableOpacity onPress={() => {
                _toggleFilterModal()
                try {
                    goToQuestion(index)
                } catch (e) {
                    console.log("eeeee", e)
                }
            }} style={{ flexDirection: 'row', marginVertical: _scaleText(5).fontSize, marginHorizontal: _scaleText(10).fontSize, borderWidth: 0.5, padding: _scaleText(5).fontSize, borderRadius: _scaleText(5).fontSize }}>
                <MaterialCommunityIcons name={answer ? "checkbox-marked-circle" : "checkbox-blank-circle"}
                    color={answer ? COLORS.GREEN : '#c2c2c2'} size={20} />
                <Text style={{ marginLeft: _scaleText(5).fontSize }}></Text>{<HTMLView stylesheet={styles} addLineBreaks={true} style={{ flex: 1 }} value={_questUpdated} />}
            </TouchableOpacity>
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
                        data={answersListObj}
                        extraData={answersListObj}
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
