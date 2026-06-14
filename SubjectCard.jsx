function SubjectCard({
  subject,
  grades,
  handleChange,
  calculateSubjectGrade,
}) {
  return (
    <div className="subject-card">
      <h4>
        {subject.name}
        <span> (coef {subject.coefficient})</span>
      </h4>

      {/* MX + CC SAME STRUCTURE */}
      <div className="inputs-grid">
        <input
          type="number"
          min="0"
          max="20"
          placeholder="TP"
          value={grades[`${subject.id}_tp`] || ""}
          onChange={(e) =>
            handleChange(`${subject.id}_tp`, e.target.value)
          }
        />

        <input
          type="number"
          min="0"
          max="20"
          placeholder="DS"
          value={grades[`${subject.id}_ds`] || ""}
          onChange={(e) =>
            handleChange(`${subject.id}_ds`, e.target.value)
          }
        />

        <input
          type="number"
          min="0"
          max="20"
          placeholder="EXAM"
          value={grades[`${subject.id}_exam`] || ""}
          onChange={(e) =>
            handleChange(`${subject.id}_exam`, e.target.value)
          }
        />
      </div>

      <p className="subject-result">
        Note Finale :
        <strong>
          {" "}
          {calculateSubjectGrade(subject).toFixed(2)}
        </strong>
      </p>
    </div>
  );
}

export default SubjectCard;