'use client';

import { useState, useEffect } from 'react';
import { Search, X, Monitor, Smartphone, Mail as MailIcon, ChevronDown, ChevronUp } from 'lucide-react';

interface Template {
  id: string;
  name: string;
  category: string;
  htmlContent: string;
  previewText?: string | null;
  createdAt: string;
}

interface TemplatePickerModalProps {
  onSelect: (template: { id: string; name: string; htmlContent: string; category: string; previewText?: string | null }) => void;
  onClose: () => void;
}

const CATEGORIES = ['All', 'Newsletter', 'Promotional', 'Personalized', 'General', 'Transactional'];

export default function TemplatePickerModal({ onSelect, onClose }: TemplatePickerModalProps) {
  const [templates, setTemplates] = useState<Template[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile' | 'inbox'>('desktop');
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await fetch('/api/templates');
        if (res.ok) {
          const data = await res.json();
          // Assuming data is an array of templates or { templates: [...] }
          const fetchedTemplates = Array.isArray(data) ? data : (data.templates || []);
          setTemplates(fetchedTemplates);
        }
      } catch (error) {
        console.error('Failed to fetch templates', error);
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, []);

  const filteredTemplates = templates.filter((t) => {
    const matchesSearch = t.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          (t.category && t.category.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesCategory = activeCategory === 'All' || (t.category && t.category.toLowerCase() === activeCategory.toLowerCase());
    return matchesSearch && matchesCategory;
  });

  const toggleExpandCategory = (cat: string) => {
    setExpandedCategories((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(cat)) newSet.delete(cat);
      else newSet.add(cat);
      return newSet;
    });
  };

  const renderTemplateCard = (template: Template) => (
    <div
      key={template.id}
      className="relative rounded-xl border border-gray-200 overflow-hidden cursor-pointer hover:border-indigo-300 hover:shadow-md transition-all group bg-white flex flex-col"
    >
      <div className="relative overflow-hidden bg-white w-full" style={{ height: 160 }}>
        <iframe
          srcDoc={template.htmlContent}
          title={template.name}
          scrolling="no"
          className="absolute top-0 left-0 border-0 pointer-events-none"
          style={{ width: '800px', height: '600px', transform: 'scale(0.225)', transformOrigin: 'top left' }}
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setPreviewTemplate(template);
            }}
            className="px-3 py-1.5 bg-white text-gray-900 text-xs font-semibold rounded-lg hover:bg-gray-50 shadow-sm"
          >
            Preview
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onSelect(template);
            }}
            className="px-3 py-1.5 bg-indigo-600 text-white text-xs font-semibold rounded-lg hover:bg-indigo-700 shadow-sm"
          >
            Use Template
          </button>
        </div>
      </div>
      <div className="px-3 py-2.5 border-t border-gray-100 bg-white mt-auto">
        <p className="text-xs font-semibold text-gray-900 truncate">{template.name}</p>
        <p className="text-[10px] text-gray-400 mt-0.5 truncate">{template.category || 'Uncategorized'}</p>
      </div>
    </div>
  );

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
        <div className="max-w-5xl w-full mx-auto bg-[#F8F9FA] rounded-2xl shadow-2xl flex flex-col max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200 bg-white flex items-center justify-between shrink-0">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Choose a Template</h2>
              <p className="text-sm text-gray-500 mt-0.5">Select a template for your campaign</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Search + Filter */}
          <div className="px-6 py-3 border-b border-gray-200 bg-white flex items-center gap-4 shrink-0">
            <div className="relative w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-1.5 text-sm bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-400 outline-none"
              />
            </div>
            <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`shrink-0 px-3 py-1.5 text-xs rounded-lg transition-colors ${
                    activeCategory === cat
                      ? 'bg-indigo-50 border border-indigo-200 text-indigo-700 font-semibold'
                      : 'text-gray-500 font-medium hover:text-gray-900 border border-transparent'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Template Grid */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
              </div>
            ) : filteredTemplates.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-1">No templates found</h3>
                <p className="text-sm text-gray-500 max-w-sm">
                  We couldn't find any templates matching your search criteria. Try adjusting your filters.
                </p>
              </div>
            ) : activeCategory === 'All' ? (
              // Grouped by category
              <div className="space-y-8">
                {Array.from(new Set(filteredTemplates.map(t => t.category || 'Uncategorized'))).sort().map(category => {
                  const categoryTemplates = filteredTemplates.filter(t => (t.category || 'Uncategorized') === category);
                  if (categoryTemplates.length === 0) return null;
                  
                  const isExpanded = expandedCategories.has(category);
                  const displayTemplates = isExpanded ? categoryTemplates : categoryTemplates.slice(0, 5);
                  const hasMore = categoryTemplates.length > 5;

                  return (
                    <div key={category}>
                      <h3 className="text-sm font-bold text-gray-700 mb-4 flex items-center gap-2">
                        {category}
                        <span className="text-xs font-medium px-2 py-0.5 bg-gray-100 text-gray-500 rounded-full">
                          {categoryTemplates.length}
                        </span>
                      </h3>
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                        {displayTemplates.map(renderTemplateCard)}
                      </div>
                      {hasMore && (
                        <div className="mt-4 flex justify-center">
                          <button
                            onClick={() => toggleExpandCategory(category)}
                            className="flex items-center gap-1.5 px-4 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors shadow-sm"
                          >
                            {isExpanded ? (
                              <>Show Less <ChevronUp className="w-4 h-4" /></>
                            ) : (
                              <>Show More ({categoryTemplates.length - 5}) <ChevronDown className="w-4 h-4" /></>
                            )}
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              // Flat grid
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                {filteredTemplates.map(renderTemplateCard)}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Preview Overlay */}
      {previewTemplate && (
        <div className="fixed inset-0 bg-black/60 z-[60] flex flex-col backdrop-blur-sm">
          {/* Preview Header */}
          <div className="bg-white px-6 py-3 flex items-center justify-between shrink-0 shadow-sm">
            <div className="flex items-center gap-4">
              <h3 className="text-base font-bold text-gray-900">{previewTemplate.name}</h3>
              <div className="h-4 w-px bg-gray-200" />
              <div className="flex p-0.5 bg-gray-100 rounded-lg">
                <button
                  onClick={() => setPreviewMode('desktop')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    previewMode === 'desktop' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Monitor className="w-4 h-4" />
                  Desktop
                </button>
                <button
                  onClick={() => setPreviewMode('mobile')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    previewMode === 'mobile' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Smartphone className="w-4 h-4" />
                  Mobile
                </button>
                <button
                  onClick={() => setPreviewMode('inbox')}
                  className={`flex items-center gap-2 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                    previewMode === 'inbox' ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <MailIcon className="w-4 h-4" />
                  Inbox
                </button>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setPreviewTemplate(null)}
                className="px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onSelect(previewTemplate);
                  setPreviewTemplate(null);
                }}
                className="px-5 py-2 bg-indigo-600 text-white text-sm font-semibold rounded-xl hover:bg-indigo-700 transition-colors shadow-sm"
              >
                Use This Template
              </button>
            </div>
          </div>

          {/* Preview Content */}
          <div className="flex-1 overflow-auto flex justify-center py-8">
            {previewMode === 'desktop' && (
              <div className="bg-white shadow-xl rounded-b-lg overflow-hidden w-full max-w-4xl border-t-8 border-gray-200 self-start">
                <iframe
                  srcDoc={previewTemplate.htmlContent}
                  title="Desktop Preview"
                  className="w-full min-h-[800px] border-0"
                />
              </div>
            )}
            
            {previewMode === 'mobile' && (
              <div className="bg-white shadow-2xl rounded-[3rem] overflow-hidden w-[375px] h-[812px] border-[12px] border-gray-900 self-start relative">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/3 h-6 bg-gray-900 rounded-b-2xl z-10" />
                <iframe
                  srcDoc={previewTemplate.htmlContent}
                  title="Mobile Preview"
                  className="w-full h-full border-0"
                />
              </div>
            )}

            {previewMode === 'inbox' && (
              <div className="bg-white shadow-xl rounded-lg w-full max-w-3xl overflow-hidden self-start border border-gray-200">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 text-indigo-700 rounded-full flex items-center justify-center font-bold text-lg shrink-0">
                    S
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <p className="text-sm font-bold text-gray-900 truncate">Sender Name</p>
                      <p className="text-xs text-gray-500 shrink-0">10:30 AM</p>
                    </div>
                    <p className="text-sm font-bold text-gray-900 truncate">Campaign Subject Line</p>
                    <p className="text-sm text-gray-500 truncate">
                      {previewTemplate.previewText || 'Snippet text from the email content goes here...'}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
