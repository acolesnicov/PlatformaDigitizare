"use strict";

import React, { Component } from "react";
import StepZilla from "../components/StepZilla";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import Step5 from "./Step5";
import Step6 from "./Step6";
import Step7 from "./Step7";
import Step8 from "./Step8";

import "../css/main.css";

export default class DigitizationSteps extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.sampleStore = {
      // email: "",
      // gender: "",
      period: "secolulXX",
      typography: "",
      alphabet: "cyrillic",
      savedToCloud: false,
      sourceFiles: [],
      preprocessedFiles: [],
      preprocessWith: "",
      ocrResults: [],
      transResults: [],
      preprocessFR: {
        correctResolution: true,
        convertToBlackAndWhite: true,
        straightenTextLines: true,
        reduceNoise: true,
        correctPageOrientation: true,
      },
      preprocessOpenCV: {
        setResolution: true,
        resolution: 300,
        removeNoise: true,
      },
      alphabetOptions: {
        cyrillic: "alfabetul chirilic sovietic",
        latin: "alfabetul românesc modern",
        cyrillicRomanian: "alfabetul chirilic românesc",
        transitionalRomanian: "alfabetul românesc de tranziție",
      },
      periodOptions: {
        secolulXX: "secolul XX",
        secolulXIX: "secolul XIX",
        secolulXVIII: "secolul XVIII",
        secolulXVII: "secolul XVII",
      },

      transOptions: {
        actualizeWordForm: true,
        replaceApostrophe: true,
        removeHyphen: true,
      },
        heterogenWith: "",
        heterogenFragm: {},
        heterogenHomo: {},

    };
  }

  componentDidMount() { }

  componentWillUnmount() { }

  getStore() {
    return this.sampleStore;
  }

  updateStore(update) {
    this.sampleStore = {
      ...this.sampleStore,
      ...update,
    };
  }

  render() {
    const steps = [
      {
        name: "1. Încarcă fișierele",
        component: (
          <Step1
            getStore={() => this.getStore()}
            updateStore={(u) => {
              this.updateStore(u);
            }}
          />
        ),
      },
      {
          name: "2. Preprocesează imaginea",
          component: (
              <Step2
                  getStore={() => this.getStore()}
                  updateStore={(u) => {
                      this.updateStore(u);
                  }}
              />
          ),
      },
      {
          name: "3. Clasificarea conținutului eterogen",
          component: (
              <Step3
                  getStore={() => this.getStore()}
                  updateStore={(u) => {
                      this.updateStore(u);
                  }}
              />
          ),
      },
      {
        name: "4. OCR",
        component: (
          <Step4
            getStore={() => this.getStore()}
            updateStore={(u) => {
              this.updateStore(u);
            }}
          />
        ),
      },
      {
        name: "5. Verifică OCR",
        component: (
          <Step5
            getStore={() => this.getStore()}
            updateStore={(u) => {
              this.updateStore(u);
            }}
          />
        ),
      },
      {
        name: "6. Transliterează",
        component: (
          <Step6
            getStore={() => this.getStore()}
            updateStore={(u) => {
              this.updateStore(u);
            }}
          />
        ),
      },
      {
        name: "7. Verifică transliterația",
        component: (
          <Step7
            getStore={() => this.getStore()}
            updateStore={(u) => {
              this.updateStore(u);
            }}
          />
        ),
      },
      {
        name: "8. Folosește rezultatele",
        component: (
          <Step8
            getStore={() => this.getStore()}
            updateStore={(u) => {
              this.updateStore(u);
            }}
          />
        ),
      },
    ];
    return (
      <div className="example">
        <div className="step-progress">
          <StepZilla
            steps={steps}
            preventEnterSubmission={true}
            nextTextOnFinalActionStep={"Salvează rezultatele"}
            startAtStep={
              window.sessionStorage.getItem("step")
                ? parseFloat(window.sessionStorage.getItem("step"))
                : 0
            }
            onStepChange={(step) => window.sessionStorage.setItem("step", step)}
          />
        </div>
      </div>
    );
  }
}
