import $q from 'q';
import schedulerFactory from './scheduler.js';
const http = require('q-xhr');

module.exports =  function () {
  'use strict';

  var userRequest = () => {
    return http.xhr.get('http://localhost:7878/user');
  };

  var messageRequest = () => {
    return http.xhr.get('http://localhost:7878/message');
  };

  var attachmentRequest = () => {
    return http.xhr.get('http://localhost:7878/attachment');
  };

  var errorRequest = () => {
    return http.xhr.get('http://localhost:7878/error');
  };

  var userPromiseMaker = () => {
    return userRequest().then((res) => {
      console.log(res.data);
    });
  }

  var errorPromiseMaker = () => {
    return userRequest().then((res) => {
      console.log(res.data);
    });
  }

  var messagePromiseMaker = () => {
    return messageRequest().then((res) => {
      console.log(res.data);
    });
  }

  var attachmentPromiseMaker = () => {
    return attachmentRequest().then((res) => {
      console.log(res.data);
    });
  }

  var errorPromiseMaker = () => {
    return errorRequest().then((res) => { console.log('FAIL:', res.data)}, (res) => { console.log('FAIL: ',  res.data)});
  };

  const scheduler = schedulerFactory.createScheduler();

  for(let i = 0; i < 4; i++) {
    scheduler.schedule(() => { return userPromiseMaker() }, 'userPromise');
    scheduler.schedule(() => { return messagePromiseMaker() }, 'messagePromise');
    scheduler.schedule(() => { return attachmentPromiseMaker() }, 'attachmentPromise');
  }



  window.setTimeout(() => {
    scheduler.schedule(() => { return errorPromiseMaker() }, '+++++ late attached error +++++');
    scheduler.schedule(() => {return userPromiseMaker() }, '##### late attached promise ####');
  }, 2000);

  window.setTimeout(() => {
    scheduler.schedule(() => {return userPromiseMaker() }, '##### late attached promise ####');
  }, 5000);

};
