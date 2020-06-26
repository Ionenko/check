const Auth = {
  isAuthenticated: false,
  authenticate(){
    this.isAuthenticated = true;
    return new Promise(resolve => {
      setTimeout(() =>{
        resolve(this.isAuthenticated)
      }, 800);
    });
  }
};

export default Auth;