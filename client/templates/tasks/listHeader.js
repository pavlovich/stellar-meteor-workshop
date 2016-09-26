function listHeaderController ($scope, $reactive) {
  $reactive(this).attach($scope);
  this.subscribe('tasks', () => {
    return [!this.getReactively('hideCompleted')];
  });
}

angular.module('taskMaster')
  .component('listHeader', {
    templateUrl: 'client/templates/tasks/listHeader.html',
    controller: ['$scope', '$reactive', listHeaderController]
  });
