const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000';

const fetchEvents = async () => {
  try {
    const apiUrl = `${API_URL}/api/events`;
    console.log('🔵 [1/3] Starting fetch to:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
    console.log('🟡 [2/3] Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('🔴 Response not OK:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('🟢 [3/3] Success! Data:', data);
    return data;
  } catch (error) {
    console.error('🔥 Fetch failed:', {
      message: error.message,
      name: error.name,
      stack: error.stack
    });
    throw error;
  }
};

export default fetchEvents;