import React from "react";
import StepsList from "./components/StepsList";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import { StepsProvider } from "./context/store";
import { QueryClient, QueryClientProvider } from "react-query";

const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <StepsProvider>
        <DndProvider backend={HTML5Backend}>
          <div className="App">
            <h1>Steps App</h1>
            <StepsList />
          </div>
        </DndProvider>
      </StepsProvider>
    </QueryClientProvider>
  );
};

export default App;
