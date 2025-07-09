import React from 'react';
import styled from 'styled-components';

// ボタンの型定義
interface Button {
  id: number;
  value: number;
  operator: string;
}

interface HexagonButtonProps {
  button: Button;
  isSelected: boolean;
  isDisabled: boolean;
  onClick: (button: Button) => void;
}

interface StyledHexagonButtonProps {
  $isSelected: boolean;
}

const StyledHexagonButton = styled.button<StyledHexagonButtonProps>`
  width: 80px;
  height: 92px;
  background: ${props => props.$isSelected
    ? 'linear-gradient(180deg, #FFEA00, #FFC107)'
    : 'linear-gradient(180deg, #FFD700, #DAA520)'};
  position: relative;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  border: ${props => props.$isSelected ? '3px solid #FFF' : 'none'};
  cursor: pointer;
  transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;
  box-shadow: 
    ${props => props.$isSelected
      ? 'inset 0 0 15px rgba(255,255,255,0.8), 0 0 20px rgba(255,215,0,0.8)'
      : 'inset 0 0 10px rgba(255,255,255,0.5), 0 5px 15px rgba(0,0,0,0.5)'};
  text-shadow: 1px 1px 2px rgba(255,255,255,0.5);

  &:hover:not(:disabled) {
    transform: translateY(-3px);
    box-shadow: 
      inset 0 0 10px rgba(255,255,255,0.7), 
      0 8px 20px rgba(0,0,0,0.7);
  }

  &:disabled {
    background: linear-gradient(180deg, #A0A0A0, #606060);
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: inset 0 0 5px rgba(0,0,0,0.5);
  }
`;

export const HexagonButton: React.FC<HexagonButtonProps> = ({ 
  button, 
  isSelected, 
  isDisabled, 
  onClick 
}) => {
  return (
    <StyledHexagonButton
      onClick={() => onClick(button)}
      disabled={isDisabled}
      $isSelected={isSelected}
    >
      {button.operator}{button.value}
    </StyledHexagonButton>
  );
};

export type { Button };