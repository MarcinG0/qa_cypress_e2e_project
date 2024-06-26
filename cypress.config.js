const { defineConfig } = require('cypress');
const { faker } = require('@faker-js/faker');
const { clear } = require('./server/db');
const { seed } = require('./server/db');

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:1667/',
    setupNodeEvents(on, config) {
      on('task', {
        generateUser() {
          const randomNumber = Math.floor(Math.random() * 1000);
          const userName = faker.name.firstName().toLowerCase() + `${randomNumber}`;
          return {
            username: userName,
            email: userName + '@mail.com',
            password: '12345Qwert!',
            wrongEmail: 'wrong' + userName + '@mail.com',
            wrongPassword: 'wrongpassword'
          };
        },
        generateArticle() {
          return {
            title: faker.lorem.word(),
            description: faker.lorem.words(),
            body: faker.lorem.words(),
            tag: faker.lorem.word()
          };
        },
        'db:clear'() {
          clear();
          return null;
        },
        'db:seed'() {
          seed();
          return null;
        }
      });
    }
  }
});
