const CurrentOccupancyGauge = ({ percentage }) => {
  const radius = 7;
  const circumference = 2 * Math.PI * radius;
  // Calculo de desplazamiento basado en el porcentaje real
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="bg-gray-800 p-5 rounded-lg shadow-xl flex flex-col justify-start items-center h-96">
      <h2 className="text-lg font-semibold text-white self-start">Current Occupancy</h2>

      <div className="grow flex items-center justify-center">
        <div className="relative w-40 h-40">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              className="text-gray-700"
              strokeWidth="10"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="80"
              cy="80"
            />
            {/* El strokeDashoffset usa el valor 'percentage' de la API */}
            <circle
              className="text-blue-50 transition-all duration-1000 ease-out"
              strokeWidth="10"
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeLinecap="round"
              stroke="currentColor"
              fill="transparent"
              r={radius}
              cx="80"
              cy="80"
            />
          </svg>
          <div className="absolute top-0 left-0 w-full flex flex-col items-center justify-center">
            <span className="text-4xl font-bold text-white">{percentage}%</span>
            <span className="text-sm text-gray-400">Occupied</span>
          </div>
        </div>
      </div>
      {/* Aqui se puede agregar otra metrica  */}
    </div>
  );
};
export default CurrentOccupancyGauge;
