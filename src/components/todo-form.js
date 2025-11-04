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
    #date-input{
      width:30px;
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

  constructor() {
    super();
    this.inputValue = '';
  }

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

  handleInput(e) {
    this.inputValue = e.target.value;
  }

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
        
        <input type="date" id="date-input" placeholder="mm/dd" >
        <select id="order-select">
          <option value="Sort-by">Sort by</option>
          <option value="Due-date" selected>Due Date</option>
          <option value="Importance">Importance</option>
        </select>
        <button type="submit" ?disabled=${!this.inputValue.trim()}>
          Add
        </button>
      </form>
    `;
  }
}

customElements.define('todo-form', TodoForm);