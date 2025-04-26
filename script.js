//your code here
const images = [
  'img1.jpg',
  'img2.jpg',
  'img3.jpg',
  'img4.jpg',
  'img5.jpg'
];

let selectedImages = [];
let duplicateImage = '';
const container = document.getElementById('image-container');
const resetButton = document.getElementById('reset');
const verifyButton = document.getElementById('verify');
const para = document.getElementById('para');

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

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
    img.dataset.index = index;
    img.addEventListener('click', () => selectImage(img));
    container.appendChild(img);
  });
}

function selectImage(img) {
  if (img.classList.contains('selected')) {
    img.classList.remove('selected');
    selectedImages = selectedImages.filter(i => i !== img);
  } else {
    if (selectedImages.length < 2) {
      img.classList.add('selected');
      selectedImages.push(img);
    }
  }
  
  // Show Reset Button when at least one is selected
  resetButton.style.display = selectedImages.length > 0 ? 'inline-block' : 'none';
  
  // Show Verify Button only when exactly 2 images are selected
  verifyButton.style.display = selectedImages.length === 2 ? 'inline-block' : 'none';
}

resetButton.addEventListener('click', () => {
  selectedImages.forEach(img => img.classList.remove('selected'));
  selectedImages = [];
  resetButton.style.display = 'none';
  verifyButton.style.display = 'none';
  para.textContent = '';
});

verifyButton.addEventListener('click', () => {
  if (selectedImages.length === 2) {
    if (selectedImages[0].src === selectedImages[1].src) {
      para.textContent = "You are a human. Congratulations!";
    } else {
      para.textContent = "We can't verify you as a human. You selected the non-identical tiles.";
    }
  }
  verifyButton.style.display = 'none';
});

window.onload = loadImages;
