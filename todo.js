/* eslint-disable no-undef */
const todoList = require("../todo");
let today = new Date().toLocaleDateString("en-CA");

const { all, markAsComplete, add, overdue, dueToday, dueLater } = todoList();

describe("To test the TODO list", () => {
  beforeAll(() => {
    add({
      title: "Painting for 3 hours",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });
  });

  test("A new TODO is added to the list", () => {
    // expect(all.length).toBe(0);
    let length = all.length;

    add({
      title: "Play chess for 4 hours",
      completed: false,
      dueDate: new Date().toLocaleDateString("en-CA"),
    });

    expect(all.length).toBe(length + 1);
  });

  test("Completed TODO is marked", () => {
    expect(all[0].completed).toBe(false);
    markAsComplete(0);
    expect(all[0].completed).toBe(true);
  });

  test("Overdued TODO's are brought back", () => {
    let LT = overdue();

    expect(
      LT.every((todo) => {
        return todo.dueDate < today;
      })
    ).toBe(true);
  });

  test("Today's dued TODO's are retrieved", () => {
    let LT = dueToday();

    expect(
      LT.every((todo) => {
        return todo.dueDate === today;
      })
    ).toBe(true);
  });

  test("TODO's which are dued for later are retrieved", () => {
    let LT = dueLater();

    expect(
      LT.every((todo) => {
        return todo.dueDate > today;
      })
    ).toBe(true);
  });
});
