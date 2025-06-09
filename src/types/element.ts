type BaseElement = {
  initialX?: number;
  initialY?: number;
};

type ImageElement = BaseElement & {
  type: 'image';
  content: {uri: string};
  opacity?: number; // style image to change opacity
};

type TextElement = BaseElement & {
  type: 'text';
  content: string;
  // style element when use custom text
  style?: {
    fontSize?: number;
    color?: string;
    fontWeight?: 'normal' | 'bold';
    fontStyle?: 'normal' | 'italic';
  };
};

export type CanvasElement = ImageElement | TextElement;
