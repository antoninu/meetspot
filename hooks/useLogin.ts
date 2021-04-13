import { useState } from "react";

const useLogin = () => {

    const [inputs, setInputs] = useState({});

    const handleLoginChange = (event) => {
      setInputs({...inputs, [event.target.name]: event.target.value});
    }
  
    return {
      handleLoginChange,
    };
  };

  export default useLogin;