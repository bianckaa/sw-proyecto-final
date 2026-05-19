import Card from './Card'

function Coleccion({ items, onEditar, onEliminar }) {
    const itemsActivos = items.filter((item) => item.activo === true)

    return (
    <div className="coleccion">
        {itemsActivos.map((item) => (
        <Card 
            key={item.id}
            item={item}
            onEditar={onEditar}
            onEliminar={onEliminar}
        />
        ))}
    </div>
    )
}

export default Coleccion
