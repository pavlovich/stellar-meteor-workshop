angular.module('taskMaster', ['angular-meteor', 'angular-meteor.auth', 'ui.router', 'accounts.ui'])
  .config(['$urlRouterProvider', '$stateProvider', '$locationProvider', 'currentMeteorUserProvider',
    function($urlRouterProvider, $stateProvider, $locationProvider, currentMeteorUserProvider){

      $locationProvider.html5Mode(true);

      $stateProvider
        .state('home', {
          url: '/',
          templateUrl: 'client/templates/home.html'
        })
        .state('about', {
          url: '/about',
          templateUrl: 'client/templates/about.html'
        })
        .state('tasks', {
          url: '/tasks',
          templateUrl: 'client/templates/tasks/tasks.html'
        });

      $urlRouterProvider.otherwise("/");

      currentMeteorUserProvider.initialize();
    }])
  .service('selectedTask', function(){
    this.task = {};
    this.set = function(task){
      this.task = task || {};
    };
    this.clear = function(){
      this.task = {};
    }
  })
  .provider('currentMeteorUser', function(){
    let _currentUser = null;
    this.initialize = function(){
      Accounts.onLogin(function(){
        _currentUser = Meteor.user();
      });

      var originalLogout = Meteor.logout;
      Meteor.logout = function(callback){
        originalLogout(function(){
          callback();
          _currentUser = null;
        });
      };
    };

    this.$get = function() {
      return {
        get: () => _currentUser
      }
    }
  });

function onReady() {
  angular.bootstrap(document, ['taskMaster']);
}

angular.element(document).ready(onReady);
