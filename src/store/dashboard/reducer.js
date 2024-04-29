// import {
//     API_SUCCESS,
//     API_FAIL,
//     GET_CHARTS_DATA,
// } from "./actionTypes";

// const INIT_STATE = {
//     chartsData: [],
// };

// const Dashboard = (state = INIT_STATE, action) => {
//     switch (action.type) {
//         case API_SUCCESS:
//             switch (action.payload.actionType) {
//                 case GET_CHARTS_DATA:
//                     return {
//                         ...state,
//                         chartsData: action.payload.data
//                     };

//                 default:
//                     return state;
//             }
//         case API_FAIL:
//             switch (action.payload.actionType) {
//                 case GET_CHARTS_DATA:
//                     return {
//                         ...state,
//                         earningChartDataError: action.payload.error
//                     };


//                 default:
//                     return state;
//             }
//         default:
//             return state;
//     }
// };


// export default Dashboard;



const initialState = {
    chartsData: null,
    insightsInspectionEntry: null,
    dashboardInsightsPropertyData: null,
    dashboardInsightsPropertyDataLoading: false,
    seriesOne: null,
    seriesTwo: null,
    date: null,
    insightsActiveProperties: null,
    insightsActivePropertiesLoading: false,
    insightsEntryInspection: null,
    insightsEntryInspectionLoading: false,
    insightsExitInspection: null,
    insightsExitInspectionLoading: null,
    insightsGainProperties: null,
    insightsGainPropertiesLoading: false,
    insightsLostProperties: null,
    insightsLostPropertiesLoading: false,
    insightsTenantArrears3Days: null,
    insightsTenantArrears3DaysLoading: false,
    insightsTenantArrears7Days: null,
    insightsTenantArrears7DaysLoading: false,

    insightsJobAssigned: null,
    insightsJobAssignedLoading: false,
    insightsTaskOverdue: null,
    insightsTaskOverdueLoading: false,
    insightsJobsOpen: null,
    insightsJobsOpenLoading: false,

    insightsConversationOpen: null,
    insightsConversationOpenLoading: false
}

const Dashboard = (state = initialState, action) => {
    // console.log(action);
    switch (action.type) {
        case "GET_CHARTS_DATA":
            state = {
                ...state,
                chartsData: action.payload,
            }
            break;
        case "DASHBOARD_INSIGHTS_PROPERTY":
            state = {
                ...state,
                dashboardInsightsPropertyData: action.payload,
                dashboardInsightsPropertyDataLoading: action.status,
                // seriesOne: action.payload.series[0]?.data,
                // seriesTwo: action.payload.series[1]?.data,
                // date: action.payload.xaxis?.categories,

            }
            break;
        case "INSIGHTS_ACTIVE_PROPERTIES":
            state = {
                ...state,
                insightsActiveProperties: action.payload,
                insightsActivePropertiesLoading: action.status,
            }
            break;
        case "INSIGHTS_ENTRY_INSPECTION":
            state = {
                ...state,
                insightsEntryInspection: action.payload,
                insightsEntryInspectionLoading: action.status,
            }
            break;
        case "INSIGHTS_EXIT_INSPECTION":
            state = {
                ...state,
                insightsExitInspection: action.payload,
                insightsExitInspectionLoading: action.status,
            }
            break;
        case "INSIGHTS_GAIN_PROPERTIES":
            state = {
                ...state,
                insightsGainProperties: action.payload,
                insightsGainPropertiesLoading: action.status,
            }
            break;
        case "INSIGHTS_LOST_PROPERTIES":
            state = {
                ...state,
                insightsLostProperties: action.payload,
                insightsLostPropertiesLoading: action.status,
            }
            break;
        case "INSIGHTS_TENANT_ARREAS_3_days":
            state = {
                ...state,
                insightsTenantArrears3Days: action.payload,
                insightsTenantArrears3DaysLoading: action.status,
            }
            break;
        case "INSIGHTS_TENANT_ARREAS_7_days":
            state = {
                ...state,
                insightsTenantArrears7Days: action.payload,
                insightsTenantArrears7DaysLoading: action.status,
            }
            break;
        case "INSIGHTS_JOB_ASSIGNED":
            state = {
                ...state,
                insightsJobAssigned: action.payload,
                insightsJobAssignedLoading: action.status,
            }
            break;
        case "INSIGHTS_TASK_OVERDUE":
            state = {
                ...state,
                insightsTaskOverdue: action.payload,
                insightsTaskOverdueLoading: action.status,
            }
            break;
        case "INSIGHTS_JOBS_OPEN":
            state = {
                ...state,
                insightsJobsOpen: action.payload,
                insightsJobsOpenLoading: action.status,
            }
            break;
        case "INSIGHTS_CONVERSATION_OPEN":
            state = {
                ...state,
                insightsConversationOpen: action.payload,
                insightsConversationOpenLoading: action.status,
            }
            break;



        default:
            state = { ...state };
            break;
    }
    return state;
};

export default Dashboard;