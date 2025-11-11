import React, { useState } from 'react';

const InputGroup = ({ label, type, placeholder }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPasswordField = type === 'password';

  const inputType = isPasswordField && showPassword ? 'text' : type;

  // Las clases ya no usan 'dark:' ya que el tema oscuro es el único.
  const baseInputClasses = `
    h-14 w-full min-w-0 flex-1 resize-none overflow-hidden 
    form-input bg-form-bg p-4 text-base font-normal leading-normal text-white
    border  
    placeholder:text-gray-500 border-gray-700
    focus:border-primary focus:outline-0 focus:ring-2 focus:ring-primary/20
  `;
  
  const specificClasses = isPasswordField 
    ? 'rounded-l-lg border-r-0' 
    : 'rounded-lg';


  return (
    <label className="flex flex-col">
      {/* Texto del label en gris claro */}
      <p className="pb-2 text-base font-medium leading-normal text-gray-200">{label}</p>
      <div className="flex w-full flex-1 items-stretch">
        <input
          className={`${baseInputClasses} ${specificClasses}`}
          placeholder={placeholder}
          type={inputType}
        />
        
        {isPasswordField && (
          // Ícono de visibilidad
          <div 
            className="flex cursor-pointer items-center justify-center rounded-r-lg border border-l-0 border-gray-700 bg-form-bg px-4 text-gray-400 hover:text-white"
            onClick={() => setShowPassword(!showPassword)}
          >
            <span className="material-symbols-outlined text-2xl">
              {showPassword ? 'visibility' : 'visibility_off'}
            </span>
          </div>
        )}
      </div>
    </label>
  );
};

export default InputGroup;