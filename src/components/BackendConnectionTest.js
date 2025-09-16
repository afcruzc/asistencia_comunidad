import React, { useState, useEffect } from 'react';

const BackendConnectionTest = () => {
  const [connectionStatus, setConnectionStatus] = useState('Probando conexión...');
  const [backendData, setBackendData] = useState(null);
  const [serverInfo, setServerInfo] = useState({});
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    testBackendConnection();
  }, []);

  const addTestResult = (test, status, details = '') => {
    setTestResults(prev => [...prev, { test, status, details, timestamp: new Date().toLocaleTimeString() }]);
  };

  const testBackendConnection = async () => {
    setTestResults([]);
    setConnectionStatus('Probando conexión...');
    setBackendData(null);
    setServerInfo({});

    // Lista de URLs a probar
    const testUrls = [
      { name: 'Localhost', url: 'http://localhost:4000/' },
      { name: 'Servidor Remoto', url: 'https://cluster0.4yyngfr.mongodb.net/' },
      { name: 'API Local', url: 'http://localhost:4000/api/persons' },
      { name: 'API Remota', url: 'https://cluster0.4yyngfr.mongodb.net/api/persons' }
    ];

    for (const test of testUrls) {
      try {
        console.log(`Probando: ${test.name} - ${test.url}`);
        const startTime = Date.now();
        const response = await fetch(test.url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
          // Timeout de 5 segundos
          signal: AbortSignal.timeout(5000)
        });
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        if (response.ok) {
          const data = await response.text();
          addTestResult(test.name, '✅', `Respuesta en ${responseTime}ms`);
          
          if (test.name === 'Localhost' || test.name === 'Servidor Remoto') {
            setConnectionStatus(`✅ Conexión exitosa con ${test.name}`);
            setBackendData(data);
            setServerInfo({
              url: test.url,
              responseTime,
              status: response.status,
              headers: Object.fromEntries(response.headers.entries())
            });
          }
        } else {
          addTestResult(test.name, '❌', `HTTP ${response.status}: ${response.statusText}`);
        }
      } catch (error) {
        const errorMessage = error.name === 'AbortError' ? 'Timeout (5s)' : error.message;
        addTestResult(test.name, '❌', errorMessage);
        console.error(`Error en ${test.name}:`, error);
      }
    }

    // Si no hay conexiones exitosas
    if (!testResults.some(r => r.status === '✅')) {
      setConnectionStatus('❌ No se pudo conectar a ningún servidor');
    }
  };

  const testSpecificEndpoint = async (url) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        alert(`✅ Endpoint funcionando\nURL: ${url}\nRespuesta: ${JSON.stringify(data, null, 2)}`);
      } else {
        alert(`❌ Error en endpoint\nURL: ${url}\nStatus: ${response.status}`);
      }
    } catch (error) {
      alert(`❌ Error al probar endpoint\nURL: ${url}\nError: ${error.message}`);
    }
  };

  const pingServer = async (url) => {
    try {
      const startTime = Date.now();
      const response = await fetch(url, { method: 'HEAD' });
      const endTime = Date.now();
      const pingTime = endTime - startTime;
      
      alert(`🏓 Ping a ${url}\nTiempo: ${pingTime}ms\nStatus: ${response.status}`);
    } catch (error) {
      alert(`❌ Error en ping a ${url}\nError: ${error.message}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-6">Prueba de Conexión Backend</h2>
      
      <div className="mb-6">
        <p className="text-sm font-medium text-gray-700 mb-2">Estado general:</p>
        <p className={`text-lg font-semibold ${connectionStatus.includes('✅') ? 'text-green-600' : 'text-red-600'}`}>
          {connectionStatus}
        </p>
      </div>

      {backendData && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Respuesta del servidor:</p>
          <div className="text-sm text-gray-600 bg-gray-100 p-3 rounded border">
            <pre className="whitespace-pre-wrap">{backendData}</pre>
          </div>
        </div>
      )}

      {Object.keys(serverInfo).length > 0 && (
        <div className="mb-6">
          <p className="text-sm font-medium text-gray-700 mb-2">Información del servidor:</p>
          <div className="text-sm text-gray-600 bg-blue-50 p-3 rounded border">
            <p><strong>URL:</strong> {serverInfo.url}</p>
            <p><strong>Tiempo de respuesta:</strong> {serverInfo.responseTime}ms</p>
            <p><strong>Status:</strong> {serverInfo.status}</p>
          </div>
        </div>
      )}

      <div className="mb-6">
        <h3 className="text-lg font-semibold mb-3">Resultados de Pruebas</h3>
        <div className="space-y-2">
          {testResults.map((result, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded border">
              <div className="flex items-center space-x-3">
                <span className="text-lg">{result.status}</span>
                <span className="font-medium">{result.test}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span>{result.details}</span>
                <span className="ml-2 text-xs text-gray-400">({result.timestamp})</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <button
          onClick={testBackendConnection}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded"
        >
          🔄 Probar Todas las Conexiones
        </button>
        
        <button
          onClick={() => testSpecificEndpoint('http://localhost:4000/api/persons')}
          className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-4 rounded"
        >
          🧪 Probar API Local
        </button>

        <button
          onClick={() => pingServer('http://localhost:4000')}
          className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-3 px-4 rounded"
        >
          🏓 Ping Localhost
        </button>

        <button
          onClick={() => pingServer('https://tu-servidor-remoto.com')}
          className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-3 px-4 rounded"
        >
          🏓 Ping Servidor Remoto
        </button>
      </div>

      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <h4 className="font-semibold text-yellow-800 mb-2">📋 Configuración Necesaria</h4>
        <div className="text-sm text-yellow-700 space-y-1">
          <p>• <strong>Backend:</strong> Necesitas configurar las credenciales de MongoDB Atlas</p>
          <p>• <strong>Frontend:</strong> Actualizar la URL del API en <code>src/utils/api.js</code></p>
          <p>• <strong>Variables de entorno:</strong> Crear archivo <code>.env</code> en el backend</p>
          <p>• <strong>IP Whitelist:</strong> Agregar tu IP a MongoDB Atlas</p>
        </div>
      </div>

      <div className="mt-4 text-xs text-gray-500">
        <p><strong>URLs esperadas:</strong></p>
        <p>• Backend local: http://localhost:4000</p>
        <p>• Backend remoto: https://tu-servidor-remoto.com</p>
        <p>• API local: http://localhost:4000/api</p>
        <p>• API remota: https://tu-servidor-remoto.com/api</p>
      </div>
    </div>
  );
};

export default BackendConnectionTest;
