import Auth from '/imports/ui/services/auth';

const logoutRouteHandler = () => {
  Auth.logout()
    .then((logoutURL = window.location.origin) => {
      const protocolPattern = /^((http|https):\/\/)/;

      window.location.href =
        protocolPattern.test(logoutURL) ?
          logoutURL :
          `https://www.meveepro.com`;
    });
};

export default logoutRouteHandler;
