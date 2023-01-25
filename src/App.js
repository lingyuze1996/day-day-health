import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import './App.css';
import Tracker from './components/Tracker';

function App() {
  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Daily Health Tracker</h1>
        </header>
        <Authenticator>
          {({ user, signOut }) => (
            <div className="App-body">
              <Tracker user={user} />
            </div>
          )}
        </Authenticator>
      </div>
      <footer className="App-footer">
        <b>{`© Copyright - ${new Date().getFullYear()} - Yuze Ling`}</b>
      </footer>
    </>
  );
}

export default App;
