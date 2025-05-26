import React from 'react';

interface ProgressBarProps {
  value: number;
  max: number;
  color?: string;
  height?: string;
  showText?: boolean;
  text?: string;
  animate?: boolean;
  className?: string;
}

const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max,
  color = 'bg-purple-500',
  height = 'h-2',
  showText = false,
  text,
  animate = true,
  className = '',
}) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  return (
    <div className={className}>
      {showText && (
        <div className="flex justify-between mb-1">
          <span className="text-sm font-medium text-gray-700">
            {text || `${value} / ${max}`}
          </span>
          <span className="text-sm font-medium text-gray-700">{percentage.toFixed(0)}%</span>
        </div>
      )}
      <div className={`w-full ${height} bg-gray-200 rounded-full overflow-hidden`}>
        <div
          className={`${color} ${animate ? 'transition-all duration-500 ease-out' : ''} rounded-full`}
          style={{ width: `${percentage}%` }}
          role="progressbar"
          aria-valuenow={value}
          aria-valuemin={0}
          aria-valuemax={max}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;