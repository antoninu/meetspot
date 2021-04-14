import { useContext } from 'react';
import { StateContext } from 'state/StateProvider';

const useStateValue = () => useContext(StateContext);

export default useStateValue;
