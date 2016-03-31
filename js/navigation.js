var adminurl = "http://192.168.1.114:1337/";
var adminurl = "http://192.168.1.116:88/";
var imgpath = adminurl + "upload/readFile";
var uploadurl = adminurl + "upload";
var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function($http) {
    var navigation = [{
            name: "Dashboard",
            classis: "active",
            anchor: "dashboard",
            icon: "ln-chart-growth",
        }, {
            name: "Theme",
            classis: "active",
            anchor: "theme",
            icon: "ln-paintbrush",
        }, {
            name: "Home",
            classis: "active",
            anchor: "home",
            icon: "ln-home3",
        }, {
            name: "Navigation",
            classis: "active",
            anchor: "navigation",
            icon: "ln-compass",
        }, {
            name: "Login & Signup",
            classis: "active",
            anchor: "login-signup",
            icon: "ln-unlock",
        }, {
            name: "Notifications",
            classis: "active",
            anchor: "notifications",
            icon: "ln-bell",
        }, {
            name: "Events",
            classis: "active",
            anchor: "events",
            icon: "ln-calendar2",
        }, {
            name: "Blogs",
            classis: "active",
            anchor: "blogs",
            icon: "ln-edit2",
        }, {
            name: "Articles",
            classis: "active",
            anchor: "articles",
            icon: "ln-papers",
        }, {
            name: "Photo Galleries",
            classis: "active",
            anchor: "photo-galleries",
            icon: "ln-picture",
        }, {
            name: "Video Galleries",
            classis: "active",
            anchor: "video-galleries",
            icon: "ln-film-play",
        }, {
            name: "Contact",
            classis: "active",
            anchor: "contact",
            icon: "ln-contacts",
        },
        // ,
        // {
        //   name: "Search",
        //   classis: "active",
        //   anchor: "search",
        //   icon: "ln-magnifier",
        // }
        {
            name: "Audio Galleries",
            classis: "active",
            anchor: "audio-galleries",
            icon: "ln-headset",
        }, {
            name: "Intro Slider",
            classis: "active",
            anchor: "intro-slider",
            icon: "ln-file-image",
        },
        // ,
        // {
        //   name: "Social Feeds",
        //   classis: "active",
        //   anchor: "social-feeds",
        //   icon: "ln-thumbs-up",
        // }
        // ,{
        //   name: "Forms",
        //   classis: "active",
        //   anchor: "forms",
        //   icon: "ln-register",
        // }
        {
            name: "Users",
            classis: "active",
            anchor: "users",
            icon: "ln-users2",
        }, {
            name: "Configuration",
            classis: "active",
            anchor: "configuration",
            icon: "ln-gear2",
        }
    ];

    return {
        getnav: function() {
            return navigation;
        },
        homeViewAll: function(callback) {
            $http({
                url: adminurl + 'homeslider/getAll',
                method: 'POST'
            }).success(callback);
        },
        saveHomeContent: function(homeData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'homeslider/save',
                method: 'POST',
                withCredentials: true,
                data: homeData
            }).success(callback);
        },
        insertData: function(sliderArr, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'homeslider/insertData',
                method: 'POST',
                withCredentials: true,
                data: sliderArr
            }).success(callback);
        },
        edithomeSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'home/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "title": formData.title,
                    "externallink": formData.externallink,
                    "image": formData.image,
                    "status": formData.status

                }
            }).success(callback);
        },
        notificationViewAll: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'notification/getAll',
                method: 'POST',
                withCredentials: true,
                data: {
                    "image": formData.image,
                    "content": formData.content,
                    "sendingTime": formData.sendingTime,
                }
            }).success(callback);
        },
        deleteNotificationData: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'notification/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData.id,

                }
            }).success(callback);
        },
        notificationCreateSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'notification/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "content": formData.content,
                    "sendingTime": formData.sendingTime,
                    "image": formData.image,
                    "status": formData.status
                }
            }).success(callback);
        },
        getNotificationEditDetail: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'notification/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData.id,

                }
            }).success(callback);
        },
        editnotiicationSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'notification/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "content": formData.content,
                    "sendingTime": formData.sendingTime,
                    "image": formData.image,
                    "status": formData.status

                }
            }).success(callback);
        },
        blogViewAll: function(callback) {
            $http({
                url: adminurl + 'blog/getAll',
                method: 'POST',
                withCredentials: true
            }).success(callback);
        },
        deleteBlogData: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'contact/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData.id,
                }
            }).success(callback);
        },
        blogCreateSubmit: function(formData, callback) {
            $http({
                url: adminurl + 'blog/save',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getBlogEditDetail: function(id, callback) {
            $http({
                url: adminurl + 'blog/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        editblogSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'blog/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "blogtitle": formData.blogtitle,
                    "content": formData.content,
                    "timestamp": formData.timestamp,
                    "image": formData.image,
                }
            }).success(callback);
        },
        contactViewAll: function(formData, callback) {
            $http({
                url: adminurl + 'contact/getAll',
                method: 'POST',
                withCredentials: true,
                data: {
                    "title": formData.title,
                    "email": formData.email,
                    "address": formData.address
                }
            }).success(callback);
        },
        deleteContactData: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'contact/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData.id,

                }
            }).success(callback);
        },
        contactCreateSubmit: function(formData, callback) {
            $http({
                url: adminurl + 'contact/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "title": formData.title,
                    "email": formData.email,
                    "address": formData.address,
                    "lat": formData.lat,
                    "long": formData.long,
                }
            }).success(callback);
        },
        getContactEditDetail: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'contact/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id

                }
            }).success(callback);
        },
        editContactSubmit: function(formData, callback) {
            $http({
                url: adminurl + 'contact/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "title": formData.title,
                    "email": formData.email,
                    "address": formData.address,
                    "lat": formData.lat,
                    "long": formData.long,
                }
            }).success(callback);
        },
        videoGalleryCreateSubmit: function(formData, callback) {
            $http({
                url: adminurl + 'videogallerycategory/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "image": formData.image,
                    "order": formData.order,
                    "status": formData.status
                }
            }).success(callback);
        },
        videoGalleriesViewAll: function(formData, callback) {
            $http({
                url: adminurl + 'videogallerycategory/getAll',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "image": formData.image,
                    "order": formData.order,
                    "modificationTime": formData.modificationTime,
                    "status": formData.status
                }
            }).success(callback);
        },
        getVideoGalleryEditDetail: function(id, callback) {
            $http({
                url: adminurl + 'videogallerycategory/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        editvideogallerySubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'videogallerycategory/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "name": formData.name,
                    "image": formData.image,
                    "order": formData.order,
                    "modificationTime": formData.modificationTime,
                    "status": formData.status,
                }
            }).success(callback);
        },
        audioGalleryCreateSubmit: function(formData, callback) {
            $http({
                url: adminurl + 'audiogallerycategory/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "audiotitle": formData.audiotitle,
                    "image": formData.image,
                    "date": formData.date,
                    //"modificationTime": formData.modificationTime,
                    "status": formData.status,
                    //"views": formData.views,

                }
            }).success(callback);
        },
        audioGalleryViewAll: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'audiogallerycategory/getAll',
                method: 'POST',
                withCredentials: true,
                data: {

                    "image": formData.image,

                    //"views": formData.views,

                }
            }).success(callback);
        },
        getAudioEditDetail: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'audiogallerycategory/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id

                }
            }).success(callback);
        },
        editAudioGallerySubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'audiogallerycategory/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "audiotitle": formData.audiotitle,
                    "image": formData.image,
                    "date": formData.date,
                    //"modificationTime": formData.modificationTime,
                    "status": formData.status,

                }
            }).success(callback);
        },
        userViewAll: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/getAll',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "email": formData.email,
                    "tags": formData.tags,
                    "logintype": formData.logintype,
                    "socialid": formData.socialid,
                    "contact": formData.contact,
                    "accesslevel": formData.accesslevel,
                    "address": formData.address,
                    "image": formData.image,
                    "image1": formData.image1,

                }
            }).success(callback);
        },
        deleteUserData: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData.id
                }
            }).success(callback);
        },
        userCreateSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "email": formData.email,
                    "tags": formData.tags,
                    "logintype": formData.logintype,
                    "socialid": formData.socialid,
                    "contact": formData.contact,
                    "accesslevel": formData.accesslevel,
                    "address": formData.address,
                    "image": formData.image,
                    "image1": formData.image1,
                }
            }).success(callback);
        },
        getUserEditDetail: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        editUserSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'user/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "name": formData.name,
                    "email": formData.email,
                    "tags": formData.tags,
                    "logintype": formData.logintype,
                    "socialid": formData.socialid,
                    "contact": formData.contact,
                    "accesslevel": formData.accesslevel,
                    "address": formData.address,
                    "image": formData.image,
                    "image1": formData.image1
                }
            }).success(callback);
        },
        articleViewAll: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'article/getAll',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "content": formData.content,
                    "tags": formData.tags,
                    //"modificationTime": formData.modificationTime,
                    "status": formData.status,
                    //"views": formData.views,
                }
            }).success(callback);
        },
        deleteArticleData: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'article/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData.id
                }
            }).success(callback);
        },
        articleCreateSubmit: function(formData, callback) {
            $http({
                url: adminurl + 'article/save',
                method: 'POST',
                withCredentials: true,
                data: formData
            }).success(callback);
        },
        getArticleEditDetail: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'article/getone',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        editarticleSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'article/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "name": formData.name,
                    "content": formData.content,
                    "tags": formData.tags,
                    //"modificationTime": formData.modificationTime,
                    "status": formData.status,
                    "image": formData.image
                }
            }).success(callback);
        },
        navigationViewAll: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'navigation/getAll',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "type": formData.type,
                    "iconType": formData.iconType,
                    //"order": formData.order,
                    "status": formData.status,
                    "icon": formData.icon,
                }
            }).success(callback);
        },
        deleteNavigationData: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'navigation/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData.id,
                }
            }).success(callback);
        },
        navigationCreateSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'navigation/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "type": formData.type,
                    "iconType": formData.iconType,
                    //"order": formData.order,
                    "status": formData.status,
                    "icon": formData.icon,
                    "link": formData.link
                }
            }).success(callback);
        },
        getNavigationEditDetail: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'navigation/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        editNavigationSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'navigation/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "name": formData.name,
                    "type": formData.type,
                    "iconType": formData.iconType,
                    //"order": formData.order,
                    "status": formData.status,
                    "icon": formData.icon,
                    "link": formData.link
                }
            }).success(callback);
        },
        eventsViewAll: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'event/getAll',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    "startTime": formData.startTime,
                }
            }).success(callback);
        },
        deleteEventsData: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'event/delete',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData.id,

                }
            }).success(callback);
        },
        eventCreateSubmit: function(formData, callback) {
            console.log('Navigation event create form data: ', formData);
            $http({
                url: adminurl + 'event/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "name": formData.name,
                    //  "_id": formData._id,
                    "venue": formData.venue,
                    "images": formData.images,
                    "startTime": formData.startTime,
                    "content": formData.content,
                    "endTime": formData.endTime,

                }
            }).success(callback);
        },
        getEventsEditDetail: function(id, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'event/getOne',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": id
                }
            }).success(callback);
        },
        editEventSubmit: function(formData, callback) {
            // console.log('form data: ', formData);
            $http({
                url: adminurl + 'event/save',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": formData._id,
                    "name": formData.name,
                    "venue": formData.venue,
                    "startTime": formData.startTime,
                    "content": formData.content,
                    "endTime": formData.endTime,
                }
            }).success(callback);
        },
        sortNavigation: function(navArray, callback) {
            $http({
                url: adminurl + 'navigation/sort',
                method: 'POST',
                withCredentials: true,
                data: navArray
            }).success(callback);
        },
        setDefault: function(navid, callback) {
            $http({
                url: adminurl + 'navigation/setDefault',
                method: 'POST',
                withCredentials: true,
                data: {
                    "_id": navid
                }
            }).success(callback);
        },
        makeactive: function(menuname) {
            for (var i = 0; i < navigation.length; i++) {
                if (navigation[i].name == menuname) {
                    navigation[i].classis = "active";
                } else {
                    navigation[i].classis = "";
                }
            }
            return menuname;
        },

    };
});
