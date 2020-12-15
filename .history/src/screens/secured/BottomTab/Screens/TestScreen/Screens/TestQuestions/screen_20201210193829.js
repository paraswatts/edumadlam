import React, { useState, useEffect } from 'react';
import { Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, Linking, View, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI, CustomMCQModal, CustomModal, CustomFloatButton } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ROUTES } from '../../../../../../../shared';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const TestQuestions = ({
    navigation,
    netConnected,
    testQuestionsRequest,
    testSubmitRequest,
    route: { name, params: { id, _testDuration } = {} },
    sId
}) => {
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [refreshing, toggleRefreshing] = useState(true);
    const [isTestStarted, updateIsTestStarted] = useState(false)
    const [answersList, updateAnswersList] = useState([])
    const [testSubmitSuccess, updatetTestSubmitSuccess] = useState(false)
    const [exiting, updateExiting] = useState(false)
    const [resultObj, updateResultObj] = useState(null)

    useEffect(() => { fetchData(true) }, [id])
    const fetchData = (refresh = false) => {
        console.log("_id_id_id", id)
        toggleLoading(!refresh);
        let payload = {
            netConnected,
            id: id,
            success: (response = []) => {
                console.log("response", response)
                updateData([...data, ...response])
                toggleLoading(false);
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                toggleLoading(false);
            }
        }
        console.log("payload sub cat", payload)
        testQuestionsRequest(payload)
    }

    const testStarted = (value) => {
        updateIsTestStarted(value)
    }
    const exitTest = () => {
        if (isTestStarted) {
            Alert.alert(
                'Exit Test',
                'If you exit the test will be submitted',
                [
                    {
                        text: 'Yes',
                        onPress: () => {
                            updateExiting(true)
                            submitTest()
                            navigation.goBack()
                        }
                    },
                    {
                        text: 'No',
                        style: 'cancel',
                    },
                ],
                { cancelable: false },
            );
        } else {
            navigation.goBack()
        }
    }

    const submitTest = () => {
        // navigation.goBack()

        let updatedAnswerList = mergeArrays(data, answersList)
        console.log("updatedAnswerList", updatedAnswerList)
        mergeArrays()
        toggleLoading(true);
        let json = {
            sId: sId,
            id: id,
            answers: updatedAnswerList
        }
        let payload = {
            netConnected,
            json,
            success: (response) => {
                console.log("responseresponseresponse", response)
                updateResultObj(response)
                updatetTestSubmitSuccess(true)
                toggleLoading(false);
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                toggleLoading(false);
            }
        }
        testSubmitRequest(payload)
    }


    const mergeArrays = (arr1, arr2) => {
        for (x in arr1) {
            let obj = arr1[x]
            var filteredElements = arr2.filter(function (item, index) { return item.qId == obj._id; });
            if (!filteredElements.length) {
                arr2.push({ qId: obj._id, answer: "" })
            }
            // console.log(arr2)
        }
        return arr2
    }

    const updateAnswerList = (answersList) => {
        console.log("answersList", answersList)
        updateAnswersList(answersList)
    }
    const resultTable = () => {

    }
    return (
        <ScreenHOC
            bottomSafeArea
            headerTitle={'Test Questions'}
            showHeader
            showBackIcon
            onBackPress={exitTest}
        >
            {
                console.log("resultObj", resultObj)
            }
            {!!testSubmitSuccess && !exiting &&
                <CustomModal
                    onButtonPress={() => {
                        updatetTestSubmitSuccess(false)
                        navigation.goBack()
                    }}
                    buttonLabel={TEXT_CONST.OK}
                >
                    <Text style={{ marginBottom: 10, fontSize: 16 }}>{TEXT_CONST.TEST_SUBMITTED}</Text>

                    {resultObj ?
                        <View>
                            <View style={{ flexDirection: 'row' }}><Text style={{ minWidth: 100 }}>{TEXT_CONST.SCORE} </Text><Text>:</Text><Text>{resultObj.score}</Text></View>
                            <View style={{ flexDirection: 'row' }}><Text style={{ minWidth: 100 }}>{TEXT_CONST.CORRECT} </Text><Text>:</Text><Text>{resultObj.correct}</Text></View>
                            <View style={{ flexDirection: 'row' }}><Text style={{ minWidth: 100 }}>{TEXT_CONST.WRONG} </Text><Text>:</Text><Text>{resultObj.wrong}</Text></View>
                            <View style={{ flexDirection: 'row' }}><Text style={{ minWidth: 100 }}>{TEXT_CONST.LEFT} </Text><Text>:</Text><Text>{resultObj.left}</Text></View>
                            {resultObj.pdf ? <View style={{ flexDirection: 'row' }}><Text style={{ minWidth: 100 }}>{TEXT_CONST.RESULT_PDF}</Text><Text>:</Text><TouchableOpacity onPress={() => {
                                try {
                                    Linking.openURL(resultObj.pdf)
                                } catch (error) {

                                    console.log("error", error)
                                }
                            }}><Text style={{ color: 'blue' }}>{TEXT_CONST.DOWNLOAD_PDF}</Text></TouchableOpacity></View> : null}

                        </View> : null}
                </CustomModal>}
            <CustomFloatButton
                style={{ bottom: _scaleText(60).fontSize }}
            // onPress={_onSignin}
            />
            { loading && !exiting ? <ActivityIndicator size={'large'} color={COLORS.GREY._2} /> :
                <CustomMCQModal _testDuration={_testDuration} submitTest={submitTest} updateAnswerList={updateAnswerList} testStarted={testStarted} questionsObj={data} />}
        </ScreenHOC>
    );
}

export default TestQuestions;