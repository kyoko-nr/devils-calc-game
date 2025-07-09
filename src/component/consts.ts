// ゲームモードの型定義
export type GameMode = 'easy' | 'normal' | 'hard';

// モード別の設定
export const MODE_CONFIG = {
  easy: {
    targetMaxValue: 30,
    operators: ['+', '-']
  },
  normal: {
    targetMaxValue: 30,
    operators: ['+', '-', '×', '÷']
  },
  hard: {
    targetMaxValue: 200,
    operators: ['+', '-', '×', '÷']
  }
} as const satisfies Record<GameMode, { targetMaxValue: number; operators: string[] }>;
