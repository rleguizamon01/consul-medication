import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';
import { Button, Container, Card, Form } from 'react-bootstrap';
import api from '../api';

function Home() {
    const [patients, setPatients] = useState(null);
    const [searchValue, setSearchValue] = useState("");

    /*useEffect(() => {
        api.getPatients(searchValue).then(res =>{
            setPatients(res.data.data);
        });

    }, [])*/


    const searchPatients = (e) => {
        console.log("input value: " + e.target.value);
        setSearchValue(e.target.value);

        console.log("search value: " + e.target.value);

        if(searchValue.length > 0){
            api.getPatients(e.target.value).then(res => {
                renderPatients();
                setPatients(res.data.data);
                
            })
            .catch(error => {
                console.log('api/patients/search/'+e.target.value);
                console.log(error);
            })

        }
        else{
            setPatients(null);
        }
    }

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

        console.log(patients);

        return patients.map((patient) => (
            
            <Card key={patient.id} className="my-2">
                <Card.Body>{patient.name}</Card.Body>
                <Formik
                initialValues={{ via: 'whatsapp', [patient.id + "-comentario"]: '' }}
                onSubmit = {(values) => { console.log(values)}}
                >
                    {props => {
                        const {
                        values,
                        touched,
                        errors,
                        dirty,
                        isSubmitting,
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        handleReset,
                        isInvalid,
                    } = props;
                    return (
                        <Form noValidate onSubmit={handleSubmit}>
                            <div key={patient.id}>
                                <Form.Group>
                                    <Form.Check id={`${patient.id}-whatsapp`} type="radio" label="WhatsApp" name="via" onChange={handleChange} value="whatsapp" defaultChecked/>
                                    <Form.Check id={`${patient.id}-sobre`} type="radio" label="Sobre" name="via" onChange={handleChange} value="sobre"/>
                                </Form.Group>
                                
                                <Form.Group>
                                    <Form.Control id={`${patient.id}-comentario`} placeholder="Ingrese un comentario" value={values.comentario} onChange={handleChange} onBlur={handleBlur}/>
                                </Form.Group>

                                <Button type="submit" variant="primary">
                                    Ingresar
                                </Button>{' '}
                            </div>
                        </Form>
                    );
                }}
                </Formik>
            </Card>
            )
        )

    }

    return (
        <Container>
            <div className="m-4">
                        <input type="text" placeholder="Ingrese al paciente a buscar" id="patient-search" onInput={(e) => searchPatients(e)}></input>
                            {renderPatients()}
            </div>
        </Container>
    );
}

export default Home;

if (document.getElementById('example')) {
    ReactDOM.render(<Home />, document.getElementById('example'));
}
