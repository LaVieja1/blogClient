import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import Post from "../pages/Post";
import ErrorPage from "../pages/ErrorPage";

const Router = (props) => {
    const { messages, setMessages, comments, setComments } = props;

    const router = createBrowserRouter([
        {
            path: '/',
            element: <Home
                messages={messages}
                setMessages={setMessages}
                comments={comments}
                setComments={setComments}
            />,
            errorElement: <ErrorPage />,
        },
        {
            path: '/post/:id',
            element: <Post
                messages={messages}
                comments={comments}
                setComments={setComments}
            />,
            errorElement: <ErrorPage />,
        },
    ]);

    return <RouterProvider router={router} />;
}

export default Router;