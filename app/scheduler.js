import $q from 'q';
import $log from './log';

module.exports = {
    createScheduler: function() {
        var api = {},
            taskId = 0,
            _tail = $q.when(true);

        api.wipe = function() {
          taskId = 0;
          _tail = $q.when(true);
        };

        api.schedule = function(promiseMaker, name) {
          taskId += 1;
          var _taskId = taskId;
          $log.info('Task Scheduled: ' + name + '#' + _taskId);
          _tail.then(function() {
            $log.info('Task Done: ' + name + '#' + _taskId);
          }, function() {
            $log.info('Task Failed: ' + name + '#' + _taskId);
          });
          _tail = _tail.then(promiseMaker, promiseMaker);
          return _tail;
        };

        return api;
      }
};
