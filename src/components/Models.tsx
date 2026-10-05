import { useState } from 'react'

interface Model {
  id: number
  name: string
  type: string
  accuracy: number
  precision: number
  recall: number
  f1Score: number
  status: 'active' | 'archived' | 'deployed'
  createdAt: string
  size: string
}

const mockModels: Model[] = [
  { id: 1, name: 'Clasificador Imágenes v3', type: 'Clasificación', accuracy: 96.2, precision: 95.8, recall: 94.5, f1Score: 95.1, status: 'deployed', createdAt: '2024-01-15', size: '245 MB' },
  { id: 2, name: 'Detector Anomalías', type: 'Detección', accuracy: 89.1, precision: 88.3, recall: 91.2, f1Score: 89.7, status: 'active', createdAt: '2024-01-14', size: '180 MB' },
  { id: 3, name: 'NLP Sentimiento', type: 'NLP', accuracy: 92.8, precision: 93.1, recall: 91.8, f1Score: 92.4, status: 'deployed', createdAt: '2024-01-13', size: '420 MB' },
  { id: 4, name: 'Predicción Ventas', type: 'Regresión', accuracy: 87.5, precision: 86.9, recall: 88.1, f1Score: 87.5, status: 'active', createdAt: '2024-01-12', size: '95 MB' },
  { id: 5, name: 'Segmentación Médica', type: 'Segmentación', accuracy: 94.3, precision: 93.7, recall: 92.9, f1Score: 93.3, status: 'archived', createdAt: '2024-01-10', size: '512 MB' },
  { id: 6, name: 'Reconocimiento Voz', type: 'Audio', accuracy: 91.6, precision: 90.8, recall: 92.1, f1Score: 91.4, status: 'active', createdAt: '2024-01-08', size: '1.2 GB' },
]

export default function Models() {
  const [models] = useState<Model[]>(mockModels)
  const [selectedModel, setSelectedModel] = useState<Model | null>(null)
  const [filter, setFilter] = useState<string>('all')

  const filteredModels = filter === 'all' ? models : models.filter(m => m.status === filter)

  const getStatusBadge = (status: Model['status']) => {
    switch (status) {
      case 'deployed':
        return <span className="text-xs px-2 py-1 bg-green-500/20 text-green-400 rounded-full">Desplegado</span>
      case 'active':
        return <span className="text-xs px-2 py-1 bg-blue-500/20 text-blue-400 rounded-full">Activo</span>
      case 'archived':
        return <span className="text-xs px-2 py-1 bg-gray-500/20 text-gray-400 rounded-full">Archivado</span>
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Modelos</h1>
          <p className="text-gray-400 mt-1">Gestiona y monitorea tus modelos entrenados</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <i className="fas fa-download"></i>
            <span>Exportar</span>
          </button>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
            <i className="fas fa-rocket"></i>
            <span>Desplegar</span>
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2">
        {['all', 'deployed', 'active', 'archived'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              filter === f
                ? 'bg-blue-600 text-white'
                : 'bg-gray-800 text-gray-400 hover:text-white border border-gray-700'
            }`}
          >
            {f === 'all' ? 'Todos' : f === 'deployed' ? 'Desplegados' : f === 'active' ? 'Activos' : 'Archivados'}
          </button>
        ))}
      </div>

      {/* Models Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredModels.map((model) => (
          <div
            key={model.id}
            onClick={() => setSelectedModel(model)}
            className={`bg-gray-800 border rounded-xl p-5 cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/5 ${
              selectedModel?.id === model.id ? 'border-blue-500' : 'border-gray-700 hover:border-gray-600'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center border border-blue-500/20">
                <i className="fas fa-cube text-blue-400"></i>
              </div>
              {getStatusBadge(model.status)}
            </div>
            <h3 className="text-white font-medium mb-1">{model.name}</h3>
            <p className="text-xs text-gray-400 mb-3">{model.type} • {model.size}</p>
            
            {/* Metrics */}
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-400">Accuracy</p>
                <p className="text-sm font-bold text-green-400">{model.accuracy}%</p>
              </div>
              <div className="bg-gray-700/50 rounded-lg p-2 text-center">
                <p className="text-xs text-gray-400">F1 Score</p>
                <p className="text-sm font-bold text-blue-400">{model.f1Score}%</p>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-gray-700 flex items-center justify-between">
              <span className="text-xs text-gray-500">{model.createdAt}</span>
              <div className="flex gap-1">
                <button className="text-gray-400 hover:text-white p-1 transition-colors">
                  <i className="fas fa-chart-line text-xs"></i>
                </button>
                <button className="text-gray-400 hover:text-white p-1 transition-colors">
                  <i className="fas fa-external-link-alt text-xs"></i>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Model Detail Panel */}
      {selectedModel && (
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-white">{selectedModel.name}</h2>
              <p className="text-gray-400 text-sm">{selectedModel.type} • Creado: {selectedModel.createdAt}</p>
            </div>
            <button
              onClick={() => setSelectedModel(null)}
              className="text-gray-400 hover:text-white transition-colors"
            >
              <i className="fas fa-times"></i>
            </button>
          </div>

          {/* Metrics Detail */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-gray-700/30 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Accuracy</p>
              <p className="text-2xl font-bold text-green-400">{selectedModel.accuracy}%</p>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                <div className="h-full bg-green-500 rounded-full" style={{ width: `${selectedModel.accuracy}%` }}></div>
              </div>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Precision</p>
              <p className="text-2xl font-bold text-blue-400">{selectedModel.precision}%</p>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${selectedModel.precision}%` }}></div>
              </div>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">Recall</p>
              <p className="text-2xl font-bold text-purple-400">{selectedModel.recall}%</p>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                <div className="h-full bg-purple-500 rounded-full" style={{ width: `${selectedModel.recall}%` }}></div>
              </div>
            </div>
            <div className="bg-gray-700/30 rounded-lg p-4 text-center">
              <p className="text-xs text-gray-400 mb-1">F1 Score</p>
              <p className="text-2xl font-bold text-orange-400">{selectedModel.f1Score}%</p>
              <div className="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                <div className="h-full bg-orange-500 rounded-full" style={{ width: `${selectedModel.f1Score}%` }}></div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex gap-3">
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
              <i className="fas fa-play"></i>
              Probar Modelo
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
              <i className="fas fa-code"></i>
              Ver API
            </button>
            <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm flex items-center gap-2 transition-colors">
              <i className="fas fa-history"></i>
              Historial
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
