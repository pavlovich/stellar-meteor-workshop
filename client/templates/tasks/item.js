function taskMasterController(currentMeteorUser, selectedTask){
  var vm = this;

  function isSelected() {
    var selected = selectedTask.task;
    return selected ? selected._id == vm.task._id : false;
  }

  function isOwner() {
    let theUser = currentMeteorUser.get();
    return theUser && (vm.task.owner == theUser._id);
  }

  _.extend(vm, {
    isSelected: function () {
      return isSelected();
    },
    isOwner: function() {
      return Meteor.userId() && (vm.task.owner == Meteor.userId());
    },
    canDelete: function () {
      return isOwner();
    },
    canUpdate: function () {
      return isOwner();
    },
    canComplete: function () {
      return !vm.task.private || isOwner();
    },
    toggleChecked: function ($event) {
      $event.stopPropagation();
      Meteor.call("setChecked", vm.task._id, vm.task.checked);
      selectedTask.clear();
    },
    togglePrivate: function ($event) {
      $event.stopPropagation();
      Meteor.call("setPrivate", vm.task._id, !vm.task.private);
      selectedTask.clear();
    },
    deleteTask: function () {
      var toDelete = vm.task;
      vm.task = {};
      if (isSelected(toDelete)) {
        selectedTask.clear();
      }
      //Tasks.remove(toDelete._id, Template.handleTaskErrors);
      Meteor.call('deleteTask', toDelete, angular.handleTaskErrors);
    },
    selectTask: function () {
      var taskIsSelected = vm.canUpdate() && !vm.isSelected();
      if(taskIsSelected){
        selectedTask.set(angular.copy(vm.task));
      }else{
        selectedTask.clear();
      }
      //Session.set('selectedTask', !taskIsSelected ? null : vm.task);
      if (taskIsSelected) {
        $('.new-task>input').focus();
      }
    }
  });
}

angular.module('taskMaster')
  .component('taskItem', {
      bindings: {task: '='},
      templateUrl: 'client/templates/tasks/item.html',
      controller: ['currentMeteorUser', 'selectedTask', taskMasterController]
    });
