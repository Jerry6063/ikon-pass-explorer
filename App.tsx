import React, { useState } from 'react';
import { SceneContainer } from './components/Scene/SceneContainer';
import { ResortList } from './components/UI/ResortList';
import { ResortDetail } from './components/UI/ResortDetail';
import { JAPAN_RESORTS } from './data/resorts';
import { Resort } from './types';

function App() {
  const [selectedResort, setSelectedResort] = useState<Resort | null>(null);

  const handleResortSelect = (resort: Resort) => {
    setSelectedResort(resort);
  };

  const handleCloseDetail = () => {
    setSelectedResort(null);
  };

  return (
    <div className="w-full h-screen relative bg-black overflow-hidden selection:bg-ikon-yellow selection:text-black">
      {/* 3D Scene Layer */}
      <div className="absolute inset-0 z-0">
        <SceneContainer 
          resorts={JAPAN_RESORTS} 
          onResortSelect={handleResortSelect}
          selectedResort={selectedResort}
        />
      </div>

      {/* UI Layer */}
      <ResortList 
        resorts={JAPAN_RESORTS} 
        selectedResort={selectedResort}
        onSelect={handleResortSelect}
      />

      <ResortDetail 
        resort={selectedResort} 
        onClose={handleCloseDetail} 
      />

      {/* Footer / Attribution */}
      <div className="absolute bottom-4 left-4 z-10 text-[10px] text-white/20 pointer-events-none md:pointer-events-auto">
        <p>Built with React Three Fiber. Data for demo purposes.</p>
      </div>
    </div>
  );
}

export default App;
