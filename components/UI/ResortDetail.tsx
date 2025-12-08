
import React from 'react';
import { Resort } from '../../types';
import { X, ExternalLink, Mountain, Snowflake, ArrowUp } from 'lucide-react';

interface ResortDetailProps {
  resort: Resort | null;
  onClose: () => void;
}

export const ResortDetail: React.FC<ResortDetailProps> = ({ resort, onClose }) => {
  if (!resort) return null;

  // Fallback image if trail map fails to load
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    e.currentTarget.src = 'https://images.unsplash.com/photo-1545562083-c583d014b261?auto=format&fit=crop&q=80&w=1000'; // Generic snowy mountain placeholder
  };

  return (
    <div className="absolute bottom-0 right-0 md:bottom-8 md:right-8 z-20 w-full md:w-[400px] pointer-events-none">
      <div className="bg-space-800/95 backdrop-blur-xl border-t md:border border-white/10 rounded-t-2xl md:rounded-2xl shadow-2xl p-6 pointer-events-auto transform transition-all duration-300 animate-slide-up">
        
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <span className="text-ikon-yellow text-xs font-bold uppercase tracking-widest">{resort.prefecture}</span>
            <h2 className="text-2xl font-display font-bold text-white mt-1">{resort.name}</h2>
          </div>
          <button 
            onClick={onClose}
            className="p-1 rounded-full hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            <X size={20} />
          </button>
        </div>

        {/* Trail Map Preview */}
        <div className="relative aspect-video rounded-lg overflow-hidden bg-space-900 mb-4 group">
          <img 
            src={resort.trailMapImageUrl} 
            alt={`${resort.name} Trail Map`}
            onError={handleImageError}
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-2 left-2 text-xs text-gray-300 font-mono">
            TRAIL MAP PREVIEW
          </div>
        </div>

        {/* Stats Grid - Only show if stats exist */}
        {resort.stats && (
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-white/5 rounded p-2 text-center">
              <Mountain size={16} className="mx-auto text-ikon-yellow mb-1" />
              <div className="text-xs text-gray-400">Elevation</div>
              <div className="font-bold text-sm">{resort.stats.elevation}</div>
            </div>
            <div className="bg-white/5 rounded p-2 text-center">
              <ArrowUp size={16} className="mx-auto text-ikon-yellow mb-1" />
              <div className="text-xs text-gray-400">Runs</div>
              <div className="font-bold text-sm">{resort.stats.runs}</div>
            </div>
            <div className="bg-white/5 rounded p-2 text-center">
              <Snowflake size={16} className="mx-auto text-ikon-yellow mb-1" />
              <div className="text-xs text-gray-400">Snowfall</div>
              <div className="font-bold text-sm">{resort.stats.snowfall}</div>
            </div>
          </div>
        )}

        {/* Info */}
        <div className="space-y-4">
          <div>
            <p className="text-gray-300 text-sm leading-relaxed">
              {resort.shortDescription}
            </p>
          </div>
          
          <div className="p-3 bg-ikon-blue/20 border border-ikon-blue/30 rounded-lg">
            <p className="text-ikon-blue text-xs font-bold uppercase mb-1">Pass Access</p>
            <p className="text-sm text-white">{resort.ikonAccessInfo}</p>
          </div>

          <a 
            href={resort.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-full py-3 bg-white text-black font-bold rounded hover:bg-ikon-yellow transition-colors duration-200 group"
          >
            Visit Official Website
            <ExternalLink size={16} className="ml-2 group-hover:scale-110 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  );
};
