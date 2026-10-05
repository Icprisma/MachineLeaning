import { useState, useEffect } from 'react'

const stats = [
  { label: 'Modelos Activos', value: '12', change: '+3', icon: 'fa-cubes', color: 'from-blue-500 to-blue-600' },
  { label: 'Datasets', value: '48', change: '+7', icon: 'fa-database', color: 'from-purple-500 to-purple-600' },
  { label: 'Precisión Promedio', value: '94.7%', change: '+2.1%', icon: 'fa-bullseye', color: 'from-green-500 to-green-600' },
  { label: 'GPU Usage', value: '78%', change: '-5%', icon: 'fa-microchip', color: 'from-orange-500 to-orange-600' },
]

const recentExperiments = [
  { id: 1, name: 'Clasificación de Imágenes v3', status: 'completed', accuracy: 96.2, time: '2h 15m', model: 'ResNet-50' },
  { id: 2, name: 'Detección de Anomalías', status: 'running', accuracy: 89.1, time: '45m', model: 'AutoEncoder' },
  { id: 3, name: 'NLP Sentimiento Análisis', status: 'completed', accuracy: 92.8, time: '1h 30m', model: 'BERT-base' },
  { id: 4, name: 'Regresión Predicción Ventas', status: 'failed', accuracy: 0, time: '12m', model: 'XGBoost' },
  { id: 5, name: 'Segmentación Semántica', status: 'running', accuracy: 87.5, time: '1h 05m', model: 'U-Net' },
]

const activityLog = [
  { time: 'Hace 2 min', action: 'Modelo entrenado exitosamente', type: 'success' },
  { time: 'Hace 15 min', action: 'Nuevo dataset cargado: ventas_2024.csv', type: 'info' },
  { time: 'Hace 1 hora', action: 'Entrenamiento iniciado: Clasificación v3', type: 'info' },
  { time: 'Hace 2 horas', action: 'Error en entrenamiento: GPU OOM', type: 'error' },
  { time: 'Hace 3 horas', action: 'Modelo desplegado a producción', type: 'success' },
  { time: 'Hace 5 horas', action: 'Hyperparameter tuning completado', type: 'success' },
]

export default function Dashboard() {
  const [animatedValues, setAnimatedValues] = useState<number[]>([0, 0, 0, 0])

  useEffect(() => {
    const targets = [12, 48, 94.7, 78]
    const duration = 1000
    const steps = 30
    const interval = duration / steps

    let step = 0
    const timer = setInterval(() => {
      step++
      const progress = step / steps
      setAnimatedValues(targets.map(t => t * progress))
      if (step >= steps) clearInterval(timer)
    }, interval)

    return () => clearInterval(timer)
  }, [])

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Dashboard</h1>
          <p className="text-gray-400 mt-1">Resumen de tu plataforma AutoML</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <i className="fas fa-plus"></i>
          <span>Nuevo Experimento</span>
        </button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div
            key={stat.label}
            className="bg-gray-800 border border-gray-700 rounded-xl p-5 hover:border-gray-600 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
          >
            <div className="flex items-center justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                <i className={`fas ${stat.icon} text-white text-sm`}></i>
              </div>
              <span className={`text-xs font-medium ${stat.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {stat.change}
              </span>
            </div>
            <p className="text-2xl font-bold text-white">
              {index === 2 ? `${animatedValues[index].toFixed(1)}%` : 
               index === 3 ? `${Math.round(animatedValues[index])}%` : 
               Math.round(animatedValues[index])}
            </p>
            <p className="text-sm text-gray-400 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Experiments */}
        <div className="lg:col-span-2 bg-gray-800 border border-gray-700 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-white">Experimentos Recientes</h2>
            <button className="text-sm text-blue-400 hover:text-blue-300">Ver todos</button>
          </div>
          <div className="space-y-3">
            {recentExperiments.map((exp) => (
              <div
                key={exp.id}
                className="flex items-center justify-between p-3 bg-gray-700/30 rounded-lg hover:bg-gray-700/50 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${
                    exp.status === 'completed' ? 'bg-green-400' :
                    exp.status === 'running' ? 'bg-blue-400 animate-pulse' :
                    'bg-red-400'
                  }`}></div>
                  <div>
                    <p className="text-sm font-medium text-white">{exp.name}</p>
                    <p className="text-xs text-gray-400">{exp.model} • {exp.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {exp.accuracy > 0 && (
                    <div className="text-right">
                      <p className="text-sm font-medium text-white">{exp.accuracy}%</p>
                      <p className="text-xs text-gray-400">accuracy</p>
                    </div>
                  )}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    exp.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    exp.status === 'running' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-red-500/20 text-red-400'
                  }`}>
                    {exp.status === 'completed' ? 'Completado' :
                     exp.status === 'running' ? 'En progreso' : 'Fallido'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Activity Log */}
        <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
          <h2 className="text-lg font-semibold text-white mb-4">Actividad Reciente</h2>
          <div className="space-y-4">
            {activityLog.map((log, index) => (
              <div key={index} className="flex gap-3">
                <div className={`w-2 h-2 mt-2 rounded-full flex-shrink-0 ${
                  log.type === 'success' ? 'bg-green-400' :
                  log.type === 'error' ? 'bg-red-400' :
                  'bg-blue-400'
                }`}></div>
                <div>
                  <p className="text-sm text-gray-300">{log.action}</p>
                  <p className="text-xs text-gray-500 mt-0.5">{log.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div className="bg-gray-800 border border-gray-700 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-white">Rendimiento del Modelo</h2>
          <div className="flex gap-2">
            <button className="text-xs px-3 py-1 bg-blue-600/20 text-blue-400 rounded-full border border-blue-500/30">7 días</button>
            <button className="text-xs px-3 py-1 text-gray-400 hover:text-white rounded-full">30 días</button>
            <button className="text-xs px-3 py-1 text-gray-400 hover:text-white rounded-full">90 días</button>
          </div>
        </div>
        <div className="h-48 flex items-end justify-between gap-2 px-4">
          {[65, 72, 58, 80, 75, 90, 85, 92, 88, 95, 91, 94, 89, 96].map((value, i) => (
            <div key={i} className="flex-1 flex flex-col items-center gap-1">
              <div
                className="w-full bg-gradient-to-t from-blue-600 to-purple-500 rounded-t-sm transition-all duration-500 hover:from-blue-500 hover:to-purple-400"
                style={{ height: `${value}%` }}
              ></div>
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 px-4">
          <span className="text-xs text-gray-500">Lun</span>
          <span className="text-xs text-gray-500">Dom</span>
        </div>
      </div>
    </div>
  )
}
