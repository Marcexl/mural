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
    return(<div className="loader"><ProgressSpinner /></div>)
  }

  if (error) {
    return <div>Error!</div>;
  }
  let increment = 0.2;
  if(data){
    const suenios = data[0]['data']; 
    return(
    <>
      <div className="container-fluid">
        <div className="video-background">
          <video loop autoPlay muted className="video">
            <source src={Video} type="video/mp4"></source>
          </video>
        </div>
        <div className="banner">
          <h6>MIRAI HOMBU</h6>
          <h2>LXS CHICXS HACEMOS HISTORIA</h2>
        </div>
        <div className="suenios-container">
          {
            suenios.map((mirai, index) => {
                increment = increment+increment
                let idClass = Math.floor(Math.random() * 7)
                return (
                    <Card title={mirai.suenio} className={ `card-${idClass}`} style={{animationDelay: `${increment}`}} key={index}>
                      <p className='m-0'>
                        {mirai.nombre}
                      </p>
                    </Card>
                );
              })
          }
        </div>
      </div>
      </>
    );
  }
}
export default App;
