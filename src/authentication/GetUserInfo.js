function getUser(token) {
    return new Promise((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      if (process.env.NODE_ENV === "development") {
        var target_url = process.env.REACT_APP_DEV_URL;
        xhr.open("GET", `${target_url}/getuser`, true);
      }
      else {
        // var target_url = process.env.REACT_APP_PROD_URL;
        xhr.open("GET", `getuser`, true);
      }


      // add authorization header
      xhr.setRequestHeader("Authorization", token);
      xhr.send();
      xhr.onreadystatechange = function () {
        if (xhr.status == 200 && xhr.readyState == 4) {
          var user = xhr.responseText;
          user = JSON.parse(user);
          resolve(user);
        }
        if (xhr.status == 400 && xhr.readyState == 4) {
          reject("Error");
        }
      };
    }
  
    );
  
  }
  
  export default getUser;