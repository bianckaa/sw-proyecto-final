import { useRef, useEffect } from 'react'
import Card from './Card'

function Coleccion({ items, onCambio, onEliminar, dispatch, nuevoItemKey }) {
    const itemsActivos = items.filter((item) => item.activo === true)
    const lastItemRef = useRef(null)

    // Solo hace scroll cuando nuevoItemKey cambia, es decir, cuando el
    // formulario guarda un item nuevo. Las recargas por edicion no lo tocan.
    useEffect(() => {
        if (nuevoItemKey > 0) {
            lastItemRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
    }, [nuevoItemKey])

    return (
    <div className="coleccion">
        {itemsActivos.map((item, index) => (
        <Card
            key={item.id}
            item={item}
            onCambio={onCambio}
            onEliminar={onEliminar}
            dispatch={dispatch}
            ref={index === itemsActivos.length - 1 ? lastItemRef : null}
        />
        ))}
    </div>
    )
}

export default Coleccion
