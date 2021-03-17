class Token {
    isValid(token) {
        const payload = this.payload(token);
        if(payload) {
            return payload.iss == 'http://127.0.0.1:8000/api/auth/login' || 'http://127.0.0.1:8000/api/auth/signup' || 'http://real-time.forum/api/auth/login' || 'http://real-time.forum/api/auth/signup' ? true : false;
        }

        return false;
    }

    payload(token) {
        const payload = token.split('.')[1];

        return this.decode(payload);
    }

    decode(payload) {
        if(this.isBase64(payload)) {
            return JSON.parse(atob(payload));
        } else {
            return false;
        }
    }

    isBase64(payload) {
        try {
            return btoa(atob(payload)).replace(/=/g, "") == payload;
        } catch(err) {
            return false;
        }
    }
}

export default Token = new Token();
