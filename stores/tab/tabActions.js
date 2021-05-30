export const SET_TRADE_MODEL_VISIBILITY = 'SET_TRADE_MODEL_VISIBILITY';

export const setTradeModalVisibilitySuccess = (isVisible) => ({
    type : SET_TRADE_MODEL_VISIBILITY,
    payload : {isVisible}
})

export function setTradeModalVisibility(isVisible) {
    return dispatch => {
        dispatch(setTradeModalVisibilitySuccess(isVisible))
    }
}