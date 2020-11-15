import React, { useRef, useState, useEffect } from 'react';
import { Text, StyleSheet, View, Alert, TouchableOpacity } from 'react-native';
import { _scaleText, COLORS, TEXT_STYLES, ICONS, TEXT_CONST } from '../../../shared';
import { CustomTouchableIcon } from '../../';
import Menu from 'react-native-material-menu';
import { connect } from 'react-redux'

const FILTERS = TEXT_CONST.CURRENT_FRIENDS_FILTERS

const CustomHeader = ({
    container,
    left,
    onBackPress = () => { },
    right,
    showBackIcon,
    title,
    titleStyle,
    showMenuIcon,
    onRightPress = () => { },
    streamList,
    changeFilter,
    filterValue = "1",
    showFilter,
    rightText
}) => {
    const [selectedFilter, updateFilter] = useState("1");
    const [currentStream, updateStreamName] = useState(streamList[0]._name);
    useEffect(() => {
        let currentStreamName = streamList.filter((obj) => obj._id === filterValue)
        updateStreamName(currentStreamName[0]._name)
        updateFilter(filterValue)
    }, [
        filterValue
    ])
    let menuRef = useRef(null);
    const onPressMenuItem = (id) => {
        changeFilter(id)
        updateFilter(id);
        menuRef.current.hide();
    }
    const _renderFilterMenu = () => (
        <Menu
            ref={menuRef}
            button={<CustomTouchableIcon onPress={() => {
                console.log("here")
                menuRef.current.show()
            }} >
                {ICONS.FILTERS(20)}
            </CustomTouchableIcon>}
            style={{ marginTop: _scaleText(24).fontSize, }}
        >
            <View style={{ paddingHorizontal: 10, }}>
                {streamList.map((item, index) => {
                    // console.log("item", item)
                    let { _id, _name = '' } = item;
                    // console.log(_id, "selectedFilter", selectedFilter)
                    let selected = selectedFilter == _id;
                    return (<TouchableOpacity
                        key={index}
                        onPress={() => onPressMenuItem(_id)}
                        style={styles.menuItem}
                    >
                        {selected ? ICONS.CHECK_BOX_SELECTED(24) : ICONS.CHECK_BOX_DEFAULT(24)}
                        <Text style={styles.menuLabel(selected)}>{_name}</Text>
                    </TouchableOpacity>)
                })}
            </View>
        </Menu>
    )
    return (
        <View style={[styles.container, container]}>
            {showBackIcon && <CustomTouchableIcon
                onPress={onBackPress}
                style={styles.icon}
            >
                {ICONS.BACK(24)}

            </CustomTouchableIcon>}
            {showMenuIcon && <CustomTouchableIcon
                onPress={onBackPress}
                style={styles.icon}
            >
                {ICONS.MENU(20)}
            </CustomTouchableIcon>}

            {!!left && left}
            <Text numberOfLines={1} style={[styles.title, titleStyle]}>{title}</Text>
            {currentStream && <Text style={[styles.rightTitle, { textAlign: 'right' }]}>{currentStream}</Text>}
            {showFilter && _renderFilterMenu()}
            {rightText && <Text style={[styles.rightTitle, { textAlign: 'right' }]}>{rightText}</Text>}
            {right &&
                <CustomTouchableIcon
                    onPress={onRightPress}
                    style={styles.icon}
                >
                    {!!right && right}
                </CustomTouchableIcon>}
        </View>
    )
};
const mapStateToProps = state => {
    return {
        streamList: state.important.streamList,
    }
}

export default connect(mapStateToProps, null)(CustomHeader);

const styles = StyleSheet.create({
    menuItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: _scaleText(10).fontSize,
        borderBottomWidth: _scaleText(1).fontSize,
        borderColor: COLORS.GREY.LIGHT,
        width: _scaleText(200).fontSize
    },
    menuLabel: selected => ({
        color: selected ? COLORS.GREY._1 : COLORS.GREY._2,
        // marginLeft: _scaleText(8).fontSize,
        fontSize: _scaleText(10).fontSize,
    }),
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: _scaleText(16).fontSize,
        paddingVertical: _scaleText(16).fontSize,
        borderBottomWidth: _scaleText(1).fontSize,
        borderColor: COLORS.GREY.LIGHT,
        backgroundColor: COLORS.PRIMARY.PINK
    },
    icon: {
        marginLeft: _scaleText(8).fontSize,
        borderWidth: 0,
    },
    title: {
        paddingLeft: (_scaleText(20).fontSize),
        borderWidth: 0,
        fontSize: _scaleText(18).fontSize,
        lineHeight: _scaleText(27).fontSize,
        color: COLORS.WHITE,
        flex: 1
    },
    rightTitle: {
        fontSize: _scaleText(12).fontSize,
        color: COLORS.WHITE
    }
});