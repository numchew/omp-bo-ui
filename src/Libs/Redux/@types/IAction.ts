//import { AuthenticationActions } from "../../../Components/Auth/@types/authType";
import ActionType from "./ActionType";

interface IAction<T> {
    type: ActionType ,//| AuthenticationActions,
    payload: T
}

export default IAction;