function Personaje ({
    nombre, 
    descripcion, 
    imagen, 
    mostrarMas, 
    cambiarMostrarMas, 
    agregado,
    alternarAgregado,
    colorFondo,
    eliminar,
    editar
    }){
    return(
        <div style={{
            backgroundColor: colorFondo || 'lavenderblush',
            border: agregado ? '5px solid deeppink' : '2px solid white',
            padding: '20px',
            margin: '10px',
            borderRadius: '10px',
            width: '25%',
            height: 'auto',
            textAlign: 'center',
            display: 'inline-block',
        }}>
            <img 
                src={imagen} 
                alt={nombre} 
                style={{ 
                    width: '100%',
                    height: '350px', 
                    borderRadius: '8px'
                }} 
            />
             <h2>
                {agregado && <span style={{color: 'deeppink'}}>❤️</span> } 
                {nombre}
             </h2>

            {mostrarMas && <p>{descripcion} </p>}

            <button 
                onClick={cambiarMostrarMas} 
                style={{
                backgroundColor: mostrarMas ? 'hotpink' : 'white', 
                border: 'none',
                color: 'black', 
                padding: '10px 20px',
                marginBottom: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
                }}>
                {mostrarMas ? 'Ver menos' : 'Ver mas'}
            </button>
            <br/>
            <button onClick={editar} style={{
                backgroundColor: 'orange',
                border: 'none',
                color: 'white',
                padding: '8px 16px',
                marginTop: '10px',
                borderRadius: '5px',
                cursor: 'pointer',

            }}>
                Editar
            </button>
            <br/>
            <button onClick={eliminar} style={{
                backgroundColor: 'crimson',
                border: 'none',
                color: 'white',
                padding: '8px 16px',
                marginTop: '10px',
                borderRadius: '5px',
                cursor: 'pointer',
            }}>
                Eliminar
            </button>
            <br/>
            <button
                onClick={alternarAgregado}
                style={{
                    backgroundColor: agregado ? 'hotpink' : 'gray',
                    color: 'white',
                    padding: '8px 15px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                }}>
                {agregado ? 'agregado ♥' : 'agregar'}
            </button>
        </div>
    );
}

export default Personaje;