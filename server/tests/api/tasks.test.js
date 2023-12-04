const request = require("supertest");
const app = require("../../app");

const { reqAddTask1, reqAddTask2, reqEditTask } = require("./tasks.test.data");
let taskId;

describe("RestfulAPI /api/tasks", () => {
  test("GET should return all task", async () => {
    return request(app)
      .get("/api/tasks")
      .expect("Content-Type", /json/)
      .expect(200)
      .then((res) => {
        expect(res.statusCode).toBe(200);
        expect(res.body.length).toBeGreaterThanOrEqual(0);
      });
  });

  test("POST should create a task", async () => {
    return request(app)
      .post("/api/tasks")
      .send(reqAddTask1)
      .expect(201)
      .then(({ body }) => {
        expect(body.title).toEqual(reqAddTask1.title);
        expect(body.description).toEqual(reqAddTask1.description);
        expect(body.status).toEqual(reqAddTask1.status);

        taskId = body._id;
      });
  });

  test("PATCH should update the task", async () => {
    return request(app)
      .patch(`/api/tasks/${taskId}`)
      .send(reqEditTask)
      .expect(200)
      .then(({ body }) => {
        expect(body.title).toEqual(reqEditTask.title);
        expect(body.description).toEqual(reqEditTask.description);
        expect(body.status).toEqual(reqEditTask.status);
      });
  });

  test("DELETE should delete the task", async () => {
    return request(app)
      .delete(`/api/tasks/${taskId}`)
      .expect(200)
      .then(() => {});
  });

  test("POST for title's empty should be validation error.", async () => {
    return request(app)
      .post("/api/tasks")
      .send(reqAddTask2)
      .expect(400)
      .then(({ body }) => {
        expect(body.msg).toEqual("title is required.");
      });
  });
});
