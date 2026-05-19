import { useState } from 'react'

function Formulario({ onAgregar }) {
    const [form, setForm] = useState({
        /* Valor vacío con el que empieza cada campo */
        nombre: '',
        categoriaId: '',
        estado: '',
        puntuacion: 0,
        notas: '',
        numeroEstampa: 0,
        seleccion: '',
        jugador: '',
        pegada: false
    })

    const manejarClick = () => {
        const nuevoItem = {
            id: crypto.randomUUID(),
            nombre: form.nombre,
            categoriaId: form.categoriaId,
            estado: form.estado,
            puntuacion: Number(form.puntuacion),
            notas: form.notas,
            fechaRegistro: new Date().toISOString(),
            fechaActividad: new Date().toISOString(),
            activo: true,

            atributos: {
                numeroEstampa: Number(form.numeroEstampa),
                seleccion: form.seleccion,
                jugador: form.jugador,
                pegada: form.pegada,
                repetidas: 0
            }
        }

        onAgregar(nuevoItem)
        
        setForm({
            nombre: '',
            categoriaId: '',
            estado: '',
            puntuacion: 0,
            notas: '',
            numeroEstampa: 0,
            seleccion: '',
            jugador: '',
            pegada: false
        })
    }

    const percibirCambio = (e) => {
        const { name, value, type, checked } = e.target

        let nuevoValor /* No const porque se asigna despues de declararse */
        if (type == 'checkbox') {
            nuevoValor = checked
        } else {
            nuevoValor = value
        }

        setForm({... form, [name]: nuevoValor})
    }

    return (
        <div className="formulario">
            <h2>Nueva Estampa</h2>
            <input name="nombre" value={form.nombre} onChange={percibirCambio} placeholder="Nombre" />
            
            <input name="numeroEstampa" type="number" value={form.numeroEstampa} onChange={percibirCambio} />

            <select name="categoriaId" value={form.categoriaId} onChange={percibirCambio}>
            <option value="">-- Categoría --</option>
            <option value="regular">Regular</option>
            <option value="holografica">Holográfica</option>
            <option value="dorada">Dorada</option>
            <option value="extra">Extra</option>
            </select>

            <input name="seleccion" value={form.seleccion} onChange={percibirCambio} placeholder="Selección (ej: Argentina)" />
            
            <input name="jugador" value={form.jugador} onChange={percibirCambio} placeholder="Jugador (ej: Messi)" />

            <select name="estado" value={form.estado} onChange={percibirCambio}>
            <option value="">-- Estado --</option>
            <option value="pendiente">Pendiente</option>
            <option value="completado">Completado</option>
            </select>

            <input name="puntuacion" type="number" min="0" max="10" value={form.puntuacion} onChange={percibirCambio} />

            <input name="notas" value={form.notas} onChange={percibirCambio} placeholder="Notas"></input>
            <label>
                <input 
                    type="checkbox" 
                    name="pegada" 
                    checked={form.pegada} 
                    onChange={percibirCambio} 
                />Pegada en el álbum
            </label>
            <button className="btn-guardar" onClick={manejarClick}>Guardar</button>
        </div>
    )
}

export default Formulario