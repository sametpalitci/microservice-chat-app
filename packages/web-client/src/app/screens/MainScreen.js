import {useState} from 'react';
import swal from 'sweetalert';
import {useCookies} from 'react-cookie';
import {useHistory} from 'react-router-dom';

import {checkFields, fetchDataFromAPI} from "../utils";

const MainScreen = () => {
    const history = useHistory();

    const [cookies, setCookie] = useCookies(['user']);
    const [getLoginInputs, setLoginInputs] = useState(
        {
            email: "",
            password: ""
        }
    );
    const [getRegisterInputs, setRegisterInputs] = useState({
        email: "",
        password: "",
        passwordConfirm: ""
    });

    const loginEntry = async (e) => {
        e.preventDefault();
        const {email, password} = getLoginInputs;
        if (!checkFields(email, password)) {
            swal("This fields can not be empty");
        } else {
            const passToAPI = await fetchDataFromAPI('/users/graphql', {
                query: `mutation { login(email:"${email}",password:"${password}"){ token } }`
            });
            if (passToAPI.errors) {
                swal(passToAPI.errors[0].message);
            } else {
                swal('successful!')
                setCookie('token', passToAPI.data.login.token, {path: '/'});
                history.push('/chat-rooms');
            }
        }
    }
    const registerEntry = async (e) => {
        e.preventDefault();
        const {email, password, passwordConfirm} = getRegisterInputs;
        if (!checkFields(email, password, passwordConfirm)) {
            swal("This fields can not be empty");
        } else {
            if(password === passwordConfirm){
                const passToAPI = await fetchDataFromAPI('/users/graphql', {
                    query: `mutation { register(email:"${email}",password:"${password}"){ token } }`
                });
                if (passToAPI.errors) {
                    swal(passToAPI.errors[0].message);
                } else {
                    swal('successful, you can sign in now!')
                    setCookie('token', passToAPI.data.register.token, {path: '/'});
                    setRegisterInputs({
                        email: "",
                        password: "",
                        passwordConfirm: ""
                    })
                }
            } else {
                swal("The passwords do not match");
            }
        }
    }

    return (
        <div className={"container"}>
            <div className="row mt-5">

                <h2 className={"text-center my-5"}>Hello Chat App!</h2>
                <div className="col-lg-2"></div>
                <div className={"col-lg-4"}>
                    <div className="card ">
                        <div className="card-header">
                            LOGIN
                        </div>
                        <div className="card-body">
                            <form onSubmit={(e) => loginEntry(e)}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        value={getLoginInputs.email}
                                        onChange={(e) => setLoginInputs({...getLoginInputs, email: e.target.value})}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={getLoginInputs.password}
                                        onChange={(e) => setLoginInputs({...getLoginInputs, password: e.target.value})}
                                    />
                                </div>
                                <button type="submit" className="btn btn-primary mt-4 w-100"
                                        onClick={(e) => loginEntry(e)}>LOGIN
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className={"col-lg-4"}>
                    <div className="card ">
                        <div className="card-header">
                            REGISTER
                        </div>
                        <div className="card-body">
                            <form onSubmit={(e) => registerEntry(e)}>
                                <div className="form-group">
                                    <label htmlFor="exampleInputEmail1">Email address</label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder="Enter email"
                                        value={getRegisterInputs.email}
                                        onChange={(e) => setRegisterInputs({
                                            ...getRegisterInputs,
                                            email: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={getRegisterInputs.password}
                                        onChange={(e) => setRegisterInputs({
                                            ...getRegisterInputs,
                                            password: e.target.value
                                        })}
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="exampleInputPassword1">Confirm Password</label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        value={getRegisterInputs.passwordConfirm}
                                        onChange={(e) => setRegisterInputs({
                                            ...getRegisterInputs,
                                            passwordConfirm: e.target.value
                                        })}
                                    />
                                </div>
                                <button type="submit" onClick={(e) => registerEntry(e)}
                                        className="btn btn-primary mt-4 w-100">Register
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="col-lg-2"></div>
                <h5 className={"mt-5 text-center"} target={"_blank"}>Github ❤
                    <a href="http://github.com/sametpalitci" className={"text-dark"}>sametpalitci</a>
                </h5>
            </div>
        </div>
    );
}

export {MainScreen};