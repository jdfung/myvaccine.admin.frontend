import { setAppointments, setAppointment } from "../app/AppointmentReducer"
import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7015/Appointments'
})


export const GetAllAppointment = async (dispatch) => {
    await axiosInstance.get()
    .then((result) => {
        dispatch(setAppointments(result.data))
        console.log(result.data)
    }).catch((err) => {
        console.log("Exception thrown: " + err);
    })
}

export const GetSpeciAppointment = async (dispatch, id) => {
    await axiosInstance.get('GetByID', {
        params: {
            id: id
        }
    }).then((result) => {
        dispatch(setAppointment(result.data));
    }).catch((err) => {
        console.log("Exception thrown: " + err);
    })
}

export const AssignAppointmentDate = async (id, date) => {
    const status = await axiosInstance.put('AssignDate/', null, {
        params: {
            id: id,
            date: date
        }
    }).then((result) => {
        return result.status
    }).catch((err) => {
        console.log("Exception thrown: " + err)
    })

    return status
}