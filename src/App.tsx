import React, { useState } from 'react';
import { ViewState } from './types';
import { PrototypeNav } from './components/PrototypeNav';
import { LandingScreen } from './screens/Landing';
import { EnrolmentScreen } from './screens/Enrolment';
import { DashboardScreen } from './screens/Dashboard';
import { KnowledgeScreen } from './screens/Knowledge';
import { PreparationScreen } from './screens/Preparation';
import { ProductionScreen } from './screens/Production';
import { MarketScreen } from './screens/Market';
import { GraduationScreen } from './screens/Graduation';
import { AdminViewScreen } from './screens/AdminView';
import { ParentViewScreen } from './screens/ParentView';
import { GalleryScreen } from './screens/Gallery';

export default function App() {
  const [currentView, setCurrentView] = useState<ViewState>('landing');

  const renderView = () => {
    switch (currentView) {
      case 'landing': 
        return <LandingScreen onEnter={() => setCurrentView('enrolment')} />;
      case 'enrolment': 
        return <EnrolmentScreen />;
      case 'dashboard': 
        // We pass the phase index 1-5 to navigate directly, or we can just navigate to Knowledge for now.
        return <DashboardScreen onViewChange={setCurrentView} onEnterPhase={(phase) => {
          if (phase === 1) setCurrentView('knowledge');
          else if (phase === 2) setCurrentView('preparation');
          else if (phase === 3) setCurrentView('production');
          else if (phase === 4) setCurrentView('market');
          else if (phase === 5) setCurrentView('graduation');
        }} />;
      case 'knowledge': 
        return <KnowledgeScreen onNextPhase={() => setCurrentView('preparation')} />;
      case 'preparation': 
        return <PreparationScreen onNextPhase={() => setCurrentView('production')} />;
      case 'production': 
        return <ProductionScreen onNextPhase={() => setCurrentView('market')} />;
      case 'market': 
        return <MarketScreen onNextPhase={() => setCurrentView('graduation')} />;
      case 'graduation': 
        return <GraduationScreen />;
      case 'gallery':
        return <GalleryScreen onBack={() => setCurrentView('dashboard')} />;
      case 'admin': 
        return <AdminViewScreen onBack={() => setCurrentView('landing')} />;
      case 'parent': 
        return <ParentViewScreen onBack={() => setCurrentView('landing')} />;
      default: 
        return <LandingScreen onEnter={() => setCurrentView('enrolment')} />;
    }
  };

  return (
    <div className="antialiased h-screen overflow-y-auto pb-16">
      {renderView()}
      <PrototypeNav currentView={currentView} onViewChange={setCurrentView} />
    </div>
  );
}
