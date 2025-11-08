import Test from './pages/test';
import ColorTestPage from './pages/ColorsTestPage';
import ColorChessAnalyticsDashboard from './pages/DashboardColorPage';
import {
    Routes,
    Route
} from 'react-router-dom';
import './App.css';
import Dashboard from './pages/Dashboard';

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Dashboard />}></Route>
                <Route path="/dashboard" element={<Dashboard />}></Route>
                <Route path="/test" element={<Test />}></Route>
                <Route path="/colors" element={<ColorTestPage />}></Route>
                <Route path="/dashboard-colors" element={<ColorChessAnalyticsDashboard />}></Route>
            </Routes>
        </>
    );
}

export default App;