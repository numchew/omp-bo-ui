import ActionType from "../@types/ActionType";
import IAction from "../@types/IAction";
import { IProduct } from '../../Models/IProduct.model';

interface IProductState {
    orderslist: IProduct[],
    detail: IProduct;
}

const initialState = {} as IProductState;
const reducer = (
    state: IProductState = initialState,
    action: IAction<any>): IProductState => {

    var data = action.payload;

    switch (action.type) {
        case ActionType.GET_PRODUCT_DETAIL:
            return { ...state, detail: data };
    }
    return state;
}

export default reducer;