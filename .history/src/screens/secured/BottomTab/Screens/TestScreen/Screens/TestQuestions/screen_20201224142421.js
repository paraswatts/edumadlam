import React, { useState, useEffect, useRef } from 'react';
import { Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, Linking, View, Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI, CustomMCQModal, CustomModal, CustomFloatButton, CustomModalFullScreen } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ICONS } from '../../../../../../../shared';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const TestQuestions = ({
    navigation,
    netConnected,
    testQuestionsRequest,
    testSubmitRequest,
    route: { name, params: { id, _testDuration, _test } = {} },
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
    const [showFilterModal, updateShowFilterModal] = useState(false)
    const [answersListObj, updateAnswersListObj] = useState([])
    const childRef = useRef();
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
        for (let x in arr1) {
            let obj = arr1[x]
            var filteredElements = arr2.filter(function (item, index) { return item.qId == obj._id; });
            if (!filteredElements.length) {
                arr2.push({ qId: obj._id, answer: "" })
            }
            // console.log(arr2)
        }
        return arr2
    }



    const updateAnswerList = (answersList, answersKeys) => {
        console.log(answersKeys, "answersKeysanswersKeys")
        updateAnswersListObj(answersKeys)
        updateAnswersList(answersList)
    }
    const resultTable = () => {

    }
    const _toggleFilterModal = () => {
        console.log("_toggleFilterModal")
        updateShowFilterModal(showFilterModal => !showFilterModal)
    }
    const goToQuestion = (index) => {
        childRef.current.goToQuestion(index)
    }
    return (
        <ScreenHOC
            bottomSafeArea
            headerTitle={_test}
            showHeader
            showBackIcon
            onBackPress={exitTest}
        >
            {
                console.log("resultObj", resultObj)
            }
            <CustomModalFullScreen
                goToQuestion={goToQuestion}
                data={data}
                answersListObj={answersListObj}
                _toggleFilterModal={_toggleFilterModal}
                visible={showFilterModal && isTestStarted}
            />
            {!!testSubmitSuccess && !exiting &&
                <CustomModal
                    data={resultObj.results}
                    resultObj={resultObj}
                    _toggleFilterModal={() => {
                        updatetTestSubmitSuccess(false)
                        navigation.goBack()
                    }}
                >

                </CustomModal>}
            {isTestStarted ?
                <CustomFloatButton
                    icon={ICONS.LIST(30)}
                    style={{ bottom: _scaleText(70).fontSize, zIndex: 10000000000 }}
                    onPress={_toggleFilterModal}
                /> : null}
            { loading && !exiting ? <ActivityIndicator size={'large'} color={COLORS.GREY._2} /> :
                <CustomMCQModal ref={childRef} name={_test} _testDuration={_testDuration} submitTest={submitTest} answersListObj={answersListObj} updateAnswerList={updateAnswerList} testStarted={testStarted} questionsObj={data} />}
        </ScreenHOC>
    );
}

export default TestQuestions;