function getTaskSize(taskTime) {
    
    if (taskTime < 15) {
        return 'small-task'; 
    } 
    else if (taskTime >= 15 && taskTime <= 30) {
        return 'medium-task';
    } 
    else if (taskTime > 30) {
        return 'large-task';
    }

    return ''; 
}