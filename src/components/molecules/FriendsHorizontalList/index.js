import React from 'react';
import { Text, View, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { BASE_URL, TEXT_CONST, ICONS, COLORS, push, ROUTES } from '../../../shared';
import { CustomButton, CustomTouchableIcon, CustomImage } from '../../atoms';
import styles from './styles';
const FriendsHorizontalList = ({
    data = [],
    hideCloseIcon,
    loaderKey = 'user_id',
    loaders = {},
    onButtonPress = () => { },
    onClosePress = () => { },
    onViewAll = () => { },
    showButton = true,
    showsHorizontalScrollIndicator,
    showViewAll = true,
}) => {
    let clicked = false;
    const onPressProfile = (user_id, item) => {
        !clicked && push(ROUTES.MY_PROFILE, { user_id, data: { ...item } })
        clicked = true;
        setTimeout(() => { clicked = false }, 300);
    }
    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={styles.listContainer}
                data={[...data]}
                extraData={data}
                horizontal
                keyExtractor={(item, index) => item.user_id + ''}
                showsHorizontalScrollIndicator={!!showsHorizontalScrollIndicator}
                renderItem={({ item, index }) => {
                    let { user_id, is_favorite, request_friend_id, isRequested = false, display_name, photo_id, mutual_friends = 0 } = item;
                    return (<>
                        <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={() => onPressProfile(user_id, item)}
                            style={styles.itemContainer}
                        >
                            <CustomImage
                                profileFav={!!is_favorite}
                                style={styles.image}
                                uri={photo_id ? (BASE_URL + '/pp/' + photo_id) : ''}
                            />

                            <Text numberOfLines={1} style={styles.name}>{display_name}</Text>
                            <Text numberOfLines={1} style={styles.mutual}>{mutual_friends ? mutual_friends : 0} {TEXT_CONST._MUTUAL_FRIENDS}</Text>
                            {loaders[item[loaderKey]] ? <ActivityIndicator
                                color={COLORS.PRIMARY.PINK}
                            /> : showButton && <CustomButton
                                container={isRequested && styles.button}
                                disabled={!!isRequested}
                                label={isRequested ? TEXT_CONST.REQUEST_SENT : request_friend_id ? TEXT_CONST.ACCEPT : TEXT_CONST.ADD_FRIEND}
                                labelStyle={isRequested && styles.buttonLabel}
                                onPress={() => onButtonPress(item)}
                            >
                                {!!isRequested && ICONS.REQUEST_SENT(24)}
                            </CustomButton>}
                            {!hideCloseIcon && <CustomTouchableIcon onPress={() => onClosePress(item)} style={styles.iconContainer}>
                                {ICONS.CLOSE(22)}
                            </CustomTouchableIcon>}
                        </TouchableOpacity>
                        {(index == data.length - 1 && showViewAll) && <TouchableOpacity
                            activeOpacity={0.8}
                            onPress={onViewAll}
                            style={[styles.itemContainer, { justifyContent: 'center', borderWidth: 1, borderColor: COLORS.PRIMARY.PINK }]}
                        >
                            <Text style={styles.viewAll}>View All</Text>
                        </TouchableOpacity>}
                    </>)
                }}
            />
        </View>
    );
}

export default FriendsHorizontalList;
