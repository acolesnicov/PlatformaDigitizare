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

// Preprocess the images
const Step2_5 = (props) => {
    console.log(props.getStore());

    const sourceFiles = props.getStore().sourceFiles;
    const [preprocessedFiles, setpreprocessedFiles] = React.useState(
        props.getStore().preprocessedFiles
    );
    const [preprocessFR, setPreprocessFR] = React.useState(
        props.getStore().preprocessFR
    );
    const [preprocessOpenCV, setPreprocessOpenCV] = React.useState(
        props.getStore().preprocessOpenCV
    );
    const [resolutionOpenCV, setResolutionOpenCV] = React.useState(
        props.getStore().preprocessOpenCV.resolution
    );
    const [selectedOption, setSelectedOption] = React.useState(
        props.getStore().preprocessWith
    );
    const [show, setShow] = React.useState(true);

    const handleOptionChange = (e) => {
        // this.setState({
        //   selectedOption: e.target.value,
        // });
        setSelectedOption(e.target.value);
        props.updateStore({ preprocessWith: e.target.value });
        setShow(true);
    };

    // Preprocesare cu FineReader
    const handlePreprocessFRChange = (e) => {
        setPreprocessFR({ ...preprocessFR, [e.target.name]: e.target.checked });
        props.updateStore({
            preprocessFR: { ...preprocessFR, [e.target.name]: e.target.checked },
        });
    };

    // Preprocesare cu OpenCV
    const handlePreprocessOpenCVChange = (e) => {
        setPreprocessOpenCV({
            ...preprocessOpenCV,
            [e.target.name]: e.target.checked,
        });
        props.updateStore({
            preprocessOpenCV: {
                ...preprocessOpenCV,
                [e.target.name]: e.target.checked,
            },
        });
    };

    const handleResolutionChange = (e) => {
        setResolutionOpenCV(e.target.value);
        props.updateStore({
            preprocessOpenCV: {
                ...props.getStore().preprocessOpenCV,
                resolution: e.target.value,
            },
        });
    };

    // Fisierele sursa
    const handleFilePath = (filePath) => {
        if (filePath.length > 0) return "http://127.0.0.1:8000/media/" + filePath;
        //https://httpbin.org/post
        //http://127.0.0.1:8000/media/
        return "https://cdn.presslabs.com/wp-content/uploads/2018/10/upload-error.png";
    };

    // Post request
    const handlePreprocessRequest = async () => {
        setShow(false);

        const preprocessAPI = "http://127.0.0.1:8000/preprocess/";
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(props.getStore()),
        };
        const response = await fetch(preprocessAPI, requestOptions);
        const data = await response.json();
        console.log(data);

        setpreprocessedFiles(data.preprocessedFiles);
        props.updateStore({ preprocessedFiles: data.preprocessedFiles });
    };

    return (
        <div className="step step2_5">
            <div className="row">
                <Form id="Form" className="form-horizontal">
                    <Form.Group>
                        <Form.Label className="col-md-12 control-label">
                            <h1>Pasul 2.5: Clasificarea conținutului eterogen</h1>
                        </Form.Label>
                    </Form.Group>

                        <div className="mt-5 mb-3 col-md-12 d-flex justify-content-center">
                            {selectedOption && show ? (
                                <Button variant="primary" onClick={handlePreprocessRequest}>
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
                        </div>
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
export default Step2_5;
