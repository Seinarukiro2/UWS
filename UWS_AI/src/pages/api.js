import axios from 'axios';

// Set up the base URL for your FastAPI backend
const API_URL = 'http://localhost:8081'; // Update this URL based on your FastAPI server configuration

// Function to ask a question
export async function askQuestion(question, imagePath) {
  try {
    const response = await axios.post(`${API_URL}/ask/`, {
      question,
      image_path: imagePath || ''
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });

    // Обрабатываем данные из ответа
    const responseData = response.data.response;

    let content = 'No content available';
    let logs = {};

    // Проверяем тип и структуру responseData
    if (typeof responseData === 'object' && responseData !== null) {
      if (responseData.response) {
        // responseData.response это объект с полем content
        content = responseData.response.content || 'No content available';
        logs = responseData.response.logs || {};
      } else if (typeof responseData === 'string') {
        // Если responseData это строка
        content = responseData;
      }
    }

    return { content, logs };
  } catch (error) {
    console.error("Error asking question:", error);
    throw error;
  }
}



// Function to upload a file
export async function uploadFile(file) {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`${API_URL}/upload/`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });

    return response.data.filename;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

// Function to load data from a given URL

// Function to load data from URL
// Function to load data from URL
// Функция для загрузки данных из URL
export async function loadData(url) {
  try {
    const response = await axios.post(`${API_URL}/load_data/`, 
      { url }, // Передаем URL в теле запроса
      {
        headers: {
          'Content-Type': 'application/json' // Указываем, что отправляем JSON
        }
      }
    );
    return response.data; // Возвращаем данные из ответа
  } catch (error) {
    console.error("Error loading data:", error); // Логируем ошибку
    throw error; // Пробрасываем ошибку дальше
  }
}



