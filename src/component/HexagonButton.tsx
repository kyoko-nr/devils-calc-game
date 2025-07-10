import React from 'react';
import styled from 'styled-components';
import { type ColorTheme } from './ColorModeSelector';

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
  theme: ColorTheme;
}

interface StyledHexagonButtonProps {
  $isSelected: boolean;
  $theme: ColorTheme;
}

const StyledHexagonButton = styled.button<StyledHexagonButtonProps>`
  margin: 0 1px;
  width: 86px;
  height: 98px;
  background: ${props => props.$isSelected ? props.$theme.hexagonSelectedBorder : 'transparent'};
  position: relative;
  clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.5em;
  font-weight: bold;
  color: #333;
  cursor: pointer;
  transition: all 0.2s ease;
  text-shadow: 1px 1px 2px rgba(255,255,255,0.5);
  border: none;

  &::after {
    content: '';
    position: absolute;
    top: ${props => props.$isSelected ? '3px' : '0'};
    left: ${props => props.$isSelected ? '3px' : '0'};
    width: ${props => props.$isSelected ? 'calc(100% - 6px)' : '100%'};
    height: ${props => props.$isSelected ? 'calc(100% - 6px)' : '100%'};
    background: ${props => props.$isSelected
      ? `linear-gradient(180deg, ${props.$theme.hexagonSelected}, ${props.$theme.hexagonSecondary})`
      : `linear-gradient(180deg, ${props.$theme.hexagonPrimary}, ${props.$theme.hexagonSecondary})`};
    clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);
    transition: all 0.2s ease;
    z-index: -1;
  }

  &:hover:not(:disabled)::after {
    background: ${props => props.$isSelected
      ? `linear-gradient(180deg, ${props.$theme.hexagonSelected}dd, ${props.$theme.hexagonSecondary}dd)`
      : `linear-gradient(180deg, ${props.$theme.hexagonPrimary}dd, ${props.$theme.hexagonSecondary}dd)`};
  }

  &:disabled {
    background: ${props => props.$isSelected ? '#999' : 'transparent'};
    cursor: not-allowed;
    opacity: 0.7;
    
    &::after {
      background: linear-gradient(180deg, #A0A0A0, #606060);
      box-shadow: inset 0 0 5px rgba(0,0,0,0.5);
    }
  }
`;

export const HexagonButton: React.FC<HexagonButtonProps> = ({ 
  button, 
  isSelected, 
  isDisabled, 
  onClick,
  theme
}) => {
  return (
    <StyledHexagonButton
      onClick={() => onClick(button)}
      disabled={isDisabled}
      $isSelected={isSelected}
      $theme={theme}
    >
      {button.operator}{button.value}
    </StyledHexagonButton>
  );
};

export type { Button };