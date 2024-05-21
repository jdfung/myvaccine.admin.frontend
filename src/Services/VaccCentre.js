import axios from "axios"

const axiosInstance = axios.create({
    baseURL: 'https://localhost:7015/VaccCentre',
})

export const GetAllVaccCentres = async (dispatch) => {
    await axiosInstance.get('')
    .then((result) => {
        console.log(result.data);
    }).catch((err) => {
        console.log("Exception thrown: " + err);
    })
}