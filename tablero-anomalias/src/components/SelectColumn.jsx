import React, { useState, useEffect } from "react";
import Papa from "papaparse";
import { useLocation } from "react-router-dom";
import Column from './Column';
import { Form, Button } from 'react-bootstrap';

const SelectColumn = (props) => {

    const location = useLocation();

    // Archivo .csv o .xlsx
    const data = location.state?.data;

    //State to store table Column name
    const [tableRows, setTableRows] = useState([]);

    useEffect(() => {
        if (data !== undefined) {
            // Passing file data (event.target.files[0]) to parse using Papa.parse
            Papa.parse(data, {
                header: true,
                skipEmptyLines: true,
                complete: function (results) {
                    const rowsArray = [];
                    const valuesArray = [];

                    // Iterating data to get column name and their values
                    results.data.map((d) => {
                        rowsArray.push(Object.keys(d));
                        valuesArray.push(Object.values(d));
                    });

                    // Filtered Column Names
                    setTableRows(rowsArray[0]);
                },
            });
        }
    }, [])

    return (
        <div className="SelectColumn">
            <div
                style={{
                    height: "20vh",
                    marginLeft: "25%",
                    padding: "5vh 0"
                }}>
                <h2>Define los actores para entrenar el modelo</h2>
            </div>
            <Form>
                <div className="">
                    {
                        tableRows.map((rows, index) => {
                            if (index !== 0) {
                                return <Column key={index} index={index} name={rows}></Column>
                            }
                        })
                    }


                </div>
                <div className="mb-4 d-flex justify-content-center">
                    <Button
                        style={{
                            backgroundColor: "#ff8300",
                            border: "none"
                        }}
                        className="mx-auto"
                        size="lg">
                        Seleccionar Columnas
                    </Button>
                </div>
            </Form>
        </div>
    );
};

export default SelectColumn;