btn = document.getElementsByClassName('btn')[0]
container = document.getElementsByClassName('container-element')[0]

del = async (e) => {

    try{
        this_el = e.target;
    
        if (confirm("Are you sure that you've completed the task \nAnd want to delete it ?")){
            await fetch('https://task-list-app-backend.herokuapp.com/delTasks', {
                headers : {
                    'Content-Type' : 'Application/json'
                },
                method : 'POST',
                body : JSON.stringify({'id': this_el.id})
            })

        await refresh();
        alert('Task deleted successfully');
        }else {
            this_el.checked = false;
        }
    
    }catch(e){
        alert('Task deletion failed')
    }
}

refresh = async (e) => {
    btn.disabled = true;
    res = await fetch('https://task-list-app-backend.herokuapp.com/getTasks')
    res = await res.json();
    container.innerHTML = res.body;
    if (res.body == '<div>\n </div>'){
        container.innerHTML = 'No Tasks here !';
    }
    btn.disabled = false;

    arr = document.getElementsByClassName('task-check')
    for (i=0; i< arr.length; i++){
        arr[i].addEventListener('change', del);
    }
};

btn.addEventListener('click', refresh);

window.onload = async () => {
    btn.click()
}