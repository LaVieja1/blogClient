import { useState, useEffect } from 'react';
import './App.css'
import Router from './components/Router';

function App() {
  const [messages, setMessages] = useState([]);
  const [comments, setComments] = useState();

  //get comments from api
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchCommentInfo = async () => {
    try {
      const res = await fetch('https://top-blogapi.onrender.com/api/comments');
      const commentsData = await res.json();

      setComments(commentsData);
    } catch (error) {
      console.error('Hubo un error con la operación fetch:', error);
      setError('true');
    }

    setLoading(false);
  }

  useEffect(() => {
    fetchCommentInfo();
  }, []);

  //display error and loading for api call
  if (error) return (
    <div>
      <p>Hubo un error de conexión</p>
    </div>
  );

  if (loading) return <p>Cargando...</p>;

  //send props
  return (
    <div>
      <Router
        messages={messages}
        setMessages={setMessages}
        comments={comments}
        setComments={setComments}
      />
    </div>
  );
}

export default App;