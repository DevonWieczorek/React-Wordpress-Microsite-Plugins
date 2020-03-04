# _TSWSearchAndReplace
React Wordpress Microsite plugin for replacing any text references to The Smart Wallet with the appropriate site name.

This plugin also replaces the `contact-us` link with an `mailto:info@` link, as well as hiding the post date from the Privacy Policy and T&C pages since they include the date in their content.

This plugin uses the `the_content` filter to do the string replacement.


## Installation
From the command line, run `react-wp --plugin --install _TSWSearchAndReplace`.
Once installed, select `Y` when prompted to activate.
