# Adonis Smart API

This is the boilerplate for creating an API server in AdonisJs, it comes pre-configured with.

1. Bodyparser
2. Authentication
3. CORS
4. Lucid ORM
5. Migrations and seeds

## Setup

1. Clone this repo 
2. Run `npm install`
3. Create database
4. Setting connection db in `.env`
5. Run `adonis key:generate`
6. Run `adonis migration:refresh && adonis seed:sync`
7. Run `adonis serve --dev`
8. Enjoy

## Swagger

http://localhost:4000/docs

## Testing

`npx nyc adonis test`



File                | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------------|---------|----------|---------|---------|-------------------
All files           |   98.53 |     87.5 |   93.75 |   98.53 |                   
 Controllers/Http   |     100 |       90 |     100 |     100 |                   
  AuthController.js |     100 |      100 |     100 |     100 |                   
  PostController.js |     100 |       75 |     100 |     100 | 48                
  UserController.js |     100 |      100 |     100 |     100 |                   
 Models             |   94.44 |    83.33 |   88.89 |   94.44 |                   
  Post.js           |     100 |       75 |     100 |     100 | 13                
  Token.js          |     100 |      100 |     100 |     100 |                   
  User.js           |      90 |      100 |      80 |      90 | 43                






