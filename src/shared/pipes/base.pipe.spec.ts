import { StringPipe } from './base.pipe';

describe('BasePipe', () => {
  it('StringPipe - should be defined', () => {
    expect(new StringPipe()).toBeTruthy();
  });
});
