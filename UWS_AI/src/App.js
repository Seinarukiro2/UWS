import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import MainLayout from './components/MainLayout';
import UploadDataPage from './pages/UploadDataPage';
import Home from './pages/Home'; // AI Chat component
import DatabaseTables from './pages/Database'; // Database component
import theme from './theme'; // Import your custom theme

const App = () => {
    return (
        <ThemeProvider theme={theme}>
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="/database" element={<DatabaseTables />} /> {/* AI Chat Dialog as default */}
                        <Route path="upload" element={<UploadDataPage />} />
                        {/* <Route path="database" element={<DatabasePage />} />
                        <Route path="settings" element={<SettingsPage />} /> */}
                    </Route>
                </Routes>
            </Router>
        </ThemeProvider>
    );
};

export default App;
