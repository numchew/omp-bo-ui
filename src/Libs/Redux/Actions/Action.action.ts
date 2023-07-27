import ActionType from "../@types/ActionType";
import IAction from "../@types/IAction";

class Action {
    getOrderDetail = (data: any) => ({
        type: ActionType.GET_ORDER_DETAIL,
        payload: data,
    });

    getCustomerDetail = (data: any) => ({
        type: ActionType.GET_CUSTOMER_DETAIL,
        payload: data,
    });

    getColorDetail = (data: any) => ({
        type: ActionType.GET_COLOR_DETAIL,
        payload: data,
    });

    getAvatarDetail = (data: any) => ({
        type: ActionType.GET_AVATAR_DETAIL,
        payload: data,
    });

    getCollabDetail = (data: any) => ({
        type: ActionType.GET_COLLAB_DETAIL,
        payload: data,
    });

    getProductDetail = (data: any) => ({
        type: ActionType.GET_PRODUCT_DETAIL,
        payload: data,
    });

}

export default new Action();