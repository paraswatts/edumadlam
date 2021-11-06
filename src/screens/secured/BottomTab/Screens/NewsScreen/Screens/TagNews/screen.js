import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, UIManager, FlatList, ActivityIndicator, RefreshControl, SafeAreaView, BackHandler, View, Dimensions } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ScreenHOC, EmptyDataUI, CustomDatePicker } from '../../../../../../../components';
import { COLORS, TEXT_CONST, _scaleText, _showCustomToast, ROUTES, ICONS } from '../../../../../../../shared';
import { CustomImage } from '../../../../../../../components/atoms';
import FastImage from 'react-native-fast-image';
import moment from 'moment'
import { isTablet } from 'react-native-device-info';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown'
import Feather from "react-native-vector-icons/Feather"

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const TagNews = ({
    navigation,
    netConnected,
    newsSubCatListRequest,
    route: { name, params: { _tagId, _name } = {} },
    stopLoading,
    tagSearchRequest
}) => {
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [refreshing, toggleRefreshing] = useState(true);
    const [showDate, updateShowDate] = useState(false)
    const [date, updateDate] = useState(moment(new Date()).format("yyyy-MM-DD"))
    const [selectedDate, updateSelectedDate] = useState(new Date())
    const [headerDate, updateHeaderDate] = useState(moment(new Date()).format("DD MMM"))
    const [currentTag, setCurrentTag] = useState({ _tagId: _tagId, _name: _name })
    const [loadingTag, setLoadingTag] = useState(false)
    const [suggestionsList, setSuggestionsList] = useState(null)
    const [selectedItem, setSelectedItem] = useState(null)
    const [searched, setSearched] = useState(false)

    const dropdownController = useRef(null)

    const searchRef = useRef(null)

    const getSuggestions = useCallback(async (q) => {
        console.log("getSuggestions", q)
        if (typeof q !== "string" || q.length < 3) {
            setSuggestionsList(null)
            return
        }
        setLoadingTag(true)
        let payload = {
            netConnected,
            searchTerm: q,
            success: (response = []) => {
                setLoadingTag(false)
                const suggestions = response.map((item) => ({
                    id: item._id,
                    title: item._name
                }))
                setSuggestionsList(suggestions)
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                setLoadingTag(false);
            }
        }
        tagSearchRequest(payload)
    }, [])
    const onOpenSuggestionsList = useCallback((isOpened) => { }, [])


    const onClearPress = useCallback(() => {
        setCurrentTag({ _tagId: _tagId, _name: _name })
        setSuggestionsList(null)
    }, [])


    const selectDate = (date) => {
        setCurrentTag(null)
        updateSelectedDate(date)
        let selectedDate = moment(date).format("yyyy-MM-DD")
        updateHeaderDate(moment(date).format("DD MMM"))
        updateDate(selectedDate)
    }

    useEffect(() => {
        fetchData(true, date)
        const handler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleValidateClose
        );
        return () => {
            toggleRefreshing(false);
            toggleLoading(false);
            handler.remove();
            // stopLoading();
        }
    }, []);
    const handleValidateClose = () => {
        /* Here is empty */
        stopLoading();
    };
    const fetchData = (refresh = false) => {
        toggleLoading(!refresh);
        toggleRefreshing(false);
        console.log("_tagId", _tagId)
        let payload = {
            netConnected,
            tagId: _tagId,
            onlyTag: true,
            success: (response = []) => {
                console.log("response news", response)
                updateData([...response])
                toggleLoading(false);
                toggleRefreshing(false);
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                toggleLoading(false);
                toggleRefreshing(false);
            }
        }
        if (currentTag?._tagId) {
            payload['tagId'] = currentTag?._tagId
        }
        console.log("payload", payload)
        newsSubCatListRequest(payload)
    }

    useEffect(() => {
        console.log("currentTag", currentTag)
        fetchData(true, date)
    }, [JSON.stringify(currentTag)])

    const _renderListEmptyComponent = () => (<EmptyDataUI
        title={TEXT_CONST.NO_DATA_FOUND}
    // subTitle1={TEXT_CONST.NO_USER_FOUND_WITH_THIS_NAME}
    />)

    const setTag = (tagObj, topTag) => {
        setSearched(false)
        setSuggestionsList(null)
        if (topTag) {
            setCurrentTag({ _tagId: _tagId, _name: _name })
        } else {
            setCurrentTag(tagObj)
        }
    }

    const TagView = ({ tagObj, topTag, addMargin }) => {
        console.log("tagObj", tagObj)
        return (

            <TouchableOpacity
                style={{
                    marginRight: topTag ? 0 : 10,
                    borderRadius: 5, backgroundColor: '#4284df', marginHorizontal: topTag ? 10 : 0,
                    marginTop: topTag ? 10 : 0,
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                    flexDirection: "row",
                    alignSelf: "flex-start",
                    alignItems: 'center'
                }}
                onPress={() => setTag(tagObj, topTag)} >
                <Text style={{ color: 'white' }}>
                    {tagObj._name}
                </Text>
                {topTag && ICONS.CLOSE_WHITE(24)}
            </TouchableOpacity>
        )
    }

    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHT, }}
            headerTitle={_name}
            showHeader
            showBackIcon
            onBackPress={navigation.goBack}
            // headerRight={ICONS.CALENDAR}
            onRightPress={() => updateShowDate(true)}
        // rightText={headerDate}
        >
            {showDate &&
                <CustomDatePicker
                    selectedDate={selectedDate}
                    closeDatePicker={() => updateShowDate(false)} selectDate={selectDate} doneClick={() => {
                        fetchData(true, date)
                        updateShowDate(false)
                    }} />
            }
            <AutocompleteDropdown
                ref={searchRef}
                controller={(controller) => {
                    dropdownController.current = controller
                }}
                // initialValue={'1'}
                direction={Platform.select({ ios: "down" })}
                dataSet={suggestionsList}
                onChangeText={getSuggestions}
                onSelectItem={(item) => {
                    console.log("item====", item)
                    let tagObj = {
                        _tagId: item?.id,
                        _name: item?.title
                    }
                    setSearched(true)
                    setCurrentTag(tagObj)
                    item && setSelectedItem(item?.id)
                }}
                debounce={600}
                suggestionsListMaxHeight={Dimensions.get("window").height * 0.4}
                onClear={onClearPress}
                //  onSubmit={(e) => onSubmitSearch(e.nativeEvent.text)}
                onOpenSuggestionsList={onOpenSuggestionsList}
                loading={loadingTag}
                useFilter={false} // prevent rerender twice
                textInputProps={{
                    placeholder: "Search tags",
                    autoCorrect: false,
                    autoCapitalize: "none",
                    style: {
                        borderRadius: 5,
                        paddingLeft: 18,
                        borderWidth: 1,
                        backgroundColor: 'white'
                    }
                }}
                rightButtonsContainerStyle={{
                    borderRadius: 25,
                    right: 8,
                    height: 30,
                    top: 10,
                    alignSelfs: "center",
                    backgroundColor: 'transparent'
                }}
                inputContainerStyle={{
                    backgroundColor: "transparent",
                    marginHorizontal: 10,
                    marginTop: 10
                }}
                suggestionsListContainerStyle={{
                    marginHorizontal: 10,
                    width: 'auto'
                }}
                // containerStyle={{ flexGrow: 1, flexShrink: 1 }}
                renderItem={(item, text) => (
                    <Text style={{ padding: 15 }}>{item.title}</Text>
                )}
                // ChevronIconComponent={
                //     <Feather name="x-circle" size={18} color="#383b42" />
                // }
                ClearIconComponent={
                    <Feather name="x-circle" size={20} color="#383b42" />
                }
                inputHeight={50}
                showChevron={false}
                showClear={true}
            />
            <View>
                {currentTag && !searched ? <TagView tagObj={currentTag} topTag={true} /> : null}
            </View>

            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                extraData={data}
                keyExtractor={(item, index) => item._id + ''}
                ListEmptyComponent={!refreshing && _renderListEmptyComponent()}
                ListFooterComponent={loading && <ActivityIndicator size={'large'} color={COLORS.GREY._2} />}
                numColumns={isTablet() ? 2 : 1}
                refreshControl={<RefreshControl
                    colors={[COLORS.GREY._2]}
                    onRefresh={() => {
                        // fetchData(true)
                        setCurrentTag({ _tagId: _tagId, _name: _name })
                    }}
                    refreshing={refreshing}
                    tintColor={COLORS.GREY._2}
                    title={TEXT_CONST.PULL_TO_REFRESH}
                    titleColor={COLORS.GREY._2}
                />}
                style={{ marginVertical: 5 }}
                renderItem={({ item, index }) => {
                    console.log("item", item)
                    let { _id, _heading, _imgUrl, _timestamp, _link, _tags } = item;
                    console.log('tags && _tags !== "" && _tags.length', _tags)
                    return (
                        <View style={{
                            flex: 1,
                            shadowColor: '#b2b2b2',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            shadowRadius: 1, borderRadius: 10, marginHorizontal: 10, marginVertical: 5, padding: 20, elevation: 5, backgroundColor: COLORS.WHITE
                        }}>
                            <TouchableOpacity
                                onPress={() => {
                                    console.log("navigate detail news")
                                    navigation.navigate(ROUTES.NEWS.DETAIL, { _id: _id, _heading: _heading })
                                }}
                            >
                                <FastImage
                                    style={{ height: 150 }}
                                    resizeMode={'contain'}
                                    source={{ uri: _imgUrl }}
                                />
                                <View style={{ marginTop: 10, flexDirection: 'row', justifyContent: 'space-between' }}>
                                    <Text style={{ includeFontPadding: false, color: COLORS.BLUE_FONT, fontWeight: '500', fontSize: _scaleText(14).fontSize, flex: 1, marginRight: 10 }}>{_heading}</Text>
                                    <Text style={{ includeFontPadding: false, color: COLORS.BLUE_FONT, textAlign: 'right', fontSize: _scaleText(10).fontSize }}>{_timestamp}</Text>
                                </View>
                            </TouchableOpacity>
                            <View style={{ flexDirection: 'row', marginTop: 10 }}>{_tags && _tags.length ? _tags.map((obj, index) => (
                                <TagView key={index.toString()} tagObj={obj} />
                            )) : null}
                            </View>
                        </View>
                    )
                }}
            />
            <SafeAreaView style={{ backgroundColor: 'white', }} />
        </ScreenHOC>
    );
}

export default TagNews;