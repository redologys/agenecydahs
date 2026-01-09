import React from 'react';
import { Calendar, Globe, ArrowRight, CheckCircle2, Circle } from 'lucide-react';

const projects = [
  {
    id: 1,
    name: 'Website Redesign',
    description: 'Complete overhaul of the corporate website including new CMS implementation and dark mode.',
    status: 'In Progress',
    progress: 75,
    dueDate: 'Nov 15, 2025',
    tasks: { completed: 24, total: 32 },
    team: ['AM', 'JD', 'PK']
  },
  {
    id: 2,
    name: 'Q4 SEO Campaign',
    description: 'Comprehensive keyword strategy and content optimization for Q4 market expansion.',
    status: 'Active',
    progress: 30,
    dueDate: 'Dec 01, 2025',
    tasks: { completed: 5, total: 15 },
    team: ['AM', 'RK']
  },
  {
    id: 3,
    name: 'Brand Identity Refresh',
    description: 'Logo modernization, new color palette, and updated brand guidelines document.',
    status: 'Review',
    progress: 90,
    dueDate: 'Oct 30, 2025',
    tasks: { completed: 18, total: 20 },
    team: ['JD']
  }
];

const ClientProjects = () => {
  return (
    <div className="space-y-6 animate-fade-in">
       <div className="flex justify-between items-end">
          <div>
             <h1 className="text-3xl font-display font-bold text-white mb-2">My Projects</h1>
             <p className="text-text-secondary">Track progress, milestones, and deliverables.</p>
          </div>
       </div>

       <div className="grid grid-cols-1 gap-6">
          {projects.map((project) => (
             <div key={project.id} className="glass-card p-6 hover:border-primary/30 transition-all group">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                   <div>
                      <div className="flex items-center gap-3 mb-2">
                         <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{project.name}</h3>
                         <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider 
                            ${project.status === 'In Progress' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' : 
                              project.status === 'Review' ? 'bg-orange-500/10 text-orange-400 border border-orange-500/20' : 
                              'bg-green-500/10 text-green-400 border border-green-500/20'}`}>
                            {project.status}
                         </span>
                      </div>
                      <p className="text-text-secondary max-w-2xl">{project.description}</p>
                   </div>
                   <button className="btn btn-outline min-w-[120px]">
                      View Details <ArrowRight size={16} />
                   </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/5">
                   <div>
                      <span className="text-xs text-text-secondary uppercase block mb-2">Timeline</span>
                      <div className="flex items-center gap-2 text-white font-medium">
                         <Calendar size={16} className="text-primary" />
                         Due: {project.dueDate}
                      </div>
                   </div>
                   
                   <div>
                      <span className="text-xs text-text-secondary uppercase block mb-2">Tasks</span>
                      <div className="flex items-center gap-2 text-white font-medium">
                         <CheckCircle2 size={16} className="text-green-400" />
                         {project.tasks.completed} / {project.tasks.total} Completed
                      </div>
                   </div>

                   <div>
                      <div className="flex justify-between text-xs mb-2">
                         <span className="text-text-secondary uppercase">Progress</span>
                         <span className="text-white font-bold">{project.progress}%</span>
                      </div>
                      <div className="w-full h-2 bg-black/40 rounded-full overflow-hidden">
                         <div 
                            className="h-full bg-primary transition-all duration-1000" 
                            style={{ width: `${project.progress}%` }}
                         />
                      </div>
                   </div>
                </div>
             </div>
          ))}
       </div>
    </div>
  );
};

export default ClientProjects;
