function taskListController ($scope, $reactive) {
  $reactive(this).attach($scope);
  this.helpers({
    tasks: () => Tasks.find()
  });
}

angular.module('taskMaster')
  .component('taskList', {
      templateUrl: 'client/templates/tasks/list.html',
      controller: ['$scope', '$reactive', taskListController]
  });
