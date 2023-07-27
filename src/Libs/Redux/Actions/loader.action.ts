import ActionType from "../@types/ActionType";
import IAction from "../@types/IAction";

class LoaderAction {

    showLoading = () => (dispatch: any) => {
        dispatch({
            type: ActionType.LOADING_CHANGE,
            payload: {
                loading: true
            }            
        } as IAction<any>);
    };

    hideLoading = ()  => (dispatch: any) => {
        dispatch({
            type: ActionType.LOADING_CHANGE,
            payload: {
                loading: false
            }
        } as IAction<any>);
    };

}

export default new LoaderAction();