import React from "react";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import "./App.css";
import { ReduxStoreProvider } from "./model/store";
import { QueryClient, QueryClientProvider } from "react-query";
import MainForm from "./components/MainForm";

const queryClient = new QueryClient();
const App: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ReduxStoreProvider>
        <DndProvider backend={HTML5Backend}>
          <div className="App">
            <h1>Steps App</h1>
            <MainForm />
          </div>
        </DndProvider>
      </ReduxStoreProvider>
    </QueryClientProvider>
  );
};

export default App;
