// src/components/PrintButton.tsx

import { Printer } from 'lucide-react';

export function PrintButton() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <button
      type="button"
      onClick={handlePrint}
      className="
        print:hidden
        inline-flex items-center justify-center gap-2
        rounded-full bg-[#31483A] px-5 py-3
        text-sm font-semibold text-white
        shadow-sm transition-all duration-300
        hover:-translate-y-0.5 hover:bg-[#26392E] hover:shadow-lg
        focus:outline-none focus-visible:ring-2
        focus-visible:ring-[#31483A] focus-visible:ring-offset-2
      "
      aria-label="Drukuj ofertę lub zapisz ją jako PDF"
    >
      <Printer className="h-4 w-4" aria-hidden="true" />
      Pobierz ofertę PDF
    </button>
  );
}