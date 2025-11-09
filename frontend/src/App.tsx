import Test from './pages/test';
import ColorTestPage from './pages/ColorsTestPage';
import ColorChessAnalyticsDashboard from './pages/DashboardColorPage';
import {
    Routes,
    Route
} from 'react-router-dom';
import './App.css';
import { Toaster } from "./components/ui/Toaster";
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import DataFetch from './pages/DataFetch';
import Settings from './pages/Settings';
import About from './pages/About';

function App() {
    return (
        <>
            <Toaster />
            <Routes>
                    <Route path="/" element={<Dashboard />}></Route>
                    <Route path="/dashboard" element={<Dashboard />}></Route>
                    <Route path="/login" element={<Login />}></Route>
                    <Route path="/data-fetch" element={<DataFetch />}></Route>
                    <Route path="/settings" element={<Settings />}></Route>
                    <Route path="/about" element={<About />}></Route>

                    {/* TESTING URLS */}
                    <Route path="/test" element={<Test />}></Route>
                    <Route path="/colors" element={<ColorTestPage />}></Route>
                    <Route path="/dashboard-colors" element={<ColorChessAnalyticsDashboard />}></Route>
            </Routes>
            
        </>
    );
}

export default App;