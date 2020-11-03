import React, { useState, useRef } from 'react';
import { Text, UIManager, View, StyleSheet, Dimensions, SafeAreaView, ScrollView, Alert, FlatList } from 'react-native';
import { ScreenHOC, CustomButton, CustomDatePicker, CustomMCQModal } from '../../../../../../../components';
import { COLORS, ICONS, _scaleText, TEXT_CONST } from '../../../../../../../shared';
import styles from './styles';
import { isTablet } from 'react-native-device-info';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
    navigation
}) => {
    const [showDate, updateShowDate] = useState(false)
    const selectDate = (date) => {
        console.log("hete", date)
    }
    return (
        <ScreenHOC
            headerTitle={'Daily MCQ'}
            showHeader
            showMenuIcon
            onBackPress={navigation.toggleDrawer}
            headerRight={ICONS.CALENDAR}
            onRightPress={() => updateShowDate(true)}
        >

            <CustomMCQModal questionsObj={questionsObj} />
            {
                showDate &&
                <CustomDatePicker closeDatePicker={() => updateShowDate(false)} selectDate={selectDate} />
            }
        </ScreenHOC >
    );
}

export default QuizScreen;
