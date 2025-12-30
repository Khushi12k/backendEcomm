import axios from "axios";
import  { useEffect } from "react";


function ProtectedRouters({ children }) {

    useEffect(() => {
        checkForlogin()
    }, [])


    async function checkForlogin() {
        const response = await axios.get(
            `${import.meta.env.VITE_BASEURL}/check/login?referer=admin`,
            { withCredentials: true })

        console.log(response)
    }


    return children;
}

export default ProtectedRouters;



