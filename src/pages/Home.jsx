import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../components/Header";
import '../App.css';

function Home(props) {
    const { messages, setMessages, comments, setComments } = props;

    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchInfo = async () => {
        try {
            const [apiPosts, apiComments] = await Promise.all([
                fetch('https://top-blogapi.onrender.com/api/published', {

                }),
                fetch('https://top-blogapi.onrender.com/api/comments')
            ]);

            const messageData = await apiPosts.json();
            const commentData = await apiComments.json();

            setMessages(messageData);
            setComments(commentData);
        } catch (error) {
            console.error('Hubo un problema con la operación fetch:', error);
            setError("true");
        }

        setLoading(false);
    }

    useEffect(() => {
        fetchInfo();
    }, []);

    //display error and loading for api call
    if (error) return (
        <div>
            <p>Ocurrio un error de conexión</p>
        </div>
    )

    if (loading) return <p>Cargando...</p>

    return (
        <div>
            <div className="headerContainer">
                <Header />
            </div>
            <div className="postContainer">
                <div className="postCard">
                    {messages.map((index) => {
                        let date = new Date(index.timestamp).toLocaleString();
                        const postComments = comments.filter((comment) => comment.posts_id == index._id).length;
                        let image = index.image;
                        let url = '';
                        if (image) {
                            url = `https://top-blogapi.onrender.com/uploads/${index.image}`;
                        }
                        if (image) {
                            return (
                                <div key={index._id} className="post">
                                    <Link to={`post/${index._id}`} state={index._id}>
                                        <div id={index._id} className="card" >
                                            <h2 className="homeTitle">{index.title}</h2>
                                            <img className="imgHome" src={url}></img>
                                            <div className="commentContainer">
                                                <div>
                                                    <p>{date}</p>
                                                </div>
                                                <div>
                                                    <div className="commentPadding">
                                                        <p>Comentarios: {postComments}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        } else {
                            return (
                                <div key={index._id} className="post">
                                    <Link to={`post/${index._id}`} state={index._id}>
                                        <div id={index._id} className="card" >
                                            <h2 className="homeTitle2">{index.title}</h2>
                                            <div className="commentContainer">
                                                <div className="dateContainer">
                                                    <p>{date}</p>
                                                </div>
                                                <div className="commentPadding">
                                                    <p>Comentarios: {postComments}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            );
                        }
                    })}
                </div>
            </div>
        </div>
    );
}

export default Home;