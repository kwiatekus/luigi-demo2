
var navNodesProviderFn = (context) => {
  return new Promise(function (resolve) {
    $.get( "https://navigation-node-srv.us-east.stage.cf.yaas.io/api/navigation", function( data ) {
      $.each( data, (index, node )=>{
        node.context={
          title : node.label
        }
      });
      resolve(data);
    });
  });
};

Luigi.setConfig({
  navigation: {
    nodes: () => [
      {
        pathSegment: 'home',
        label: 'Home',
        context: {
          profile : JSON.parse(localStorage.getItem('luigi.auth')).profile
        },
        children: [
          {
            pathSegment: 'hw',
            label: 'Home',
            viewUrl: '/assets/hello.html',
            hideFromNav: true,
          },
          {
            pathSegment: 'vue',
            label: 'Tractor OverVue',
            viewUrl: 'https://luigi-module-vue.us-east.stage.cf.yaas.io',
            children: [{
                pathSegment: ':id',
                label: 'details',
                viewUrl: 'https://luigi-module-vue.us-east.stage.cf.yaas.io/:id'
              }
            ]
          },
          {
            pathSegment: 'sapui5',
            label: 'SAP Tractor Editor',
            viewUrl: 'https://luigidemosapui5-i303803trial.dispatcher.hanatrial.ondemand.com'
          },
          {
            pathSegment: 'lazy',
            label: 'Lazy Loaded',
            children : navNodesProviderFn
          },
          {
            pathSegment: 'admin',
            label: 'Administration',
            viewUrl: '/assets/admin.html'
          }
        ]
      }
    ],
    nodeAccessibilityResolver:  (nodeToCheckPermissionFor, parentNode, currentContext) => {
      const admins = [
        'luigi.master1234@gmail.com'
      ];
      if(nodeToCheckPermissionFor.pathSegment === 'admin' && currentContext) {
        return admins.includes(currentContext.profile.email)
      }
      return true;
    }
  },
  settings: {
    // backdropDisabled : true
  },
  routing: {
    // useHashRouting: true
  },
  auth: {
    use: 'openIdConnect',
    openIdConnect: {
      authority: 'https://accounts.google.com',
      client_id: '478154255287-8kr86s42k0kqjsmb427j3sq45ed2cl1p.apps.googleusercontent.com',
      scope:
        'openid email',
      loadUserInfo: true,
      logoutFn: (settings, authData, logoutCallback) => {
        localStorage.clear();
        logoutCallback();
        window.location.href = "https://accounts.google.com/Logout?continue=https://appengine.google.com/_ah/logout?continue=https://tractors.us-east.stage.cf.yaas.io/logout.html";
      },
      nonceFn: () => {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

        for (var i = 0; i < 5; i++)
          text += possible.charAt(Math.floor(Math.random() * possible.length));

        return text;
      }
    },
    events: {
      onAuthSuccessful: data => {
        console.log('onAuthSuccessfull', data)
      }
    }
  }
});
