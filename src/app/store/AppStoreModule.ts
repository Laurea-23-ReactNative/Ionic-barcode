import { loadingReducer } from "./loading/loading.reducers";
import { StoreModule } from "@ngrx/store";
import { loginReducer } from "./login/login.reducers";

export const AppStoreModule = [
    StoreModule.forRoot([]),
    StoreModule.forFeature("loading", loadingReducer),
    StoreModule.forFeature("login", loginReducer)
]