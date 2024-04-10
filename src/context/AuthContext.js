import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReduce";

const INITIAL_STATE = {
    user: {
        _id: "66019ba7ed1f381f7043b2c3",
        username: "Dewapathi",
        email: "dewapathi@gmail.com",
        profilePicture: "person/2011-mens-profile.jpg",
        coverPicture: "cover1.webp",
        followers: [
            "6600405c8fd16ecf39330121"
        ],
        followings: [],
        isAdmin: false,
        createdAt: "2024-03-25T15:43:35.952Z",
        desc: "Act like an idiot who knows nothing"
    },
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);
    // console.log('11',state);
    // console.log('22',dispatch);

    return (
        <AuthContext.Provider
            value={{
                user: state.user,
                isFetching: state.isFetching,
                error: state.error,
                dispatch
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};