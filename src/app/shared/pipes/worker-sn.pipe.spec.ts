import { WorkerSnPipe } from './worker-sn.pipe';

describe('WorkerSnPipe', () => {
  it('create an instance', () => {
    const pipe = new WorkerSnPipe();
    expect(pipe).toBeTruthy();
  });
});
