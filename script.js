function loadImages() {
  let tempImages = [...images];
  
  // Randomly pick an image to duplicate
  const randomIndex = Math.floor(Math.random() * tempImages.length);
  duplicateImage = tempImages[randomIndex];
  
  let imageSet = [...tempImages, duplicateImage];
  
  shuffle(imageSet);
  
  container.innerHTML = '';
  
  imageSet.forEach((src, index) => {
    const img = document.createElement('img');
    img.src = src;
    
    // Add class based on file name (without extension)
    const className = src.split('.')[0]; // e.g., 'img1' from 'img1.jpg'
    img.classList.add(className);

    img.dataset.index = index;
    img.addEventListener('click', () => selectImage(img));
    container.appendChild(img);
  });
}
