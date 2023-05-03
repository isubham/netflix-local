import { Queue } from './queue.js';

describe("queue", () => {
        
  it("should enqueue", () => {
    const animeDonwloadQueue = new Queue();
    animeDonwloadQueue.enqueue(34);
    expect(animeDonwloadQueue.size()).toBe(1);
    console.log(animeDonwloadQueue);
  })



  it("should dequeue", () => {
    const animeDonwloadQueue = new Queue();
    animeDonwloadQueue.enqueue(34);
    expect(animeDonwloadQueue.size()).toBe(1);

    animeDonwloadQueue.dequeue();
    expect(animeDonwloadQueue.size()).toBe(0);
    console.log(animeDonwloadQueue);

    animeDonwloadQueue.dequeue();
    expect(animeDonwloadQueue.size()).toBe(0);
  })


  it("should peek return first item in queue", () => {
    const animeDonwloadQueue = new Queue();
    animeDonwloadQueue.enqueue(34);
    expect(animeDonwloadQueue.size()).toBe(1);
    expect(animeDonwloadQueue.peek()).toBe(34);

    animeDonwloadQueue.dequeue();
    expect(animeDonwloadQueue.peek()).toBe(null);

  })



});
