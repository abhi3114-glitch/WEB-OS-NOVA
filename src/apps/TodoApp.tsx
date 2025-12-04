import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Plus, Calendar } from 'lucide-react';
import { useFileSystemStore } from '@/stores/fileSystemStore';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  dueDate?: string;
}

export default function TodoApp() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');
  const { createFile, readFile, updateFile } = useFileSystemStore();

  useEffect(() => {
    loadTodos();
  }, []);

  useEffect(() => {
    saveTodos();
  }, [todos]);

  const loadTodos = async () => {
    try {
      const file = await readFile('todos.json');
      if (file) {
        setTodos(JSON.parse(file.content));
      }
    } catch (error) {
      console.log('No existing todos file');
    }
  };

  const saveTodos = async () => {
    if (todos.length > 0) {
      try {
        await updateFile('todos.json', JSON.stringify(todos, null, 2));
      } catch (error) {
        await createFile('todos.json', JSON.stringify(todos, null, 2), 'text', '/');
      }
    }
  };

  const addTodo = () => {
    if (newTodo.trim()) {
      const todo: Todo = {
        id: Date.now().toString(),
        text: newTodo,
        completed: false,
        priority: 'medium',
      };
      setTodos([...todos, todo]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const setPriority = (id: string, priority: 'high' | 'medium' | 'low') => {
    setTodos(todos.map((todo) =>
      todo.id === id ? { ...todo, priority } : todo
    ));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500';
      case 'medium':
        return 'bg-yellow-500';
      case 'low':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0A0A0A] text-white">
      {/* Header */}
      <div className="p-6 border-b border-white/10">
        <h2 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#FF006E] to-[#00F5FF] bg-clip-text text-transparent">
          Todo List
        </h2>
        
        {/* Add Todo */}
        <div className="flex gap-2">
          <Input
            placeholder="Add a new task..."
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            className="flex-1 bg-white/5 border-white/10 text-white placeholder:text-white/40"
          />
          <Button
            onClick={addTodo}
            className="bg-gradient-to-r from-[#FF006E] to-[#00F5FF] hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add
          </Button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 mt-4">
          <Button
            size="sm"
            variant={filter === 'all' ? 'default' : 'ghost'}
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'bg-[#FF006E]' : 'text-white hover:bg-white/10'}
          >
            All ({todos.length})
          </Button>
          <Button
            size="sm"
            variant={filter === 'active' ? 'default' : 'ghost'}
            onClick={() => setFilter('active')}
            className={filter === 'active' ? 'bg-[#FF006E]' : 'text-white hover:bg-white/10'}
          >
            Active ({todos.filter((t) => !t.completed).length})
          </Button>
          <Button
            size="sm"
            variant={filter === 'completed' ? 'default' : 'ghost'}
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'bg-[#FF006E]' : 'text-white hover:bg-white/10'}
          >
            Completed ({todos.filter((t) => t.completed).length})
          </Button>
        </div>
      </div>

      {/* Todo List */}
      <ScrollArea className="flex-1 p-6">
        <div className="space-y-3">
          {filteredTodos.map((todo) => (
            <div
              key={todo.id}
              className="flex items-center gap-3 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors border border-white/10"
            >
              <Checkbox
                checked={todo.completed}
                onCheckedChange={() => toggleTodo(todo.id)}
                className="border-white/20"
              />
              
              <div className="flex-1">
                <p className={`${todo.completed ? 'line-through text-white/40' : 'text-white'}`}>
                  {todo.text}
                </p>
              </div>

              {/* Priority Indicator */}
              <div className="flex gap-1">
                {['low', 'medium', 'high'].map((p) => (
                  <button
                    key={p}
                    onClick={() => setPriority(todo.id, p as any)}
                    className={`w-3 h-3 rounded-full ${
                      todo.priority === p ? getPriorityColor(p) : 'bg-white/20'
                    }`}
                    title={p}
                  />
                ))}
              </div>

              <Button
                size="sm"
                variant="ghost"
                onClick={() => deleteTodo(todo.id)}
                className="text-white hover:bg-red-500/20"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        {filteredTodos.length === 0 && (
          <div className="flex items-center justify-center h-64 text-white/40">
            <p>No tasks found</p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}