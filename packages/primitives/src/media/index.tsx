import * as React from 'react';
import { Primitive } from '../structure/Primitive';
import { PolymorphicComponentPropsWithRef } from '../types/polymorphic';

/**
 * Image
 */
export const Image = React.forwardRef(
  <E extends React.ElementType = 'img'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'img'} {...props} ref={ref} />;
  }
);

Image.displayName = 'Image';

/**
 * Picture
 */
export const Picture = React.forwardRef(
  <E extends React.ElementType = 'picture'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'picture'} {...props} ref={ref} />;
  }
);

Picture.displayName = 'Picture';

/**
 * Video
 */
export const Video = React.forwardRef(
  <E extends React.ElementType = 'video'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'video'} {...props} ref={ref} />;
  }
);

Video.displayName = 'Video';

/**
 * Audio
 */
export const Audio = React.forwardRef(
  <E extends React.ElementType = 'audio'>(
    { as, ...props }: PolymorphicComponentPropsWithRef<E>,
    ref: React.Ref<unknown>
  ) => {
    return <Primitive as={as || 'audio'} {...props} ref={ref} />;
  }
);

Audio.displayName = 'Audio';
