angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider', 'ui.tinymce', 'ui.sortable', 'ngAnimate', 'angularFileUpload', 'toaster'])

.controller('UploadCtrl', function($scope, $upload, $timeout) {

  var uploadres = [];
  //imageupload
  var imagejstupld = "";
  $scope.usingFlash = FileAPI && FileAPI.upload !== null;
  $scope.fileReaderSupported = window.FileReader !== null && (window.FileAPI === null || FileAPI.html5 !== false);
  $scope.uploadRightAway = true;
  $scope.changeAngularVersion = function() {
    window.location.hash = $scope.angularVersion;
    window.location.reload(true);
  };

  $scope.hasUploader = function(index) {
    return $scope.upload[index] !== null;
  };

  $scope.abort = function(index) {
    $scope.upload[index].abort();
    $scope.upload[index] = null;
  };
  $scope.angularVersion = window.location.hash.length > 1 ? (window.location.hash.indexOf('/') === 1 ?
    window.location.hash.substring(2) : window.location.hash.substring(1)) : '1.2.20';
  // $scope.uploader.onSuccess(function () {
  //   console.log('successfully uploaded!')
  // });

  $scope.onFileSelect = function($files) {
    $scope.isloading = true;
    $scope.selectedFiles = [];
    $scope.progress = [];

    console.log($files);

    if ($scope.upload && $scope.upload.length > 0) {
      for (var i = 0; i < $scope.upload.length; i++) {
        if ($scope.upload[i] !== null) {
          $scope.upload[i].abort();
        }
      }
    }

    $scope.upload = [];
    $scope.uploadResult = uploadres;
    $scope.selectedFiles = $files;
    $scope.dataUrls = [];

    for (var i = 0; i < $files.length; i++) {
      var $file = $files[i];

      if ($scope.fileReaderSupported && ($file.type.indexOf('image') || $file.type.indexOf('pdf')) > -1) {
        var fileReader = new FileReader();
        fileReader.readAsDataURL($files[i]);

        var loadFile = function(fileReader, index) {

          fileReader.onload = function(e) {
            $timeout(function() {
              $scope.dataUrls[index] = e.target.result;
            });
          };
        }(fileReader, i);
      }
      $scope.progress[i] = -1;
      if ($scope.uploadRightAway) {
        $scope.start(i);
      }
    }
  };

  $scope.start = function(index) {
    // cfpLoadingBar.start();
    $scope.progress[index] = 0;
    $scope.errorMsg = null;
    $scope.howToSend = 1;
    if ($scope.howToSend == 1) {
      $scope.upload[index] = $upload.upload({
        url: imgpath,
        method: "POST",
        headers: {
          'Content-Type': 'Content-Type'
        },
        data: {
          myModel: $scope.myModel
        },
        file: $scope.selectedFiles[index],
        fileFormDataName: 'image'
      });
      $scope.upload[index].then(function(response) {
        $timeout(function() {
          // cfpLoadingBar.complete();
          $scope.uploadResult.push(response.data);
          console.log(response);
          if (response.data.value !== "") {
            $scope.isloading = false;
            $scope.userForm.picture = response.data.value;
          }
        });
      }, function(response) {
        if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
      }, function(evt) {
        $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
      });
      $scope.upload[index].xhr(function(xhr) {});
    } else {
      var fileReader = new FileReader();
      fileReader.onload = function(e) {
        $scope.upload[index] = $upload.http({
          url: imgpath,
          headers: {
            'Content-Type': $scope.selectedFiles[index].type
          },
          data: e.target.result
        }).then(function(response) {
          $scope.uploadResult.push(response.data);
        }, function(response) {
          if (response.status > 0) $scope.errorMsg = response.status + ': ' + response.data;
        }, function(evt) {
          $scope.progress[index] = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
        });
      };
      fileReader.readAsArrayBuffer($scope.selectedFiles[index]);
    }
  };
})

.controller('AllAppsCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("allapps");
  $scope.menutitle = NavigationService.makeactive("All Apps");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  TemplateService.sidemenu = "";
  $scope.animationsEnabled = true;
  $scope.open = function(size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/new-app.html',
      controller: 'NewappCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

  };

  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

})

.controller('DashboardCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("dashboard");
  $scope.menutitle = NavigationService.makeactive("Dashboard");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})


.controller('ThemeCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("theme");
  $scope.menutitle = NavigationService.makeactive("Theme");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.animationsEnabled = true;
  $scope.open = function(size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/new-app.html',
      controller: 'NewappCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
})

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("home");
  $scope.menutitle = NavigationService.makeactive("Home");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.userForm = {};
  $scope.submitForm = function(formData) {
    console.log('form values: ', formData);
    //console.log('form values: ', $scope.userForm);
    if (formData.content) {
      $scope.formComplete = true;
      $scope.userForm = {};
      // NavigationService.userSubmit($scope.userForm, function(data) {
      //
      // });
    } else {
      $scope.formComplete = false;
    }
  };

  // $scope.showempty=function(formData){
  //   return angular.equals({}, formData);
  // };

  $scope.lists = [{
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }, {
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }, {
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }];

  $scope.open = function(size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/image-info.html',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
})

.controller('NavigationCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("navigation");
    $scope.menutitle = NavigationService.makeactive("Navigation");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.eventForm={};

    $scope.allNavigationRecord=function(){
    NavigationService.navigationViewAll($scope.eventForm,function(data){
      $scope.navigationdata=data.data;
      console.log('$scope.eventsdata',data.data);
    });
    };
    $scope.allNavigationRecord();

    $scope.deleteNavigation = function(formValid) {
      console.log('formvalid', formValid);
      NavigationService.deleteEventsData({
          id: formValid
      }, function(data) {
          console.log('delete data:', data);
          if (data.value === true) {

              $scope.allNavigationRecord();
          }

      });
    };

    // $scope.navigation2 = [{
    //     name: "Home",
    //     icon: "ln-home3",
    //   }, {
    //     name: "Login & Signup",
    //     icon: "ln-unlock",
    //   }, {
    //     name: "Notifications",
    //     icon: "ln-bell",
    //   }, {
    //     name: "Events",
    //     icon: "ln-calendar2",
    //   }, {
    //     name: "Blogs",
    //     icon: "ln-edit2",
    //   }, {
    //     name: "Articles",
    //     icon: "ln-papers",
    //   }, {
    //     name: "Photo Gallery",
    //     icon: "ln-picture",
    //   }, {
    //     name: "Video Galleries",
    //     icon: "ln-film-play",
    //   }, {
    //     name: "Contact",
    //     icon: "ln-contacts",
    //   }, {
    //     name: "Audio Galleries",
    //     icon: "ln-headset",
    //   }
    //   // ,
    //   // {
    //   //   name: "Social Feeds",
    //   //   classis: "active",
    //   //   anchor: "social-feeds",
    //   //   icon: "ln-thumbs-up",
    //   // }
    //   // ,{
    //   //   name: "Forms",
    //   //   classis: "active",
    //   //   anchor: "forms",
    //   //   icon: "ln-register",
    //   // }
    // ];
  })
  .controller('NavigationDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("navigationdetail");
    $scope.menutitle = NavigationService.makeactive("Navigation");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
      header: "Create Navigation"
    };

    $scope.submitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.navigationCreateSubmit($scope.userForm, function(data) {
                console.log('userform', $scope.userForm);
                $state.go("navigation");
            });

        }
    };

    // $scope.submitForm = function(formData, formValid) {
    //   console.log('form values: ', formData);
    //   //console.log('form values: ', formValid);
    //   //console.log('form values: ', $scope.userForm);
    //   if (formValid.$valid) {
    //     $scope.formComplete = true;
    //     $state.go("navigation");
    //     // NavigationService.userSubmit($scope.userForm, function(data) {
    //     //
    //     // });
    //   } else {
    //
    //   }
    // };


  })
  .controller('EditNavigationDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("navigationdetail");
    $scope.menutitle = NavigationService.makeactive("Navigation");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
      header: "Edit Navigation"
    };
    $scope.submitForm = function(formData, formValid) {
      console.log('form values: ', formData);
      //console.log('form values: ', formValid);
      //console.log('form values: ', $scope.userForm);
      if (formValid.$valid) {
        $scope.formComplete = true;
        $state.go("navigation");
        // NavigationService.userSubmit($scope.userForm, function(data) {
        //
        // });
      } else {

      }
    };


  })

.controller('LoginSignupCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("login-signup");
  $scope.menutitle = NavigationService.makeactive("Login & Signup");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('NotificationsCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("notifications");
  $scope.menutitle = NavigationService.makeactive("Notifications");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.userForm = {};
  $scope.submitForm = function(formData, formValid) {
    console.log('form values: ', formData);
    console.log('form values: ', formValid);
    console.log('form values: ', $scope.userForm);
    if (formValid.$valid) {
      $scope.formComplete = true;
      // NavigationService.userSubmit($scope.userForm, function(data) {
      //
      // });
    } else {

    }
  };

  $scope.animationsEnabled = true;

  $scope.open = function(size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/notificationdetail.html',
      controller: 'NotificationsCtrl',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });
  };

  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };

  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };

})

.controller('EventsCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, toaster) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("events");
  $scope.menutitle = NavigationService.makeactive("Events");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.eventForm={};

$scope.allEventsRecord=function(){
  NavigationService.eventsViewAll($scope.eventForm,function(data){
    $scope.eventsdata=data.data;
    console.log('$scope.eventsdata',data.data);
});
};
$scope.allEventsRecord();


$scope.deleteEvent = function(formValid) {
    console.log('formvalid', formValid);
    NavigationService.deleteEventsData({
        id: formValid
    }, function(data) {
        console.log('delete data:', data);
        if (data.value === true) {

            $scope.allEventsRecord();
        }

    });
    };

})

.controller('EventDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, toaster) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("eventdetail");
  $scope.menutitle = NavigationService.makeactive("Events");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.userForm = {};
  $scope.page = {
    header: "Create Event"
  };
  $scope.submitForm = function(formData, formValid) {
    //console.log('form values: ', formData);
    //console.log('form values: ', formValid);
    console.log('form values: ', $scope.userForm);
    if (formValid.$valid) {
      $scope.formComplete = true;
      $state.go("events");
      // NavigationService.userSubmit($scope.userForm, function(data) {
      //
      // });
    } else {

    }

  };
  $scope.cancel = function(formData) {
    $scope.formData = {};
    console.log("cancel values:", $scope.formData);
  };

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };

  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };

  $scope.lists = [{
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }, {
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }, {
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }];


  $scope.OpenVideo = function(size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/Video-upload.html',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.ImageEdit = function(size) {

    var modalInstances = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/image-info.html',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstances.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
})

.controller('EditEventDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, toaster) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("eventdetail");
    $scope.menutitle = NavigationService.makeactive("Events");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
      header: "Edit Event"
    };
    $scope.pop = function() {
      toaster.pop('success', "Successfully Saved", '<p>The data has been Successfully saved</p>', 5000, 'trustedHtml');
    };
    $scope.submitForm = function(formData, formValid) {
      //console.log('form values: ', formData);
      //console.log('form values: ', formValid);
      console.log('form values: ', $scope.userForm);
      if (formValid.$valid) {
        $scope.formComplete = true;
        $state.go("events");
        // NavigationService.userSubmit($scope.userForm, function(data) {
        //
        // });
      } else {

      }
    };
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
      opened: false
    };

    $scope.getDayClass = function(date, mode) {
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    };

    $scope.lists = [{
      "image": "img/t1.jpg"
    }, {
      "image": "img/t2.jpg"
    }, {
      "image": "img/t3.jpg"
    }, {
      "image": "img/t1.jpg"
    }, {
      "image": "img/t2.jpg"
    }, {
      "image": "img/t3.jpg"
    }, {
      "image": "img/t1.jpg"
    }, {
      "image": "img/t2.jpg"
    }, {
      "image": "img/t3.jpg"
    }];


    $scope.OpenVideo = function(size) {

      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/modal/Video-upload.html',
        size: size,
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });

      modalInstance.result.then(function(selectedItem) {
        $scope.selected = selectedItem;
      }, function() {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    $scope.ImageEdit = function(size) {

      var modalInstances = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/modal/image-info.html',
        size: size,
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });

      modalInstances.result.then(function(selectedItem) {
        $scope.selected = selectedItem;
      }, function() {
        $log.info('Modal dismissed at: ' + new Date());
      });
    };
    $scope.toggleAnimation = function() {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };







  })
  .controller('BlogsCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("blogs");
    $scope.menutitle = NavigationService.makeactive("Blogs");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();


  })

.controller('BlogDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $uibModal, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("blogdetail");
    $scope.menutitle = NavigationService.makeactive("Blogs");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
      header: "Create Blog"
    };
    $scope.submitForm = function(formData, formValid) {
      // console.log('form values: ', formData);
      // console.log('form values: ', formValid);
      console.log('form values: ', $scope.userForm);
      if (formValid.$valid) {
        $scope.formComplete = true;
        $state.go("blogs");
        // NavigationService.userSubmit($scope.userForm, function(data) {
        //
        // });
      } else {

      }
    };
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
      opened: false
    };

    $scope.getDayClass = function(date, mode) {
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    };


  })
  .controller('EditBlogDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("blogdetail");
    $scope.menutitle = NavigationService.makeactive("Blogs");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
      header: "Edit Blog"
    };
    $scope.submitForm = function(formData, formValid) {
      //console.log('form values: ', formData);
      // console.log('form values: ', formValid);
      console.log('form values: ', $scope.userForm);
      if (formValid.$valid) {
        $scope.formComplete = true;
        $state.go("blogs");
        // NavigationService.userSubmit($scope.userForm, function(data) {
        //
        // });
      } else {

      }
    };
    $scope.today = function() {
      $scope.dt = new Date();
    };
    $scope.today();

    $scope.toggleMin = function() {
      $scope.minDate = $scope.minDate ? null : new Date();
    };

    $scope.toggleMin();
    $scope.maxDate = new Date(2020, 5, 22);

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.setDate = function(year, month, day) {
      $scope.dt = new Date(year, month, day);
    };

    $scope.dateOptions = {
      formatYear: 'yy',
      startingDay: 1
    };

    $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
    $scope.format = $scope.formats[0];
    $scope.altInputFormats = ['M!/d!/yyyy'];

    $scope.popup1 = {
      opened: false
    };

    $scope.getDayClass = function(date, mode) {
      if (mode === 'day') {
        var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

        for (var i = 0; i < $scope.events.length; i++) {
          var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

          if (dayToCheck === currentDay) {
            return $scope.events[i].status;
          }
        }
      }

      return '';
    };



  })

.controller('ArticlesCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("articles");
  $scope.menutitle = NavigationService.makeactive("Articles");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('ArticleDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("articledetail");
  $scope.menutitle = NavigationService.makeactive("Articles");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.userForm = {};
  $scope.page = {
    header: "Create Article"
  };
  $scope.submitForm = function(formData, formValid) {
    //console.log('form values: ', formData);
    //console.log('form values: ', formValid);
    console.log('form values: ', $scope.userForm);
    if (formValid.$valid) {
      $scope.formComplete = true;
      $state.go("articles");
      // NavigationService.userSubmit($scope.userForm, function(data) {
      //
      // });
    } else {

    }
  };
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };

  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };

})

.controller('EditArticleDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("articledetail");
  $scope.menutitle = NavigationService.makeactive("Articles");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.userForm = {};
  $scope.page = {
    header: "Edit Article"
  };
  $scope.submitForm = function(formData, formValid) {
    // console.log('form values: ', formData);
    // console.log('form values: ', formValid);
    console.log('form values: ', $scope.userForm);
    if (formValid.$valid) {
      $scope.formComplete = true;
      $state.go("articles");
      // NavigationService.userSubmit($scope.userForm, function(data) {
      //
      // });
    } else {

    }
  };
  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };

  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };

})

.controller('PhotoGalleriesCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("photogalleries");
  $scope.menutitle = NavigationService.makeactive("Photo Galleries");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.lists = [{
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }, {
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }, {
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }];

  $scope.open = function(size) {

    var modalInstance = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/image-info.html',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

})

.controller('PhotoGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("photogallerydetail");
  $scope.menutitle = NavigationService.makeactive("Photo Galleries");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('VideoGalleriesCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("videogalleries");
  $scope.menutitle = NavigationService.makeactive("Video Galleries");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();

  $scope.lists = [{
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }, {
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }, {
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }];

})


.controller('VideoGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("videogallerydetail");
  $scope.menutitle = NavigationService.makeactive("Video Galleries");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.userForm = {};
  $scope.submitForm = function(formData, formValid) {
    // console.log('form values: ', formData);
    // console.log('form values: ', formValid);
    console.log('form values: ', $scope.userForm);
    if (formValid.$valid) {
      $scope.formComplete = true;
      $state.go("video-galleries");
      // NavigationService.userSubmit($scope.userForm, function(data) {
      //
      // });
    } else {

    }
  };


  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };

  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };

  $scope.VideoEdit = function(size) {

    var modalInstances = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/video-edit.html',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstances.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
  $scope.lists = [{
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }, {
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }, {
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }];
})

.controller('ContactCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("contact");
  $scope.menutitle = NavigationService.makeactive("Contact");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('ContactDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("contactdetail");
  $scope.menutitle = NavigationService.makeactive("Contact");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.userForm = {};
  $scope.page = {
    header: "Create User"
  };
  $scope.submitForm = function(formData, formValid) {
    // console.log('form values: ', formData);
    // console.log('formvalid values: ', formValid);
    console.log('form values: ', $scope.userForm);
    if (formValid.$valid) {
      $scope.formComplete = true;
      $state.go("contact");
      // NavigationService.userSubmit($scope.userForm, function(data) {
      //
      // });
    } else {

    }
  };
})

.controller('EditContactDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("contactdetail");
  $scope.menutitle = NavigationService.makeactive("Contact");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.userForm = {};
  $scope.page = {
    header: "Edit User"
  };
  $scope.submitForm = function(formData, formValid) {
    // console.log('form values: ', formData);
    // console.log('form values: ', formValid);
    console.log('form values: ', $scope.userForm);
    if (formValid.$valid) {
      $scope.formComplete = true;
      $state.go("contact");
      // NavigationService.userSubmit($scope.userForm, function(data) {
      //
      // });
    } else {

    }
  };
})

.controller('SearchCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("search");
  $scope.menutitle = NavigationService.makeactive("Search");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('AudioGalleriesCtrl', function($scope, TemplateService, NavigationService, $timeout) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("audiogalleries");
  $scope.menutitle = NavigationService.makeactive("Audio Galleries");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();



})

.controller('AudioGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("audiogallerydetail");
  $scope.menutitle = NavigationService.makeactive("Audio Galleries");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.userForm = {};
  $scope.submitForm = function(formData, formValid) {
    // console.log('form values: ', formData);
    // console.log('form values: ', formValid);
    console.log('form values: ', $scope.userForm);
    if (formValid.$valid) {
      $scope.formComplete = true;
      $state.go("audio-galleries");
      // NavigationService.userSubmit($scope.userForm, function(data) {
      //
      // });
    } else {

    }
  };

  $scope.today = function() {
    $scope.dt = new Date();
  };
  $scope.today();

  $scope.toggleMin = function() {
    $scope.minDate = $scope.minDate ? null : new Date();
  };

  $scope.toggleMin();
  $scope.maxDate = new Date(2020, 5, 22);

  $scope.open1 = function() {
    $scope.popup1.opened = true;
  };

  $scope.setDate = function(year, month, day) {
    $scope.dt = new Date(year, month, day);
  };

  $scope.dateOptions = {
    formatYear: 'yy',
    startingDay: 1
  };

  $scope.formats = ['dd-MMMM-yyyy', 'yyyy/MM/dd', 'dd.MM.yyyy', 'shortDate'];
  $scope.format = $scope.formats[0];
  $scope.altInputFormats = ['M!/d!/yyyy'];

  $scope.popup1 = {
    opened: false
  };

  $scope.getDayClass = function(date, mode) {
    if (mode === 'day') {
      var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

      for (var i = 0; i < $scope.events.length; i++) {
        var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

        if (dayToCheck === currentDay) {
          return $scope.events[i].status;
        }
      }
    }

    return '';
  };

  $scope.AudioEdit = function(size) {

    var modalInstances = $uibModal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'views/modal/audio-upload.html',
      size: size,
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstances.result.then(function(selectedItem) {
      $scope.selected = selectedItem;
    }, function() {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };
  $scope.toggleAnimation = function() {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };
})

.controller('IntroSliderCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("introslider");
  $scope.menutitle = NavigationService.makeactive("Intro Slider");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
  $scope.lists = [{
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }, {
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }, {
    "image": "img/t1.jpg"
  }, {
    "image": "img/t2.jpg"
  }, {
    "image": "img/t3.jpg"
  }];

})

.controller('SocialFeedsCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("socialfeeds");
  $scope.menutitle = NavigationService.makeactive("Social Feeds");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})


.controller('FormsCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("forms");
  $scope.menutitle = NavigationService.makeactive("Forms");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('FormDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("formdetail");
  $scope.menutitle = NavigationService.makeactive("Forms");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('UsersCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
  //Used to name the .html file
  $scope.template = TemplateService.changecontent("users");
  $scope.menutitle = NavigationService.makeactive("Users");
  TemplateService.title = $scope.menutitle;
  $scope.navigation = NavigationService.getnav();
})

.controller('UserDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("userdetail");
    $scope.menutitle = NavigationService.makeactive("Users");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
      header: "Create User"
    };
    $scope.submitForm = function(formData, formValid) {
      // console.log('form values: ', formData);
      // console.log('form values: ', formValid);
      console.log('form values: ', $scope.userForm);
      if (formData && formValid.$valid) {
        $scope.formComplete = true;
        $state.go("users");
        // NavigationService.userSubmit($scope.userForm, function(data) {
        //
        // });
      } else {

      }
    };


  })
  .controller('EditUserCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("userdetail");
    $scope.menutitle = NavigationService.makeactive("Users");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
      header: "Edit User"
    };
    $scope.submitForm = function(formData, formValid) {
      // console.log('form values: ', formData);
      // console.log('form values: ', formValid);
      console.log('form values: ', $scope.userForm);
      if (formValid.$valid) {
        $scope.formComplete = true;
        $state.go("users");
        // NavigationService.userSubmit($scope.userForm, function(data) {
        //
        // });
      } else {

      }
    };


  })
  .controller('BillingCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("billing");
    $scope.menutitle = NavigationService.makeactive("Billing");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })
  .controller('AccountCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("account");
    $scope.menutitle = NavigationService.makeactive("Account");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
  })
  .controller('PublishingCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("publishing");
    $scope.menutitle = NavigationService.makeactive("Publishing");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.animationsEnabled = true;
    $scope.lists = [{
      "image": "img/t1.jpg"
    }, {
      "image": "img/t2.jpg"
    }];
    $scope.openscreenshot = function(size) {
      var modalInstance = $uibModal.open({
        animation: $scope.animationsEnabled,
        templateUrl: 'views/modal/screenshots.html',
        controller: 'PublishingCtrl',
        size: size,
        resolve: {
          items: function() {
            return $scope.items;
          }
        }
      });

    };

    $scope.toggleAnimation = function() {
      $scope.animationsEnabled = !$scope.animationsEnabled;
    };
  })
  .controller('ConfigurationCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("configuration");
    $scope.menutitle = NavigationService.makeactive("Configuration");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.submitForm = function(formData, formValid) {
      console.log('form values: ', formData);
      console.log('form values: ', formValid);
      console.log('form values: ', $scope.userForm);
      if (formValid.$valid) {
        $scope.formComplete = true;
        // NavigationService.userSubmit($scope.userForm, function(data) {
        //
        // });
      } else {

      }
    };

    $scope.oneAtATime = true;
    var navigation = [{
      name: "Theme",
    }, {
      name: "Home",
    }, {
      name: "Notifications",
    }, {
      name: "Events",
    }, {
      name: "Blogs",
    }, {
      name: "Articles",
    }, {
      name: "Photo Galleries",
    }, {
      name: "Video Galleries",
    }, {
      name: "Contact",
    }, {
      name: "Audio Galleries",
    }, {
      name: "Users",
    }];
  })

.controller('headerctrl', function($scope, TemplateService) {
  $scope.template = TemplateService;
  $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
    $(window).scrollTop(0);
  });
  $scope.preview = "views/app-preview.html";
  $scope.searchBar = false;
  $scope.showBar = function() {
    $scope.searchBar = !$scope.searchBar;
  };
});
