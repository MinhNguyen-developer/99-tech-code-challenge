import React from 'react';
import { ConfigProvider } from 'antd';
import SwapForm from './components/SwapForm';
import './App.css';

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#1890ff',
          borderRadius: 8,
        },
      }}
    >
      <div className="App">
        <SwapForm />
      </div>
    </ConfigProvider>
  );
}

export default App;
