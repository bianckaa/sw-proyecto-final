import { useRef, useEffect } from 'react'
import Card from './Card'

function Coleccion({ items, onCambio, onEliminar }) {
    const itemsActivos = items.filter((item) => item.activo === true)

    const lastItemRef = useRef(null)
    // Guardamos la cantidad anterior de items activos para detectar cuando se
    // AGREGA uno nuevo. Sin esto, cualquier modificacion (editar, archivar,
    // registrar actividad) disparaba el scroll porque "items" cambiaba.
    const cantidadAnteriorRef = useRef(itemsActivos.length)

    useEffect(() => {
        // Solo desplazamos al ultimo item si la lista crecio.
        // Si la cantidad bajo o se mantuvo igual, fue una edicion o archivado
        // y no queremos mover la pagina.
        if (itemsActivos.length > cantidadAnteriorRef.current) {
            lastItemRef.current?.scrollIntoView({ behavior: 'smooth' })
        }
        cantidadAnteriorRef.current = itemsActivos.length
    }, [itemsActivos.length])

    return (
    <div className="coleccion">
        {itemsActivos.map((item, index) => (
        <Card
            key={item.id}
            item={item}
            onCambio={onCambio}
            onEliminar={onEliminar}
            ref={index === itemsActivos.length - 1 ? lastItemRef : null}
        />
        ))}
    </div>
    )
}

export default Coleccion
