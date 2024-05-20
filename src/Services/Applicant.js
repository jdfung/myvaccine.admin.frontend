import axios from "axios";
import { useDispatch } from "react-redux";
import { setApplicants, setSpeciApplicants } from "../app/ApplicantsReducer";

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

export const GetSpecificApplicants = async (dispatch, id) => {
    await axiosInstance.get('GetByID/' + id)
    .then((result) => {
        dispatch(setSpeciApplicants(result.data));
    }).catch((err) => {
        console.log("Exception thrown: " + err)
    })
}

export const EditApplicantStatus = async (applicant) => {
    const status = await axiosInstance.put('', applicant)
    .then((result) => {
        console.log(result.status)
        return result.status
    }).catch((err) => {
        console.log("Exception thrown: " + err)
    })

    return status
}