import React from 'react';
interface ProgressBarProps {
  progress: number;
  showPercentage?: boolean;
  size?: 'sm' | 'md' | 'lg';
  color?: 'blue' | 'green' | 'amber';
}
export const ProgressBar = ({
  progress,
  showPercentage = true,
  size = 'md',
  color = 'blue'
}: ProgressBarProps) => {
  // Ensure progress is between 0 and 100
  const normalizedProgress = Math.min(100, Math.max(0, progress));
  // Height based on size
  const getHeight = () => {
    switch (size) {
      case 'sm':
        return 'h-2';
      case 'md':
        return 'h-4';
      case 'lg':
        return 'h-6';
      default:
        return 'h-4';
    }
  };
  // Color class based on color prop
  const getColorClass = () => {
    switch (color) {
      case 'blue':
        return 'bg-blue-600';
      case 'green':
        return 'bg-green-600';
      case 'amber':
        return 'bg-amber-500';
      default:
        return 'bg-blue-600';
    }
  };
  return <div className="w-full">
      <div className={`w-full bg-gray-200 rounded-full overflow-hidden ${getHeight()}`}>
        <div className={`${getColorClass()} ${getHeight()} transition-all duration-700 ease-out`} style={{
        width: `${normalizedProgress}%`
      }} />
      </div>
      {showPercentage && <div className="text-right text-sm mt-1.5 text-gray-600 font-medium">
          {normalizedProgress.toFixed(0)}% complete
        </div>}
    </div>;
};