# _FixLazyImages
React Wordpress Microsite plugin for replacing `data-src` with `src` on image tags within content pulled from TSW. The Smart Wallet has a plugin that lazyloads the images but breaks them on microsites, which is why we do this replacement.

This plugin uses the `the_content` filter to do the string replacement.


## Installation
From the command line, run `react-wp --plugin --install _FixLazyImages`.
Once installed, select `Y` when prompted to activate.
