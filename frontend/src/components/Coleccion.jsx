import { useRef, useEffect } from 'react'
import Card from './Card'

function Coleccion({ items, onCambio, onEliminar, onCambiarEstado }) {
    const itemsActivos = items.filter((item) => item.activo === true)

    const lastItemRef = useRef(null)

    useEffect(() => {
        lastItemRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, [items])

    return (
    <div className="coleccion">
        {itemsActivos.map((item, index) => (
        <Card
            key={item.id}
            item={item}
            onCambio={onCambio}
            onEliminar={onEliminar}
            onCambiarEstado={onCambiarEstado}
            ref={index === itemsActivos.length - 1 ? lastItemRef : null}
        />
        ))}
    </div>
    )
}

export default Coleccion
