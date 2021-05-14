import react, {useEffect} from 'react';
import {useCookies} from "react-cookie";
import {useHistory} from 'react-router-dom';
import {SECRET_KEY} from "../config";
import {verify} from 'jsonwebtoken';

const AuthProvider = (props) => {
    const history = useHistory();
    const [cookies, setCookie] = useCookies(['user']);
    const verifyAndCreateName = (token) => {
        try {
            const verifyToken = verify(token, SECRET_KEY)
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
    }, [props]);
    return props.children;
};

export default AuthProvider;