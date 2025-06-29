import React from 'react';
import './TemperatureBadge.css';

const TemperatureBadge = ({ temperature, likes }) => {
  const getTemperatureConfig = (temp) => {
    switch(temp) {
      case 'BURNING':
        return {
          emoji: '🔥🔥🔥',
          color: '#ff0000',
          bgColor: '#ffebee',
          text: 'BURNING',
          className: 'burning'
        };
      case 'HOT':
        return {
          emoji: '🔥🔥',
          color: '#ff5722',
          bgColor: '#fff3e0',
          text: 'HOT',
          className: 'hot'
        };
      case 'WARM':
        return {
          emoji: '🔥',
          color: '#ff9800',
          bgColor: '#fff8e1',
          text: 'WARM',
          className: 'warm'
        };
      case 'COOL':
        return {
          emoji: '😐',
          color: '#607d8b',
          bgColor: '#f5f5f5',
          text: 'COOL',
          className: 'cool'
        };
      case 'COLD':
        return {
          emoji: '❄️',
          color: '#2196f3',
          bgColor: '#e3f2fd',
          text: 'COLD',
          className: 'cold'
        };
      case 'FROZEN':
        return {
          emoji: '🧊',
          color: '#0d47a1',
          bgColor: '#e8eaf6',
          text: 'FROZEN',
          className: 'frozen'
        };
      default:
        return {
          emoji: '😐',
          color: '#607d8b',
          bgColor: '#f5f5f5',
          text: 'COOL',
          className: 'cool'
        };
    }
  };

  const config = getTemperatureConfig(temperature);

  return (
    <div className={`temperature-badge ${config.className}`}>
      <div className="temperature-content">
        <span className="temperature-emoji">{config.emoji}</span>
        <div className="temperature-info">
          <span className="temperature-text">{config.text}</span>
          <span className="temperature-likes">{likes} 👍</span>
        </div>
      </div>
    </div>
  );
};

export default TemperatureBadge; 