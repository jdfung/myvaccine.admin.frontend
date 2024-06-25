import axios from "axios"
import { setAllDistricts, setAllStates, setSpeciVaccCentre, setVaccCentre } from "../app/VaccCentreReducer";
import { GetAuthHeader } from "./Login";
import api from "../api/api";

const stateDistrict = axios.create({
    baseURL: 'https://jian.sh/malaysia-api/state/v1',
})

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7015/VaccCentre',
    
})



export const GetAllVaccCentres = async (dispatch) => {
    const status = await api.get('VaccCentre')
    .then((result) => {
        dispatch(setVaccCentre(result.data))
        return result.data;
    }).catch((err) => {
        console.log("Exception thrown: " + err);
    })

    return status;
}

export const GetSpeciVaccCentre = async (dispatch, id) => {
    await api.get('VaccCentre/GetByID', {
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

export const SearchVaccByID = async (dispatch, id) => {
    const status = await api.get('VaccCentre/GetByID', {
        params: {
            id: id
        }
    })
    .then((result) => {
        dispatch(setVaccCentre([result.data]))
        return result.status;
    }).catch((err) => {
        console.log("Exception thrown: " + err);
    })
    return status;
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
    const status = await api.put('VaccCentre', vaccCentre)
    .then((result) => {
        
        return result.status
    }).catch((err) => {
        
        console.log("Exception thrown: " + err);
        return err.response.status
    })

    return status
}

export const AddVaccCentre = async (vaccCentre) => {
    const status = await api.post('VaccCentre', vaccCentre)
    .then((result) => {
        return result.status;
    }).catch((err) => {
        console.log("Exception thrown: " + err);
        return err.response.status;
    })

    return status;
}

export const deleteVaccCentre = async (id) => {
    const status = await api.delete('VaccCentre', {
        params: {
            id: id
        }
    }).then((result) => {
        return result.status
    }).catch((err) => {
        console.log("Exception thrown: " + err);
        return err.response.status;
    })

    return status;
}
