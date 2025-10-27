import {createBrowserRouter} from "react-router-dom"
import paths from "./paths"
import PostsScreen from "../screens/posts"
import LoginScreen from "../screens/login"
import RegisterScreen from "../screens/register"

const routes = createBrowserRouter([
    {
        path: paths.home,
        element: <PostsScreen/>
    },
    {
        path: paths.login,
        element: <LoginScreen/>
    },
    {
        path: paths.register,
        element: <RegisterScreen/>
    }
])

export default routes