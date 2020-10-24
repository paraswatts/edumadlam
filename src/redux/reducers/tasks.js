import { REHYDRATE } from 'redux-persist';
import { RESET, GET_HELP_REQUESTED_SUCCESS, GET_OFFER_TO_HELP_SUCCESS, GET_HELPS_I_AM_PROVIDING_SUCCESS, GET_COMMUNITY_HELP_REQ, GET_COMMUNITY_HELP_REQ_SUCCESS, GET_WHAT_GOING_AROUND_SUCCESS, PROVIDER_REMOVE_HELP_SUCCESS, PROVIDER_UPDATE_OFFER_HELP_SUCCESS, INTERESTED_TO_HELP_SUCCESS } from '../actions';

const initialState = {
    requestedTasks: [],
    offerToHelp: [],
    helpsProviding: [],
    offerToHelpCount: 0,
    communityHelpRequests: [],
    whatsGoingAround: []
};

const TasksReducer = (state = { ...initialState }, action) => {
    let data = action.payload;
    let offerToHelp = [...state.offerToHelp];
    let offerToHelpCount = state.offerToHelpCount;
    let communityHelpRequests = state.communityHelpRequests;

    switch (action.type) {
        case GET_OFFER_TO_HELP_SUCCESS:
            return {
                ...state,
                offerToHelpCount: data.count,
                offerToHelp: data.spread ? [...state.offerToHelp, ...data.data] : [...data.data]
            }
        case PROVIDER_UPDATE_OFFER_HELP_SUCCESS:
            index = offerToHelp.findIndex(item => item.user_help_response_id == data.id);
            index >= 0 && (offerToHelp[index] = { ...offerToHelp[index], ...data.data })
            return {
                ...state,
                offerToHelp: [...offerToHelp]
            };
        case PROVIDER_REMOVE_HELP_SUCCESS:
            index = offerToHelp.findIndex(item => item.user_help_response_id == data.id);
            index >= 0 && (offerToHelp = [...offerToHelp.slice(0, index), ...offerToHelp.slice(index + 1)])
            return {
                ...state,
                offerToHelpCount: (state.offerToHelpCount - 1),
                offerToHelp: [...offerToHelp]
            };
        case INTERESTED_TO_HELP_SUCCESS:
            index = communityHelpRequests.findIndex(item => item.user_help_request_id == data);
            index >= 0 && (communityHelpRequests = [...communityHelpRequests.slice(0, index), ...communityHelpRequests.slice(index + 1)])
            return {
                ...state,
                communityHelpRequests: [...communityHelpRequests]
            };
        case GET_HELPS_I_AM_PROVIDING_SUCCESS:
            return {
                ...state,
                helpsProviding: data.spread ? [...state.helpsProviding, ...data.data] : [...data.data]
            }
        case GET_HELP_REQUESTED_SUCCESS:
            return {
                ...state,
                requestedTasks: data.spread ? [...state.requestedTasks, ...data.data] : [...data.data]
            }
        case GET_COMMUNITY_HELP_REQ_SUCCESS:
            return {
                ...state,
                communityHelpRequests: data.spread ? [...state.communityHelpRequests, ...data.data] : [...data.data]
            }
        case GET_WHAT_GOING_AROUND_SUCCESS:
            return {
                ...state,
                whatsGoingAround: data.spread ? [...state.whatsGoingAround, ...data.data] : [...data.data]
            }
        case REHYDRATE:
            return {
                ...initialState,
                ...((action.payload || {}).tasks || {}),
            };
        case RESET:
            return {
                ...initialState
            };
        default:
            return {
                ...state
            };
    }
};

export default TasksReducer;
