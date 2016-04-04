//window.uploadurl = "http://192.168.0.126:81/uploadfile/upload/";
window.uploadurl = "http://vignesh.com:81/uploadfile/upload/";

angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider', 'ui.tinymce', 'ui.sortable', 'ngAnimate', 'toaster', 'imageupload'])

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

        $scope.changeit = function(data) {
            console.log("data");
            console.log(data);
        };
        $scope.toggleAnimation = function() {
            $scope.animationsEnabled = !$scope.animationsEnabled;
        };

    })
    .controller('EnquiryCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $log) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("enquiry");
        $scope.menutitle = NavigationService.makeactive("Enquiry");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })
    .controller('EnquiryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $log) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("enquirydetail");
        $scope.menutitle = NavigationService.makeactive("Enquiry");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
    })

.controller('DashboardCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("dashboard");
    $scope.menutitle = NavigationService.makeactive("Dashboard");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.pieData = [{
        name: "Microsoft Internet Explorer",
        y: 56.33
    }, {
        name: "Chrome",
        y: 24.03,
        sliced: true,
        selected: true
    }, {
        name: "Firefox",
        y: 10.38
    }, {
        name: "Safari",
        y: 4.77
    }, {
        name: "Opera",
        y: 0.91
    }, {
        name: "Proprietary or Undetectable",
        y: 0.2
    }]
    $scope.chartOptions = {
        title: {
            text: 'User data'
        },
        xAxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ]
        },

        series: [{
            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
        }]
    };
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
    $scope.menutitle = NavigationService.makeactive("App Home");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.homeForm = {};
    $scope.homedata = [];
    $scope.userForm = {};

    $scope.allHomeRecord = function() {
        NavigationService.homeViewAll(function(data) {
            if (data.value == true) {
                $scope.userForm.images = data.data;
            }
        });
    };
    $scope.allHomeRecord();

    $scope.homeEditSubmitForm = function() {
        NavigationService.insertData($scope.userForm.images, function(data) {
            console.log(data);
        });
    };
    var modalInstance = '';
    $scope.saveModalData = function(modalData) {
        console.log(modalData);
        NavigationService.saveHomeContent(modalData, function(data) {
            if (data.value) {
                $scope.allHomeRecord();
                modalInstance.dismiss();
            }
        })
    }

    $scope.sortableOptions = {
        update: function(e, ui) {
            NavigationService.sortArray($scope.userForm.images, 'homeSlider', function(data) {

            })
        }
    };

    $scope.changeit = function(data) {
        console.log(data);
        if (data.value) {
            _.each(data.data, function(n) {
                $scope.userForm.images.push({
                    "image": n
                });
            });
        }
    }

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

    $scope.open = function(home) {
        console.log(home);
        $scope.modalData = home;

        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/image-info.html',
            scope: $scope,
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

    $scope.eventForm = {};
    $scope.sortableOptions = {
        update: function(e, ui) {
            NavigationService.sortArray($scope.navigationdata, 'navigation', function(data) {

            })
        }
    };

    $scope.allNavigationRecord = function() {
        NavigationService.navigationViewAll($scope.eventForm, function(data) {
            $scope.navigationdata = data.data;
        });
    };
    $scope.allNavigationRecord();

    $scope.deleteNavigation = function(formValid) {
        console.log('formvalid', formValid);
        NavigationService.deleteNavigationData({
            id: formValid
        }, function(data) {
            console.log('delete data:', data);
            if (data.value === true) {
                $scope.allNavigationRecord();
            }
        });
    };

    $scope.makeDefault = function(nav) {
        console.log(nav);
        NavigationService.setDefault(nav._id, function(data) {

        });
    }

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

.controller('NavigationDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("navigationdetail");
    $scope.menutitle = NavigationService.makeactive("Navigation");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "Create Navigation"
    };

    $scope.navigationSubmitForm = function(formValid) {
        if (formValid.$valid) {
            console.log('in navi');
            NavigationService.navigationCreateSubmit($scope.userForm, function(data) {
                console.log('userform', $scope.userForm);
                $state.go("navigation");
            });
        }
    };

    $scope.animationsEnabled = true;
    // $scope.open = function(size) {
    //
    //     var modalInstance = $uibModal.open({
    //         animation: $scope.animationsEnabled,
    //         templateUrl: 'views/modal/nav-modal.html',
    //         controller: 'NavigationDetailCtrl',
    //         size: size,
    //         resolve: {
    //             items: function() {
    //                 return $scope.items;
    //             }
    //         }
    //     });
    //
    // };
    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
})

.controller('EditNavigationDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("navigationdetail");
    $scope.menutitle = NavigationService.makeactive("Navigation");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "Edit Navigation"
    };

    NavigationService.getNavigationEditDetail($stateParams.id, function(data) {
        $scope.userForm = data.data;
        if ($scope.userForm.status == 1) {
            $scope.userForm.status = true;
        } else {
            $scope.userForm.status = false;
        }
    });

    $scope.navigationSubmitForm = function(formValid) {;
        if (formValid.$valid) {
            NavigationService.editNavigationSubmit($scope.userForm, function(data) {
                $state.go("navigation");
            });
        }
    };

})

.controller('LoginSignupCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("login-signup");
    $scope.menutitle = NavigationService.makeactive("Login & Signup");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.login = {};
    $scope.login.hasLogin = true;
    $scope.login.custom = true;
    $scope.login.google = false;
    $scope.login.facebook = false;
    $scope.login.twitter = false;

    $scope.changeLogin = function() {
        if (!$scope.login.hasLogin) {
            $scope.login.custom = false;
            $scope.login.google = false;
            $scope.login.facebook = false;
            $scope.login.twitter = false;
        }
    };
    $scope.changeLoginForOther = function(val) {
        if (val) {
            $scope.login.hasLogin = true;
        }
    };

})

.controller('NotificationsCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("notifications");
    $scope.menutitle = NavigationService.makeactive("Notifications");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.notificationForm = {};
    var modalInstance = '';

    $scope.notificationdata = [];
    $scope.allNotificationRecord = function() {
        NavigationService.notificationViewAll($scope.notificationForm, function(data) {
            $scope.notificationdata = data.data;
        });
    };
    $scope.allNotificationRecord();

    $scope.deleteNotification = function(formValid) {
        console.log('formvalid', formValid);
        NavigationService.deleteNotificationData({
            id: formValid
        }, function(data) {
            console.log('delete data:', data);
            if (data.value === true) {
                $scope.allNotificationRecord();
            }
        });
    };

    $scope.notificationSubmitForm = function(formValid) {
        if (formValid.$valid) {
            console.log('in navi');
            NavigationService.notificationCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    $scope.allNotificationRecord();
                }
            });
        }
    };

    $scope.notificationEditSubmitForm = function(noti) {
        NavigationService.notificationCreateSubmit(noti, function(data) {
            if (data.value) {
                modalInstance.dismiss();
                $scope.allNotificationRecord();
            }
        });
    };

    $scope.animationsEnabled = true;

    $scope.open = function(noti) {
        $scope.noti = noti;
        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/notificationdetail.html',
            scope: $scope
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
    $scope.eventForm = {};

    $scope.allEventsRecord = function() {
        NavigationService.eventsViewAll($scope.eventForm, function(data) {
            $scope.eventsdata = data.data;
            console.log('$scope.eventsdata.startTime', $scope.eventsdata.startTime);
            $scope.eventsdata.startTime = new Date($scope.eventsdata.startTime);
            console.log('$scope.eventsdata', $scope.eventsdata);
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

.controller('EventDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, toaster, $filter) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("eventdetail");
    $scope.menutitle = NavigationService.makeactive("Events");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    var modalInstance = '';
    $scope.page = {
        header: "Create Event"
    };
    $scope.eventSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.eventCreateSubmit($scope.userForm, function(data) {
                if (data.value)
                    $state.go("events");
            });
        }
    };

    $scope.$watch('userForm.sdate', function() {
        $scope.tryCombineStartDateTime();
    });

    $scope.$watch('userForm.stime', function() {
        $scope.tryCombineStartDateTime();
    });
    $scope.$watch('userForm.edate', function() {
        $scope.tryCombineEndDateTime();
    });

    $scope.$watch('userForm.etime', function() {
        $scope.tryCombineEndDateTime();
    });

    $scope.tryCombineStartDateTime = function() {
        if ($scope.userForm.sdate && $scope.userForm.stime) {
            var newdate = $filter('date')($scope.userForm.sdate, 'yyyy-MM-dd');
            var newtime = $filter('date')($scope.userForm.stime, 'HH:mm');
            console.log(newdate, newtime);
            var dateParts = newdate.toString().split('-');
            var timeParts = newtime.toString().split(':');
            if (dateParts && timeParts) {
                dateParts[1] -= 1;
                $scope.userForm.startTime = new Date(Date.UTC.apply(undefined, dateParts.concat(timeParts))).toISOString();
                console.log('startTime', $scope.userForm.startTime);
            }
        }
    };

    $scope.tryCombineEndDateTime = function() {
        if ($scope.userForm.edate && $scope.userForm.etime) {
            var newdate = $filter('date')($scope.userForm.edate, 'yyyy-MM-dd');
            var newtime = $filter('date')($scope.userForm.etime, 'HH:mm');
            console.log(newdate, newtime);
            var dateParts = newdate.toString().split('-');
            var timeParts = newtime.toString().split(':');
            if (dateParts && timeParts) {
                dateParts[1] -= 1;
                $scope.userForm.endTime = new Date(Date.UTC.apply(undefined, dateParts.concat(timeParts))).toISOString();
                console.log('startTime', $scope.userForm.endTime);
            }
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

    $scope.open10 = function() {
        $scope.popup10.opened = true;
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

    $scope.popup10 = {
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

    $scope.open = function(image) {
        console.log(image);
        $scope.modalData = image;

        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/image-info.html',
            scope: $scope,
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.openVideo = function(singleVideo) {
        $scope.modalData = singleVideo;
        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.VideoEdit = function() {
        $scope.modalData = {};
        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.extractVideoId = function(url) {
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if (videoid != null) {
            $scope.modalData.thumbnail = "http://img.youtube.com/vi/" + videoid[1] + "/mqdefault.jpg";
            console.log("video id = ", videoid[1]);
        } else {
            console.log("The youtube url is not valid.");
        }
    }

    $scope.pushVideo = function(video) {
        console.log(video);
        if (!$scope.userForm.videos) {
            $scope.userForm.videos = [];
        }
        var found = _.findIndex($scope.userForm.videos, {
            'link': video.link
        });
        if (found == -1) {
            $scope.userForm.videos.push(video);
        } else {
            $scope.userForm.videos[found] = video;
        }
        modalInstance.dismiss();
        $scope.modalData = {};
    }

    $scope.changeit = function(data) {
        if (!$scope.userForm.images)
            $scope.userForm.images = [];
        if (data.value) {
            _.each(data.data, function(n) {
                $scope.userForm.images.push({
                    image: n
                });
            })
        }
    };

    $scope.saveModalData = function() {
        console.log($scope.userForm);
        modalInstance.dismiss();
        // NavigationService.eventCreateSubmit($scope.userForm, function(data) {
        //     if (data.value) {
        //         modalInstance.dismiss();
        //     }
        // })
    }

})

.controller('EditEventDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, toaster, $stateParams, $filter) {

    //Used to name the .html file

    $scope.template = TemplateService.changecontent("eventdetail");
    $scope.menutitle = NavigationService.makeactive("Events");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    var modalInstance = '';
    $scope.page = {
        header: "Edit Event"
    };

    NavigationService.getEventsEditDetail($stateParams.id, function(data) {
        $scope.userForm = data.data;
        if ($scope.userForm.startTime || $scope.userForm.endTime) {
            $scope.userForm.sdate = new Date($scope.userForm.startTime);
            $scope.userForm.stime = new Date($scope.userForm.startTime);
            $scope.userForm.edate = new Date($scope.userForm.endTime);
            $scope.userForm.etime = new Date($scope.userForm.endTime);
        }
    });

    $scope.$watch('userForm.sdate', function() {
        $scope.tryCombineStartDateTime();
    });

    $scope.$watch('userForm.stime', function() {
        $scope.tryCombineStartDateTime();
    });
    $scope.$watch('userForm.edate', function() {
        $scope.tryCombineEndDateTime();
    });

    $scope.$watch('userForm.etime', function() {
        $scope.tryCombineEndDateTime();
    });

    $scope.tryCombineStartDateTime = function() {
        if ($scope.userForm.sdate && $scope.userForm.stime) {
            var newdate = $filter('date')($scope.userForm.sdate, 'yyyy-MM-dd');
            var newtime = $filter('date')($scope.userForm.stime, 'HH:mm');
            console.log(newdate, newtime);
            var dateParts = newdate.toString().split('-');
            var timeParts = newtime.toString().split(':');
            if (dateParts && timeParts) {
                dateParts[1] -= 1;
                $scope.userForm.startTime = new Date(Date.UTC.apply(undefined, dateParts.concat(timeParts))).toISOString();
                console.log('startTime', $scope.userForm.startTime);
            }
        }
    };

    $scope.tryCombineEndDateTime = function() {
        if ($scope.userForm.edate && $scope.userForm.etime) {
            var newdate = $filter('date')($scope.userForm.edate, 'yyyy-MM-dd');
            var newtime = $filter('date')($scope.userForm.etime, 'HH:mm');
            console.log(newdate, newtime);
            var dateParts = newdate.toString().split('-');
            var timeParts = newtime.toString().split(':');
            if (dateParts && timeParts) {
                dateParts[1] -= 1;
                $scope.userForm.endTime = new Date(Date.UTC.apply(undefined, dateParts.concat(timeParts))).toISOString();
                console.log('startTime', $scope.userForm.endTime);
            }
        }
    };

    $scope.pop = function() {
        toaster.pop('success', "Successfully Saved", '<p>The data has been Successfully saved</p>', 5000, 'trustedHtml');
    };
    $scope.eventSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.eventCreateSubmit($scope.userForm, function(data) {
                if (data.value)
                    $state.go("events");
            });
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

    $scope.open = function(image) {
        console.log(image);
        $scope.modalData = image;

        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/image-info.html',
            scope: $scope,
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.openVideo = function(singleVideo) {
        $scope.modalData = singleVideo;
        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.VideoEdit = function() {
        $scope.modalData = {};
        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.extractVideoId = function(url) {
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if (videoid != null) {
            $scope.modalData.thumbnail = "http://img.youtube.com/vi/" + videoid[1] + "/mqdefault.jpg";
            console.log("video id = ", videoid[1]);
        } else {
            console.log("The youtube url is not valid.");
        }
    }

    $scope.pushVideo = function(video) {
        console.log(video);
        if (!$scope.userForm.videos) {
            $scope.userForm.videos = [];
        }
        var found = _.findIndex($scope.userForm.videos, {
            'link': video.link
        });
        if (found == -1) {
            $scope.userForm.videos.push(video);
        } else {
            $scope.userForm.videos[found] = video;
        }
        modalInstance.dismiss();
        $scope.modalData = {};
    }

    $scope.changeit = function(data) {
        if (!$scope.userForm.images)
            $scope.userForm.images = [];
        if (data.value) {
            _.each(data.data, function(n) {
                $scope.userForm.images.push({
                    image: n
                });
            })
        }
    };

    $scope.saveModalData = function() {
        console.log($scope.userForm);
        modalInstance.dismiss();
        // NavigationService.eventCreateSubmit($scope.userForm, function(data) {
        //     if (data.value) {
        //         modalInstance.dismiss();
        //     }
        // })
    }

})

.controller('BlogsCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("blogs");
    $scope.menutitle = NavigationService.makeactive("Blogs");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};

    $scope.oneAtATime = true;
    $scope.blogForm = {};
    $scope.allBlogsRecord = function() {
        NavigationService.blogViewAll(function(data) {
            console.log(data);
            $scope.blogdata = data.data;
        });
        $scope.status = {
            isFirstOpen: true,
            isFirstDisabled: false
        };

    };
    $scope.allBlogsRecord();

    $scope.deleteBlog = function(formValid) {
        console.log('formvalid', formValid);
        NavigationService.deleteBlogData({
            id: formValid
        }, function(data) {
            console.log('delete data:', data);
            if (data.value === true) {
                $scope.allBlogsRecord();
            }
        });
    };
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
    $scope.blogSubmitForm = function(formValid) {
        // console.log('form values: ', formData);
        // console.log('form values: ', formValid);
        console.log('form values: ', $scope.userForm);
        if (formValid.$valid) {
            console.log('in navi');
            NavigationService.blogCreateSubmit($scope.userForm, function(data) {
                console.log('userform', $scope.userForm);
                if (data.value) {
                    $state.go("blogs");
                }
            });
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

.controller('EditBlogDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("blogdetail");
    $scope.menutitle = NavigationService.makeactive("Blogs");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "Edit Blog"
    };

    NavigationService.getBlogEditDetail($stateParams.id, function(data) {
        if (data.value) {
            $scope.userForm = data.data;
            if ($scope.userForm.date) {
                $scope.userForm.date = new Date($scope.userForm.date);
            }
        }
    });

    $scope.blogSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.blogCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    $state.go("blogs");
                }
            });
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
    $scope.articleForm = {};
    $scope.allArticlesRecord = function() {
        NavigationService.articleViewAll($scope.articleForm, function(data) {
            $scope.articledata = data.data;
            $scope.articledata.modificationTime = new Date($scope.articledata.modificationTime);
            //console.log('$scope.articledata.modificationTime',$scope.articledata.modificationTime);
            console.log('$scope.articledata', data.data);
        });
    };
    $scope.allArticlesRecord();

    $scope.deleteArticle = function(formValid) {
        NavigationService.deleteArticleData({
            id: formValid
        }, function(data) {
            if (data.value === true) {
                $scope.allArticlesRecord();
            }
        });
    };

})

.controller('ArticleDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("articledetail");
    $scope.menutitle = NavigationService.makeactive("Articles");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    //$scope.userForm.status=1;
    $scope.page = {
        header: "Create Article"
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

    $scope.articleSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.articleCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    $state.go("articles");
                }
            });
        }
    };

})

.controller('EditArticleDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("articledetail");
    $scope.menutitle = NavigationService.makeactive("Articles");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "Edit Article"
    };

    NavigationService.getArticleEditDetail($stateParams.id, function(data) {
        if (data.value) {
            $scope.userForm = data.data;
            if ($scope.userForm.date) {
                $scope.userForm.date = new Date($scope.userForm.date);
            }
        }
    });

    $scope.articleSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.articleCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    $state.go("articles");
                }
            });
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

.controller('PhotoGalleriesCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("photogalleries");
    $scope.menutitle = NavigationService.makeactive("Photo Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.photogalForm = {};
    $scope.photogaldata = [];
    $scope.allPhotogalRecord = function() {
        NavigationService.getAllPhotoGalleries(function(data) {
            $scope.photogaldata = data.data
        });
    };
    $scope.allPhotogalRecord();

    $scope.userForm = {};

    $scope.photogalEditSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.edithomeSubmit($scope.photogalForm, function(data) {
                $scope.allPhotogalRecord();
            });
            //$state.go("notifications");
        }
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

    $scope.open = function(photogal) {
        console.log(photogal);
        $scope.modalData = photogal;

        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/image-info.html',
            scope: $scope,

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

    $scope.sortableOptions = {
        update: function(e, ui) {
            NavigationService.sortArray($scope.photogaldata, 'photogallery', function(data) {

            })
        }
    };

})

.controller('PhotoGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $uibModal, $stateParams, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("photogallerydetail");
    $scope.menutitle = NavigationService.makeactive("Photo Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    var modalInstance = '';

    $scope.userForm = {};

    $scope.photogalSubmitForm = function() {
        NavigationService.photogalSubmitForm($scope.userForm, function(data) {
            if (data.value) {
                $scope.getSingleGallery();
                $state.go('photo-galleries');
            }
        })
    }

    $scope.getSingleGallery = function() {
        NavigationService.getSingleGallery($stateParams.id, function(data) {
            if (data.value) {
                $scope.userForm = data.data;
            }
        })
    }

    if ($stateParams.id) {
        $scope.getSingleGallery();
    }

    $scope.open = function(image) {
        console.log(image);
        $scope.modalData = image;

        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/image-info.html',
            scope: $scope,
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {

        });
    };

    $scope.saveModalData = function() {
        console.log($scope.userForm);
        NavigationService.photogalSubmitForm($scope.userForm, function(data) {
            if (data.value) {
                modalInstance.dismiss();
                $scope.getSingleGallery();
            }
        })
    }

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.changeit = function(data) {
        if (data.value) {
            _.each(data.data, function(n) {
                $scope.userForm.images.push({
                    image: n
                });
            })
        }
    };
})

.controller('VideoGalleriesCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("videogalleries");
    $scope.menutitle = NavigationService.makeactive("Video Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.articleForm = {};
    NavigationService.videoGalleriesViewAll(function(data) {
        $scope.videogalleries = data.data;
    });

    $scope.sortableOptions = {
        update: function(e, ui) {
            NavigationService.sortArray($scope.videogalleries, 'videogallery', function(data) {

            })
        }
    };

    // $scope.lists = [{
    //   "image": "img/t1.jpg"
    // }, {
    //   "image": "img/t2.jpg"
    // }, {
    //   "image": "img/t3.jpg"
    // }, {
    //   "image": "img/t1.jpg"
    // }, {
    //   "image": "img/t2.jpg"
    // }, {
    //   "image": "img/t3.jpg"
    // }, {
    //   "image": "img/t1.jpg"
    // }, {
    //   "image": "img/t2.jpg"
    // }, {
    //   "image": "img/t3.jpg"
    // }];

})

.controller('VideoGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("videogallerydetail");
    $scope.menutitle = NavigationService.makeactive("Video Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.header = {};
    $scope.header.name = 'Create Video Gallary';
    $scope.userForm = {};
    $scope.modalData = {};
    var modalInstances = '';

    $scope.extractVideoId = function(url) {
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if (videoid != null) {
            $scope.modalData.thumbnail = "http://img.youtube.com/vi/" + videoid[1] + "/mqdefault.jpg";
            console.log("video id = ", videoid[1]);
        } else {
            console.log("The youtube url is not valid.");
        }
    }

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

    $scope.VideoEdit = function() {
        modalInstances = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstances.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.open = function(singleVideo) {
        $scope.modalData = singleVideo;
        modalInstances = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstances.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.pushVideo = function(video) {
        console.log(video);
        if (!$scope.userForm.videos) {
            $scope.userForm.videos = [];
        }
        var found = _.findIndex($scope.userForm.videos, {
            'link': video.link
        });
        if (found == -1) {
            $scope.userForm.videos.push(video);
        } else {
            $scope.userForm.videos[found] = video;
        }
        modalInstances.dismiss();
        $scope.modalData = {};
    }

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.videoGallerySubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.videoGalleryCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    $state.go("video-galleries");
                }
            });
        }
    };
})

.controller('EditVideoGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("videogallerydetail");
    $scope.menutitle = NavigationService.makeactive("Video Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.header = {};
    $scope.header.name = 'Edit Video Gallary';
    $scope.userForm = {};
    $scope.modalData = {};
    var modalInstances = '';

    NavigationService.getVideoGalleryEditDetail($stateParams.id, function(data) {
        $scope.userForm = data.data;
    });

    $scope.videoGallerySubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.videoGalleryCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    $state.go("video-galleries");
                }
            });
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

    $scope.VideoEdit = function() {
        modalInstances = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstances.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.open = function(singleVideo) {
        $scope.modalData = singleVideo;
        modalInstances = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstances.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.extractVideoId = function(url) {
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if (videoid != null) {
            $scope.modalData.thumbnail = "http://img.youtube.com/vi/" + videoid[1] + "/mqdefault.jpg";
            console.log("video id = ", videoid[1]);
        } else {
            console.log("The youtube url is not valid.");
        }
    }

    $scope.pushVideo = function(video) {
        console.log(video);
        if (!$scope.userForm.videos) {
            $scope.userForm.videos = [];
        }
        var found = _.findIndex($scope.userForm.videos, {
            'link': video.link
        });
        if (found == -1) {
            $scope.userForm.videos.push(video);
        } else {
            $scope.userForm.videos[found] = video;
        }
        modalInstances.dismiss();
        $scope.modalData = {};
    }

})


.controller('ContactCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("contact");
    $scope.menutitle = NavigationService.makeactive("Contact");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();


    $scope.contactForm = {};
    $scope.allContactRecord = function() {
        NavigationService.contactViewAll($scope.contactForm, function(data) {
            $scope.contactdata = data.data;
            //$scope.articledata.modificationTime = new Date($scope.articledata.modificationTime);
            //console.log('$scope.articledata.modificationTime',$scope.articledata.modificationTime);
            console.log('$scope.contactdata', data.data);
        });
    };
    $scope.allContactRecord();

    $scope.deleteContact = function(formValid) {
        console.log('formvalid', formValid);
        NavigationService.deleteContactData({
            id: formValid
        }, function(data) {
            console.log('delete data:', data);
            if (data.value === true) {

                $scope.allContactRecord();
            }

        });
    };

})

.controller('ContactDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("contactdetail");
    $scope.menutitle = NavigationService.makeactive("Contact");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "Create Contact"
    };
    $scope.contactSubmitForm = function(formValid) {
        // console.log('form values: ', formData);
        // console.log('formvalid values: ', formValid);
        console.log('form values: ', $scope.userForm);
        if (formValid.$valid) {
            console.log('in navi');
            NavigationService.contactCreateSubmit($scope.userForm, function(data) {

                console.log('create contact userform', $scope.userForm);
            });
            $state.go("contact");

        }
    };

})

.controller('EditContactDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("contactdetail");
    $scope.menutitle = NavigationService.makeactive("Contact");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "Edit Contact"
    };

    NavigationService.getContactEditDetail($stateParams.id, function(data) {
        //console.log('getArticleEditDetail', data.data);
        $scope.userForm = data.data;
        console.log('userForm', $scope.userForm);
        console.log($scope.userForm.status);


    });
    $scope.contactSubmitForm = function(formValid) {
        // console.log('form values: ', formData);
        // console.log('form values: ', formValid);
        console.log('form values: ', $scope.userForm);
        if (formValid.$valid) {
            NavigationService.editContactSubmit($scope.userForm, function(data) {
                console.log('my edit contact', $scope.userForm);
                console.log('edit status', $scope.userForm.status);
                // if($scope.userForm.status==0)
                // {
                //   $scope.userForm.status='Disable';
                // }else{
                //   $scope.userForm.status='Enable';
                // }
                $state.go("contact");
            });

            // NavigationService.userSubmit($scope.userForm, function(data) {
            //
            // });
        } else {

        }
    };
    //
    // <script>
    // function initialize() {
    //   var mapProp = {
    //     center:new google.maps.LatLng(51.508742,-0.120850),
    //     zoom:5,
    //     mapTypeId:google.maps.MapTypeId.ROADMAP
    //   };
    //   var map=new google.maps.Map(document.getElementById("googleMap"), mapProp);
    // }
    // google.maps.event.addDomListener(window, 'load', initialize);
    // </script>


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
    $scope.menutitle = NavigationService.makeactive("Audio Gallery");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    $scope.audio = {};

    $scope.updateAudio = function() {
        NavigationService.updateAudio($scope.audio, function(data) {

        })
    }

    NavigationService.getAllAudio(function(data) {
        console.log(data);
        if (data.value) {
            $scope.audio.username = data.data[0].username;
            $scope.withId = data.data[0];
        }
    })

    $scope.resetAudio = function() {
        if ($scope.withId) {
            NavigationService.resetAudio($scope.withId, function(data) {
                if (data.value) {
                    $scope.audio = {};
                }
            })
        }
    }

})

.controller('AudioGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("audiogallerydetail");
    $scope.menutitle = NavigationService.makeactive("Audio Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "CREATE AUDIO GALLERY"
    };
    $scope.userForm = {};
    $scope.audioGallerySubmitForm = function(formValid) {
        // console.log('form values: ', formData);
        // console.log('form values: ', formValid);
        console.log('form values: ', $scope.userForm);
        if (formValid.$valid) {
            console.log('in navi');
            NavigationService.audioGalleryCreateSubmit($scope.userForm, function(data) {
                console.log('userform', $scope.userForm);
                console.log('$scope.userForm.status', $scope.userForm.status);
                if ($scope.userForm.status == "Enable") {
                    $scope.userForm.status = 1;
                } else {
                    $scope.userForm.status = 0;
                }
                console.log('userform of status', $scope.userForm);
            });
            $state.go("audio-galleries");

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



.controller('EditAudioGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("audiogallerydetail");
    $scope.menutitle = NavigationService.makeactive("Audio Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};
    $scope.page = {
        header: "EDIT AUDIO GALLERY"
    };
    $scope.userForm = {};

    NavigationService.getAudioEditDetail($stateParams.id, function(data) {
        //console.log('getArticleEditDetail', data.data);
        $scope.userForm = data.data;
        console.log('userForm', $scope.userForm);
        console.log($scope.userForm.status);
    });


    $scope.audioGallerySubmitForm = function(formValid) {
        // console.log('form values: ', formData);
        // console.log('form values: ', formValid);
        console.log('form values: ', $scope.userForm);
        if (formValid.$valid) {
            NavigationService.editAudioGallerySubmit($scope.userForm, function(data) {
                console.log('my edit AudioGallery', $scope.userForm);
                console.log('edit status', $scope.userForm.status);
                // if($scope.userForm.status==0)
                // {
                //   $scope.userForm.status='Disable';
                // }else{
                //   $scope.userForm.status='Enable';
                // }
                $state.go("audio-galleries");
            });


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

.controller('IntroSliderCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("introslider");
    $scope.menutitle = NavigationService.makeactive("Intro Slider");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = [];
    var modalInstance = '';

    NavigationService.getAllIntro(function(data) {
        console.log(data);
        if (data.value) {
            $scope.userForm = data.data;
        } else {
            $scope.userForm = [];
        }
    })

    $scope.saveModalData = function(modalData) {
        console.log($scope.userForm);
        NavigationService.saveIntroData($scope.userForm, function(data) {
            modalInstance.dismiss();
        })
    }

    $scope.changeit = function(data) {
        if (data.value) {
            _.each(data.data, function(n) {
                $scope.userForm.push({
                    "image": n
                })
            })
        }
    }

    $scope.open = function(image) {
        console.log(image);
        $scope.modalData = image;

        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/image-info.html',
            scope: $scope,
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {

        });
    };

    $scope.sortableOptions = {
        update: function(e, ui) {
            NavigationService.sortArray($scope.userForm, 'introslider', function(data) {

            })
        }
    };

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
    $scope.userForm = {};
    $scope.allUsersRecord = function() {
        NavigationService.userViewAll($scope.userForm, function(data) {
            $scope.useredata = data.data;
            console.log('$scope.userdata', data.data);
        });
    };
    $scope.allUsersRecord();

    $scope.deleteUsers = function(formValid) {
        console.log('formvalid', formValid);
        NavigationService.deleteUserData({
            id: formValid
        }, function(data) {
            console.log('delete data:', data);
            if (data.value === true) {

                $scope.allUsersRecord();
            }

        });
    };


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
        $scope.userSubmitForm = function(formValid) {
            // console.log('form values: ', formData);
            // console.log('form values: ', formValid);
            console.log('form values: ', $scope.userForm);
            if (formValid.$valid) {
                NavigationService.userCreateSubmit($scope.userForm, function(data) {
                    console.log('userform', $scope.userForm);

                });
                $state.go("users");

            }
        };


    })
    .controller('EditUserCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $stateParams) {
        //Used to name the .html file
        $scope.template = TemplateService.changecontent("userdetail");
        $scope.menutitle = NavigationService.makeactive("Users");
        TemplateService.title = $scope.menutitle;
        $scope.navigation = NavigationService.getnav();
        $scope.userForm = {};
        $scope.page = {
            header: "Edit User"
        };

        NavigationService.getUserEditDetail($stateParams.id, function(data) {
            $scope.userForm = data.data;
            console.log('userForm', $scope.userForm);

        });

        $scope.userSubmitForm = function(formValid) {
            // console.log('form values: ', formData);
            // console.log('form values: ', formValid);
            console.log('form values: ', $scope.userForm);
            if (formValid.$valid) {
                NavigationService.editUserSubmit($scope.userForm, function(data) {
                    console.log('my edit users', $scope.userForm);
                    $state.go("users");
                });

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
            name: "Audio Gallery",
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
