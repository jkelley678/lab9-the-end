/**
 * TodoModel - Manages the todo list data and business logic
 * Implements the Observer pattern for reactive updates
 */
export class TodoModel {
  /**
   * Creates an instance of TodoModel
   * Loads existing todos and ID counter from storage
   * 
   * @constructor
   * @param {StorageService} storageService - The storage service to use for persistence
   */
  constructor(storageService) {
    this.storage = storageService;
    this.todos = this.storage.load('items', []);
    this.listeners = [];
    this.nextId = this.storage.load('nextId', 1);
  }

  /**
   * Subscribe to model changes
   * 
   * @param {Function} listener - Callback function to be notified of changes
   */
  subscribe(listener) {
    this.listeners.push(listener);
  }

  /**
   * Notify all subscribers of changes
   */
  notify() {
    this.listeners.forEach(listener => listener());
  }

 /**
   * Add a new todo
   * Creates a new todo item with generated ID and default properties
   * 
   * @param {string} text - The text content for the new todo
   */
  addTodo(text) {
    if (!text || text.trim() === '') {
      return;
    }

    const todo = {
      id: this.nextId++,
      text: text.trim(),
      completed: false,
      createdAt: new Date().toISOString(),
      dueDate: '',
      importance: 'severity-value'
    };

    this.todos.push(todo);
    this.save();
    this.notify();
  }

  /**
   * Toggle todo completion status
   * 
   * @param {number} id - The ID of the todo to toggle
   */
  toggleComplete(id) {
    const todo = this.todos.find(t => t.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      this.save();
      this.notify();
    }
  }

  /**
   * Delete a todo
   * @param {number} id - The ID of the todo to delete
   */
  deleteTodo(id) {
    this.todos = this.todos.filter(t => t.id !== id);
    this.save();
    this.notify();
  }

  /**
   * Update todo text
   * @param {number} id - The ID of the todo to update
   * @param {string} newText - The new text content
   */
  updateTodo(id, newText) {
    const todo = this.todos.find(t => t.id === id);
    if (todo && newText && newText.trim() !== '') {
      todo.text = newText.trim();
      this.save();
      this.notify();
    }
  }
  /**
   * Update todo due date
   * 
   * @param {number} id - The ID of the todo to update
   * @param {string} dueDate - The new due date (date string)
   */
  updateDueDate(id, dueDate) {
  const todo = this.todos.find(t => t.id === id);
  if (todo) {
    todo.dueDate = dueDate;
    this.save();
    this.notify();
  }
}
/**
   * Update todo importance level
   * 
   * @param {number} id - The ID of the todo to update
   * @param {string} importance - The importance level (e.g., 'high-value', 'medium-value', 'low-value')
   */
updateImportance(id, importance) {
  const todo = this.todos.find(t => t.id === id);
  if (todo) {
    todo.importance = importance;
    this.save();
    this.notify();
  }
}

  /**
   * Clear all completed todos
   */
  clearCompleted() {
    this.todos = this.todos.filter(t => !t.completed);
    this.save();
    this.notify();
  }
  /**
   * Uncheck all remaining todos
   */
  uncheckAllRemaining() {
    this.todos.forEach(t => {t.completed = false;});
    this.save(); 
    this.notify(); 
  }

  /**
   * Clear all todos
   */
  clearAll() {
    this.todos = [];
    this.save();
    this.notify();
  }

  /**
   * Get count of active todos
   * @returns {number} The number of todos that are not completed
   */
  get activeCount() {
    return this.todos.filter(t => !t.completed).length;
  }

  /**
   * Get count of completed todos
   * @returns {number} The number of todos that are completed
   */
  get completedCount() {
    return this.todos.filter(t => t.completed).length;
  }

  /**
   * Save todos to storage
   */
  save() {
    this.storage.save('items', this.todos);
    this.storage.save('nextId', this.nextId);
  }
}