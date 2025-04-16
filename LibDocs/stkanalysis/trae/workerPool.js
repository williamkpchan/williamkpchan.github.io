class WorkerPool {
	constructor(workerPath, poolSize = 5) {
		this.workers = [];
		this.queue = [];
		this.poolSize = poolSize;
		this.activeWorkers = 0;

		for (let i = 0; i < poolSize; i++) {
			this.workers.push(new Worker(workerPath));
		}
	}

	async execute(url) {
		return new Promise((resolve, reject) => {
			const task = { url, resolve, reject };

			if (this.activeWorkers < this.poolSize) {
				this.runTask(task);
			} else {
				this.queue.push(task);
			}
		});
	}

	runTask(task) {
		const worker = this.workers[this.activeWorkers];
		this.activeWorkers++;

		worker.onmessage = (e) => {
			if (e.data.success) {
				task.resolve(e.data.data);
			} else {
				task.reject(new Error(e.data.error));
			}
			this.activeWorkers--;

			if (this.queue.length > 0) {
				this.runTask(this.queue.shift());
			}
		};

		worker.postMessage({ url: task.url });
	}

	terminate() {
		this.workers.forEach(worker => worker.terminate());
	}
}