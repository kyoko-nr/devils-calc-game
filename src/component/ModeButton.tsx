import React from 'react';
import styled from 'styled-components';

type GameMode = 'easy' | 'normal' | 'hard';

interface ModeButtonProps {
  mode: GameMode;
  isActive: boolean;
  onClick: (mode: GameMode) => void;
}

interface StyledModeButtonProps {
  $isActive: boolean;
}

const ModeButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

const StyledModeButton = styled.button<StyledModeButtonProps>`
  padding: 10px 20px;
  font-size: 1.1em;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  
  ${props => props.$isActive ? `
    background: linear-gradient(180deg, #FFD700, #DAA520);
    color: #333;
    box-shadow: 0 3px 8px rgba(0,0,0,0.4);
  ` : `
    background: #666;
    color: #EEE;
    box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  `}
  
  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.5);
  }
`;

const ModeButton: React.FC<ModeButtonProps> = ({ mode, isActive, onClick }) => {
  const getDisplayName = (mode: GameMode): string => {
    switch (mode) {
      case 'easy':
        return 'Easy';
      case 'normal':
        return 'Normal';
      case 'hard':
        return 'Hard';
      default:
        return mode;
    }
  };

  return (
    <StyledModeButton 
      $isActive={isActive}
      onClick={() => onClick(mode)}
    >
      {getDisplayName(mode)}
    </StyledModeButton>
  );
};

export { ModeButton, ModeButtonContainer };
export type { GameMode };