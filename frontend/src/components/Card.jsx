import { useState } from 'react'

function Card({ item, onEditar, onEliminar }) {
    const [editando, setEditando] = useState(false)
    const [formEdicion, setFormEdicion] = useState({
        nombre: item.nombre,
        categoriaId: item.categoriaId,
        estado: item.estado,
        puntuacion: item.puntuacion,
        notas: item.notas,
        atributos: {
            numeroEstampa: item.atributos.numeroEstampa,
            seleccion: item.atributos.seleccion,
            jugador: item.atributos.jugador,
            pegada: item.atributos.pegada,
            repetidas: item.atributos.repetidas
        }
    })
    
    return (
        <div>
            {editando ? (
                <>
                    <input 
                        value={formEdicion.atributos.numeroEstampa} 
                        onChange={(e) => setFormEdicion({...formEdicion.atributos, numeroEstampa: e.target.value})}
                    />
                    <input 
                        value={formEdicion.atributos.jugador} 
                        onChange={(e) => setFormEdicion({...formEdicion.atributos, jugador: e.target.value})}
                    />
                    <input 
                        value={formEdicion.atributos.seleccion}
                        onChange={(e) => setFormEdicion({
                        ...formEdicion, 
                        atributos: {...formEdicion.atributos, seleccion: e.target.value}
                        })}
                    />
                    <input 
                        value={formEdicion.atributos.repetidas} 
                        onChange={(e) => setFormEdicion({...formEdicion.atributos, repetidas: e.target.value})}
                    />
                    <input 
                        value={formEdicion.categoriaId} 
                        onChange={(e) => setFormEdicion({...formEdicion, categoriaId: e.target.value})}
                    />
                    <input 
                        value={formEdicion.puntuacion} 
                        onChange={(e) => setFormEdicion({...formEdicion, puntuacion: e.target.value})}
                    />
                    <input 
                        value={formEdicion.notas} 
                        onChange={(e) => setFormEdicion({...formEdicion, notas: e.target.value})}
                    />    

                    <button onClick={() => {
                        onEditar(item.id, formEdicion)
                        setEditando(false)
                    }}>Guardar</button>
                    <button onClick={() => setEditando(false)}>Cancelar</button>
                </>
            ) : (
                <> {/* Fragment: contenedor invisible para no usar div*/}
                    <p>{item.atributos.numeroEstampa}</p>
                    <p>{item.atributos.jugador}</p>
                    <p>{item.atributos.seleccion}</p>
                    <p>{item.atributos.repetidas}</p>

                    <p>{item.categoriaId}</p>
                    <p>{item.puntuacion}</p>
                    <p>{item.notas}</p>

                    {/* ()=> se ejecuta solo cuando usuario hace clic */}
                    <button onClick={() => onEliminar(item.id)}>Eliminar</button>
                    <button onClick={() => setEditando(true)}>Editar</button>
                </>
            )}
        </div>
    )
}

export default Card