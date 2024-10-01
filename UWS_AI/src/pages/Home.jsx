import React, { useState, useRef, useEffect } from 'react';
import { Container, TextField, Button, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import LanguageIcon from '@mui/icons-material/Language';
import { askQuestion, uploadFile } from './api'; // Import your API functions

const Home = () => {
    const [message, setMessage] = useState('');
    const [chatHistory, setChatHistory] = useState([]);
    const [logs, setLogs] = useState([]);
    const [showLogs, setShowLogs] = useState(false);
    const [language, setLanguage] = useState('EN');
    const [anchorEl, setAnchorEl] = useState(null);
    const [file, setFile] = useState(null); // State for the file
    const [isTyping, setIsTyping] = useState(false); // State for typing effect
    const logsEndRef = useRef(null);
    const fileInputRef = useRef(null); // Reference for the hidden file input

    // Function to handle sending a question
    const handleSendMessage = async () => {
        if (message.trim() === '') return;

        // Add user message to chat history
        setChatHistory((prevHistory) => [
            ...prevHistory,
            { sender: 'user', text: message }
        ]);

        // Add logs
        setLogs((prevLogs) => [
            ...prevLogs,
            `Message sent: ${message}`
        ]);

        // Show typing indicator
        setIsTyping(true);

        try {
            // Handle file upload if a file is selected
            const imagePath = file ? URL.createObjectURL(file) : null;
            const { content, logs } = await askQuestion(message, imagePath);

            // Check for no relevant information
            if (content === 'No relevant information found.') {
                setChatHistory((prevHistory) => [
                    ...prevHistory,
                    { sender: 'ai', text: content }
                ]);
            } else {
                setChatHistory((prevHistory) => [
                    ...prevHistory,
                    { sender: 'ai', text: content }
                ]);
            }

            // Add logs to the log state
            setLogs((prevLogs) => [
                ...prevLogs,
                `AI responded: ${content}`,
                `Logs: ${JSON.stringify(logs, null, 2)}`
            ]);

            // Clear file state after sending the question
            setFile(null);

        } catch (error) {
            setChatHistory((prevHistory) => [
                ...prevHistory,
                { sender: 'ai', text: "Failed to get a response." }
            ]);
            setLogs((prevLogs) => [
                ...prevLogs,
                `Error asking question: ${error.message}`
            ]);
        } finally {
            // Hide typing indicator
            setIsTyping(false);
            setMessage('');
        }
    };

    // Function to handle file selection
    const handleFileChange = (e) => {
        if (e.target.files.length > 0) {
            setFile(e.target.files[0]);
        }
    };

    // Function to copy text to clipboard
    const handleCopyToClipboard = (text) => {
        navigator.clipboard.writeText(text).then(() => {

        });
    };

    // Scroll to the bottom of logs when new logs are added
    useEffect(() => {
        logsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [logs]);

    // Function to toggle logs visibility
    const toggleLogs = () => {
        setShowLogs((prev) => !prev);
    };

    // Function to open language menu
    const handleClickLanguageMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    // Function to close language menu
    const handleCloseLanguageMenu = () => {
        setAnchorEl(null);
    };

    // Function to change language
    const handleLanguageChange = (lang) => {
        setLanguage(lang);
        handleCloseLanguageMenu();
    };

    return (
        <Container maxWidth="md" sx={{ mt: 4, display: 'flex', flexDirection: 'column', height: '80vh', position: 'relative' }}>
            {/* Language selection menu */}
            <Box sx={{ position: 'absolute', top: 8, right: 8, zIndex: 1300 }}>
                <IconButton
                    onClick={handleClickLanguageMenu}
                    sx={{
                        color: 'text.secondary',
                    }}
                >
                    <LanguageIcon />
                </IconButton>
                <Typography
                    variant="caption"
                    sx={{
                        position: 'absolute',
                        top: 8,
                        right: 40,
                        color: 'text.secondary',
                    }}
                >
                    {language}
                </Typography>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleCloseLanguageMenu}
                    sx={{ 
                        mt: '10px', // Margin top to position the menu below the button
                        zIndex: 1400 // Set a high z-index for the menu
                    }}
                >
                    <MenuItem selected={language === 'EN'} onClick={() => handleLanguageChange('EN')}>EN</MenuItem>
                    <MenuItem selected={language === 'DE'} onClick={() => handleLanguageChange('DE')}>DE</MenuItem>
                    <MenuItem selected={language === 'RU'} onClick={() => handleLanguageChange('RU')}>RU</MenuItem>
                    <MenuItem selected={language === 'UA'} onClick={() => handleLanguageChange('UA')}>UA</MenuItem>
                </Menu>
            </Box>

            <Typography variant="h4" gutterBottom align="center" color="primary">
                AI Chat
            </Typography>

            {/* Chat history */}
            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '4px' }}>
                {chatHistory.map((entry, index) => (
                    <Box
                        key={index}
                        sx={{
                            display: 'flex',
                            mb: 2,
                            justifyContent: entry.sender === 'user' ? 'flex-end' : 'flex-start',
                        }}
                    >
                        <Box
                            sx={{
                                maxWidth: '70%',
                                bgcolor: entry.sender === 'user' ? 'primary.main' : '#f1f1f1', // Light gray for AI
                                color: entry.sender === 'user' ? 'white' : 'black',
                                p: 2,
                                borderRadius: entry.sender === 'user' ? '16px 16px 0 16px' : '16px 16px 16px 0',
                                wordBreak: 'break-word', // Break words to prevent overflow
                                whiteSpace: 'pre-wrap',  // Respect line breaks
                                overflowWrap: 'break-word', // Break long words
                                position: 'relative', // For positioning copy icon
                            }}
                        >
                            {entry.text}

                            {entry.sender === 'ai' && (
                                <IconButton
                                    sx={{
                                        position: 'absolute',
                                        bottom: '-24px', // Move icon down
                                        left: '8px', // Align with text
                                        color: 'text.secondary',
                                        '&:hover': {
                                            color: 'text.primary',
                                        },
                                        p: 0, // Remove padding
                                        width: '16px', // Smaller icon
                                        height: '16px',
                                    }}
                                    onClick={() => handleCopyToClipboard(entry.text)}
                                >
                                    <ContentCopyIcon fontSize="inherit" />
                                </IconButton>
                            )}
                        </Box>
                    </Box>
                ))}

                {/* Typing indicator */}
                {isTyping && (
                    <Box sx={{ display: 'flex', mb: 2, justifyContent: 'flex-start' }}>
                        <Box
                            sx={{
                                maxWidth: '70%',
                                bgcolor: '#f1f1f1',
                                p: 2,
                                borderRadius: '16px 16px 16px 0',
                                wordBreak: 'break-word',
                                whiteSpace: 'pre-wrap',
                                overflowWrap: 'break-word',
                            }}
                        >
                            <Typography variant="body1" color="text.secondary">
                                AI is typing...
                            </Typography>
                        </Box>
                    </Box>
                )}
            </Box>

            {/* Input field and send button */}
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TextField
                    fullWidth
                    variant="outlined"
                    label="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter') handleSendMessage(); // Send on Enter key
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSendMessage}
                    sx={{ ml: 2 }}
                    endIcon={<SendIcon />}
                >
                    Send
                </Button>
            </Box>

            {/* File input */}
            <Box sx={{ mb: 2 }}>
                <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept="image/*"
                    style={{ display: 'none' }} // Hide the native file input
                />
                <Button
                    variant="contained"
                    color="secondary"
                    onClick={() => fileInputRef.current.click()} // Trigger file input click
                    sx={{ width: '15%' }} // Make button full width
                >
                    {file ? `File: ${file.name}` : 'Select File'}
                </Button>
            </Box>

            {/* Button to toggle logs visibility */}
            <IconButton
                onClick={toggleLogs}
                sx={{
                    mb: 2,
                    alignSelf: 'flex-start',
                    color: 'primary.main',
                    '&:hover': {
                        color: 'primary.dark',
                    },
                }}
            >
                {showLogs ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                <Typography variant="button" sx={{ ml: 1 }}>
                    Check Logs
                </Typography>
            </IconButton>

            {/* Logs window */}
            {showLogs && (
            <Box
                sx={{
                height: '150px', // Adjust the height as needed
                overflowY: 'auto',
                borderTop: '1px solid #ccc',
                p: 2,
                bgcolor: '#f9f9f9',
                borderRadius: '4px',
                }}
            >
                {logs.question && (
                <Typography variant="body2" color="text.secondary">
                    <strong>Question:</strong> {logs.question}
                </Typography>
                )}
                {logs.relevant_documents && logs.relevant_documents.length > 0 && (
                <Box>
                    <Typography variant="body2" color="text.secondary">
                    <strong>Relevant Documents:</strong>
                    </Typography>
                    {logs.relevant_documents.map((doc, index) => (
                    <Typography key={index} variant="body2" color="text.secondary">
                        - {doc}
                    </Typography>
                    ))}
                </Box>
                )}
                <div ref={logsEndRef} /> {/* Element for auto-scrolling */}
            </Box>
            )}
        </Container>
    );
};

export default Home;
