import { useState } from 'react'

interface Dataset {
  id: number
  name: string
  rows: number
  columns: number
  size: string
  type: string
  createdAt: string
  status: 'ready' | 'processing' | 'error'
}

const mockDatasets: Dataset[] = [
  { id: 1, name: 'ventas_2024.csv', rows: 150000, columns: 24, size: '45.2 MB', type: 'Tabular', createdAt: '2024-01-15', status: 'ready' },
  { id: 2, name: 'imagenes_productos.zip', rows: 50000, columns: 3, size: '2.1 GB', type: 'Imagen', createdAt: '2024-01-14', status: 'ready' },
  { id: 3, name: 'reviews_clientes.json', rows: 80000, columns: 8, size: '120 MB', type: 'Texto', createdAt: '2024-01-13', status: 'processing' },
  { id: 4, name: 'series_temporales.csv', rows: 365000, columns: 12, size: '89 MB', type: 'Tabular', createdAt: '2024-01-12', status: 'ready' },
  { id: 5, name: 'audio_transcripciones.zip', rows: 10000, columns: 4, size: '5.8 GB', type: 'Audio', createdAt: '2024-01-11', status: 'error' },
  { id: 6, name: 'datos_geoespaciales.geojson', rows: 25000, columns: 15, size: '340 MB', type: 'Geoespacial', createdAt: '2024-01-10', status: 'ready' },
]

export default function Datasets() {
  const [datasets, setDatasets] = useState<Dataset[]>(mockDatasets)
  const [searchTerm, setSearchTerm] = useState('')
  const [showUpload, setShowUpload] = useState(false)

  const filteredDatasets = datasets.filter(d =>
    d.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const getStatusBadge = (status: Dataset['status']) => {
    switch (status) {
      case 'ready':
        return <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Listo</span>
      case 'processing':
        return <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full animate-pulse">Procesando</span>
      case 'error':
        return <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded-full">Error</span>
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'Tabular': return 'fa-table'
      case 'Imagen': return 'fa-image'
      case 'Texto': return 'fa-file-alt'
      case 'Audio': return 'fa-music'
      case 'Geoespacial': return 'fa-map'
      default: return 'fa-file'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Datasets</h1>
          <p className="text-gray-400 mt-1">Gestiona tus conjuntos de datos</p>
        </div>
        <button
          onClick={() => setShowUpload(!showUpload)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <i className="fas fa-upload"></i>
          <span>Subir Dataset</span>
        </button>
      </div>

      {/* Upload Area */}
      {showUpload && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 border-dashed border-2 border-blue-500/50">
          <div className="text-center">
            <div className="w-16 h-16 mx-auto bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
              <i className="fas fa-cloud-upload-alt text-3xl text-blue-400"></i>
            </div>
            <h3 className="text-lg font-medium text-white mb-2">Arrastra y suelta tus archivos aquí</h3>
            <p className="text-gray-400 text-sm mb-4">Soporta CSV, JSON, Parquet, imágenes, audio y más</p>
            <div className="flex gap-3 justify-center">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Seleccionar Archivos
              </button>
              <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                Importar desde URL
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"></i>
          <input
            type="text"
            placeholder="Buscar datasets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-800 border border-gray-700 rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 transition-colors"
          />
        </div>
        <select className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500">
          <option>Todos los tipos</option>
          <option>Tabular</option>
          <option>Imagen</option>
          <option>Texto</option>
          <option>Audio</option>
        </select>
      </div>

      {/* Datasets Table */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Nombre</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Tipo</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Filas</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Columnas</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Tamaño</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Estado</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-gray-400 uppercase tracking-wider">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredDatasets.map((dataset) => (
              <tr key={dataset.id} className="hover:bg-gray-700/30 transition-colors">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                      <i className={`fas ${getTypeIcon(dataset.type)} text-gray-400 text-sm`}></i>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{dataset.name}</p>
                      <p className="text-xs text-gray-400">{dataset.createdAt}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-300">{dataset.type}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-300">{dataset.rows.toLocaleString()}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-300">{dataset.columns}</span>
                </td>
                <td className="px-5 py-4">
                  <span className="text-sm text-gray-300">{dataset.size}</span>
                </td>
                <td className="px-5 py-4">
                  {getStatusBadge(dataset.status)}
                </td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button className="text-gray-400 hover:text-white p-1 transition-colors" title="Explorar">
                      <i className="fas fa-eye text-sm"></i>
                    </button>
                    <button className="text-gray-400 hover:text-white p-1 transition-colors" title="Descargar">
                      <i className="fas fa-download text-sm"></i>
                    </button>
                    <button className="text-gray-400 hover:text-red-400 p-1 transition-colors" title="Eliminar">
                      <i className="fas fa-trash text-sm"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
