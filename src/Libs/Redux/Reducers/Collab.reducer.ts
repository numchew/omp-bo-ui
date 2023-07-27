import ActionType from "../@types/ActionType";
import IAction from "../@types/IAction";
import { ICollab } from '../../Models/ICollab.model';

interface ICollabState {
    colorslist: ICollab[],
    detail: ICollab;
}

const initialState = {} as ICollabState;
const reducer = (
    state: ICollabState = initialState,
    action: IAction<any>): ICollabState => {

    var data = action.payload;

    switch (action.type) {
        case ActionType.GET_COLLAB_DETAIL:
            return { ...state, detail: data };
    }
    return state;
}

export default reducer;