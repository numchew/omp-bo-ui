import ActionType from "../@types/ActionType";
import IAction from "../@types/IAction";
import { ICustomer } from '../../Models/ICustomer.model';

interface ICustomerState {
    orderslist: ICustomer[],
    detail: ICustomer;
}

const initialState = {} as ICustomerState;
const reducer = (
    state: ICustomerState = initialState,
    action: IAction<any>): ICustomerState => {

    var data = action.payload;

    switch (action.type) {
        case ActionType.GET_CUSTOMER_DETAIL:
            return { ...state, detail: data };
    }
    return state;
}

export default reducer;