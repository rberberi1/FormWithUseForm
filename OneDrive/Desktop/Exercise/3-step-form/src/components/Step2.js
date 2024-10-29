function Step2({ data, handleChange, onNext, onPrevious }) {
  return (
    <div className="step-container">
      <h2>Step 2</h2>
      <input
        type="number"
        name="age"
        placeholder="Age"
        value={data.step2.age}
        onChange={handleChange}
      />
      <input
        type="text"
        name="gender"
        placeholder="Gender"
        value={data.step2.gender}
        onChange={handleChange}
      />
      <div className="btn-div">
      <button onClick={onPrevious}>Previous</button>
      <button onClick={onNext}>Next</button>
      </div>
    </div>
  );
}

export default Step2;
