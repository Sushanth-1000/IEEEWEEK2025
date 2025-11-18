const API_URL = 'https://ieeeweek2025.onrender.com';  // Make sure this matches your Render URL

const fetchEvents = async () => {
  try {
    const apiUrl = `${API_URL}/api/events`;
    console.log('🔵 [1/3] Starting fetch to:', apiUrl);
    
    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include'  // Add this if using cookies/auth
    });
    
    console.log('🟡 [2/3] Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('🔴 Response not OK:', {
        status: response.status,
        statusText: response.statusText,
        url: apiUrl,  // Added URL to error log
        body: errorText
      });
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('🟢 [3/3] Success! Data received');
    return data;
  } catch (error) {
    console.error('🔥 Fetch failed:', {
      message: error.message,
      name: error.name,
      url: apiUrl,  // This will show which URL failed
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
    });
    throw error;
  }
};

export default fetchEvents;