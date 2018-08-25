import * as React from 'react';
import './App.css';
import Dashboard from './components/Dashboard';

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <div className="App-intro">
          <Dashboard />
        </div>
      </div>
    );
  }
}
export default App;
