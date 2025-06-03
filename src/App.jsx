import {useState, useEffect } from "react";
import Personaje from "./components/Personaje";



function App() {
  const [mostrarMas, setMostrarMas] = useState({});
  const [personajeEnEdicion, setPersonajeEnEdicion] = useState(null);
  const [agregado, setAgregado] = useState([]);
  const [eliminados, setEliminados] = useState(() => {
    const guardados = localStorage.getItem("eliminados");
    return guardados ? JSON.parse(guardados) : [];
  });
  const [personajes, setPersonajes] = useState(() => {
    try {
      const guardados = localStorage.getItem("personajes");
      return guardados && guardados !== "undefined" ? JSON.parse(guardados) : [
        { 
          id: 1,
          nombre: "Rose",
          descripcion: "Una lider amorosa y poderosa del universo de Steven Universe",
          imagen: "src/assets/RoseQuartz.jpg",
          color: "pink"
        },
        {
          id: 2, 
          nombre: "Garnet",
          descripcion: "Una fusión de dos gemas que representa la fuerza y la unidad",
          imagen: "src/assets/garnet.jpg",
          color: "lavender"
        },
        {
          id: 3,
          nombre: "Amatista",
          descripcion: "Una gema rebelde y divertida que siempre está lista para la aventura",
          imagen: "src/assets/amatista.jpg",
          color: "plum"
        },
        {
          id: 4,
          nombre: "Perla",
          descripcion: "Una gema inteligente y organizada que siempre busca la perfección",
          imagen: "src/assets/perla.jpg",
          color: "lightblue"
        }
      ];
    } catch (e) {
      console.error("Error al cargar los personajes desde localStorage", e);
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem("personajes", JSON.stringify(personajes));
  }, [personajes])

  useEffect(() => {
    localStorage.setItem('eliminados', JSON.stringify(eliminados));
  }, [eliminados]);

  const alternarAgregado = (id) => {
    setAgregado((prev) => 
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  const cambiarMostrarMas = (id) => {
    setMostrarMas(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const [nuevoPersonaje, setNuevoPersonaje] = useState({
    nombre: "",
    descripcion: "",
    imagen: "",
    color: "#ffe4f0"
  });

  const agregarNuevoPersonaje = () => {
    if (!nuevoPersonaje.nombre || !nuevoPersonaje.descripcion || !nuevoPersonaje.imagen || !nuevoPersonaje.color){
      alert("Completa todos los campos");
      return;
    }

    const nuevo = {
      ...nuevoPersonaje,
      id: Date.now()
    };

    setPersonajes([...personajes, nuevo]);
    setNuevoPersonaje({
      nombre: "",
      descripcion: "",
      imagen: "",
      color: "#ffe4f0"
    });
  };

  const editarPersonaje = (personaje) => {
    setPersonajeEnEdicion(personaje);
  }

  const guardarCambiosEdicion = () => {
    if (!personajeEnEdicion.nombre || !personajeEnEdicion.descripcion || !personajeEnEdicion.imagen || !personajeEnEdicion.color){
      alert("Todos los campos deben de estar completos");
      return;
    }

    const personajeActualizado = {...personajeEnEdicion}

    setPersonajes(prev =>
      prev.map(p => (p.id === personajeActualizado.id ? personajeActualizado : p))
    );

    setPersonajeEnEdicion(null);
  };

  const eliminarPersonaje = (id) => {
    const confirmar = window.confirm("¿Estás seguro de que deseas eliminar este personaje?");
    if (!confirmar) return;

    const eliminados = personajes.find(p => p.id === id);
    setEliminados(prev => [...prev, eliminados]);

    setPersonajes(personajes.filter(p => p.id !== id));
    setAgregado(agregado.filter(x => x !== id));
    const nuevosMostrarMas = {...mostrarMas};
    delete nuevosMostrarMas[id];
    setMostrarMas(nuevosMostrarMas);
  };

  const restaurarEliminados = () => {
    setPersonajes(prev => [...prev, ...eliminados]);
    setEliminados([]);
  };

  const restaurarUno = (id) => {
    const personajeRestaurado = eliminados.find(p => p.id === id);
    if (!personajeRestaurado) return;

    setPersonajes(prev => {
      const nuevaLista = [...prev];
      const indexOriginal = personajeRestaurado.id - 1;
      if (!nuevaLista.some(p => p.id === personajeRestaurado.id)){
        nuevaLista.splice(indexOriginal, 0, personajeRestaurado);
      }
      return nuevaLista;
    });
    setEliminados(prev => prev.filter(p => p.id !== id));
  };

  return (
    <> <>
      {personajeEnEdicion && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000
        }}>
          <div style={{
            backgroundColor: '#ffe4f0',
            padding: '20px',
            borderRadius: '10px',
            width: '90%',
            maxWidth: '500px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <h3>Editar Personaje</h3>
            <input
              type="text"
              placeholder="Nombre"
              value={personajeEnEdicion.nombre}
              onChange={(e) => 
                setPersonajeEnEdicion({...personajeEnEdicion, nombre: e.target.value})
              } style={{ marginBottom: '5px' }}
            />
            <input
              type="text"
              placeholder="Descripcion"
              value={personajeEnEdicion.descripcion}
              onChange={(e) => 
                setPersonajeEnEdicion({...personajeEnEdicion, descripcion: e.target.value})
              } style={{ marginBottom: '5px' }}
            />
            <input
              type="text"
              placeholder="URL de la imagen"
              value={personajeEnEdicion.imagen}
              onChange={(e) => 
                setPersonajeEnEdicion({...personajeEnEdicion, imagen: e.target.value})
              } style={{ marginBottom: '5px' }}
            />
            <input
              type="color"
              value={personajeEnEdicion.color}
              onChange={(e) => 
                setPersonajeEnEdicion({...personajeEnEdicion, color: e.target.value})
              }
            />

            <div style={{ marginTop: '15px'}}>
              <button onClick={guardarCambiosEdicion} 
              style={{ marginRight: '10px',
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                padding: '10px',
              }}>
                Guardar cambios
              </button>
              <button onClick={() => setPersonajeEnEdicion(null)} 
              style={{ marginRight: '10px',
                backgroundColor: 'red',
                color: 'white',
                border: 'none',
                padding: '10px',

              }}>
                Cancelar 
              </button>
            </div>
          </div>
        </div>
      )}
        
    </>
    <div style={{ backgroundColor: 'lightpink', padding: '20px' }}>

        <h1 style={{
          textAlign: 'center',
          color: 'white'
        }}> Galeria de Personajes Favoritos
        </h1>
        <div style={{
          backgroundColor: 'white',
          padding: '20px',
          borderRadius: '10px',
          margin: '20px auto',
          maxWidth: '400px',
        }}>
          <h3 style={{ textAlign: 'center' }}> Agregar nuevo personaje </h3>
          <input
            type="text"
            placeholder="Nombre"
            value={nuevoPersonaje.nombre}
            onChange={(e) => setNuevoPersonaje({ ...nuevoPersonaje, nombre: e.target.value })}
            style={{ width: '80%', padding: '8px', margin: '5px 0' }} />

          <input
            type="text"
            placeholder="Descripcion"
            value={nuevoPersonaje.descripcion}
            onChange={(e) => setNuevoPersonaje({ ...nuevoPersonaje, descripcion: e.target.value })}
            style={{ width: '80%', padding: '8px', margin: '5px 0' }} />

          <input
            type="text"
            placeholder="URL de la imagen"
            value={nuevoPersonaje.imagen}
            onChange={(e) => setNuevoPersonaje({ ...nuevoPersonaje, imagen: e.target.value })}
            style={{ width: '80%', padding: '8px', margin: '5px 0' }} />
          <br />
          <label>
            Color:
            <input
              type="color"
              value={nuevoPersonaje.color}
              onChange={(e) => setNuevoPersonaje({ ...nuevoPersonaje, color: e.target.value })}
            />

          </label>
          <br />
          <button onClick={agregarNuevoPersonaje} style={{
            backgroundColor: 'deeppink',
            color: 'white',
            border: 'none',
            padding: '10px',
            width: '50%',
            borderRadius: '5px',
            marginTop: '10px'
          }}>
            Agregar a la galeria
          </button>
        


        </div>
        <h2 style={{
          textAlign: 'center',
          color: 'white'
        }}> 🌟 Has agregado {agregado.length} personaje{agregado.length !== 1 ? 's' : ''} favorito{agregado.length !== 1 ? 's' : ''}
        </h2>
        {personajes.map(personaje => (
          <Personaje
            key={personaje.id}
            nombre={personaje.nombre}
            descripcion={personaje.descripcion}
            imagen={personaje.imagen}
            mostrarMas={mostrarMas[personaje.id]}
            cambiarMostrarMas={() => cambiarMostrarMas(personaje.id)}
            agregado={agregado.includes(personaje.id)}
            alternarAgregado={() => alternarAgregado(personaje.id)}
            colorFondo={personaje.color}
            eliminar={() => eliminarPersonaje(personaje.id)} 
            editar={() => editarPersonaje(personaje)}
            />            
        ))}
        
        {eliminados.length > 0 && (
          <div style={{
            backgroundColor: 'mistyrose',
            padding: '20px',
            borderRadius: '10px',
            marginTop: '20px',
          }}>
            <h2 style={{textAlign: 'center', color: 'darkred'}}> 
              Personajes Eliminados 
            </h2>

            <button 
              onClick={restaurarEliminados}
              style={{
                backgroundColor: 'green',
                color: 'white',
                border: 'none',
                padding: '10px',
                borderRadius: '5px',
                marginBottom: '10px',
                cursor: 'pointer'
              }}
            > Restaurar todos 
            </button>

            {eliminados.map(p => (
              <div key={p.id} style={{
                backgroundColor: p.color,
                padding: '10px',
                margin: '10px',
                borderRadius: '8px',
                width: '25%',
                display: 'inline-block',
              }}>
                <h4>{p.nombre}</h4>
                <p>{p.descripcion}</p>
                <img src={p.imagen} alt={p.nombre} style={{width:'100%' }}/>

                <button 
                  onClick={() => restaurarUno(p.id)}
                  style={{
                    backgroundColor: 'mediumseagreen',
                    color: 'white',
                    border: 'none',
                    padding: '8px',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}>
                  Restaurar
                </button>
              </div>
            ))}
          </div>
        )}
      </div></>
  );
}

export default App
