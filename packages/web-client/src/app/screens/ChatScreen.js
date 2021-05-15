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
    const [getUserId, setUserId] = useState(0);
    const [getAllGroups, setAllGroups] = useState([]);
    const [getRoom, setRoom] = useState("1");
    const [getShowGroup, setShowGroup] = useState(false);
    const [getShowExploreGroup, setShowExploreGroup] = useState(false);
    const [getExploreGroup, setExploreGroup] = useState([]);
    const [getShowGroupName, setShowGroupName] = useState("Welcome to our chat app!");
    const [getNewGroupName, setNewGroupName] = useState("");

    const getGroups = async () => {
        const passToAPI = await fetchDataFromAPI('/chat-group/graphql', {
            query: `{ getGroup { name, id } }`
        }, cookies.token);
        setAllGroups(passToAPI.data.getGroup);

        const passToAPIExplore = await fetchDataFromAPI('/chat-group/graphql', {
            query: `{ getExploreGroup { name, id } }`
        }, cookies.token);
        setExploreGroup(passToAPIExplore.data.getExploreGroup);

    }
    const sentMessage = (e) => {
        e.preventDefault();
        socket.emit('sendMessage', {name: getUserName, room: getRoom, message: getMessage, userId: getUserId});
        setMessage("");
    }
    const roomChange = async (e, id, name) => {
        e.preventDefault();
        await leaveRoom(getRoom);
        await loginRoom(id);
        await setRoom(id);
        setChatData([]);
        setShowGroupName(name);

        await loadMessages(id);
    }
    const loadMessages = (id) => {
        socket.emit('loadAllMessages', {room: id});
        socket.on('loadAllMessage', (request) => {
            setChatData(request)
        });
    }
    const addNewGroup = async (e) => {
        e.preventDefault();
        if (!checkFields(getNewGroupName)) {
            swal("The group name does not empty!");
        } else {
            const createGroup = await fetchDataFromAPI('/chat-group/graphql', {
                query: `mutation{addGroup(name:"${getNewGroupName}"){name, id}}`
            }, cookies.token);
            await fetchDataFromAPI('/chat-group/graphql', {
                query: `mutation{joinGroup(groupId:${Number(createGroup.data.addGroup.id)}){groupId}}`
            }, cookies.token);
            getGroups();
            setNewGroupName("")
        }
    }
    const joinGroup = async (e, id, name) => {
        e.preventDefault();
        await fetchDataFromAPI('/chat-group/graphql', {
            query: `mutation{joinGroup(groupId:${id}){groupId}}`
        }, cookies.token);
        getGroups();
    }
    const leaveGroup = async (e, id) => {
        e.preventDefault();
        const _leaveGroup = await fetchDataFromAPI('/chat-group/graphql', {
            query: `mutation{leaveGroup(groupId:${id}){groupId}}`
        }, cookies.token);
        getGroups();
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
        <AuthProvider clearToken={clearToken} userNameSelector={(val) => setUserName(val)}
                      userIdSelector={(val) => setUserId(val)}>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-2">
                        <div className={"d-flex align-items-center justify-content-center flex-column"}>
                            <h2>Chat Rooms</h2>
                            {
                                getAllGroups.map((n, key) => {
                                    return <>
                                        <button key={n.id} className={"btn "}
                                                onClick={(e) => roomChange(e, n.id, n.name)}>{n.name}</button>
                                        <button className={"p-0 m-0 btn blockquote-footer"}
                                                onClick={(e) => leaveGroup(e, n.id, n.name)}><small
                                            className={"p-0 m-0 text-muted"}>LEAVE GROUP</small></button>
                                    </>
                                })
                            }
                            <button className={"btn btn-primary my-2"} onClick={() => setShowGroup(!getShowGroup)}>+
                            </button>
                            {getShowGroup &&
                            <form onSubmit={(e) => addNewGroup(e)}>
                                <input
                                    type={"text"}
                                    className="form-control"
                                    placeholder="Group Name"
                                    value={getNewGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                />
                                <button className={"btn btn-warning w-100 my-2 "} onClick={(e) => addNewGroup(e)}>Add
                                </button>
                            </form>
                            }
                            <button className={"btn btn-warning mb-2"}
                                    onClick={() => setShowExploreGroup(!getShowExploreGroup)}>Explore
                            </button>
                            <p>EXPLORE</p>
                            {getShowExploreGroup &&
                            getExploreGroup.map((group) => {
                                return <button className={"btn mb-2 btn-success"}
                                               onClick={(e) => joinGroup(e, group.id, group.name)}>{group.name}</button>
                            })
                            }
                            <p>/EXPLORE</p>
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