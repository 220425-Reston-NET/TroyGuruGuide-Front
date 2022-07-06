import axios from 'axios';
import ACTIONS from './index'

export const results = () => async(dispatch)=>{
    try {
        const res = await axios.get('/api/results');
        dispatch({
            type:ACTIONS.LOAD_SCAN_RESULTS,
            payload:res.data,
        })
    }
    catch(err){}
}