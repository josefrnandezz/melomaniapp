<h1 align="center">
  Melomaniapp 🎸
  <br>
</h1>

<h4 align="center"> Musical Events Management System built on top of <a href="https://nestjs.com/" target="_blank" style="color:#ED1543;">NestJS</a> and <a href="https://nextjs.org/" target="_blank" style="color:##0276E8;">NextJS</a>.</h4>

## Table of Contents
* [About the Project](#about-the-project)
* [Key Features](#key-features)
* [Install, build and run!](#download)
* [Built With](#build)
* [License](#license)
* [Contact](#contact)


## About the project
 Here you will find my final degree thesis at University of Córdoba, Spain. This project's goal is to unify in one platform the management of musical events from each essential component of them (public a.k.a fans, establishments and artists) offering a pleasant user experience through different web apps.

The purpose of this project is to learn new technologies like NestJS and NextJS using mono-repo with Nx.dev and apply concepts about Software Desing like Event Modeling, Domain-Driven-Desing, CQRS, Event Sourcing, Clean code, etc.

## Key Features

* **Design**: Event modeling.
* **Arquitecture**: Hexagonal Arquitecture following Domain-Driven-Design concepts.
* **Database management**: CQRS and Event Sourcing patterns.
  * **Read model**: MongoDB.
  * **Write model**: Event Store.

## Install, build and run!

To clone and run this application, you'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/). From your command line:

```bash
# Clone this repository
$ git clone git@github.com:josefrnandezz/melomaniapp.git

# Go into the repository
$ cd melomaniapp

# Install dependencies
$ yarn

# Start docker containers (MongoDB and Event Store)
$ docker-compose up  -d

# Run the server app
$ yarn nx run api:serve

# Build web app for fans 
$ yarn nx fans:serve

# Build web app for artists 
$ yarn nx artists:serve

# Build web app for establishments 
$ yarn nx establishments:serve
```

## Built With

This software uses the following packages:

- [NestJS](https://nestjs.com/)
- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Jest](https://jestjs.io/)

## License

[GNU Affero General Public License v3 (AGPL)](https://www.gnu.org/licenses/agpl-3.0.en.html)

## Contact

> Twitter - [Jose Fernández](https://twitter.com/jfrnandez_)

> LinkedIn - [Jose Fernández](https://www.linkedin.com/in/josefrnandezz/)
