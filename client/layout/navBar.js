function navBarController(){
  this.photoUrl = function () {
    try {
      return Meteor.user().services.facebook.photoUrl;
    } catch (e) {
      return null;
    }
  }
}

angular.module('taskMaster')
  .component('taskmasterNavBar', {
    templateUrl: 'client/layout/navBar.html',
    controller: navBarController
  });
