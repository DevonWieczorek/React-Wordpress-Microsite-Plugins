# _FilterPostsByDevice
React Wordpress Microsite plugin for filtering out posts based on device type. TSW has a lot of duplicate articles targeted for either iOS or Android/Web.

This plugin uses the `get_posts` filter to append what tag to EXCLUDE to the request endpoint.

## Installation
From the command line, run `react-wp --plugin --install _FilterPostsByDevice`.
Once installed, select `Y` when prompted to activate.

## Dependencies
`_FilterPostsByDevice` uses the [Query String](https://www.npmjs.com/package/query-string) package for parsing and updating url parameters.
