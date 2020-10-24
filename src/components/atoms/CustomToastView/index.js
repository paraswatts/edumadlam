import React from 'react';
import { Text, View } from 'react-native';
import { _scaleText, ICONS } from '../../../shared';
import { hasNotch } from 'react-native-device-info';
import CustomTouchableIcon from '../CustomTouchableIcon';
import styles from './styles';

const CustomToastView = ({
    message: {
        description,
        message,
        type,
    },
    onClick = () => { },
    floating,
}) => {
    return (
        <View style={styles.container(type, floating, hasNotch())}>
            {type == 'success' ?
                ICONS.SUCCESS(24)
                : type == 'error' ?
                    ICONS.ERROR_WHITE(24)
                    : type == 'warn' ?
                        ICONS.WARNING(24)
                        :
                        ICONS.INFO(24)
            }
            <View style={styles.textContainer}>
                <Text style={styles.title}>{message}</Text>
            </View>
            <CustomTouchableIcon onPress={onClick}>
                {ICONS.CLOSE_WHITE(24)}
            </CustomTouchableIcon>
        </View>
    );
}

export default CustomToastView;
