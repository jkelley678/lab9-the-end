import { LitElement, html, css } from 'lit';

/**
 * TodoItem - Individual todo item component
 * 
 * @class TodoItem
 * @extends {LitElement}
 * 
 * @property {Object} todo - The todo object to display
 * @property {number} todo.id - Unique identifier for the todo
 * @property {string} todo.text - The todo text content
 * @property {boolean} todo.completed - Whether the todo is completed
 * @property {string} todo.dueDate - The due date for the todo
 * @property {string} todo.importance - The importance level of the todo
 * @property {boolean} isEditing - Whether the item is currently being edited
 * @property {string} editValue - The value being edited
 * 
 */
export class TodoItem extends LitElement {
  static properties = {
    todo: { type: Object },
    isEditing: { state: true },
    editValue: { state: true },


  };

  static styles = css`
    :host {
      display: block;
    }

    .todo-item {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 16px;
      background: white;
      border-radius: 8px;
      margin-bottom: 8px;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .todo-item:hover {
      transform: translateX(4px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .checkbox {
      width: 20px;
      height: 20px;
      cursor: pointer;
    }

    .todo-text {
      flex: 1;
      font-size: 16px;
      color: #333;
      word-break: break-word;
    }

    .todo-text.completed {
      text-decoration: line-through;
      color: #999;
    }
      #date-input {
      flex: 1;
      padding: 8px 6px;
      font-size: 12px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      outline: none;
      width:50px;
    }


    .edit-input {
      flex: 1;
      padding: 8px;
      font-size: 16px;
      border: 2px solid #667eea;
      border-radius: 4px;
      outline: none;
    }

    .button-group {
      display: flex;
      gap: 8px;
    }

    button {
      padding: 6px 12px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      font-size: 14px;
      transition: background 0.2s;
    }

    .edit-btn {
      background: #4CAF50;
      color: white;
    }

    .edit-btn:hover {
      background: #45a049;
    }

    .delete-btn {
      background: #f44336;
      color: white;
    }

    .delete-btn:hover {
      background: #da190b;
    }

    .save-btn {
      background: #2196F3;
      color: white;
    }

    .save-btn:hover {
      background: #0b7dda;
    }

    .cancel-btn {
      background: #757575;
      color: white;
    }

    .cancel-btn:hover {
      background: #616161;
    }
    #model-select  {
        border-radius:5px;
        padding: 6px 10px;
    }
    #model-select option[value="high-value"] {
      color:red;
      background-color: red;
    }
    option[value="medium-value"] {
      color:orange;
      background-color: orange;
    }
    option[value="low-value"] {
      color:yellow;
      background-color: yellow;
    }
      option[value="low-value"]:displayed {
      color:yellow;
      background-color: yellow;
    }
    option[value="high-value"]{
      color:red;
      background-color: red;
    }


  `;

  /**
   * Creates an instance of TodoItem
   * Initializes editing state
   * 
   * @constructor
   */
  constructor() {
    super();
    this.isEditing = false;
    this.editValue = '';

  }
  /**
   * Handles toggling the completion status of the todo
   * Dispatches toggle-todo event
   */
  handleToggle() {
    this.dispatchEvent(new CustomEvent('toggle-todo', {
      detail: { id: this.todo.id },
      bubbles: true,
      composed: true
    }));
  }
  /**
   * Handles deleting the todo
   * Shows confirmation dialog and dispatches delete-todo event
   */
  handleDelete() {
    if (confirm('Delete this todo?')) {
      this.dispatchEvent(new CustomEvent('delete-todo', {
        detail: { id: this.todo.id },
        bubbles: true,
        composed: true
      }));
    }
  }
  /**
   * Enables edit mode for the todo item
   * Sets isEditing to true and populates editValue with current text
   */
  handleEdit() {
    this.isEditing = true;
    this.editValue = this.todo.text;

  }
  /**
   * Saves the edited todo text
   * Dispatches update-todo event if editValue is valid
   */
  handleSave() {
    if (this.editValue.trim()) {
      this.dispatchEvent(new CustomEvent('update-todo', {
        detail: { id: this.todo.id, text: this.editValue },
        bubbles: true,
        composed: true
      }));
      this.isEditing = false;
    }
  }
  /**
   * Cancels editing and reverts to display mode
   * Resets isEditing and clears editValue
   */
  handleCancel() {
    this.isEditing = false;
    this.editValue = '';
  }
  /**
   * Handles keyboard shortcuts while editing
   * Enter key saves, Escape key cancels
   * 
   * @param {KeyboardEvent} e - The keyboard event
   */
  handleKeyDown(e) {
    if (e.key === 'Enter') {
      this.handleSave();
    } else if (e.key === 'Escape') {
      this.handleCancel();
    }
  }
  /**
   * Handles changes to the due date input
   * Dispatches update-due-date event
   * 
   * @param {Event} e - The change event from the date input
   */
  handleDateChange(e) {
  this.dispatchEvent(new CustomEvent('update-due-date', {
    detail: { id: this.todo.id, dueDate: e.target.value },
    bubbles: true,
    composed: true
  }));
}
/**
   * Handles changes to the importance select dropdown
   * Dispatches update-importance event
   * 
   * @param {Event} e - The change event from the select input
   */
handleImportanceChange(e) {
  this.dispatchEvent(new CustomEvent('update-importance', {
    detail: { id: this.todo.id, importance: e.target.value },
    bubbles: true,
    composed: true
  }));
}
  /**
   * Renders the component template
   * Shows either edit mode or display mode based on isEditing state
   * 
   * @returns {TemplateResult} The lit-html template
   */
  render() {
    if (this.isEditing) {
      return html`
        <div class="todo-item" >
          <input
            class="edit-input"
            type="text"
            .value=${this.editValue}
            @input=${(e) => this.editValue = e.target.value}
            @keydown=${this.handleKeyDown}
            autofocus
          />
          <div class="button-group">
            <button class="save-btn" @click=${this.handleSave}>Save</button>
            <button class="cancel-btn" @click=${this.handleCancel}>Cancel</button>
          </div>
        </div>
      `;
    }

    return html`
      <div class="todo-item" >
        <input
          type="checkbox"
          class="checkbox"
          .checked=${this.todo.completed}
          @change=${this.handleToggle}
          aria-label="Toggle todo"
        />
        <span class="todo-text ${this.todo.completed ? 'completed' : ''}">
          ${this.todo.text}
        </span>

        <input type="date" id="date-input" placeholder="mm/dd" .value=${this.todo.dueDate || ''}
          @change=${this.handleDateChange}>
        <button-group>
          <select id="model-select" .value=${this.todo.importance || 'severity-value'}
          @change=${this.handleImportanceChange}>
            <option value="severity-value" selected>Value</option>
            <option value="high-value">🔴</option>
            <option value="medium-value">🟠</option>
            <option value="low-value">🟡</option>
          </select>
          <button
            class="edit-btn"
            @click=${this.handleEdit}
            ?disabled=${this.todo.completed}
            aria-label="Edit todo">
            Edit
          </button>
          <button
            class="delete-btn"
            @click=${this.handleDelete}
            aria-label="Delete todo">
            Delete
          </button>
        </button-group>
      </div>
    `;
  }
}

customElements.define('todo-item', TodoItem);