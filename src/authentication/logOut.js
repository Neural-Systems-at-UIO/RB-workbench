function logUserOut(e) {
    e.stopPropagation()
    // clear cookies from https://iam.ebrains.eu
    // redirect to https://iam.ebrains.eu
    window.location.href = `https://iam.ebrains.eu/auth/realms/hbp/protocol/openid-connect/logout?redirect_uri=${process.env.REACT_APP_DEV_URL}` ;
}

export default logUserOut;