import React, { useEffect } from 'react';
import { Text, View, Modal, TouchableOpacity, Image, FlatList } from 'react-native';
import { CustomTouchableIcon, CustomButton, CustomImage, ScreenHOC } from '../../../components';
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
    data
}) => {
    useEffect(() => {
        // console.log("mergeArraysAnswers", mergeArraysAnswers(data, answersListObj))
    }, [answersListObj])
    console.log("answersListObj", answersListObj)
    const renderQuestionitem = ({ item, index }) => {
        const { qId, _quest, answer } = item
        // console.log("_quest", questionsObj.length)
        return (
            <View style={{ flexDirection: 'row' }}>
                <MaterialCommunityIcons name={answer ? "checkbox-marked-circle" : "checkbox-blank-circle"}
                    color={answer ? COLORS.GREEN : '#c2c2c2'} size={20} />
                <Text>{'Q.' + (index)}</Text>{<HTMLView value={_quest.replace(/(\r\n|\n|\r)/gm, "")} />}
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
                headerTitle={'Filters'}
                showHeader
                showBackIcon
                backIcon={ICONS.CLOSE_WHITE(30)}
                onBackPress={_toggleFilterModal}
            >


                <View style={{ borderWidth: 4, borderColor: 'red', flex: 1 }}>
                    <FlatList
                        keyExtractor={(item, index) => item.qId + '' + index}
                        showsHorizontalScrollIndicator={false}
                        scrollEnabled={true}
                        data={answersListObj}
                        extraData={answersListObj}
                        renderItem={(item) => renderQuestionitem(item)}
                    />
                </View>

            </ScreenHOC>
        </Modal >
    );
}

export default CustomModal;
