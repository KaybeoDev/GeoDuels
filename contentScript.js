(() => {
    // my favourite programming practice, global variables!!! number of bugs caused by them: 0 (somehow)
    let team1, team2, roundNo, unadjustedDamage, adjustedDamage, solvedRounds, team1score, team2score, team1name, team2name;
    let multiplierAdd, multiplierStart, multiplierMax, roundMultiplier, nextRoundMultiplier;
    multiplierAdd = 0.5;
    multiplierStart = 4;
    multiplierMax = 4;
    startingHealth = 500;
    let teamHealths = {};
    let pleaseStopRepeating = 0;

    const injectCSS = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes fadeInUp {
                0% {
                    opacity: 0;
                    transform: translateY(14px);
                }
                100% {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
    
            .fade-in-up {
                animation: fadeInUp 0.39s ease-in-out forwards;
                animation-delay: 0.25s;
                opacity: 0;
            }

            @keyframes goAway {
                0% {
                    opacity: 1;
                    transform: translateY(0);
                }
                100% {
                    opacity: 0;
                    transform: translateY(-14px);
                }
            }
            
            .go-away {
                animation: goAway 0.30s ease-in-out 4.5s forwards;
                overflow: hidden;
            }
    
            .progress-bar-container {
                width: 100%;
                background-color: #303535;
                border-radius: 4px;
                overflow: hidden;
                position: relative;
                height: 35px;
                margin-bottom: 0px;
                box-shadow: 0 2px 5px #0000004d;
            }
    
            .progress-bar {
                height: 100%;
                position: absolute;
                border-radius: 4px;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                white-space: nowrap;
                transition: background-color 2s ease-in-out, width 2s ease-in-out; /* Smooth transition for color and width */
                background-color: red; /* Initial color */
            }
    
            .progress-bar-text {
                position: relative;
                z-index: 1;
                font-weight: bold;
            }

            .game-over {
                width: 100%;
                border-radius: 4px;
                opacity: 0;
                height: 35px;
                box-shadow: 0 2px 5px #0000004d;
                background: repeating-linear-gradient(
                    -60deg,
                        #861d1d, /* Color 1 */
                        #861d1d 10px, /* Color 1 stops */
                        #972020 10px, /* Color 2 starts */
                        #972020 20px /* Color 2 stops */
                    );
                color: #e0e0e0;
                animation: fadeInUp 0.30s ease-in-out 0.05s forwards;
                text-align: center;
                line-height: 35px;
                font-weight: bold;
            }

            .team-name-box {
                padding-top: 3px;
                padding-bottom: 3px;
                padding-left: 9px;
                padding-right: 9px;
                border-radius: 4px;
            }

            /* Table Container */
            .table-container {
                background: #1e1e1e; /* Dark mode background color */
                color: #e0e0e0; /* Light text color for dark mode */
                box-shadow: 0 2px 5px #0000004d; /* Darker drop shadow for dark mode yayyy */
                padding-left: 16px;
                padding-right: 16px;
                padding-bottom: 16px;
                margin-bottom: 24px;
                overflow: hidden;
                border-radius: 4px;
            }

            /* Styled Table */
            .styled-table {
                margin: 0;
                padding: 0px;
                width: 100%;
                border-collapse: collapse;
            }

            /* Table Cells */
            .styled-table td {
                padding: 0px;
                color: #e0e0e0; /* Light text color for dark mode */
            }

            /* Logo Container */
            .logo-container {
                text-align: center; /* Center content horizontally */
                margin-top: 20px; /* Space between the logo and the table */
                margin-bottom: 10px;
            }

            /* Logo Image Styling */
            .logo-image {
                height: 18px; /* Set image height */
            }

            /* Padding for Team Cells */
            .team-cell {
                padding-top: 16px;
                padding-left: 1px;
                padding-bottom: 8px;
            }

            .team-container {
                display: flex;          /* Enables Flexbox layout */
                justify-content: space-between; /* Centers items horizontally */
                align-items: center;    /* Aligns items vertically */
                gap: 20px;
            }

            .team-score {
                padding-top: 3px;
                padding-left: 8px;
                padding-right: 8px;
                padding-bottom: 3px;
                background-color: #1E1E1E;
                box-shadow: 0 2px 5px #0000004d;
                border-radius: 4px;
            }

            /* Narrow Column for Damage Cells */
            .damage-cell {
                height: 30px;
                width: 80px; /* Adjust this value as needed */
                text-align: center; /* Center text horizontally */
            }

            /* Center Damage Cells Vertically */
            .styled-table td {
                vertical-align: middle; /* Center content vertically */
            }

            /* Height Equalization */
            .progress-row {
                height: 35px; /* Set this to match the height of the progress bar element */
            }

            /* Zebra Striping for Better Readability */
            .styled-table tr:nth-child(even) {
                background-color: #242424; /* Slightly lighter dark mode background */
            }

            /* Define the deal-damage animation */
            @keyframes deal-damage {
                0% {
                    opacity: 0; /* Start invisible */
                    transform: scale(0.5) translateX(0); /* Start scaled down and no side-to-side movement */
                    font-weight: normal;
                    color: #e0e0e0; /* No background color */
                }
                50% {
                    opacity: 1; /* Fade in */
                    transform: scale(1.25);
                    font-weight: bold;
                    color: #f54242; /* Keep red flash */
                }
                100% {
                    opacity: 1; /* Stay visible */
                    transform: scale(1);
                    font-weight: normal;
                    color: #f54242; /* Remove background color */
                }
            }

            /* Apply the animation to the class */
            .deal-damage {
                opacity: 0;
                animation: deal-damage 0.45s ease-out 1.5s forwards;
            }

            .round-container {
                display: flex;          /* Enables Flexbox layout */
                justify-content: center; /* Centers items horizontally */
                align-items: center;    /* Aligns items vertically */
                gap: 20px;
            }

            .round-details,
            .damage-details,
            .damage-dealt,
            .next-round-details {
                /* Optional: Adjust styles for individual items if needed */
                padding-left: 10px;
                padding-right: 10px;
                padding-top: 3px;
                padding-bottom: 3px;
                border-radius: 4px;  /* Rounded corners */
                text-align: center;  /* Center text inside each div */
                font-size: 14px;
                box-shadow: 0 2px 5px #0000004d;
            }
            
            .round-details {
                background-color: #303535;
            }

            .next-round-details {
                background-color: #242424;
                border: 1px solid #aaa;
                color: #aaaaaa;
                animation: fadeInUp 0.39s ease-in-out 3.50s forwards;
                font-size: 12.5px;
                opacity: 0;
            }

            .next-round-padding {
                padding-top: 14px;
            }

            .damage-details {
                background-color: #242424;
                color: #eeeeee;
                opacity: 0;
                animation: damage-details 0.55s ease-out 0.95s forwards;
            }

            @keyframes damage-details {
                0% {
                    opacity: 0; /* Start invisible */
                    transform: scale(0.5) translateX(0); 
                    background-color: #242424; 
                }
                50% {
                    opacity: 1; /* Fade in */
                    transform: scale(1.12);
                    background-color: #444444;
                }
                100% {
                    opacity: 1; /* Stay visible */
                    transform: scale(1);
                    background-color: #242424; 
                    color: #ffffff;
                }
            }
            
            .damage-dealt {
                opacity: 0;
                border: 1px solid #ccc;
                animation: damage-dealt 0.55s ease-out 2.00s forwards;
                background-color: #bf2e2e;
                color: #ffffff;
            }

            @keyframes damage-dealt {
                0% {
                    opacity: 0; /* Start invisible */
                    transform: scale(0.5) translateX(0);
                    background-color: #e0e0e0; 
                }
                50% {
                    opacity: 1; /* Fade in */
                    transform: scale(1.17);
                    background-color: #bf2e2e; 
                }
                100% {
                    opacity: 1; /* Stay visible */
                    transform: scale(1);
                    background-color: #bf2e2e;
                    color: #ffffff;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    injectCSS();

	chrome.runtime.onMessage.addListener((obj, sender, response) => {
		const { type } = obj;
		
		if (type === "lobby") {
			lobbyOpened();
		}
	});

    // Function to handle settings updates
    function handleSettingsUpdate(changes, area) {
        if (area === 'local' && changes.settings) {
            const newSettings = changes.settings.newValue;
            console.log('Settings updated:', newSettings);
            multiplierAdd = newSettings['multiplierAdded'];
            multiplierStart = newSettings['multiplierGrowth'];
            multiplierMax = newSettings['maximumMultiplier'];
            startingHealth = newSettings['startingHealth'];
        }
    }

    // Retrieve initial settings
    chrome.storage.local.get('settings', (result) => {
        if (chrome.runtime.lastError) {
            console.error('Error retrieving settings:', chrome.runtime.lastError);
        } else {
            const settings = result.settings;
            if (settings) {
                console.log('Initial settings retrieved:', settings);
                multiplierAdd = settings['multiplierAdded'];
                multiplierStart = settings['multiplierGrowth'];
                multiplierMax = settings['maximumMultiplier'];
                startingHealth = settings['startingHealth'];
            } else {
                console.log('No settings found.');
                multiplierAdd = 0.5;
                multiplierStart = 4;
                multiplierMax = 4;
                startingHealth = 500;
            }
        }
    });

    // Add a listener for changes to chrome.storage.local
    chrome.storage.onChanged.addListener(handleSettingsUpdate);
    

    const lobbyOpened = async () => {
        console.log("Lobby detected!");

        // Function to get the color based on percentage
        const getColorFromPercentage = (percentage) => {
            if (percentage <= 50) {
                // Transition from dark red to dark yellow
                const red = 128 + Math.round(127 * (percentage / 50)); // Dark red to muted yellow
                const green = 0; // Dark red to yellow
                return `rgb(${red}, ${green}, 0)`; // Dark red to dark yellow
            } else {
                // Transition from dark yellow to dark green
                const red = 255 - Math.round(150 * ((percentage - 50) / 50)); // Sharper transition to darker green
                const green = 100 + Math.round(105 * ((percentage - 50) / 50)); // Darker green to more vibrant green
                return `rgb(${red}, ${green}, 0)`; // Dark yellow to dark green
            }
        };

        // Function to create and update progress bar
        const createOrUpdateProgressTable = (initialValue1, finalValue1, initialValue2, finalValue2) => {
            const maxValue = startingHealth;

            // Compute percentages
            const initialWidth1 = (initialValue1 / maxValue) * 100;
            const finalWidth1 = (finalValue1 / maxValue) * 100;
            const initialWidth2 = (initialValue2 / maxValue) * 100;
            const finalWidth2 = (finalValue2 / maxValue) * 100;

            let resultContainer = document.getElementById('round-result-container-per-team');
            let tableContainer = document.getElementById('progress-table-container');

            if (!tableContainer) {
                tableContainer = document.createElement('div');
                tableContainer.id = 'progress-table-container';
                resultContainer.insertBefore(tableContainer, resultContainer.firstChild);
            } else {
                tableContainer.innerHTML = '';
            }

            const createProgressBar = (initialValue, finalValue, initialWidth, finalWidth) => {
                const container = document.createElement('div');
                container.className = 'progress-bar-container';

                const bar = document.createElement('div');
                bar.className = 'progress-bar';
                bar.style.width = `${initialWidth}%`; // Start with initial width
                bar.style.backgroundColor = getColorFromPercentage(initialWidth); // Initial color

                const text = document.createElement('div');
                text.className = 'progress-bar-text';
                text.textContent = initialValue;

                bar.appendChild(text);
                container.appendChild(bar);

                // Function to animate the text and bar
                let animateProgressBar = (startWidth, endWidth, startValue, endValue, duration) => {
                    const startTime = performance.now();
                    const step = (timestamp) => {
                        const elapsed = timestamp - startTime;
                        const progress = Math.min(elapsed / duration, 1);
                        const currentWidth = startWidth + progress * (endWidth - startWidth);
                        const currentValue = Math.max(0, Math.round(startValue + progress * (endValue - startValue)));

                        bar.style.width = `${currentWidth}%`;
                        bar.style.backgroundColor = getColorFromPercentage(endWidth); // Update color as width changes
                        text.textContent = currentValue;

                        if (progress < 1) {
                            requestAnimationFrame(step);
                        }
                    };
                    requestAnimationFrame(step);
                };

                // Set initial state before animation
                setTimeout(() => {
                    bar.style.transition = 'background-color 1.5s ease-in-out'; // Ensure smooth transition
                    animateProgressBar(initialWidth, finalWidth, initialValue, finalValue, 1500); // 1.5-second duration for animation
                }, 3000); // ms delay before animation starts

                return container;
            };

            // Prepare logo
            const logoContainer = document.createElement('div');
            logoContainer.classList.add('logo-container');
            const logoImage = document.createElement('img');
            logoImage.src = chrome.runtime.getURL('assets/logo.png');
            logoImage.alt = 'GeoDuels';
            logoImage.classList.add('logo-image');
            logoContainer.appendChild(logoImage);
            // End logo prep

            // Prepare round details
            let roundContainer = document.createElement('div');
            roundContainer.classList.add('round-container');

            let roundDetails = document.createElement('div');
            roundDetails.classList.add('round-details');
            roundDetails.innerHTML = `<b>Round ${roundNo} &ndash; ${roundMultiplier}x Damage</b>`;

            let damageDetails = document.createElement('div');
            damageDetails.classList.add('damage-details');
            damageDetails.innerHTML = `<b>Delta:</b> ${unadjustedDamage}`;

            let damageDealt = document.createElement('div');
            damageDealt.classList.add('damage-dealt');
            damageDealt.innerHTML = `<b>Damage (${roundMultiplier}x):</b> ${adjustedDamage}`;

            roundContainer.appendChild(roundDetails);
            roundContainer.appendChild(damageDetails);
            roundContainer.appendChild(damageDealt);

            let nextRoundContainer = document.createElement('div');
            nextRoundContainer.classList.add('round-container');
            nextRoundContainer.classList.add('next-round-padding');
            
            let nextRoundDetails = document.createElement('div');
            nextRoundDetails.classList.add('next-round-details');
            nextRoundDetails.innerHTML = `Next round &ndash; ${nextRoundMultiplier}x Damage`;
            nextRoundContainer.appendChild(nextRoundDetails);
            // End round details prep

            // make that table to-order every single time, farm fresh non-GMO javascript right here
            const table = document.createElement('table');
            table.classList.add('styled-table');
            table.style.width = '100%';
            table.style.borderCollapse = 'collapse';
            
            let team1container = document.createElement('div');
            team1container.classList.add('team-container');
            let team1div = document.createElement('div');
            team1div.classList.add('team-cell');
            let displayTeam1Score = document.createElement('div');
            displayTeam1Score.innerHTML = `${team1score}`;
            displayTeam1Score.classList.add('team-score');
            team1container.appendChild(team1div);
            team1container.appendChild(displayTeam1Score);

            let team2container = document.createElement('div');
            team2container.classList.add('team-container');
            let team2div = document.createElement('div');
            team2div.classList.add('team-cell');
            let displayTeam2Score = document.createElement('div');
            displayTeam2Score.innerHTML = `${team2score}`;
            displayTeam2Score.classList.add('team-score');
            team2container.appendChild(team2div);
            team2container.appendChild(displayTeam2Score);

            const progressBar1 = createProgressBar(initialValue1, finalValue1, initialWidth1, finalWidth1);
            const progressBar2 = createProgressBar(initialValue2, finalValue2, initialWidth2, finalWidth2);
            
            // Build the table row-by-row
            team1div.appendChild(team1);
            team2div.appendChild(team2);

            tableContainer.appendChild(logoContainer);
            tableContainer.appendChild(roundContainer);
            tableContainer.appendChild(team1container);
            tableContainer.appendChild(progressBar1);
            tableContainer.appendChild(team2container);
            tableContainer.appendChild(progressBar2);
            tableContainer.appendChild(nextRoundContainer);
            tableContainer.classList.add('table-container', 'fade-in-up');

            // It keeps checking itself twice. Who knows why. This fixes it.
            setTimeout(() => { pleaseStopRepeating = 0 }, 250);

            // Check if someone lost
            if (finalValue1 <= 0) {
                progressBar1.classList.add('go-away');
                let team2wins = document.createElement('div');
                team2wins.classList.add('game-over');
                team2wins.innerHTML = `${team2name} wins!`;
                setTimeout(() => { progressBar1.remove(); tableContainer.insertBefore(team2wins, tableContainer.children[3]); }, 4700);
            }
            else if (finalValue2 <= 0) {
                progressBar2.classList.add('go-away');
                let team1wins = document.createElement('div');
                team1wins.classList.add('game-over');
                team1wins.innerHTML = `${team1name} wins!`;
                setTimeout(() => { progressBar2.remove(); tableContainer.insertBefore(team1wins, tableContainer.lastChild); }, 4700);
            }
        };

        const checkForScores = () => {
            const teamScores = document.getElementsByClassName("score-label")[0];
        
            if (!teamScores) {
                console.log("No team scores found.");
            }
            else {
                console.log(teamScores);
        
                // Extract the value inside <span>
                const scoreValue = teamScores.querySelector('span')?.textContent;
        
                if (scoreValue && pleaseStopRepeating == 0) {
                    pleaseStopRepeating = 1;
                    // Get the specific scores for Team 1 and Team 2 !!! todo make this work in a quick play 1v1, too
                    const allScores = document.getElementsByClassName('score-label');
                    const filteredScores = Array.from(allScores).filter(label => !label.classList.contains('shrink'));
                    team1score = filteredScores[0].querySelector('span')?.textContent;
                    team2score = filteredScores[1].querySelector('span')?.textContent;
                    
                    grabRoundNumber();
                    if (roundNo == 1) {
                        grabTeamNames(); // Get team names to throw in the table and dictionary
                    }

                    // (checking if the team order on screen matches that in the dictionary for reasons I promise make sense)
                    // blatant abuse of dot notation for malicious gain 
                    if (team1name == document.getElementsByClassName("team-name")[2].querySelector('.font-weight-bold').textContent) {
                        console.log(team1name);
                    }
                    else {
                        console.log(team2name);
                        [team1score, team2score] = [team2score, team1score];
                    }

                    // Sometimes it reads the scores several times. IDK how to prevent that, so just make sure it can't result in taking damage more than once:
                    if (solvedRounds < roundNo) {
                        // Example values for progress bars
                        let initialValue1 = teamHealths[team1name]; // Starting value for animation
                        let initialValue2 = teamHealths[team2name];
                        let finalValue1;
                        let finalValue2;

                        // Determine which team is losing HP, and how much, then update my one-size-fits-all storage solution, a global dictionary
                        if (team1score > team2score) {
                            unadjustedDamage = team1score - team2score;
                            adjustedDamage = unadjustedDamage * roundMultiplier;
                            finalValue1 = initialValue1;
                            finalValue2 = initialValue2 - adjustedDamage;
                            teamHealths[team1name] = finalValue1;
                            teamHealths[team2name] = finalValue2;
                        }
                        else if (team2score > team1score) {
                            unadjustedDamage = team2score - team1score;
                            adjustedDamage = unadjustedDamage * roundMultiplier;
                            finalValue1 = initialValue1 - adjustedDamage;
                            finalValue2 = initialValue2;
                            teamHealths[team1name] = finalValue1;
                            teamHealths[team2name] = finalValue2;
                        }
                        else {
                            unadjustedDamage = 0;
                            adjustedDamage = 0;
                            finalValue1 = initialValue1;
                            finalValue2 = initialValue2;
                            teamHealths[team1name] = finalValue1;
                            teamHealths[team2name] = finalValue2;
                        }
                        // Create or update the progress table
                        createOrUpdateProgressTable(initialValue1, finalValue1, initialValue2, finalValue2);
                        solvedRounds = roundNo;
                    }  
                }
            }
        };

        const makeTeamDictionary = () => {
            team1name = team1.textContent;
            team2name = team2.textContent;
            teamHealths[team1name] = startingHealth;
            teamHealths[team2name] = startingHealth;
        }

        const grabTeamNames = () => {
            const teamNames = document.getElementsByClassName("team-name");
            if (teamNames) {
                team1 = teamNames[2].querySelector('.font-weight-bold').cloneNode(true);
                team2 = teamNames[3].querySelector('.font-weight-bold').cloneNode(true);
                team1.classList.add("team-name-box");
                team2.classList.add("team-name-box");
                makeTeamDictionary();
            }
        }
        
        const grabRoundNumber = () => {
            let roundInfoElements = document.querySelector(".round-info");
            // Suffer at the hand of my nested conditionals
            if (roundInfoElements) {
                roundInfoContent = roundInfoElements.textContent;
                if (roundInfoContent) {
                    roundNo = roundInfoContent.match(/Round (\d+) \/ \d+ finished/)[1]; // Yippee, regex
                    console.log(roundNo, multiplierStart, multiplierAdd, multiplierMax);
                    if (parseFloat(roundNo) < multiplierStart) {
                        roundMultiplier = 1;
                        if (parseFloat(roundNo) + 1 == multiplierStart) {
                            nextRoundMultiplier = Math.min(parseFloat(multiplierMax), 1 + (parseFloat(roundNo) - multiplierStart + 2) * multiplierAdd);
                        }
                        else {
                            nextRoundMultiplier = 1;
                        }
                    }
                    else {
                        roundMultiplier = Math.min(parseFloat(multiplierMax), 1 + (parseFloat(roundNo) - multiplierStart + 1) * multiplierAdd);
                        nextRoundMultiplier = Math.min(parseFloat(multiplierMax), 1 + (parseFloat(roundNo) - multiplierStart + 2) * multiplierAdd);
                    }
                    if (parseFloat(roundNo) == 1) {
                        solvedRounds = 0;
                        gameOver = 0;
                    }
                }
            }
        }
    
        // Initial check when the lobby is opened
        checkForScores();
    
        // Function to check added nodes recursively for 'score-label' class
        const checkAddedNodes = (nodes) => {
            nodes.forEach(node => {
                if (node.nodeType === 1) {
                    node.querySelectorAll('*').forEach(descendant => {
                        // *megamind* no trim?
                        if (descendant.className === 'score-label') {
                            console.log("Descendant with exact class 'score-label' found:", descendant);
                            checkForScores();
                        }
                    });
                }
            });
        };

        // Create a MutationObserver to watch for changes in elements with the class 'score-label'
        const observer = new MutationObserver((mutationsList) => {
            for (const mutation of mutationsList) {
                if (mutation.type === 'childList') {
                    checkAddedNodes(mutation.addedNodes);
                }
            }
        });

        // Start observing the body for changes in child elements
        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    };
})();
