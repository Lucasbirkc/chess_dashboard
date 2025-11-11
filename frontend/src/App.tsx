import Test from './pages/test';
import ColorTestPage from './pages/ColorsTestPage';
import ColorChessAnalyticsDashboard from './pages/DashboardColorPage';
import {
    Routes,
    Route
} from 'react-router-dom';
import ProtectedRoute from './components/utils/ProtectedRoute';
import PublicRoute from './components/utils/PublicRoute';
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
                {/* PROTECTED URLS */}
                <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/data-fetch" element={<ProtectedRoute><DataFetch /></ProtectedRoute>} />
                <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
                <Route path="/about" element={<ProtectedRoute><About /></ProtectedRoute>} />

                {/* PUBLIC URLS*/}
                <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />

                {/* TESTING URLS */}
                <Route path="/test" element={<Test />} />
                <Route path="/colors" element={<ColorTestPage />} />
                <Route path="/dashboard-colors" element={<ColorChessAnalyticsDashboard />} />
            </Routes>
            
        </>
    );
}

export default App;