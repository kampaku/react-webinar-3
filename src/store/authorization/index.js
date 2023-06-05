import StoreModule from "../module";

class Authorization extends StoreModule {


  initState() {
    const token = localStorage.getItem('token');
    return {
      token,
      isLogin: token ? true : false,
      error: '',
      waiting: false
    }
  }

  async login(login, password) {
    try {
      const res = await fetch("/api/v1/users/sign", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          login,
          password,
          "remember": true
        }),
      });
      const json = await res.json();
      if (json.error) throw json.error.data.issues

      localStorage.setItem('token', json.result.token)
      this.setState({
        ...this.getState(),
        isLogin: true,
        token: json.result.token,
        waiting: false
      }, 'логин')
    } catch (error) {
      console.log(error)
      this.setState({
        ...this.getState(),
        error: error.map(e => e.message).join(' ')
      })
    }
  }

  async logout() {
    const res = await fetch("/api/v1/users/sign", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Token": this.getState().token,
      }
    });
    const json = await res.json();
    if (json.result) {
      localStorage.removeItem('token');
      this.setState({
        ...this.getState(),
        isLogin: false,
        token: ''
      })
    }
  }
}

export default Authorization;
