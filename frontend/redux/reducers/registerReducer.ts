import { FETCH_REGISTER } from '../actions/registerActions';

interface IinitalState {
    regions: Array<any>
}
const initalState = {
    regions: []
}

export function registerReducer(state: IinitalState = initalState, action: any) {

    console.log(action)

    switch (action.type) {
        case FETCH_REGISTER: {
            return {
                ...state,
                // regions: action.regions
            }
        }
        default:
            return state
    }
}