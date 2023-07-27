import ActionType from "../@types/ActionType";
import IAction from "../@types/IAction";
import { IAvatar } from '../../Models/IAvatar.model';

interface IAvatarState {
    avatarslist: IAvatar[],
    detail: IAvatar;
}

const initialState = {} as IAvatarState;
const reducer = (
    state: IAvatarState = initialState,
    action: IAction<any>): IAvatarState => {

    var data = action.payload;

    switch (action.type) {
        case ActionType.GET_AVATAR_DETAIL:
            return { ...state, detail: data };
    }
    return state;
}

export default reducer;