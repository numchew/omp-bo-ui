import ActionType from "../@types/ActionType";
import IAction from "../@types/IAction";

export interface ILoaderState {
  loading: boolean;
}

const initialState: ILoaderState = {
  loading: false,
};

const reducer = (
  state: ILoaderState = initialState,
  action: IAction<any>
): ILoaderState => {
  switch (action.type) {
    case ActionType.LOADING_CHANGE:
      return {
        ...state,
        loading: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
