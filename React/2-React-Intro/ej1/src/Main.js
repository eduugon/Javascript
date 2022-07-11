
function Tarjeta(props) {
    return(
       <div>
        <p>
            {props.peli.titulo}
        </p>
        <p>
            {props.sinopsis}
        </p>
        <img src={props.peli.cartel} alt={props.peli.titulo}></img>
       </div> 
    );
  }

function Main(props) {


    return(
        <main>
            {props.pelis.map((elem => {
        return <Tarjeta peli={elem}/>
         }))}
        </main>
    );
  }
  
  export default Main;