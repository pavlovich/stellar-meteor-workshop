function newTaskController (currentMeteorUser, selectedTask) {
  var vm = this;

  vm.session = selectedTask;

  _.extend(vm, {

    loggedIn: function () {
      return currentMeteorUser.get();
    },
    submitTask: function () {
      if (selectedTask.task._id) {
        Meteor.call('updateTask', selectedTask.task, angular.handleTaskErrors);
      } else {
        Meteor.call('addTask', selectedTask.task, angular.handleTaskErrors);
      }

      //Meteor.call('upsertTask', selectedTask.task, angular.handleTaskErrors);

      selectedTask.clear();

    },
    placeholderText: function () {
      return selectedTask.task._id ? "Enter some text for this Task description" : "Type here to add new tasks";
    }

  })
}

angular.module('taskMaster')
  .component('newTask', {
    templateUrl: 'client/templates/tasks/newItem.html',
    controller: ['currentMeteorUser', 'selectedTask', newTaskController]
  });
