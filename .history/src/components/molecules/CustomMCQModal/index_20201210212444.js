import React, { useState, useRef, useEffect, useImperativeHandle, forwardRef } from 'react';
import { Text, UIManager, View, StyleSheet, Dimensions, SafeAreaView, ScrollView, Alert, FlatList } from 'react-native';
import { ScreenHOC, CustomButton } from '../../';
import { COLORS, ICONS, _scaleText, TEXT_CONST, TEXT_STYLES, pad } from '../../../shared';
import styles from './styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import FastImage from 'react-native-fast-image';
import HTMLView from 'react-native-htmlview';
import { BlurView, VibrancyView } from "@react-native-community/blur";

export const { width, height } = Dimensions.get('window');

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const CustomMCQModal = forwardRef(({
    questionsObj,
    _testDuration = 120 * 60,
    resetTimer,
    testStarted,
    updateAnswerList,
    submitTest
}, ref) => {
    const [option, updateOption] = useState(null);
    const [time, setTime] = useState({ h: 0, m: 0, s: 0 })
    const questionsRef = useRef();
    const foo = useRef();
    const [seconds, setSeconds] = useState(_testDuration * 60);
    const [isTestStarted, updateIsTestStarted] = useState(false)
    const [answersList, updateAnswersList] = useState([])
    const [answersListObj, updateAnswersListObj] = useState([])
    useEffect(() => {
        let array = []
        questionsObj.map((obj) => array.push({ qId: obj._id, answer: false, _quest: obj._quest }))
        console.log("array", array)
        updateAnswerList(answersList, array)
        updateAnswersListObj(array)

    }, [questionsObj])
    useEffect(() => {
        if (resetTimer) {
            updateOption(null)
            setSeconds(_testDuration)
            clearInterval(foo.current)
            updateIsTestStarted(false)
        }
    }, [resetTimer]);
    useEffect(() => {
        if (seconds === 0) {
            setTime(secondsToTime(seconds * 60))
            clearInterval(foo.current);
            submitTest(answersList)
        }
        else {
            setTime(secondsToTime(seconds))
        }
    }, [seconds])

    useEffect(() => {
        return () => {
            clearInterval(foo.current)
        }
    }, [])

    useEffect(() => {
        updateAnswerList(answersList, answersListObj)
    }, [answersList])
    const secondsToTime = (secs) => {
        let hours = Math.floor(secs / (60 * 60));

        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);

        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);

        let obj = {
            "h": hours,
            "m": minutes,
            "s": seconds
        };
        return obj;
    }

    const onPressOption = (option, questionIndex, _id, _quest) => {
        if (questionIndex === questionsObj.length - 1 && questionsObj.length > 1) {
            setTimeout(() => {
                if (questionsRef && questionsRef.current)
                    questionsRef.current.scrollToIndex({ index: 0, animated: true })
            }, 200)
        } else {
            let optionIndex = answersList.findIndex((answerObj) => answerObj.qId === _id)
            console.log(answersList, "optionIndex", optionIndex)
            updateAnswersListObj(answersListObj.map(x => {
                if (x.qId !== _id) return x
                return { ...x, answer: option }
            }))
            if (optionIndex === -1) {
                updateAnswersList(answersList => [...answersList, { qId: _id, answer: option }])
            }
            else {
                updateAnswersList(answersList.map((o) => {
                    if (o._id === _id) return { qId: o._id, answer: option }
                    return o;
                }));


            }
            if (questionIndex < questionsObj.length - 1) {
                updateOption(option)
                setTimeout(() => {
                    updateOption(null)
                    if (questionsRef && questionsRef.current)
                        questionsRef.current.scrollToIndex({ index: questionIndex + 1, animated: true })
                }, 200)
            }
            else {
                updateOption(option)
            }
        }

    }


    const renderOption = (buttonLabel, buttonOption, index, buttonStyles, _id, _quest) => {
        // console.log("buttonOption", buttonOption)
        let selectedIndex = answersList && answersList.length && answersList.findIndex((answerObj) => answerObj.qId === _id)
        let answer = answersList && answersList.length && selectedIndex >= 0 && answersList[selectedIndex].answer
        //option === buttonOption 
        return (<CustomButton
            left={<MaterialCommunityIcons name={selectedIndex >= 0 && answer === buttonOption ? "checkbox-marked-circle" : "checkbox-blank-circle"}
                color={selectedIndex >= 0 && answer === buttonOption ? COLORS.GREEN : '#c2c2c2'} size={20} />}
            container={buttonStyles}
            label={buttonLabel}
            labelStyle={styles.optionLabel}
            onPress={() => onPressOption(buttonOption, index, _id, _quest)}

        />)
    }

    const onSubmitTest = () => {
        submitTest(answersList)
    }

    const renderQuestionitem = ({ item, index }) => {
        const { _imgUrl, _quest, _opt1, _opt2, _opt3, _opt4, _remark, _id } = item
        // console.log("_quest", questionsObj.length)
        return (
            <View >
                <ScrollView key={_id} style={[styles.child]} showsVerticalScrollIndicator={false}>
                    <View style={styles.innerContainer}>
                        <View style={styles.questionHeader}>
                            <Text style={styles.headerText}>{'Q.' + (index + 1)}/<Text style={{ fontWeight: 'normal', fontSize: _scaleText(13).fontSize }}>{questionsObj.length}</Text></Text>
                        </View>
                        {!!_imgUrl && <FastImage
                            style={styles.optionImage}
                            resizeMode={'contain'}
                            source={{ uri: _imgUrl }}
                        />}
                        <View style={styles.htmlContainer}>
                            <HTMLView value={_quest.replace(/(\r\n|\n|\r)/gm, "")} />
                        </View>
                        <View style={styles.optionsContainer}>
                            {_remark ? <Text style={styles.remarkText}>{_remark}</Text> : null}
                            <View style={{ borderWidth: 0, }}>
                                {renderOption(_opt1, '_opt1', index, [styles.optionButton], _id, _quest)}
                                {renderOption(_opt2, '_opt2', index, [styles.optionButton, styles.buttonTop], _id, _quest)}
                                {renderOption(_opt3, '_opt3', index, [styles.optionButton, styles.buttonTop], _id, _quest)}
                                {renderOption(_opt4, '_opt4', index, [styles.optionButton, styles.buttonTop], _id, _quest)}
                            </View>
                        </View>
                    </View>
                </ScrollView >
            </View>
        )
    }

    const startTest = () => {
        clearInterval(foo.current)
        testStarted(true)
        updateIsTestStarted(true)
        function tick() {
            setSeconds(prevSeconds => prevSeconds - 1)
        }
        foo.current = setInterval(() => tick(), 1000)
    }
    return (
        <View style={[TEXT_STYLES.FLEX, { borderWidth: 0 }]}>
            {isTestStarted &&
                <View style={styles.timerContainer}>
                    <View style={styles.timer}>
                        <Text>
                            {TEXT_CONST.TIME_LEFT}
                        </Text>
                        <Text>
                            {pad(time.h)}:{pad(time.m)}:{pad(time.s)}
                        </Text>
                    </View>
                    <View style={styles.buttonContainer}>
                        <CustomButton onPress={onSubmitTest} label={TEXT_CONST.SUBMIT} labelSize={_scaleText(12).fontSize} labelStyle={styles.buttonText} container={styles.submitButton}></CustomButton>
                    </View>
                </View>}

            <FlatList
                keyExtractor={(item, index) => item._id + '' + index}
                initialScrollIndex={0}
                initialNumToRender={1}
                showsHorizontalScrollIndicator={false}
                scrollEnabled={true}
                horizontal
                pagingEnabled
                data={questionsObj}
                extraData={questionsObj}
                disableGesture
                ref={questionsRef}
                renderItem={(item) => renderQuestionitem(item)}
            />
            {!isTestStarted &&
                <View blurRadius={1} style={{ alignItems: 'center', justifyContent: 'center', borderWidth: 0, borderColor: 'red', flex: 1, position: 'absolute', bottom: 0, right: 0, top: 0, left: 0, zIndex: 9999999 }}>
                    <BlurView
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            bottom: 0,
                            right: 0
                        }}
                        blurType="light"
                        blurAmount={10}
                        reducedTransparencyFallbackColor="white"
                    />
                    <CustomButton onPress={startTest} label={TEXT_CONST.START_TEST} labelSize={_scaleText(14).fontSize} labelStyle={styles.buttonText} container={styles.startButton}></CustomButton>
                </View>}

        </View >
    );
})

export default CustomMCQModal;

