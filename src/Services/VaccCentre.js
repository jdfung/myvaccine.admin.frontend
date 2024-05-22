import axios from "axios"
import { setVaccCentre } from "../app/VaccCentreReducer";

const stateDistrict = axios.create({
    baseURL: 'https://jian.sh/malaysia-api/state/v1',
})

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7015/VaccCentre',
})

export const GetAllVaccCentres = async (dispatch) => {
    await axiosInstance.get('')
    .then((result) => {
        
        dispatch(setVaccCentre(result.data))
    }).catch((err) => {
        console.log("Exception thrown: " + err);
    })
}

export const GetSpeciVaccCentre = async (dispatch, id) => {
    await axiosInstance.get('GetByID', {
        params: {
            id: id
        }
    })
    .then((result) => {
        console.log(result.data)
    }).catch((err) => {
        console.log("Exception thrown: " + err);
    })
}

export const GetAllStates = async () => {
    await stateDistrict.get("all.json")
    .then((result) => {
        // console.log(result.data);
        
    })

}