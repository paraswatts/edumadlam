import React, { useState, useEffect, useRef } from 'react';
import { Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, Linking, View, Alert, BackHandler } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI, CustomMCQModal, CustomModal, CustomFloatButton, CustomModalFullScreen } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ICONS } from '../../../../../../../shared';
import styles from './styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
let isTestStartedLocal = false
let answersKeysLocal = []
let dataLocal = []
const TestQuestions = ({
    navigation,
    netConnected,
    testQuestionsRequest,
    testSubmitRequest,
    route: { name, params: { id, _testDuration, _test } = {} },
    sId,
    stopLoading
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
        toggleLoading(!refresh);
        let payload = {
            netConnected,
            id: id,
            success: (response = []) => {
                dataLocal = response.map(obj => ({ ...obj }));
                updateData([...data, ...response])
                toggleLoading(false);
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                toggleLoading(false);
            }
        }
        testQuestionsRequest(payload)
    }

    useEffect(() => {
        return () => {
            toggleLoading(false);
        }
    })
    useEffect(() => {
        const handler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleValidateClose
        );
        return () => handler.remove();
    }, []);
    const handleValidateClose = () => {
        /* Here is empty */
        exitTestBack()
        stopLoading();
        return true
    };
    const testStarted = (value) => {
        isTestStartedLocal = value
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
    const exitTestBack = () => {
        if (isTestStartedLocal) {
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
        console.log("submit test")
        let answers = answersList && answersList.length ? answersList : answersKeysLocal
        let updatedAnswerList = mergeArrays(data && data.length ? data : dataLocal, answers)
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
                console.log("response test", response)
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



    const updateAnswerList = (answerList, answersKeys) => {
        answersKeysLocal = answerList.map(obj => ({ ...obj }));
        updateAnswersListObj(answersKeys)
        updateAnswersList(answerList)
    }
    const resultTable = () => {

    }
    const _toggleFilterModal = () => {
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
            <CustomModalFullScreen
                goToQuestion={goToQuestion}
                data={data}
                answersListObj={answersListObj}
                _toggleFilterModal={_toggleFilterModal}
                visible={showFilterModal && isTestStarted}
            />

            {!!testSubmitSuccess && !exiting &&
                <CustomModal
                    name={_test}
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
            {loading && !exiting ? <ActivityIndicator size={'large'} color={COLORS.GREY._2} /> :
                <CustomMCQModal ref={childRef} _testDuration={_testDuration} submitTest={submitTest} answersListObj={answersListObj} updateAnswerList={updateAnswerList} testStarted={testStarted} questionsObj={data} />}
        </ScreenHOC>
    );
}

export default TestQuestions;