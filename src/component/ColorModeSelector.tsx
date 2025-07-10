import React, { useState } from 'react';
import styled from 'styled-components';

export type ColorMode = 'yellow' | 'pink' | 'blue';

export interface ColorTheme {
  primary: string;
  secondary: string;
  background: string;
  text: string;
  accent: string;
  buttonBg: string;
  buttonBorder: string;
  hexagonPrimary: string;
  hexagonSecondary: string;
  hexagonSelected: string;
  hexagonSelectedBorder: string;
}

export const COLOR_THEMES: Record<ColorMode, ColorTheme> = {
  yellow: {
    primary: '#FFD700',
    secondary: '#DAA520',
    background: '#333',
    text: '#EEE',
    accent: '#FFD700',
    buttonBg: '#666',
    buttonBorder: '#555',
    hexagonPrimary: '#FFD700',
    hexagonSecondary: '#DAA520',
    hexagonSelected: '#FFEA00',
    hexagonSelectedBorder: '#CC5500'
  },
  pink: {
    primary: '#FF69B4',
    secondary: '#FF1493',
    background: '#1a1a1a',
    text: '#FFB6C1',
    accent: '#FF69B4',
    buttonBg: '#2d2d2d',
    buttonBorder: '#444',
    hexagonPrimary: '#FF69B4',
    hexagonSecondary: '#FF1493',
    hexagonSelected: '#FFB6C1',
    hexagonSelectedBorder: '#8B008B'
  },
  blue: {
    primary: '#87CEEB',
    secondary: '#4682B4',
    background: '#f0f8ff',
    text: '#2F4F4F',
    accent: '#191970',
    buttonBg: '#e6f3ff',
    buttonBorder: '#b3d9ff',
    hexagonPrimary: '#87CEEB',
    hexagonSecondary: '#4682B4',
    hexagonSelected: '#B0E0E6',
    hexagonSelectedBorder: '#4169E1'
  }
};

interface ColorModeSelectorProps {
  currentMode: ColorMode;
  onChange: (mode: ColorMode) => void;
}

const ColorModeContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 100;
`;

const ColorModeButton = styled.button<{ $color: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: 3px solid #555;
  background: ${props => props.$color};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    border-color: #777;
  }
`;

const ColorPopup = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  background: rgba(0, 0, 0, 0.9);
  border-radius: 8px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 2px solid #555;
  min-width: 120px;
`;

const ColorOption = styled.button<{ $color: string; $isActive: boolean }>`
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid ${props => props.$isActive ? '#fff' : '#555'};
  background: ${props => props.$color};
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    transform: scale(1.1);
    border-color: #777;
  }
`;

const ColorLabel = styled.span`
  color: #EEE;
  font-size: 0.9em;
  text-transform: capitalize;
  margin-left: 8px;
`;

const ColorOptionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const ColorModeSelector: React.FC<ColorModeSelectorProps> = ({ currentMode, onChange }) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  
  const currentTheme = COLOR_THEMES[currentMode];
  
  const handleColorChange = (mode: ColorMode) => {
    onChange(mode);
    setIsPopupOpen(false);
  };

  return (
    <ColorModeContainer>
      <ColorModeButton 
        $color={currentTheme.primary}
        onClick={() => setIsPopupOpen(!isPopupOpen)}
      />
      
      {isPopupOpen && (
        <ColorPopup>
          {Object.entries(COLOR_THEMES).map(([mode, theme]) => (
            <ColorOptionRow key={mode}>
              <ColorOption
                $color={theme.primary}
                $isActive={currentMode === mode}
                onClick={() => handleColorChange(mode as ColorMode)}
              />
              <ColorLabel>{mode}</ColorLabel>
            </ColorOptionRow>
          ))}
        </ColorPopup>
      )}
    </ColorModeContainer>
  );
};

export default ColorModeSelector;