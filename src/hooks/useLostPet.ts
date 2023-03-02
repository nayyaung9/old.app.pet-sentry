import React, { useState } from "react";

const useLostPet = () => {
  const [activeStepNo, setActiveStepNo] = useState(1);

  const onNext = () => {
    setActiveStepNo((prevActiveStep) => prevActiveStep + 1);
  };

  const onPrev = () => setActiveStepNo((prevActiveStep) => prevActiveStep - 1);

  // Modals States
  const [petTypeModal, setPetTypeModal] = useState(false);
  const [genderModal, setGenderModal] = useState(false);
  const [collarModal, setCollarModal] = useState(false);
  const [lostDateModal, setLostDateModal] = useState(false);

  const togglePetTypeModal = () => setPetTypeModal(!petTypeModal);
  const toggleGenderModal = () => setGenderModal(!genderModal);
  const toggleCollarColorModal = () => setCollarModal(!collarModal);
  const toggleLostDateModal = () => setLostDateModal(!lostDateModal);

  return {
    activeStepNo,
    onNext,
    onPrev,

    togglePetTypeModal,
    petTypeModal,

    toggleGenderModal,
    genderModal,

    toggleCollarColorModal,
    collarModal,

    lostDateModal,
    toggleLostDateModal,
  };
};

export default useLostPet;
