const { yeetGif } = require('../dist');
const { resolve } = require('path');

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
