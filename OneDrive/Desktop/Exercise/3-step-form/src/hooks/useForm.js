import { useState, useEffect } from 'react';

function useForm() {
  const initialData = {
    step1: { name: '', surname: '' },
    step2: { age: '', gender: '' },
    step3: { companyName: '', companyCode: '' },
  };

  const savedStep1 = JSON.parse(localStorage.getItem('step1')) || initialData.step1;
  const savedStep2 = JSON.parse(localStorage.getItem('step2')) || initialData.step2;
  const savedStep3 = JSON.parse(localStorage.getItem('step3')) || initialData.step3;
  const savedCurrentStep = parseInt(localStorage.getItem('currentStep')) || 1;

  const [data, setData] = useState({
    step1: savedStep1,
    step2: savedStep2,
    step3: savedStep3,
  });
  const [currentStep, setCurrentStep] = useState(savedCurrentStep);
  const [submitted, setSubmitted] = useState(false);

 
  useEffect(() => {
    localStorage.setItem( `step${currentStep}`, JSON.stringify(data[`step${currentStep}`]));
    localStorage.setItem( 'currentStep', currentStep);
  }, [currentStep]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [`step${currentStep}`]: {
        ...prev[`step${currentStep}`],
        [name]: value,
      },
    }));
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, 3));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const submitForm = () => {
    setSubmitted(true);
  }

  const handleDone = () => {
    setData(initialData); 
    setCurrentStep(1);    
    setSubmitted(false);   
    localStorage.clear();  
  };

  return {
    data,
    handleChange,
    nextStep,
    prevStep,
    currentStep,
    submitted,
    submitForm,
    handleDone,
  };
}

export default useForm;
