import React from 'react';
import { Text, UIManager, View } from 'react-native';
import { ScreenHOC } from '../../../../../components';
import { COLORS, _scaleText } from '../../../../../shared';
import FastImage from 'react-native-fast-image';
import styles from './styles';

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
            <View style={styles.parent}>

                <View style={styles.child}>
                    <FastImage
                        style={{ height: 80, width: 80, borderRadius: 40 }}
                        resizeMode={'contain'}
                        source={{ uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ_pgXmULPlkKJ2_x26ijFGrw8GtinmhzSU8g&usqp=CAU' }}
                    />

                    <View
                        style={{ width: '100%', borderWidth: 0, flexDirection: 'row', justifyContent: 'space-around', marginTop: _scaleText(20).fontSize }}
                    >
                        <View style={{ padding: _scaleText(10).fontSize }}>
                            <Text style={{ fontWeight: 'bold', color: 'white', }}>Name</Text>
                            <Text style={{ color: 'white', textTransform: 'capitalize' }}>{_name}</Text>
                        </View>
                        <View style={{ padding: _scaleText(10).fontSize }}>
                            <Text style={{ fontWeight: '600', color: 'white' }}>Email</Text>
                            <Text style={{ color: 'white' }}>{_email}</Text>
                        </View>
                    </View>
                </View>
            </View>
        </ScreenHOC>
    );
}

export default FriendsScreen;