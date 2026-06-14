import { FaGraduationCap } from "react-icons/fa";
import { useState, useEffect } from "react";

import "./App.css";

import { semester1, semester2 } from "./data/modules";

import UECard from "./components/UECard";
import SemesterTabs from "./components/SemesterTabs";
import ResultCard from "./components/ResultCard";

function App() {
  const [grades, setGrades] = useState(() => {
    const saved = localStorage.getItem("grades");
    return saved ? JSON.parse(saved) : {};
  });

  const [activeSemester, setActiveSemester] = useState(1);

  useEffect(() => {
    localStorage.setItem("grades", JSON.stringify(grades));
  }, [grades]);

  const handleChange = (key, value) => {
    if (value === "") {
      setGrades((prev) => ({ ...prev, [key]: "" }));
      return;
    }

    const num = Number(value);

    if (num < 0 || num > 20) {
      alert("La note doit être comprise entre 0 et 20");
      return;
    }

    setGrades((prev) => ({ ...prev, [key]: num }));
  };

  // 🎯 FINAL LOGIC
  const calculateSubjectGrade = (subject) => {
    const tp = Number(grades[`${subject.id}_tp`] || 0);
    const ds = Number(grades[`${subject.id}_ds`] || 0);
    const exam = Number(grades[`${subject.id}_exam`] || 0);

    if (subject.regime === "MX") {
      return tp * 0.2 + ds * 0.1 + exam * 0.7;
    }

    // CC = TP + DS + EXAM (même logique demandée)
    return tp * 0.2 + ds * 0.3 + exam * 0.5;
  };

  const calculateUEAverage = (ue) => {
    let total = 0;
    let coefTotal = 0;

    ue.subjects.forEach((subject) => {
      total += calculateSubjectGrade(subject) * subject.coefficient;
      coefTotal += subject.coefficient;
    });

    return coefTotal ? total / coefTotal : 0;
  };

  const currentSemester =
    activeSemester === 1 ? semester1 : semester2;

  const calculateSemesterAverage = () => {
    let total = 0;
    let coefTotal = 0;

    currentSemester.forEach((ue) => {
      total += calculateUEAverage(ue) * ue.coefficient;
      coefTotal += ue.coefficient;
    });

    return coefTotal ? (total / coefTotal).toFixed(2) : "0.00";
  };

  const getMention = () => {
    const avg = Number(calculateSemesterAverage());

    if (avg >= 16) return "Très Bien";
    if (avg >= 14) return "Bien";
    if (avg >= 12) return "Assez Bien";
    if (avg >= 10) return "Passable";
    return "Controle";
  };

  const isPassed = Number(calculateSemesterAverage()) >= 10;

  const resetGrades = () => {
    localStorage.removeItem("grades");
    setGrades({});
  };

  return (
    <div className="container">
      <h1>
        <FaGraduationCap /> Calculateur de Notes ISIM
      </h1>

      <p className="subtitle">
        Moyenne Semestrielle & Annuelle GL&SI
      </p>

      <SemesterTabs
        activeSemester={activeSemester}
        setActiveSemester={setActiveSemester}
      />

      {currentSemester.map((ue) => (
        <UECard
          key={ue.id}
          ue={ue}
          grades={grades}
          handleChange={handleChange}
          calculateSubjectGrade={calculateSubjectGrade}
          calculateUEAverage={calculateUEAverage}
        />
      ))}

      <ResultCard
        average={calculateSemesterAverage()}
        mention={getMention()}
        isPassed={isPassed}
        resetGrades={resetGrades}
      />
    </div>
  );
}

export default App;