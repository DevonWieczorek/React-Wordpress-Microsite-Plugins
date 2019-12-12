This is the official repository that hosts all plugins for the [React Wordpress Microsite](https://github.com/FluentCo/React-Wordpress-Microsite) project.

## `React-WP CLI`
The setup and theming of this project is bootstrapped by [React-WP CLI](https://github.com/FluentCo/React-WP-CLI) which is a proprietary CLI designed specifically for this project structure.

`React-WP CLI` is also used for plugin installation and management.

#### `Install`
To install a plugin from a remote repository, run `react-wp --plugin --install [plugin] <repository> <path>`. In this case `repository` is the remote repository to install from (if you are pulling from a repo other than this one), and `path` is the path to the plugin within the repository (if it is not at the root).
`repository` and `path` are optional.

####  `Activate`
To activate an existing plugin, run `react-wp --plugin --install [plugin]`. The plugin files must already live within your `plugins` directory.

Activating a plugin will add the plugin export to the `plugins/index.js` file so that it is accessible from the `PluginStore`.

When installing a remote plugin, you will automatically be prompted to activate the plugin once installation is complete.

#### `Update`
To update an existing plugin, run `react-wp --plugin --update [plugin]`. `repository` and `path` do not need to be specified for this command because they are saved to the `plugins.json` file when they are installed.

#### `Deactivate`
To deactivate a plugin, run `react-wp --plugin --deactivate [plugin]`.

This will remove any of the plugin's exports from `plugins/index.js` while leaving the plugin files in tact and keeping it as a dependency in `plugins.json`.

#### `Uninstall`
To completely uninstall a plugin, run `react-wp --plugin --uninstall [plugin]`.

This will delete all plugin files from your system and remove the plugin as a dependency in `plugins.json`. If the plugin was still active, it will deactivate the plugin before installation.

*Please note that if you have manually added any files to the `public` directory or the `index.html` file, uninstalling the plugin will not remove these files. They must be removed manually.*
