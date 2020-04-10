# _InitTrackersEvent
React Wordpress Microsite plugin for executing the initTrackers function and event. Snapchat pre-renders their pages and thus triggers false views. Adding this event checks to see if the page is being loaded in the Snap browser. If so, it waits until a mousemove or touch event to fire initTrackers, otherwise it calls it right away.


## Installation
From the command line, run `react-wp --plugin --install _InitTrackersEvent`.
Once installed, select `Y` when prompted to activate.
