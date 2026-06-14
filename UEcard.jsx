// src/components/UECard.jsx

import SubjectCard from "./SubjectCard";

function UECard({
  ue,
  grades,
  handleChange,
  calculateSubjectGrade,
  calculateUEAverage,
}) {
  return (
    <div className="ue-card">
      <h2>
        {ue.name}
        <span> (coef {ue.coefficient})</span>
      </h2>

      {ue.subjects.map((subject) => (
        <SubjectCard
          key={subject.id}
          subject={subject}
          grades={grades}
          handleChange={handleChange}
          calculateSubjectGrade={
            calculateSubjectGrade
          }
        />
      ))}

      <div className="ue-average">
        UE Average :
        <strong>
          {" "}
          {calculateUEAverage(ue).toFixed(2)}
        </strong>
      </div>
    </div>
  );
}

export default UECard;