import { useEffect , useState} from 'react';
import axios from 'axios';
import './App.css'
import Resources from './Resources'



function App() {
  const [data, setData] = useState([]);
  const [isLoading, setLoading] = useState(true);
  useEffect(() => {
    axios.get('https://localhost:44370/api/resources')
      .then(response => {
        setData(response.data);
        setLoading(false)
      })
      .catch(error => {
        console.error(error);
        setLoading(false)
      });
  }, []);

  return (
    <div >

    {!isLoading && <Resources resources={data}/>}
    
    </div>
      
       
  )
}

export default App
