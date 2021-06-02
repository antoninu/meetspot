import { register } from 'next-offline/runtime';

if(process.browser){
  register('/service-worker.js', {scope: '/'});
}

const initialState = {
  user: null,
};

export default initialState;
