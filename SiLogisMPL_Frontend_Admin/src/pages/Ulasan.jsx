import React, { useState } from 'react';
import { Star, Trash2, Reply } from 'lucide-react';

export default function Ulasan() {
  const [reviews, setReviews] = useState([
    { id: 1, name: 'Budi Santoso', role: 'Manajer Logistik, PT Maju Jaya', date: '05 Sep 2024', stars: 5, text: 'Sistem tracking yang sangat akurat. LOGIS-CORE membantu kami menekan biaya operasional distribusi hingga 20% dalam 6 bulan pertama.', reply: '' },
    { id: 2, name: 'Siti Aminah', role: 'Direktur Operasional, Global Tech', date: '28 Agu 2024', stars: 5, text: 'Layanan armada yang sangat terawat dan pengemudi yang profesional. Sangat merekomendasikan untuk pengiriman barang industri berat.', reply: 'Terima kasih atas kepercayaannya, Ibu Siti. Kami akan terus mempertahankan standar layanan kami.' },
    { id: 3, name: 'Andi Wijaya', role: 'CTO, E-Logistics Indonesia', date: '15 Agu 2024', stars: 4, text: 'Integrasi API mereka sangat mulus dengan sistem inventori kami. Transparansi data yang diberikan benar-benar luar biasa.', reply: '' }
  ]);

  const [replyingId, setReplyingId] = useState(null);
  const [replyText, setReplyText] = useState('');

  const handleDelete = (id) => {
    if(window.confirm('Apakah Anda yakin ingin menghapus ulasan ini?')) {
      setReviews(reviews.filter(r => r.id !== id));
    }
  };

  const handleReplyClick = (id) => {
    setReplyingId(id);
    const review = reviews.find(r => r.id === id);
    setReplyText(review.reply || '');
  };

  const handleSaveReply = (id) => {
    setReviews(reviews.map(r => r.id === id ? { ...r, reply: replyText } : r));
    setReplyingId(null);
  };

  return (
    <div className="max-w-[1200px] animate-in fade-in duration-500">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Manajemen Ulasan</h1>
      
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900">Daftar Ulasan Pelanggan</h2>
        </div>
        
        <div className="p-6 space-y-6">
          {reviews.length === 0 ? (
            <p className="text-center text-gray-500 py-10">Belum ada ulasan.</p>
          ) : (
            reviews.map(review => (
              <div key={review.id} className="border border-gray-100 rounded-xl p-6 relative bg-[#FAFAFA]">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-bold text-gray-900 text-base">{review.name}</h3>
                    <p className="text-xs text-gray-500">{review.role} • {review.date}</p>
                  </div>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map(star => (
                      <Star key={star} className={`w-5 h-5 ${star <= review.stars ? 'text-[#FFA000] fill-[#FFA000]' : 'text-gray-300'}`} />
                    ))}
                  </div>
                </div>

                <p className="text-gray-700 text-sm mb-6 leading-relaxed">{review.text}</p>

                {review.reply && replyingId !== review.id && (
                  <div className="bg-white border-l-4 border-[#FFA000] p-4 rounded-r-xl mb-4 ml-4 shadow-sm">
                    <p className="text-xs font-bold text-gray-500 mb-1">Balasan Anda:</p>
                    <p className="text-sm text-gray-800">{review.reply}</p>
                  </div>
                )}

                {replyingId === review.id ? (
                  <div className="space-y-3 mb-4 mt-4 ml-4 bg-white p-4 rounded border border-gray-200 shadow-sm">
                    <label className="text-xs font-bold text-gray-500 block">Balas Ulasan</label>
                    <textarea 
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Tulis balasan Anda..."
                      className="w-full border border-gray-200 rounded p-3 text-sm focus:outline-none focus:border-[#FFA000] resize-none"
                      rows="3"
                    />
                    <div className="flex gap-2">
                      <button onClick={() => handleSaveReply(review.id)} className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm font-bold transition-colors">Simpan Balasan</button>
                      <button onClick={() => setReplyingId(null)} className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded text-sm font-bold transition-colors">Batal</button>
                    </div>
                  </div>
                ) : null}

                {/* Actions */}
                {replyingId !== review.id && (
                  <div className="flex items-center gap-4 pt-4 mt-4 border-t border-gray-200/60">
                    <button onClick={() => handleReplyClick(review.id)} className="flex items-center gap-1.5 text-xs font-bold text-green-600 hover:text-green-700 transition-colors">
                      <Reply className="w-4 h-4" /> Balas
                    </button>
                    <button onClick={() => handleDelete(review.id)} className="flex items-center gap-1.5 text-xs font-bold text-red-600 hover:text-red-700 transition-colors">
                      <Trash2 className="w-4 h-4" /> Hapus
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
