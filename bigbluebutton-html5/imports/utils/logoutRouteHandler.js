import Auth from '/imports/ui/services/auth';

const logoutRouteHandler = () => {
  Auth.logout()
    .then((logoutURL = `https://www.meveepro.com`) => {
      const protocolPattern = /^((http|https):\/\/)/;

      window.location.href =  `https://www.meveepro.com`
      
    });
};

export default logoutRouteHandler;
