function Step3({ data, handleChange, onPrevious, onSubmit }) {

  return (
    <div className="step-container">
      <h2>Step 3</h2>
      <input
        type="text"
        name="companyName"
        placeholder="Company Name"
        value={data.step3.companyName}
        onChange={handleChange}
      />
      <input
        type="text"
        name="companyCode"
        placeholder="Company Code"
        value={data.step3.companyCode}
        onChange={handleChange}
      />
      <div className="btn-div">
      <button onClick={onPrevious}>Previous</button>
      <button className="submit-btn" onClick={onSubmit}>Submit</button>
      </div>
    </div>
  );
}

export default Step3;
