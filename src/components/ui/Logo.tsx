import React from 'react';
import { Award } from 'lucide-react';

interface LogoProps {
  className?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "text-purple-600" }) => {
  return (
    <div className={`flex items-center justify-center w-8 h-8 rounded-md ${className}`}>
      <Award size={24} />
    </div>
  );
};

export default Logo;