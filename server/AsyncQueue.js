export class AsyncQueue {
  constructor() {
    this.queue = [];
    this.waiting = [];
  }

  push(item) {
    if (this.waiting.length > 0) {
      const resolve = this.waiting.shift();
      resolve(item);
    } else {
      this.queue.push(item);
    }
  }

  async pop() {
    if (this.queue.length > 0) {
      return this.queue.shift();
    }

    return new Promise(resolve => {
      this.waiting.push(resolve);
    });
  }
}