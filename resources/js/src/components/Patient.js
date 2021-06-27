import { postCss } from 'laravel-mix';
import React, { useEffect, useState } from 'react'
import api from '../api';

const Patient = () => {

    const [patients, setPatients] = useState(null);
    const [searchValue, setsearchValue] = useState("");

    useEffect(() => {
        if(searchValue.length > 2){
            api.getPatients(searchValue).then(res =>{
                let data = res.data.data.map(function (q){
                    console.log(q.name);
                })
                setPatients(res.data.data);
            })
        }
    }, [])

    const renderPatients = () => {
        if(!patients){
            return(
                <div>
                    Cargando...
                </div>
            );
        }
        if(patients.length === 0){
            return (
                <div>
                    No hay pacientes.
                </div>
            );
        }

        return patients.map((patient) => {
            <>
                nombre: {patient.name}
                DNI: {patient.DNI}
            </>
        })
    }

    return (
        <>
            nombre: {name}
            DNI: {DNI}
        </>
    );
};

export default Patient;