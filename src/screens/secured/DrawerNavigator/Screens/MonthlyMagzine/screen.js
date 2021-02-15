import React, { useEffect, useState } from 'react';
import { Text, UIManager, ActivityIndicator, FlatList, View, RefreshControl, BackHandler, TouchableOpacity, PermissionsAndroid, Alert, Platform } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { ScreenHOC, EmptyDataUI } from '../../../../../components';
import { COLORS, _showCustomToast, TEXT_CONST, _scaleText, } from '../../../../../shared';
import Entypo from 'react-native-vector-icons/Entypo'
import RNFetchBlob from 'rn-fetch-blob'
import Share from 'react-native-share';

UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
const FriendsScreen = ({
    navigation,
    getMonthlyMagazineRequest,
    sId,
    netConnected,
    stopLoading
}) => {
    const [data, updateData] = useState([]);
    const [loading, toggleLoading] = useState(false);
    const [refreshing, toggleRefreshing] = useState(true);
    useEffect(() => {
        fetchData(true)
    }, [])
    const fetchData = (refresh = false) => {
        toggleLoading(!refresh);
        toggleRefreshing(false);
        let payload = {
            netConnected,
            success: (response = []) => {
                !response.length
                updateData(refresh ? [...response] : [...data, ...response])
                toggleLoading(false);
                toggleRefreshing(false);
            },
            fail: (message = '') => {
                _showCustomToast({ message });
                toggleLoading(false);
                toggleRefreshing(false);
            }
        }
        getMonthlyMagazineRequest(payload)
    }
    useEffect(() => {
        return () => {
            toggleLoading(false);
            toggleRefreshing(false);
        }
    })
    useEffect(() => {
        const handler = BackHandler.addEventListener(
            'hardwareBackPress',
            handleValidateClose
        );
        return () => handler.remove();
    }, []);
    const handleValidateClose = () => {
        /* Here is empty */
        stopLoading();
    };
    const _renderListEmptyComponent = () => (<EmptyDataUI
        title={TEXT_CONST.NO_DATA_FOUND}
    />)

    const _downloadFile = async (_name, _url) => {
        try {
            if (Platform.OS === 'android') {
                const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE);
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    actualDownload(_name, _url);
                } else {
                    Alert.alert('Permission Denied!', 'You need to give storage permission to download the file');
                }
            } else {
                actualDownload(_name, _url);
            }
        } catch (err) {

            console.warn(err);
        }
    }

    const actualDownload = (_name, _url) => {
        const { dirs } = RNFetchBlob.fs;
        const dirToSave = Platform.OS == 'ios' ? dirs.DocumentDir : dirs.DownloadDir
        const configfb = {
            fileCache: true,
            useDownloadManager: true,
            notification: true,
            mediaScannable: true,
            title: `${_name}`,
            path: `${dirToSave}/${_name}` + '.pdf',
        }
        const configOptions = Platform.select({
            ios: {
                fileCache: configfb.fileCache,
                title: configfb.title,
                path: configfb.path,
                appendExt: 'pdf',
                mime: 'application/pdf',
            },
            android: configfb,
        });
        const confirOptionsAnd = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                mediaScannable: true,
                title: `${_name}`,
                path: `${dirToSave}/${_name}` + '.pdf',
            },
        }
        RNFetchBlob.config(Platform.OS === 'ios' ? configOptions : confirOptionsAnd)
            .fetch('GET', _url, {})
            .then((res) => {
                if (Platform.OS === "ios") {
                    RNFetchBlob.fs.writeFile(configfb.path, res.data, 'base64');

                    RNFetchBlob.ios.previewDocument(configfb.path);
                }
                console.log(res.base64(), 'The file saved to ', res);
            })
            .catch((e) => {
                console.log(e)
            });
    }

    const _shareFile = async (_name, _url) => {
        fetch(
            'https://tinyurl.com/api-create.php?url=' + _url,
            {
                method: 'GET',
            },
        )
            .then((response) => response.text())
            //Response to text
            .then((responseJson) => {
                //Printing the Response String
                console.log(responseJson);
                //responseJson is our short URL
                //Sharing the short URL with our message
                const shareOptions = {
                    title: 'Share EduMandala',
                    failOnCancel: false,
                    urls: [responseJson],
                    message: 'Hey! Checkout the latest monthly magazine by Edumandala ' + (Platform.OS === 'ios' ? responseJson : '')
                };

                Share.open(shareOptions)
                    .then((result) => console.log(result))
                    .catch((errorMsg) => console.log(errorMsg));
            })
            //If response is not in text then in error
            .catch((error) => {
                //Error
                alert('Error -> ' + JSON.stringify(error));
                console.error(error);
            });
    }
    return (
        <ScreenHOC
            bottomSafeArea
            containerStyle={{ backgroundColor: COLORS.GREY.LIGHTER, }}
            headerTitle={'Monthly Magazine'}
            showHeader
            showMenuIcon
            onBackPress={navigation.toggleDrawer}
        >
            <FlatList
                showsVerticalScrollIndicator={false}
                data={data}
                extraData={data}
                keyExtractor={(item, index) => item._id + ''}
                ListEmptyComponent={!refreshing && _renderListEmptyComponent()}
                ListFooterComponent={loading && <ActivityIndicator size={'large'} color={COLORS.GREY._2} />}
                refreshControl={<RefreshControl
                    colors={[COLORS.GREY._2]}
                    onRefresh={() => fetchData(true)}
                    refreshing={refreshing}
                    tintColor={COLORS.GREY._2}
                    title={TEXT_CONST.PULL_TO_REFRESH}
                    titleColor={COLORS.GREY._2}
                />}
                style={{ marginVertical: 5 }}
                renderItem={({ item, index }) => {
                    let { _id, _name, _timestamp, _url } = item;
                    return (<View
                        style={{
                            overflow: 'hidden',
                            shadowColor: '#b2b2b2',
                            shadowOffset: { width: 0, height: 1 },
                            shadowOpacity: 0.8,
                            flexDirection: 'row',
                            shadowRadius: 1,
                            borderRadius: 10,
                            marginHorizontal: 10,
                            marginVertical: 5,
                            padding: 20,
                            elevation: 5,
                            backgroundColor: COLORS.WHITE
                        }}>
                        <View style={{
                            flex: 1,
                            flexGrow: 1,
                            borderWidth: 0,
                            borderColor: 'green'
                        }}>
                            <Text style={{ color: COLORS.BLUE_FONT, fontWeight: '500' }}><Text style={{ fontWeight: 'bold' }}>Name: </Text>{_name}</Text>
                            <Text style={{ color: COLORS.BLUE_FONT, fontWeight: '500', marginTop: 10, }}><Text style={{ fontWeight: 'bold' }}>Published date: </Text>{_timestamp}</Text>
                        </View>
                        <View style={{ borderWidth: 0 }}>
                            <TouchableOpacity onPress={() => _downloadFile(_name, _url)} style={{ borderRadius: _scaleText(5).fontSize, padding: _scaleText(5).fontSize, flexDirection: 'row', alignItems: 'center', borderWidth: 1 }}><Text style={{ marginRight: _scaleText(5).fontSize }}>Download</Text>
                                <Entypo name='download' size={20}></Entypo></TouchableOpacity>
                            <TouchableOpacity onPress={() => _shareFile(_name, _url)} style={{ borderRadius: _scaleText(5).fontSize, padding: _scaleText(5).fontSize, flexDirection: 'row', alignItems: 'center', borderWidth: 1, marginTop: _scaleText(5).fontSize }}><Text style={{ marginRight: _scaleText(5).fontSize }}>Share</Text>
                                <Entypo name='share' size={20}></Entypo></TouchableOpacity>
                        </View>
                    </View>)
                }}
            />
        </ScreenHOC>
    );
}

export default FriendsScreen;