import React, { useState, useEffect, useRef } from 'react';
import { Text, UIManager, View, StyleSheet, ActivityIndicator, Dimensions, SafeAreaView, ScrollView, Alert, FlatList, BackHandler } from 'react-native';
import { ScreenHOC, CustomButton, CustomDatePicker, CustomMCQModal, CustomModal, CustomFloatButton, CustomModalFullScreen } from '../../../../../../../components';
import { COLORS, ICONS, _scaleText, TEXT_CONST, _showCustomToast } from '../../../../../../../shared';
import styles from './styles';
import { isTablet } from 'react-native-device-info';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
export const { width, height } = Dimensions.get('window');
let isTestStartedLocal = false
let answersKeysLocal = []
let dataLocal = []
let questionsObj = [
    {
        "_id": "1",
        "_quest": "First question",
        "_opt1": "1 only",
        "_opt2": "2 only",
        "_opt3": "Both 1 and 2",
        "_opt4": "Neither 1 nor 2",
        "_answer": "opt1",
        "_remark": "The National Survey and Mapping Organization of the country under the Department of Science &amp; Technology, is the OLDEST SCIENTIFIC DEPARTMENT OF THE GOVT. OF INDIA. It was set up in 1767 and has evolved rich traditions over the years. In its assigned role as the nation’s Principal Mapping Agency, Survey of India bears a special responsibility to ensure that the country’s domain is explored and mapped suitably, provide base maps for expeditious and integrated development and ensure that all resources contribute with their full measure to the progress, prosperity and security of our country now and for generations to come. Survey of India publishes maps and the unrestricted category maps can be obtained at very reasonable prices from its several Geo-spatial data centers. Restricted category maps require due approval from government authorities. Many other rules govern the sale and use of Survey of India maps. Only an Indian citizen may purchase topographic maps and these may not be exported from India for any reason. The Survey of India acts as adviser to the Government of India on all survey matters, viz Geodesy, Photogrammetry, Mapping &amp; Map Reproduction.  Source: The Hindu",
        "_timestamp": "22-09-2019"
    },
    {
        "_id": "2",
        "_quest": "2nd Question",
        "_opt1": "1 only",
        "_opt2": "2 only",
        "_opt3": "Both 1 and 2",
        "_opt4": "Neither 1 nor 2",
        "_answer": "opt1",
        "_remark": "The National Survey and Mapping Organization of the country under the Department of Science &amp; Technology, is the OLDEST SCIENTIFIC DEPARTMENT OF THE GOVT. OF INDIA. It was set up in 1767 and has evolved rich traditions over the years. In its assigned role as the nation’s Principal Mapping Agency, Survey of India bears a special responsibility to ensure that the country’s domain is explored and mapped suitably, provide base maps for expeditious and integrated development and ensure that all resources contribute with their full measure to the progress, prosperity and security of our country now and for generations to come. Survey of India publishes maps and the unrestricted category maps can be obtained at very reasonable prices from its several Geo-spatial data centers. Restricted category maps require due approval from government authorities. Many other rules govern the sale and use of Survey of India maps. Only an Indian citizen may purchase topographic maps and these may not be exported from India for any reason. The Survey of India acts as adviser to the Government of India on all survey matters, viz Geodesy, Photogrammetry, Mapping &amp; Map Reproduction.  Source: The Hindu",
        "_timestamp": "22-09-2019"
    },
    {
        "_id": "3",
        "_quest": "3rd Question",
        "_opt1": "1 only",
        "_opt2": "2 only",
        "_opt3": "Both 1 and 2",
        "_opt4": "Neither 1 nor 2",
        "_answer": "opt1",
        "_remark": "The National Survey and Mapping Organization of the country under the Department of Science &amp; Technology, is the OLDEST SCIENTIFIC DEPARTMENT OF THE GOVT. OF INDIA. It was set up in 1767 and has evolved rich traditions over the years. In its assigned role as the nation’s Principal Mapping Agency, Survey of India bears a special responsibility to ensure that the country’s domain is explored and mapped suitably, provide base maps for expeditious and integrated development and ensure that all resources contribute with their full measure to the progress, prosperity and security of our country now and for generations to come. Survey of India publishes maps and the unrestricted category maps can be obtained at very reasonable prices from its several Geo-spatial data centers. Restricted category maps require due approval from government authorities. Many other rules govern the sale and use of Survey of India maps. Only an Indian citizen may purchase topographic maps and these may not be exported from India for any reason. The Survey of India acts as adviser to the Government of India on all survey matters, viz Geodesy, Photogrammetry, Mapping &amp; Map Reproduction.  Source: The Hindu",
        "_timestamp": "22-09-2019"
    },
    {
        "_id": "4",
        "_quest": "4th Question",
        "_opt1": "1 only",
        "_opt2": "2 only",
        "_opt3": "Both 1 and 2",
        "_opt4": "Neither 1 nor 2",
        "_answer": "opt1",
        "_remark": "The National Survey and Mapping Organization of the country under the Department of Science &amp; Technology, is the OLDEST SCIENTIFIC DEPARTMENT OF THE GOVT. OF INDIA. It was set up in 1767 and has evolved rich traditions over the years. In its assigned role as the nation’s Principal Mapping Agency, Survey of India bears a special responsibility to ensure that the country’s domain is explored and mapped suitably, provide base maps for expeditious and integrated development and ensure that all resources contribute with their full measure to the progress, prosperity and security of our country now and for generations to come. Survey of India publishes maps and the unrestricted category maps can be obtained at very reasonable prices from its several Geo-spatial data centers. Restricted category maps require due approval from government authorities. Many other rules govern the sale and use of Survey of India maps. Only an Indian citizen may purchase topographic maps and these may not be exported from India for any reason. The Survey of India acts as adviser to the Government of India on all survey matters, viz Geodesy, Photogrammetry, Mapping &amp; Map Reproduction.  Source: The Hindu",
        "_timestamp": "22-09-2019"
    }
]
UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const QuizScreen = ({
    navigation,
    dailyQuizRequest,
    netConnected,
    testSubmitRequest,
    sId,
    stopLoading
}) => {
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [isTestStarted, updateIsTestStarted] = useState(false)

    const [showDate, updateShowDate] = useState(false)
    const [date, updateDate] = useState(moment(new Date()).format("yyyy-MM-DD"))
    const [headerDate, updateHeaderDate] = useState(moment(new Date()).format("DD MMM"))

    const [selectedDate, updateSelectedDate] = useState(new Date())
    const [resetTimer, updateResetTimer] = useState(false)
    const [answersList, updateAnswersList] = useState([])
    const [testSubmitSuccess, updatetTestSubmitSuccess] = useState(false)
    const [exiting, updateExiting] = useState(false)
    const [resultObj, updateResultObj] = useState(null)
    const [showFilterModal, updateShowFilterModal] = useState(false)
    const [answersListObj, updateAnswersListObj] = useState([])
    const childRef = useRef();
    const selectDate = (date) => {
        console.log("date", date)
        updateSelectedDate(date)
        let selectedDate = moment(date).format("yyyy-MM-DD")
        updateHeaderDate(moment(date).format("DD MMM"))
        updateDate(selectedDate)
    }
    const testStarted = (value) => {
        isTestStartedLocal = value
        updateIsTestStarted(value)
    }
    useEffect(() => { fetchData(true) }, [])
    const fetchData = (refresh = false) => {
        updateIsTestStarted(false)
        updateResetTimer(false)
        toggleLoading(!refresh);
        let payload = {
            netConnected,
            date,
            success: (response = []) => {
                console.log("response[0]", response)
                let timestamp = response && response.length && response[0]._timestamp
                updateSelectedDate(new Date(timestamp))
                updateDate(moment(new Date(timestamp)).format("yyyy-MM-DD"))
                updateHeaderDate(moment(new Date(timestamp)).format("DD MMM"))

                console.log("response daily", response[0]?._questions.length)
                updateResetTimer(true)
                dataLocal = response && response.length && response[0]?._questions.map(obj => ({ ...obj }));
                updateData(response && response.length && response[0]?._questions)
                toggleLoading(false);
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                toggleLoading(false);
            }
        }
        dailyQuizRequest(payload)
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
    const submitDateChange = () => {
        if (isTestStarted) {
            Alert.alert(
                'Exit Test',
                'If you exit the test will be submitted',
                [
                    {
                        text: 'Yes',
                        onPress: () => {
                            submitTest(true)
                            // submitTest()
                            fetchData(true)
                            updateShowDate(false)
                        }
                    },
                    {
                        text: 'No',
                        style: 'cancel',
                    },
                ],
                { cancelable: false },
            );
        }
        else {
            fetchData(true)
            updateShowDate(false)
        }
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

                            console.log("hereee")
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
            // navigation.goBack()
        }
    }

    const submitTest = (showModal) => {
        // navigation.goBack()
        let answers = answersList && answersList.length ? answersList : answersKeysLocal
        let updatedAnswerList = mergeArrays(data && data.length ? data : dataLocal, answers)
        toggleLoading(true);
        let json = {
            sId: sId,
            date: date,
            answers: updatedAnswerList
        }
        let payload = {
            netConnected,
            json,
            success: (response) => {
                console.log("result   responseresponse", response)
                updateResultObj(response)
                if (!showModal) {
                    updatetTestSubmitSuccess(true)
                }
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
        answersKeysLocal = answersList.map(obj => ({ ...obj }));

        updateAnswersListObj(answersKeys)
        updateAnswersList(answersList)

    }
    const resultTable = () => {

    }
    const _toggleFilterModal = () => {
        updateShowFilterModal(showFilterModal => !showFilterModal)
    }
    const goToQuestion = (index) => {
        childRef.current.goToQuestion(index)
    }
    // console.log("answersListObj =======", answersListObj)
    return (
        <ScreenHOC
            headerTitle={'Daily MCQ'}
            showHeader
            showBackIcon
            onBackPress={exitTest}
            headerRight={ICONS.CALENDAR}
            onRightPress={() => updateShowDate(true)}
            bottomSafeArea
            rightText={headerDate}
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
                    date={moment(selectedDate).format("DD MMMM yyyy")}
                    name={"MCQs"}
                    data={resultObj.results}
                    resultObj={resultObj}
                    _toggleFilterModal={() => {
                        updatetTestSubmitSuccess(false)
                        navigation.goBack()
                    }}
                >

                </CustomModal>}

            {loading && !exiting ? <ActivityIndicator size={'large'} color={COLORS.GREY._2} />
                :
                data && data.length ?
                    <CustomMCQModal ref={childRef} submitTest={submitTest} answersListObj={answersListObj} updateAnswerList={updateAnswerList} testStarted={testStarted} resetTimer={resetTimer} questionsObj={data} />
                    : <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}><Text style={{ fontSize: isTablet() ? _scaleText(14).fontSize : _scaleText(12).fontSize }}>No quiz found for the selected date.</Text>
                        <Text style={{ fontSize: isTablet() ? _scaleText(14).fontSize : _scaleText(12).fontSize }}> Please select another date</Text></View>
            }

            {isTestStarted ?
                <CustomFloatButton
                    icon={ICONS.LIST(30)}
                    style={{ bottom: _scaleText(70).fontSize, zIndex: 10000000000 }}
                    onPress={_toggleFilterModal}
                /> : null}

            {showDate &&
                <CustomDatePicker
                    selectedDate={selectedDate}
                    closeDatePicker={() => updateShowDate(false)} selectDate={selectDate} doneClick={submitDateChange} />
            }
        </ScreenHOC >
    );
}

export default QuizScreen;


