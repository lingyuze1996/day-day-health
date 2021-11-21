import './App.css';
import Tracker from './components/Tracker';

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Daily Health Tracker</h1>
        </header>
        <div className="App-body">
          <Tracker />
        </div>
      </div>
      <footer className="App-footer"><b>© Copyright - 2021 - Yuze Ling </b></footer>
    </>
  );
}

export default App;
