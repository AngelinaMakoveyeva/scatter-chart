import './App.css'
import { ScatterChart, Scatter, Cell, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, TooltipProps } from 'recharts';
import { defaultData, Point, points, types } from './data';
import { useMemo, useState } from 'react';

function App() {
  // Состояние для хранения выбранных типов точек
  const [selectedTypes, setSelectedTypes] = useState<number[]>(types.map(type => type.id));
  const [isDefaultData, setIsDefaultData] = useState(false); // Новое состояние для отслеживания defaultData

  // Используем useMemo для фильтрации точек по выбранным типам
  const filteredPoints = useMemo(() => {
    if (selectedTypes.length === 0) {
      setIsDefaultData(true);
      return defaultData;
    }
    setIsDefaultData(false);
    return points.filter(point => selectedTypes.includes(point.typeId));
  }, [selectedTypes]);

  // Получаем цвет для типа точки
  const getColorByType = (typeId: number) => {
    const type = types.find(type => type.id === typeId);
    return type ? type.color : '';
  };

  // Обработчик изменения состояния выбранных типов
  const handleTypeChange = (id: number) => {
    setSelectedTypes(prev => {
      if (prev.includes(id)) {
        const newSelectedTypes = prev.filter(t => t !== id);
        return newSelectedTypes.length > 0 ? newSelectedTypes : []; // Возвращаем пустой массив, если все типы убраны
      } else {
        return [...prev, id]; 
      }
    });
  };

  // Кастомная подсказка
  const customTooltip = ({
    active,
    payload,
  }: TooltipProps<number, string>) => {
    if (!active || !payload || !payload.length) return null;

    const point = payload[0].payload as Point;

    // Если тип 0 (defaultData), не показываем тултип
    if (point.typeId === 0) return null;

    const type = types.find((t) => t.id === point.typeId);
    return (
      <div className="custom-tooltip">
        <p>{type ? type.description : 'Тип не найден'}</p>
      </div>
    );
  };

  return (
    <>
      <h1 className='title'>Точечный график с фильтрацией типов</h1>
      <div style={{ marginBottom: '20px' }}>
        <h3>Выбор типов точек:</h3>
        <div className='types__block'>
          {types.map(type => (
            <label key={type.id} className='types__label' >
              <input
                type='checkbox'
                checked={selectedTypes.includes(type.id)}
                onChange={() => handleTypeChange(type.id)}
              />
              <span className='types__circle'
                style={{ backgroundColor: type.color }}
              ></span>
              {type.type}
            </label>
          ))}
        </div>
      </div>

      <ResponsiveContainer width='100%' height={400}>
        <ScatterChart width={800} height={400} data={points}>
          <CartesianGrid stroke='trasparent' />
          <XAxis type='number' dataKey='x' name='Координата X' />
          <YAxis type='number' dataKey='y' name='Координата Y' />
          <Tooltip content={customTooltip} cursor={{ strokeDasharray: '3 3' }} />
          {/* Рендерим точки только если есть отфильтрованные точки */}
          <Scatter data={filteredPoints}>
            {filteredPoints.map((point, index) => (
              <Cell
                key={`cell-${index}`}
                fill={isDefaultData ? 'transparent' : getColorByType(point.typeId)} // Цвет для defaultData
              />
            ))}
          </Scatter>
        </ScatterChart>
      </ResponsiveContainer>
    </>
  );
}

export default App;
