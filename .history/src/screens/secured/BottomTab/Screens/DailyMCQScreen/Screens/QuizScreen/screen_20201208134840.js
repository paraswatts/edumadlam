import React, { useState, useEffect } from 'react';
import { Text, UIManager, View, StyleSheet, ActivityIndicator, Dimensions, SafeAreaView, ScrollView, Alert, FlatList } from 'react-native';
import { ScreenHOC, CustomButton, CustomDatePicker, CustomMCQModal, CustomModal } from '../../../../../../../components';
import { COLORS, ICONS, _scaleText, TEXT_CONST } from '../../../../../../../shared';
import styles from './styles';
import { isTablet } from 'react-native-device-info';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import moment from 'moment'
export const { width, height } = Dimensions.get('window');
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
    sId
}) => {
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [isTestStarted, updateIsTestStarted] = useState(false)

    const [showDate, updateShowDate] = useState(false)
    const [date, updateDate] = useState(moment(new Date()).format("DD-MM-yyyy"))
    const [headerDate, updateHeaderDate] = useState(moment(new Date()).format("DD MMM"))

    const [selectedDate, updateSelectedDate] = useState(new Date())
    const [resetTimer, updateResetTimer] = useState(false)
    const [answersList, updateAnswersList] = useState([])
    const [testSubmitSuccess, updatetTestSubmitSuccess] = useState(false)
    const [exiting, updateExiting] = useState(false)

    const selectDate = (date) => {
        updateSelectedDate(date)
        let selectedDate = moment(date).format("DD-MM-yyyy")
        updateHeaderDate(moment(date).format("DD MMM"))
        updateDate(selectedDate)
    }
    const testStarted = (value) => {
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
                updateResetTimer(true)
                console.log("response", response)
                updateData([...response])
                toggleLoading(false);
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                toggleLoading(false);
            }
        }
        dailyQuizRequest(payload)
    }

    const submitDateChange = () => {
        if (isTestStarted) {
            Alert.alert(
                'Exit Test',
                'If you exit the test will be submitted',
                [
                    {
                        text: 'Yes',
                        onPress: () => {
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

    const submitTest = () => {
        toggleLoading(true);
        let json = {
            sId: sId,
            id: 10,
            answers: answersList
        }
        console.log("json")
        let payload = {
            netConnected,
            json,
            answersList: answersList,
            success: (response = []) => {
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

    const updateAnswerList = (answersList) => {
        console.log("answersList", answersList)
        updateAnswersList(answersList)
    }
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
            {!!testSubmitSuccess && !exiting &&
                <CustomModal
                    onButtonPress={() => {
                        updatetTestSubmitSuccess(false)
                        navigation.goBack()
                    }}
                    buttonLabel={TEXT_CONST.OK}
                >
                    <Text>{TEXT_CONST.TEST_SUBMITTED}</Text>
                </CustomModal>}
            { loading && !exiting ? <ActivityIndicator size={'large'} color={COLORS.GREY._2} />
                : <CustomMCQModal submitTest={submitTest} updateAnswerList={updateAnswerList} testStarted={testStarted} resetTimer={resetTimer} questionsObj={data} />}
            {showDate &&
                <CustomDatePicker
                    selectedDate={selectedDate}
                    closeDatePicker={() => updateShowDate(false)} selectDate={selectDate} doneClick={submitDateChange} />
            }
        </ScreenHOC >
    );
}

export default QuizScreen;


