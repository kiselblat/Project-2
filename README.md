# Project-2

1. [Installation](#installation)
    1. [Dependencies](#dependencies)
    1. [Configuration](#configuration)
1. [How To Use](#how-to-use)
1. [How It Works](#how-it-works)
    1. [Database](#database)
    1. [Server](#server)
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
1. [fuse.js] (#fusejs)

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

#### fuse
[fusejs](https://www.npmjs.com/package/fuse.js) is an Apache License open source project. Maintaining and updating it takes up a good chunk of time, and there's still plenty of work to do. To be able to provide the project with the attention it deserves, I decided to experiment with sponsorship and/or support. If this works out, I can route the chunk of time that is usually spent on lucrative endeavors to this project.

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

Then open `localhost:PORT` in your browser and begin using Nesterly!

Nesterly is also deployed at <https://project-too.herokuapp.com/>

The user will land on home page that will give him/her the option to enter a new item or view items. Viewed items can be edited or deleted.

## How It Works

  1. [Models](#model)
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

There is one main database and 2 relational databases. The relational will be for categories of items, e.g. appliances or electronics, and locations for items, e.g. living room or kitchen.

### Views

1. [Handlebars](#handlebars)
1. [Bootstrap Modals](#bootstrap-modals)

Category and location are selectable via dropdown.

Entering new items and editing existing items will be done by modals.

### Controller

1. [HTML Routes](#handlebars)
1. [API Routes](#bootstrap-modals)

## About Us

Tom Christ

Eric Bergan

Honghao Zheng

Roisin Owens

Shaquima McSwain
