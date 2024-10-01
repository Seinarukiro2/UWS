import React, { useState } from 'react';
import {
    Container, Typography, Box, Button, TextField, LinearProgress, Dialog,
    DialogActions, DialogContent, DialogTitle, IconButton, Snackbar, Alert
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { loadData } from './api'; // Import your API functions

const UploadDataPage = ({ open, onClose }) => {
    const [url, setUrl] = useState('');
    const [uploading, setUploading] = useState(false);
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success'); // 'success' or 'error'

    const handleUrlChange = (e) => {
        setUrl(e.target.value);
    };

    const handleCloseSnackbar = () => {
        setSnackbarOpen(false);
    };

    const handleUpload = async () => {
        if (!url) {
            setSnackbarMessage('URL is required.');
            setSnackbarSeverity('error');
            setSnackbarOpen(true);
            return;
        }

        setUploading(true);

        try {
            await loadData(url);
            setSnackbarMessage('Data loaded successfully from URL.');
            setSnackbarSeverity('success');
            onClose();
        } catch (error) {
            setSnackbarMessage('Error loading data from URL.');
            setSnackbarSeverity('error');
        } finally {
            setUploading(false);
        }
    };

    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
                maxWidth="sm"
                fullWidth
            >
                <DialogTitle>
                    Load Data from URL
                    <IconButton
                        edge="end"
                        color="inherit"
                        onClick={onClose}
                        aria-label="close"
                        sx={{ position: 'absolute', right: 8, top: 8 }}
                    >
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{ mb: 2 }}>
                        <TextField
                            label="URL"
                            variant="outlined"
                            fullWidth
                            value={url}
                            onChange={handleUrlChange}
                            sx={{ mb: 2 }}
                        />
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleUpload}
                        disabled={uploading}
                    >
                        Load Data
                    </Button>
                </DialogActions>
                {uploading && <LinearProgress sx={{ mt: 2 }} />}
            </Dialog>

            <Snackbar
                open={snackbarOpen}
                autoHideDuration={6000}
                onClose={handleCloseSnackbar}
                action={
                    <IconButton
                        size="small"
                        aria-label="close"
                        color="inherit"
                        onClick={handleCloseSnackbar}
                    >
                        <CloseIcon fontSize="small" />
                    </IconButton>
                }
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity={snackbarSeverity}
                    sx={{ width: '100%' }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default UploadDataPage;
