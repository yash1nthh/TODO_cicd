document.addEventListener('DOMContentLoaded', () => {
    const todoList = document.getElementById('todo-list');
    const addTodoButton = document.getElementById('add-todo');
    const newTodoInput = document.getElementById('new-todo');
  
    const fetchTodos = async () => {
      try {
        const response = await fetch('/api/todos');
        const todos = await response.json();
        todoList.innerHTML = '';
        todos.forEach(todo => {
          const li = document.createElement('li');
          li.textContent = todo.task;
          li.setAttribute('data-id', todo.id);
          const deleteButton = document.createElement('span');
          deleteButton.textContent = '✖';
          deleteButton.classList.add('delete');
          deleteButton.onclick = deleteTodo;
          li.appendChild(deleteButton);
          todoList.appendChild(li);
        });
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };
  
    const addTodo = async () => {
      const task = newTodoInput.value.trim();
      if (task === '') return;
      try {
        const response = await fetch('/api/todos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ task })
        });
        if (response.ok) {
          fetchTodos();
          newTodoInput.value = '';
        } else {
          console.error('Error adding todo');
        }
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    };
  
    const deleteTodo = async (e) => {
      const id = e.target.parentNode.getAttribute('data-id');
      try {
        await fetch(`/api/todos/${id}`, {
          method: 'DELETE'
        });
        fetchTodos();
      } catch (error) {
        console.error('Error deleting todo:', error);
      }
    };
  
    addTodoButton.addEventListener('click', addTodo);
    fetchTodos();
  });
  