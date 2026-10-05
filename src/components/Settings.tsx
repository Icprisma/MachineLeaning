import { useState } from 'react'

export default function Settings() {
  const [activeTab, setActiveTab] = useState('general')
  const [settings, setSettings] = useState({
    projectName: 'Mi Proyecto AutoML',
    email: 'usuario@empresa.com',
    gpuProvider: 'local',
    maxGpuHours: 100,
    autoSave: true,
    notifications: true,
    darkMode: true,
    language: 'es',
    apiEndpoint: 'https://api.automl.local/v1',
    apiKey: 'sk-xxxx-xxxx-xxxx-xxxx',
    maxRetries: 3,
    timeout: 3600,
  })

  const tabs = [
    { id: 'general', label: 'General', icon: 'fa-cog' },
    { id: 'compute', label: 'Computo', icon: 'fa-microchip' },
    { id: 'api', label: 'API', icon: 'fa-code' },
    { id: 'notifications', label: 'Notificaciones', icon: 'fa-bell' },
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Configuración</h1>
        <p className="text-gray-400 mt-1">Personaliza tu experiencia en AutoML</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-gray-800 border border-gray-700 rounded-xl p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors mb-1 ${
                  activeTab === tab.id
                    ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                    : 'text-gray-400 hover:text-white hover:bg-gray-700/50'
                }`}
              >
                <i className={`fas ${tab.icon} w-5 text-center`}></i>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
          {activeTab === 'general' && (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-semibold text-white">Configuración General</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Nombre del Proyecto</label>
                  <input
                    type="text"
                    value={settings.projectName}
                    onChange={(e) => setSettings({ ...settings, projectName: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Email</label>
                  <input
                    type="email"
                    value={settings.email}
                    onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Idioma</label>
                  <select
                    value={settings.language}
                    onChange={(e) => setSettings({ ...settings, language: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="pt">Português</option>
                  </select>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm text-white">Modo Oscuro</p>
                    <p className="text-xs text-gray-400">Usar tema oscuro en la interfaz</p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, darkMode: !settings.darkMode })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.darkMode ? 'bg-blue-600' : 'bg-gray-600'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${settings.darkMode ? 'left-6.5 left-[26px]' : 'left-0.5'}`}></div>
                  </button>
                </div>
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm text-white">Auto-guardar</p>
                    <p className="text-xs text-gray-400">Guardar automáticamente los cambios</p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, autoSave: !settings.autoSave })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.autoSave ? 'bg-blue-600' : 'bg-gray-600'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${settings.autoSave ? 'left-6.5 left-[26px]' : 'left-0.5'}`}></div>
                  </button>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm transition-colors">
                  Guardar Cambios
                </button>
              </div>
            </div>
          )}

          {activeTab === 'compute' && (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-semibold text-white">Recursos de Cómputo</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Proveedor GPU</label>
                  <select
                    value={settings.gpuProvider}
                    onChange={(e) => setSettings({ ...settings, gpuProvider: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  >
                    <option value="local">Local (RTX 4090)</option>
                    <option value="aws">AWS (p4d.24xlarge)</option>
                    <option value="gcp">GCP (A100)</option>
                    <option value="azure">Azure (NC24ads)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Máximo de Horas GPU/mes</label>
                  <input
                    type="number"
                    value={settings.maxGpuHours}
                    onChange={(e) => setSettings({ ...settings, maxGpuHours: parseInt(e.target.value) })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Timeout de Entrenamiento (segundos)</label>
                  <input
                    type="number"
                    value={settings.timeout}
                    onChange={(e) => setSettings({ ...settings, timeout: parseInt(e.target.value) })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Reintentos Máximos</label>
                  <input
                    type="number"
                    value={settings.maxRetries}
                    onChange={(e) => setSettings({ ...settings, maxRetries: parseInt(e.target.value) })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              {/* GPU Status */}
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-sm font-medium text-white mb-3">Estado Actual</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-xs text-gray-400">GPU</p>
                    <p className="text-sm text-green-400">NVIDIA RTX 4090</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">VRAM</p>
                    <p className="text-sm text-white">24 GB GDDR6X</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Temperatura</p>
                    <p className="text-sm text-yellow-400">62°C</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Driver</p>
                    <p className="text-sm text-white">v545.29</p>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm transition-colors">
                  Guardar Cambios
                </button>
              </div>
            </div>
          )}

          {activeTab === 'api' && (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-semibold text-white">Configuración API</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">API Endpoint</label>
                  <input
                    type="text"
                    value={settings.apiEndpoint}
                    onChange={(e) => setSettings({ ...settings, apiEndpoint: e.target.value })}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 font-mono text-sm"
                  />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">API Key</label>
                  <div className="relative">
                    <input
                      type="password"
                      value={settings.apiKey}
                      onChange={(e) => setSettings({ ...settings, apiKey: e.target.value })}
                      className="w-full bg-gray-700 border border-gray-600 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 font-mono text-sm pr-10"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white">
                      <i className="fas fa-eye text-sm"></i>
                    </button>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Mantén tu API key en secreto</p>
                </div>
              </div>

              {/* API Endpoints List */}
              <div className="bg-gray-700/30 rounded-lg p-4">
                <h3 className="text-sm font-medium text-white mb-3">Endpoints Disponibles</h3>
                <div className="space-y-2">
                  {[
                    { method: 'POST', path: '/api/v1/models/train', desc: 'Iniciar entrenamiento' },
                    { method: 'GET', path: '/api/v1/models', desc: 'Listar modelos' },
                    { method: 'POST', path: '/api/v1/predict', desc: 'Hacer predicción' },
                    { method: 'GET', path: '/api/v1/datasets', desc: 'Listar datasets' },
                  ].map((endpoint, i) => (
                    <div key={i} className="flex items-center gap-3 p-2 bg-gray-800/50 rounded">
                      <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded ${
                        endpoint.method === 'POST' ? 'bg-green-500/20 text-green-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {endpoint.method}
                      </span>
                      <code className="text-xs text-gray-300 font-mono">{endpoint.path}</code>
                      <span className="text-xs text-gray-500 ml-auto">{endpoint.desc}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700 flex gap-3">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm transition-colors">
                  Guardar Cambios
                </button>
                <button className="bg-gray-700 hover:bg-gray-600 text-white px-6 py-2 rounded-lg text-sm transition-colors">
                  Regenerar API Key
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-gray-800 border border-gray-700 rounded-xl p-6 space-y-6">
              <h2 className="text-lg font-semibold text-white">Notificaciones</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-sm text-white">Notificaciones por Email</p>
                    <p className="text-xs text-gray-400">Recibir alertas por correo electrónico</p>
                  </div>
                  <button
                    onClick={() => setSettings({ ...settings, notifications: !settings.notifications })}
                    className={`w-12 h-6 rounded-full transition-colors relative ${settings.notifications ? 'bg-blue-600' : 'bg-gray-600'}`}
                  >
                    <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all ${settings.notifications ? 'left-6.5 left-[26px]' : 'left-0.5'}`}></div>
                  </button>
                </div>
                
                <div className="border-t border-gray-700 pt-4">
                  <h3 className="text-sm font-medium text-white mb-3">Eventos a Notificar</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Entrenamiento completado', enabled: true },
                      { label: 'Error en entrenamiento', enabled: true },
                      { label: 'Dataset procesado', enabled: true },
                      { label: 'Modelo desplegado', enabled: false },
                      { label: 'Uso de GPU alto', enabled: true },
                      { label: 'Reporte semanal', enabled: false },
                    ].map((item, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-sm text-gray-300">{item.label}</span>
                        <div className={`w-10 h-5 rounded-full relative cursor-pointer ${item.enabled ? 'bg-blue-600' : 'bg-gray-600'}`}>
                          <div className={`w-4 h-4 bg-white rounded-full absolute top-0.5 ${item.enabled ? 'left-[22px]' : 'left-[2px]'}`}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-gray-700">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg text-sm transition-colors">
                  Guardar Cambios
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
