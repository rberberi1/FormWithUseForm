function Step1( {data, onNext, handleChange }) {

  return (
    <div className="step-container">
      <h2>Step 1</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={data.step1.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="surname"
        placeholder="Surname"
        value={data.step1.surname}
        onChange={handleChange}
      />
      <button  onClick={onNext}>Next</button>
    </div>
  );
}

export default Step1;
