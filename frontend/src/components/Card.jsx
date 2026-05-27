import { useState, forwardRef } from 'react'
import { useStorage } from '../context/StorageProvider'
import { CATEGORIAS } from '../utils/categorias'

// forwardRef permite que Coleccion apunte una ref al div raíz del último Card
const Card = forwardRef(function Card({ item, onCambio }, ref) {
    const { guardarItem, eliminarItem } = useStorage()
    const categoria = CATEGORIAS.find((cat) => cat.id === item.categoriaId)
    const colorCategoria = categoria?.color || 'var(--color-text-muted)'
    // Fondo del mismo color de la categoría pero con baja opacidad (1A ≈ 10%).
    // Solo se aplica si hay un hex real; si no, se usa la superficie por defecto.
    const fondoCategoria = categoria ? `${categoria.color}1A` : 'var(--color-surface)'
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
        <div
            className="card"
            ref={ref}
            style={{
                border: `2px solid ${colorCategoria}`,
                backgroundColor: fondoCategoria
            }}
        >
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

                    <button onClick={async () => {
                        await guardarItem({ ...item, ...formEdicion })
                        setEditando(false)
                        if (onCambio) onCambio()
                    }}>Guardar</button>
                    <button onClick={() => setEditando(false)}>Cancelar</button>
                </>
            ) : (
                <> {/* Fragment: contenedor invisible para no usar div*/}
                    <p className="numero">#{item.atributos.numeroEstampa}</p>
                    <p className="jugador">{item.atributos.jugador}</p>
                    <p className="seleccion">{item.atributos.seleccion}</p>
                    <p>Repetidas: {item.atributos.repetidas}</p>

                    <p>
                        Categoría:{' '}
                        <span
                            className="badge-categoria"
                            style={{ backgroundColor: colorCategoria }}
                        >
                            {categoria ? `${categoria.emoji} ${categoria.nombre}` : item.categoriaId}
                        </span>
                    </p>
                    <p>Puntuación: {item.puntuacion}/10</p>
                    <p>Notas: {item.notas}</p>

                    {/* ()=> se ejecuta solo cuando usuario hace clic */}
                    <button className="btn-eliminar" onClick={async () => {
                        await eliminarItem(item.id)
                        if (onCambio) onCambio()
                    }}>Eliminar</button>
                    <button className="btn-editar" onClick={() => setEditando(true)}>Editar</button>
                </>
            )}
        </div>
    )
})

export default Card