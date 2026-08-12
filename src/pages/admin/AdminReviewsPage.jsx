import React, { useEffect, useState } from 'react';
import { Star, Trash2, Plus, Pencil, X, Check } from 'lucide-react';

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000/api';
const token = () => localStorage.getItem('token');

const EMPTY = { name: '', rating: 5, review: '', is_active: true };

export function AdminReviewsPage() {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState(EMPTY);
  const [editId, setEditId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);

  const fetchReviews = () => {
    fetch(`${BACKEND_URL}/admin/reviews`, { headers: { Authorization: `Bearer ${token()}` } })
      .then(r => r.json())
      .then(d => { if (d.reviews) setReviews(d.reviews); })
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchReviews(); }, []);

  const openAdd = () => { setForm(EMPTY); setEditId(null); setShowForm(true); };
  const openEdit = (r) => { setForm({ name: r.name, rating: r.rating, review: r.review, is_active: r.is_active }); setEditId(r.id); setShowForm(true); };
  const closeForm = () => { setShowForm(false); setEditId(null); setForm(EMPTY); };

  const save = async () => {
    if (!form.name.trim() || !form.review.trim()) return;
    setSaving(true);
    const url = editId ? `${BACKEND_URL}/admin/reviews/${editId}` : `${BACKEND_URL}/admin/reviews`;
    const method = editId ? 'PUT' : 'POST';
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.review) {
      setReviews(prev => editId
        ? prev.map(r => r.id === editId ? data.review : r)
        : [data.review, ...prev]
      );
    }
    setSaving(false);
    closeForm();
  };

  const toggle = async (r) => {
    const res = await fetch(`${BACKEND_URL}/admin/reviews/${r.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token()}` },
      body: JSON.stringify({ ...r, is_active: !r.is_active }),
    });
    const data = await res.json();
    if (data.review) setReviews(prev => prev.map(x => x.id === r.id ? data.review : x));
  };

  const remove = async (id) => {
    if (!confirm('Delete this review?')) return;
    await fetch(`${BACKEND_URL}/admin/reviews/${id}`, {
      method: 'DELETE', headers: { Authorization: `Bearer ${token()}` },
    });
    setReviews(prev => prev.filter(r => r.id !== id));
  };

  if (loading) return (
    <div className="flex items-center justify-center py-20">
      <div className="w-8 h-8 border-4 border-[#C16E4F]/20 border-t-[#C16E4F] rounded-full animate-spin" />
    </div>
  );

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="font-serif text-2xl font-bold text-[#5C4033]">Homepage Reviews</h1>
          <p className="text-[#5C4033]/40 text-xs mt-0.5">{reviews.length} reviews</p>
        </div>
        <button onClick={openAdd}
          className="flex items-center gap-2 bg-[#C16E4F] text-white px-4 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#A0522D] transition-colors">
          <Plus className="w-4 h-4" /> Add Review
        </button>
      </div>

      {/* Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="font-serif font-bold text-[#5C4033]">{editId ? 'Edit Review' : 'Add Review'}</h2>
              <button onClick={closeForm}><X className="w-5 h-5 text-gray-400" /></button>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Customer Name</label>
              <input value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#C16E4F]"
                placeholder="e.g. Priya Sharma" />
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Rating</label>
              <div className="flex gap-1">
                {[1,2,3,4,5].map(s => (
                  <button key={s} onClick={() => setForm(p => ({ ...p, rating: s }))}>
                    <Star className={`w-6 h-6 ${s <= form.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`} />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider block mb-1">Review Text</label>
              <textarea value={form.review} onChange={e => setForm(p => ({ ...p, review: e.target.value }))}
                rows={3}
                className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:border-[#C16E4F] resize-none"
                placeholder="Customer review..." />
            </div>

            <div className="flex items-center gap-2">
              <input type="checkbox" id="is_active" checked={form.is_active}
                onChange={e => setForm(p => ({ ...p, is_active: e.target.checked }))}
                className="accent-[#C16E4F]" />
              <label htmlFor="is_active" className="text-sm text-gray-600">Show on homepage</label>
            </div>

            <div className="flex gap-3 pt-2">
              <button onClick={closeForm}
                className="flex-1 border border-gray-200 text-gray-600 py-2.5 rounded-xl text-sm font-semibold">
                Cancel
              </button>
              <button onClick={save} disabled={saving}
                className="flex-1 bg-[#C16E4F] text-white py-2.5 rounded-xl text-sm font-semibold hover:bg-[#A0522D] disabled:opacity-50 transition-colors">
                {saving ? 'Saving...' : 'Save'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reviews List */}
      {reviews.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#C16E4F]/10 p-12 text-center">
          <p className="text-[#5C4033]/40 text-sm">No reviews yet. Add your first one.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {reviews.map(r => (
            <div key={r.id} className={`bg-white rounded-2xl border p-4 flex gap-4 items-start transition-opacity ${r.is_active ? 'border-[#C16E4F]/10' : 'border-gray-100 opacity-50'}`}>
              <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-brand-orange font-bold text-sm shrink-0">
                {r.name.slice(0,2).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-bold text-sm text-gray-900">{r.name}</span>
                  <div className="flex">
                    {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${s <= r.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} />)}
                  </div>
                </div>
                <p className="text-xs text-gray-500 italic">"{r.review}"</p>
              </div>
              <div className="flex items-center gap-1 shrink-0">
                <button onClick={() => toggle(r)} title={r.is_active ? 'Hide' : 'Show'}
                  className={`p-1.5 rounded-lg transition-colors ${r.is_active ? 'text-green-600 hover:bg-green-50' : 'text-gray-400 hover:bg-gray-50'}`}>
                  <Check className="w-4 h-4" />
                </button>
                <button onClick={() => openEdit(r)}
                  className="p-1.5 rounded-lg text-[#C16E4F] hover:bg-[#C16E4F]/10 transition-colors">
                  <Pencil className="w-4 h-4" />
                </button>
                <button onClick={() => remove(r.id)}
                  className="p-1.5 rounded-lg text-red-400 hover:bg-red-50 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
