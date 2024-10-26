// Seleccionamos los elementos del DOM
const taskInput = document.getElementById('new-task');
const addTaskButton = document.getElementById('add-task');
const taskListPendientes = document.getElementById('task-list-pendientes');
const taskListCompletadas = document.getElementById('task-list-completadas');
const pendingCount = document.getElementById('pending-count');
const completedCount = document.getElementById('completed-count');

window.addEventListener('DOMContentLoaded', function () {
    loadTasks();
    updateCounters();
});

// Función para actualizar los contadores de tareas
function updateCounters() {
    pendingCount.textContent = taskListPendientes.children.length;
    completedCount.textContent = taskListCompletadas.children.length;
}

// Función para guardar las tareas en localStorage
function saveTasks() {
    const pendientes = [];
    const completadas = [];

    // Recorremos las listas y almacenamos el texto de las tareas
    taskListPendientes.querySelectorAll('li span').forEach(task => pendientes.push(task.textContent));
    taskListCompletadas.querySelectorAll('li span').forEach(task => completadas.push(task.textContent));

    // Guardamos en localStorage
    localStorage.setItem('pendientes', JSON.stringify(pendientes));
    localStorage.setItem('completadas', JSON.stringify(completadas));
}

// Función para cargar las tareas desde localStorage
function loadTasks() {
    const pendientes = JSON.parse(localStorage.getItem('pendientes')) || [];
    const completadas = JSON.parse(localStorage.getItem('completadas')) || [];

    // Cargar tareas pendientes
    pendientes.forEach(task => addTaskToDOM(task, false));

    // Cargar tareas completadas
    completadas.forEach(task => addTaskToDOM(task, true));
}

// Función para añadir una tarea al DOM
function addTaskToDOM(taskText, completed = false) {
    if (taskText === '') return;

    // Crear un nuevo elemento li
    const li = document.createElement('li');
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    // Agregar el span dentro del li
    li.appendChild(taskSpan);

    // Crear botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('btn-delete-custom');

    deleteButton.addEventListener('click', function () {
        li.remove(); // Eliminar la tarea
        saveTasks(); // Guardar los cambios en localStorage
        updateCounters(); // Actualizar los contadores
    });

    li.appendChild(deleteButton);

    // Evento para marcar/desmarcar la tarea como completada
    li.addEventListener('click', function (event) {
        if (event.target !== deleteButton) {
            li.classList.toggle('completed');

            // Si la tarea está completada, moverla a la lista de completadas
            if (li.classList.contains('completed')) {
                moveTaskToCompletadas(li);
            } else {
                moveTaskToPendientes(li); // Si se desmarca, moverla a pendientes
            }

            saveTasks(); // Guardar los cambios en localStorage
            updateCounters();
        }
    });

    // Si completed es true, la tarea se añade a la lista de completadas
    if (completed) {
        li.classList.add('completed');
        taskListCompletadas.appendChild(li);
    } else {
        taskListPendientes.appendChild(li);
    }
}


// Función para añadir una tarea
function addTask() {
    const taskText = taskInput.value;

    if (taskText === '') {
        alert('Por favor, ingresa una tarea.');
        return;
    }

    // Crear un nuevo elemento li
    const li = document.createElement('li');
    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    // Agregar el span dentro del li
    li.appendChild(taskSpan);

    // Crear botón de eliminar
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Eliminar';
    deleteButton.classList.add('btn-delete-custom');

    deleteButton.addEventListener('click', function () {
        li.remove(); // Eliminar la tarea al hacer clic en el botón "Eliminar"
        saveTasks(); // Guardar los cambios en localStorage
        updateCounters(); // Actualizar los contadores después de eliminar
    });

    li.appendChild(deleteButton);

    // Evento para marcar/desmarcar la tarea como completada
    li.addEventListener('click', function (event) {
        if (event.target !== deleteButton) { // Evitar que el botón "Eliminar" marque la tarea
            li.classList.toggle('completed'); // Alternar la clase 'completed'

            // Si la tarea está completada, moverla a la lista de completadas
            if (li.classList.contains('completed')) {
                moveTaskToCompletadas(li);
            } else {
                moveTaskToPendientes(li); // Si se desmarca, moverla de nuevo a la lista de pendientes
            }

            saveTasks();
            updateCounters();

        }
    });

    // Agregar la tarea a la lista de pendientes
    taskListPendientes.appendChild(li);

    // Limpiar el input después de agregar la tarea
    taskInput.value = '';

    // Actualizar el contador después de agregar una tarea
    updateCounters();
}

// Función para mover la tarea a la lista de completadas
function moveTaskToCompletadas(taskElement) {
    taskListPendientes.removeChild(taskElement); // Eliminar de la lista de pendientes
    taskListCompletadas.appendChild(taskElement); // Mover a la lista de completadas
}

// Función para mover la tarea de nuevo a la lista de pendientes
function moveTaskToPendientes(taskElement) {
    taskListCompletadas.removeChild(taskElement); // Eliminar de la lista de completadas
    taskListPendientes.appendChild(taskElement); // Mover de nuevo a la lista de pendientes
}

// Agregar evento al botón para añadir tareas
addTaskButton.addEventListener('click', addTask, saveTasks);

// Permitir agregar tareas presionando "Enter"
taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        addTask();
        saveTasks();
    }
});

// Función para gestionar el cambio de pestañas
function openTab(event, tabName) {
    const tabContent = document.querySelectorAll('.tab-content');
    const tabLinks = document.querySelectorAll('.tab-link');

    // Ocultar todas las pestañas
    tabContent.forEach(function (tab) {
        tab.classList.remove('active');
    });

    // Quitar la clase 'active' de todos los botones
    tabLinks.forEach(function (link) {
        link.classList.remove('active');
    });

    // Mostrar la pestaña seleccionada
    document.getElementById(tabName).classList.add('active');
    event.currentTarget.classList.add('active');
}
