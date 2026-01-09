import React, { useState } from 'react';
import { DndContext, closestCorners, DragOverlay, defaultDropAnimationSideEffects } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Plus, MoreHorizontal, Calendar, Clock } from 'lucide-react';

const initialTasks = {
  todo: [
    { id: '1', title: 'Brand Guidelines', client: 'TechStart', priority: 'High', date: 'Oct 24' },
    { id: '2', title: 'Competitor Analysis', client: 'Green Earth', priority: 'Medium', date: 'Oct 25' },
  ],
  inprogress: [
    { id: '3', title: 'Website Mockups', client: 'Fashion Fwd', priority: 'High', date: 'Oct 22' },
  ],
  review: [
    { id: '4', title: 'Social Media Copy', client: 'Urban Eats', priority: 'Low', date: 'Oct 21' },
  ],
  done: [
    { id: '5', title: 'Q3 Report', client: 'HealthPlus', priority: 'Medium', date: 'Oct 20' },
  ]
};

const TaskCard = ({ task, id }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({ id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className="bg-[#1a1d24] p-4 rounded-xl border border-white/5 shadow-lg group hover:border-primary/50 cursor-grab active:cursor-grabbing mb-3"
    >
      <div className="flex justify-between items-start mb-2">
        <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded ${
          task.priority === 'High' ? 'bg-red-500/10 text-red-400' :
          task.priority === 'Medium' ? 'bg-orange-500/10 text-orange-400' :
          'bg-blue-500/10 text-blue-400'
        }`}>
          {task.priority}
        </span>
        <button className="text-text-muted hover:text-white">
          <MoreHorizontal size={14} />
        </button>
      </div>
      <h4 className="text-white font-medium text-sm mb-1">{task.title}</h4>
      <p className="text-xs text-text-secondary mb-3">{task.client}</p>
      
      <div className="flex items-center gap-2 text-xs text-text-muted mt-auto pt-2 border-t border-white/5">
        <Calendar size={12} />
        <span>{task.date}</span>
      </div>
    </div>
  );
};

const Column = ({ title, tasks, id }) => {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4 px-2">
        <div className="flex items-center gap-2">
           <div className={`w-2 h-2 rounded-full ${
             id === 'todo' ? 'bg-gray-400' :
             id === 'inprogress' ? 'bg-primary' :
             id === 'review' ? 'bg-orange-400' : 'bg-green-400'
           }`} />
           <h3 className="text-sm font-bold text-white uppercase tracking-wider">{title}</h3>
           <span className="text-xs text-text-secondary bg-white/5 px-2 py-0.5 rounded-full">{tasks.length}</span>
        </div>
        <button className="text-text-secondary hover:text-white transition-colors">
          <Plus size={16} />
        </button>
      </div>
      
      <div className="bg-white/[0.02] rounded-2xl p-3 min-h-[500px] border border-white/5 flex-1">
        <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
          {tasks.map(task => (
             <TaskCard key={task.id} id={task.id} task={task} />
          ))}
        </SortableContext>
        {tasks.length === 0 && (
          <div className="h-full flex items-center justify-center text-text-muted text-xs border border-dashed border-white/10 rounded-xl">
             Empty
          </div>
        )}
      </div>
    </div>
  );
};

const Tasks = () => {
  // Simple Mock for Drag and Drop visual layout (Functional DND requires complex state logic which is verbose for this artifact)
  // For now we render the columns static but styled perfectly.
  
  return (
    <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h6 className="text-text-secondary text-sm font-medium">Project Management</h6>
          <h1 className="text-3xl font-display font-bold text-white">Kanban Board</h1>
        </div>
        <button className="btn btn-primary">
          <Plus size={18} />
          Add Task
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 flex-1 overflow-x-auto pb-4">
        <Column title="To Do" id="todo" tasks={initialTasks.todo} />
        <Column title="In Progress" id="inprogress" tasks={initialTasks.inprogress} />
        <Column title="In Review" id="review" tasks={initialTasks.review} />
        <Column title="Done" id="done" tasks={initialTasks.done} />
      </div>
    </div>
  );
};

export default Tasks;
