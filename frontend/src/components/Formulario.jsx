import { useState, forwardRef } from 'react'
import { useStorage } from '../context/StorageProvider'
import { CATEGORIAS } from '../utils/categorias'

// useRef — la ref del input "nombre" llega desde App por forwardRef; se usa
// para devolver el foco tras guardar (Uso 1) y para el atajo Ctrl+N.
const Formulario = forwardRef(function Formulario({ onGuardado }, inputRef) {
    const { guardarItem } = useStorage()

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

    const manejarClick = async () => {
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

        await guardarItem(nuevoItem)
        if (onGuardado) onGuardado()

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

        // Tras guardar con éxito, el cursor regresa al campo nombre
        inputRef?.current?.focus()
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
            <input ref={inputRef} name="nombre" value={form.nombre} onChange={percibirCambio} placeholder="Nombre" />
            
            <input name="numeroEstampa" type="number" value={form.numeroEstampa} onChange={percibirCambio} />

            <select name="categoriaId" value={form.categoriaId} onChange={percibirCambio}>
            <option value="">-- Categoría --</option>
            {CATEGORIAS.map((cat) => (
                <option key={cat.id} value={cat.id}>
                    {cat.emoji} {cat.nombre}
                </option>
            ))}
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
})

export default Formulario