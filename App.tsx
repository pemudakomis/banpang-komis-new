import React, { useState, useMemo, useEffect } from 'react';
import { DATA_PENERIMA } from './data';
import { maskPBP, normalizeString } from './utils';
import SearchBar from './components/SearchBar';
import Pagination from './components/Pagination';
import RecipientList from './components/RecipientList';
import Footer from './components/Footer';
import ComplaintForm from './components/ComplaintForm';

const DUSUN_OPTIONS = [
  { label: 'Semua', value: 'SEMUA' },
  { label: 'Dsn. Duko', value: 'DSN. DUKO' },
  { label: 'Dsn. Komis', value: 'DSN. KOMIS' },
  { label: 'Dsn. Malakah', value: 'DSN. MALAKAH' },
  { label: 'Dsn. Totongan', value: 'DSN. TOTONGAN' },
];

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDusun, setSelectedDusun] = useState('SEMUA');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(50);
  const [isComplaintFormOpen, setIsComplaintFormOpen] = useState(false);

  // Filter Logic
  const filteredData = useMemo(() => {
    let data = DATA_PENERIMA;

    // 1. Filter by Dusun
    if (selectedDusun !== 'SEMUA') {
      data = data.filter(person => person.alamat === selectedDusun);
    }

    // 2. Filter by Search Query
    const query = normalizeString(searchQuery);
    if (!query) return data;

    return data.filter((person) => {
      // 1. Check Name
      const nameMatch = normalizeString(person.nama).includes(query);
      
      // 2. Check Raw PBP
      const rawPbpMatch = person.pbp.includes(query);

      // 3. Check Masked PBP (User types "***")
      const maskedPbp = maskPBP(person.pbp);
      const maskedPbpMatch = maskedPbp.includes(searchQuery);
      
      // 4. Check Dusun (Useful if global search)
      const dusunMatch = normalizeString(person.alamat).includes(query);

      return nameMatch || rawPbpMatch || maskedPbpMatch || dusunMatch;
    });
  }, [searchQuery, selectedDusun]);

  // Pagination Logic
  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  
  // Reset to page 1 if search or filter changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, itemsPerPage, selectedDusun]);

  const currentData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredData.slice(start, start + itemsPerPage);
  }, [currentPage, itemsPerPage, filteredData]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-800 bg-gray-50">
      {/* Header */}
      <header className="bg-gradient-to-r from-royal-blue to-blue-900 text-white pb-16 pt-10 px-4 shadow-lg text-center relative">
        <h1 className="text-2xl md:text-4xl font-extrabold tracking-tight mb-3">
          DAFTAR PENERIMA BANTUAN PANGAN
        </h1>
        <h2 className="text-lg md:text-2xl font-semibold text-blue-100 mb-2">
          DESA KOMIS 2025
        </h2>
        <p className="text-blue-200 text-sm md:text-base max-w-xl mx-auto">
          Cek nama Anda pada daftar di bawah ini. Pilih Dusun atau gunakan pencarian untuk menemukan data.
        </p>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full max-w-5xl mx-auto px-4 pb-8">
        
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Dusun Filter Buttons */}
        <div className="mt-8 mb-6">
          <p className="text-center text-sm text-gray-500 mb-3 font-medium">Pilih Wilayah Dusun:</p>
          <div className="flex flex-wrap justify-center gap-2 md:gap-3">
            {DUSUN_OPTIONS.map((option) => (
              <button
                key={option.value}
                onClick={() => setSelectedDusun(option.value)}
                className={`px-4 py-2.5 rounded-full text-sm font-medium transition-all duration-200 shadow-sm border active:scale-95
                  ${selectedDusun === option.value 
                    ? 'bg-royal-blue text-white border-royal-blue shadow-md transform scale-105' 
                    : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50 hover:border-gray-300'}
                `}
              >
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className="">
            <div className="flex flex-col md:flex-row justify-between items-end mb-4 gap-2">
                <div>
                  <h3 className="text-xl font-bold text-gray-800 border-l-4 border-royal-blue pl-3">
                      {selectedDusun === 'SEMUA' ? 'Daftar Semua Penerima' : `Daftar Penerima ${DUSUN_OPTIONS.find(o => o.value === selectedDusun)?.label}`}
                  </h3>
                  {searchQuery && (
                    <p className="text-sm text-gray-500 mt-1 pl-4">
                      Hasil pencarian untuk: <span className="font-semibold text-gray-700">"{searchQuery}"</span>
                    </p>
                  )}
                </div>
                <span className="text-sm text-gray-500 bg-white border border-gray-200 px-3 py-1 rounded-full shadow-sm">
                    Total: <span className="font-bold text-royal-blue">{totalItems}</span> Data
                </span>
            </div>
            
            <RecipientList data={currentData} />
            
            <Pagination 
                currentPage={currentPage}
                totalPages={totalPages}
                itemsPerPage={itemsPerPage}
                totalItems={totalItems}
                onPageChange={handlePageChange}
                onItemsPerPageChange={setItemsPerPage}
            />
        </div>
      </main>

      <Footer onOpenComplaint={() => setIsComplaintFormOpen(true)} />

      {/* Complaint Modal */}
      {isComplaintFormOpen && (
        <ComplaintForm onClose={() => setIsComplaintFormOpen(false)} />
      )}
    </div>
  );
};

export default App;