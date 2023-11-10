const butInstall = document.getElementById('buttonInstall');

// Logic for installing the PWA
// Add an event handler to the `beforeinstallprompt` event
window.addEventListener('beforeinstallprompt', (event) => {
  // Store the triggered events
  window.deferredPrompt = event;

  // Remove the hidden class from the button to make it visible to the user.
  butInstall.classList.toggle('hidden', false);
});

// Implement a click event handler on the `butInstall` element
butInstall.addEventListener('click', async () => {
  const promptEvent = window.deferredPrompt;

  if (!promptEvent) {
    return; // The prompt event doesn't exist, so there's nothing to install.
  }

  // Show the installation prompt
  promptEvent.prompt();

  // Wait for the user's choice
  const choiceResult = await promptEvent.userChoice;

  if (choiceResult.outcome === 'accepted') {
    console.log('User accepted the installation');
  } else {
    console.log('User declined the installation');
  }

  // Reset the deferred prompt variable; it can only be used once.
  window.deferredPrompt = null;

  // Hide the "Install" button by adding the "hidden" class.
  butInstall.classList.toggle('hidden', true);
});

// Add an event handler for the `appinstalled` event
window.addEventListener('appinstalled', (event) => {
  // Clear the prompt event; it can only be used once.
  window.deferredPrompt = null;
});
