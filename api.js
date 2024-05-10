const marketcheckApiKey = 'e33a72d7-2084-4c69-bd58-0c30a88e9908'; // Replace with your Marketcheck API Key

// Function to fetch random car details from Marketcheck API
async function fetchRandomCarDetails() {
  const marketcheckUrl = `https://marketcheck-prod.apigee.net/v1/search?api_key=${marketcheckApiKey}&rows=1`;
  try {
    const response = await fetch(marketcheckUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch random car details');
    }
    const data = await response.json();
    return data.listings[0];
  } catch (error) {
    console.error('Error fetching random car details:', error);
    return null;
  }
}

// Function to render random car image and details
async function generateRandomCar() {
  const carInfoContainer = document.getElementById('car-info');
  carInfoContainer.innerHTML = ''; // Clear previous car info
  
  // Fetch random car details
  const carDetails = await fetchRandomCarDetails();
  
  if (carDetails) {
    // Render car image
    if (carDetails.media) {
      const carImg = document.createElement('img');
      carImg.classList.add('car-img');
      carImg.src = carDetails.media.photo_links[0]; // Use the first image
      carImg.alt = 'Random Car Image';
      carInfoContainer.appendChild(carImg);
    } else {
      carInfoContainer.innerHTML += '<p>No car image available</p>';
    }
    
    // Render car details
    const detailsList = document.createElement('ul');
    detailsList.classList.add('car-details');
    for (const key in carDetails) {
      if (carDetails.hasOwnProperty(key)) {
        const detailItem = document.createElement('li');
        detailItem.innerHTML = `<strong>${key}:</strong> ${carDetails[key]}`;
        detailsList.appendChild(detailItem);
      }
    }
    carInfoContainer.appendChild(detailsList);
  } else {
    carInfoContainer.innerHTML = '<p>No car data available</p>';
  }
}


