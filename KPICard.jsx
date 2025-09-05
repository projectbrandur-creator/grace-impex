import React from 'react';
import Icon from '../../../components/AppIcon';

const KPICard = ({ 
  title, 
  value, 
  unit, 
  trend, 
  trendValue, 
  status, 
  icon, 
  description, 
  onClick,
  className = '' 
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'good':
        return 'text-success border-success/20 bg-success/5';
      case 'warning':
        return 'text-warning border-warning/20 bg-warning/5';
      case 'critical':
        return 'text-error border-error/20 bg-error/5';
      default:
        return 'text-foreground border-border bg-card';
    }
  };

  const getTrendIcon = (trend) => {
    switch (trend) {
      case 'up':
        return 'TrendingUp';
      case 'down':
        return 'TrendingDown';
      default:
        return 'Minus';
    }
  };

  const getTrendColor = (trend) => {
    switch (trend) {
      case 'up':
        return 'text-success';
      case 'down':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const cardClasses = `
    p-4 sm:p-5 rounded-lg border transition-all duration-200
    ${getStatusColor(status)}
    ${onClick ? 'cursor-pointer hover:shadow-md hover:border-primary/30 active:scale-95' : ''}
    ${className}
    w-full sm:w-64 md:w-72 lg:w-80
    h-56 sm:h-60 md:h-64 lg:h-72
    flex flex-col justify-between
    gap-2
    overflow-hidden
  `.replace(/\s+/g, ' ').trim();

  return (
    <div 
      className={cardClasses}
      onClick={onClick}
      role={onClick ? "button" : undefined}
      tabIndex={onClick ? 0 : undefined}
      aria-label={onClick ? `${title} - ${value} ${unit || ''}. Click for details.` : undefined}
      onKeyDown={onClick ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {/* Header section with title and trend */}
      <div className="flex items-start justify-between mb-2 sm:mb-3">
        <div className="flex items-center space-x-2 min-w-0 flex-1">
          <Icon name={icon} size={16} className="text-current opacity-80 flex-shrink-0" />
          <h3 className="text-xs sm:text-sm font-medium text-current truncate">{title}</h3>
        </div>
        
        {trend && (
          <div className={`flex items-center space-x-1 ${getTrendColor(trend)} flex-shrink-0 ml-2`}>
            <Icon name={getTrendIcon(trend)} size={12} />
            <span className="text-xs font-medium whitespace-nowrap">{trendValue}</span>
          </div>
        )}
      </div>

      {/* Value section */}
      <div className="mb-2 sm:mb-3">
        <div className="flex items-baseline space-x-1">
          <span className="text-xl sm:text-2xl font-bold text-current leading-none">{value}</span>
          {unit && <span className="text-xs sm:text-sm text-current opacity-70 whitespace-nowrap">{unit}</span>}
        </div>
      </div>

      {/* Description section - flexible height */}
      {description && (
        <div className="flex-1 mb-2">
          <p className="text-xs text-current opacity-60 leading-relaxed break-words">
            {description}
          </p>
        </div>
      )}

      {/* Click for details section */}
      {onClick && (
        <div className="flex items-center justify-between mt-auto pt-2 border-t border-current border-opacity-10">
          <span className="text-xs text-primary font-medium">
            Click for details
          </span>
          <Icon 
            name="ChevronRight" 
            size={14} 
            className="text-primary opacity-60 transition-opacity hover:opacity-80 flex-shrink-0" 
          />
        </div>
      )}
    </div>
  );
};

export default KPICard;