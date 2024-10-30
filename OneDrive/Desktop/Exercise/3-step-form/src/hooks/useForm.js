import { useState, useEffect } from 'react';

function useForm() {
  const initialData = {
    step1: { name: '', surname: '' },
    step2: { age: '', gender: '' },
    step3: { companyName: '', companyCode: '' },
  };

  const savedStep1 = JSON.parse(localStorage.getItem('step1'));
  const savedStep2 = JSON.parse(localStorage.getItem('step2')) 
  const savedStep3 = JSON.parse(localStorage.getItem('step3')) 
  const savedCurrentStep = parseInt(localStorage.getItem('currentStep'))
  
  const [data, setData] = useState(initialData);
  const [currentStep, setCurrentStep] = useState(1);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (savedStep1 || savedStep2 || savedStep3 || savedCurrentStep) {
      setData({
        step1: savedStep1 || initialData.step1,
        step2: savedStep2 || initialData.step2,
        step3: savedStep3 || initialData.step3,
      });
      setCurrentStep(savedCurrentStep || 1);
    }
  }, []);

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
  

  const nextStep = () => {
    localStorage.setItem(`step${currentStep}`, JSON.stringify(data[`step${currentStep}`]));
    localStorage.setItem('currentStep', currentStep + 1);
    setCurrentStep((prev) => prev<3 ? prev+1: 3)
  }

  const prevStep = () =>{
    localStorage.setItem('currentStep', currentStep - 1);
    setCurrentStep((prev) => prev >1 ? prev-1 : 1);
  } 

  const submitForm = () => {
    localStorage.setItem(`step${currentStep}`, JSON.stringify(data[`step${currentStep}`]));
    localStorage.setItem('currentStep', currentStep + 1);
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
