import StoreModule from "../module";

/**
 * Состояние пользователя
 */
class User extends StoreModule {
  initState() {
    return {
      info: {},
      waiting: false
    };
  }

  async fetchInfo() {
    const token = localStorage.getItem('token');
    this.setState({
      ...this.getState(),
      waiting: true
    })
    if (!token) return;
    const res = await fetch("/api/v1/users/self", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Token": token,
      },
    });

    const json = await res.json();
    if(json.error) {
      localStorage.removeItem('token')
      this.setState({
        ...this.getState(),
        info: {},
        waiting: false
      })
      return
    }

    this.setState({
      ...this.getState(),
      info: {
        id: json.result._id,
        name: json.result.profile.name,
        phone: json.result.profile.phone,
        email: json.result.email,
      },
      // isLogin: true,
      waiting: false
    })
  }

  // async authorize(login, password) {
  //   try {
  //     const res = await fetch("/api/v1/users/sign", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         login,
  //         password,
  //         "remember": true
  //       }),
  //     });
  //     const json = await res.json();
  //     if (json.error) throw json.error.data.issues

  //     localStorage.setItem('token', json.result.token)
  //     this.setState({
  //       ...this.getState(),
  //       isLogin: true,
  //       info: {
  //         id: json.result.user.profile._id,
  //         name: json.result.user.profile.name,
  //         phone: json.result.user.profile.phone,
  //         email: json.result.user.email,
  //       },
  //       token: json.result.token,
  //       waiting: false
  //     }, 'логин')
  //   } catch (error) {
  //     console.log(error)
  //     this.setState({
  //       ...this.getState(),
  //       error: error.map(e => e.message).join(' ')
  //     })
  //   }
  // }

  // async logout() {
  //   const res = await fetch("/api/v1/users/sign", {
  //     method: "DELETE",
  //     headers: {
  //       "Content-Type": "application/json",
  //       "X-Token": this.getState().token,
  //     }
  //   });
  //   const json = await res.json();
  //   if (json.result) {
  //     localStorage.removeItem('token');
  //     this.setState({
  //       ...this.getState(),
  //       info: {},
  //       isLogin: false
  //     })
  //   }
  // }
}

export default User;
