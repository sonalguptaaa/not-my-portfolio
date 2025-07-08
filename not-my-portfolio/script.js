//EASE IN AND OUT CIRCLE BUTTON//
const circleButtons = document.querySelectorAll('.circle-button');

circleButtons.forEach(circleButton => {
  const circleLabel = circleButton.querySelector('.circle-label');
  const originalLabelColor = window.getComputedStyle(circleLabel).color;

  circleButton.addEventListener('mouseenter', () => {
    const strokeColor = window.getComputedStyle(circleButton).borderColor;
    circleButton.style.backgroundColor = strokeColor;
    circleLabel.style.color = 'white';
  });

  circleButton.addEventListener('mouseleave', () => {
    circleButton.style.backgroundColor = 'transparent';
    circleLabel.style.color = originalLabelColor;
  });
});

//EXPANDED ABOUT BUTTON//
const aboutContainer = document.querySelector('.about-container');
const aboutButtonContainer = document.querySelector('.about-button-container');
const textBox = document.querySelector('.text-box');

const toggleContent = () => {
  aboutContainer.classList.toggle('expanded');
  aboutButtonContainer.classList.toggle('hide');
  textBox.classList.toggle('show');
};

aboutButtonContainer.addEventListener('click', toggleContent);
textBox.addEventListener('click', toggleContent);


// Make the DIV element draggable:

document.addEventListener('DOMContentLoaded', (event) => {
  let magnets = document.querySelectorAll('.fridgemagnet');
  
  magnets.forEach(magnet => {
      dragElement(magnet);
  });

  function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
      elmnt.onmousedown = dragMouseDown;

      function dragMouseDown(e) {
          e = e || window.event;
          e.preventDefault();
          // get the mouse cursor position at startup:
          pos3 = e.clientX;
          pos4 = e.clientY;
          document.onmouseup = closeDragElement;
          // call a function whenever the cursor moves:
          document.onmousemove = elementDrag;
      }

      function elementDrag(e) {
          e = e || window.event;
          e.preventDefault();
          // calculate the new cursor position:
          pos1 = pos3 - e.clientX;
          pos2 = pos4 - e.clientY;
          pos3 = e.clientX;
          pos4 = e.clientY;
          // set the element's new position:
          elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
          elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
      }

      function closeDragElement() {
          // stop moving when mouse button is released:
          document.onmouseup = null;
          document.onmousemove = null;
      }
  }
});

// IMAGE POPUP
document.addEventListener('DOMContentLoaded', () => {
  const meetmeDiv = document.querySelector('.meetme');
  const popupContainer = document.getElementById('popup-container');
  let isDragging = false;
  let images = Array.from(meetmeDiv.getElementsByTagName('img'));
  let lastPopupTime = 0;
  const popupInterval = 50; // Minimum ms between popups

  document.addEventListener('mousedown', startDragging);
  document.addEventListener('mousemove', drag);
  document.addEventListener('mouseup', stopDragging);

  function startDragging(e) {
      isDragging = true;
      createPopup(e.clientX, e.clientY);
  }

  function drag(e) {
      if (isDragging) {
          const currentTime = Date.now();
          if (currentTime - lastPopupTime > popupInterval) {
              createPopup(e.clientX, e.clientY);
              lastPopupTime = currentTime;
          }
      }
  }

  function stopDragging() {
      isDragging = false;
      // Fade out all popup images
      const popups = popupContainer.getElementsByTagName('img');
      Array.from(popups).forEach(img => {
          img.style.opacity = '0';
          setTimeout(() => img.remove(), 300);
      });
  }

  function createPopup(x, y) {
      if (images.length > 0) {
          const randomImage = images[Math.floor(Math.random() * images.length)].cloneNode();
          randomImage.style.display = 'block';
          randomImage.style.position = 'fixed';
          randomImage.style.left = `${x}px`;
          randomImage.style.top = `${y}px`;
          randomImage.style.transform = 'translate(-50%, -50%)';
          randomImage.style.opacity = '0';
          popupContainer.appendChild(randomImage);
          
          // Fade in the image
          requestAnimationFrame(() => {
              randomImage.style.opacity = '0.7'; // Reduced opacity for softer appearance
          });

          // Remove older images if there are too many
          const maxImages = 5; // Adjust this number to control trail length
          while (popupContainer.children.length > maxImages) {
              popupContainer.removeChild(popupContainer.firstChild);
          }

          // Fade out and remove the image after a delay
          setTimeout(() => {
              randomImage.style.opacity = '0';
              setTimeout(() => randomImage.remove(), 300);
          }, 500); // Adjust this value to change how long each image stays visible
      }
  }

  // Check for new images every 5 seconds
  setInterval(() => {
      images = Array.from(meetmeDiv.getElementsByTagName('img'));
      console.log(`Updated image count: ${images.length}`);
  }, 5000);

  console.log(`Initially found ${images.length} images in the meetme div`);
});

// CURSOR TRAIL //
document.addEventListener('DOMContentLoaded', () => {
  const trailLength = 10;
  const trail = [];
  const imagePath = 'pinkstar.png'; // Replace with your image path

  function createTrailElement(x, y) {
      const img = new Image();
      img.src = imagePath;
      img.className = 'cursor-trail';
      img.style.left = x + 'px';
      img.style.top = y + 'px';
      document.body.appendChild(img);
      return img;
  }

  document.addEventListener('mousemove', (e) => {
      const img = createTrailElement(e.clientX, e.clientY);
      trail.push(img);

      if (trail.length > trailLength) {
          const oldestImg = trail.shift();
          oldestImg.style.opacity = '0';
          setTimeout(() => oldestImg.remove(), 300);
      }

      setTimeout(() => {
          img.style.opacity = '0';
          setTimeout(() => img.remove(), 300);
      }, 100);
  });
});

// CAROUSEL IMAGES
let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n);
}

function showSlides(n) {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  if (n > slides.length) {slideIndex = 1}
  if (n < 1) {slideIndex = slides.length}
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";
  dots[slideIndex-1].className += " active";
}