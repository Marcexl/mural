import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";    
import { ProgressSpinner } from 'primereact/progressspinner';
import useGoogleSheets from 'use-google-sheets';
import { Card } from 'primereact/card';
import Video from './back.mp4';
import './App.css'
function App (){

  const { data, loading, error } =  useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
  });


  if (loading) {
    return(<ProgressSpinner />)
  }

  if (error) {
    return <div>Error!</div>;
  }

  if(data){
    const suenios = data[0]['data']; 
    return(
      <div className="container-fluid">
        <div className="video-background">
          <video loop autoPlay muted className="video">
            <source src={Video} type="video/mp4"></source>
          </video>
        </div>
        <div className="suenios-container">
          {
            suenios.map((mirai, index) => {
                let idClass = Math.floor(Math.random() * 5)
                return (
                    <Card title={mirai.nombre} className={ `card-${idClass}`} key={index}>
                      <p className='m-0'>
                        "{mirai.suenio}"
                      </p>
                    </Card>
                );
              })
          }
        </div>
      </div>
    );
  }
}
export default App;
