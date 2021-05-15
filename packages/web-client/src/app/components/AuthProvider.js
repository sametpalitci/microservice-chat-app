import react, {useEffect} from 'react';
import {useCookies} from "react-cookie";
import {useHistory} from 'react-router-dom';
import {SECRET_KEY} from "../config";
import {verify} from 'jsonwebtoken';

const AuthProvider = (props) => {
    const history = useHistory();
    const [cookies, setCookie, removeCookie] = useCookies(['user']);
    const verifyAndCreateName = (token) => {
        try {
            const verifyToken = verify(token, SECRET_KEY)
            props.userIdSelector(verifyToken.id);
            return verifyToken.email.match(/^([^@]*)@/)[1];
        } catch (e) {
            history.push('/');
        }
    }
    useEffect(() => {
        if (!cookies.token) {
            history.push('/');
        } else {
            props.userNameSelector(verifyAndCreateName(cookies.token));
        }
        if (props.clearToken) {
            removeCookie('token');
            history.push('/');
        }
    }, [props]);
    return props.children;
};

export default AuthProvider;