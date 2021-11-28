import { authCode, authRefreshToken } from './apis/AuthAPI';
import './App.css';
import Tracker from './components/Tracker';


function App() {
  // Try to get code from path query string parameters
  let regex = /\?code=(.*)$/
  let code = window.location.href.match(regex)?.[1]

  if (code !== undefined) {
    authCode(code)
  } else {
    // Try to fetch refresh token from local storage
    let refreshToken = localStorage.getItem("refreshToken")
    authRefreshToken(refreshToken)
  }

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
      <footer className="App-footer"><b>{`© Copyright - ${new Date().getFullYear()} - Yuze Ling`}</b></footer>
    </>
  );
}

export default App;