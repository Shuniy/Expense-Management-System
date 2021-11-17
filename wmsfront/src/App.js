import './bootstrap.css';
import './App.css';
import AppHeader from './components/AppHeader';
import AppFooter from './components/AppFooter';
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from "./screens/RegisterScreen";
import TransactionEditScreen from "./screens/TransactionEditScreen";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Container } from 'react-bootstrap';

function App() {
  return (
    <div className="App">
      <AppHeader />
      <Container>
        <main>
          <Router>
            <Routes>
              <Route path="/" exact element={<HomeScreen />} />
              <Route path="/login" exact element={<LoginScreen />} />
              <Route path="/register" exact element={<RegisterScreen />} />
              <Route
                path="/transaction/:id/edit"
                element={<TransactionEditScreen />}
              />
            </Routes>
          </Router>
        </main>
      </Container>
      <AppFooter />
    </div>
  );
}

export default App;
