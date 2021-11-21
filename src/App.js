import { authToken } from './apis/AuthAPI';
import './App.css';
import Tracker from './components/Tracker';


function App() {

  // Try to get code from path query string parameters
  let regex = /#id_token=(.*)&access_token=/
  let token = window.location.href.match(regex)?.[1]

  // alert(token)

  // Try to fetch code from local storage
  if (token === undefined) {
    token = localStorage.getItem("token")
  }

  // No Code Provided
  if (token === undefined || token === null) {
    window.location.href = "https://auth.daydayhealth.cf/login?response_type=token&client_id=1ulb350s6u8a4efebc44la1ku4&redirect_uri=https://www.daydayhealth.cf"
  }

  authToken(token)
    .then(claim => {
      if (claim["cognito:username"]) {
        localStorage.setItem("token", token)
      } else {
        window.location.href = "https://auth.daydayhealth.cf/login?response_type=token&client_id=1ulb350s6u8a4efebc44la1ku4&redirect_uri=https://www.daydayhealth.cf"
      }
    })
    .catch(e => { 
      console.log("Token Auth Error", e)
      window.location.href = "https://auth.daydayhealth.cf/login?response_type=token&client_id=1ulb350s6u8a4efebc44la1ku4&redirect_uri=https://www.daydayhealth.cf" 
    })

  return (
    <>
      <div className="App">
        <header className="App-header">
          <h1>Daily Health Tracker</h1>
        </header>

        <div className="App-body">
          {/* <Tracker /> */}
        </div>
      </div>
      <footer className="App-footer"><b>© Copyright - 2021 - Yuze Ling </b></footer>
    </>
  );
}

export default App;
