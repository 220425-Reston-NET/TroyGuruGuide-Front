import axios from 'axios';
import ACTIONS from './index'

export const agents=()=>async(dispatch)=>{
  

      try{
    const res=await axios.get('/api/agents');

    dispatch({
        type:ACTIONS.LOAD_AGENTS,
        payload:res.data,
    })}
    catch(err){

    }
}