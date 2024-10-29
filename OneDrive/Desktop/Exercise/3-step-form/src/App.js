import React from 'react';
import Step1 from './components/Step1';
import Step2 from './components/Step2';
import Step3 from './components/Step3';
import CompletedForm from './components/CompletedForm'
import useForm from './hooks/useForm';

function App() {
  const { currentStep, nextStep, prevStep, data, handleChange, submitted, submitForm , handleDone } = useForm();

  const renderStep = () => {

    if (submitted) {
      return <CompletedForm data={data} handleDone={handleDone} />;
    }
    switch (currentStep) {
      case 1:
        return <Step1 data={data} handleChange={handleChange} onNext={nextStep} />;
      case 2:
        return <Step2 data={data} handleChange={handleChange} onNext={nextStep} onPrevious={prevStep} />;
      case 3:
        return <Step3 data={data} handleChange={handleChange} onPrevious={prevStep} onSubmit={submitForm} />;
      default:
        return <Step1 data={data} handleChange={handleChange} onNext={nextStep} />;
    }
  };

  return (
    <div className="App">
      <h1 className='main-title'>3-Step Form</h1>
      {renderStep()}
    </div>
  );
}

export default App;
