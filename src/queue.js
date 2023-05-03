import fs from 'fs';

class Queue {

	/*
   *
	 * import { Queue } from '';
	 * - enqueue();
	 * - deque();
	 * - peek();
	 * - all();
	 * - serialize(); // saves to disk
	 * - deSerialize(); // read from disk
   *
   *   enqueue(1)
   *   ------------------
   *    1 | 
   *   -----------------
   *    |
   *
   *   dequeue()
   *
   *
	 * */

	queue = [];
	
	
	enqueue(content) {
		this.queue.push(content);
	}


  isQueueEmpty() { 
    return this.queue.length == 0;
  }

  /*
   * if queue has no element
   * */
  dequeue() {
    if (! this.isQueueEmpty()) {
      this.queue.shift();
    }

	}
  

	peek() {
    if (! this.isQueueEmpty()) {
		  return this.queue[0];
    }
    else {
      return null;
    }
	}


  all() {
		return this.queue;
	}


  size() {
    return this.queue.length; 
  }


	async serialize() {
		const tempFile = "queue.save.txt";
		const fileaHandle = await fs.open(tempFile);
	}


	async deSerialize() {
		
	}
	

  toString() {
    return "TODO";
  }


}

export { Queue };

