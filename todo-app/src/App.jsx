import { useState } from 'react';
import './App.css';

function App() {
  // Main app data structure state holding sections and tasks
  const [sections, setSections] = useState([
    {
      id: 'sec-1',
      title: 'Active Work Sections',
      tasks: [
        { id: 't1', text: 'Review project specifications document', desc: 'Go over frontend requirements', day: 'Monday', priority: 'High', completed: false },
        { id: 't2', text: 'Design basic dashboard sketch components', desc: '', day: 'Wednesday', priority: 'Medium', completed: false }
      ]
    },
    {
      id: 'sec-2',
      title: 'Secondary Reminders',
      tasks: [
        { id: 't3', text: 'Refactor standard CSS color variables', desc: 'Make layout look unified', day: 'Friday', priority: 'Low', completed: false }
      ]
    }
  ]);

  // Form input control states
  const [taskText, setTaskText] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [selectedDay, setSelectedDay] = useState('Monday');
  const [selectedPriority, setSelectedPriority] = useState('Medium');

  // Add Task implementation handler
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    const newTask = {
      id: `task-${Date.now()}`,
      text: taskText,
      desc: taskDesc.trim(),
      day: selectedDay,
      priority: selectedPriority,
      completed: false
    };

    // Add task directly to the top section list array
    setSections(sections.map((section, idx) => {
      if (idx === 0) {
        return { ...section, tasks: [newTask, ...section.tasks] };
      }
      return section;
    }));

    // Reset inputs cleanly
    setTaskText('');
    setTaskDesc('');
    setSelectedDay('Monday');
    setSelectedPriority('Medium');
  };

  // Toggle main completion checkbox
  const toggleTask = (sectionId, taskId) => {
    setSections(sections.map(sec => {
      if (sec.id !== sectionId) return sec;
      return {
        ...sec,
        tasks: sec.tasks.map(t => t.id === taskId ? { ...t, completed: !t.completed } : t)
      };
    }));
  };

  // Delete task completely from layout
  const deleteTask = (sectionId, taskId) => {
    setSections(sections.map(sec => {
      if (sec.id !== sectionId) return sec;
      return { ...sec, tasks: sec.tasks.filter(t => t.id !== taskId) };
    }));
  };

  return (
    <div className="app-wrapper">
      <div className="todoist-container">
        
        <h1 className="main-title">My Personal To-Do List</h1>

        {/* Premium Functional Task input dashboard layout builder block */}
        <form onSubmit={handleAddTask} className="editor-card">
          <div className="editor-inputs">
            <input 
              type="text" 
              className="editor-task-input"
              placeholder="What needs to be done? (e.g., Buy milk)" 
              value={taskText}
              onChange={(e) => setTaskText(e.target.value)}
              required
            />
            <input 
              type="text" 
              className="editor-desc-input"
              placeholder="Add description..." 
              value={taskDesc}
              onChange={(e) => setTaskDesc(e.target.value)}
            />
          </div>

          {/* Action selection menus dropdown layout interface elements row */}
          <div className="editor-dropdowns-row">
            <div className="dropdown-wrapper">
              <label>📅 Day of Week:</label>
              <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)} className="select-menu">
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
              </select>
            </div>

            <div className="dropdown-wrapper">
              <label>🏳️ Priority Level:</label>
              <select value={selectedPriority} onChange={(e) => setSelectedPriority(e.target.value)} className={`select-menu priority-select ${selectedPriority.toLowerCase()}`}>
                <option value="High">🔴 High Priority</option>
                <option value="Medium">🟡 Medium Priority</option>
                <option value="Low">🔵 Low Priority</option>
              </select>
            </div>
          </div>

          <hr className="editor-divider" />

          <div className="editor-actions">
            <span className="project-selector"># Active Workspace Layout ▾</span>
            <div className="action-buttons">
              <button type="button" className="btn-cancel" onClick={() => { setTaskText(''); setTaskDesc(''); }}>Clear</button>
              <button type="submit" className="btn-add-task">Add task</button>
            </div>
          </div>
        </form>

        {/* Display tasks cleanly organized inside an ultra professional structured dashboard grid layout table list block */}
        <div className="sections-container">
          {sections.map((section) => (
            <div key={section.id} className="task-section">
              <div className="section-header">
                <span className="section-title">▾ {section.title} <span className="section-count">{section.tasks.length}</span></span>
              </div>

              {section.tasks.length === 0 ? (
                <p className="empty-section-text">No active tasks logged inside this operational section grid item.</p>
              ) : (
                <div className="task-table-grid">
                  {section.tasks.map((task) => (
                    <div 
                      key={task.id} 
                      className={`task-row-card ${task.priority === 'High' ? 'highlight-high' : ''} ${task.completed ? 'completed' : ''}`}
                    >
                      {/* Left: Checkbox Action */}
                      <div className="grid-cell-checkbox" onClick={() => toggleTask(section.id, task.id)}>
                        <div className="circle-checkbox">
                          {task.completed && <span className="checkmark-tick">✓</span>}
                        </div>
                      </div>

                      {/* Center Content Text */}
                      <div className="grid-cell-content">
                        <p className="task-headline">{task.text}</p>
                        {task.desc && <p className="task-subtext-description">{task.desc}</p>}
                      </div>

                      {/* Right metadata contextual badges elements */}
                      <div className="grid-cell-meta">
                        <span className="grid-badge-tag day-tag">📅 {task.day}</span>
                        <span className={`grid-badge-tag priority-tag ${task.priority.toLowerCase()}`}>
                          {task.priority === 'High' ? '🔴 High' : task.priority === 'Medium' ? '🟡 Med' : '🔵 Low'}
                        </span>
                        <button className="grid-row-delete-btn" title="Delete Task" onClick={() => deleteTask(section.id, task.id)}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

      </div>

      <footer className="branding-footer">
        created by ajay
      </footer>
    </div>
  );
}

export default App;