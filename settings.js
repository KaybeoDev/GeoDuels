document.addEventListener('DOMContentLoaded', () => {
    const startingHealthInput = document.getElementById('starting-health');
    const multiplierAddedInput = document.getElementById('multiplier-added');
    const multiplierGrowthInput = document.getElementById('multiplier-growth');
    const maximumMultiplierInput = document.getElementById('maximum-multiplier');
    const pasteArea = document.getElementById('paste-area');
    const saveButton = document.getElementById('save-settings');
    const copyButton = document.getElementById('copy-settings');
    const pasteButton = document.getElementById('paste-settings');

    // Default values
    const defaultSettings = {
        startingHealth: 7500,
        multiplierAdded: 0.5,
        multiplierGrowth: 4,
        maximumMultiplier: 6
    };

    // Function to load settings from chrome.storage
    function loadSettings() {
        chrome.storage.local.get('settings', (data) => {
            const settings = data.settings || defaultSettings;
            startingHealthInput.value = settings.startingHealth;
            multiplierAddedInput.value = settings.multiplierAdded;
            multiplierGrowthInput.value = settings.multiplierGrowth;
            maximumMultiplierInput.value = settings.maximumMultiplier;
        });
    }

    // Load settings when the page loads
    loadSettings();

    // Save settings when the button is clicked
    saveButton.addEventListener('click', () => {
        const startingHealth = startingHealthInput.value;
        const multiplierAdded = multiplierAddedInput.value;
        const multiplierGrowth = multiplierGrowthInput.value;
        const maximumMultiplier = maximumMultiplierInput.value;

        // Send the settings to the background script
        chrome.runtime.sendMessage({
            action: 'saveSettings',
            settings: {
                startingHealth: Number(startingHealth),
                multiplierAdded: Number(multiplierAdded),
                multiplierGrowth: Number(multiplierGrowth),
                maximumMultiplier: Number(maximumMultiplier)
            }
        }, response => {
            if (chrome.runtime.lastError) {
                console.error('Error sending message:', chrome.runtime.lastError);
            } else {
                console.log('Settings saved:', response);
            }
        });
    });

    // Copy settings to clipboard in comma-separated format
    copyButton.addEventListener('click', () => {
        chrome.storage.local.get('settings', (data) => {
            const settings = data.settings || defaultSettings;
            const csv = [
                settings.startingHealth,
                settings.multiplierAdded,
                settings.multiplierGrowth,
                settings.maximumMultiplier
            ].join(', ');

            navigator.clipboard.writeText(csv).then(() => {
                console.log('Settings copied to clipboard');
            }).catch(err => {
                console.error('Failed to copy settings: ', err);
            });
        });
    });

    // Paste settings from clipboard in comma-separated format
    pasteButton.addEventListener('click', async () => {
        try {
            const text = await navigator.clipboard.readText();
            const values = text.split(/,\s*/); // Split by commas followed by optional spaces
            if (values.length > 0) startingHealthInput.value = values[0].trim();
            if (values.length > 1) multiplierAddedInput.value = values[1].trim();
            if (values.length > 2) multiplierGrowthInput.value = values[2].trim();
            if (values.length > 3) maximumMultiplierInput.value = values[3].trim();
        } catch (err) {
            console.error('Failed to read clipboard contents:', err.name, err.message);
            alert('Clipboard contents (', text, ') are not valid settings.');
        }
    });
});
