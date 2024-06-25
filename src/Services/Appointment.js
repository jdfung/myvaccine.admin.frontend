import api from "../api/api"
import { setAppointments, setAppointment } from "../app/AppointmentReducer"
import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7015/Appointments'
})


export const GetAllAppointment = async (dispatch) => {
    await api.get('Appointments')
    .then((result) => {
        dispatch(setAppointments(result.data))
    }).catch((err) => {
        console.log("Exception thrown: " + err);
    })
}

export const GetSpeciAppointment = async (dispatch, id) => {
    await api.get('Appointments/GetByID', {
        params: {
            id: id
        }
    }).then((result) => {
        dispatch(setAppointment(result.data));
    }).catch((err) => {
        console.log("Exception thrown: " + err);
    })
}

export const SearchByID = async (dispatch, id) => {
    const status = await api.get('Appointments/GetByID', {
        params: {
            id: id
        }
    }).then((result) => {
        dispatch(setAppointments([result.data]));
        return result.status
    }).catch((err) => {
        console.log("Exception thrown: " + err);
    })

    return status;
}

export const AssignAppointmentDate = async (id, dose, date) => {
    const status = await api.put('Appointments/AssignDate/', null, {
        params: {
            id: id,
            dose: dose,
            date: date
        }
    }).then((result) => {
        return result.status
    }).catch((err) => {
        console.log("Exception thrown: " + err)
    })

    return status
}