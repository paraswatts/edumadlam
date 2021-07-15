import { scaleText } from 'react-native-text';
import { useEffect } from 'react'
// import ImagePicker from 'react-native-image-crop-picker';
import { Platform, PixelRatio, PermissionsAndroid, Dimensions, Alert, Linking, BackHandler } from 'react-native';
import { showMessage } from "react-native-flash-message";
import { isTablet } from 'react-native-device-info';
import { ROUTES, TEXT_CONST } from '../constants';
import moment from 'moment';
import * as RNIap from 'react-native-iap';
import * as Sentry from "@sentry/react-native";
import { navigate } from './navigation';

let dim = Dimensions.get('window')
let height = dim.height > dim.width ? dim.height : dim.width;
const NOTIFICATION_CODES = {
    'news': (_id, _heading) => navigate(ROUTES.NEWS.DETAIL, { _id, _heading }),
    'important': (_id, _heading) => navigate(ROUTES.IMPORTANT.DETAIL, { _id, _heading }),
    'important_chapter': (_id, _heading, _category) => navigate(ROUTES.IMPORTANT.CHAPTER_LIST, { _id, _category }),
    'test_series': (_id) => navigate(ROUTES.TEST.CATEGORY, { id: _id }),
    'test_list': (_id, _heading, _category, _price, _productId) => navigate(ROUTES.TEST.LIST, { _id, _heading, _category, _price, _productId }),
};

export const _handleNotifications = ({
    data: {
        _notification_type = '',
        _id = '',
        _heading = '',
        _category = '',
        _price = '',
        _productId = ''
    } = {},
}) => {
    console.log("data", _notification_type)
    NOTIFICATION_CODES[_notification_type]
        ? NOTIFICATION_CODES[_notification_type](_id, _heading, _category, _price, _productId)
        : navigate(ROUTES.BOTTOM_TAB.HOME);
};


export const _scaleText = (fontSize) => {
    if (isTablet()) {
        return ({
            fontSize: height / (812 / fontSize),
            lineHeight: height / (812 / fontSize) * 1.3
        })
    } else {
        return scaleText({ fontSize });
    }
}

export const appleInAppPurchase = async (productId) => {
    console.log("productId", productId)
    const productIds = Platform.select({
        ios: [
            'plan.179',
            'plan.269',
            'plan.349',
            'plan.549',
            'plan.799',
            'plan.999',
            'plan.1499',
            'plan.1799',
            'plan.1999',
            'plan.2299',
            'plan.2599',
        ]
    });
    console.log("productIds", productIds)
    let products
    try {
        products = await RNIap.getProducts(productIds);
    } catch (error) {
        console.log("error products", error)
    }
    // Sentry.captureException("Exceptio1");

    console.log(":products", products)
    let product = findProductToPurchase(products, productId)
    // Sentry.captureException("Exception2");
    console.log("product", product)
    const purchase = await RNIap.requestPurchase(product[0].productId);
    // Sentry.captureException("exception4");
    await RNIap.finishTransaction(purchase)
    console.log(purchase, 'products', products)
    // Sentry.captureException("Exception3")
    return purchase;
}

const findProductToPurchase = (products, productId) => {
    console.log("products length", products.length)
    let productToPurchase = products && products.length && products.filter((item) => {
        console.log(item.price, "item", item.localizedPrice, "name", item.productId)
        return item.productId === productId
    })
    console.log("productToPurchase", productToPurchase)
    // Sentry.captureEvent
    return productToPurchase;
}


export const pad = (n) => {
    return (n < 10) ? ("0" + n) : n;
}
export const _checkValidEmail = (email = "") => {
    var re = /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export const _checkValidName = (name = '') => {
    var regx = /^([^0-9]*)$/;
    return regx.test(String(name)) && name.length
}


/* useBackButton */
export function useBackButton(handler) {
    // Frustration isolated! Yay! 🎉
    useEffect(() => {
        const handler = BackHandler.addEventListener("hardwareBackPress", handler);
        return () => {
            handler.remove()
        };
    }, [handler]);
}

// export const _openImagePicker = ({ mediaType = 'photo' }) => {
//     return ImagePicker.openPicker({
//         mediaType,
//     }).then(({ filename = '', mime = '', path = '', sourceURL = '' }) => {
//         return { filename, mime, path: sourceURL ? sourceURL : path }
//     });
// }

// export const _openCamera = ({ mediaType = 'photo' }) => {
//     return ImagePicker.openCamera({
//         mediaType,
//     }).then(({ filename, mime, path, sourceURL }) => {
//         return { filename, mime, path: sourceURL ? sourceURL : path }
//     });
// }





export const _showCustomToast = ({ type = 'error', message = '', description = '', ...rest }) => {
    showMessage({
        message,
        type,
        description,
        ...rest
    })
}

export const _showNativeAlert = ({ title = '', subtitle = '', buttons = [] }) => {
    Alert.alert(
        title,
        subtitle,
        [...buttons],
    )
}

export const _createIntervalData = (start = 0, end = 0, diff = 1) => {
    let result = [];
    while (start <= end) {
        result.push(start + '');
        start += diff
    }
    return [...result];
}

export const _formatHours = (hours = 0) => {
    let minutes = hours * 60;
    let hrs = Math.floor(hours);
    let mins = minutes % 60;

    return `${hrs ? hrs + ' hr' : ''} ${mins ? mins + ' min' : ''}`
}

export const _calculateCancelation = ({
    helpCancelled = 0,
    helpcompleted = 0,
    requestCancelled = 0,
    requestCompleted = 0,
}) => {
    let total = helpCancelled + helpcompleted + requestCancelled + requestCompleted;
    let cancelCount = helpCancelled + requestCancelled;
    return (Math.round(((cancelCount) / (total ? total : 1)) * 100))
}

export const _formatDate = (date) => {
    return moment(new Date(date)).format('D MMMM YYYY')
}

export const _formatTime = (date, add = 0, formatType = 'hh:mm A') => {
    return moment(new Date(date)).add(add, 'minutes').format(formatType)
}

export const _getTimeDiff = (time) => {
    return ((moment(new Date(time)).diff(moment(new Date()), 'minutes')) / 60).toFixed(1)
}

export const _formatOnGoingTime = (seconds = 0) => {
    seconds = Math.abs(seconds);
    let hours = Math.floor(seconds / 3600);
    let minutes = seconds % (60 * 60);
    minutes = Math.floor(minutes / 60);
    seconds -= (hours * 3600) + (minutes * 60);
    return `${hours > 9 ? hours : '0' + hours}:${minutes > 9 ? minutes : '0' + minutes}:${seconds > 9 ? seconds : '0' + seconds}`
}


export const _getTimeFilter = (key = '', add = 0) => {
    return ([
        {
            label: 'Early Morning',
            key: `${key}0`,
            subLabel: '12:00 AM - 4:59 AM',
            dates: {
                start_date_time: moment(new Date()).add(add, 'days').hours(0).minutes(0).seconds(0).milliseconds(0).utc().format('YYYY-MM-DDTHH:mm:ss'),
                end_date_time: moment(new Date()).add(add, 'days').hours(4).minutes(59).seconds(59).milliseconds(0).utc().format('YYYY-MM-DDTHH:mm:ss'),
            }
        },
        {
            label: 'Morning',
            key: `${key}1`,
            subLabel: '5:00 AM - 11:59 AM',
            dates: {
                start_date_time: moment(new Date()).add(add, 'days').hours(5).minutes(0).seconds(0).milliseconds(0).utc().format('YYYY-MM-DDTHH:mm:ss'),
                end_date_time: moment(new Date()).add(add, 'days').hours(11).minutes(59).seconds(59).milliseconds(0).utc().format('YYYY-MM-DDTHH:mm:ss'),
            }
        },
        {
            label: 'Afternoon',
            key: `${key}2`,
            subLabel: '12:00 PM - 5:59 PM',
            dates: {
                start_date_time: moment(new Date()).add(add, 'days').hours(12).minutes(0).seconds(0).milliseconds(0).utc().format('YYYY-MM-DDTHH:mm:ss'),
                end_date_time: moment(new Date()).add(add, 'days').hours(17).minutes(59).seconds(59).milliseconds(0).utc().format('YYYY-MM-DDTHH:mm:ss'),
            }
        },
        {
            label: 'Evening',
            key: `${key}3`,
            subLabel: '6:00 PM - 11:59 PM',
            dates: {
                start_date_time: moment(new Date()).add(add, 'days').hours(18).minutes(0).seconds(0).milliseconds(0).utc(),
                end_date_time: moment(new Date()).add(add, 'days').hours(23).minutes(59).seconds(59).milliseconds(0).utc(),
            }
        }
    ])
}