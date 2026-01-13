/* This JavaScript was modified with help from Github Copilot 
in response to the prompt "fix the js so it scrolls when the arrow is pulled up like how it was before" - 1/13/26 */

console.log("main.js loaded successfully!");

// Get the drag container (now just the arrow)
const dragContainer = document.querySelector('.drag-container');

// Variables to track the drag
let isDragging = false; // Is the user currently dragging?
let startY = 0; // Where did the drag start?
let hasDragged = false; // Have we already scrolled?
let draggedFarEnough = false; // Did they drag far enough?

// When the user clicks on the drag container, start tracking the drag
dragContainer.addEventListener('mousedown', function(event) {
  event.preventDefault(); // Stop default behavior so we can drag instead
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

// Get the back-to-top button
const backToTopButton = document.querySelector('#back-to-top');

// When the button is clicked, scroll back to the hero section
backToTopButton.addEventListener('click', function() {
  // Scroll smoothly back to the top of the page (the hero section)
  document.querySelector('.hero').scrollIntoView({ behavior: 'smooth' });
});

// Get the tabs container and hero section
const tabsContainer = document.querySelector('.tabs-container');
const heroSection = document.querySelector('.hero');

// Check scroll position to show/hide tabs
window.addEventListener('scroll', function() {
  // Get the height of the hero section
  const heroHeight = heroSection.offsetHeight;
  
  // If we've scrolled past the hero (to the second page), show tabs
  if (window.scrollY > heroHeight * 0.8) {
    tabsContainer.classList.add('visible');
  } else {
    tabsContainer.classList.remove('visible');
  }
});

/* This JavaScript was modified with help from Github Copilot 
in response to the prompt "add the labels ontop of the tabs so they dont change visualy and the text pulls with the tab" - 1/13/26 */

// Get all the tab wrappers and content display
const tabs = document.querySelectorAll('.tab-wrapper');
const contentDisplay = document.querySelector('#content-display');

// Track which tab is being dragged
let isDraggingTab = false;
let currentTabWrapper = null;
let tabStartX = 0;
let currentSection = null;
let activeSection = null; // Track which section is currently displayed

// For each tab wrapper, add drag functionality
tabs.forEach(function(tabWrapper) {
  // When mousedown on a tab wrapper, start tracking
  tabWrapper.addEventListener('mousedown', function(event) {
    event.preventDefault(); // Prevent default behavior
    isDraggingTab = true; // We're dragging a tab
    currentTabWrapper = tabWrapper; // Remember which tab wrapper
    currentSection = tabWrapper.getAttribute('data-section'); // Get the linked section
    tabStartX = event.clientX; // Remember where the drag started
    tabWrapper.style.cursor = 'grabbing'; // Show we're dragging
  });
});

// When the mouse moves, drag the tab wrapper (label + tab together)
document.addEventListener('mousemove', function(event) {
  if (isDraggingTab && currentTabWrapper) {
    // Calculate how far we've dragged to the right
    const currentX = event.clientX;
    let dragDistance = currentX - tabStartX;
    
    // Only move if dragging to the right (positive distance)
    if (dragDistance > 0) {
      // Cap the drag distance at 150px maximum
      if (dragDistance > 150) {
        dragDistance = 150;
      }
      
      // Move the entire wrapper (label and tab together) to the right
      currentTabWrapper.style.transform = `translateX(${dragDistance}px)`;
      
      // If dragged 120px or more, show the content
      if (dragDistance >= 120) {
        // Get the content from the section
        const section = document.querySelector('#' + currentSection);
        if (section) {
          // Copy the content to the display area
          contentDisplay.innerHTML = section.innerHTML;
          // Show the content display
          contentDisplay.classList.add('active');
          // Remember which section is now active
          activeSection = currentSection;
          
          // Re-attach event listeners to the new code tabs in the display area
          attachCodeTabListeners();
        }
      }
    }
  }
});

// When mouse is released, snap tab wrapper back but keep content visible
document.addEventListener('mouseup', function() {
  if (isDraggingTab && currentTabWrapper) {
    // Reset the wrapper position
    currentTabWrapper.style.transform = 'translateX(0)';
    currentTabWrapper.style.cursor = 'grab';
    
    // Don't hide the content - it stays visible until another tab is pulled
    
    // Stop dragging
    isDraggingTab = false;
    currentTabWrapper = null;
    currentSection = null;
  }
});

// Function to attach code tab listeners
function attachCodeTabListeners() {
  // Get all code tab buttons (including newly created ones in content display)
  const codeTabs = document.querySelectorAll('.code-tab');
  
  // Add click event to each tab button
  codeTabs.forEach(function(tab) {
    // Remove old listeners by cloning and replacing
    const newTab = tab.cloneNode(true);
    tab.parentNode.replaceChild(newTab, tab);
    
    // Add new click event
    newTab.addEventListener('click', function() {
      // Get which code block to show from the data-code attribute
      const codeId = newTab.getAttribute('data-code');
      
      // Find the code viewer container this tab belongs to
      const codeViewer = newTab.closest('.code-viewer');
      
      // Hide all code blocks in this code viewer
      const allCodeBlocks = codeViewer.querySelectorAll('.code-block');
      allCodeBlocks.forEach(function(block) {
        block.classList.remove('active');
      });
      
      // Remove active class from all tabs in this code viewer
      const allTabs = codeViewer.querySelectorAll('.code-tab');
      allTabs.forEach(function(t) {
        t.classList.remove('active');
      });
      
      // Show the selected code block
      const selectedBlock = document.getElementById(codeId);
      if (selectedBlock) {
        selectedBlock.classList.add('active');
      }
      
      // Mark this tab as active
      newTab.classList.add('active');
    });
  });
}

// Initialize code tab listeners on page load
attachCodeTabListeners();
