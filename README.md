# Friendstagram

Friendstagram is a clone of Instagram

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

* Create a unique listing
* Update a listing you created
* Delete your listings
* Review listings from other users
* Delete those reviews

### 13. To Log Out or Create a Listing, click the traveler icon

* you can log back in with any credentials you used to sign up

### 14. To view a list of the listing, click the "Current Listings" link

### 15. When looking at a list of listings, you can navigate to that particular listing page by clicking it

### 16. On the individual listing page:

* if the listing is yours, you can edit or delete the listing
* if the listing belongs to another user, you can leave a review and delete said review

## That concludes the navigation and functionality of PopPilgrim
## Thank you for viewing

* Remember to stop the services in the frontend and backend directories

## The following steps are to remove tables and the database from your local machine

### 1. Undo seeds and migrations from the database, and drop the database

```sh
npx dotenv sequelize db:seed:undo:all
npx dotenv sequelize db:migrate:undo:all
npx dotenv sequelize db:drop
```

### 2. Undo seeds and migrations from the database

```sh
DROP USER <name>;
```

### The tables, database, and user should all be dropped from your local machine

