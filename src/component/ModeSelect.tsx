import React from 'react';
import styled from 'styled-components';
import type { GameMode } from './consts';

interface ModeSelectProps {
  currentMode: GameMode;
  onChange: (mode: GameMode) => void;
}

const ModeSelectContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledModeSelect = styled.select`
  padding: 10px 15px;
  font-size: 1.1em;
  font-weight: bold;
  background: linear-gradient(180deg, #666, #444);
  color: #EEE;
  border: 2px solid #555;
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  
  &:hover {
    border-color: #FFD700;
    box-shadow: 0 2px 8px rgba(255, 215, 0, 0.3);
  }
  
  &:focus {
    outline: none;
    border-color: #FFD700;
    box-shadow: 0 0 0 3px rgba(255, 215, 0, 0.2);
  }
  
  option {
    background: #444;
    color: #EEE;
    padding: 5px;
  }
`;

const ModeSelect: React.FC<ModeSelectProps> = ({ currentMode, onChange }) => {
  const getDisplayName = (mode: GameMode): string => {
    switch (mode) {
      case 'easy':
        return 'Easy';
      case 'normal':
        return 'Normal';
      case 'hard':
        return 'Hard';
      case 'ultimate-hard':
        return 'Ultimate Hard';
      case 'oh-my-god':
        return 'Oh My God';
      default:
        return mode;
    }
  };

  return (
    <ModeSelectContainer>
      <StyledModeSelect
        id="game-mode-select"
        value={currentMode}
        onChange={(e) => onChange(e.target.value as GameMode)}
      >
        <option value="easy">{getDisplayName('easy')}</option>
        <option value="normal">{getDisplayName('normal')}</option>
        <option value="hard">{getDisplayName('hard')}</option>
        <option value="ultimate-hard">{getDisplayName('ultimate-hard')}</option>
        <option value="oh-my-god">{getDisplayName('oh-my-god')}</option>
      </StyledModeSelect>
    </ModeSelectContainer>
  );
};

export { ModeSelect, ModeSelectContainer };