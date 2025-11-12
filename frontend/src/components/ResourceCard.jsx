import React from 'react';
import { Users, Monitor, PenTool, Wifi, Power, Server, Lock, Trash2 } from 'lucide-react';

// Mapeo de la característica enviada por el Backend a un componente de icono de Lucide
const FEATURE_ICONS = {
  'TV': Monitor,
  'WHITEBOARD': PenTool,
  'WIFI': Wifi,
  'POWER': Power,
  'HDMI': Server,
  'LOCKABLE': Lock,
  // Podemos añadir más mapeos aquí sin modificar la función principal
};

// Función para obtener el ícono
const getFeatureIcon = (feature) => {
  const featureText = feature.toString().toUpperCase();
  
  // Caso especial: Capacidad (si es solo un número)
  if (!isNaN(parseInt(featureText))) { 
    return Users; // Devuelve el componente Users para capacidad
  }

  // Mapeo de características estandarizadas
  return FEATURE_ICONS[featureText];
};

const ResourceCard = ({ resource }) => {
  const { 
    status,
    image, 
    title, 
    type, 
    features // Array de strings/números estandarizados, ej: [8, 'TV', 'WHITEBOARD', 'Wifi']
  } = resource;

  let statusColor = 'bg-green-500';
  if (status === 'Booked') {
    statusColor = 'bg-red-500';
  } else if (status === 'Out of Service') {
    statusColor = 'bg-red-700';
  }

  return (
    <div className="
      bg-gray-800 
      text-white 
      rounded-lg 
      shadow-xl 
      overflow-hidden 
      max-w-xs 
      w-full
    ">
      
      {/* 🖼️ Imagen y Estado (Badge) */}
      <div className="relative h-48">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover" 
        />
        <div className={`
          absolute 
          top-3 
          right-3 
          px-3 py-1 
          text-xs font-semibold 
          rounded-full 
          ${statusColor} 
          text-white 
          flex items-center space-x-1
        `}>
          <div className="w-2 h-2 rounded-full bg-white bg-opacity-80"></div>
          <span>{status}</span>
        </div>
      </div>

      {/* 📝 Contenido Principal */}
      <div className="p-4">
        <h3 className="text-xl font-bold mb-1">{title}</h3>
        <p className="text-sm text-gray-400 mb-4">{type}</p>
        
        {/* Características */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-300">
          {features.map((feature, index) => {
            const IconComponent = getFeatureIcon(feature);
            
            return (
              <div key={index} className="flex items-center space-x-1">
                {IconComponent && <IconComponent className="w-4 h-4" />}
                <span>{feature}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 🛠️ Acciones (Botones) */}
      <div className="flex border-t border-gray-700 divide-x divide-gray-700">
        
        <button className="flex-1 py-3 text-sm hover:bg-gray-700 transition duration-150 flex items-center justify-center space-x-2 text-blue-400">
          <PenTool className="w-4 h-4" />
          <span>Edit</span>
        </button>

        <button className="flex-1 py-3 text-sm hover:bg-gray-700 transition duration-150 flex items-center justify-center space-x-2 text-red-500">
          <Trash2 className="w-4 h-4" />
          <span>Delete</span>
        </button>
      </div>
    </div>
  );
};

export default ResourceCard;