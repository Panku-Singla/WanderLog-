import { useCallback, useReducer } from "react";

const formReducer = (state, action) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const inputId in state.inputs) {
        if(!state.inputs[inputId]) continue ;  // for handling the undefined values from the login and signup
        if (inputId === action.inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[inputId].isValid;  // state from newplace than inputs[inputId] can be 
          // title desc or address depending and isValid is the component for that respective id
        }
      }
      // the loop checks validity and then updates it 
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [action.inputId]: { value: action.value, isValid: action.isValid },
        },
        isValid: formIsValid,       
      };
      case "SET_DATA" :
        return {
          inputs : action.inputs ,
          isValid : action.formIsValid 

  };
    default:
      return state;
  }
};

export const useForm = (initialInputs , initialFormValidity) => {
     const [formState, dispatch] = useReducer(formReducer, {
    inputs:  initialInputs  ,
    isValid: initialFormValidity   // intials for formState
  });

  const inputHandler = useCallback(
    (id, value, isValid) => {
      dispatch({   // calls formreducer through usereducer and updates the value into formreducer and rerendering it
        type: "INPUT_CHANGE",  // these values in action 
        value: value,
        isValid: isValid,
        inputId: id,
      });
    },
    []
  );

  const setFormData = useCallback((inputData , formValidity) =>{
    dispatch ({
      type : 'SET_DATA',
      inputs: inputData ,
      formIsValid : formValidity
    });
  },[]);

  return [formState,inputHandler ,setFormData];
};