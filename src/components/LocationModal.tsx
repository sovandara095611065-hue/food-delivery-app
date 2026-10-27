import React from 'react';
import { X, MapPin, Check } from 'lucide-react';
import { PHNOM_PENH_LOCATIONS } from '../data/mockData';

interface LocationModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentLocation: string;
  onSelectLocation: (loc: string) => void;
}

export const LocationModal: React.FC<LocationModalProps> = ({
  isOpen,
  onClose,
  currentLocation,
  onSelectLocation,
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-xs z-50 transition-opacity animate-in fade-in"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Select Delivery Location"
        className="fixed inset-x-4 top-1/2 -translate-y-1/2 z-50 max-w-sm mx-auto bg-white rounded-3xl shadow-2xl p-5 overflow-hidden animate-in zoom-in-95 duration-200"
      >
        <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5 text-[#000570]" />
            <h3 className="font-extrabold text-base text-[#000570]">Select Location</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-neutral-100 text-neutral-500 hover:text-neutral-900"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="py-3 space-y-1.5 max-h-72 overflow-y-auto">
          {PHNOM_PENH_LOCATIONS.map((loc) => {
            const isSelected = currentLocation.includes(loc) || loc.includes(currentLocation);
            return (
              <button
                key={loc}
                onClick={() => {
                  onSelectLocation(loc);
                  onClose();
                }}
                className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-xl text-left text-xs font-semibold transition-all duration-200 ${
                  isSelected
                    ? 'bg-blue-50 text-[#000570] border border-blue-200'
                    : 'text-neutral-700 hover:bg-neutral-100'
                }`}
              >
                <span>{loc}</span>
                {isSelected && <Check className="w-4 h-4 text-[#000570]" />}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
};
