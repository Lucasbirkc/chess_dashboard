import Test from './pages/test';
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
            </Routes>
        </>
    );
}

export default App;