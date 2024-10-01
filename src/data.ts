export interface Point {
  id: number;
  typeId: number;
  x: number;
  y: number;
}

interface PointType {
  id: number;
  type: string;
  description: string;
  color: string;
}

export const defaultData = [
  { x: -800, y: 800, typeId: 0 },
  { x: 800, y: -800, typeId: 0 },
];

// Генерация случайного числа в заданном диапазоне
const getRandomNumber = (min: number, max: number) => {
  return Math.random() * (max - min) + min;
};

export const types: PointType[] = [
  {
    id: 1,
    type: 'Тип 1',
    description: 'Какой-то текст для типа 1',
    color: '#123456',
  },
  {
    id: 2,
    type: 'Тип 2',
    description: 'Какой-то текст для типа 2',
    color: '#177245',
  },
  {
    id: 3,
    type: 'Тип 3',
    description: 'Какой-то текст для типа 3',
    color: '#3357FF',
  },
  {
    id: 4,
    type: 'Тип 4',
    description: 'Какой-то текст для типа 4',
    color: '#FF33A1',
  },
  {
    id: 5,
    type: 'Тип 5',
    description: 'Какой-то текст для типа 5',
    color: '#A133FF',
  },
  {
    id: 6,
    type: 'Тип 6',
    description: 'Какой-то текст для типа 6',
    color: '#33FFD1',
  },
  {
    id: 7,
    type: 'Тип 7',
    description: 'Какой-то текст для типа 7',
    color: '#FFD133',
  },
  {
    id: 8,
    type: 'Тип 8',
    description: 'Какой-то текст для типа 8',
    color: '#D133FF',
  },
];

export const points: Point[] = Array.from({ length: 200 }, (_, index) => ({
  id: index + 1,
  typeId: Math.floor(getRandomNumber(1, 9)), // Привязываем точку к случайному типу (от 1 до 8)
  x: parseFloat(getRandomNumber(-800, 800).toFixed(2)), // Координата X от 0 до 100
  y: parseFloat(getRandomNumber(-800, 800).toFixed(2)), // Координата Y от 0 до 100
}));
