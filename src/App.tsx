
import { Route, Routes } from 'react-router-dom';
import "./App.css";

function App() {
  return (
    <div className="min-h-screen">
      <Routes>
        <Route path="/">
          {/* <Home /> */}
        </Route>
        <Route path="/app">{/* <About /> */}</Route>
        <Route path="/chair">{/* <Dashboard /> */}</Route>
      </Routes>
    </div>
  );
}

export default App;
