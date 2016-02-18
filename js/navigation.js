var navigationservice = angular.module('navigationservice', [])

.factory('NavigationService', function() {
  var navigation = [{
    name: "Dashboard",
    classis: "active",
    anchor: "dashboard",
    icon: "ln-chart-growth",
  },{
    name: "Theme",
    classis: "active",
    anchor: "theme",
    icon: "ln-paintbrush",
  },{
    name: "Home",
    classis: "active",
    anchor: "home",
    icon: "ln-home3",
  },{
    name: "Navigations",
    classis: "active",
    anchor: "navigation",
    icon: "ln-compass",
  },{
    name: "Login & Signup",
    classis: "active",
    anchor: "login/signup",
    icon: "ln-unlock",
  },{
    name: "Notifications",
    classis: "active",
    anchor: "notification",
    icon: "ln-bell",
  },{
    name: "Events",
    classis: "active",
    anchor: "event",
    icon: "ln-calendar2",
  },{
    name: "Blogs",
    classis: "active",
    anchor: "blog",
    icon: "ln-edit2",
  },{
    name: "Articles",
    classis: "active",
    anchor: "article",
    icon: "ln-papers",
  },{
    name: "Photo Galleries",
    classis: "active",
    anchor: "photo-gallery",
    icon: "ln-picture",
  },{
    name: "Video Galleries",
    classis: "active",
    anchor: "video-gallery",
    icon: "ln-film-play",
  },{
    name: "Contact",
    classis: "active",
    anchor: "contact",
    icon: "ln-contacts",
  },{
    name: "Search",
    classis: "active",
    anchor: "search",
    icon: "ln-magnifier",
  },{
    name: "Audio Players",
    classis: "active",
    anchor: "audio-player",
    icon: "ln-headset",
  },{
    name: "Intro Slider",
    classis: "active",
    anchor: "intro-slider",
    icon: "ln-file-image",
  },{
    name: "Social Feeds",
    classis: "active",
    anchor: "Social-eeds",
    icon: "ln-thumbs-up",
  },{
    name: "Forms",
    classis: "active",
    anchor: "forms",
    icon: "ln-register",
  },{
    name: "Users",
    classis: "active",
    anchor: "user",
    icon: "ln-users2",
  }];

  return {
    getnav: function() {
      return navigation;
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
