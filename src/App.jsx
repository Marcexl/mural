import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";    
import { ProgressSpinner } from 'primereact/progressspinner';
import useGoogleSheets from 'use-google-sheets';
import { Card } from 'primereact/card';
import Video from './back.mp4';
import './App.css'
import { useEffect } from "react";
import { Background } from "./Background";
function App (){

  const { data, loading, error, refetch } =  useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
  });

 
    // setInterval(() => {
    //   refetch()
    // }, 10000)
 


  if (loading) {
    return(
      <Background>
        <ProgressSpinner />
      </Background>
    )
  }

  if (error) {
    return <div>Error!</div>;
  }
  let increment    = 0.2;
  let newincrement = 0;

  if(data){
    const suenios = data[0]['data']; 
    return(
    <Background>
          {
            suenios.map((mirai, index) => {
              newincrement = increment+newincrement
              let idClass = Math.floor(Math.random() * 7)
              console.log(idClass)
              return (
                  <Card title={mirai.suenio} className={ `card-${idClass}`} style={{animationDelay: `${newincrement}s`}} key={index}>
                    <p className='m-0'>
                      {mirai.nombre}
                    </p>
                  </Card>
              );
            })
          }
        </Background>
  )}
}
export default App;
