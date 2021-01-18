import { applyMiddleware, createStore, combineReducers, Action } from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";
import thunkMiddleware, { ThunkAction } from "redux-thunk";
import { reducer as formReducer } from "redux-form";
import { friendsReducer } from "./friends-reducer";

let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    sidebar: sidebarReducer,
    usersPage: usersReducer,
    auth: authReducer,
    form: formReducer,
    app: appReducer,
    friendsPage: friendsReducer,
});
type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

export type InferActionsType<T> = T extends {
    [keys: string]: (...artgs: any[]) => infer U;
}
    ? U
    : never;

export type BaseThunkType<A extends Action, R = Promise<void>> = ThunkAction<
    R,
    AppStateType,
    unknown,
    A
>;

let store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
