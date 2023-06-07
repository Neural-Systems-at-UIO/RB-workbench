function logUserOut(e) {
    e.stopPropagation()
    // clear cookies from https://iam.ebrains.eu
    // redirect to https://iam.ebrains.eu
    window.location.href = `https://iam.ebrains.eu/auth/realms/hbp/protocol/openid-connect/logout?redirect_uri=${process.env.REACT_APP_OIDC_CLIENT_REDIRECT_URL}` ;
}

export default logUserOut;