# Project-2

1. [Installation](#installation)
    1. [Dependencies](#dependencies)
    1. [Configuration](#configuration)
1. [How To Use](#how-to-use)
1. [How It Works](#how-it-works)
    1. [Models](#models)
    1. [Views](#views)
    1. [Controller](#server)
1. [About Us](#about-us)

Our second coding boot camp project: Nesterly will allow the user to develop a cataloged inventory of their home goods. The user will be able to organize their major possessions by category and location. Both are customizable, if you are a musician in a one-bedroom apartment, or an art collector in a mansion, if you have stuff to keep track of, Nesterly can keep track of it.

## Installation

1. [Dependencies](#dependencies)
    1. [NodeJS](#nodejs)
    1. [Nodemailer](#nodemailer)
    1. [json2csv](#json2csv)
1. [mySQL](#mysql)
1. [Configuration](#configuration)
    1. [dotenv and .env](#dotenv-and-env)
    1. [config/config.json](#config-config-json)

The Nesterly code is available from [github](https://github.com/kiselblat/Project-2). Once you've cloned the repo to your local computer there will still be some configuration necessary to get Nesterly running.

### Dependencies

1. [NodeJS](#nodejs)
1. [ExpressJS](#expressjs)
1. [Nodemailer](#nodemailer)
1. [json2csv](#json2csv)
1. [fuse.js](#fusejs)

#### NodeJS

[NodeJS](https://nodejs.org/) is an application that executes JavaScript code outside of the browser environment. Download node [here](https://nodejs.org/en/download/) and install it.

This will include, among other things, the node package manager, or `npm`. With the included `package.json` file, all necessary dependencies can be installed from the terminal with:

```bash
npm install
```

#### ExpressJS

[ExpressJS](https://expressjs.com/) is a web framework that we are using to start a server and serve web content through a series of define routes.

#### Nodemailer

[Nodemailer](https://nodemailer.com/about/) is a NodeJS module to allow for fast, easy email sending.

The method Nodemailer uses to send email, in this case a Gmail account, is defined in the `transporter.js` config file. Credentials are stored as environment variables, in `.env`.

In order to get your Gmail to send emails from Nodemon you may have to [allow access to less secure apps](https://myaccount.google.com/lesssecureapps) in the account settings of the account you intend to use.

#### json2csv

[json2csv](https://www.npmjs.com/package/json2csv) is a package that converts a JSON object into a string that can be written to a csv file. In this case, the string is passed directly into an email object that Nodemailer then simply packages up in a csv file as an attachment.

#### fusejs

[fusejs](https://www.npmjs.com/package/fuse.js) is a package that serves to implement our search capability. It is implemented by creating a `Fuse` object and then calling a built-in `Model.search( `*`array_of_items`*` , `*`options_object`*`)` function.

### mySQL

[mySQL](https://www.mysql.com/) is a database server and query language. We are using it to store our inventory data. Download and install the mySQL installer [here](https://dev.mysql.com/downloads/installer/).

You'll need to create an empty database on your local machine in order to get Nesterly running:

```sql
CREATE DATABASE database_name;
```

But don't worry about adding tables, that is taken care of by the app.

### Configuration

1. [dotenv and .env](#dotenv-and-env)
1. [config.json](#config-config-json)

Once all the necessary software and dependencies have been installed, there are some files that must be configured in order to run your Nesterly server.

#### dotenv and .env

The [dotenv](https://www.npmjs.com/package/dotenv) package takes the contents of a `.env` file into `process.env` as variables that can be accessed in an environment specific context.

The `.env` file is often used to store private credentials, as it is here. You will need to provide your own `.env` file with the following contents:

```env
## Gmail credentials

GMAIL_USER=your-email@account.com
GMAIL_PASSWORD=yourPassword
```

This will give Nodemailer the necessary credentials to send an email.

#### config.json

The `config.json` file contains the necessary info and credentials to interface the NodeJS/ExpressJS server we've just set up, and the mySQL database we've created.

Add information for your mySQL database and server within the `development` brackets, assuming the goal is to run on your local machine.

Use the space marked `production` for your deployed database credentials.

## How To Use

Start Nesterly from the command line:

```bash
node server.js
```

The app will interface with the database and create the necessary tables and assign them the necessary relations. It will then report the port the server is listening on to the terminal. The default is 8080.

Then open `localhost:`*`PORT`*` ` in your browser and begin using Nesterly!

Nesterly is also deployed at <https://project-too.herokuapp.com/>

The user will land on home page that will give him/her the option to enter a new item or view items. Viewed items can be edited or deleted.

## How It Works

  1. [Models](#models)
      1. [Database](#database)
      1. [Sequelize](#sequelize)
  1. [Views](#views)
      1. [Handlebars](#handlebars)
      1. [Bootstrap Modals](#bootstrap-modals)
  1. [Controller](#server)
      1. [HTML Routes](#handlebars)
      1. [API Routes](#bootstrap-modals)

Nesterly is organized into different files around a MVC paradigm. The application is organized into three broad categories: the **Model**, which handles the information and operations of the app on the server; the **Views**, which define what the user sees, and exactly how they interact with it; and the **Controller**, which defines the routes and thus what functions the user can perform.

### Models

1. [Database](#database)
1. [Sequelize](#sequelize)
    1. [Inventory](#inventory)
    1. [Categories](#categories)
    1. [Locations](#locations)

#### Database

The database is not technically a part of the model, it is in fact another server that, in practice, will often be on another computer. We're talking about it here because the models are a reflection of the structure of the database and because we've catagoized the Object Relational Mapper, `Sequelize`, here as well.


The database itself contains one table of items and two related tables of categories of items (like appliances or electronics) and locations for items (such as living room, kitchen, or Room 305).


We used a [mySQL](#mysql) database on `localhost` for development, and our [deployed app](https://project-too.herokuapp.com/) uses the [JawsDB](https://elements.heroku.com/addons/jawsdb) Heroku add-on to implement our database.

#### Sequelize

1. [Inventory](#inventory)
1. [Categories](#categories)
1. [Locations](#locations)

[Sequelize](https://www.npmjs.com/package/sequelize) serves as the Object Relational Mapper of our application. It is a NodeJS module interacts with our database for the code. As such, it contains many useful functions with which we can implement database queries with JavaScript.

Sequelize is used by creating a series of **models** that reflect the tables in our database and the kind of information they contain, as well as the relationships between those two tables. Sequelize automatically creates a primary key, as well as some timestamp fields for creation and updating. Foreign keys are assigned functionally as well.

##### Inventory

This table contains information about each item in our home inventory.

- item
: This is the name of a thing in your possesion. What you call the item you're recording.

- description
: This is a long-text entry for adding a lot of info about your item if the user sees fit.

- cost
: This is a floating point number that represents the value of the item.

- serialNum
: This optional string field is for an identifying number that may be attached to the item.

- warrantyExp
: A date object, that we've labeled for a warrany expiration date.

##### Categories

- categoryName
: This string represents the name of the category.

##### Locations

- locationName
: This string represents the name of the location.

### Views

1. [Handlebars](#handlebars)
    1. [index](#index)
    1. [categories](#categories)
    1. [locations](#locations)
    1. [mailer](#mailer)
1. [Bootstrap Modals](#bootstrap-modals)

The view is the part of the application that the user sees and interacts with. It creates the user experience with both aesthetics and the manner it presents and requests information.

Our view is executed with Handlebars, a templating system compatible with our NodeJS server. Each view is paired with a JavaScript file in the `/public/js` directory.

#### Handlebars

1. [index](#index)
1. [categories](#categories)
1. [locations](#locations)
1. [mailer](#mailer)

[Handlebars](https://handlebarsjs.com/) is a templating system that allows our site to be broken up into views, each of which are rendered as the body of our `main.handlebars` template.

We include Handlebars through the node module 'express-handlebars' and by invoking the `.engine` method built into the express object `app`.

##### index

This is the primary view. It presents the user with  a search box for finding items in large databases, links to the category and location managers, a list of all the currently stored items, and a form for adding a new item, presented in a [modal](#bootstrap-modals).

##### categories

This view gives the user an entry form for adding new categories, and a list of all the current categories.

##### locations

Like categories, this view allows the addition of new locations and a list of current locations.

##### mailer

This view allows the user to enter an email address and have a report containing a comma seperated variable file of the items table. There is also a space for an additional message.

#### Bootstrap Modals

Our CSS framework is [Bootstrap](https://getbootstrap.com/). It allows easy, fast styling as well as mobile responsive positions of page elements.

It also give us the ability to hide our New Item dialogue in a modal until it's needed, allowing the user to browse the list of all items without having to scroll as far.

### Controller

1. [HTML Routes](#html-routes)
1. [API Routes](#api-routes)

## About Us

Nesterly is our second group project for the Unniversity of Minnesota Coding Boot Camp, Cohort 13.

[Eric Bergan](https://github.com/einstein1967)

[Tom Christ](https://github.com/kiselblat)

[Shaquima McSwain](https://github.com/qmiko)

[Roisin Owens](https://github.com/dudeitsrowsheen)

[Honghao Zheng](https://github.com/hzheng8)
