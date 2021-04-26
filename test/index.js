const { resolve } = require('path');
const { yeetGif } = require('../dist');

yeetGif(
  resolve(__dirname, './some_image.png'),
  resolve(__dirname, './some_image_2.gif'),
  {
    commands: [
      {
        command: 'tint',
      },
      {
        command: 'hue',
      },
      {
        command: 'wobble',
      },
    ],
  }
);
