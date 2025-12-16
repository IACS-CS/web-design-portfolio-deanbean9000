console.log("main.js loaded successfully!");

/* This code was generated with help from Github Copilot
in response to the prompt "have it so when i drag it up once it will move the entire page down" - 12/16/25 */

// Get the Learn More button
const learnMoreButton = document.querySelector('.hero a');

// Variables to track the drag
let isDragging = false; // Is the user currently dragging?
let startY = 0; // Where did the drag start?
let hasDragged = false; // Have we already scrolled?

// When the user clicks on the button, start tracking the drag
learnMoreButton.addEventListener('mousedown', function(event) {
  event.preventDefault(); // Stop the link from working so we can drag instead
  isDragging = true; // We are now dragging
  startY = event.clientY; // Remember where the mouse was when we started
  hasDragged = false; // Reset - we haven't scrolled yet
  learnMoreButton.style.cursor = 'grabbing'; // Change cursor to show we're dragging
});

// When the user moves the mouse, check if we're dragging
document.addEventListener('mousemove', function(event) {
  // Only do something if we're actively dragging
  if (isDragging && !hasDragged) {
    // Calculate how far the mouse has moved
    const currentY = event.clientY; // Where is the mouse now?
    const dragDistance = startY - currentY; // How far did we drag? (positive = dragging up)
    
    // If we dragged UP at least 30 pixels, scroll the whole page down
    if (dragDistance > 30) {
      // Scroll smoothly to the about-me section
      document.querySelector('#about-me').scrollIntoView({ behavior: 'smooth' });
      hasDragged = true; // Don't scroll again until they start a new drag
    }
  }
});

// When the user releases the mouse button, stop dragging
document.addEventListener('mouseup', function() {
  isDragging = false; // We're done dragging
  learnMoreButton.style.cursor = 'grab'; // Change cursor back to grab
});

/* This code was added with help from Github Copilot
to make the back-to-top button work - 12/16/25 */

// Get the back-to-top button
const backToTopButton = document.querySelector('#back-to-top');

// When the button is clicked, scroll back to the hero section
backToTopButton.addEventListener('click', function() {
  // Scroll smoothly back to the top of the page (the hero section)
  document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
});
