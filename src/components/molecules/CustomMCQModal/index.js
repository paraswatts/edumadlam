import React, { useState, useRef } from 'react';
import { Text, UIManager, View, StyleSheet, Dimensions, SafeAreaView, ScrollView, Alert, FlatList } from 'react-native';
import { ScreenHOC, CustomButton } from '../../';
import { COLORS, ICONS, _scaleText, TEXT_CONST } from '../../../shared';
import styles from './styles';
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
const CustomMCQModal = ({
    questionsObj
}) => {
    console.log("questionsObj", questionsObj)
    const [activeView, updateActiveView] = useState(0);
    const [option, updateOption] = useState(null);
    const questionsRef = useRef();

    const [showDate, updateShowDate] = useState(false)
    const selectDate = (date) => {
        console.log("hete", date)
    }
    let _disabled = (index = '') => {

        return true

    };
    const onPressOption = (option, questionIndex) => {
        console.log("questionIndex", questionIndex)
        if (questionIndex < questionsObj.length - 1) {
            updateOption(option)
            setTimeout(() => {
                updateOption(null)
                questionsRef.current.scrollToIndex({ index: questionIndex + 1, animated: true })
            }, 500)
        }
        else {
            updateOption(option)
        }

    }
    const renderQuestionitem = ({ item, index }) => {
        let obj = item
        return (
            <ScrollView key={index} style={[styles.child, { borderWidth: 0 }]} showsVerticalScrollIndicator={false}>
                <View style={{
                    margin: _scaleText(10).fontSize, borderRadius: 5,
                    borderColor: '#e2e2e2',
                    borderWidth: 0.5,
                }}>
                    <View style={{ height: _scaleText(40).fontSize, backgroundColor: COLORS.GREY.LIGHT, justifyContent: 'center', paddingHorizontal: _scaleText(10).fontSize }}>
                        <Text style={{ fontSize: _scaleText(15).fontSize, fontWeight: 'bold' }}>{'Q.' + (index + 1)}</Text>
                    </View>
                    <View style={{ padding: _scaleText(10).fontSize, }}>
                        <Text style={{ fontSize: _scaleText(15).fontSize, fontWeight: 'bold' }}>{obj._quest}</Text>
                        <Text style={{ fontSize: _scaleText(12).fontSize, }}>{obj._remark}</Text>

                        <View style={{ borderWidth: 0, }}>
                            <CustomButton
                                left={<MaterialCommunityIcons name={option === '_opt1' ? "checkbox-marked-circle" : "checkbox-blank-circle"}
                                    color={option === '_opt1' ? COLORS.GREEN : '#c2c2c2'} size={20} />}
                                container={{ borderColor: 'black', borderWidth: 0.5, borderRadius: 2, marginVertical: _scaleText(10).fontSize }}
                                label={obj._opt1}
                                labelStyle={{ color: 'black', marginLeft: _scaleText(10).fontSize }}
                                onPress={() => onPressOption('_opt1', index)}

                            />
                            <CustomButton
                                left={<MaterialCommunityIcons name={option === '_opt2' ? "checkbox-marked-circle" : "checkbox-blank-circle"}
                                    color={option === '_opt2' ? COLORS.GREEN : '#c2c2c2'} size={20} />}
                                container={{ borderColor: 'black', borderWidth: 0.5, borderRadius: 2, marginVertical: _scaleText(10).fontSize }}
                                label={obj._opt2}
                                labelStyle={{ color: 'black', marginLeft: _scaleText(10).fontSize }}
                                onPress={() => onPressOption('_opt2', index)}
                            />

                            <CustomButton
                                left={<MaterialCommunityIcons name={option === '_opt3' ? "checkbox-marked-circle" : "checkbox-blank-circle"}
                                    color={option === '_opt3' ? COLORS.GREEN : '#c2c2c2'} size={20} />}
                                container={{ borderColor: 'black', borderWidth: 0.5, borderRadius: 2, marginVertical: _scaleText(10).fontSize }}
                                label={obj._opt3}
                                labelStyle={{ color: 'black', marginLeft: _scaleText(10).fontSize }}
                                onPress={() => onPressOption('_opt3', index)}

                            />
                            <CustomButton
                                left={<MaterialCommunityIcons name={option === '_opt4' ? "checkbox-marked-circle" : "checkbox-blank-circle"}
                                    color={option === '_opt4' ? COLORS.GREEN : '#c2c2c2'} size={20} />}
                                container={{ borderColor: 'black', borderWidth: 0.5, borderRadius: 2, marginVertical: _scaleText(10).fontSize }}
                                label={obj._opt4}
                                labelStyle={{ color: 'black', marginLeft: _scaleText(10).fontSize }}
                                onPress={() => onPressOption('_opt4', index)}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView >
        )
    }
    return (
        <View style={{ borderWidth: 0, flex: 1 }}>
            <FlatList
                showsHorizontalScrollIndicator={false}
                scrollEnabled={false}
                horizontal
                pagingEnabled
                data={questionsObj}
                disableGesture
                ref={questionsRef}
                renderItem={renderQuestionitem}
            /></View>
    );
}

export default CustomMCQModal;
