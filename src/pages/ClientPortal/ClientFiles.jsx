import React from 'react';
import { Folder, FileText, Image, Film, Download, Search } from 'lucide-react';

const mockFiles = [
  { id: 1, name: 'Brand_Guidelines_v2.pdf', type: 'pdf', size: '4.2 MB', date: 'Oct 24, 2025', category: 'Documents' },
  { id: 2, name: 'Homepage_Mockup_Final.fig', type: 'fig', size: '12.5 MB', date: 'Oct 22, 2025', category: 'Design' },
  { id: 3, name: 'Q3_Performance_Report.mp4', type: 'video', size: '156 MB', date: 'Oct 15, 2025', category: 'Videos' },
  { id: 4, name: 'Logo_Pack.zip', type: 'zip', size: '28 MB', date: 'Oct 01, 2025', category: 'Assets' },
  { id: 5, name: 'Social_Media_Kit.pdf', type: 'pdf', size: '2.1 MB', date: 'Sep 28, 2025', category: 'Documents' },
];

const FileIcon = ({ type }) => {
  switch (type) {
    case 'pdf': return <FileText className="text-red-400" size={24} />;
    case 'fig': return <Image className="text-purple-400" size={24} />;
    case 'video': return <Film className="text-blue-400" size={24} />;
    default: return <Folder className="text-yellow-400" size={24} />;
  }
};

const ClientFiles = () => {
  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
         <div>
            <h1 className="text-3xl font-display font-bold text-white mb-2">Project Files</h1>
            <p className="text-text-secondary">Access and download your project deliverables.</p>
         </div>
         <div className="flex items-center gap-3">
            <div className="relative">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-secondary" size={16} />
               <input 
                  type="text" 
                  placeholder="Search files..." 
                  className="input-field pl-10 h-10 w-64"
               />
            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
         {['All Files', 'Documents', 'Design', 'Videos'].map((cat, i) => (
            <div key={cat} className={`p-4 rounded-xl border cursor-pointer transition-all ${i === 0 ? 'bg-primary text-black border-primary font-bold' : 'bg-white/5 border-white/5 text-text-secondary hover:border-white/20 hover:text-white'}`}>
               {cat}
            </div>
         ))}
      </div>

      <div className="glass-card overflow-hidden">
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead className="bg-white/5 border-b border-white/5">
                  <tr>
                     <th className="text-left py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Name</th>
                     <th className="text-left py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Category</th>
                     <th className="text-left py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Size</th>
                     <th className="text-left py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Date Uploaded</th>
                     <th className="text-right py-4 px-6 text-xs font-semibold text-text-secondary uppercase">Action</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-white/5">
                  {mockFiles.map((file) => (
                     <tr key={file.id} className="group hover:bg-white/[0.02] transition-colors">
                        <td className="py-4 px-6">
                           <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center">
                                 <FileIcon type={file.type} />
                              </div>
                              <span className="font-medium text-white group-hover:text-primary transition-colors">{file.name}</span>
                           </div>
                        </td>
                        <td className="py-4 px-6 text-text-secondary">{file.category}</td>
                        <td className="py-4 px-6 text-text-secondary font-mono text-xs">{file.size}</td>
                        <td className="py-4 px-6 text-text-secondary">{file.date}</td>
                        <td className="py-4 px-6 text-right">
                           <button className="p-2 rounded-lg hover:bg-white/10 text-text-secondary hover:text-primary transition-colors">
                              <Download size={18} />
                           </button>
                        </td>
                     </tr>
                  ))}
               </tbody>
            </table>
         </div>
      </div>
    </div>
  );
};

export default ClientFiles;
