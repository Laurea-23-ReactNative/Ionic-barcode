import { LoadingState } from "./LoadingState";
import { show, hide } from "./loading.actions";
import { loadingReducer } from "./loading.reducers"

describe('Loading store', () => {

    it('show', () => {
        const initialState: LoadingState = {show: false};
        const newState = loadingReducer(initialState, show());

        expect(newState).toEqual({show: true})
    })

    it('hide', () => {
        const initialState: LoadingState = {show: true};
        const newState = loadingReducer(initialState, hide());

        expect(newState).toEqual({show: false})
    })
})