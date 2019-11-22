# Kris Kringle

## Generator Script

In order to actually create the matches between all of the frivolous folk, we need to generate some matches. Previously this was done every time the page loaded, which was unnecessary as we don't want to matches to keep changing on people!. 

Instead now, whenever the code is committed, the `generator.js` script runs once using the edited `participants.json` file to create the matches which is saved to another file: `matches.json`. Now when the page loads, it only needs to load the pre-made data. Nifty! 

As a bonus, if the generator fails to run for whatever reason, the code won't be committed, or deployed.

If you have a better idea on how to do this, leave your suggestion as an issue.


