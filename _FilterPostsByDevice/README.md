# _FilterPostsByDevice
React Wordpress Microsite plugin for filtering out posts based on device type. TSW has a lot of duplicate articles targeted for either iOS or Android/Web.

This plugin uses the `get_posts` filter to append what tag to EXCLUDE to the request endpoint.

## Usage
Add this directory to the `plugins` directory in your `src/plugins` directory.

Edit the `plugins/index.js` file to include `export * from './_FilterPostsByDevice'.`

## Dependencies
`_FilterPostsByDevice` uses the [Query String](https://www.npmjs.com/package/query-string) package for parsing and updating url parameters.
