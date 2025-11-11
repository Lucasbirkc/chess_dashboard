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
                    <Route path="/">
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    </Route>
                    <Route path="/dashboard">
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    </Route>
                    <Route path="/data-fetch">
                        <ProtectedRoute>
                            <DataFetch />
                        </ProtectedRoute>
                    </Route>
                    <Route path="/settings">
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    </Route>
                    <Route path="/about">
                        <ProtectedRoute>
                            <About />
                        </ProtectedRoute>
                    </Route>

                    {/* PUBLIC URLS */}

                    <Route path="/login">
                        <PublicRoute>
                            <Login />
                        </PublicRoute>
                    </Route>

                    {/* TESTING URLS */}
                    <Route path="/test" element={<Test />}></Route>
                    <Route path="/colors" element={<ColorTestPage />}></Route>
                    <Route path="/dashboard-colors" element={<ColorChessAnalyticsDashboard />}></Route>
            </Routes>
            
        </>
    );
}

export default App;