console.log("main.js loaded successfully!");

/* This code was modified with help from Github Copilot
in response to the prompt "make it so the user has to drag the learn more button instead of just clicking it" - 12/16/25 */

// Get the Learn More button and the drag container
const learnMoreButton = document.querySelector('.hero a');
const dragContainer = document.querySelector('.drag-container');

// Block any click events on the link - we only want dragging to work
learnMoreButton.addEventListener('click', function(event) {
  event.preventDefault(); // Stop the link from working
  console.log('Click blocked - you need to drag!');
});

// Variables to track the drag
let isDragging = false; // Is the user currently dragging?
let startY = 0; // Where did the drag start?
let hasDragged = false; // Have we already scrolled?
let draggedFarEnough = false; // Did they drag far enough?

// When the user clicks on the drag container, start tracking the drag
dragContainer.addEventListener('mousedown', function(event) {
  event.preventDefault(); // Stop the link from working so we can drag instead
  isDragging = true; // We are now dragging
  startY = event.clientY; // Remember where the mouse was when we started
  hasDragged = false; // Reset - we haven't scrolled yet
  draggedFarEnough = false; // Reset - they haven't dragged far enough
  dragContainer.style.cursor = 'grabbing'; // Change cursor to show we're dragging
});

// When the user moves the mouse, check if we're dragging
document.addEventListener('mousemove', function(event) {
  // Only do something if we're actively dragging
  if (isDragging && !hasDragged) {
    // Calculate how far the mouse has moved
    const currentY = event.clientY; // Where is the mouse now?
    const dragDistance = startY - currentY; // How far did we drag? (positive = dragging up)
    
    // Move the entire container up as we drag (only if dragging upward)
    if (dragDistance > 0) {
      dragContainer.style.transform = `translateY(-${dragDistance}px)`;
    }
    
    // Check if they dragged UP far enough (at least 120 pixels upward)
    if (dragDistance > 120) {
      console.log('Dragged far enough! Scrolling now...');
      draggedFarEnough = true; // They dragged far enough!
      // Scroll smoothly to the about-me section
      document.querySelector('#about-me').scrollIntoView({ behavior: 'smooth' });
      hasDragged = true; // Don't scroll again until they start a new drag
    }
  }
});

// When the user releases the mouse button, check if they dragged enough
document.addEventListener('mouseup', function() {
  // Reset the container position back to normal
  dragContainer.style.transform = 'translateY(0)';
  
  // If they didn't drag far enough, don't do anything
  if (isDragging && !draggedFarEnough) {
    // They just clicked without dragging - do nothing
    console.log('You need to drag the button upward to scroll down!');
  }
  
  isDragging = false; // We're done dragging
  draggedFarEnough = false; // Reset for next time
  dragContainer.style.cursor = 'grab'; // Change cursor back to grab
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
