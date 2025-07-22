import { BrowserRouter,Routes,Route } from "react-router-dom"
import Body from "./Components/Body"
import Profile from "./Components/Profile"
import Login from "./Components/Login"
import { Provider } from "react-redux"
import appStore from "./utils/store/appStore"
import Feed from "./Components/Feed"


function App() {
  return (
    <>
        <Provider store={appStore}>
        <BrowserRouter basename="/">
          <Routes>
            <Route path="/" element={<Body />}>
              <Route path="/" element={<Feed />}/>
              <Route path="/login" element={<Login />}/>
              <Route path="/profile" element={<Profile />}/>
            </Route>
          </Routes>
        </BrowserRouter>
        </Provider>
    </>
  )
}

export default App
