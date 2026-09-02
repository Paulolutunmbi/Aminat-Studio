import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Plus,
  Edit2,
  Trash2,
  Sparkles,
  Search,
  Filter,
  Check,
  X,
  Loader2,
  Eye,
  GripVertical,
} from 'lucide-react';
import { Artwork } from '../../types';
import { dataService } from '../../services/dataService';
import { ImageUploader } from '../../components/admin/ImageUploader';
import { ConfirmDialog } from '../../components/admin/ConfirmDialog';

export const AdminArtworksPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [reorderingId, setReorderingId] = useState<string | null>(null);

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingArtwork, setEditingArtwork] = useState<Artwork | null>(null);
  const [deletingArtwork, setDeletingArtwork] = useState<Artwork | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    title: '',
    image: '',
    medium: 'Acrylic',
    category: 'Acrylic',
    year: new Date().getFullYear().toString(),
    dimensions: '',
    description: '',
    featured: false,
  });
  const [formSubmitting, setFormSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const loadArtworks = async () => {
    setLoading(true);
    const data = await dataService.getArtworks();
    setArtworks(data);
    setLoading(false);
  };

  useEffect(() => {
    loadArtworks();
  }, []);

  useEffect(() => {
    const modalOpen = isAddModalOpen || !!editingArtwork;
    if (!modalOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isAddModalOpen, editingArtwork]);

  // Open add modal if ?action=add query param is provided
  useEffect(() => {
    if (searchParams.get('action') === 'add') {
      handleOpenAdd();
      searchParams.delete('action');
      setSearchParams(searchParams);
    }
  }, [searchParams]);

  const handleOpenAdd = () => {
    setFormData({
      title: '',
      image: '',
      medium: 'Acrylic on Canvas',
      category: 'Acrylic',
      year: new Date().getFullYear().toString(),
      dimensions: '16 x 20 in',
      description: '',
      featured: false,
    });
    setFormError('');
    setIsAddModalOpen(true);
  };

  const handleOpenEdit = (artwork: Artwork) => {
    setEditingArtwork(artwork);
    setFormData({
      title: artwork.title,
      image: artwork.image,
      medium: artwork.medium,
      category: artwork.category || 'Acrylic',
      year: artwork.year || new Date().getFullYear().toString(),
      dimensions: artwork.dimensions || '',
      description: artwork.description || '',
      featured: artwork.featured,
    });
    setFormError('');
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormError('Title is required.');
      return;
    }
    if (!formData.image.trim()) {
      setFormError('Artwork image is required. Please upload or select an image.');
      return;
    }

    setFormSubmitting(true);
    try {
      if (editingArtwork) {
        await dataService.updateArtwork(editingArtwork.id, formData);
        setEditingArtwork(null);
      } else {
        await dataService.createArtwork(formData);
        setIsAddModalOpen(false);
      }
      await loadArtworks();
    } catch (err: any) {
      setFormError(err.message || 'Failed to save artwork.');
    } finally {
      setFormSubmitting(false);
    }
  };

  const handleToggleFeatured = async (id: string) => {
    try {
      const current = artworks.find((item) => item.id === id);
      const featuredCount = artworks.filter((item) => item.featured).length;
      const newFeaturedState = !(current?.featured ?? false);
      if (newFeaturedState && featuredCount >= 3) {
        alert('Only 3 artworks can be featured at a time. Please remove one of the current featured artworks before featuring another.');
        return;
      }

      await dataService.toggleFeatured(id);
      await loadArtworks();
    } catch (error: any) {
      alert(error?.message || 'Unable to update featured artwork status.');
    }
  };

  const handleReorder = async (dragId: string, targetId: string) => {
    if (dragId === targetId) return;

    const next = [...artworks];
    const fromIndex = next.findIndex((item) => item.id === dragId);
    const toIndex = next.findIndex((item) => item.id === targetId);
    if (fromIndex === -1 || toIndex === -1) return;

    const [moved] = next.splice(fromIndex, 1);
    next.splice(toIndex, 0, moved);

    const sorted = next.map((item, index) => ({ ...item, order: index, sortOrder: index }));
    setArtworks(sorted);

    for (const item of sorted) {
      await dataService.reorderArtwork(item.id, item.order ?? 0);
    }
    await loadArtworks();
  };

  const handleDeleteConfirm = async () => {
    if (!deletingArtwork) return;
    await dataService.deleteArtwork(deletingArtwork.id);
    setDeletingArtwork(null);
    await loadArtworks();
  };

  const filteredArtworks = artworks.filter((a) => {
    const matchesSearch =
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.medium.toLowerCase().includes(search.toLowerCase());
    const matchesCat =
      categoryFilter === 'All' || a.category?.toLowerCase() === categoryFilter.toLowerCase();
    return matchesSearch && matchesCat;
  });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <span className="text-xs uppercase tracking-[0.15em] text-[#737871] font-semibold block mb-1">
            Studio Portfolio
          </span>
          <h1 className="font-serif text-3xl italic tracking-tight text-[#1A1A1A]">
            Artwork Management
          </h1>
        </div>

        <button
          onClick={handleOpenAdd}
          className="bg-[#1A1C19] text-[#FFFFFF] px-4 py-2.5 text-xs uppercase tracking-wider font-semibold hover:bg-[#8A9A5B] transition-colors flex items-center gap-2 self-start sm:self-auto shadow-xs"
        >
          <Plus className="w-4 h-4" />
          <span>Add Artwork</span>
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#FFFFFF] p-4 border border-[#E7E7E2] flex flex-col md:flex-row gap-4 justify-between items-center">
        <div className="relative w-full md:w-80">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#737871]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title, medium..."
            className="w-full bg-[#FFFFFF] border border-[#E7E7E2] py-2 pl-9 pr-3 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B] transition-colors"
          />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <Filter className="w-3.5 h-3.5 text-[#737871]" />
          <span className="text-xs text-[#737871] uppercase tracking-wider">Medium:</span>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="bg-[#FFFFFF] border border-[#E7E7E2] px-3 py-1.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B] transition-colors"
          >
            <option value="All">All Categories</option>
            <option value="Acrylic">Acrylic</option>
            <option value="Watercolour">Watercolour</option>
            <option value="Mixed Media">Mixed Media</option>
            <option value="Pen">Pen & Ink</option>
            <option value="Sketch">Sketch</option>
          </select>
        </div>
      </div>

      {/* Artwork Table */}
      <div className="bg-[#FFFFFF] border border-[#E7E7E2] overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[#E7E7E2] bg-[#F9F9F7] text-xs uppercase tracking-wider text-[#737871]">
              <th className="py-3 px-4 font-semibold">Artwork</th>
              <th className="py-3 px-4 font-semibold">Medium & Year</th>
              <th className="py-3 px-4 font-semibold">Category</th>
              <th className="py-3 px-4 font-semibold text-center">Featured</th>
              <th className="py-3 px-4 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E7E7E2] text-sm text-[#1A1A1A]">
            {loading ? (
              <tr>
                <td colSpan={5} className="py-10 text-center text-[#737871]">
                  <Loader2 className="w-6 h-6 animate-spin mx-auto mb-2" />
                  <span>Loading artworks...</span>
                </td>
              </tr>
            ) : filteredArtworks.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-[#737871]">
                  No artworks found. Click "Add Artwork" to create your first item.
                </td>
              </tr>
            ) : (
              filteredArtworks.map((art) => (
                <tr
                  key={art.id}
                  draggable={true}
                  onDragStart={() => setReorderingId(art.id)}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => {
                    if (reorderingId && reorderingId !== art.id) {
                      handleReorder(reorderingId, art.id);
                    }
                    setReorderingId(null);
                  }}
                  className="hover:bg-[#F9F9F7]/70 transition-colors"
                >
                  <td className="py-3.5 px-4">
                    <div className="flex items-center gap-2">
                      <GripVertical className="w-4 h-4 text-[#737871] cursor-grab" />
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 bg-[#F5F5F2] border border-[#1A1C19] shrink-0 overflow-hidden flex items-center justify-center">
                          <img
                            src={art.image}
                            alt={art.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div>
                          <span className="font-serif font-medium text-base text-[#1A1A1A] block">
                            {art.title}
                          </span>
                          {art.dimensions && (
                            <span className="text-xs text-[#737871]">{art.dimensions}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Medium & Year */}
                  <td className="py-3.5 px-4 text-xs">
                    <div className="text-[#1A1A1A] font-medium">{art.medium}</div>
                    <div className="text-[#737871]">{art.year || '2024'}</div>
                  </td>

                  {/* Category */}
                  <td className="py-3.5 px-4 text-xs">
                    <span className="bg-[#E8EDE0] px-2.5 py-1 text-[#1A1C19] font-medium uppercase tracking-wider text-[11px]">
                      {art.category}
                    </span>
                  </td>

                  {/* Featured Toggle */}
                  <td className="py-3.5 px-4 text-center">
                    <button
                      onClick={() => handleToggleFeatured(art.id)}
                      className={`inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold uppercase tracking-wider transition-colors ${
                        art.featured
                          ? 'bg-[#E8EDE0] text-[#6F7F45] border border-[#8A9A5B]/30 hover:bg-[#8A9A5B] hover:text-white'
                          : 'bg-[#F5F5F2] text-[#737871] hover:bg-[#E8EDE0]'
                      }`}
                      title={art.featured ? 'Remove from homepage featured' : 'Make featured on homepage'}
                    >
                      <Sparkles className="w-3 h-3" />
                      <span>{art.featured ? 'Featured' : 'Standard'}</span>
                    </button>
                  </td>

                  {/* Actions */}
                  <td className="py-3.5 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenEdit(art)}
                        className="p-1.5 text-[#5A5E57] hover:text-[#8A9A5B] hover:bg-[#E8EDE0]/50 transition-colors"
                        title="Edit artwork"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeletingArtwork(art)}
                        className="p-1.5 text-[#737871] hover:text-red-700 hover:bg-red-50 transition-colors"
                        title="Delete artwork"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Add / Edit Artwork Modal */}
      {(isAddModalOpen || editingArtwork) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-xs overflow-y-auto animate-in fade-in">
          <div className="bg-[#FFFFFF] max-w-2xl w-full max-h-[calc(100vh-2rem)] md:max-h-[calc(100vh-4rem)] border border-[#E7E7E2] shadow-2xl flex flex-col overflow-hidden">
            <div className="flex shrink-0 justify-between items-center p-6 md:p-8 pb-4 border-b border-[#E7E7E2]">
              <h2 className="font-serif text-2xl italic text-[#1A1A1A]">
                {editingArtwork ? `Edit Artwork: ${editingArtwork.title}` : 'Add New Artwork'}
              </h2>
              <button
                onClick={() => {
                  setIsAddModalOpen(false);
                  setEditingArtwork(null);
                }}
                className="text-[#737871] hover:text-[#1A1A1A] p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {formError && (
              <div className="mb-4 p-3 bg-amber-50 text-amber-800 text-xs border border-amber-200">
                {formError}
              </div>
            )}

            <form onSubmit={handleFormSubmit} className="flex min-h-0 flex-col">
              <div className="min-h-0 overflow-y-auto p-6 md:p-8 pt-5 space-y-5">
              {/* Image Uploader */}
              <ImageUploader
                value={formData.image}
                onChange={(img) => setFormData({ ...formData, image: img })}
                label="Artwork Image"
              />

              {/* Title */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">
                  Artwork Title *
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="e.g. Whispers of the Meadow"
                  className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
                  required
                />
              </div>

              {/* Two columns: Medium & Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">
                    Medium *
                  </label>
                  <input
                    type="text"
                    value={formData.medium}
                    onChange={(e) => setFormData({ ...formData, medium: e.target.value })}
                    placeholder="e.g. Acrylic on Canvas"
                    className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">
                    Category *
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
                  >
                    <option value="Acrylic">Acrylic</option>
                    <option value="Watercolour">Watercolour</option>
                    <option value="Mixed Media">Mixed Media</option>
                    <option value="Pen">Pen & Ink</option>
                    <option value="Sketch">Sketch</option>
                  </select>
                </div>
              </div>

              {/* Two columns: Year & Dimensions */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">
                    Year Created
                  </label>
                  <input
                    type="text"
                    value={formData.year}
                    onChange={(e) => setFormData({ ...formData, year: e.target.value })}
                    placeholder="e.g. 2024"
                    className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
                  />
                </div>

                <div>
                  <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">
                    Dimensions (optional)
                  </label>
                  <input
                    type="text"
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    placeholder="e.g. 16 x 20 in"
                    className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B]"
                  />
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs uppercase tracking-wider font-semibold text-[#1A1A1A] mb-1.5">
                  Artwork Story / Description
                </label>
                <textarea
                  rows={3}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Notes about inspiration, technique, or natural elements..."
                  className="w-full bg-[#FFFFFF] border border-[#E7E7E2] p-2.5 text-xs text-[#1A1A1A] focus:outline-none focus:border-[#8A9A5B] resize-y"
                />
              </div>

              {/* Featured checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="featured-checkbox"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 text-[#8A9A5B] focus:ring-0"
                />
                <label htmlFor="featured-checkbox" className="text-xs text-[#1A1A1A] font-medium cursor-pointer flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-[#8A9A5B]" />
                  <span>Feature on the Homepage (Curated Selection)</span>
                </label>
              </div>

                </div>

              {/* Actions */}
              <div className="flex shrink-0 justify-end gap-3 p-6 md:px-8 md:py-5 border-t border-[#E7E7E2] bg-[#FFFFFF]">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    setEditingArtwork(null);
                  }}
                  className="px-4 py-2 text-xs uppercase tracking-wider font-medium text-[#5A5E57] hover:bg-[#E8EDE0]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formSubmitting}
                  className="px-6 py-2.5 bg-[#1A1C19] text-[#FFFFFF] text-xs uppercase tracking-[0.15em] font-semibold hover:bg-[#8A9A5B] transition-colors flex items-center gap-2 shadow-xs"
                >
                  {formSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  <span>{editingArtwork ? 'Save Changes' : 'Create Artwork'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={!!deletingArtwork}
        title="Delete Artwork"
        message={`Are you sure you want to permanently remove "${deletingArtwork?.title}" from your portfolio? This action cannot be undone.`}
        confirmLabel="Delete Artwork"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingArtwork(null)}
      />
    </div>
  );
};
