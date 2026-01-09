import React, { useState } from 'react';
import { 
  Plus, Search, Grid, List as ListIcon, Filter, 
  MoreVertical, Download, ExternalLink, Archive, Trash2, 
  CheckCircle, XCircle, Info, Clock, Image as ImageIcon,
  Film, FileText, Folder, Users, ChevronDown
} from 'lucide-react';

const MediaLibrary = () => {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedClient, setSelectedClient] = useState('All Clients');
  
  // Mock data for assets
  const assets = [
    { id: 1, name: 'Brand_Logo_Primary.png', client: 'TechStart', type: 'image', size: '1.2MB', status: 'approved', date: '2h ago', uploader: 'Admin' },
    { id: 2, name: 'Campaign_Video_Draft.mp4', client: 'Green Earth', type: 'video', size: '45MB', status: 'pending', date: '5h ago', uploader: 'Client' },
    { id: 3, name: 'Q4_Strategy.pdf', client: 'Fashion Fwd', type: 'document', size: '3.4MB', status: 'approved', date: '1d ago', uploader: 'Admin' },
    { id: 4, name: 'Product_Shot_01.jpg', client: 'TechStart', type: 'image', size: '2.8MB', status: 'in_use', date: '2d ago', uploader: 'Client' },
    { id: 5, name: 'Social_Post_Graphic.png', client: 'Urban Eats', type: 'image', size: '850KB', status: 'approved', date: '3d ago', uploader: 'Admin' },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'approved': return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'pending': return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'in_use': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'rejected': return 'bg-red-500/10 text-red-400 border-red-500/20';
      default: return 'bg-white/5 text-text-secondary border-white/10';
    }
  };

  const IconType = ({ type }) => {
    switch (type) {
      case 'image': return <ImageIcon size={20} className="text-secondary" />;
      case 'video': return <Film size={20} className="text-blue-400" />;
      case 'document': return <FileText size={20} className="text-red-400" />;
      default: return <Folder size={20} className="text-yellow-400" />;
    }
  };

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);

  return (
    <div className="space-y-6 animate-fade-in text-white pt-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-bold">Media Library</h1>
          <p className="text-text-secondary text-sm">1,247 assets • 8.4 GB used of 50 GB</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex bg-white/5 p-1 rounded-lg border border-white/10">
            <button 
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-primary text-black' : 'text-text-secondary hover:text-white'}`}
            >
              <Grid size={18} />
            </button>
            <button 
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-primary text-black' : 'text-text-secondary hover:text-white'}`}
            >
              <ListIcon size={18} />
            </button>
          </div>
          <button onClick={() => setIsUploadModalOpen(true)} className="btn btn-primary gap-2">
            <Plus size={18} /> Upload Assets
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Filters */}
        <div className="space-y-6">
          <div className="glass-card p-5 space-y-6">
            <div>
              <label className="text-xs font-bold text-text-secondary uppercase mb-3 block">Filter by Client</label>
              <div className="relative">
                <select 
                  value={selectedClient}
                  onChange={(e) => setSelectedClient(e.target.value)}
                  className="input-field w-full appearance-none pr-10"
                >
                  <option>All Clients</option>
                  <option>TechStart</option>
                  <option>Green Earth</option>
                  <option>Fashion Fwd</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-text-secondary pointer-events-none" size={16} />
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-text-secondary uppercase mb-3 block">Upload Source</label>
              <div className="space-y-2">
                {['Admin Uploads', 'Client Uploads'].map(source => (
                  <label key={source} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-primary" />
                    <span className="text-sm text-text-secondary group-hover:text-white transition-colors">{source}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-text-secondary uppercase mb-3 block">File Type</label>
              <div className="space-y-2">
                {[
                  { label: 'Images', icon: ImageIcon },
                  { label: 'Videos', icon: Film },
                  { label: 'Documents', icon: FileText }
                ].map(type => (
                  <label key={type.label} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-primary" />
                    <span className="text-sm text-text-secondary group-hover:text-white transition-colors flex items-center gap-2">
                      <type.icon size={14} /> {type.label}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="text-xs font-bold text-text-secondary uppercase mb-3 block">Status</label>
              <div className="space-y-2">
                {['Pending', 'Approved', 'In Use', 'Archived'].map(status => (
                  <label key={status} className="flex items-center gap-2 cursor-pointer group">
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded border-white/10 bg-white/5 checked:bg-primary" />
                    <span className="text-sm text-text-secondary group-hover:text-white transition-colors">{status}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          
          <div className="glass-card p-5">
             <div className="flex items-center gap-2 text-primary mb-3">
                <Info size={16} />
                <span className="text-xs font-bold uppercase">Storage Usage</span>
             </div>
             <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden mb-2">
                <div className="h-full bg-primary w-[16%]" />
             </div>
             <p className="text-[10px] text-text-secondary">8.4 GB of 50 GB used (16.8%)</p>
          </div>
        </div>

        {/* Assets Grid/List */}
        <div className="lg:col-span-3 space-y-4">
          <div className="flex items-center gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
              <input 
                type="text" 
                placeholder="Search assets by name, tags, or client..." 
                className="input-field pl-10 h-10 w-full"
              />
            </div>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {assets.map(asset => (
                <div 
                  key={asset.id} 
                  onClick={() => setSelectedAsset(asset)}
                  className="glass-card overflow-hidden group hover:border-primary/30 transition-all cursor-pointer"
                >
                  <div className="h-40 bg-black/40 flex items-center justify-center relative overflow-hidden">
                    <IconType type={asset.type} />
                    <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                       <button className="btn btn-primary p-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform">
                          <ExternalLink size={20} />
                       </button>
                    </div>
                    <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-black/60 backdrop-blur-md">
                      {asset.type}
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-sm truncate pr-2">{asset.name}</h3>
                      <button className="p-1 hover:bg-white/10 rounded-md text-text-secondary transition-colors">
                        <MoreVertical size={16} />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-[10px] font-bold text-black">
                        {asset.client.substring(0,2)}
                      </div>
                      <span className="text-xs text-text-secondary font-medium">{asset.client}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-white/5">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusColor(asset.status)}`}>
                        {asset.status.replace('_', ' ')}
                      </span>
                      <span className="text-[10px] text-text-muted">{asset.date}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="glass-card overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-white/5 border-b border-white/5">
                  <tr>
                    <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase">Asset</th>
                    <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase">Client</th>
                    <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase">Status</th>
                    <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase">Size</th>
                    <th className="py-3 px-4 text-xs font-bold text-text-secondary uppercase">Date</th>
                    <th className="py-3 px-4 text-right text-xs font-bold text-text-secondary uppercase">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {assets.map(asset => (
                    <tr key={asset.id} onClick={() => setSelectedAsset(asset)} className="hover:bg-white/[0.02] transition-colors group cursor-pointer">
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-3">
                          <IconType type={asset.type} />
                          <span className="text-sm font-medium">{asset.name}</span>
                        </div>
                      </td>
                      <td className="py-3 px-4">
                        <span className="text-sm text-text-secondary">{asset.client}</span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${getStatusColor(asset.status)}`}>
                          {asset.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-text-secondary font-mono">{asset.size}</td>
                      <td className="py-3 px-4 text-sm text-text-secondary">{asset.date}</td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button className="p-1.5 hover:bg-white/10 rounded-lg text-text-secondary hover:text-white transition-colors">
                            <Download size={16} />
                          </button>
                          <button className="p-1.5 hover:bg-white/10 rounded-lg text-text-secondary hover:text-white transition-colors">
                            <ExternalLink size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
           <div className="glass-card w-full max-w-lg p-6 shadow-2xl relative border-primary/20">
              <button 
                onClick={() => setIsUploadModalOpen(false)}
                className="absolute top-4 right-4 text-text-secondary hover:text-white"
              >
                <XCircle size={24} />
              </button>
              
              <h3 className="text-2xl font-display font-bold mb-2">Upload Assets</h3>
              <p className="text-text-secondary text-sm mb-6">Drag and drop files to add them to your library.</p>
              
              <div className="space-y-4">
                 <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center gap-3 bg-white/[0.02] hover:bg-white/5 hover:border-primary/50 transition-all cursor-pointer group">
                    <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-transform">
                       <Plus size={32} />
                    </div>
                    <div className="text-center">
                       <p className="text-white font-bold">Click to upload or drag & drop</p>
                       <p className="text-xs text-text-muted mt-1">PNG, JPG, webp, MP4, or PDF (max. 100MB)</p>
                    </div>
                 </div>

                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-text-secondary uppercase">Assign to Client</label>
                       <select className="input-field w-full">
                          <option>Select Client...</option>
                          <option>TechStart</option>
                          <option>Green Earth</option>
                       </select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-xs font-bold text-text-secondary uppercase">Category</label>
                       <select className="input-field w-full">
                          <option>Brand Assets</option>
                          <option>Campaign Media</option>
                          <option>Product Shots</option>
                       </select>
                    </div>
                 </div>

                 <div className="flex gap-3 pt-4">
                    <button onClick={() => setIsUploadModalOpen(false)} className="btn btn-ghost border border-white/10 flex-1">Cancel</button>
                    <button className="btn btn-primary flex-1">Upload 0 Files</button>
                 </div>
              </div>
           </div>
        </div>
      )}

      {/* Detail Modal */}
      {selectedAsset && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-in">
           <div className="glass-card w-full max-w-5xl h-[80vh] flex flex-col md:flex-row shadow-2xl relative overflow-hidden border-white/10">
              <button 
                onClick={() => setSelectedAsset(null)}
                className="absolute top-4 right-4 z-10 text-text-secondary hover:text-white bg-black/20 p-1 rounded-full"
              >
                <XCircle size={24} />
              </button>

              {/* Preview Area */}
              <div className="flex-[1.5] bg-black/40 flex items-center justify-center p-10 relative">
                 <IconType type={selectedAsset.type} />
                 <div className="absolute bottom-6 left-6 flex gap-2">
                    <button className="btn btn-outline bg-black/40 backdrop-blur-md border border-white/10 px-4 py-2 text-xs font-bold">
                       <Download size={14} /> Download Original
                    </button>
                 </div>
              </div>

              {/* Sidebar Info */}
              <div className="flex-1 border-l border-white/10 flex flex-col bg-[#0b0f19]">
                 <div className="p-6 border-b border-white/5">
                    <div className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
                       <Info size={12} /> Asset Details
                    </div>
                    <h3 className="text-xl font-bold text-white mb-1">{selectedAsset.name}</h3>
                    <p className="text-xs text-text-secondary">{selectedAsset.size} • Uploaded {selectedAsset.date}</p>
                 </div>

                 <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                    <div className="space-y-4">
                       <div className="space-y-2">
                          <label className="text-[10px] font-bold text-text-secondary uppercase">Status</label>
                          <span className={`block w-fit px-3 py-1 rounded-full text-xs font-bold uppercase ${getStatusColor(selectedAsset.status)}`}>
                             {selectedAsset.status.replace('_', ' ')}
                          </span>
                       </div>

                       <div className="grid grid-cols-2 gap-4 pt-2">
                          <div className="space-y-1">
                             <label className="text-[10px] font-bold text-text-secondary uppercase">Client</label>
                             <p className="text-sm font-medium text-white">{selectedAsset.client}</p>
                          </div>
                          <div className="space-y-1">
                             <label className="text-[10px] font-bold text-text-secondary uppercase">Uploaded By</label>
                             <p className="text-sm font-medium text-white">{selectedAsset.uploader}</p>
                          </div>
                       </div>

                       <div className="space-y-2 pt-2">
                          <label className="text-[10px] font-bold text-text-secondary uppercase">Description</label>
                          <textarea 
                            className="input-field w-full h-24 text-sm py-2" 
                            placeholder="Add a description for this asset..."
                            defaultValue="Primary brand logo for use on dark backgrounds. PNG format with transparency."
                          />
                       </div>

                       <div className="space-y-2 pt-2">
                          <label className="text-[10px] font-bold text-text-secondary uppercase">Tags</label>
                          <div className="flex flex-wrap gap-2">
                             {['logo', 'brand', 'transparent', 'primary'].map(tag => (
                               <span key={tag} className="px-2 py-1 rounded-md bg-white/5 border border-white/5 text-[10px] text-text-secondary hover:text-primary hover:border-primary/30 transition-all cursor-pointer">
                                  #{tag}
                               </span>
                             ))}
                             <button className="px-2 py-1 rounded-md border border-dashed border-white/20 text-[10px] text-text-muted hover:text-white hover:border-white/40 transition-all">
                                + Add Tag
                             </button>
                          </div>
                       </div>
                    </div>
                 </div>

                 <div className="p-6 border-t border-white/5 grid grid-cols-2 gap-3">
                    <button className="btn btn-outline text-xs">Archive</button>
                    {selectedAsset.status === 'pending' ? (
                       <button className="btn btn-primary text-xs">Approve Asset</button>
                    ) : (
                       <button className="btn bg-red-500/10 text-red-400 border border-red-500/20 text-xs">Delete</button>
                    )}
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};
export default MediaLibrary;
