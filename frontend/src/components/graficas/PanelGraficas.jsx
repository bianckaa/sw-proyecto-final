import GraficaActividad from './GraficaActividad'
import GraficaCategoria from './GraficaCategoria'
import GraficaOriginal from './GraficaOriginal'

function PanelGraficas({ datosActividad, datosCategoria, datosOriginal }) {
  return (
    <section className="panel-graficas">
      <h2>Estadísticas de mi colección</h2>
      <div className="grid-graficas">
        <GraficaActividad datos={datosActividad} />
        <GraficaCategoria datos={datosCategoria} />
        <GraficaOriginal datos={datosOriginal} />
      </div>
    </section>
  )
}

export default PanelGraficas
