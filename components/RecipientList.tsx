import React from 'react';
import { Recipient } from '../types';
import { maskPBP } from '../utils';

interface RecipientListProps {
  data: Recipient[];
}

const RecipientList: React.FC<RecipientListProps> = ({ data }) => {
  if (data.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-sm mt-4">
        <div className="text-gray-400 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-12 h-12 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-900">Data tidak ditemukan</h3>
        <p className="text-gray-500">Silakan cek ejaan nama atau nomor PBP Anda.</p>
      </div>
    );
  }

  return (
    <>
      {/* Desktop Table */}
      <div className="hidden md:block overflow-hidden rounded-lg shadow ring-1 ring-black ring-opacity-5 mt-6">
        <table className="min-w-full divide-y divide-gray-300">
          <thead className="bg-blue-50">
            <tr>
              <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-royal-blue sm:pl-6 w-16">
                No
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-royal-blue">
                Nama
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-royal-blue">
                Alamat
              </th>
               <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-royal-blue">
                Tgl Lahir
              </th>
              <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-royal-blue">
                Nomor PBP
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {data.map((person, index) => {
              const showHeader = index === 0 || person.alamat !== data[index - 1].alamat;
              
              return (
                <React.Fragment key={person.pbp || index}>
                  {showHeader && (
                    <tr className="bg-gray-100">
                      <td colSpan={5} className="py-2 pl-4 pr-3 text-left text-sm font-bold text-gray-700 sm:pl-6">
                        {person.alamat}
                      </td>
                    </tr>
                  )}
                  <tr className="hover:bg-sky-50 transition-colors">
                    <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                      {person.no}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-700 font-medium">
                      {person.nama}
                    </td>
                     <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.alamat}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                      {person.tanggal_lahir}
                    </td>
                    <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500 font-mono">
                      {maskPBP(person.pbp)}
                    </td>
                  </tr>
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden mt-4 space-y-4">
        {data.map((person, index) => {
           const showHeader = index === 0 || person.alamat !== data[index - 1].alamat;

           return (
             <React.Fragment key={person.pbp || index}>
                {showHeader && (
                  <div className="sticky top-0 z-10 bg-gray-100/95 backdrop-blur-sm px-4 py-2 rounded-md font-bold text-gray-700 shadow-sm mt-6 border-b border-gray-200">
                    {person.alamat}
                  </div>
                )}
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 flex flex-col gap-3 relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-1 h-full bg-sky-500"></div>
                  
                  <div className="flex justify-between items-start pl-2">
                      <span className="text-xs font-bold text-gray-500 bg-gray-100 px-2 py-0.5 rounded">#{person.no}</span>
                      <span className="text-xs text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-100">
                        Lahir: {person.tanggal_lahir}
                      </span>
                  </div>
                  
                  <div className="pl-2">
                      <h3 className="text-lg font-bold text-gray-900 leading-tight">{person.nama}</h3>
                      <p className="text-sm text-gray-500 mt-1">{person.alamat}</p>
                  </div>
                  
                  <div className="mt-1 pt-3 border-t border-gray-50 flex flex-col pl-2">
                    <span className="text-[10px] text-gray-400 uppercase tracking-wider font-semibold">Nomor PBP</span>
                    <span className="text-base font-mono text-royal-blue font-semibold tracking-wide">{maskPBP(person.pbp)}</span>
                  </div>
                </div>
             </React.Fragment>
           );
        })}
      </div>
    </>
  );
};

export default RecipientList;