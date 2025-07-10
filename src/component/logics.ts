// 指定されたオペランドと演算子で計算するヘルパー関数
export const calculate = (num1: number, operator: string, num2: number): number | null => {
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

// 1桁または2桁の数字を生成するヘルパー関数
export const generateNumber = (isTwoDigit: boolean, maxTwoDigit: number = 20): number => {
  if (isTwoDigit) {
    return Math.floor(Math.random() * (maxTwoDigit - 9)) + 10; // 10〜maxTwoDigit
  } else {
    return Math.floor(Math.random() * 9) + 1; // 1〜9
  }
};
