import React from 'react';
import styled from 'styled-components';
import type { GameMode } from './consts';
import { type ColorTheme } from './ColorModeSelector';

interface ModeSelectProps {
  currentMode: GameMode;
  onChange: (mode: GameMode) => void;
  theme: ColorTheme;
}

const ModeSelectContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const StyledModeSelect = styled.select<{ $theme: ColorTheme }>`
  padding: 10px 15px;
  font-size: 1.1em;
  font-weight: bold;
  background: linear-gradient(180deg, ${props => props.$theme.buttonBg}, ${props => props.$theme.buttonBorder});
  color: ${props => props.$theme.text};
  border: 2px solid ${props => props.$theme.buttonBorder};
  border-radius: 5px;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;
  
  &:hover {
    border-color: ${props => props.$theme.primary};
    box-shadow: 0 2px 8px ${props => props.$theme.primary}4D;
  }
  
  &:focus {
    outline: none;
    border-color: ${props => props.$theme.primary};
    box-shadow: 0 0 0 3px ${props => props.$theme.primary}33;
  }
  
  option {
    background: ${props => props.$theme.buttonBg};
    color: ${props => props.$theme.text};
    padding: 5px;
  }
`;

const ModeSelect: React.FC<ModeSelectProps> = ({ currentMode, onChange, theme }) => {
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
        $theme={theme}
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