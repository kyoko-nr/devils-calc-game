import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';

// ボタンの型定義
interface Button {
  id: number;
  value: number;
  operator: string;
}

const operators = ['+', '-', '×', '÷'];

// 指定されたオペランドと演算子で計算するヘルパー関数
const calculate = (num1: number, operator: string, num2: number): number | null => {
  switch (operator) {
    case '+':
      return num1 + num2;
    case '-':
      return num1 - num2;
    case '×':
      return num1 * num2;
    case '÷':
      // 0での割り算、または割り切れない場合はnullを返す
      if (num2 === 0 || num1 % num2 !== 0) return null;
      return num1 / num2;
    default:
      return null;
  }
};

// 1桁または2桁の数字を生成するヘルパー関数 (最大20まで)
const generateNumber = (isTwoDigit: boolean): number => {
  if (isTwoDigit) {
    return Math.floor(Math.random() * 11) + 10; // 10〜20
  } else {
    return Math.floor(Math.random() * 9) + 1; // 1〜9
  }
};

// 正解が必ず存在するボタンとターゲットナンバーを生成する関数
const generateSolvableGame = (): { buttons: Button[]; targetNumber: number } => {
  let solvableButtons: Button[] = [];
  let targetNumber = 0;
  let attempts = 0;

  while (solvableButtons.length < 3 && attempts < 1000) {
    attempts++;

    const valIsTwoDigit1 = Math.random() < 0.5;
    const valIsTwoDigit2 = Math.random() < 0.5;
    const valIsTwoDigit3 = Math.random() < 0.5;

    const value1 = generateNumber(valIsTwoDigit1);
    const value2 = generateNumber(valIsTwoDigit2);
    const value3 = generateNumber(valIsTwoDigit3);

    const op1 = operators[Math.floor(Math.random() * operators.length)];
    const op2 = operators[Math.floor(Math.random() * operators.length)];

    let result: number | null = null;
    const firstCalcResult = calculate(value1, op1, value2);

    if (firstCalcResult !== null) {
      result = calculate(firstCalcResult, op2, value3);
    }

    if (result !== null && Number.isInteger(result) && result > 0 && result < 200) {
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
    const needsTwoDigit = 5 - currentTwoDigitCount;
    const remainingSlots = 10 - i;

    if (needsTwoDigit > 0 && Math.random() < (needsTwoDigit / remainingSlots)) {
        value = generateNumber(true);
        currentTwoDigitCount++;
    } else {
        value = generateNumber(false);
    }

    const operator = operators[Math.floor(Math.random() * operators.length)];
    remainingButtons.push({ id: i, value, operator });
  }

  const allButtons = [...solvableButtons, ...remainingButtons].sort(() => Math.random() - 0.5);

  return { buttons: allButtons, targetNumber };
};

// --- Styled Components の定義 (変更なし) ---

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #333;
    color: #eee;
    font-family: 'Arial', sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    margin: 0;
    overflow: hidden;
  }
`;

const GameContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  padding: 20px;
  background-color: #444;
  border-radius: 10px;
  box-shadow: 0 10px 25px rgba(0,0,0,0.7);
  border: 2px solid #555;
  max-width: 600px;
  margin: auto;
`;

const Title = styled.h1`
  color: #FFD700;
  text-shadow: 2px 2px 5px rgba(0,0,0,0.5);
  margin-bottom: 10px;
`;

const TargetNumber = styled.p`
  font-size: 1.8em;
  font-weight: bold;
  color: #EEE;
  text-shadow: 1px 1px 3px rgba(0,0,0,0.5);
`;

const ButtonGrid = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
`;

const PyramidRow = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: -20px;
  
  &:not(:last-child) > button {
    margin-right: 8px;
  }

  &:not(:first-child) {
    margin-top: -30px;
  }
`;

interface HexagonButtonProps {
  $isSelected: boolean;
}

const HexagonButton = styled.button<HexagonButtonProps>`
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
  margin: 4px;
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

const SelectedButtonsContainer = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const SelectedButtonSpan = styled.span`
  margin: 5px;
  padding: 8px 12px;
  background-color: #666;
  border: 1px solid #FFD700;
  border-radius: 5px;
  color: #FFF;
  font-size: 1.2em;
  display: inline-block;
  box-shadow: 0 2px 5px rgba(0,0,0,0.3);
`;

const Controls = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 15px;
`;

const ActionButton = styled.button`
  padding: 12px 25px;
  font-size: 1.2em;
  font-weight: bold;
  color: #333;
  background: linear-gradient(180deg, #FFC107, #FFA000);
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

const Message = styled.p`
  margin-top: 25px;
  font-size: 1.4em;
  font-weight: bold;
  color: #FFEA00;
  text-shadow: 1px 1px 5px rgba(0,0,0,0.7);
`;

// --- メインコンポーネント ---

const CalculationGame: React.FC = () => {
  const [buttons, setButtons] = useState<Button[]>([]);
  const [targetNumber, setTargetNumber] = useState<number>(0);
  const [selectedButtons, setSelectedButtons] = useState<Button[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isResultDisplayed, setIsResultDisplayed] = useState<boolean>(false); // 計算結果表示中フラグ

  useEffect(() => {
    resetGame();
  }, []);

  // 選択されたボタンが3つになったら自動的に計算を実行
  useEffect(() => {
    // isResultDisplayed が false の時にのみ計算をトリガー
    if (selectedButtons.length === 3 && !isResultDisplayed) {
      calculateResult();
    }
  }, [selectedButtons, isResultDisplayed]);

  const resetGame = () => {
    const { buttons: newButtons, targetNumber: newTarget } = generateSolvableGame();
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
      <GlobalStyle />
      <GameContainer>
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
                    onClick={() => handleButtonClick(button)}
                    disabled={isDisabled} // ここを修正
                    $isSelected={isSelected}
                  >
                    {button.operator}{button.value}
                  </HexagonButton>
                );
              })}
            </PyramidRow>
          ))}
        </ButtonGrid>

        <SelectedButtonsContainer>
          {
            selectedButtons.map((button, index) => (
              <SelectedButtonSpan key={button.id}>
                {index === 0 ? '' : button.operator}{button.value}
              </SelectedButtonSpan>
            ))
          }
        </SelectedButtonsContainer>

        <Controls>
          <ActionButton onClick={resetGame}>
            Reset
          </ActionButton>
        </Controls>

        {message && <Message>{message}</Message>}
      </GameContainer>
    </>
  );
};

export default CalculationGame;