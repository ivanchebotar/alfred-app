let tasks = [];

if (localStorage.getItem('tasks')) {
    tasks = JSON.parse(localStorage.getItem('tasks'));
    taskGenerator(tasks);
}

// list-maker
function taskGenerator(collection) {
    let template = '';
    for (let i = 0; i < collection.length; i++ ) {
        template += '<div class="list">' +
                        '<div class="content item' + i + '">' +
                            '<input data-index="' + i + '" type="checkbox" id="todo' + i + '" name="todo" value="todo" ' + ((collection[i].isDone) ? 'checked': '') + '>' +
                            '<label for="todo' + i + '" data-content="' + collection[i].task + '">' + collection[i].task + '</label>' +
                        '</div>' +
                        '<div class="btn" data-task="' + i + '">' +
                            '<span class="delete-icon fas fa-times"></span>' +
                        '</div>' +
                    '</div>'
    }
    document.querySelector('.main-list').innerHTML = template;
}
// form-input
document.querySelector('#fillIn').addEventListener('keydown', function (e) {
    if (e.key == 'Enter') {
        let value = this.value;
        $(this).val('');

        if (value.length > 0) {
            let task = {
                task: value,
                isDone: false
            }
    
            tasks.push(task);
            taskGenerator(tasks);
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
    }
});

document.querySelector('body').addEventListener('click', function (e) {
    let target = e.target;

    if (target.classList.contains('delete-icon')) {
        let index = target.parentNode.getAttribute('data-task');
        tasks.splice(index, 1);
        taskGenerator(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    if (target.getAttribute('data-index')) {
        let index = target.getAttribute('data-index');
        tasks[index].isDone = !tasks[index].isDone;
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    if (target.getAttribute('data-clear')) {
        tasks = [];
        taskGenerator(tasks);
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});