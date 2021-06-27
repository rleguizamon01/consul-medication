const axios = window.axios

const BASE_API_URL = 'http:://localhost:8000/api';


export default {
    getPatients: (searchValue) =>   
        axios.get('api/patients/search/'+searchValue)


    setPrescription: (values) =>
        axios.put('api/')
}