import { useState } from 'react'

interface TrainingConfig {
  dataset: string
  task: string
  model: string
  epochs: number
  batchSize: number
  learningRate: number
  autoTuning: boolean
}

export default function Training() {
  const [config, setConfig] = useState<TrainingConfig>({
    dataset: '',
    task: 'classification',
    model: 'auto',
    epochs: 100,
    batchSize: 32,
    learningRate: 0.001,
    autoTuning: true,
  })
  const [isTraining, setIsTraining] = useState(false)
  const [progress, setProgress] = useState(0)

  const startTraining = () => {
    setIsTraining(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsTraining(false)
          return 100
        }
        return prev + 2
      })
    }, 200)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Entrenamiento</h1>
        <p className="text-gray-400 mt-1">Configura y lanza el entrenamiento de modelos</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Configuration Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Basic Config */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-sliders-h text-blue-400"></i>
              Configuración Básica
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Dataset</label>
                <select
                  value={config.dataset}
                  onChange={(e) => setConfig({ ...config, dataset: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="">Seleccionar dataset...</option>
                  <option value="ventas_2024">ventas_2024.csv</option>
                  <option value="imagenes">imagenes_productos.zip</option>
                  <option value="reviews">reviews_clientes.json</option>
                  <option value="series">series_temporales.csv</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Tipo de Tarea</label>
                <select
                  value={config.task}
                  onChange={(e) => setConfig({ ...config, task: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="classification">Clasificación</option>
                  <option value="regression">Regresión</option>
                  <option value="detection">Detección de Objetos</option>
                  <option value="segmentation">Segmentación</option>
                  <option value="nlp">NLP</option>
                  <option value="timeseries">Series Temporales</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Modelo</label>
                <select
                  value={config.model}
                  onChange={(e) => setConfig({ ...config, model: e.target.value })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                >
                  <option value="auto">Auto (recomendado)</option>
                  <option value="resnet">ResNet-50</option>
                  <option value="bert">BERT-base</option>
                  <option value="xgboost">XGBoost</option>
                  <option value="lstm">LSTM</option>
                  <option value="transformer">Transformer</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Épocas</label>
                <input
                  type="number"
                  value={config.epochs}
                  onChange={(e) => setConfig({ ...config, epochs: parseInt(e.target.value) })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Advanced Config */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-cog text-purple-400"></i>
              Hiperparámetros
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Batch Size</label>
                <input
                  type="number"
                  value={config.batchSize}
                  onChange={(e) => setConfig({ ...config, batchSize: parseInt(e.target.value) })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Learning Rate</label>
                <input
                  type="number"
                  step="0.0001"
                  value={config.learningRate}
                  onChange={(e) => setConfig({ ...config, learningRate: parseFloat(e.target.value) })}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={config.autoTuning}
                      onChange={(e) => setConfig({ ...config, autoTuning: e.target.checked })}
                      className="sr-only"
                    />
                    <div className={`w-10 h-5 rounded-full transition-colors ${config.autoTuning ? 'bg-blue-600' : 'bg-gray-600'}`}>
                      <div className={`w-4 h-4 bg-white rounded-full transform transition-transform mt-0.5 ${config.autoTuning ? 'translate-x-5.5 ml-[22px]' : 'translate-x-0.5 ml-[2px]'}`}></div>
                    </div>
                  </div>
                  <div>
                    <span className="text-sm text-white">Auto-Tuning de Hiperparámetros</span>
                    <p className="text-xs text-gray-400">Optimización automática con Bayesian Optimization</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Training Progress */}
          {isTraining && (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                  <i className="fas fa-spinner fa-spin text-blue-400"></i>
                  Entrenando Modelo...
                </h2>
                <span className="text-sm text-blue-400 font-medium">{progress}%</span>
              </div>
              <div className="w-full bg-gray-700 rounded-full h-3 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <div className="grid grid-cols-3 gap-4 mt-4">
                <div className="text-center">
                  <p className="text-xs text-gray-400">Época</p>
                  <p className="text-sm font-medium text-white">{Math.round(progress)}/{config.epochs}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Loss</p>
                  <p className="text-sm font-medium text-white">{(1.5 - progress * 0.013).toFixed(4)}</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-400">Accuracy</p>
                  <p className="text-sm font-medium text-white">{(progress * 0.94).toFixed(1)}%</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Panel */}
        <div className="space-y-6">
          {/* Quick Actions */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4">Acciones</h2>
            <div className="space-y-3">
              <button
                onClick={startTraining}
                disabled={isTraining || !config.dataset}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 disabled:from-gray-600 disabled:to-gray-700 disabled:cursor-not-allowed text-white py-3 rounded-lg font-medium transition-all flex items-center justify-center gap-2"
              >
                <i className={`fas ${isTraining ? 'fa-spinner fa-spin' : 'fa-play'}`}></i>
                {isTraining ? 'Entrenando...' : 'Iniciar Entrenamiento'}
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <i className="fas fa-save"></i>
                Guardar Configuración
              </button>
              <button className="w-full bg-gray-700 hover:bg-gray-600 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                <i className="fas fa-file-export"></i>
                Exportar Config
              </button>
            </div>
          </div>

          {/* Resource Estimation */}
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
              <i className="fas fa-chart-bar text-green-400"></i>
              Recursos Estimados
            </h2>
            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">GPU Memory</span>
                  <span className="text-white">6.2 / 24 GB</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: '26%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">RAM</span>
                  <span className="text-white">12.8 / 64 GB</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width: '20%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Tiempo Est.</span>
                  <span className="text-white">~2h 30m</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="h-full bg-purple-500 rounded-full" style={{ width: '0%' }}></div>
                </div>
              </div>
              <div>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-400">Costo Est.</span>
                  <span className="text-white">$4.50</span>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2">
                  <div className="h-full bg-orange-500 rounded-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-gradient-to-br from-blue-900/30 to-purple-900/30 border border-blue-500/20 rounded-xl p-5">
            <div className="flex items-start gap-3">
              <i className="fas fa-lightbulb text-yellow-400 mt-1"></i>
              <div>
                <h3 className="text-sm font-medium text-white mb-1">Tip</h3>
                <p className="text-xs text-gray-300">
                  Activa el Auto-Tuning para que el sistema encuentre automáticamente los mejores hiperparámetros para tu dataset.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
