import React from 'react';
import './App.css';
import { SendForm } from "./components/SendForm";
import { TemplateForm } from "./components/TemplateForm";

function App() {

  return (
    <div className='App'>
      <SendForm/>
      <TemplateForm/>
    </div>
  );
}

export default App;
