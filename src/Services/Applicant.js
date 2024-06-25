import axios from "axios";
import { useDispatch } from "react-redux";
import { setApplicants, setSpeciApplicants } from "../app/ApplicantsReducer";
import api from "../api/api";

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7015/Applicants'
})

export const GetAllApplicants = async (dispatch) => {

    await api.get('Applicants')
    .then((result) => {
        // console.log(result.data.length);
        dispatch(setApplicants(result.data));
    }).catch((err) => {
        console.log("Exception thrown: " + err);
    })

}

export const GetSpecificApplicants = async (dispatch, id) => {
    await api.get('Applicants/GetByID/' + id)
    .then((result) => {
        dispatch(setSpeciApplicants(result.data));
    }).catch((err) => {
        console.log("Exception thrown: " + err)
    })
}

export const GetApplicantByIC = async (dispatch, ic) => {
    const status = await api.get('Applicants/GetByIc/' + ic)
    .then((res) => {
        dispatch(setApplicants([res.data]))
        return res.status
    }).catch((err) => {
        console.log("Exception thrown: " + err);
    })

    return status
}

export const EditApplicantStatus = async (applicant) => {
    const status = await api.put('Applicants', applicant)
    .then((result) => {
        console.log(result.status)
        return result.status
    }).catch((err) => {
        console.log("Exception thrown: " + err)
    })

    return status
}
