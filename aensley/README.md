# File Upload Manager

This upload manager works by launching a dialog window from a link on any page. The dialog window shows all uploaded files and provides a form to upload more.

## Build requirements

 1. [Node.js](https://github.com/nodesource/distributions)
 2. [Grunt](http://gruntjs.com/getting-started)

## Setup

### Clone

Clone this repository with:

````
git clone https://github.com/aensley/jQuery-File-Upload.git
````

### Build

 1. From a command line, navigate to this directory (`aensley/`)
 2. Run `npm install`
 3. Run `grunt`

### Modify

 1. Place any authentication code needed at the top of the following files:
    * `aensley/dist/index.php`
    * `aensley/dist/upload.php`

### Deploy

 1. Copy the contents of the `aensley/dist/` directory to a separate directory on your server.
    1. Something like `/<webroot>/upload/`
 2. Make sure the `files` directory on the server is owned by the web server user (`apache` or `www-data` for instance).
 3. Add the 5 lines of code from `form.html` to your form wherever you want the link to be displayed.
 4. Modify the `href` of the link to point to the upload directory you created in step 1.
 5. Modify the `src` of the last script file to point to the `dialog.min.js` in the upload directory you created in step 1.

## License
Released under the [MIT license](http://www.opensource.org/licenses/MIT).
