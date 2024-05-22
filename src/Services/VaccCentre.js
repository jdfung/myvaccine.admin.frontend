import axios from "axios"
import { setAllDistricts, setAllStates, setSpeciVaccCentre, setVaccCentre } from "../app/VaccCentreReducer";

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
        dispatch(setSpeciVaccCentre(result.data))
    }).catch((err) => {
        console.log("Exception thrown: " + err);
    })
}

export const GetAllStates = async (dispatch) => {
    await stateDistrict.get("all.json")
    .then((result) => {
        dispatch(setAllStates(result.data))
    }).catch((err) => {
        console.log("Exception thrown: " + err);
    })

}

export const GetAllDistricts = async (dispatch, district) => {
    await stateDistrict.get(district + '.json')
    .then((result) => {
        dispatch(setAllDistricts(result.data))
    }).catch((err) => {
        console.log("Exception thrown: " + err);
    })
}

export const UpdateVaccCentre = async (vaccCentre) => {
    const status = await axiosInstance.put('', vaccCentre)
    .then((result) => {
        
        return result.status
    }).catch((err) => {
        
        console.log("Exception thrown: " + err);
        return err.response.status
    })

    return status
}

export const AddVaccCentre = async (vaccCentre) => {
    const status = await axiosInstance.post('', vaccCentre)
    .then((result) => {
        return result.status;
    }).catch((err) => {
        console.log("Exception thrown: " + err);
        return err.response.status;
    })

    return status;
}
