import React from 'react';

interface FooterProps {
  onOpenComplaint: () => void;
}

const Footer: React.FC<FooterProps> = ({ onOpenComplaint }) => {
  return (
    <footer className="mt-12">
      {/* Complaint Service Section */}
      <div className="bg-red-50 border border-red-100 rounded-xl p-6 md:p-8 mb-8 mx-4 md:mx-0 shadow-sm relative overflow-hidden">
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left">
            <div className="flex-1">
                <h3 className="text-lg md:text-xl font-bold text-red-800 mb-2 flex items-center justify-center md:justify-start gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z" />
                    </svg>
                    Layanan Pengaduan Masyarakat
                </h3>
                <p className="text-red-700/80 text-sm md:text-base leading-relaxed">
                    Menemukan data fiktif, penyalahgunaan bantuan, atau pengalihan hak? 
                    Laporkan segera agar bantuan tersalurkan sesuai prosedur.
                </p>
            </div>
            <button 
                onClick={onOpenComplaint}
                className="flex items-center gap-2 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-lg shadow-md transition-transform hover:scale-105 whitespace-nowrap"
            >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Buat Pengaduan
            </button>
        </div>
      </div>

      {/* Identity Section */}
      <div className="bg-slate-900 text-slate-300 py-8 px-4">
        <div className="max-w-5xl mx-auto text-center">
            <p className="font-semibold text-white tracking-wide text-lg mb-2">© 2025 PEMUDA DESA KOMIS BERSATU</p>
            <p className="text-sm italic font-light opacity-80">"Mengawal Hak Rakyat Kecil"</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;