<p align="center">
  <img src="https://i.imgur.com/7RBs0tZ.png">
</p>

#

This is the backend repository for Easy Raffle platform.

It's a API REST built with NodeJS + Express.

The main purpose of this project is to facilitate the raffle seller life, who struggle with finding a good way to promote his raffles and find people willing to buy them.

## Note 📝

This repository is still in building stage. It means that the information provided here can and will constantly update and change as the project evolves, so be aware for the changes!

## About this project 📚

As a college student, I see a lot of friends struggling to sell their raffles for prom or freshman parties a lot. Their biggest problem is always find a good way to promote their product and finding people willing to buy them. Knowing this, I created the Easy Raffle platform, where they can registrate their raffle and finding buyers in the easiest way possible.

## Contribuing 🖊

You can contribute in many ways, but the most effective is creating a new issue with your sugestion, code, experience, or anything you can think that it will help this project evolve.

If you want to make a pull request, please read this before so you can adequately commit:

- [Semantic Commit](https://seesparkbox.com/foundry/semantic_commit_messages)

## Getting started 💡

### Pre-requisits ✋🏼

To run this project in the development mode, you'll need to have a basic environment with NodeJS 8+ installed. To use the database, you'll need Postgress installed and running on your machine.

You will need to create another database. To do so, I recommend you to download the postbird app.


### Docker

To run this project you will need to have Docker runing in your machine and have this image configurated.

To do so, you will need to create the following image:

Postgres (Note: Replace the <password> field for the password you want):

```bash
$ docker run --name database -e POSTGRES_PASSWORD=<password> -p 5432:5432 -d postgres
```

### Postbird

To create a new database, you will need to login in postbird informing the password you provided for docker in the step before.

### Installing ⚙️

#### Cloning the repository

```bash
$ git clone https://github.com/gabrielccarvalho/easy-raffle-backend
```

Going to the project folder

```bash
$ cd easy-raffle-backend
```

Creating a .env file

You will need to create a .env file with every field in .env.example filled with real information.

#### Installing the dependencies

With yarn

```bash
$ yarn install
```

With npm

```bash
$ npm install
```

Running the development enviroment

```bash
$ yarn dev
```

## Routes 🚙

### User related routes

#### List Users

| Endpoint | Method | Params | URL Params | Body | Success Response |         Error Responsonse         |
| :------: | :----: | :----: | :--------: | :--: | :--------------: | :-------------------------------: |
|  /users  |  GET   |   -    |     -      |  -   |  Code: 200 - OK  | Code: 500 - INTERNAL SERVER ERROR |

#### Create Account

| Endpoint | Method | Params | URL Params | Body | Success Response |         Error Responsonse         |
| :------: | :----: | :----: | :--------: | :--: | :--------------: | :-------------------------------: |
|  /users  |  POST  |   -    |     -      | JSON |  Code: 200 - OK  | Code: 500 - INTERNAL SERVER ERROR |

The JSON body should look like this:


```JSON
{
  "name": "Gabriel",
  "email": "gabriel@email.com",
  "numero_cadastro": "000.000.000-00",
  "password": "123456"
}
```

#### Log in

| Endpoint | Method | Params | URL Params | Body | Success Response |         Error Responsonse         |
| :------: | :----: | :----: | :--------: | :--: | :--------------: | :-------------------------------: |
| /session |  POST  |   -    |     -      | JSON |  Code: 200 - OK  | Code: 500 - INTERNAL SERVER ERROR |

The JSON body should look like this:

```JSON
{
  "email": "gabriel@email.com",
  "password": "123456"
}
```

#### Update Information

| Endpoint | Method | Params | URL Params | Body | Success Response |         Error Responsonse         |
| :------: | :----: | :----: | :--------: | :--: | :--------------: | :-------------------------------: |
|  /users  |  PUT   |   -    |     -      | JSON |  Code: 200 - OK  | Code: 500 - INTERNAL SERVER ERROR |

The JSON body shoul look like this:

- For changing passwords:

```JSON
{
  "email": "gabriel@email.com",
  "oldPassword": "123456",
  "password": "BetterPassword",
  "confirmPassword": "BetterPassword"
}
```

- For changing any other informations:

```JSON
{
  "name": "New Name",
  "email": "NewEmail@email.com",
  "password": "123456"
}
```

### Raffle related routes

#### List Raffles

| Endpoint | Method | Params | URL Params | Success Response |         Error Responsonse         |
| :------: | :----: | :----: | :--------: | :--------------: | :-------------------------------: |
| /raffle  |  GET   |   -    |     -      |  Code: 200 - OK  | Code: 500 - INTERNAL SERVER ERROR |

#### Create a Raffle

| Endpoint | Method | Params | URL Params | Body | Success Response |         Error Responsonse         |
| :------: | :----: | :----: | :--------: | :--: | :--------------: | :-------------------------------: |
| /raffle  |  POST  |   -    |     -      | JSON |  Code: 200 - OK  | Code: 500 - INTERNAL SERVER ERROR |

The JSON body shoul look like this:

```JSON
{
  "raffle_name": "The name of the raffle event you want to create",
  "raffle_deadline": "The limit date to buy that raffle",
  "raffle_prize": "The prize that the raffle provides",
  "raffle_draw_date": "The raffle draw date",
  "raffle_price": "The raffle price",
  "raffle_quantity": "The quantity of raffles",
}
```

#### Delete a Raffle

|   Endpoint  | Method | Params | URL Params | Body | Success Response |         Error Responsonse         |
|   :------:  | :----: | :----: | :--------: | :--: | :--------------: | :-------------------------------: |
| /raffle/:id | DELETE |   id   |      -     |  -   |  Code: 200 - OK  | Code: 500 - INTERNAL SERVER ERROR |

##### Params:

- id: is the id of the raffle you want to delete.

#### Buy a Raffle

|     Endpoint    | Method | Params | URL Params | Body | Success Response |         Error Responsonse         |
|     :------:    | :----: | :----: | :--------: | :--: | :--------------: | :-------------------------------: |
| /raffle/buy/:id |  POST  |   id   |      -     |  -   |  Code: 200 - OK  | Code: 500 - INTERNAL SERVER ERROR |

##### Params:

- id: is the id of the raffle you want to buy.

## Models 📋

### User

```JavaScript
{
name: Sequelize.STRING,
email: Sequelize.STRING,
numero_cadastro: Sequelize.STRING,
company: Sequelize.BOOLEAN,
password: Sequelize.VIRTUAL,
password_hash: Sequelize.STRING,
},
```

#### Model Description

This model is used to pass the user information.

#### Field Details

- name: Is a string field that recieves your name as data.
- email: Is a string field that recieves your email as data.
- numero_cadastro: Is a string field that recieves either your cpf as data.
- password: Is a virtual field that recieves your actual password as data.
- password_hash: Is a string field that recieves your hashed password as data.


### Raffle

```JavaScript
{
  user_id: Sequelize.INTEGER,
  raffle_name: Sequelize.STRING,
  raffle_deadline: Sequelize.DATE,
  raffle_prize: Sequelize.ARRAY(Sequelize.STRING),
  raffle_price: Sequelize.FLOAT,
  raffle_draw_date: Sequelize.DATE,
  raffle_quantity: Sequelize.INTEGER,
},
```

#### Model Description

This model is used to pass the raffle information.

#### Field Details

- user_id: Is an integer field that recieves the creator's id as data.
- raffle_name: Is a string field that recieves the raffle name as data.
- raffle_deadline: Is a date field that recieves the limit date to buy that raffle as data.
- raffle_prize: Is an array field that recieves a string array of prizes that the raffle provides as data.
- raffle_price: Is a float field that recieves the the raffle price as data.
- raffle_draw_date: Is a date field that recieves the raffle draw date as data.
- raffle_price: Is a string field that recieves the raffle price as data.
- raffle_quantity: Is an integer field that recieves the quantity of raffles as data.
- expired_at: Is a date field that recieves the date the raffle will expire as data.

### Ticket

```JavaScript
{
  user_id: Sequelize.INTEGER,
  raffle_id: Sequelize.STRING,
},
```

#### Model Description

This model is used to create a ticket for a raffle.

#### Field Details

- user_id: Is an integer field that recieves the buyer id as data.
- raffle_id: Is an integer field that recieves the raffle id as data.

## Technologies 🖥

- [Node](https://nodejs.org/en/) - Build the backend.
- [Docker](https://www.docker.com/) - Containers.
- [Body-Parser](https://github.com/expressjs/body-parser#readme) - Node.js body parsing middleware.
- [Eslint](https://eslint.org/) - JS Linter and code style.
- [Prettier](https://github.com/prettier/prettier) - Code formatter.
- [Dotenv](https://github.com/motdotla/dotenv) - Environment loader.
- [Nodemon](https://nodemon.io/) - Process Manager used in the development.
- [Sucrase](https://sucrase.io/) - Babel alternative.
- [Bcrypt](https://www.npmjs.com/package/bcryptjs) - Hashing passwords.
- [Express](https://expressjs.com/) - Application Router.
- [JSON Web Token](https://jwt.io/) - User authentication.
- [PostgreSQL](https://www.postgresql.org/) - Database.
- [Sequelize](https://sequelize.org/) - Object Modeling + PostgreSQL Connector.
- [EditorConfig](https://editorconfig.org/) - Consistent coding styles.
- [Cors](https://www.npmjs.com/package/cors) - Used to enable CORS.
- [Date Fns](https://date-fns.org/) - Used to work with dates.