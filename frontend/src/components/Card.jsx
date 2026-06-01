import { memo, useState, forwardRef } from 'react'
import { useStorage } from '../context/StorageProvider'
import { CATEGORIAS } from '../utils/categorias'

const Card = forwardRef(function Card({ item, onCambio, onEliminar }, ref) {
    const { guardarItem, eliminarItem, registrarActividad, obtenerRegistros } = useStorage()
    const categoria = CATEGORIAS.find((cat) => cat.id === item.categoriaId)
    const colorCategoria = categoria?.color || 'var(--color-text-muted)'
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

    // Estado para mostrar/ocultar el historial de actividad y los registros traidos
    const [mostrarHistorial, setMostrarHistorial] = useState(false)
    const [registros, setRegistros] = useState([])
    const [cargandoRegistros, setCargandoRegistros] = useState(false)

    // Helper: actualiza un campo dentro del objeto atributos sin pisar el resto.
    // Antes el codigo esparcia formEdicion.atributos en la raiz del estado y
    // perdia los campos del nivel superior; este helper conserva el shape.
    const actualizarAtributo = (clave, valor) => {
        setFormEdicion({
            ...formEdicion,
            atributos: { ...formEdicion.atributos, [clave]: valor }
        })
    }

    const handleClickEliminar = async () => {
        if (onEliminar) {
            await onEliminar(item.id)
        } else {
            await eliminarItem(item.id)
            if (onCambio) onCambio()
        }
    }

    // Helper: arma una lista descriptiva de los campos que cambiaron entre
    // el item original y los valores del formulario. Convierte el id de
    // categoria al nombre legible y los booleanos a si/no.
    const detectarCambios = () => {
        const cambios = []
        const nombreCategoriaAnterior =
            CATEGORIAS.find((c) => c.id === item.categoriaId)?.nombre || item.categoriaId
        const nombreCategoriaNueva =
            CATEGORIAS.find((c) => c.id === formEdicion.categoriaId)?.nombre || formEdicion.categoriaId

        if (formEdicion.nombre !== item.nombre) {
            cambios.push(`nombre: "${item.nombre}" → "${formEdicion.nombre}"`)
        }
        if (formEdicion.categoriaId !== item.categoriaId) {
            cambios.push(`categoría: ${nombreCategoriaAnterior} → ${nombreCategoriaNueva}`)
        }
        if (formEdicion.estado !== item.estado) {
            cambios.push(`estado: ${item.estado} → ${formEdicion.estado}`)
        }
        if (Number(formEdicion.puntuacion) !== Number(item.puntuacion)) {
            cambios.push(`puntuación: ${item.puntuacion} → ${formEdicion.puntuacion}`)
        }
        if (formEdicion.notas !== item.notas) {
            cambios.push(`notas actualizadas`)
        }
        if (String(formEdicion.atributos.numeroEstampa) !== String(item.atributos.numeroEstampa)) {
            cambios.push(`número: ${item.atributos.numeroEstampa} → ${formEdicion.atributos.numeroEstampa}`)
        }
        if (formEdicion.atributos.jugador !== item.atributos.jugador) {
            cambios.push(`jugador: "${item.atributos.jugador}" → "${formEdicion.atributos.jugador}"`)
        }
        if (formEdicion.atributos.seleccion !== item.atributos.seleccion) {
            cambios.push(`selección: "${item.atributos.seleccion}" → "${formEdicion.atributos.seleccion}"`)
        }
        if (String(formEdicion.atributos.repetidas) !== String(item.atributos.repetidas)) {
            cambios.push(`repetidas: ${item.atributos.repetidas} → ${formEdicion.atributos.repetidas}`)
        }
        return cambios
    }

    // RF-03: al guardar una edicion construimos una entrada de historial que
    // detalla exactamente que cambio. Si no hubo cambios reales no creamos
    // registro (para no ensuciar el historial con entradas vacias).
    const handleGuardarEdicion = async () => {
        const cambios = detectarCambios()
        const itemActualizado = { ...item, ...formEdicion }
        await guardarItem(itemActualizado)

        if (cambios.length > 0) {
            await registrarActividad(item.id, {
                fecha: new Date().toISOString(),
                valor: Number(formEdicion.puntuacion) || 0,
                notas: cambios.join('; ')
            })
        }

        // Si el panel de historial estaba abierto, lo refrescamos para que
        // el nuevo registro aparezca al instante
        if (mostrarHistorial) {
            const nuevos = await obtenerRegistros(item.id)
            setRegistros(nuevos)
        }

        setEditando(false)
        if (onCambio) onCambio()
    }

    // RF-03: alterna la visibilidad del historial. La primera vez que se abre
    // pide los registros al provider (API o localStorage segun el modo activo).
    const handleToggleHistorial = async () => {
        if (!mostrarHistorial) {
            setCargandoRegistros(true)
            const datos = await obtenerRegistros(item.id)
            setRegistros(datos)
            setCargandoRegistros(false)
        }
        setMostrarHistorial(!mostrarHistorial)
    }

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
                        value={formEdicion.nombre}
                        onChange={(e) => setFormEdicion({...formEdicion, nombre: e.target.value})}
                        placeholder="Nombre"
                    />
                    <input
                        value={formEdicion.atributos.numeroEstampa}
                        onChange={(e) => actualizarAtributo('numeroEstampa', e.target.value)}
                        placeholder="Número de estampa"
                    />
                    <input
                        value={formEdicion.atributos.jugador}
                        onChange={(e) => actualizarAtributo('jugador', e.target.value)}
                        placeholder="Jugador"
                    />
                    <input
                        value={formEdicion.atributos.seleccion}
                        onChange={(e) => actualizarAtributo('seleccion', e.target.value)}
                        placeholder="Selección"
                    />
                    <input
                        value={formEdicion.atributos.repetidas}
                        onChange={(e) => actualizarAtributo('repetidas', e.target.value)}
                        placeholder="Repetidas"
                    />

                    {/* Categoria como select: muestra las 5 opciones reales en vez del id crudo */}
                    <select
                        value={formEdicion.categoriaId}
                        onChange={(e) => setFormEdicion({...formEdicion, categoriaId: e.target.value})}
                    >
                        {CATEGORIAS.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.emoji} {cat.nombre}
                            </option>
                        ))}
                    </select>

                    {/* Estado se edita aqui (antes habia un boton aparte para alternarlo) */}
                    <select
                        value={formEdicion.estado}
                        onChange={(e) => setFormEdicion({...formEdicion, estado: e.target.value})}
                    >
                        <option value="pendiente">Pendiente</option>
                        <option value="completado">Completado</option>
                    </select>

                    <input
                        type="number"
                        min="0"
                        max="10"
                        value={formEdicion.puntuacion}
                        onChange={(e) => setFormEdicion({...formEdicion, puntuacion: e.target.value})}
                        placeholder="Puntuación (0-10)"
                    />
                    <input
                        value={formEdicion.notas}
                        onChange={(e) => setFormEdicion({...formEdicion, notas: e.target.value})}
                        placeholder="Notas"
                    />

                    <button onClick={handleGuardarEdicion}>Guardar</button>
                    <button onClick={() => setEditando(false)}>Cancelar</button>
                </>
            ) : (
                <>
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
                    <p>Estado: {item.estado}</p>
                    <p>Puntuación: {item.puntuacion}/10</p>
                    <p>Notas: {item.notas}</p>

                    <button className="btn-eliminar" onClick={handleClickEliminar}>Eliminar</button>
                    <button className="btn-editar" onClick={() => setEditando(true)}>Editar</button>
                    <button className="btn-historial" onClick={handleToggleHistorial}>
                        {mostrarHistorial ? 'Ocultar historial' : 'Ver historial'}
                    </button>

                    {/* RF-03: seccion expandible con el historial de actividad */}
                    {mostrarHistorial && (
                        <div className="historial-registros">
                            {cargandoRegistros ? (
                                <p className="historial-vacio">Cargando...</p>
                            ) : registros.length === 0 ? (
                                <p className="historial-vacio">Sin registros todavía.</p>
                            ) : (
                                <ul>
                                    {registros.map((reg, indice) => (
                                        <li key={reg.id || indice}>
                                            <strong>
                                                {new Date(reg.fecha).toLocaleDateString('es-GT')}
                                            </strong>
                                            {reg.notas ? ` — ${reg.notas}` : ''}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    )
})

export default memo(Card)
