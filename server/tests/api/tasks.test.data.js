const STATUS = Object.freeze({
  TO_DO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
});

const reqAddTask1 = {
  title: "Test",
  description: "This is the test item.",
  status: STATUS.TO_DO,
};

const reqAddTask2 = {
  title: "",
  description: "This is the test item.",
  status: STATUS.TO_DO,
};

const reqEditTask = {
  title: "Test1",
  description: "This is the test1 item.",
  status: STATUS.DONE,
};

module.exports = {
  reqAddTask1,
  reqAddTask2,
  reqEditTask,
};
