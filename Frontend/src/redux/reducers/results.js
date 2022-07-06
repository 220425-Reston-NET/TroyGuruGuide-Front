
import ACTIONS from '../actions/'

const initialState={isResults:false};

// eslint-disable-next-line import/no-anonymous-default-export
export default function(state = initialState, action){
    const { type, payload } = action;
  switch (type) {
    case ACTIONS.LOAD_SCAN_RESULTS:
      return { ...state, results:payload,isResults:true};
    default:
        return state;
  }
}

















