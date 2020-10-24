import React, { memo, useEffect, useRef } from 'react';
import { FlatList, Text, StyleSheet, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { COLORS, _scaleText } from '../../../shared';

const IOSPicker = ({
    data = [],
    onScrollBeginDrag = () => { },
    onScrollEndDrag = () => { },
    onValueChange = () => { },
    style,
    refs = () => { },
    scrollEnabled = true,
    value,
}) => {
    let listRef = useRef(null);
    useEffect(() => {
        refs(listRef.current);
    }, [data])
    useEffect(() => {
        let index = [' ', ...data].findIndex(item => item == value + '');
        index > 0 && listRef.current.scrollToIndex({ animated: false, index: (index - 1) })
    }, [data])
    return (
        <View style={style}>
            <View style={{ marginHorizontal: _scaleText(10).fontSize, left: 0, right: 0, top: _scaleText(47).fontSize, position: 'absolute', height: _scaleText(1).fontSize, backgroundColor: COLORS.GREY.LIGHT, }} />
            <View style={{ marginHorizontal: _scaleText(10).fontSize, left: 0, right: 0, bottom: _scaleText(47).fontSize, position: 'absolute', height: _scaleText(1).fontSize, backgroundColor: COLORS.GREY.LIGHT, }} />
            <FlatList
                data={['', ...data, '']}
                keyExtractor={(item, index) => item + '' + index}
                onScrollBeginDrag={onScrollBeginDrag}
                scrollEnabled={scrollEnabled}
                onScrollToIndexFailed={() => { }}
                ref={listRef}
                onScrollEndDrag={({ nativeEvent }) => {
                    let { velocity, contentOffset: { y } } = nativeEvent;
                    if (!velocity.y) {
                        let index = (Math.round(y / _scaleText(47).fontSize));
                        let arr = [' ', ...data, '']
                        index >= 0 && onValueChange(arr[index + 1])
                    }
                    onScrollEndDrag(nativeEvent)
                }}
                showsVerticalScrollIndicator={false}
                style={{ height: _scaleText(141).fontSize }}
                onMomentumScrollEnd={({ nativeEvent: { contentOffset: { y } } }) => {
                    let index = (Math.round(y / _scaleText(47).fontSize));
                    let arr = [' ', ...data, '']
                    index >= 0 && onValueChange(arr[index + 1])
                }}
                renderItem={({ item, index }) => {
                    return (<TouchableOpacity
                        activeOpacity={0.8}
                        disabled={!item || !scrollEnabled}
                        onPress={() => onValueChange(item)}
                        style={{ height: _scaleText(47).fontSize, justifyContent: 'center', alignItems: 'center', }}
                    >
                        <Text
                            style={{
                                // backgroundColor: 'red',
                                color: value == item ? COLORS.PRIMARY.PINK : COLORS.GREY.MEDIUM,
                                fontSize: _scaleText(16).fontSize,
                            }}>{item}</Text>
                    </TouchableOpacity>)
                }}
            />
        </View>
    );
}
export default memo(IOSPicker);

const styles = StyleSheet.create({
    item: {

        fontSize: 1,
        // backgroundColor: 'red',
    }
});