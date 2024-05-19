import axios from "axios";
import { useDispatch } from "react-redux";
import { setApplicants } from "../app/ApplicantsReducer";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7015/Applicants'
})

export const GetAllApplicants = async (dispatch) => {

    await axiosInstance.get()
    .then((result) => {
        // console.log(result.data.length);
        dispatch(setApplicants(result.data));
    }).catch((err) => {
        console.log("Exception thrown: " + err);
    })
    

}