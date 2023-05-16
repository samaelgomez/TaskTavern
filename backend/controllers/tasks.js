const Task = require('../models/task');

// Get all tasks
exports.getTasks = (req, res, next) => {
  Task.findAll({
    where: {
      authorId: req.userData.id
    }
  })
    .then(tasks => {
      let prioTask;
      const indexOfThePriorityTask = tasks.findIndex((e) => {
        return e.priority
      })
      if (indexOfThePriorityTask !== null || indexOfThePriorityTask !== undefined) {
        prioTask = tasks.slice(indexOfThePriorityTask, indexOfThePriorityTask + 1)
        tasks.splice(indexOfThePriorityTask, 1)
      }
      const result = {
        normalTasks: [
          ...tasks
        ],
        priorityTask: prioTask
      }
      res.status(200).json({
        tasks: result
      });
    })
    .catch(err => console.log(err));
}

// Get task by id
exports.getTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findByPk(taskId)
    .then(task => {
      if (!task) {
        return res.status(404).json({
          message: 'Task not found!'
        });
      }
      res.status(200).json({
        task: task
      });
    })
    .catch(err => console.log(err));
}

// Create task
exports.createTask = (req, res) => {
  const {
    authorId,
    name,
    type,
    priority,
    daily,
    completed
  } = req.body;

  const taskData = {
    authorId: authorId,
    name: name,
    type: type,
    priority: priority,
    daily: daily,
    completed: completed
  }

  Task.create(taskData)
    .then(result => {
      console.log('Created Task');
      res.status(201).json({
        message: 'Task created successfully!',
        task: result
      });
    })
    .catch(err => {
      console.log(err);
    });
}

// Update task
exports.updateTask = (req, res, next) => {
  const taskId = req.params.taskId;
  const updatedAuthorId = req.params.authorId;
  const updatedName = req.body.name;
  const updatedType = req.body.type;
  const updatedPriority = req.body.priority;
  const updatedDaily = req.body.daily;
  const updatedCompleted = req.body.completed;

  Task.findByPk(taskId)
    .then(task => {
      if (!task) {
        return res.status(404).json({
          message: 'Task not found!'
        });
      }
      task.name = updatedName;
      task.authorId = updatedAuthorId;
      task.type = updatedType;
      task.priority = updatedPriority;
      task.daily = updatedDaily;
      task.completed = updatedCompleted;
      return task.save();
    })
    .then(result => {
      res.status(200).json({
        message: 'Task updated!',
        task: result
      });
    })
    .catch(err => console.log(err));
}

// Delete task
exports.deleteTask = (req, res, next) => {
  const taskId = req.params.taskId;
  Task.findByPk(taskId)
    .then(task => {
      if (!task) {
        return res.status(404).json({
          message: 'Task not found!'
        });
      }
      return Task.destroy({
        where: {
          id: taskId
        }
      });
    })
    .then(result => {
      res.status(200).json({
        message: 'Task deleted!'
      });
    })
    .catch(err => console.log(err));
}