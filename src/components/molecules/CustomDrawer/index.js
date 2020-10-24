import React from 'react';
import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';
import { connect } from 'react-redux';

import { Alert } from 'react-native';
import { logoutRequest } from '../../../redux/actions'

function CustomDrawer(props) {
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props} />
            <DrawerItem
                label="Logout"
                onPress={() => {
                    Alert.alert(
                        'Logout',
                        'Are you sure you want to logout',
                        [
                            {
                                text: 'Yes',
                                onPress: () => props.logoutRequest()
                            },
                            {
                                text: 'No',
                                style: 'cancel',
                            },
                        ],
                        { cancelable: false },
                    );
                }}
            />
        </DrawerContentScrollView>
    );
}

const mapDispatchToProps = dispatch => {
    return {
        logoutRequest: () => dispatch(logoutRequest())
    }
}

export default connect(null, mapDispatchToProps)(CustomDrawer);

