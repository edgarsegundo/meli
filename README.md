## (Me)rcado (li)vre Technical Challenge 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3 and it is for demonstration purposes only.

## See it in action

See a [live](https://p2digital.com.br/) demo of the app.

## Running using Docker

Pre-requisites : Make sure you have `docker` [installed](https://docs.docker.com/desktop/windows/install/).

Run `docker pull edgarsegundo/meli:1.0@sha256:bcac0b2ee3e5467f927cb1bfb8811c7901eab604c68469b1afa2f77e95f7b85f`

Run `docker container run -d -p 4200:3006 edgarsegundo/meli:1.0`

> Note: the application runs off http://localhost:4200/

## Angular Internationalization

npm run start:pt-BR -- --port=4201

## Screenshots

![screenshot1](https://user-images.githubusercontent.com/13165550/166167933-6373a1c2-7d2e-46c0-9d73-3e337c80520d.png)

![screenshot2](https://user-images.githubusercontent.com/13165550/166167953-c597a951-ce68-407e-8b73-b62fbef13ae3.png)

## Desirable features

- Pagination using infinite scroll

- Error handling using Interceptor

- Responsive screen (mobile-friendly) implemented

- internationalization implemented using i18n in Angular

- Light/dark theme implemented using Angular Material

- Docker implemented

- App published with Nginx in a VPS with Ubuntu

- Automated testing with Cypress for End-to-End Testing, Jasmine and Karma | Mosh for Unit and Integration testing (pending future implementation)