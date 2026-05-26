import { useRef, useEffect } from 'react'
import Card from './Card'

function Coleccion({ items, onCambio }) {
    const itemsActivos = items.filter((item) => item.activo === true)

    // useRef — guarda la referencia al div del último ítem sin causar re-render
    const lastItemRef = useRef(null)

    // Cada vez que cambia la lista, desplaza la vista hasta el ítem más reciente
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
            ref={index === itemsActivos.length - 1 ? lastItemRef : null}
        />
        ))}
    </div>
    )
}

export default Coleccion
