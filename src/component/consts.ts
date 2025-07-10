// ゲームモードの型定義
export type GameMode = 'easy' | 'normal' | 'hard' | 'ultimate-hard' | 'oh-my-god';

/**
 * ゲームモード別の設定
 * 
 * @description 各ゲームモードの詳細設定を定義
 * 
 * **Easy**: 初心者向けモード
 * - 目標値: 1～15
 * - 演算子: 加算・減算のみ
 * - 数字範囲: 1桁（1～9）のみ
 * - 特徴: シンプルな計算で基本操作を学習
 * 
 * **Normal**: 中級者向けモード
 * - 目標値: 1～30
 * - 演算子: 四則演算すべて
 * - 数字範囲: 1桁（1～9）のみ
 * - 特徴: 全ての演算子を使用、適度な難易度
 * 
 * **Hard**: 上級者向けモード
 * - 目標値: 10～50
 * - 演算子: 四則演算すべて
 * - 数字範囲: 1桁（1～9）と2桁（10～20）を50%の確率で混在
 * - 特徴: 2桁の数字が加わり計算が複雑化、より高い目標値
 * 
 * **Ultimate Hard**: 超上級者向けモード
 * - 目標値: 20～100
 * - 演算子: 四則演算すべて
 * - 数字範囲: 1桁（1～9）と2桁（10～20）を70%の確率で混在
 * - 特徴: より大きな目標値と高い2桁数字出現率
 * 
 * **Oh My God**: 最高難易度モード
 * - 目標値: 50～300
 * - 演算子: 四則演算すべて
 * - 数字範囲: 1桁（1～9）と2桁（10～30）を80%の確率で混在
 * - 特徴: 最大の挑戦、30までの数字と極めて高い目標値
 */
export const MODE_CONFIG = {
  easy: {
    targetMinValue: 1,
    targetMaxValue: 15,
    operators: ['+', '-'],
    numberRanges: {
      singleDigit: { min: 1, max: 9 },
      doubleDigit: { min: 10, max: 20 },
      useTwoDigit: false
    }
  },
  normal: {
    targetMinValue: 1,
    targetMaxValue: 30,
    operators: ['+', '-', '×', '÷'],
    numberRanges: {
      singleDigit: { min: 1, max: 9 },
      doubleDigit: { min: 10, max: 20 },
      useTwoDigit: false
    }
  },
  hard: {
    targetMinValue: 10,
    targetMaxValue: 50,
    operators: ['+', '-', '×', '÷'],
    numberRanges: {
      singleDigit: { min: 1, max: 9 },
      doubleDigit: { min: 10, max: 20 },
      useTwoDigit: true,
      twoDigitProbability: 0.5
    }
  },
  'ultimate-hard': {
    targetMinValue: 20,
    targetMaxValue: 100,
    operators: ['+', '-', '×', '÷'],
    numberRanges: {
      singleDigit: { min: 1, max: 9 },
      doubleDigit: { min: 10, max: 20 },
      useTwoDigit: true,
      twoDigitProbability: 0.7
    }
  },
  'oh-my-god': {
    targetMinValue: 50,
    targetMaxValue: 300,
    operators: ['+', '-', '×', '÷'],
    numberRanges: {
      singleDigit: { min: 1, max: 9 },
      doubleDigit: { min: 10, max: 30 },
      useTwoDigit: true,
      twoDigitProbability: 0.8
    }
  }
} as const satisfies Record<GameMode, { 
  targetMinValue: number;
  targetMaxValue: number; 
  operators: string[]; 
  numberRanges: {
    singleDigit: { min: number; max: number };
    doubleDigit: { min: number; max: number };
    useTwoDigit: boolean;
    twoDigitProbability?: number;
  }
}>;
