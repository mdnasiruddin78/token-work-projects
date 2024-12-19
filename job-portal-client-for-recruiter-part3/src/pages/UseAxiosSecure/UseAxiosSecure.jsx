import axios from "axios";
import { useContext, useEffect } from "react";
import AuthContext from "../../context/AuthContext/AuthContext";
import { useNavigate } from "react-router-dom";


const axiosIntance = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
})

const UseAxiosSecure = () => {

    const {signOutUser} = useContext(AuthContext)
    const navigate = useNavigate()

   useEffect(()=>{
      axiosIntance.interceptors.response.use(response => {
        return response
      },error => {
        if(error.status === 401 || error.status === 403){
            signOutUser()
            .then(() => {
                navigate('/signIn')
            })
            .catch(error => {
                console.log(error)
            })
        }
        return Promise.reject(error)
      })
   },[])

   return axiosIntance;
};

export default UseAxiosSecure;