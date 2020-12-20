<h1  align="center"> Popular Repositories Wrapper </h1>  <br>

  

<p  align="center">

Further Enhancements : 
 - Use Linter such as eslint.
 - Use a better logging tool such winston.
 - API documentation with Swagger (OpenAPI 3.0).

</p>


## Table of Contents

-  [Table of Contents](#table-of-contents)

-  [Introduction](#introduction)

-  [Code Structure](#code-structure)

-  [API Documentation](#api-documentation)

-  [Requirements](#requirements)

-  [Quick Start](#quick-start)


## Introduction

It is a simple wrapper for the github public apis, specifically a public endpoint for searching for repositories. I chose to implement only one endpoint to wrap the github api and control the search criteria via query params.


## Code Structure

The structure is very simple, since the project is just a wrapper over another api, and no databases were involved. So i have chosen to separate logic into services files, write custom errors and use custom error handler, also used joi for request validation.


## API Documentation: 

This part should be replaced with swagger docs (OpenApi 3.0) in the future.

  ## Routes: 

  - Public Route:

	* `GET /api/repos`: Lists all popular repos created today.
      - Params : 
        * searchText: a string to search for in github (this maps exactly to the `q` on the github API.).
        * page: Page number to retrieve (1 by default).
        * per_page: repos per page to be retrieved (30 by default, and max is 100).
        * createdAt: a date in the format `YYYY-MM-DD` to retrieve all repos created after it.


## Requirements


An internet connection of course.

### Local
*  NodeJS v12.16.1
*  typescript v3.8.3
*  Npm v6.13.4


## Quick Start
  - Run `npm install`.
  - then run `npm run start:watch` to run  the servwr and also restart it automatically if any file were updated.
  - Open any http client like postman and hit `GET http://localhost:3000/api/repos`, you should see the most popular repos for taday.
