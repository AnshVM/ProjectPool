import React from 'react'
import { Button, Text } from "@chakra-ui/react"
import { Link,useHistory } from 'react-router-dom'
import { useSelector,useDispatch } from 'react-redux'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import axios from 'axios'
import {login} from '../loginSlice'


function Right() {
    const isLoggedIn = useSelector((state) => state.loginState.isLoggedIn);
    const user = useSelector((state) => state.loginState.user);
    const dispatch = useDispatch();
    const history = useHistory();

    console.log(user)

    const handleLogout = () => {
        axios.get('/api/user/logout')
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err))
        dispatch(login({isLoggedIn:false,user:{}}))
        history.push('/')
    }

    if (isLoggedIn) {
        return (
            <div className="flex flex-row items-center">
                <Button onClick={handleLogout} className="mr-3" colorScheme="teal" variant="ghost">Logout</Button>
                <Link to={"/profile/"+user._id}>
                    <AccountCircleIcon />
                </Link>
                <Text color="teal"><p className="font-semibold">{user.username}</p></Text>
            </div>
        )
    }
    else {
        return (
            <div className="right text-sm">
                <Link to="/login"><Button className="mr-2" colorScheme="teal" variant="outline">Login</Button></Link>
                <Link to="/signup"><Button colorScheme="teal">Signup</Button></Link>
            </div>
        )
    }
}

export default function topbar() {

    return (
        <div className="bg-white flex flex-row justify-between items-center py-6 px-5 lg:px-56 md:px-32 sm:px-5">
            <Link to="/"><Text color="teal" className="font-extrabold text-2xl">ProjectPool</Text></Link>
            <Right />
        </div>
    )
}
