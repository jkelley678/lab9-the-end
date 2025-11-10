import { LitElement, html, css } from 'lit';

/**
 * TodoForm - Input form for adding new todos
 */
export class TodoForm extends LitElement {
  static properties = {
    inputValue: { state: true }
  };

  static styles = css`
    :host {
      display: block;
      margin-bottom: 20px;
    }

    form {
      display: flex;
      gap: 8px;
    }

    input {
      flex: 1;
      padding: 12px 16px;
      font-size: 16px;
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      outline: none;
      transition: border-color 0.3s;
    }


    input:focus {
      border-color: #667eea;
    }

    button {
      padding: 12px 24px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s;
    }

    button:hover {
      background: #5568d3;
    }

    button:active {
      transform: translateY(1px);
    }

    button:disabled {
      background: #ccc;
      cursor: not-allowed;
    }
    #order-select{
      padding: 12px 24px;
      background: #667eea;
      color: white;
      border: none;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 400;
      width:100px;
      cursor: pointer;
      transition: background 0.3s;
    }
  `;
  /**
   * Creates an instance of TodoForm
   * Initializes the input value to empty string
   * 
   * @constructor
   */
  constructor() {
    super();
    this.inputValue = '';
  }
  /**
   * Handles form submission
   * Prevents default form behavior and dispatches add-todo event if input is valid
   * 
   * @param {Event} e - The form submit event
   */
  handleSubmit(e) {
    e.preventDefault();
    const text = this.inputValue.trim();

    if (text) {
      this.dispatchEvent(new CustomEvent('add-todo', {
        detail: { text },
        bubbles: true,
        composed: true
      }));

      this.inputValue = '';
    }
  }
  /**
   * Handles input field changes
   * Updates the inputValue property as user types
   * 
   * @param {InputEvent} e - The input event
   */
  handleInput(e) {
    this.inputValue = e.target.value;
  }
  /**
   * Renders the component template
   * 
   * @returns {TemplateResult} The lit-html template
   */
  render() {
    return html`
      <form @submit=${this.handleSubmit}>
        <input 
          type="text"
          placeholder="What needs to be done?"
          .value=${this.inputValue}
          @input=${this.handleInput}
          aria-label="New todo"
          autofocus
        />

        
        <button type="submit" ?disabled=${!this.inputValue.trim()}>
          Add
        </button>
      </form>
    `;
  }
}

customElements.define('todo-form', TodoForm);