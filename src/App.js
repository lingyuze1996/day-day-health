import { authCode, authRefreshToken } from './apis/AuthAPI';
import './App.css';
import Tracker from './components/Tracker';


function App() {
  const AUTH_URL = "https://auth.daydayhealth.cf/login?response_type=code&client_id=1ulb350s6u8a4efebc44la1ku4&redirect_uri=https://www.daydayhealth.cf"

  // Try to get code from path query string parameters
  let regex = /\?code=(.*)$/
  let code = window.location.href.match(regex)?.[1]

  if (code !== undefined) {
    authCode(code)
      .then((data) => {
        if (data.error) {
          window.location.href = AUTH_URL
        } else {
          localStorage.setItem("refreshToken", data["refresh_token"])
          localStorage.setItem("idToken", data["id_token"])
        }
      })
      .catch(e => {
        console.log("Code Auth Error", e)
        window.location.href = AUTH_URL
      })
  } else {
    // Try to fetch refresh token from local storage
    let refreshToken = localStorage.getItem("refreshToken")

    if (refreshToken !== null) {
      authRefreshToken(refreshToken).then((data) => {
        if (data.error) {
          window.location.href = AUTH_URL
        } else {
          localStorage.setItem("idToken", data["id_token"])
        }
      })
    } else {
      window.location.href = AUTH_URL
    }
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