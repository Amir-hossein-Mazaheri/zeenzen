/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export const ReactComponent: any;
  export default content;
}

declare module '@ckeditor/ckeditor5-react';
declare module 'shop-editor/build/ckeditor';
