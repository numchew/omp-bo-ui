import ActionType from "../@types/ActionType";
import IAction from "../@types/IAction";
import { IOrder } from '../../Models/IOrder.model';

interface IOrderState {
    orderslist: IOrder[],
    detail: IOrder;
}

const initialState = {} as IOrderState;
const reducer = (
    state: IOrderState = initialState,
    action: IAction<any>): IOrderState => {

    var data = action.payload;

    switch (action.type) {
        case ActionType.GET_ORDER_DETAIL:
            return { ...state, detail: data };
    }
    return state;
}

export default reducer;