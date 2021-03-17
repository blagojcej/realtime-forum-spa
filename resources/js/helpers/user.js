import Token from './token';
import AppStorage from './app_storage';

class User {
    login(data) {
        axios.post('/api/auth/login', data)
            .then((res) => this.responseAfterLogin(res))
            .catch(err => console.log(err));
    }

    responseAfterLogin(response) {
        const access_token = response.data.access_token;
        const user_name = response.data.user;
        if(Token.isValid(access_token)) {
            AppStorage.store(user_name, access_token);
            window.location = '/forum';
        }
    }

    hasToken() {
        const stored_token = AppStorage.getToken();
        if(stored_token) {
            return Token.isValid(stored_token) ? true : this.logout();
        }
        return false;
    }

    loggedIn() {
        return this.hasToken();
    }

    logout() {
        AppStorage.clear();
        window.location = '/forum';
    }

    name() {
        if(this.loggedIn()) {
            return AppStorage.getUser();
        }
    }

    id() {
        if(this.loggedIn()) {
            const payload = Token.payload(AppStorage.getToken());
            return payload.sub;
        }
    }

    own(questionUserId) {
        return this.id() == questionUserId;
    }

    admin() {
        return this.id() == 11 //user Blagojce
    }
}

export default User = new User();
