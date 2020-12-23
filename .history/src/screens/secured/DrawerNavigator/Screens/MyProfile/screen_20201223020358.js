import React from 'react';
import { Text, UIManager, View } from 'react-native';
import { ScreenHOC } from '../../../../../components';
import { COLORS } from '../../../../../shared';
import FastImage from 'react-native-fast-image';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const FriendsScreen = ({
    navigation,
    userData
}) => {
    console.log("userDatauserData", userData)
    const { _name, _email } = userData
    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHTER, }}
            headerTitle={'My Profile'}
            showHeader
            showMenuIcon
            onBackPress={navigation.toggleDrawer}
        >
            <View style={{ backgroundColor: COLORS.PRIMARY.PINK, marginTop: -2, alignItems: 'center', justifyContent: 'center' }}>


                <FastImage
                    style={{ height: 80, width: 80, borderRadius: 40 }}
                    resizeMode={'contain'}
                    source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_pgXmULPlkKJ2_x26ijFGrw8GtinmhzSU8g&usqp=CAU' }}
                />

                <View
                    style={{ width: '100%', borderWidth: 1 }}
                >
                    <View>
                        <Text>Name</Text>
                        <Text>{_name}</Text>
                    </View>
                </View>
            </View>
        </ScreenHOC>
    );
}

export default FriendsScreen;