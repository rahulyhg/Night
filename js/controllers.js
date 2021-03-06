//window.uploadurl = "http://192.168.0.126:81/uploadfile/upload/";
var adminurl = "http://localhost:1337/";
window.uploadurl = adminurl + "uploadfile/upload/";
var globalfunction = {};
angular.module('phonecatControllers', ['templateservicemod', 'navigationservice', 'ui.bootstrap', 'ngSanitize', 'angular-flexslider', 'ui.tinymce', 'ui.sortable', 'ngAnimate', 'toaster', 'imageupload', 'httpService', 'toastr', 'angular-loading-bar', 'ngMap', 'ui.select'])

.controller('AllAppsCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $log, httpService) {
    //Used to name the .html file
    // httpService.get("./bower.json", {}, function(data) {
    //   console.log(data);
    // });
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

    globalfunction.getProfile();

    $scope.allEnquiry = function() {
        NavigationService.getAllEnquiry(function(data) {
            if (data.value) {
                $scope.enquirydata = data.data;
            }
        });
    };
    $scope.allEnquiry();

    $scope.deleteEnquiry = function(formValid) {
        globalfunction.confDel(function(val) {
            if (val) {
                NavigationService.deleteEnquiry({
                    id: formValid
                }, function(data) {
                    if (data.value) {
                        globalfunction.delSuccessToaster();
                        $scope.allEnquiry();
                    }
                });
            }
        });
    };

})

.controller('EnquiryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("enquirydetail");
    $scope.menutitle = NavigationService.makeactive("Enquiry");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};

    globalfunction.getProfile();

    $scope.enquirySubmitForm = function() {
        console.log($scope.userForm);
        NavigationService.submitEnquiry($scope.userForm, function(data) {
            if (data.value) {
                $state.go('enquiry');
            }
        });
    };

})

.controller('EditEnquiryCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("enquirydetail");
    $scope.menutitle = NavigationService.makeactive("Enquiry");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.userForm = {};

    globalfunction.getProfile();

    NavigationService.getOneEnquiry($stateParams.id, function(data) {
        console.log(data);
        if (data.value)
            $scope.userForm = data.data;
    });

    $scope.enquirySubmitForm = function() {
        console.log($scope.userForm);
        NavigationService.submitEnquiry($scope.userForm, function(data) {
            if (data.value) {
                $state.go('enquiry');
            }
        });
    };

})

.controller('DashboardCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("dashboard");
    $scope.menutitle = NavigationService.makeactive("Dashboard");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.normal = 0;
    $scope.ios = 0;
    $scope.android = 0;
    $scope.totaluser = 0

    globalfunction.getProfile();

    if ($stateParams.key) {
        console.log("call authenticate");
    }

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
    }];
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

    NavigationService.getAllEnquiry(function(data) {
        if (data.value) {
            $scope.enquirydata = data.data;
        }
    });
    $scope.totaluser = 0;
    NavigationService.getCount(function(data) {
        if (data.value === true) {
            _.each(data.data, function(n) {
                switch (n._id) {
                    case "Normal":
                        $scope.normal = n.count;
                        break;
                    case "iOS":
                        $scope.ios = n.count;
                        break;
                    case "Android":
                        $scope.android = n.count;
                        break;
                    default:
                }
                $scope.totaluser = $scope.totaluser + parseInt(n.count);
            });
        }
    });

})

.controller('KeyCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $stateParams, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("dashboard");
    $scope.menutitle = NavigationService.makeactive("Dashboard");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.normal = 0;
    $scope.ios = 0;
    $scope.android = 0;
    $scope.totaluser = 0;
    console.log($stateParams.key);

    NavigationService.checkUser($stateParams.key, function(data) {
        console.log(data);
        if (data.value == false) {
            globalfunction.messageModal("Sorry! Your session key is invalid. Please login again.");
            $timeout(function() {
                window.location.href = "https://blazen.io/login";
            }, 5000);
        } else if (data.value == true) {
            $state.go('dashboard');
        }
    })

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
    }];
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

    NavigationService.getAllEnquiry(function(data) {
        if (data.value) {
            $scope.enquirydata = data.data;
        }
    });
    $scope.totaluser = 0;
    NavigationService.getCount(function(data) {
        if (data.value === true) {
            _.each(data.data, function(n) {
                switch (n._id) {
                    case "Normal":
                        $scope.normal = n.count;
                        break;
                    case "iOS":
                        $scope.ios = n.count;
                        break;
                    case "Android":
                        $scope.android = n.count;
                        break;
                    default:
                }
                $scope.totaluser = $scope.totaluser + parseInt(n.count);
            });
        }
    });

})

.controller('ThemeCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("theme");
    $scope.menutitle = NavigationService.makeactive("Theme");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    globalfunction.getProfile();

    $scope.animationsEnabled = true;
    $scope.open = function(size) {
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/new-app.html',
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

.controller('HomeCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $uibModal, httpService, toastr) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("home");
    $scope.menutitle = NavigationService.makeactive("App Home");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    $scope.noListType = '0';

    globalfunction.getProfile();

    $scope.homeForm = {};
    $scope.homedata = [];
    $scope.userForm = {};

    $scope.allHomeRecord = function() {
        NavigationService.homeViewAll(function(data) {
            if (data.value === true) {
                $scope.userForm.images = data.data;
            }
        });
        // httpService.post(adminurl + 'homeslider/getAll', {}, function(data, status) {
        //     if (data.value == true) {
        //         $scope.userForm.images = data.data;
        //     }
        // }, function(err, status) {})
    };
    $scope.allHomeRecord();

    $scope.homeEditSubmitForm = function() {
        _.each($scope.userForm.images, function(n) {
            if (!n.status && n.status !== false) {
                n.status = true;
            }
        });
        NavigationService.insertData($scope.userForm.images, function(data) {
            if (data.value) {
                globalfunction.successToaster();
                $scope.allHomeRecord();
            } else {
                globalfunction.errorToaster();
            }
        });
        NavigationService.saveConfigData($scope.configData, function(data) {
            if (data.value) {

            } else {
                globalfunction.errorToaster();
            }
        });
    };
    var modalInstance = '';
    $scope.saveModalData = function(modalData) {
        console.log(modalData);
        NavigationService.saveHomeContent(modalData, function(data) {
            if (data.value) {
                globalfunction.successToaster();
                modalInstance.dismiss();
            } else {
                globalfunction.errorToaster();
            }
        });
    };

    $scope.sortableOptions = {
        update: function(e, ui) {
            NavigationService.sortArray($scope.userForm.images, 'homeSlider', function(data) {

            });
        }
    };

    $scope.changeit = function(data) {
        console.log(data);
        if (data.value) {
            _.each(data.data, function(n) {
                $scope.userForm.images.push({
                    "image": n,
                    "status": true
                });
            });
        }
    };
    $scope.open = function(home) {

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

    NavigationService.getConfig(function(data) {
        console.log(data);
        if (data.value) {
            if (data.data && data.data.length > 0) {
                $scope.configData = data.data[0];
            } else {
                $scope.configData = {};
            }
        } else {
            $scope.configData = {};
        }
    });

    $scope.deleteHomeSlide = function(index, item) {
        globalfunction.confDel(function(val) {
            if (val) {
                if (item._id) {
                    NavigationService.deleteHomeSlider({
                        "_id": item._id
                    }, function(data) {
                        if (data.value) {
                            globalfunction.delSuccessToaster();
                            $scope.allHomeRecord();
                        }
                    });
                } else {
                    $scope.userForm.images.splice(index, 1);
                }
            }
        });
    };

})

.controller('NavigationCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("navigation");
    $scope.menutitle = NavigationService.makeactive("Navigation");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    globalfunction.getProfile();

    $scope.eventForm = {};
    $scope.sortableOptions = {
        update: function(e, ui) {
            NavigationService.sortArray($scope.navigationdata, 'navigation', function(data) {
                globalfunction.successToaster();
            });
        }
    };

    $scope.allNavigationRecord = function() {
        NavigationService.navigationViewAll($scope.eventForm, function(data) {
            $scope.navigationdata = data.data;
        });
    };
    $scope.allNavigationRecord();

    $scope.deleteNavigation = function(formValid) {
        globalfunction.confDel(function(val) {
            if (val) {
                NavigationService.deleteNavigationData({
                    id: formValid
                }, function(data) {
                    if (data.value) {
                        globalfunction.delSuccessToaster();
                        $scope.allNavigationRecord();
                    }
                });
            }
        });
    };

    $scope.makeDefault = function(nav) {
        console.log(nav);
        NavigationService.setDefault(nav._id, function(data) {
            globalfunction.successToaster();
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

.controller('NavigationDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("navigationdetail");
    $scope.menutitle = NavigationService.makeactive("Navigation");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    globalfunction.getProfile();

    $scope.userForm = {};
    $scope.userForm.status = true;
    $scope.page = {
        header: "Create Navigation"
    };

    $scope.icons = ["ln-home", "ln-home2", "ln-home3", "ln-home4", "ln-home5", "ln-home6", "ln-pencil", "ln-pencil2", "ln-edit", "ln-edit2", "ln-feather", "ln-feather2", "ln-pen", "ln-brush", "ln-paintbrush", "ln-paint-roller", "ln-eye-dropper", "ln-magic", "ln-design", "ln-magnet", "ln-aim", "ln-gun", "ln-droplet", "ln-droplet2", "ln-fire", "ln-lighter", "ln-knife", "ln-toilet-paper", "ln-umbrella", "ln-sun-small", "ln-sun", "ln-moon", "ln-cloud", "ln-cloud-upload", "ln-cloud-download", "ln-cloud-rain", "ln-cloud-snow", "ln-cloud-fog", "ln-cloud-lightning", "ln-cloud-sync", "ln-cloud-lock", "ln-cloud-gear", "ln-cloud-database", "ln-database", "ln-shield", "ln-lock", "ln-unlock", "ln-key", "ln-key-hole", "ln-gear", "ln-gear2", "ln-wrench", "ln-tools", "ln-hammer", "ln-factory", "ln-factory2", "ln-recycle", "ln-trash", "ln-trash2", "ln-heart", "ln-heart2", "ln-flag", "ln-flag2", "ln-flag3", "ln-at-sign", "ln-envelope", "ln-inbox", "ln-paperclip", "ln-reply", "ln-reply-all", "ln-paper-plane", "ln-eye", "ln-eye2", "ln-binoculars", "ln-binoculars2", "ln-floppy-disk", "ln-printer", "ln-file", "ln-folder", "ln-copy", "ln-scissors", "ln-paste", "ln-clipboard", "ln-clipboard-check", "ln-register", "ln-enter", "ln-exit", "ln-papers", "ln-news", "ln-document", "ln-document2", "ln-license", "ln-graduation-hat", "ln-license2", "ln-medal", "ln-medal2", "ln-medal3", "ln-medal4", "ln-podium", "ln-trophy", "ln-music-note", "ln-music", "ln-music2", "ln-playlist", "ln-shuffle", "ln-headset", "ln-presentation", "ln-play", "ln-film-play", "ln-camera", "ln-photo", "ln-picture", "ln-book", "ln-book-closed", "ln-bookmark", "ln-bookmark2", "ln-books", "ln-library", "ln-contacts", "ln-profile", "ln-user", "ln-users", "ln-users2", "ln-woman", "ln-man", "ln-shirt", "ln-cart", "ln-cart-empty", "ln-cart-full", "ln-tag", "ln-tags", "ln-cash", "ln-credit-card", "ln-barcode", "ln-barcode2", "ln-barcode3", "ln-phone", "ln-phone2", "ln-pin", "ln-map-marker", "ln-compass", "ln-map", "ln-location", "ln-road-sign", "ln-calendar", "ln-calendar2", "ln-calendar3", "ln-mouse", "ln-keyboard", "ln-delete", "ln-spell-check", "ln-screen", "ln-signal", "ln-iphone", "ln-smartphone", "ln-ipad", "ln-tablet", "ln-laptop", "ln-desktop", "ln-radio", "ln-tv", "ln-power", "ln-lightning-bolt", "ln-lamp", "ln-plug-cord", "ln-outlet", "ln-drawer", "ln-drawer2", "ln-drawer3", "ln-archive", "ln-archive2", "ln-comment", "ln-comments", "ln-chat", "ln-quote-open", "ln-quote-close", "ln-pulse", "ln-syringe", "ln-first-aid", "ln-lifebuoy", "ln-patch", "ln-patch2", "ln-lab", "ln-skull", "ln-construction", "ln-construction-cone", "ln-pie-chart", "ln-pie-chart2", "ln-graph", "ln-chart-growth", "ln-cake", "ln-gift", "ln-balloon", "ln-rank", "ln-rank2", "ln-rank3", "ln-crown", "ln-lotus", "ln-diamond", "ln-diamond2", "ln-diamond3", "ln-diamond4", "ln-linearicons", "ln-teacup", "ln-glass", "ln-bottle", "ln-cocktail-glass", "ln-dinner", "ln-dinner2", "ln-hamburger", "ln-dumbbell", "ln-apple", "ln-leaf", "ln-pine-tree", "ln-tree", "ln-paw", "ln-paw2", "ln-footprint", "ln-speed-slow", "ln-speed-medium", "ln-speed-fast", "ln-rocket", "ln-gamepad", "ln-dice", "ln-ticket", "ln-hammer2", "ln-balance", "ln-briefcase", "ln-plane", "ln-gas", "ln-transmission", "ln-car", "ln-bus", "ln-truck", "ln-trailer", "ln-train", "ln-ship", "ln-anchor", "ln-boat", "ln-bicycle", "ln-cube", "ln-puzzle", "ln-glasses", "ln-accessibility", "ln-wheelchir", "ln-icons", "ln-icons2", "ln-sitemap", "ln-earth", "ln-happy", "ln-smile", "ln-grin", "ln-tongue", "ln-sad", "ln-wink", "ln-dream", "ln-shocked", "ln-shocked2", "ln-tongue2", "ln-neutral", "ln-happy-grin", "ln-cool", "ln-mad", "ln-grin-evil", "ln-evil", "ln-shocked3", "ln-annoyed", "ln-mustache", "ln-wondering", "ln-confused", "ln-bell", "ln-bullhorn", "ln-volume-high", "ln-volume-medium", "ln-volume-low", "ln-volume", "ln-mute", "ln-wifi", "ln-wifi2", "ln-wifi3", "ln-mic", "ln-mic2", "ln-mic-mute", "ln-hourglass", "ln-loading", "ln-loading2", "ln-loading3", "ln-undo", "ln-redo", "ln-sync", "ln-sync2", "ln-refresh", "ln-refresh2", "ln-history", "ln-history2", "ln-clock", "ln-clock2", "ln-clock3", "ln-clock4", "ln-clock5", "ln-timer", "ln-timer2", "ln-download", "ln-upload", "ln-arrow-up", "ln-arrow-down", "ln-arrow-left", "ln-arrow-right", "ln-arrow-up2", "ln-arrow-down2", "ln-arrow-left2", "ln-arrow-right2", "ln-arrow-up3", "ln-arrow-down3", "ln-arrow-left3", "ln-arrow-right3", "ln-arrow-up4", "ln-arrow-down4", "ln-arrow-left4", "ln-arrow-right4", "ln-terminal", "ln-bug", "ln-code", "ln-file-code", "ln-file-image", "ln-file-zip", "ln-file-audio", "ln-file-video", "ln-link", "ln-link2", "ln-unlink", "ln-link3", "ln-unlink2", "ln-thumbs-up", "ln-thumbs-down", "ln-thumbs-up2", "ln-thumbs-down2", "ln-thumbs-up3", "ln-thumbs-down3", "ln-share", "ln-share2", "ln-share3", "ln-options", "ln-list", "ln-list2", "ln-magnifier", "ln-zoom-in", "ln-zoom-out", "ln-question", "ln-checkmark", "ln-cross", "ln-chevron-up", "ln-chevron-down", "ln-chevron-left", "ln-chevron-right", "ln-arrow-up5", "ln-arrow-down5", "ln-arrow-left5", "ln-arrow-right5", "ln-expand", "ln-shrink", "ln-expand2", "ln-shrink2", "ln-move", "ln-tab", "ln-warning", "ln-circle-exclamation", "ln-circle-question", "ln-circle-checkmark", "ln-circle-cross", "ln-circle-plus", "ln-circle-minus", "ln-circle-up", "ln-circle-down", "ln-circle-left", "ln-circle-right", "ln-circle-up2", "ln-circle-down2", "ln-circle-left2", "ln-circle-right2", "ln-circle-backward", "ln-circle-first", "ln-circle-previous", "ln-circle-stop", "ln-circle-play", "ln-circle-pause", "ln-circle-next", "ln-circle-last", "ln-circle-forward", "ln-circle-eject", "ln-crop", "ln-frame", "ln-ruler", "ln-funnel", "ln-flip-horizontal", "ln-flip-vertical", "ln-subtract", "ln-combine", "ln-intersect", "ln-exclude", "ln-align-center-vertical", "ln-align-right", "ln-align-bottom", "ln-align-left", "ln-align-center-horizontal", "ln-align-top", "ln-square", "ln-circle"];

    $scope.icons.sort();
    $scope.isLink = false;

    $scope.navigationSubmitForm = function(formValid) {
        if (formValid.$valid) {
            console.log($scope.userForm.link);
            if ($scope.userForm.link) {
                $scope.isLink = false;
                NavigationService.navigationCreateSubmit($scope.userForm, function(data) {
                    if (data.value) {
                        globalfunction.successToaster();
                        $state.go("navigation");
                    } else {
                        globalfunction.errorToaster();
                    }
                });
            } else {
                $scope.isLink = true;
            }

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

    globalfunction.getProfile();

    $scope.userForm = {};
    $scope.page = {
        header: "Edit Navigation"
    };

    $scope.icons = ["ln-home", "ln-home2", "ln-home3", "ln-home4", "ln-home5", "ln-home6", "ln-pencil", "ln-pencil2", "ln-edit", "ln-edit2", "ln-feather", "ln-feather2", "ln-pen", "ln-brush", "ln-paintbrush", "ln-paint-roller", "ln-eye-dropper", "ln-magic", "ln-design", "ln-magnet", "ln-aim", "ln-gun", "ln-droplet", "ln-droplet2", "ln-fire", "ln-lighter", "ln-knife", "ln-toilet-paper", "ln-umbrella", "ln-sun-small", "ln-sun", "ln-moon", "ln-cloud", "ln-cloud-upload", "ln-cloud-download", "ln-cloud-rain", "ln-cloud-snow", "ln-cloud-fog", "ln-cloud-lightning", "ln-cloud-sync", "ln-cloud-lock", "ln-cloud-gear", "ln-cloud-database", "ln-database", "ln-shield", "ln-lock", "ln-unlock", "ln-key", "ln-key-hole", "ln-gear", "ln-gear2", "ln-wrench", "ln-tools", "ln-hammer", "ln-factory", "ln-factory2", "ln-recycle", "ln-trash", "ln-trash2", "ln-heart", "ln-heart2", "ln-flag", "ln-flag2", "ln-flag3", "ln-at-sign", "ln-envelope", "ln-inbox", "ln-paperclip", "ln-reply", "ln-reply-all", "ln-paper-plane", "ln-eye", "ln-eye2", "ln-binoculars", "ln-binoculars2", "ln-floppy-disk", "ln-printer", "ln-file", "ln-folder", "ln-copy", "ln-scissors", "ln-paste", "ln-clipboard", "ln-clipboard-check", "ln-register", "ln-enter", "ln-exit", "ln-papers", "ln-news", "ln-document", "ln-document2", "ln-license", "ln-graduation-hat", "ln-license2", "ln-medal", "ln-medal2", "ln-medal3", "ln-medal4", "ln-podium", "ln-trophy", "ln-music-note", "ln-music", "ln-music2", "ln-playlist", "ln-shuffle", "ln-headset", "ln-presentation", "ln-play", "ln-film-play", "ln-camera", "ln-photo", "ln-picture", "ln-book", "ln-book-closed", "ln-bookmark", "ln-bookmark2", "ln-books", "ln-library", "ln-contacts", "ln-profile", "ln-user", "ln-users", "ln-users2", "ln-woman", "ln-man", "ln-shirt", "ln-cart", "ln-cart-empty", "ln-cart-full", "ln-tag", "ln-tags", "ln-cash", "ln-credit-card", "ln-barcode", "ln-barcode2", "ln-barcode3", "ln-phone", "ln-phone2", "ln-pin", "ln-map-marker", "ln-compass", "ln-map", "ln-location", "ln-road-sign", "ln-calendar", "ln-calendar2", "ln-calendar3", "ln-mouse", "ln-keyboard", "ln-delete", "ln-spell-check", "ln-screen", "ln-signal", "ln-iphone", "ln-smartphone", "ln-ipad", "ln-tablet", "ln-laptop", "ln-desktop", "ln-radio", "ln-tv", "ln-power", "ln-lightning-bolt", "ln-lamp", "ln-plug-cord", "ln-outlet", "ln-drawer", "ln-drawer2", "ln-drawer3", "ln-archive", "ln-archive2", "ln-comment", "ln-comments", "ln-chat", "ln-quote-open", "ln-quote-close", "ln-pulse", "ln-syringe", "ln-first-aid", "ln-lifebuoy", "ln-patch", "ln-patch2", "ln-lab", "ln-skull", "ln-construction", "ln-construction-cone", "ln-pie-chart", "ln-pie-chart2", "ln-graph", "ln-chart-growth", "ln-cake", "ln-gift", "ln-balloon", "ln-rank", "ln-rank2", "ln-rank3", "ln-crown", "ln-lotus", "ln-diamond", "ln-diamond2", "ln-diamond3", "ln-diamond4", "ln-linearicons", "ln-teacup", "ln-glass", "ln-bottle", "ln-cocktail-glass", "ln-dinner", "ln-dinner2", "ln-hamburger", "ln-dumbbell", "ln-apple", "ln-leaf", "ln-pine-tree", "ln-tree", "ln-paw", "ln-paw2", "ln-footprint", "ln-speed-slow", "ln-speed-medium", "ln-speed-fast", "ln-rocket", "ln-gamepad", "ln-dice", "ln-ticket", "ln-hammer2", "ln-balance", "ln-briefcase", "ln-plane", "ln-gas", "ln-transmission", "ln-car", "ln-bus", "ln-truck", "ln-trailer", "ln-train", "ln-ship", "ln-anchor", "ln-boat", "ln-bicycle", "ln-cube", "ln-puzzle", "ln-glasses", "ln-accessibility", "ln-wheelchir", "ln-icons", "ln-icons2", "ln-sitemap", "ln-earth", "ln-happy", "ln-smile", "ln-grin", "ln-tongue", "ln-sad", "ln-wink", "ln-dream", "ln-shocked", "ln-shocked2", "ln-tongue2", "ln-neutral", "ln-happy-grin", "ln-cool", "ln-mad", "ln-grin-evil", "ln-evil", "ln-shocked3", "ln-annoyed", "ln-mustache", "ln-wondering", "ln-confused", "ln-bell", "ln-bullhorn", "ln-volume-high", "ln-volume-medium", "ln-volume-low", "ln-volume", "ln-mute", "ln-wifi", "ln-wifi2", "ln-wifi3", "ln-mic", "ln-mic2", "ln-mic-mute", "ln-hourglass", "ln-loading", "ln-loading2", "ln-loading3", "ln-undo", "ln-redo", "ln-sync", "ln-sync2", "ln-refresh", "ln-refresh2", "ln-history", "ln-history2", "ln-clock", "ln-clock2", "ln-clock3", "ln-clock4", "ln-clock5", "ln-timer", "ln-timer2", "ln-download", "ln-upload", "ln-arrow-up", "ln-arrow-down", "ln-arrow-left", "ln-arrow-right", "ln-arrow-up2", "ln-arrow-down2", "ln-arrow-left2", "ln-arrow-right2", "ln-arrow-up3", "ln-arrow-down3", "ln-arrow-left3", "ln-arrow-right3", "ln-arrow-up4", "ln-arrow-down4", "ln-arrow-left4", "ln-arrow-right4", "ln-terminal", "ln-bug", "ln-code", "ln-file-code", "ln-file-image", "ln-file-zip", "ln-file-audio", "ln-file-video", "ln-link", "ln-link2", "ln-unlink", "ln-link3", "ln-unlink2", "ln-thumbs-up", "ln-thumbs-down", "ln-thumbs-up2", "ln-thumbs-down2", "ln-thumbs-up3", "ln-thumbs-down3", "ln-share", "ln-share2", "ln-share3", "ln-options", "ln-list", "ln-list2", "ln-magnifier", "ln-zoom-in", "ln-zoom-out", "ln-question", "ln-checkmark", "ln-cross", "ln-chevron-up", "ln-chevron-down", "ln-chevron-left", "ln-chevron-right", "ln-arrow-up5", "ln-arrow-down5", "ln-arrow-left5", "ln-arrow-right5", "ln-expand", "ln-shrink", "ln-expand2", "ln-shrink2", "ln-move", "ln-tab", "ln-warning", "ln-circle-exclamation", "ln-circle-question", "ln-circle-checkmark", "ln-circle-cross", "ln-circle-plus", "ln-circle-minus", "ln-circle-up", "ln-circle-down", "ln-circle-left", "ln-circle-right", "ln-circle-up2", "ln-circle-down2", "ln-circle-left2", "ln-circle-right2", "ln-circle-backward", "ln-circle-first", "ln-circle-previous", "ln-circle-stop", "ln-circle-play", "ln-circle-pause", "ln-circle-next", "ln-circle-last", "ln-circle-forward", "ln-circle-eject", "ln-crop", "ln-frame", "ln-ruler", "ln-funnel", "ln-flip-horizontal", "ln-flip-vertical", "ln-subtract", "ln-combine", "ln-intersect", "ln-exclude", "ln-align-center-vertical", "ln-align-right", "ln-align-bottom", "ln-align-left", "ln-align-center-horizontal", "ln-align-top", "ln-square", "ln-circle", "custom"];
    $scope.icons.sort();

    NavigationService.getNavigationEditDetail($stateParams.id, function(data) {
        $scope.userForm = data.data;
        if ($scope.userForm.status == 1) {
            $scope.userForm.status = true;
        } else {
            $scope.userForm.status = false;
        }
    });
    $scope.isLink = false;

    $scope.navigationSubmitForm = function(formValid) {
        if (formValid.$valid) {
            console.log($scope.userForm);
            if ($scope.userForm.link) {
                $scope.isLink = false;
                NavigationService.editNavigationSubmit($scope.userForm, function(data) {
                    if (data.value) {
                        globalfunction.successToaster();
                        $state.go("navigation");
                    } else {
                        globalfunction.errorToaster();
                    }
                });
            } else {
                $scope.isLink = true;
            }
        }
    };

})

.controller('LoginSignupCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("login-signup");
    $scope.menutitle = NavigationService.makeactive("Login & Signup");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    globalfunction.getProfile();

    $scope.login = {};
    $scope.login.googleCredentials = {};
    $scope.login.facebookCredentials = {};
    $scope.login.twitterCredentials = {};
    $scope.login.instaCredentials = {};
    $scope.login.hasLogin = true;
    $scope.login.custom = true;
    $scope.login.google = false;
    $scope.login.facebook = false;
    $scope.login.twitter = false;
    $scope.login.insta = false;

    $scope.changeLogin = function() {
        if (!$scope.login.hasLogin) {
            $scope.login.custom = false;
            $scope.login.google = false;
            $scope.login.facebook = false;
            $scope.login.twitter = false;
            $scope.login.insta = false;
        }
    };
    $scope.changeLoginForOther = function(val) {
        if (val) {
            $scope.login.hasLogin = true;
        }
    };

    $scope.saveConfigData = function() {
        $scope.valid = false;
        if (!$scope.login.hasLogin) {
            $scope.valid = true;
            $scope.login.custom = false;
            $scope.login.google = false;
            $scope.login.facebook = false;
            $scope.login.twitter = false;
            $scope.login.insta = false;
            $scope.login.googleCredentials = {};
            $scope.login.facebookCredentials = {};
            $scope.login.twitterCredentials = {};
            $scope.login.instaCredentials = {};
        }
        $scope.configData.login = $scope.login;
        console.log($scope.configData);
        if ($scope.login.custom) {
            $scope.valid = true;
        }
        if ($scope.login.google) {
            if ($scope.login.googleCredentials && $scope.login.googleCredentials.id && $scope.login.googleCredentials.secret) {
                $scope.valid = true;
            } else {
                $scope.valid = false;
            }
        }
        if ($scope.login.facebook) {
            if ($scope.login.facebookCredentials && $scope.login.facebookCredentials.id && $scope.login.facebookCredentials.secret) {
                $scope.valid = true;
            } else {
                $scope.valid = false;
            }
        }
        if ($scope.login.twitter) {
            if ($scope.login.twitterCredentials && $scope.login.twitterCredentials.id && $scope.login.twitterCredentials.secret) {
                $scope.valid = true;
            } else {
                $scope.valid = false;
            }
        }
        if ($scope.login.insta) {
            if ($scope.login.instaCredentials && $scope.login.instaCredentials.id && $scope.login.instaCredentials.secret) {
                $scope.valid = true;
            } else {
                $scope.valid = false;
            }
        }
        if ($scope.valid) {
            $scope.showErrMsg = false;
            NavigationService.saveConfigData($scope.configData, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                } else {
                    globalfunction.errorToaster();
                }
            })
        } else {
            $scope.showErrMsg = true;
            console.log("Invalid");
        }
    };

    NavigationService.getConfig(function(data) {
        console.log(data);
        if (data.value) {
            if (data.data && data.data.length > 0) {
                $scope.configData = data.data[0];
                if (data.data[0].login) {
                    $scope.login = data.data[0].login;
                }
            } else {
                $scope.configData = {};
            }
        } else {
            $scope.configData = {};
        }
    })

})

.controller('NotificationsCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("notifications");
    $scope.menutitle = NavigationService.makeactive("Notifications");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    globalfunction.getProfile();

    $scope.userForm = {};
    $scope.userForm.status = true;
    $scope.notificationForm = {};
    $scope.config = {};
    $scope.isLink = false;
    var modalInstance = '';

    NavigationService.getConfig(function(data) {
        if (data.value) {
            if (data.data && data.data.length > 0) {
                $scope.configData = data.data[0];
            }
        }
    });

    $scope.saveGoogleCloud = function() {
        console.log($scope.configData);
        NavigationService.saveConfigData($scope.configData, function(data) {

        });
    };

    $scope.notificationdata = [];
    $scope.allNotificationRecord = function() {
        NavigationService.notificationViewAll($scope.notificationForm, function(data) {
            $scope.notificationdata = data.data;
        });
    };
    $scope.allNotificationRecord();

    $scope.deleteNotification = function(formValid) {
        globalfunction.confDel(function(val) {
            if (val) {
                NavigationService.deleteNotificationData({
                    id: formValid
                }, function(data) {
                    if (data.value) {
                        globalfunction.delSuccessToaster();
                        $scope.allNotificationRecord();
                    }
                });
            }
        });
    };

    $scope.notificationSubmitForm = function(formValid) {
        if (formValid.$valid) {
            console.log('in navi');
            if ($scope.userForm.link) {
                $scope.isLink = false;
                $scope.userForm.timestamp = new Date();
                NavigationService.notificationCreateSubmit($scope.userForm, function(data) {
                    if (data.value) {
                        $scope.userForm = {};
                        $scope.allNotificationRecord();
                        globalfunction.successToaster();
                    } else {
                        globalfunction.errorToaster();
                    }
                });
            } else {
                $scope.isLink = true;
            }

        }
    };

    $scope.notificationEditSubmitForm = function(noti) {
        if (noti.link) {
            $scope.isLink = false;
            NavigationService.notificationCreateSubmit(noti, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                    modalInstance.dismiss();
                    $scope.allNotificationRecord();
                } else {
                    globalfunction.errorToaster();
                }
            });
        } else {
            $scope.isLink = true;
        }

    };

    $scope.animationsEnabled = true;

    $scope.open = function(noti) {
        console.log(noti);
        $scope.noti = noti;
        $scope.isLink = false;
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

    globalfunction.getProfile();

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
        globalfunction.confDel(function(val) {
            if (val) {
                NavigationService.deleteEventsData({
                    id: formValid
                }, function(data) {
                    if (data.value) {
                        globalfunction.delSuccessToaster();
                        $scope.allNavigationRecord();
                    }
                });
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

    globalfunction.getProfile();

    $scope.userForm = {};
    $scope.userForm.images = [];
    $scope.page = {
        header: "Create Event"
    };
    $scope.eventSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.eventCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                    $state.go("events");
                } else {
                    globalfunction.errorToaster();
                }
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

    $scope.extractVideoId = function(url) {
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if (videoid != null) {
            $scope.modalData.thumbnail = "http://img.youtube.com/vi/" + videoid[1] + "/mqdefault.jpg";
            console.log("video id = ", videoid[1]);
        } else {
            console.log("The youtube url is not valid.");
        }
    }

    var modalInstances = '';
    $scope.noTitle = '0';

    $scope.addVideo = function() {
        $scope.modalData = {
            "status": true
        };
        modalInstances = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstances.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.VideoEdit = function(singleVideo) {
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

    $scope.popVideo = function(video) {
        console.log("sdflashdfkljahskljdfh");
        console.log($scope.userForm.videos);
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
    };

    var modalInstance = '';
    $scope.ImageEdit = function(image) {
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

    $scope.saveModalData = function(image) {
        modalInstance.dismiss();
    };

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.changeit = function(data) {
        console.log(data);
        console.log($scope.userForm.images);
        if (data.value) {
            // if ($scope.userForm.images && $scope.userForm.images.length<1) {
            _.each(data.data, function(n) {
                $scope.userForm.images.push({
                    "image": n
                });
            });
            // }

        }
    };

})

.controller('EditEventDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $uibModal, $state, toaster, $stateParams, $filter) {

    //Used to name the .html file
    console.log("in edit event");
    $scope.template = TemplateService.changecontent("eventdetail");
    $scope.menutitle = NavigationService.makeactive("Events");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    globalfunction.getProfile();

    $scope.userForm = {};
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
            NavigationService.editEventSubmit($scope.userForm, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                    $state.go("events");
                } else {
                    globalfunction.errorToaster();
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

    $scope.extractVideoId = function(url) {
        var videoid = url.match(/(?:https?:\/{2})?(?:w{3}\.)?youtu(?:be)?\.(?:com|be)(?:\/watch\?v=|\/)([^\s&]+)/);
        if (videoid != null) {
            $scope.modalData.thumbnail = "http://img.youtube.com/vi/" + videoid[1] + "/mqdefault.jpg";
            console.log("video id = ", videoid[1]);
        } else {
            console.log("The youtube url is not valid.");
        }
    };

    var modalInstances = '';
    $scope.noTitle = '0';
    $scope.addVideo = function() {
        $scope.modalData = {};
        modalInstances = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/video-edit.html',
            scope: $scope
        });

        modalInstances.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {});
    };

    $scope.VideoEdit = function(singleVideo) {
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

    $scope.popVideo = function(index) {
        globalfunction.confDel(function(val) {
            if (val) {
                $scope.userForm.videos.splice(index, 1);
            }
        });
    };

    $scope.popImage = function(index) {
        globalfunction.confDel(function(val) {
            if (val) {
                $scope.userForm.images.splice(index, 1);
            }
        });
    };

    $scope.changeit = function(data) {
        console.log(data);
        console.log($scope.userForm.images);

        if (!$scope.userForm.images) {
            $scope.userForm.images = [];
        }
        if (data.value) {
            _.each(data.data, function(n) {
                $scope.userForm.images.push({
                    image: n,
                    status: true
                });
            });
        }
    };

    $scope.addVideo = function() {
        $scope.modalData = {
            "status": true
        };
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
    };

    var modalInstance = '';
    $scope.ImageEdit = function(image) {
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

    $scope.saveModalData = function(image) {
        modalInstance.dismiss();
    }


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

    globalfunction.getProfile();

    $scope.userForm = {};

    $scope.oneAtATime = true;
    $scope.blogForm = {};
    $scope.allBlogsRecord = function() {
        NavigationService.blogViewAll(function(data) {
            console.log(data);
            $scope.blogdata = data.data;
        });
    };
    $scope.allBlogsRecord();

    $scope.deleteBlog = function(formValid) {
        globalfunction.confDel(function(val) {
            if (val) {
                NavigationService.deleteBlogData({
                    id: formValid
                }, function(data) {
                    if (data.value) {
                        globalfunction.delSuccessToaster();
                        $scope.allBlogsRecord();
                    }
                });
            }
        });
    };

    $scope.saveConfigData = function() {
        console.log($scope.configData);
        $scope.valid = false;
        if ($scope.configData.blog && $scope.configData.blog.blogType == 'CMS') {
            $scope.valid = true;
        } else if ($scope.configData.blog && $scope.configData.blog.blogType == 'Wordpress') {
            if ($scope.configData.blog && $scope.configData.blog.wordpressUsername) {
                $scope.valid = true;
            } else {
                $scope.valid = false;
            }
        } else if ($scope.configData.blog && $scope.configData.blog.blogType == 'SelfHosted') {
            if ($scope.configData.blog && $scope.configData.blog.selfHostedUsername) {
                $scope.valid = true;
            } else {
                $scope.valid = false;
            }
        } else if ($scope.configData.blog && $scope.configData.blog.blogType == 'Tumblr') {
            if ($scope.configData.blog && $scope.configData.blog.tumblrUsername) {
                $scope.valid = true;
            } else {
                $scope.valid = false;
            }
        }

        if ($scope.valid) {
            $scope.showErrMsg = false;
            NavigationService.saveConfigData($scope.configData, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                } else {
                    globalfunction.errorToaster();
                }
            })
        } else {
            $scope.showErrMsg = true;
            console.log("Invalid");
        }
    };

    NavigationService.getConfig(function(data) {
        console.log(data);
        if (data.value) {
            if (data.data && data.data.length > 0) {
                $scope.configData = data.data[0];
                if (!$scope.configData.blog) {
                    $scope.configData.blog = {};
                    $scope.configData.blog.blogType = 'CMS';
                    $scope.status = {
                        isFirstOpen: true
                    };
                } else {
                    switch ($scope.configData.blog.blogType) {
                        case 'CMS':
                            $scope.status = {
                                isFirstOpen: true
                            };
                            break;
                        case 'Wordpress':
                            $scope.status = {
                                open2: true
                            };
                            break;
                        case 'SelfHosted':
                            $scope.status = {
                                open3: true
                            };
                            break;
                        case 'Tumblr':
                            $scope.status = {
                                open4: true
                            };
                            break;
                        default:
                            break;
                    }
                }
            } else {
                $scope.configData = {};
                $scope.configData.blog = {};
                $scope.configData.blog.blogType = 'CMS';
                $scope.status = {
                    isFirstOpen: true
                };
            }
        } else {
            $scope.configData = {};
            $scope.configData.blog = {};
            $scope.configData.blog.blogType = 'CMS';
            $scope.status = {
                isFirstOpen: true
            };
        }
    })

})

.controller('BlogDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $uibModal, $state) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("blogdetail");
    $scope.menutitle = NavigationService.makeactive("Blogs");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();

    globalfunction.getProfile();

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
                    globalfunction.successToaster();
                    $state.go("blogs");
                } else {
                    globalfunction.errorToaster();
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

    globalfunction.getProfile();

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
        console.log("here");
        NavigationService.blogCreateSubmit($scope.userForm, function(data) {
            if (data.value) {
                globalfunction.successToaster();
                $state.go("blogs");
            } else {
                globalfunction.errorToaster();
            }
        });
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

    globalfunction.getProfile();

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
        globalfunction.confDel(function(val) {
            if (val) {
                NavigationService.deleteArticleData({
                    id: formValid
                }, function(data) {
                    if (data.value) {
                        globalfunction.delSuccessToaster();
                        $scope.allNavigationRecord();
                    }
                });
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

    globalfunction.getProfile();

    $scope.userForm = {};
    $scope.userForm.status = true;
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
                    globalfunction.successToaster();
                    $state.go("articles");
                } else {
                    globalfunction.errorToaster();
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

    globalfunction.getProfile();

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
                    globalfunction.successToaster();
                    $state.go("articles");
                } else {
                    globalfunction.errorToaster();
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
    globalfunction.getProfile();

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

            });
        }
    };

    $scope.deleteGallery = function(id, index) {
        globalfunction.confDel(function(val) {
            if (val) {
                NavigationService.deleteGallery(id, function(data) {
                    if (data.value) {
                        globalfunction.delSuccessToaster();
                        $scope.photogaldata.splice(index, 1);
                    }
                });
            }
        });
    };

})

.controller('PhotoGalleryDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $uibModal, $stateParams, $timeout) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("photogallerydetail");
    $scope.menutitle = NavigationService.makeactive("Photo Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    globalfunction.getProfile();
    var modalInstance = '';

    $scope.userForm = {};
    $scope.userForm.status = true;
    $scope.noTitle = '0';

    $scope.photogalSubmitForm = function() {
        if ($scope.userForm.images) {
            _.each($scope.userForm.images, function(n) {
                if (!n.status && n.status != false) {
                    n.status = true;
                }
            })
        }
        NavigationService.photogalSubmitForm($scope.userForm, function(data) {
            if (data.value) {
                globalfunction.successToaster();
                $scope.getSingleGallery();
                $state.go('photo-galleries');
            } else {
                globalfunction.errorToaster();
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
        $scope.modalData.status = true;

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
        if (!$scope.userForm.images) {
            $scope.userForm.images = [];
        }
        if (data.value) {
            _.each(data.data, function(n) {
                $scope.userForm.images.push({
                    image: n,
                    status: true
                });
            });
        }
    };

    $scope.popImage = function(index) {
        globalfunction.confDel(function(val) {
            if (val) {
                $scope.userForm.images.splice(index, 1);
            }
        });
    };

})

.controller('VideoGalleriesCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("videogalleries");
    $scope.menutitle = NavigationService.makeactive("Video Galleries");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    globalfunction.getProfile();
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

    $scope.deleteVideo = function(id, index) {
        globalfunction.confDel(function(val) {
            if (val) {
                NavigationService.deleteVideo(id, function(data) {
                    if (data.value) {
                        globalfunction.delSuccessToaster();
                        $scope.videogalleries.splice(index, 1);
                    }
                });
            }
        });
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
    globalfunction.getProfile();
    $scope.header = {};
    $scope.header.name = 'Create Video Gallery';
    $scope.userForm = {};
    $scope.userForm.status = true;
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
        $scope.modalData = {};
        $scope.modalData.status = true;
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

    // $scope.pushVideo = function(video) {
    //     console.log(video);
    //     if (!$scope.userForm.videos) {
    //         $scope.userForm.videos = [];
    //     }
    //     $scope.userForm.videos.push(video);
    //     modalInstances.dismiss();
    //     $scope.modalData = {};
    // };
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
    };

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };

    $scope.popVideo = function(index) {
        globalfunction.confDel(function(val) {
            if (val) {
                $scope.userForm.videos.splice(index, 1);
            }
        });
    };

    $scope.videoGallerySubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.videoGalleryCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                    $state.go("video-galleries");
                } else {
                    globalfunction.errorToaster();
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
    globalfunction.getProfile();
    $scope.header = {};
    $scope.header.name = 'Edit Video Gallery';
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
                    globalfunction.successToaster();
                    $state.go("video-galleries");
                } else {
                    globalfunction.errorToaster();
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

    // $scope.open = function(singleVideo) {
    //     $scope.modalData = singleVideo;
    //     modalInstances = $uibModal.open({
    //         animation: $scope.animationsEnabled,
    //         templateUrl: 'views/modal/video-edit.html',
    //         scope: $scope
    //     });
    //
    //     modalInstances.result.then(function(selectedItem) {
    //         $scope.selected = selectedItem;
    //     }, function() {});
    // };

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
    };

    $scope.popVideo = function(index) {
        console.log("sdflashdfkljahskljdfh");
        console.log($scope.userForm.videos);
        $scope.userForm.videos.splice(index, 1);
    };

    // $scope.pushVideo = function(video) {
    //     console.log(video);
    //     if (!$scope.userForm.videos) {
    //         $scope.userForm.videos = [];
    //     }
    //     $scope.userForm.videos.push(video);
    //     modalInstances.dismiss();
    //     $scope.modalData = {};
    // };
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
    };

    $scope.popVideo = function(index) {
        globalfunction.confDel(function(val) {
            if (val) {
                $scope.userForm.videos.splice(index, 1);
            }
        });
    };

})


.controller('ContactCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("contact");
    $scope.menutitle = NavigationService.makeactive("Contact");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    globalfunction.getProfile();

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
    globalfunction.getProfile();
    $scope.userForm = {};
    $scope.page = {
        header: "Create Contact"
    };
    $scope.contactSubmitForm = function(formValid) {
        if (formValid.$valid) {
            console.log('in navi');
            NavigationService.contactCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    $state.go("contact");
                    globalfunction.successToaster();
                } else {
                    globalfunction.errorToaster();
                }
            });
        }
    };

})

.controller('EditContactDetailCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("contactdetail");
    $scope.menutitle = NavigationService.makeactive("Contact");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    globalfunction.getProfile();
    $scope.userForm = {};
    $scope.page = {
        header: "Edit Contact"
    };

    NavigationService.getContactEditDetail($stateParams.id, function(data) {
        //console.log('getArticleEditDetail', data.data);
        $scope.mapCenter = {
            lat: parseFloat(data.data.lat),
            long: parseFloat(data.data.long)
        };
        $scope.userForm = data.data;

    });

    $scope.change = function(changeVal) {
        $scope.userForm.lat = changeVal.latLng.lat();
        $scope.userForm.long = changeVal.latLng.lng();

    };

    $scope.contactSubmitForm = function(formValid) {
        console.log($scope.userForm);
        if (formValid.$valid) {
            NavigationService.editContactSubmit($scope.userForm, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                    $state.go("contact");
                } else {
                    globalfunction.errorToaster();
                }
            });
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
    $scope.menutitle = NavigationService.makeactive("Audio Gallery");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    globalfunction.getProfile();

    $scope.audio = {};

    $scope.updateAudio = function() {
        NavigationService.saveConfigData($scope.configData, function(data) {
            if (data.value) {
                globalfunction.successToaster();
            } else {
                globalfunction.errorToaster();
            }
        })
    }

    NavigationService.getConfig(function(data) {
        console.log(data);
        if (data.value) {
            if (data.data && data.data[0]) {
                $scope.configData = data.data[0];
            } else {
                $scope.configData = {};
            }
        } else {
            $scope.configData = {};
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
    globalfunction.getProfile();
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
    globalfunction.getProfile();
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
    globalfunction.getProfile();
    $scope.userForm = [];
    var modalInstance = '';

    $scope.hideLink = true;
    $scope.noTitle = '0';

    $scope.allIntroSlider = function() {
        NavigationService.getAllIntro(function(data) {
            console.log(data);
            if (data.value) {
                $scope.userForm = data.data;
                if (data.data.length > 0) {
                    $scope.showNoSlider = false;
                } else {
                    $scope.showNoSlider = true;
                }
            } else {
                $scope.userForm = [];
            }
        });
    }
    $scope.allIntroSlider();

    $scope.saveModalData = function(modalData) {
        _.each($scope.userForm, function(n) {
            if (!n.status && n.status != false) {
                n.status = true;
            }
        })
        NavigationService.saveIntroData($scope.userForm, function(data) {
            if (data.value) {
                globalfunction.successToaster();
                if (modalInstance)
                    modalInstance.dismiss();
            } else {
                globalfunction.errorToaster();
            }
        });
    };

    $scope.changeit = function(data) {
        if (data.value) {
            _.each(data.data, function(n) {
                $scope.userForm.push({
                    "image": n,
                    "status": true
                });
            });
        }
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
        }, function() {

        });
    };

    $scope.popSlider = function(index, id) {
        globalfunction.confDel(function(val) {
            if (val) {
                if (id) {
                    NavigationService.deleteIntroSlider(id, function(data) {
                        if (data.value) {
                            $scope.allIntroSlider();
                        }
                    }, function(data) {
                        console.log(data);
                    });
                } else {
                    $scope.userForm.splice(index, 1);
                    $scope.allIntroSlider();
                }
            }
        });
    };

    $scope.sortableOptions = {
        update: function(e, ui) {
            NavigationService.sortArray($scope.userForm, 'introslider', function(data) {

            });
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
    globalfunction.getProfile();
    $scope.userForm = {};
    $scope.allUsersRecord = function() {
        NavigationService.userViewAllLatest($scope.userForm, function(data) {
            if (data.value)
                $scope.userdata = data.data;
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
    globalfunction.getProfile();
    $scope.userForm = {};
    $scope.page = {
        header: "Create User"
    };
    $scope.userSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.userCreateSubmit($scope.userForm, function(data) {
                if (data.value) {
                    globalfunction.successToaster();
                    $state.go("users");
                }
            });
        }
    };

    $scope.hideSocial = true;

})

.controller('EditUserCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $state, $stateParams) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("userdetail");
    $scope.menutitle = NavigationService.makeactive("Users");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    globalfunction.getProfile();
    $scope.userForm = {};
    $scope.page = {
        header: "Edit User"
    };

    NavigationService.getUserEditDetail($stateParams.id, function(data) {
        $scope.userForm = data.data;
    });

    $scope.userSubmitForm = function(formValid) {
        if (formValid.$valid) {
            NavigationService.editUserSubmit($scope.userForm, function(data) {
                console.log('my edit users', $scope.userForm);
                $state.go("users");
            });
        }
    };

})

.controller('BillingCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("billing");
    $scope.menutitle = NavigationService.makeactive("Billing");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    globalfunction.getProfile();
})

.controller('AccountCtrl', function($scope, TemplateService, NavigationService, $timeout, $log) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("account");
    $scope.menutitle = NavigationService.makeactive("Account");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    globalfunction.getProfile();
})

.controller('PublishingCtrl', function($scope, TemplateService, NavigationService, $timeout, $log, $uibModal) {
    //Used to name the .html file
    $scope.template = TemplateService.changecontent("publishing");
    $scope.menutitle = NavigationService.makeactive("Publishing");
    TemplateService.title = $scope.menutitle;
    $scope.navigation = NavigationService.getnav();
    globalfunction.getProfile();
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
    globalfunction.getProfile();
    $scope.userForm = {};

    $scope.saveConfigData = function() {
        NavigationService.saveConfigData($scope.configData, function(data) {
            console.log(data);
            if (data.value) {
                globalfunction.successToaster();
            }
        });
    };

    $scope.resetSearch = function() {
        if ($scope.configData && $scope.configData.search) {
            globalfunction.confDel(function(val) {
                if (val) {
                    _.each($scope.configData.search, function(n) {
                        n.enabled = false;
                    });
                    NavigationService.saveConfigData($scope.configData, function(data) {
                        console.log(data);
                        if (data.value) {
                            globalfunction.delSuccessToaster();
                        }
                    });
                }
            });
        }
    };

    $scope.oneAtATime = true;
    $scope.searchFor = [{
        name: "Notifications",
        enabled: false
    }, {
        name: "Events",
        enabled: false
    }, {
        name: "Blogs",
        enabled: false
    }, {
        name: "Articles",
        enabled: false
    }, {
        name: "Photo Galleries",
        enabled: false
    }, {
        name: "Video Galleries",
        enabled: false
    }, {
        name: "Contact",
        enabled: false
    }, {
        name: "Audio Gallery",
        enabled: false
    }];

    NavigationService.getConfig(function(data) {
        console.log(data);
        if (data.value) {
            if (data.data && data.data.length > 0) {
                $scope.configData = data.data[0];
                if (!$scope.configData.search) {
                    $scope.configData.search = $scope.searchFor;
                }
            } else {
                $scope.configData = {};
                $scope.configData.socialfeeds = {};
                $scope.configData.search = $scope.searchFor;
            }
        } else {
            $scope.configData = {};
            $scope.configData.socialfeeds = {};
        }
    });
})

.controller('headerctrl', function($scope, TemplateService, toastr, $uibModal, NavigationService, $timeout) {
    $scope.template = TemplateService;
    $scope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
        $(window).scrollTop(0);
    });
    $scope.preview = "views/app-preview.html";
    $scope.searchBar = false;
    $scope.showBar = function() {
        $scope.searchBar = !$scope.searchBar;
    };
    globalfunction.successToaster = function() {
        toastr.success('Saved Successfully');
    };
    globalfunction.delSuccessToaster = function() {
        toastr.success('Deleted Successfully');
    };
    globalfunction.errorToaster = function() {
        toastr.error('Something went wrong', 'Sorry');
    };
    var modalInstance = '';
    $scope.callback = "";
    globalfunction.confDel = function(callback) {
        modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/confDelete.html',
            size: 'sm',
            scope: $scope
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {

        });
        $scope.callback = callback;
    };

    globalfunction.messageModal = function(text) {
        console.log("here");
        $scope.modalText = text;
        $scope.animationsEnabled = true;
        var modalInstance = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'views/modal/modal-message.html',
            size: 'sm',
            scope: $scope
        });

        modalInstance.result.then(function(selectedItem) {
            $scope.selected = selectedItem;
        }, function() {

        });

        $timeout(function() {
            modalInstance.close();
        }, 5000);
    };

    NavigationService.getConfig(function(data) {
        console.log(data);
        if (data.data && data.data.length === 0) {
            $scope.saveConfig();
        }
    });

    $scope.saveConfig = function() {
        $scope.config = {
            googleCloud: {},
            blog: {
                blogType: "CMS"
            },
            socialfeeds: {},
            gaid: "",
            login: {
                hasLogin: false
            }
        };
        console.log($scope.config);
        NavigationService.saveConfigData($scope.config, function(data) {
            console.log(data);
        });
    };

    $scope.close = function(val) {
        modalInstance.dismiss();
        $scope.callback(val);
    };

    globalfunction.getProfile = function() {
        NavigationService.getProfile(function(data) {
            if (data.value == false) {
                globalfunction.messageModal("Sorry! Your session key is invalid. Please login again.");
                $timeout(function() {
                    window.location.href = "https://blazen.io/login";
                }, 5000);
            }
        });
    }

});
