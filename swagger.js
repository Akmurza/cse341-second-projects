const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    title: 'Second Project API',
    description: 'CSE 341 Week 04 API with CRUD, validation, error handling, and GitHub OAuth authentication'
  },
  host: 'cse341-second-projects.onrender.com',
  basePath: '/',
  schemes: ['https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  securityDefinitions: {
    cookieAuth: {
      type: 'apiKey',
      in: 'cookie',
      name: 'connect.sid',
      description: 'Session cookie returned after successful OAuth login.'
    }
  },
  tags: [
    { name: 'Health', description: 'Health routes' },
    { name: 'Auth', description: 'GitHub OAuth login/logout routes' },
    { name: 'Books', description: 'Books CRUD routes' },
    { name: 'Receipts', description: 'Receipts CRUD routes' }
  ]
};

const options = {
  disableLogs: false
};

const outputFile = './swagger-output.json';
// Include only the main router; it imports the child routers
const endpointsFiles = ['./src/routes/index.js'];

swaggerAutogen(outputFile, endpointsFiles, doc, options);
