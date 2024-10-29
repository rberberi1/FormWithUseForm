
function CompletedForm({ data, handleDone }) {
  return (
    <div className="completed-form">
      <h2>Submitted Information</h2>
      <div className="completed-form-step">
        <h3>Step 1</h3>
        <p><strong>Name:</strong> {data.step1.name}</p>
        <p><strong>Surname:</strong> {data.step1.surname}</p>
      </div>
      <div className="completed-form-step">
        <h3>Step 2</h3>
        <p><strong>Age:</strong> {data.step2.age}</p>
        <p><strong>Gender:</strong> {data.step2.gender}</p>
      </div>
      <div className="completed-form-step">
        <h3>Step 3</h3>
        <p><strong>Company Name:</strong> {data.step3.companyName}</p>
        <p><strong>Company Code:</strong> {data.step3.companyCode}</p>
      </div>
      <button className="done-btn" onClick={handleDone}>Done</button>
    </div>
  );
}

export default CompletedForm;
