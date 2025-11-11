import { test } from 'node:test';
import assert from 'node:assert';
import { TodoModel } from '../src/models/todo-model.js';

/**
 * Mock storage service for testing
 */
class MockStorage {
  constructor() {
    this.data = {};
  }

  save(key, value) {
    this.data[key] = value;
  }

  load(key, defaultValue) {
    return this.data[key] !== undefined ? this.data[key] : defaultValue;
  }

  remove(key) {
    delete this.data[key];
  }

  clear() {
    this.data = {};
  }
}

test('TodoModel - addTodo should add a new todo', () => {
  const storage = new MockStorage();
  const model = new TodoModel(storage);

  model.addTodo('Test todo');

  assert.strictEqual(model.todos.length, 1);
  assert.strictEqual(model.todos[0].text, 'Test todo');
  assert.strictEqual(model.todos[0].completed, false);

  model.addTodo('Test todo 2');

  assert.strictEqual(model.todos.length, 2, 'Should have 2 todos now');
  assert.strictEqual(model.todos[1].text, 'Test todo 2', 'Second todo text should be correct');
  assert.strictEqual(model.todos[1].completed, false, 'Second todo should be incomplete');
});
test('TodoModel - edited messages should be saved',()=>{
  const storage = new MockStorage();
  const model = new TodoModel(storage);

  model.addTodo('Test todo');

  assert.strictEqual(model.todos.length, 1);
  assert.strictEqual(model.todos[0].text, 'Test todo');
  assert.strictEqual(model.todos[0].completed, false);

  model.updateTodo(1, 'Test todo (edited)');

  assert.strictEqual(model.todos.length, 1);
  assert.strictEqual(model.todos[0].text, 'Test todo (edited)');
  assert.strictEqual(model.todos[0].completed, false);
})

test('TodoModel - should not add empty todos', () => {
  const storage = new MockStorage();
  const model = new TodoModel(storage);

  model.addTodo('');
  model.addTodo('   ');

  assert.strictEqual(model.todos.length, 0);
});

test('TodoModel - updateDueDate should set the due date of a todo', () => {
  const storage = new MockStorage();
  const model = new TodoModel(storage);
  const dueDate = '2025-12-31';

  model.addTodo('Task with a deadline'); 

  model.updateDueDate(1, dueDate); 

  assert.strictEqual(model.todos.length, 1);
  
  const updatedTodo = model.todos[0];

  assert.strictEqual(updatedTodo.dueDate, dueDate, 'The todo due date should be updated');
  assert.strictEqual(updatedTodo.text, 'Task with a deadline', 'Text should remain the same');
  assert.strictEqual(updatedTodo.completed, false, 'Completed status should remain false');
});
test('TodoModel - updateImportance should set the severity level of a todo', () => {
  const storage = new MockStorage();
  const model = new TodoModel(storage);
  const importanceLevel = 'high-value'; 

  model.addTodo('Urgent Task'); 

  model.updateImportance(1, importanceLevel); 

  assert.strictEqual(model.todos.length, 1);
  
  const updatedTodo = model.todos[0];

  assert.strictEqual(updatedTodo.importance, importanceLevel, 'The todo importance/severity should be updated');
  assert.strictEqual(updatedTodo.text, 'Urgent Task', 'Text should remain the same');
  assert.strictEqual(updatedTodo.completed, false, 'Completed status should remain false');
});


