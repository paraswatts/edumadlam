import React from 'react';
import { _scaleText, COLORS } from '../';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { isTablet } from 'react-native-device-info';

import AVAILABLE from '../../assets/icons/available.svg';
import BACK from '../../assets/icons/Back.svg';
import CALL from '../../assets/icons/call.svg';
import CAMERA from '../../assets/icons/camera.svg';
import CHECK_BOX_DEFAULT from '../../assets/icons/checkbox_default.svg';
import CHECK_BOX_SELECTED from '../../assets/icons/checkbox_selected.svg';
import CLOSE from '../../assets/icons/close.svg';
import CLOSE_WHITE from '../../assets/icons/close_white.svg';
import COINS from '../../assets/icons/coins.svg';
import COLLAPSE from '../../assets/icons/collapse.svg';
import CREATE_TASK from '../../assets/icons/create_task_selected.svg';
import DEFAULT_PROFILE from '../../assets/icons/default_profile.svg';
import DIRECTIONS from '../../assets/icons/direction.svg';
import DISLIKE_DEFAULT from '../../assets/icons/dislike_default.svg';
import DISLIKE_SELECTED from '../../assets/icons/dislike_selected.svg';
import DROPDOWN_COLLAPSE from '../../assets/icons/dropdown_collapse.svg';
import DROPDOWN_EXPAND from '../../assets/icons/dropdown_expand.svg';
import EDIT from '../../assets/icons/edit.svg';
import ERROR from '../../assets/icons/error.svg';
import ERROR_WHITE from '../../assets/icons/error_white.svg';
import EXPAND from '../../assets/icons/expand.svg';
import FAQS from '../../assets/icons/faqs.svg';
import FAVORITE from '../../assets/icons/favorite.svg';
import FAVORITE_DEFAULT from '../../assets/icons/favorite_default.svg';
import FEEDBACK from '../../assets/icons/feedback.svg';
import FILTERS from '../../assets/icons/filters.svg';
import FRIENDS_DEFAULT from '../../assets/icons/friends_default.svg';
import FRIENDS_SELECTED from '../../assets/icons/friends_selected.svg';
import HAMBURGER from '../../assets/icons/hamburger_menu.svg';
import HELP from '../../assets/icons/help_and_support.svg';
import HOME_DEFAULT from '../../assets/icons/home_default.svg';
import HOME_SELECTED from '../../assets/icons/home_selected.svg';
import HOURS from '../../assets/icons/hrs.svg';
import INFO from '../../assets/icons/info.svg';
import INVITE_FRIENDS from '../../assets/icons/invite_friends.svg';
import LIKE_DEFAULT from '../../assets/icons/like_default.svg';
import LIKE_SELECTED from '../../assets/icons/like_selected.svg';
import LOCATION from '../../assets/icons/location.svg';
import LOGOUT from '../../assets/icons/logout.svg';
import M_CANCELATION_RATE from '../../assets/icons/matchmaking_cancellation_rate.svg';
import MENU from '../../assets/icons/menu.svg';
import M_DIRECTION from '../../assets/icons/matchmaking_direction.svg';
import M_FRIENDS from '../../assets/icons/matchmaking_friends.svg';
import M_INFO from '../../assets/icons/matchmaking_info.svg';
import M_NEIGHBOURHOOD from '../../assets/icons/matchmaking_neighbourhood.svg';
import MATCHMAKING_VERIFIED from '../../assets/icons/matchmaking_verified.svg';
import MENU_DEFAULT from '../../assets/icons/menu_default.svg';
import MENU_SELECTED from '../../assets/icons/menu_selected.svg';
import NEAR_BY_FRIENDS from '../../assets/icons/nearby_friends.svg';
import NEXT from '../../assets/icons/next.svg';
import NEXT_SCREEN from '../../assets/icons/next_screen.svg';
import NOT_AVAILABLE from '../../assets/icons/group_6373.svg';
import NOTIFICATIONS from '../../assets/icons/notifications.svg';
import PENDING from '../../assets/icons/pending.svg';
import PENDING_CHECKOUT from '../../assets/icons/pending_checkout.svg';
import PREFERENCES_DEFAULT from '../../assets/icons/preferences_default.svg';
import PREFERENCES_SELECTED from '../../assets/icons/preeferences_selected.svg';
import TEST_DEFAULT from '../../assets/icons/test.svg';
import TEST_SELECTED from '../../assets/icons/test_selected.svg';
import VIDEO_DEFAULT from '../../assets/icons/video-player.svg';
import VIDEO_SELECTED from '../../assets/icons/video-player_selected.svg';
import NEWS_DEFAULT from '../../assets/icons/newspaper.svg';
import NEWS_SELECTED from '../../assets/icons/newspaper_selected.svg';
import IMPORTANT_DEFAULT from '../../assets/icons/important.svg';
import IMPORTANT_SELECTED from '../../assets/icons/important_selected.svg';
import MCQ_DEFAULT from '../../assets/icons/mcq.svg';
import MCQ_SELECTED from '../../assets/icons/mcq_selected.svg';
import PROMOTIONS from '../../assets/icons/promotions.svg';
import RADIO_BUTTON_DEFAULT from '../../assets/icons/radio_button_default.svg';
import RADIO_BUTTON_DEFAULT_GREEN from '../../assets/icons/radio_button_default_green.svg';
import RADIO_BUTTON_SELECTED from '../../assets/icons/radio_button_selected.svg';
import REMOVE from '../../assets/icons/remove.svg';
import REQUEST_SENT from '../../assets/icons/request_sent.svg';
import REWARDS from '../../assets/icons/rewards.svg';
import SEARCH from '../../assets/icons/search.svg';
import STATUS_OFF from '../../assets/icons/status.svg';
import STATUS_ON from '../../assets/icons/status_complete.svg';
import SUBSCRIPTIONS from '../../assets/icons/subscriptions.svg';
import SUCCESS from '../../assets/icons/success.svg';
import TASK_COMPLETED from '../../assets/icons/task_completed.svg';
import TASK_START from '../../assets/icons/status_start.svg';
import UN_AVAILABLE from '../../assets/icons/unavailable.svg';
import USER_AGREEMENT from '../../assets/icons/user_agreement.svg';
import VERIFIED from '../../assets/icons/verified.svg';
import VIEW_MORE from '../../assets/icons/view_more.svg';
import VIEW_PROFILE from '../../assets/icons/view_profile.svg';
import WARNING from '../../assets/icons/warning.svg';
import LIST from '../../assets/icons/list.svg';
import UP_ARROW from '../../assets/icons/uparrow.svg';
//ILLUSTRATIONS:
import FRIEND_MOVED from '../../assets/illustrations/friend_moved.svg';
import EMPTY_INTEREST from '../../assets/illustrations/empty_interests.svg';
import NO_FRIENDS from '../../assets/illustrations/no_friends.svg';
import CONFIRM_VERIFICATION from '../../assets/illustrations/confirm_verification.svg';
import CANCEL_TASK from '../../assets/illustrations/cancel_task.svg';
import TASK_REQUEST_SENT from '../../assets/illustrations/request_sent.svg';
import HELP_OFFER_AUTO_ACCEPTED from '../../assets/illustrations/help_offer_auto_accepted.svg';
import HELP_OFFER_SENT from '../../assets/illustrations/help_offer_sent.svg';
import MEDAL from '../../assets/icons/medal.svg';


const iconStyle = (width = 0, height = 0) => ({
    width: _scaleText(width).fontSize,
    height: _scaleText(height ? height : width).fontSize,
})

export const ICONS = {
    AVAILABLE: (...params) => <AVAILABLE {...iconStyle(...params)} />,
    BACK: (...params) => <BACK {...iconStyle(...params)} />,
    CALL: (...params) => <CALL {...iconStyle(...params)} />,
    CAMERA: (...params) => <CAMERA {...iconStyle(...params)} />,
    CHAT: (...params) => <CHAT {...iconStyle(...params)} />,
    CHECK_BOX_DEFAULT: (...params) => <CHECK_BOX_DEFAULT {...iconStyle(...params)} />,
    CHECK_BOX_SELECTED: (...params) => <CHECK_BOX_SELECTED {...iconStyle(...params)} />,
    CLOSE_WHITE: (...params) => <CLOSE_WHITE {...iconStyle(...params)} />,
    CLOSE: (...params) => <CLOSE {...iconStyle(...params)} />,
    COINS: (...params) => <COINS {...iconStyle(...params)} />,
    COLLAPSE: (...params) => <COLLAPSE {...iconStyle(...params)} />,
    CREATE_TASK: (...params) => <CREATE_TASK {...iconStyle(...params)} />,
    DEFAULT_PROFILE: (...params) => <DEFAULT_PROFILE {...iconStyle(...params)} />,
    DIRECTIONS: (...params) => <DIRECTIONS {...iconStyle(...params)} />,
    DISLIKE_DEFAULT: (...params) => <DISLIKE_DEFAULT {...iconStyle(...params)} />,
    DISLIKE_SELECTED: (...params) => <DISLIKE_SELECTED {...iconStyle(...params)} />,
    DROPDOWN_COLLAPSE: (...params) => <DROPDOWN_COLLAPSE {...iconStyle(...params)} />,
    DROPDOWN_EXPAND: (...params) => <DROPDOWN_EXPAND {...iconStyle(...params)} />,
    EDIT: (...params) => <EDIT {...iconStyle(...params)} />,
    ERROR_WHITE: (...params) => <ERROR_WHITE {...iconStyle(...params)} />,
    ERROR: (...params) => <ERROR {...iconStyle(...params)} />,
    EXPAND: (...params) => <EXPAND {...iconStyle(...params)} />,
    FAQS: (...params) => <FAQS {...iconStyle(...params)} />,
    FAVORITE_DEFAULT: (...params) => <FAVORITE_DEFAULT {...iconStyle(...params)} />,
    FAVORITE: (...params) => <FAVORITE {...iconStyle(...params)} />,
    FEEDBACK: (...params) => <FEEDBACK {...iconStyle(...params)} />,
    FILTERS: (...params) => <FILTERS {...iconStyle(...params)} />,
    FRIENDS_DEFAULT: (...params) => <FRIENDS_DEFAULT {...iconStyle(...params)} />,
    FRIENDS_SELECTED: (...params) => <FRIENDS_SELECTED {...iconStyle(...params)} />,
    HAMBURGER: (...params) => <HAMBURGER {...iconStyle(...params)} />,
    HELP: (...params) => <HELP {...iconStyle(...params)} />,
    HOME_DEFAULT: (...params) => <HOME_DEFAULT {...iconStyle(...params)} />,
    HOME_SELECTED: (...params) => <HOME_SELECTED {...iconStyle(...params)} />,
    HOURS: (...params) => <HOURS {...iconStyle(...params)} />,
    INFO: (...params) => <INFO {...iconStyle(...params)} />,
    INVITE_FRIENDS: (...params) => <INVITE_FRIENDS {...iconStyle(...params)} />,
    LIKE_DEFAULT: (...params) => <LIKE_DEFAULT {...iconStyle(...params)} />,
    LIKE_SELECTED: (...params) => <LIKE_SELECTED {...iconStyle(...params)} />,
    LOCATION: (...params) => <LOCATION {...iconStyle(...params)} />,
    LOGOUT: (...params) => <LOGOUT {...iconStyle(...params)} />,
    M_CANCELATION_RATE: (...params) => <M_CANCELATION_RATE {...iconStyle(...params)} />,
    M_DIRECTION: (...params) => <M_DIRECTION {...iconStyle(...params)} />,
    M_FRIENDS: (...params) => <M_FRIENDS {...iconStyle(...params)} />,
    M_INFO: (...params) => <M_INFO {...iconStyle(...params)} />,
    M_NEIGHBOURHOOD: (...params) => <M_NEIGHBOURHOOD {...iconStyle(...params)} />,
    MATCHMAKING_VERIFIED: (...params) => <MATCHMAKING_VERIFIED {...iconStyle(...params)} />,
    MENU_DEFAULT: (...params) => <MENU_DEFAULT {...iconStyle(...params)} />,
    MENU_SELECTED: (...params) => <MENU_SELECTED {...iconStyle(...params)} />,
    NEAR_BY_FRIENDS: (...params) => <NEAR_BY_FRIENDS {...iconStyle(...params)} />,
    NEXT_SCREEN: (...params) => <NEXT_SCREEN {...iconStyle(...params)} />,
    NEXT: (...params) => <NEXT {...iconStyle(...params)} />,
    NOT_AVAILABLE: (...params) => <NOT_AVAILABLE {...iconStyle(...params)} />,
    NOTIFICATIONS: (...params) => <NOTIFICATIONS {...iconStyle(...params)} />,
    PENDING_CHECKOUT: (...params) => <PENDING_CHECKOUT {...iconStyle(...params)} />,
    PENDING: (...params) => <PENDING {...iconStyle(...params)} />,
    PREFERENCES_DEFAULT: (...params) => <PREFERENCES_DEFAULT {...iconStyle(...params)} />,
    PREFERENCES_SELECTED: (...params) => <PREFERENCES_SELECTED {...iconStyle(...params)} />,
    MENU: (...params) => <MENU {...iconStyle(...params)} />,
    NEWS_DEFAULT: (...params) => <NEWS_DEFAULT {...iconStyle(...params)} />,
    NEWS_SELECTED: (...params) => <NEWS_SELECTED {...iconStyle(...params)} />,
    TEST_DEFAULT: (...params) => <TEST_DEFAULT {...iconStyle(...params)} />,
    TEST_SELECTED: (...params) => <TEST_SELECTED {...iconStyle(...params)} />,
    VIDEO_DEFAULT: (...params) => <VIDEO_DEFAULT {...iconStyle(...params)} />,
    VIDEO_SELECTED: (...params) => <VIDEO_SELECTED {...iconStyle(...params)} />,
    IMPORTANT_DEFAULT: (...params) => <IMPORTANT_DEFAULT {...iconStyle(...params)} />,
    IMPORTANT_SELECTED: (...params) => <IMPORTANT_SELECTED {...iconStyle(...params)} />,
    MCQ_DEFAULT: (...params) => <MCQ_DEFAULT {...iconStyle(...params)} />,
    MCQ_SELECTED: (...params) => <MCQ_SELECTED {...iconStyle(...params)} />,
    PROMOTIONS: (...params) => <PROMOTIONS {...iconStyle(...params)} />,
    RADIO_BUTTON_DEFAULT_GREEN: (...param) => <RADIO_BUTTON_DEFAULT_GREEN {...iconStyle(...param)} />,
    RADIO_BUTTON_DEFAULT: (...params) => <RADIO_BUTTON_DEFAULT {...iconStyle(...params)} />,
    RADIO_BUTTON_SELECTED: (...params) => <RADIO_BUTTON_SELECTED {...iconStyle(...params)} />,
    REMOVE: (...params) => <REMOVE {...iconStyle(...params)} />,
    REQUEST_SENT: (...params) => <REQUEST_SENT {...iconStyle(...params)} />,
    REWARDS: (...params) => <REWARDS {...iconStyle(...params)} />,
    SEARCH: (...params) => <SEARCH {...iconStyle(...params)} />,
    STATUS_OFF: (...params) => <STATUS_OFF {...iconStyle(...params)} />,
    STATUS_ON: (...params) => <STATUS_ON {...iconStyle(...params)} />,
    SUBSCRIPTIONS: (...params) => <SUBSCRIPTIONS {...iconStyle(...params)} />,
    SUCCESS: (...params) => <SUCCESS {...iconStyle(...params)} />,
    TASK_COMPLETED: (...params) => <TASK_COMPLETED {...iconStyle(...params)} />,
    TASK_START: (...params) => <TASK_START {...iconStyle(...params)} />,
    UN_AVAILABLE: (...params) => <UN_AVAILABLE {...iconStyle(...params)} />,
    USER_AGREEMENT: (...params) => <USER_AGREEMENT {...iconStyle(...params)} />,
    VERIFIED: (...params) => <VERIFIED {...iconStyle(...params)} />,
    VIEW_MORE: (...params) => <VIEW_MORE {...iconStyle(...params)} />,
    VIEW_PROFILE: (...params) => <VIEW_PROFILE {...iconStyle(...params)} />,
    WARNING: (...params) => <WARNING {...iconStyle(...params)} />,
    CALENDAR: <EvilIcons name="calendar" size={isTablet() ? 40 : 30} color={'#ffffff'} />,
    LIST: (...params) => <LIST {...iconStyle(...params)} />,
    UP_ARROW: (...params) => <UP_ARROW {...iconStyle(...params)} />,
    MEDAL: (...params) => <MEDAL {...iconStyle(...params)} />
};

export const ILLUSTRATIONS = {
    CANCEL_TASK: (...params) => <CANCEL_TASK {...iconStyle(...params)} />,
    CONFIRM_VERIFICATION: (...params) => <CONFIRM_VERIFICATION {...iconStyle(...params)} />,
    EMPTY_INTEREST: (...params) => <EMPTY_INTEREST {...iconStyle(...params)} />,
    FRIEND_MOVED: (...params) => <FRIEND_MOVED {...iconStyle(...params)} />,
    NO_FRIENDS: (...params) => <NO_FRIENDS {...iconStyle(...params)} />,
    TASK_REQUEST_SENT: (...params) => <TASK_REQUEST_SENT {...iconStyle(...params)} />,
    HELP_OFFER_AUTO_ACCEPTED: (...params) => <HELP_OFFER_AUTO_ACCEPTED {...iconStyle(...params)} />,
    HELP_OFFER_SENT: (...params) => <HELP_OFFER_SENT {...iconStyle(...params)} />,
};