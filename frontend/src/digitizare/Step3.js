"use strict";

import React from "react";
// You need to import the CSS only once
import "react-awesome-lightbox/build/style.css";
import Form from "react-bootstrap/Form";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import RangeSlider from "react-bootstrap-range-slider";
import "react-bootstrap-range-slider/dist/react-bootstrap-range-slider.css";
import { mdiSourceCommitStartNextLocal } from "@mdi/js";
import ImgsViewer from "react-images-viewer";
import { Fancybox } from "@fancyapps/ui/src/Fancybox/Fancybox.js";
import "@fancyapps/ui/dist/fancybox.css";

// Classify and fragmentate the images
const Step3 = (props) => {


    console.log(props.getStore());

    const sourceFiles = props.getStore().sourceFiles;
    const [preprocessedFiles, setpreprocessedFiles] = React.useState(
        props.getStore().preprocessedFiles
    );
    const [heterogenFragm, setHeterogenFragm] = React.useState(
        props.getStore().heterogenFragm
    );
    const [heterogenHomo, setHeterogenHomo] = React.useState(
        props.getStore().heterogenHomo
    );
    const [show, setShow] = React.useState(true);

    // fix step 3 by adding a new state 
    const [selectedOption, setSelectedOption] = React.useState(
        props.getStore().heterogenWith
    );

    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
        props.updateStore({ heterogenWith: e.target.value });
        setShow(true);
    };

    // Fragmetator
    const handleHeterogenFragmChange = (e) => {
        setHeterogenFragm({ ...heterogenFragm, [e.target.name]: e.target.checked });
        props.updateStore({
            heterogenFragm: { ...heterogenFragm, [e.target.name]: e.target.checked },
        });
    };

    // Conținutul omogen
    const handleHeterogenHomoChange = (e) => {
        setHeterogenHomo({
            ...heterogenHomo,
            [e.target.name]: e.target.checked,
        });
        props.updateStore({
            heterogenHomo: {
                ...heterogenHomo,
                [e.target.name]: e.target.checked,
            },
        });
    };


    // Fisierele sursa
    const handleFilePath = (filePath) => {
        if (filePath.length > 0) return "http://127.0.0.1:8000/media/" + filePath;
        return "https://cdn.presslabs.com/wp-content/uploads/2018/10/upload-error.png";
    };

    // Post request
    const handleHeterogenRequest = async () => {
        setShow(false);

        const heterogenAPI = "http://127.0.0.1:8000/heterogen/";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(props.getStore()),
        };
        const response = await fetch(heterogenAPI, requestOptions);
        const data = await response.json();
        console.log(data);

    };

    return (

        <div className="step step3">
            <div className="row">

                <Form id="Form" className="form-horizontal">
                    <Form.Group>
                        <Form.Label className="col-md-12 control-label">
                            <h1>Pasul 3: Clasificarea conținutului eterogen</h1>
                        </Form.Label>
                    </Form.Group>
                    <div className="row content">
                        <Form.Group>
                            <Form.Label>3.1 Selectează tipul de conținut:</Form.Label>

                            <Form.Check
                                label="Conținutul eterogen"
                                name="group1"
                                type="radio"
                                id="radio1"
                                value="Fragm"
                                checked={selectedOption === "Fragm"}
                                onChange={handleOptionChange}
                            />
                            <Form.Check
                                label="Conținutul omogen"
                                name="group1"
                                type="radio"
                                id="radio2"
                                value="Homo"
                                checked={selectedOption === "Homo"}
                                onChange={handleOptionChange}
                            />
                        </Form.Group>
                        {/*                        

                    <div className="col-sm mb-3">
                        {selectedOption === "Fragm" && (
                            <>
                                <Form.Group>
                                    <Form.Label>
                                        3.1 Fragmentation
                                    </Form.Label>
                                </Form.Group>
                            </>
                        )}
                    </div> 
 

                    <div className="col-sm mb-3">
                        {selectedOption === "Homo" && (
                            <>
                                <Form.Group>
                                    <Form.Label>
                                        3.2 Tipuri de conținut omogen:
                                    </Form.Label>
                                </Form.Group>
                                <Form.Group>
                                    <Form.Check
                                        label="Text for OCR"
                                        name="group2"
                                        type="radio"
                                        id="radio3"
                                        value="Text"
                                        checked={selectedOption === "Text"}
                                            onChange={handleHeterogenHomoChange}
                                    />
                                    <Form.Check
                                        label="Score (music) for OMR"
                                        name="group2"
                                        type="radio"
                                        id="radio4"
                                        value="Score"
                                        checked={selectedOption === "Score"}
                                            onChange={handleHeterogenHomoChange}
                                    />
                                    <Form.Check
                                        label="Mathematics"
                                        name="group2"
                                        type="radio"
                                        id="radio5"
                                        value="Math"
                                        checked={selectedOption === "Math"}
                                            onChange={handleHeterogenHomoChange}
                                    />
                                    <Form.Check
                                        label="Other (process as image)"
                                        name="group2"
                                        type="radio"
                                        id="radio6"
                                        value="Other"
                                        checked={selectedOption === "Other"}
                                            onChange={handleHeterogenHomoChange}
                                    />
                                </Form.Group>
                            </>
                        )}
                
                    </div>
               </div>  
              <div className="mt-5 mb-3 col-md-12 d-flex justify-content-center">
                        {selectedOption && show ? (
                            <Button variant="primary" onClick={handleHeterogenRequest}>
                                Finish this step
                            </Button>
                        ) : (
                            <Button disabled variant="primary">
                                Finish this step
                            </Button>
                        )}
                        {!show && (
                            <>
                                {" "}
                                <Button
                                    variant="primary mx-4"
                                    onClick={() => props.jumpToStep(2)}
                                >
                                    Mergi la pasul următor - OCR
                                </Button>{" "}
                            </>
                        )}
               */}
                    </div>
                </Form>

            </div>


            {/* source image */}
            <div className="row">
                <div className="col-md-12 d-flex justify-content-around">
                    <div className="col-sm">
                        {sourceFiles.length != 0 && (
                            <>
                                <Accordion defaultActiveKey={["0"]} alwaysOpen>
                                    <Accordion.Item eventKey="0">
                                        <Accordion.Header>
                                            Sursa - imagine originală{" "}
                                        </Accordion.Header>
                                        <Accordion.Body>
                                            {sourceFiles.map((src, index) => (
                                                <a
                                                    className=""
                                                    data-fancybox="gallery_1"
                                                    data-src={handleFilePath(src.name)}
                                                    data-caption="imagine originală"
                                                    key={index}
                                                >
                                                    <img
                                                        className="Accordion_image"
                                                        src={handleFilePath(src.name)}
                                                    />
                                                </a>
                                            ))}
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Step3;
