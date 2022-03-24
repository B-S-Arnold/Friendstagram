# Friendstagram

Friendstagram is a clone of Instagram by Bryan Arnold

The app currently featuring:
* Authenticated users
* Image posts
* Comment posts
* Home Page with all images
* Profile pages with all images by those users


## Steps to run this app

### 1. Clone this repo

```sh
https://github.com/B-S-Arnold/Friendstagram
```
### 2. Install the dependencies from the root directory

```sh
pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt
```

### 3. Create a POSTGRESQL user with CREATEDB and PASSWORD in PSQL

```sh
CREATE USER <name> WITH CREATEDB PASSWORD <'password'>;
```
* NOTE: remeber this information, as you will be using it in step 5

### 4. Create a POSTGRESQL database WITH OWNER as the user you created 

```sh
CREATE DATABASE <dbname> WITH OWNER <name>;
```

### 5. Create a .env file in the backend directory based on the .env.example found wihtin said directory

### 6. Enter your username and password information in your .env file along with a secure set of (random) characters for your SECRET_KEY

### 7. Open the Python shell

```sh
pipenv shell
```
### 8. Upgrade and seed the database
* NOTE - if at any moment, you wish to undo seeds and migrations perform the following:

```sh
 flask db upgrade
```

```sh
flask seed all
```

### 8. Run flask from within the shell in the root directory

```sh
flask run
```

### 9. Open up a second terminal and CD into react-app. Start npm services, which should open in the browser

```sh
npm start
```

* if the browser does not automatically open, navigate to http://localhost:3000

### 10. Once on the home page, you click the "Log in" button, which can will give you the option to log in as a "Demo User"

* alternatively you can navigate to the "Sign up" page, and will automatically be logged in as an authenticated user with your specified information

### 11. The nav bar will remain on the top of the window at all times, so if you are ever lost you will have access to:

* The Home Page by clicking on the Friendstagram logo or the Home icon.
* The "Plus" icon to add a new image
* The "User" icon to access a dropdown menu with the following:
   * Profile
   * Logout

<!-- HERE -->




### 12. As a logged in user, you can do the following:

* Post images with captions
* View your own images and those of others
* Edit your images and captions
* Delete Images
* Comment on your own and others' images
* View all of your comments and the comments others have made
* Edit your comments
* Delete your comments

### 13. Working with Images

* You can post an image from anywhere on the site with the "Plus" icon in the NavBar
* You can view your images as they show up on the Home page feed,
or you can view images on individual Profile pages, including your own
* To edit or delete an image, click the "Ellipsis" appearing in the top right corner of images belonging to you

### 14. Working with Comments
* On the main feed page, you can comment on other's images
* On the main feed page, images will only display 1 comment, and anymore than that, there will be a "View all #num comments" button
  * This will show the image with all of it's comments
  * Also, it will have an "Add Comment" field at the bottom
* Anywhere you can see a comment that you made, there will be edit and delete buttons.

### 15. To Log Out

* Click on your "Profile" icon in the NavBar, and click the "Logout" button

### Thank you for trying Friendstagram!

### Contact info:

Bryan Arnold

LinkedIn: 'https://www.linkedin.com/in/bryan-arnold-882378215/'
GitHub: https://github.com/B-S-Arnold
email: bryanscottarnold@gmail.com



This project was made in 2022 as a part of the App Academy curriculum

https://www.appacademy.io/
