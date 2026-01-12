import React, { useState } from 'react';
import { ViewState } from './types';
import Layout from './components/Layout';
import Home from './components/Home';
import PlanList from './components/PlanList';
import PhoneList from './components/PhoneList';
import AIAdvisor from './components/AIAdvisor';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>('home');

  const renderContent = () => {
    switch (currentView) {
      case 'home':
        return <Home onChangeView={setCurrentView} />;
      case 'plans':
        return <PlanList />;
      case 'phones':
        return <PhoneList />;
      case 'advisor':
        return <AIAdvisor />;
      default:
        return <Home onChangeView={setCurrentView} />;
    }
  };

  return (
    <Layout currentView={currentView} onChangeView={setCurrentView}>
      {renderContent()}
    </Layout>
  );
};

export default App;