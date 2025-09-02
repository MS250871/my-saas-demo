import { useState, useEffect } from 'react';
import { Controller } from 'react-hook-form';

export function ColorInput({
  label,
  name,
  control,
  value,
  shades,
  onChange,
  shadeLabels,
}: {
  label: string;
  name: string;
  control: any;
  value: string;
  shades: string[];
  onChange: (val: string) => void;
  shadeLabels: string[];
}) {
  // Local state for the text input
  const [inputValue, setInputValue] = useState(value);

  // Keep local state in sync with RHF field value
  useEffect(() => {
    setInputValue(value);
  }, [value]);

  // Helper to check valid hex
  function isHex(val: string) {
    return /^#([A-Fa-f0-9]{6})$/.test(val);
  }

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <div>
          <label className="block font-semibold mb-1">
            {label} Color (500)
          </label>
          <div className="flex items-center gap-2">
            <input
              type="color"
              value={isHex(field.value) ? field.value : '#000000'}
              onChange={(e) => {
                field.onChange(e.target.value);
                onChange(e.target.value);
              }}
              className="w-16 h-8 border rounded "
              style={{ padding: '4px' }}
            />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => {
                const val = e.target.value;
                setInputValue(val);
                if (isHex(val)) {
                  field.onChange(val);
                  onChange(val);
                }
              }}
              maxLength={7}
              className={`w-24 border rounded px-2 py-1 font-mono ${
                fieldState.error ? 'border-red-500' : ''
              }`}
            />
          </div>
          {fieldState.error && (
            <span className="text-xs text-red-600">
              {fieldState.error.message}
            </span>
          )}
          <div className="flex flex-wrap gap-3 mt-2">
            {shadeLabels.map((label, idx) => (
              <div key={label} className="flex flex-col items-center">
                <div
                  className="w-12 h-12 rounded border"
                  style={{ backgroundColor: shades[idx] }}
                />
                <span className="text-xs mt-1">
                  {shades[idx]?.toUpperCase()}
                </span>
                <span className="text-xs text-muted-foreground">{label}</span>
                {label !== '500' && (
                  <input
                    type="hidden"
                    name={`${name.split('_')[0]}_${label}`}
                    value={shades[idx]}
                    readOnly
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    />
  );
}
