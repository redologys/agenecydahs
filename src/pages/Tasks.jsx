import React, { useState } from 'react';
import { DndContext, closestCorners, KeyboardSensor, PointerSensor, useSensor, useSensors, DragOverlay } from '@dnd-kit/core';
import { SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Calendar, MoreHorizontal, User, Paperclip, MessageSquare, AlertCircle } from 'lucide-react';
import { BoardControls, BoardAnalytics } from '../components/kanban/BoardComponents';

// Mock Data
const initialTasks = {
  todo: [
    { id: 't1', title: 'Design System Draft', client: 'TechStart', priority: 'High', date: 'Oct 25' },
    { id: 't2', title: 'Competitor Research', client: 'Green Earth', priority: 'Medium', date: 'Oct 28' },
  ],
  inprogress: [
    { id: 't3', title: 'Homepage Hero', client: 'Fashion Fwd', priority: 'High', date: 'Tomorrow' },
  ],
  review: [
    { id: 't4', title: 'Analytics Setup', client: 'TechStart', priority: 'Low', date: 'Oct 24' },
  ],
  done: [
    { id: 't5', title: 'Client Onboarding', client: 'Urban Eats', priority: 'Medium', date: 'Oct 20' },
  ]
};

const TaskCard = ({ task, isOverlay }) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({ id: task.id });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const priorityColor = 
    task.priority === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
    task.priority === 'Medium' ? 'bg-orange-500/10 text-orange-400 border-orange-500/20' :
    'bg-blue-500/10 text-blue-400 border-blue-500/20';

  return (
    <div 
      ref={setNodeRef} 
      style={style} 
      {...attributes} 
      {...listeners}
      className={`bg-[#1a1f2e] p-4 rounded-xl border border-white/5 shadow-lg group hover:border-primary/50 transition-colors ${isOverlay ? 'cursor-grabbing rotate-2 scale-105' : 'cursor-grab'}`}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${priorityColor} uppercase tracking-wider`}>
          {task.priority}
        </span>
        <button className="text-text-muted hover:text-white transition-colors">
          <MoreHorizontal size={16} />
        </button>
      </div>

      <h4 className="text-white font-bold mb-2 text-sm">{task.title}</h4>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="w-5 h-5 rounded-md bg-white/10 flex items-center justify-center text-[10px] font-bold text-white">
          {task.client.substring(0, 2)}
        </div>
        <span className="text-xs text-text-muted">{task.client}</span>
      </div>

      <div className="pt-3 border-t border-white/5 flex items-center justify-between text-xs text-text-secondary">
         <div className="flex items-center gap-3">
            <span className="flex items-center gap-1 hover:text-white"><Paperclip size={12} /> 2</span>
            <span className="flex items-center gap-1 hover:text-white"><MessageSquare size={12} /> 4</span>
         </div>
         <div className={`flex items-center gap-1 font-mono ${task.date === 'Tomorrow' ? 'text-orange-400' : ''}`}>
           <Calendar size={12} /> {task.date}
         </div>
      </div>
    </div>
  );
};

const Column = ({ id, tasks, title, color }) => {
  return (
    <div className="flex flex-col h-full bg-[#0b0f19]/50 rounded-2xl border border-white/5 p-4 min-w-[280px]">
      <div className={`flex items-center justify-between mb-4 pb-3 border-b-2 ${color}`}>
        <div className="flex items-center gap-2">
          <h3 className="text-sm font-bold text-white uppercase">{title}</h3>
          <span className="bg-white/10 text-text-secondary text-xs px-1.5 py-0.5 rounded font-mono">{tasks.length}</span>
        </div>
        <button className="text-text-muted hover:text-white p-1 hover:bg-white/5 rounded">
          <Plus size={16} />
        </button>
      </div>
      
      <SortableContext items={tasks.map(t => t.id)} strategy={verticalListSortingStrategy}>
        <div className="flex-1 space-y-3 overflow-y-auto min-h-[100px] custom-scrollbar pr-1">
          {tasks.map(task => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
};

const Tasks = () => {
  const [tasks, setTasks] = useState(initialTasks);
  const [activeId, setActiveId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState('All');

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  const findContainer = (id) => {
    if (id in tasks) return id;
    return Object.keys(tasks).find(key => tasks[key].find(t => t.id === id));
  };

  const handleDragStart = (event) => setActiveId(event.active.id);

  const handleDragOver = (event) => {
    const { active, over } = event;
    const overId = over?.id;

    if (!overId || active.id === overId) return;

    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(overId);

    if (!activeContainer || !overContainer || activeContainer === overContainer) return;

    setTasks((prev) => {
      const activeItems = prev[activeContainer];
      const overItems = prev[overContainer];
      const activeIndex = activeItems.findIndex(t => t.id === active.id);
      const overIndex = overItems.findIndex(t => t.id === overId);

      let newIndex;
      if (overId in prev) {
        newIndex = overItems.length + 1;
      } else {
        const isBelowOverItem = over && active.rect.current.translated && active.rect.current.translated.top > over.rect.top + over.rect.height;
        const modifier = isBelowOverItem ? 1 : 0;
        newIndex = overIndex >= 0 ? overIndex + modifier : overItems.length + 1;
      }

      return {
        ...prev,
        [activeContainer]: [
          ...prev[activeContainer].filter(item => item.id !== active.id)
        ],
        [overContainer]: [
          ...prev[overContainer].slice(0, newIndex),
          activeItems[activeIndex],
          ...prev[overContainer].slice(newIndex, prev[overContainer].length)
        ]
      };
    });
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;
    const activeContainer = findContainer(active.id);
    const overContainer = findContainer(over?.id);

    if (activeContainer && overContainer && activeContainer !== overContainer) {
       // Only cosmetic move handled in dragOver, verification of final state logic usually goes here
    }
    setActiveId(null);
  };

  const getFilteredTasks = (taskList) => {
    return taskList.filter(t => 
       t.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
       (filterPriority === 'All' || t.priority === filterPriority)
    );
  };

  return (
    <div className="h-[calc(100vh-140px)] flex flex-col">
      <div className="flex justify-between items-end mb-6">
        <div>
          <h6 className="text-text-secondary text-sm font-medium">Project Management</h6>
          <h1 className="text-3xl font-display font-bold text-white">Task Board</h1>
        </div>
      </div>

      <BoardControls 
         searchQuery={searchQuery} 
         setSearchQuery={setSearchQuery} 
         filterPriority={filterPriority} 
         setFilterPriority={setFilterPriority}
      />

      <div className="flex gap-6 h-full overflow-hidden">
        <DndContext 
          sensors={sensors} 
          collisionDetection={closestCorners} 
          onDragStart={handleDragStart} 
          onDragOver={handleDragOver} 
          onDragEnd={handleDragEnd}
        >
          <div className="flex-1 flex gap-4 overflow-x-auto pb-4">
            <Column id="todo" title="To Do" tasks={getFilteredTasks(tasks.todo)} color="border-gray-500" />
            <Column id="inprogress" title="In Progress" tasks={getFilteredTasks(tasks.inprogress)} color="border-yellow-500" />
            <Column id="review" title="Review" tasks={getFilteredTasks(tasks.review)} color="border-blue-500" />
            <Column id="done" title="Done" tasks={getFilteredTasks(tasks.done)} color="border-green-500" />
          </div>

          <DragOverlay>
            {activeId ? <TaskCard task={Object.values(tasks).flat().find(t => t.id === activeId)} isOverlay /> : null}
          </DragOverlay>
        </DndContext>

        <BoardAnalytics />
      </div>
    </div>
  );
};

export default Tasks;
