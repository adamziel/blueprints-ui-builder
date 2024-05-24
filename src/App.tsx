import React from 'react';
import StepsList from './components/StepsList';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { StepsProvider } from './context/StepsContext';
import './App.css';

const App: React.FC = () => {
  return (
    <StepsProvider>
      <DndProvider backend={HTML5Backend}>
        <div className="App">
          <h1>Steps App</h1>
          <StepsList />
        </div>
      </DndProvider>
    </StepsProvider>
  );
};

export default App;
