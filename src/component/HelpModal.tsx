import React from 'react';
import styled from 'styled-components';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #444;
  border-radius: 10px;
  padding: 30px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.8);
  border: 2px solid #555;
  position: relative;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 15px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.5em;
  color: #EEE;
  cursor: pointer;
  padding: 5px;
  
  &:hover {
    color: #FFD700;
  }
`;

const ModalTitle = styled.h2`
  color: #FFD700;
  margin-bottom: 20px;
  font-size: 1.5em;
  text-align: center;
`;

const RulesSection = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h3`
  color: #EEE;
  margin-bottom: 15px;
  font-size: 1.2em;
`;

const RulesList = styled.ul`
  color: #CCC;
  line-height: 1.6;
  padding-left: 20px;
  
  li {
    margin-bottom: 10px;
  }
`;

const HelpModal: React.FC<HelpModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContent>
        <CloseButton onClick={onClose}>×</CloseButton>
        <ModalTitle>Game Rules</ModalTitle>
        
        <RulesSection>
          <SectionTitle>How to Play</SectionTitle>
          <RulesList>
            <li>Select 3 buttons that calculate to match the target number</li>
            <li>The first button's operator is ignored (treated as the starting number)</li>
            <li>Calculation is performed from left to right using the selected buttons</li>
            <li>Example: If you select buttons with values [5, +3, ×2], the calculation is: 5 + 3 × 2 = 16</li>
          </RulesList>
        </RulesSection>
      </ModalContent>
    </ModalOverlay>
  );
};

export default HelpModal;