import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import { HexagonButton, type Button } from './HexagonButton';
import { ModeSelect } from './ModeSelect';
import { calculate, generateNumber } from './logics';
import { MODE_CONFIG, type GameMode } from './consts';
import HelpModal from './HelpModal';
import ColorModeSelector, { type ColorMode, type ColorTheme, COLOR_THEMES } from './ColorModeSelector';

// 正解が必ず存在するボタンとターゲットナンバーを生成する関数
const generateSolvableGame = (mode: GameMode): { buttons: Button[]; targetNumber: number } => {
  let solvableButtons: Button[] = [];
  let targetNumber = 0;
  let attempts = 0;

  while (solvableButtons.length < 3 && attempts < 1000) {
    attempts++;

    // モードに応じて数字生成の設定を取得
    const config = MODE_CONFIG[mode];
    const valIsTwoDigit1 = config.numberRanges.useTwoDigit && Math.random() < (config.numberRanges.twoDigitProbability || 0.5);
    const valIsTwoDigit2 = config.numberRanges.useTwoDigit && Math.random() < (config.numberRanges.twoDigitProbability || 0.5);
    const valIsTwoDigit3 = config.numberRanges.useTwoDigit && Math.random() < (config.numberRanges.twoDigitProbability || 0.5);

    const value1 = generateNumber(valIsTwoDigit1, config.numberRanges.doubleDigit.max);
    const value2 = generateNumber(valIsTwoDigit2, config.numberRanges.doubleDigit.max);
    const value3 = generateNumber(valIsTwoDigit3, config.numberRanges.doubleDigit.max);

    const availableOperators = MODE_CONFIG[mode].operators;
    const op1 = availableOperators[Math.floor(Math.random() * availableOperators.length)];
    const op2 = availableOperators[Math.floor(Math.random() * availableOperators.length)];

    let result: number | null = null;
    const firstCalcResult = calculate(value1, op1, value2);

    if (firstCalcResult !== null) {
      result = calculate(firstCalcResult, op2, value3);
    }

    if (result !== null && Number.isInteger(result) && result >= MODE_CONFIG[mode].targetMinValue && result <= MODE_CONFIG[mode].targetMaxValue) {
      solvableButtons = [
        { id: 0, value: value1, operator: '+' },
        { id: 1, value: value2, operator: op1 },
        { id: 2, value: value3, operator: op2 },
      ];
      targetNumber = result;
    }
  }

  const remainingButtons: Button[] = [];
  let currentTwoDigitCount = solvableButtons.filter(btn => btn.value >= 10).length;

  for (let i = 3; i < 10; i++) {
    let value: number;
    const config = MODE_CONFIG[mode];
    
    if (!config.numberRanges.useTwoDigit) {
      // 1桁の数字のみを使用
      value = generateNumber(false, config.numberRanges.doubleDigit.max);
    } else {
      const needsTwoDigit = 5 - currentTwoDigitCount;
      const remainingSlots = 10 - i;

      if (needsTwoDigit > 0 && Math.random() < (needsTwoDigit / remainingSlots)) {
          value = generateNumber(true, config.numberRanges.doubleDigit.max);
          currentTwoDigitCount++;
      } else {
          value = generateNumber(false, config.numberRanges.doubleDigit.max);
      }
    }

    const availableOperators = MODE_CONFIG[mode].operators;
    const operator = availableOperators[Math.floor(Math.random() * availableOperators.length)];
    remainingButtons.push({ id: i, value, operator });
  }

  const allButtons = [...solvableButtons, ...remainingButtons].sort(() => Math.random() - 0.5);

  return { buttons: allButtons, targetNumber };
};

// --- Styled Components の定義 ---

const GlobalStyle = createGlobalStyle<{ $theme: ColorTheme }>`
  body {
    background-color: ${props => props.$theme.background};
    color: ${props => props.$theme.text};
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    overflow: auto;
    font-size: 16px;
  }
`;

const GameContainer = styled.div<{ $theme: ColorTheme }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: ${props => props.$theme.buttonBg};
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.7);
  border: 2px solid ${props => props.$theme.buttonBorder};
  max-width: 600px;
  margin: auto;
  position: relative;

  @media (max-width: 768px) {
    padding: 15px;
    gap: 15px;
  }
  @media (max-width: 480px) {
    padding: 10px;
    gap: 10px;
    max-width: 95%; // スマートフォンで横幅いっぱいに広げる
  }
`;

const HelpButton = styled.button<{ $theme: ColorTheme }>`
  position: absolute;
  top: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(180deg, ${props => props.$theme.buttonBg}, ${props => props.$theme.buttonBorder});
  border: 2px solid ${props => props.$theme.buttonBorder};
  color: ${props => props.$theme.text};
  font-size: 1.2em;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s ease;
  padding: 0;
  
  &:hover {
    background: linear-gradient(180deg, ${props => props.$theme.primary}, ${props => props.$theme.secondary});
    color: ${props => props.$theme.background};
    border-color: ${props => props.$theme.primary};
    transform: scale(1.1);
  }
  
  &:active {
    transform: scale(0.95);
  }
`;

const TargetNumber = styled.p`
  font-size: 1.8em;
  font-weight: bold;
  color: #EEE;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);

  @media (max-width: 768px) {
    font-size: 1.6em;
  }
  @media (max-width: 480px) {
    font-size: 1.4em;
  }
`;

const ButtonGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 28px;
`;

const PyramidRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: -20px;

  &:not(:first-child) {
    margin-top: -30px;
  }
`;


const SelectedButtonsContainer = styled.div`
  margin-top: 20px;
  text-align: center;
  display: flex;
  gap: 6px;
`;

const SelectedButtonSpan = styled.span<{$isEmpty: boolean; $theme: ColorTheme}>`
  padding: 8px 12px;
  background-color: ${props => props.$isEmpty ? props.$theme.buttonBorder : props.$theme.buttonBg};
  border: 1px solid ${props => props.$isEmpty ? props.$theme.buttonBorder : props.$theme.primary};
  border-radius: 5px;
  color: ${props => props.$isEmpty ? props.$theme.text + '88' : props.$theme.text};
  font-size: 1.2em;
  display: inline-block;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
  min-width: 40px;
  text-align: center;
  
  ${props => props.$isEmpty && `
    background: repeating-linear-gradient(
      90deg,
      ${props.$theme.buttonBorder},
      ${props.$theme.buttonBorder} 4px,
      ${props.$theme.buttonBg} 4px,
      ${props.$theme.buttonBg} 8px
    );
    animation: skeleton-loading 1.5s infinite;
  `}
  
  @keyframes skeleton-loading {
    0% { opacity: 1; }
    50% { opacity: 0.7; }
    100% { opacity: 1; }
  }
`;

const Controls = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 15px;
`;

const ActionButton = styled.button<{ $theme: ColorTheme }>`
  padding: 12px 25px;
  font-size: 1.2em;
  font-weight: bold;
  color: ${props => props.$theme.background};
  background: linear-gradient(180deg, ${props => props.$theme.primary}, ${props => props.$theme.secondary});
  border: none;
  border-radius: 8px;
  cursor: pointer;
  box-shadow: 0 5px 10px rgba(0,0,0,0.4);
  transition: transform 0.1s ease-in-out, box-shadow 0.1s ease-in-out;

  &:disabled {
    background: linear-gradient(180deg, #888, #555);
    cursor: not-allowed;
    opacity: 0.7;
    box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 7px 15px rgba(0,0,0,0.6);
  }
`;

const Message = styled.p<{ $theme: ColorTheme }>`
  margin-top: 25px;
  font-size: 1.4em;
  font-weight: bold;
  color: ${props => props.$theme.accent};
  min-height: 1.4em;
  display: flex;
  align-items: center;
  justify-content: center;
`;


// --- メインコンポーネント ---

const CalculationGame: React.FC = () => {
  const [buttons, setButtons] = useState<Button[]>([]);
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [selectedButtons, setSelectedButtons] = useState<Button[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isResultDisplayed, setIsResultDisplayed] = useState<boolean>(false); // 計算結果表示中フラグ
  const [gameMode, setGameMode] = useState<GameMode>('easy'); // ゲームモードの状態
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false); // ヘルプモーダルの状態
  const [colorMode, setColorMode] = useState<ColorMode>('yellow'); // カラーモードの状態
  
  const currentTheme = COLOR_THEMES[colorMode];

  useEffect(() => {
    resetGame();
  }, []);
  
  // ゲームモードが変更されたときにゲームをリセット
  useEffect(() => {
    resetGame();
  }, [gameMode]);

  // 選択されたボタンが3つになったら自動的に計算を実行
  useEffect(() => {
    // isResultDisplayed が false の時にのみ計算をトリガー
    if (selectedButtons.length === 3 && !isResultDisplayed) {
      calculateResult();
    }
  }, [selectedButtons, isResultDisplayed]);

  const resetGame = () => {
    const { buttons: newButtons, targetNumber: newTarget } = generateSolvableGame(gameMode);
    setButtons(newButtons);
    setTargetNumber(newTarget);
    setSelectedButtons([]);
    setMessage('');
    setIsResultDisplayed(false); // フラグをリセット
  };

  const handleButtonClick = (button: Button) => {
    const isCurrentlySelected = selectedButtons.some((b) => b.id === button.id);

    if (isCurrentlySelected) {
      // 選択済みのボタンを再度押したらクリア
      setSelectedButtons((prevSelected) => prevSelected.filter((b) => b.id !== button.id));
      setMessage(''); // メッセージをクリア
      // 選択が解除されたら、結果表示中フラグをリセット
      setIsResultDisplayed(false); 
    } else if (selectedButtons.length < 3) {
      // 3つ未満の場合は追加
      setSelectedButtons((prevSelected) => [...prevSelected, button]);
    } else {
      // 3つ選択済みで新しいボタンを押した場合はメッセージ
      // （この状態は、計算結果が表示されている間に新しいボタンを押そうとした場合に発生）
      setMessage('3つ選択済み、新しいボタンは選べません。クリアしてね。');
    }
  };

  const calculateResult = () => {
    // selectedButtonsが3つあることはuseEffectで確認済みだが、念のためチェック
    if (selectedButtons.length !== 3) {
      return; 
    }

    let result: number | null = selectedButtons[0].value;

    for (let i = 1; i < selectedButtons.length; i++) {
      const { value, operator } = selectedButtons[i];
      result = calculate(result, operator, value);

      if (result === null) {
        setMessage('Cannot calculate😕');
        setIsResultDisplayed(true); // 計算結果を表示
        return;
      }
    }

    if (result !== null && result === targetNumber) {
      setMessage('🎉 Clear!');
    } else {
      setMessage(`Failed! Your answer is ${result}`);
    }
    setIsResultDisplayed(true); // 計算結果を表示
  };

  const pyramidRows = [
    buttons.slice(0, 1),
    buttons.slice(1, 3),
    buttons.slice(3, 6),
    buttons.slice(6, 10),
  ];

  return (
    <>
      <GlobalStyle $theme={currentTheme} />
      <GameContainer $theme={currentTheme}>
        <ColorModeSelector 
          currentMode={colorMode}
          onChange={setColorMode}
        />
        
        <HelpButton onClick={() => setIsHelpModalOpen(true)} $theme={currentTheme}>
          ?
        </HelpButton>
        
        <ModeSelect 
          currentMode={gameMode}
          onChange={setGameMode}
          theme={currentTheme}
        />
        
        <TargetNumber>Target: <strong>{targetNumber}</strong></TargetNumber>

        <ButtonGrid>
          {pyramidRows.map((rowButtons, rowIndex) => (
            <PyramidRow key={rowIndex}>
              {rowButtons.map((button) => {
                const isSelected = selectedButtons.some((b) => b.id === button.id);
                // ボタンの無効化ロジック:
                // 未選択のボタンは、計算結果が表示中（isResultDisplayedがtrue）の場合に無効化
                const isDisabled = !isSelected && isResultDisplayed;

                return (
                  <HexagonButton
                    key={button.id}
                    button={button}
                    isSelected={isSelected}
                    isDisabled={isDisabled}
                    onClick={handleButtonClick}
                    theme={currentTheme}
                  />
                );
              })}
            </PyramidRow>
          ))}
        </ButtonGrid>

        <SelectedButtonsContainer>
          {Array.from({ length: 3 }, (_, index) => {
            const button = selectedButtons[index];
            const isEmpty = !button;
            
            return (
              <SelectedButtonSpan key={index} $isEmpty={isEmpty} $theme={currentTheme}>
                {isEmpty 
                  ? '?' 
                  : `${index === 0 ? '' : button.operator}${button.value}`
                }
              </SelectedButtonSpan>
            );
          })}
        </SelectedButtonsContainer>

        <Controls>
          <ActionButton onClick={resetGame} $theme={currentTheme}>
            Reset
          </ActionButton>
        </Controls>

        <Message $theme={currentTheme}>{message || '\u00A0'}</Message>
      </GameContainer>
      
      <HelpModal 
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />
    </>
  );
};

export default CalculationGame;