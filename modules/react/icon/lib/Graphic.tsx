import * as React from 'react';

import {createComponent} from '@workday/canvas-kit-react/common';
import {CSProps, createStencil, handleCsProp, px2rem} from '@workday/canvas-kit-styling';

import {svgStencil} from './Svg';

export interface GraphicProps extends CSProps {
  /**
   * The height of the graphic
   */
  height?: number | string;
  /**
   * The width of the graphic
   */
  width?: number | string;
  /**
   * If true, expand the Graphic to fit its container. `grow` takes precedence over both `width` and `height`.
   */
  grow?: boolean;
  /**
   * The source of the graphic. If `svg` is provided, it will create a Base64-encoded ASCII string from a binary string (i.e., a string in which each character in the string is treated as a byte of binary data) and pass it to an image `src`. If `url` is provided, it will be rendered as an image via the `src` property.
   */
  src: {
    svg?: string;
    url?: string;
  };
  /**
   * The `srcset` attribute for the image. See [MDN](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/img#srcset) for more information.
   * **Note:** If the `srcset` attribute uses `width` descriptors, the `sizes` attribute must also be present, or the `srcset` itself will be ignored.
   */
  srcset?: React.ImgHTMLAttributes<HTMLImageElement>['srcSet'];
  /**
   * The `alt` attribute for the image. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/alt#usage_notes) for more information.
   */
  alt?: React.ImgHTMLAttributes<HTMLImageElement>['alt'];
  /**
   * The `sizes` attribute for the image. See [MDN](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes) for more information.
   */
  sizes?: React.ImgHTMLAttributes<HTMLImageElement>['sizes'];
}

/**
 * @deprecated `graphicStencil` will be removed in a future version. Use `graphicImageStencil` instead.
 */
export const graphicStencil = createStencil({
  extends: svgStencil,
  base: {},
  modifiers: {
    grow: {
      true: {
        width: '100%',
        '& svg': {
          width: '100%',
        },
      },
    },
  },
});

export const graphicImageStencil = createStencil({
  vars: {
    width: '',
    height: '',
  },
  base: ({width, height}) => ({
    width,
    height,
    display: 'inline-block',
    '& [data-part="graphic-img"]': {
      width,
      height,
      maxWidth: '100%',
      maxHeight: '100%',
    },
  }),
  modifiers: {
    grow: {
      true: {
        width: '100%',
        '& [data-part="graphic-img"]': {
          width: '100%',
        },
      },
    },
  },
});

/**
 * Account for nodejs environments. We use `btoa` which is a web api for encoding data and `Buffer` for nodejs environments.
 * [`btoa` docs](https://developer.mozilla.org/en-US/docs/Web/API/Window/btoa)
 * [`Buffer` docs](https://nodejs.org/api/buffer.html#buffers-and-character-encodings)
 */
export const base64Encoded = (str: string) => {
  if (typeof window !== 'undefined' && typeof window.btoa === 'function') {
    return window.btoa(str);
  }
  return Buffer.from(str, 'binary').toString('base64');
};

export const Graphic = createComponent('span')({
  displayName: 'Graphic',
  Component: (
    {grow = false, width, height, src, srcset, alt, sizes, ...elemProps}: GraphicProps,
    ref,
    Element
  ) => {
    return (
      <Element
        ref={ref}
        {...handleCsProp(
          elemProps,
          graphicImageStencil({
            grow,
            width: typeof width === 'number' ? px2rem(width) : width,
            height: typeof height === 'number' ? px2rem(height) : height,
          })
        )}
      >
        <img
          data-part="graphic-img"
          src={src.svg ? `data:image/svg+xml;base64,${base64Encoded(src.svg)}` : src.url}
          sizes={sizes}
          srcSet={srcset}
          alt={alt}
        />
      </Element>
    );
  },
});
