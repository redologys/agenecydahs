import React, { useState } from 'react';
import { 
  Upload, Plus, Download, Info, CheckCircle, 
  Clock, XCircle, FileText, Image as ImageIcon, 
  Film, Filter, Search, ChevronDown, ExternalLink
} from 'lucide-react';

const ClientMediaHub = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);

  const mockUploads = [
    { id: 1, name: 'Our_Logo_Updated.png', status: 'approved', date: 'Oct 20, 2025', type: 'image' },
    { id: 2, name: 'Product_Reference.jpg', status: 'pending', date: 'Oct 25, 2025', type: 'image' },
    { id: 3, name: 'Draft_Ad_Video.mp4', status: 'rejected', date: 'Oct 22, 2025', type: 'video', reason: 'Low resolution' },
  ];

  const agencyAssets = [
    { id: 101, name: 'Nov_Campaign_Creative.png', category: 'Campaign Media', date: 'Oct 24, 2025', type: 'image' },
    { id: 102, name: 'Brand_Guidelines_V2.pdf', category: 'Brand Assets', date: 'Oct 15, 2025', type: 'document' },
  ];

  const getStatusBadge = (status, reason) => {
    switch (status) {
      case 'approved': return <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full"><CheckCircle size={10} /> Approved</span>;
      case 'pending': return <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-yellow-400 bg-yellow-400/10 px-2 py-0.5 rounded-full"><Clock size={10} /> Pending</span>;
      case 'rejected': return <span title={reason} className="flex items-center gap-1 text-[10px] font-bold uppercase text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full cursor-help"><XCircle size={10} /> Rejected</span>;
      case 'in_use': return <span className="flex items-center gap-1 text-[10px] font-bold uppercase text-blue-400 bg-blue-400/10 px-2 py-0.5 rounded-full">★ In Use</span>;
      default: return null;
    }
  };

  const IconType = ({ type }) => {
    switch (type) {
      case 'image': return <ImageIcon size={20} className="text-primary" />;
      case 'video': return <Film size={20} className="text-secondary" />;
      case 'document': return <FileText size={20} className="text-red-400" />;
      default: return <FileText size={20} className="text-text-muted" />;
    }
  };

  return (
    <div className="space-y-8 animate-fade-in text-white pb-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
           <h1 className="text-3xl font-display font-bold mb-2">Media Library</h1>
           <p className="text-text-secondary">Manage your brand assets and agency deliverables.</p>
        </div>
        <div className="flex gap-3">
           <button 
             onClick={() => setIsRequestModalOpen(true)}
             className="btn btn-outline border-white/10 hover:border-primary/50 text-white gap-2"
           >
              Request Content
           </button>
           <button 
             onClick={() => setIsUploadModalOpen(true)}
             className="btn btn-primary gap-2"
           >
              <Upload size={18} /> Upload Assets
           </button>
        </div>
      </div>

      {/* Progress / Quota */}
      <div className="glass-card p-6 border-white/5 bg-white/[0.02]">
         <div className="flex justify-between items-end mb-4">
            <div>
               <p className="text-xs font-bold text-text-secondary uppercase tracking-widest mb-1">Storage Usage</p>
               <h3 className="text-2xl font-display font-bold">4.2 GB <span className="text-sm font-normal text-text-muted">/ 10 GB</span></h3>
            </div>
            <p className="text-xs text-text-muted">42% of your production quota used</p>
         </div>
         <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
            <div className="h-full bg-gradient-to-r from-primary to-secondary w-[42%]" />
         </div>
      </div>

      {/* Main Sections */}
      <div className="space-y-10">
         {/* My Uploads Section */}
         <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
               <h2 className="text-xl font-bold flex items-center gap-3">
                  <div className="w-2 h-6 bg-primary rounded-full" />
                  My Uploads
               </h2>
               <div className="flex items-center gap-3">
                  <div className="relative">
                     <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
                     <input type="text" placeholder="Search my files..." className="input-field pl-9 h-9 text-xs w-48" />
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               {mockUploads.map(asset => (
                  <div key={asset.id} className="glass-card group overflow-hidden hover:border-primary/30 transition-all">
                     <div className="h-32 bg-white/5 flex items-center justify-center relative">
                        <IconType type={asset.type} />
                        <div className="absolute inset-0 bg-primary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <button className="p-2 rounded-full bg-primary text-black scale-90 group-hover:scale-100 transition-transform">
                              <ExternalLink size={16} />
                           </button>
                        </div>
                     </div>
                     <div className="p-4 space-y-2">
                        <h4 className="text-sm font-bold truncate">{asset.name}</h4>
                        <div className="flex justify-between items-center">
                           <span className="text-[10px] text-text-muted">{asset.date}</span>
                           {getStatusBadge(asset.status, asset.reason)}
                        </div>
                     </div>
                  </div>
               ))}
               <button 
                 onClick={() => setIsUploadModalOpen(true)}
                 className="h-full min-h-[160px] border-2 border-dashed border-white/5 rounded-2xl flex flex-col items-center justify-center gap-2 text-text-muted hover:text-primary hover:border-primary/30 transition-all bg-white/[0.01]"
               >
                  <Plus size={24} />
                  <span className="text-xs font-bold uppercase tracking-wider">Add New</span>
               </button>
            </div>
         </section>

         {/* Agency Assets Section */}
         <section className="space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
               <h2 className="text-xl font-bold flex items-center gap-3 text-secondary">
                  <div className="w-2 h-6 bg-secondary rounded-full" />
                  Agency Deliverables
               </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
               {agencyAssets.map(asset => (
                  <div key={asset.id} className="glass-card group overflow-hidden hover:border-secondary/30 transition-all bg-secondary/5 border-secondary/10">
                     <div className="h-32 bg-black/20 flex items-center justify-center relative">
                        <IconType type={asset.type} />
                        <div className="absolute inset-0 bg-secondary/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                           <button className="p-2 rounded-full bg-secondary text-white scale-90 group-hover:scale-100 transition-transform">
                              <Download size={16} />
                           </button>
                        </div>
                     </div>
                     <div className="p-4 space-y-2">
                        <div className="flex justify-between items-start">
                           <h4 className="text-sm font-bold truncate pr-4">{asset.name}</h4>
                           <span className="text-[10px] font-bold text-secondary uppercase bg-secondary/10 px-1.5 py-0.5 rounded">{asset.category}</span>
                        </div>
                        <div className="flex justify-between items-center pt-2 border-t border-white/5">
                           <span className="text-[10px] text-text-muted">Received: {asset.date}</span>
                           <button className="text-[10px] font-bold text-secondary hover:underline">Download</button>
                        </div>
                     </div>
                  </div>
               ))}
            </div>
         </section>
      </div>

      {/* Modals placeholders */}
      {isUploadModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
           <div className="glass-card w-full max-w-lg p-6 relative border-primary/20">
              <button onClick={() => setIsUploadModalOpen(false)} className="absolute top-4 right-4 text-text-muted hover:text-white"><XCircle /></button>
              <h3 className="text-2xl font-display font-bold mb-6">Upload Brand Assets</h3>
              <div className="space-y-6">
                 <div className="border-2 border-dashed border-white/10 rounded-2xl p-10 flex flex-col items-center justify-center gap-4 bg-white/[0.02] hover:bg-primary/5 hover:border-primary/40 transition-all cursor-pointer group">
                    <div className="p-4 rounded-full bg-primary/10 text-primary group-hover:scale-110 transition-all"><Upload size={32} /></div>
                    <div className="text-center">
                       <p className="font-bold text-white">Select files to upload</p>
                       <p className="text-xs text-text-muted mt-2">Max. file size 100MB • Images, Video, Docs</p>
                    </div>
                 </div>
                 <div className="space-y-4">
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-text-secondary uppercase">Asset Category</label>
                       <select className="input-field w-full"><option>Brand Logos</option><option>Product References</option><option>Campaign Materials</option></select>
                    </div>
                    <div className="space-y-2">
                       <label className="text-[10px] font-bold text-text-secondary uppercase">Important Notes</label>
                       <textarea className="input-field w-full h-20 text-sm py-2" placeholder="Tell us about these files..." />
                    </div>
                 </div>
                 <button className="btn btn-primary w-full">Start Upload</button>
              </div>
           </div>
        </div>
      )}

      {isRequestModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
           <div className="glass-card w-full max-w-xl p-8 relative border-secondary/20">
              <button onClick={() => setIsRequestModalOpen(false)} className="absolute top-4 right-4 text-text-muted hover:text-white"><XCircle /></button>
              <h3 className="text-2xl font-display font-bold mb-2">Request New Content</h3>
              <p className="text-sm text-text-secondary mb-8">Brief our creative team on your next production need.</p>
              
              <div className="grid grid-cols-2 gap-6 mb-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-secondary uppercase">Request Type</label>
                    <select className="input-field w-full">
                       <option>Photography Session</option>
                       <option>Video Production</option>
                       <option>Graphic Design</option>
                       <option>Social Media Bundle</option>
                    </select>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-secondary uppercase">Priority Level</label>
                    <select className="input-field w-full">
                       <option>Standard</option>
                       <option>High Priority</option>
                       <option>Urgent (Rush)</option>
                    </select>
                 </div>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-secondary uppercase">Brief / Vision</label>
                    <textarea className="input-field w-full h-32 text-sm py-2" placeholder="Describe what you need, including dimensions, style references, and intended use..." />
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-bold text-text-secondary uppercase">Target Due Date</label>
                    <input type="date" className="input-field w-full" />
                 </div>
                 <button className="btn bg-secondary text-white w-full py-3 h-auto font-bold uppercase tracking-wider">Submit Request</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default ClientMediaHub;
