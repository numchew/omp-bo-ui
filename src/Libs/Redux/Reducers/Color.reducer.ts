import ActionType from "../@types/ActionType";
import IAction from "../@types/IAction";
import { IColor } from '../../Models/IColor.model';

interface IColorState {
    colorslist: IColor[],
    detail: IColor;
}

const initialState = {} as IColorState;
const reducer = (
    state: IColorState = initialState,
    action: IAction<any>): IColorState => {

    var data = action.payload;

    switch (action.type) {
        case ActionType.GET_COLOR_DETAIL:
            return { ...state, detail: data };
    }
    return state;
}

export default reducer;