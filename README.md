# GeoDuels
Google Chrome extension. Adds a duels gamemode to Geotastic.net! The lower-scoring team loses HP equal to their difference in score (times a multiplier in later rounds). Lose all your HP and it's game over.

Some special features include:
- Customize starting health and damage multipliers (click the extension icon).
- Funny little animations in a UI that my mom would pin to the refrigerator.

## Functionality Disclaimer

Currently this extension **only supports custom, 2-team games**. Thus, the lobby host will need to have donated to Geotastic to use it. Support for 1v1s in Quick Play will come soon(TM).

Also... this extension is janky, but it works. Don't judge my sloppy code too harshly, pretty please. It's hard to make things work with someone else's website (and for that reason, you'll have to restart lobbies yourselves :P).

## Why does GeoDuels need X permission?

**storage**: There are some configurable options in this extension, such as starting health. Using Chrome storage allows these values to be saved between sessions.
**tabs**: The extension needs to make sure you're on the Geotastic website before I try to setup a scoreboard. (P.S. other than the pop-up for configuring settings, nothing else will run if you aren't on https://*.geotastic.net/\*.)
**clipboardRead**: For your convenience, there's a button that'll paste preset settings in. To do this, it needs to read your clipboard. It only does this when you click the button - feel free to check the source code to verify this (settings.js, line 80).
