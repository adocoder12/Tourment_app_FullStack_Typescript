import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

//components
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

//pages
import HomePage from "./pages/HomePage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";
import LoginPage from "./pages/loginPage/LoginPage";
import MyTeamPage from "./pages/myTeamPage/MyTeamPage";
import TeamsPage from "./pages/TeamsPage/TeamsPage";

//redux
import { useAppSelector } from "./redux/hooks/hooks";

function App() {
  const { user, token } = useAppSelector((state) => state.auth);
  return (
    <>
      <div className="app">
        <Router>
          <Header user={user} />
          <div className="container">
            <Routes>
              <Route
                path="/"
                element={token ? <HomePage /> : <Navigate to="/login" />}
              />
              <Route
                path="/login"
                element={!token ? <LoginPage /> : <Navigate to="/" />}
              />
              <Route
                path="/register"
                element={!token ? <RegisterPage /> : <Navigate to="/" />}
              />
              <Route
                path="/myTeam/*"
                element={token ? <MyTeamPage /> : <Navigate to="/" />}
              />
              <Route path="/teams/*" index element={<TeamsPage />} />
              <Route path="*" element={<h1>Not found 404</h1>} />
            </Routes>
          </div>
          <Footer />
        </Router>
      </div>
    </>
  );
}

export default App;

{
  /* Team */
}
{
  /* <Route path=":id" element={<TeamPage />} />
              <Route
                path="/myTeam/:id/createTeam"
                element={token ? <CreateTeamPage /> : <Navigate to="/" />}
              /> */
}

{
  /* Player */
}
{
  /* <Route
                path="/myTeam/:id/players"
                element={token ? <PlayerPage /> : <Navigate to="/" />}
              />
              <Route
                path="/myTeam/:id/players/createPlayer"
                element={token ? <CreatePlayerPage /> : <Navigate to="/" />}
              /> */
}
