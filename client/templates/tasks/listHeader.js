function listHeaderController ($scope, $reactive) {
  $reactive(this).attach($scope);
}

angular.module('taskMaster')
  .component('listHeader', {
    templateUrl: 'client/templates/tasks/listHeader.html',
    controller: ['$scope', '$reactive', listHeaderController]
  });
