## (Me)rcado (li)vre Technical Challenge 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3 and it is for demonstration purposes only.

## See it in action

See a [live](https://p2digital.com.br/) demo of the app.

## How to run through docker | Pre-requisites

Make sure you have `docker` [installed](https://docs.docker.com/desktop/windows/install/).

## Running

Run `docker pull edgarsegundo/meli:1.0@sha256:9b63804bae2bab2bb4fba499ea7dfb4d4affd01b3f4692a4de4f51b6bb57e83a`

Run `docker container run -d -p 4200:3006 edgarsegundo/meli:1.0`

> Note: the application runs off http://localhost:4200/

## Screenshots

![Screenshot](assets/screenshot1.png)

![Screenshot](assets/screenshot2.png)

## Desirable features

- Pagination using infinite scroll

- Error handling using Interceptor

- Responsive screen (mobile-friendly) implemented

- internationalization implemented using i18n in Angular

- Light/dark theme implemented using Material

- Docker implemented

- App published with Nginx in a VPS with Ubuntu

- Automated testing with Cypress for End-to-End Testing and Jasmine and Karma | Mosh for Unit and Intergration testing (future implementation)