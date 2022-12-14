import { BrowserRouter , Routes, Route, Link } from 'react-router-dom';
import { Interviewer } from './components/Interviewer';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import { TalentAcquisition } from "./components/TalentAcquisition";

export default function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/ta" element={<TalentAcquisition />} />
                <Route path="/in" element={<Interviewer />} />
                <Route path="/register" element={<RegisterPage />} />
            </Routes>
        </BrowserRouter>
    );
}
