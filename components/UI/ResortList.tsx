import React, { useState } from 'react';
import { Resort } from '../../types';
import { MapPin, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

interface ResortListProps {
  resorts: Resort[];
  selectedResort: Resort | null;
  onSelect: (resort: Resort) => void;
}

export const ResortList: React.FC<ResortListProps> = ({ resorts, selectedResort, onSelect }) => {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <div className="absolute left-4 top-4 z-10 w-80 max-w-[calc(100vw-2rem)]">
      <div className="bg-space-900/80 backdrop-blur-md border border-white/10 rounded-xl overflow-hidden shadow-2xl transition-all duration-300">
        {/* Collapsible Header */}
        <div 
          className="p-4 border-b border-white/10 cursor-pointer hover:bg-white/5 transition-colors flex justify-between items-center"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          <div>
            <h1 className="text-xl font-display font-bold text-white tracking-wide">
              IKON <span className="text-ikon-yellow">JAPAN</span>
            </h1>
            <p className="text-xs text-gray-400 mt-1 uppercase tracking-wider">Pass Destinations</p>
          </div>
          <div className="text-gray-400">
            {isCollapsed ? <ChevronDown size={20} /> : <ChevronUp size={20} />}
          </div>
        </div>
        
        {/* List Content */}
        {!isCollapsed && (
          <div className="max-h-[60vh] overflow-y-auto animate-fade-in">
            {resorts.map((resort) => (
              <button
                key={resort.id}
                onClick={() => onSelect(resort)}
                className={`w-full text-left p-4 transition-all duration-200 border-b border-white/5 last:border-0 group hover:bg-white/5 ${
                  selectedResort?.id === resort.id 
                    ? 'bg-white/10 border-l-4 border-l-ikon-yellow' 
                    : 'border-l-4 border-l-transparent'
                }`}
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className={`font-medium ${selectedResort?.id === resort.id ? 'text-ikon-yellow' : 'text-white'}`}>
                      {resort.name}
                    </h3>
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <MapPin size={12} className="mr-1" />
                      {resort.prefecture}
                    </div>
                  </div>
                  <ChevronRight 
                    size={16} 
                    className={`text-gray-500 transition-transform duration-200 ${
                      selectedResort?.id === resort.id ? 'transform translate-x-1 text-ikon-yellow' : 'group-hover:translate-x-1'
                    }`} 
                  />
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};