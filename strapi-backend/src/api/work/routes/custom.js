'use strict';

module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/works',
      handler: 'work.find',
      config: { policies: [], auth: false },
    },
    {
      method: 'GET',
      path: '/works/:id',
      handler: 'work.findOne',
      config: { policies: [], auth: false },
    },
  ],
};
