// src/components/SemesterTabs.jsx

function SemesterTabs({
  activeSemester,
  setActiveSemester,
}) {
  return (
    <div className="tabs">
      <button
        className={
          activeSemester === 1
            ? "active-tab"
            : ""
        }
        onClick={() =>
          setActiveSemester(1)
        }
      >
        Semestre 1
      </button>

      <button
        className={
          activeSemester === 2
            ? "active-tab"
            : ""
        }
        onClick={() =>
          setActiveSemester(2)
        }
      >
        Semestre 2
      </button>
    </div>
  );
}

export default SemesterTabs;