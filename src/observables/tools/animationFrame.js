import { interval, animationFrameScheduler } from 'rxjs';
import { observeOn } from 'rxjs/operators';

export const getAnimationFramesObservable = (fps = 60) => {
  return interval(1000/fps).pipe(
    observeOn(animationFrameScheduler)
  );
};
