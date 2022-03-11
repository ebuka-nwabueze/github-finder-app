import { createContext, useReducer } from "react"
import alertReducer from "./AlertReducer"

const AlertContext = createContext()


export const AlertProvider = ({children}) => {
    
    const initialState = null
    const [state, dispatch] = useReducer(alertReducer, initialState)

    const setAlert = (msg,type) => {
        dispatch({type: "SET_ALERT", payload: { msg, type }})
    }

    return <AlertContext.Provider value={{setAlert, alert: state}}>
        {children}
    </AlertContext.Provider>
}







export default AlertContext