  
  function EBRAINSLoginPage() {
    let URL =  process.env.REACT_APP_OIDC_CLIENT_REDIRECT_URL;
    let oidc_client_id = process.env.REACT_APP_WORKBENCH_OIDC_CLIENT_ID;
    let oidc_redirect_uri = `${URL}/app`;
    let state = {};
    for (let setting of location.search.substring(1).split("&")) {
      let [key, value] = setting.split("=");
      state[key] = value;
    }
    location.href = `https://iam.ebrains.eu/auth/realms/hbp/protocol/openid-connect/auth?response_type=code&login=true&client_id=${oidc_client_id}&redirect_uri=${oidc_redirect_uri}&state=${encodeURIComponent(
      JSON.stringify(state)
    )}`;
    return (
      <>
  <head>
    <title>Redirect page</title>
    <meta charset="UTF-8" />
  </head>
  <body>
    Redirecting to IAM...
  </body>
  </>
    );