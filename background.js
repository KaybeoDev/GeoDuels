chrome.tabs.onUpdated.addListener((tabId, tab) => {
    if (tab.url && tab.url.includes("geotastic.net/play-online/")) {
      chrome.tabs.sendMessage(tabId, {
        type: "lobby"
      });
    }
    return true;
  });
  

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'saveSettings') {
        console.log('Settings received:', message.settings);
        
        // Save settings to chrome.storage or handle them as needed
        chrome.storage.local.set({ settings: message.settings }, () => {
            sendResponse({ status: 'success' });
        });

        return true;
    }
  });
