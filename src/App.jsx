import { ProgressSpinner } from 'primereact/progressspinner';
import useGoogleSheets from 'use-google-sheets';
import { Card } from 'primereact/card';
import { Background } from "./Background";
import { updateSpreadSheet } from './services/services';
import { useRef, useState } from 'react';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Toast } from 'primereact/toast';

function App (){
  const toast = useRef(null);
  const [nombre, setNombre] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [visible, setVisible] = useState(false);
  const { data, loading, error, refetch } =  useGoogleSheets({
    apiKey: process.env.REACT_APP_GOOGLE_API_KEY,
    sheetId: process.env.REACT_APP_GOOGLE_SHEETS_ID,
  });
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataString = `${nombre},${mensaje}`;
    if(nombre !== '' && mensaje !== ''){
      try {
        
        const response = await updateSpreadSheet(dataString);
        console.log(response);
        toast.current.show({severity:'success', summary: 'Vamos!', detail:'Gracias por enviar tu mensaje', life: 3000});
        setVisible(false);
        setTimeout( ()=>{
          refetch();
        },2000);
      } catch (error) {
        
        console.error('Error al enviar los datos:', error);
      }
    }
    else
    {
      toast.current.show({severity:'error', summary: 'Ups!', detail:'No puedes enviar mensaje vacio!', life: 3000});
    }
  }

  if (loading) {
    return(
      <Background>
        <div className="loader"><ProgressSpinner /></div>
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
        suenios.map((res, index) => {
          newincrement = increment+newincrement
          let idClass = Math.floor(Math.random() * 7)
          return (
              <Card title={`${res.mensaje}`} className={ `card-${idClass} z-2`} style={{animationDelay: `${newincrement}s`}} key={index}>
                <p className='mt-0 mb-0'>
                  {res.nombre}
                </p>
              </Card>
          );
        })
      }
      <Button icon="pi pi-plus" className="fixed right-0 bottom-0 mr-3 mb-3 z-3 text-4xl" rounded aria-label="Filter" severity="info" onClick={() => setVisible(true)} />
      <Dialog header="Deci lo que quieras..." visible={visible} style={{ width: '20vw' }} onHide={() => setVisible(false)}>
          <p className="m-0">
          <form onSubmit={handleSubmit} className='w-full flex flex-column gap-3'>
            <InputText value={nombre} onChange={(e) => setNombre(e.target.value)}
              placeholder="Nombre"
            />
            <InputTextarea value={mensaje} onChange={(e) => setMensaje(e.target.value)} rows={5} cols={30} placeholder="Mensaje" />
            <Button label="Enviar" type="submit" severity="info" ></Button>
          </form>
          </p>
      </Dialog>
      <Toast ref={toast} />
    </Background>
  )}
}
export default App;
