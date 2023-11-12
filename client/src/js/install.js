// Get the install button element
const butInstall = document.getElementById("buttonInstall");

// Listen for the 'beforeinstallprompt' event, which is triggered when the browser
// determines that the app can be installed
window.addEventListener('beforeinstallprompt', (event) => {
  // Store the triggered event for later use
  window.deferredPrompt = event;

  // Remove the hidden class from the install button to make it visible
  butInstall.classList.toggle('hidden', false);
});

// Add a click event listener to the install button
butInstall.addEventListener('click', async () => {
  // Get the stored prompt event
  const promptEvent = window.deferredPrompt;

  // If there's no stored prompt event, exit the function
  if (!promptEvent) {
    return;
  }

  // Show the installation prompt
  promptEvent.prompt();
  
  // Reset the deferred prompt variable, as it can only be used once
  window.deferredPrompt = null;

  // Hide the install button after it's clicked
  butInstall.classList.toggle('hidden', true);
});

// Listen for the 'appinstalled' event, which is triggered when the app is successfully installed
window.addEventListener('appinstalled', (event) => {
  // Clear the stored prompt event
  window.deferredPrompt = null;
});
