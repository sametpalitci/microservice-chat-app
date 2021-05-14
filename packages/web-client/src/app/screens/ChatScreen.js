import {useState, useEffect} from 'react';
import io from 'socket.io-client';
import {API_GATEWAY} from '../config'
import AuthProvider from '../components/AuthProvider';
import {checkFields, fetchDataFromAPI} from "../utils";
import {useCookies} from "react-cookie";
import swal from "sweetalert";

const ChatScreen = () => {
    const socket = io.connect(`${API_GATEWAY}`, {
        withCredentials: true,
        transports: ['websocket', 'polling', 'flashsocket'],
        path: '/socket.io'
    });
    const [cookies, setCookie] = useCookies(['user']);

    const [getMessage, setMessage] = useState("");
    const [clearToken, setClearToken] = useState(false);
    const [chatData, setChatData] = useState([]);
    const [getUserName, setUserName] = useState("");
    const [getAllGroups, setAllGroups] = useState([]);
    const [getRoom, setRoom] = useState("1");
    const [getShowGroup, setShowGroup] = useState(false);
    const [getShowExploreGroup, setShowExploreGroup] = useState(false);
    const [getShowGroupName, setShowGroupName] = useState("Welcome to our chat app!");
    const [getNewGroupName, setNewGroupName] = useState("");

    const getGroups = async () => {
        const passToAPI = await fetchDataFromAPI('/chat-group/graphql', {
            query: `{ getGroup { name, id } }`
        }, cookies.token);
        setAllGroups(passToAPI.data.getGroup)
    }
    const sentMessage = (e) => {
        e.preventDefault();
        socket.emit('sendMessage', {name: getUserName, room: getRoom, message: getMessage});
        setMessage("");
    }
    const roomChange = async (e, id, name) => {
        e.preventDefault();
        await leaveRoom(getRoom);
        await loginRoom(id);
        await setRoom(id);
        setChatData([]);
        setShowGroupName(name)
    }
    const addNewGroup = async (e) => {
        e.preventDefault();
        if (!checkFields(getNewGroupName)) {
            swal("The group name does not empty!");
        } else {
            const createGroup = await fetchDataFromAPI('/chat-group/graphql', {
                query: `mutation{addGroup(name:"${getNewGroupName}"){name, id}}`
            }, cookies.token);
            const joinGroup = await fetchDataFromAPI('/chat-group/graphql', {
                query: `mutation{joinGroup(groupId:${Number(createGroup.data.addGroup.id)}){groupId}}`
            }, cookies.token);
            getGroups();
            setNewGroupName("")
        }
    }
    const leaveRoom = (room) => {
        socket.emit('leaveRoom', {room: room});
    }
    const loginRoom = (id) => {
        socket.emit('loginRoom', {room: id});
    }
    useEffect(() => {
        getGroups();
    }, []);
    useEffect(() => {
        socket.on('message', (request) => {
            setChatData(oldArray => [...oldArray, request]);
        });
    });
    return (
        <AuthProvider clearToken={clearToken} userNameSelector={(val) => setUserName(val)}>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-2">
                        <div className={"d-flex align-items-center justify-content-center flex-column"}>
                            <h2>Chat Rooms</h2>
                            {
                                getAllGroups.map((n, key) => {
                                    return <button key={n.id} className={"btn mb-2"}
                                                   onClick={(e) => roomChange(e, n.id, n.name)}>{n.name}</button>
                                })
                            }
                            <button className={"btn btn-primary mb-2"} onClick={() => setShowGroup(!getShowGroup)}>+</button>
                            {getShowGroup &&
                            <form onSubmit={(e) => addNewGroup(e)}>
                                <input
                                    type={"text"}
                                    className="form-control"
                                    placeholder="Group Name"
                                    value={getNewGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                />
                                <button className={"btn btn-warning w-100 mt-2"} onClick={(e) => addNewGroup(e)}>Add
                                </button>
                            </form>
                            }
                            <button className={"btn btn-warning mb-2"} onClick={()=>setShowExploreGroup(!getShowExploreGroup)}>Explore</button>
                            {getShowExploreGroup &&
                                 <>
                                     <p>EXPLORE</p>
                                    <button className={"btn mb-2"}>we şflaksd</button>
                                     <p>/EXPLORE</p>
                                 </>
                            }
                            <button className={"btn btn-danger mb-2 mt-2"} onClick={() => setClearToken(true)}>Sign Out
                            </button>
                        </div>
                    </div>
                    <div className="col-md-8">
                        <div className="card">
                            <div className="card-header">Chat * {getShowGroupName}</div>
                            <div className="card-body">
                                {chatData.map(({name, message}, key) => {
                                    return <div key={key}>
                                        <h4 className="m-0 p-0 float-right">{message} </h4><small>{name}</small>
                                    </div>
                                })}
                            </div>
                            <div className="card-footer fixed-bottom bottom-0">
                                <form action="">
                                    <div className="input-group input-group-sm mb-3">
                                        <input
                                            type="text"
                                            className="form-control"
                                            placeholder="message"
                                            value={getMessage}
                                            onChange={(e) => setMessage(e.target.value)}
                                        />
                                        <div className="input-group-append">
                                            <button className="btn btn-primary" onClick={(e) => sentMessage(e)}>Sent
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2"></div>
                </div>
            </div>
        </AuthProvider>
    );
}

export {ChatScreen};