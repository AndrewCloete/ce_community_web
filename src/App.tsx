import React, { useState, useEffect } from "react";
import "./App.css";
import QRCode from "react-qr-code";

const languages = ["en", "af"] as const;
type Language = (typeof languages)[number];
const terms = ["T1", "T2", "T3", "T4"] as const;
type Term = (typeof terms)[number];

interface Questions {
  [key: string]: string;
}

interface Answers {
  [key: string]: string;
}

const questions: Record<Language, Questions> = {
  en: {
    1: "I have felt cheerful and in good spirits",
    2: "I have felt calm and relaxed",
    3: "I have felt active and vigorous",
    4: "I woke up feeling fresh and rested",
    5: "My daily life has been filled with things that interest me",
    6: "I have learned / gained something from the session",
  },
  af: {
    1: "Ek het bly en vrolik gevoel",
    2: "Ek het kalm en ontspanne gevoel",
    3: "Ek het energiek en sterk gevoel",
    4: "Ek het wakker geword en gevoel asof ek heeltemal uitgerus is",
    5: "My daaglikse lewe was vol dinge wat ek interessant vind",
    6: "Ek het iets nuuts geleer tydens die sessie",
  },
};

const answers: Record<Language, Answers> = {
  en: {
    1: "At no time",
    2: "Less than half the time",
    3: "More than half the time",
    4: "Most of the time",
    5: "All of the time",
  },
  af: {
    1: "Nooit nie",
    2: "Minder as die helfte van die tyd",
    3: "Meer as die helfte van die tyd",
    4: "Meeste van die tyd",
    5: "Die hele tyd",
  },
};

function QuestionnaireTable(props: { lanuage: Language }) {
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th className="tcol-question">Questions</th>
            {[5, 4, 3, 2, 1].map((i) => {
              const answer = answers[props.lanuage][i];
              return (
                <th className="tcol-ans" key={i}>
                  {answer + " (" + i + ")"} 
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {Object.entries(questions[props.lanuage]).map(
            ([questionKey, question]) => (
              <tr key={questionKey}>
                <td>{question}</td>
                {Object.keys(answers[props.lanuage]).map((answerKey) => (
                  <td key={answerKey}>
                    {/* You can place your input fields or data here */}
                  </td>
                ))}
              </tr>
            )
          )}
        </tbody>
      </table>
    </div>
  );
}

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState<Language>("en");
  const [selectedSchool, setSelectedSchool] = useState<string>("");
  const [selectedClass, setSelectedClass] = useState<string>("");
  const [selectedTerm, setSelectedTerm] = useState<Term>("T1");

  return (
    <div>
      <div className="print-selectors">
        <div>{"School: " + selectedSchool}</div>
        <div>{"Class: " + selectedClass}</div>
        <div>{"Term: " + selectedTerm}</div>
      </div>
      <div className="selectors">
        <label>
          <select
            value={selectedLanguage}
            onChange={(e) => setSelectedLanguage(e.target.value as Language)}
          >
            <option value="en">English</option>
            <option value="af">Afrikaans</option>
          </select>
        </label>
        <label>
          School:
          <input
            type="text"
            value={selectedSchool}
            onChange={(e) => setSelectedSchool(e.target.value)}
          ></input>
        </label>
        <label>
          Class:
          <input
            type="text"
            value={selectedClass}
            onChange={(e) => setSelectedClass(e.target.value)}
          ></input>
        </label>
        <label>
          Term:
          <select
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value as Term)}
          >
            {terms.map((t) => {
              return (
                <option key={t} value={t}>
                  {t}
                </option>
              );
            })}
          </select>
        </label>
      </div>
      <QuestionnaireTable lanuage={selectedLanguage} />
      <div className="qrcode">
        <QRCode
          value={JSON.stringify({
            school: selectedSchool,
            class: selectedClass,
            term: selectedTerm,
            lang: selectedLanguage,
          })}
          viewBox={`0 0 100 100`}
        />
      </div>
      <button
        onClick={() => {
          window.print();
        }}
      >
        Print
      </button>
    </div>
  );
}

export default App;
