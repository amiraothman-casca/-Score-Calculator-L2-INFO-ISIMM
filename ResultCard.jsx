// src/components/ResultCard.jsx

function ResultCard({
  average,
  mention,
  isPassed,
  resetGrades,
}) {
  return (
    <div className="result-card">
      <h2>
  Moyenne du semestre : {average}
</h2>

<h3>
  Mention : {mention}
</h3>

<button
  className="reset-btn"
  onClick={resetGrades}
>
  Réinitialiser les notes
</button>
    </div>
  );
}

export default ResultCard;