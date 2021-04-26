import execa from 'execa';
import os from 'os';
import { promises } from 'fs';
import rmfr from 'rmfr';
import { resolve, dirname } from 'path';
import { YeetGifSettings } from './types';

const { mkdir } = promises;

const isMac = (platform: string) => platform === 'darwin';

const isLinux = (platform: string) => platform === 'linux';

const getExecutable = () => {
  const platform = os.platform();
  if (isMac(platform)) {
    return resolve(__dirname, '../binaries/gif_osx');
  }
  if (isLinux(platform)) {
    return resolve(__dirname, '../binaries/gif_linux');
  }
  throw new Error(`Unsupported OS ${platform}`);
};

export const yeetGif = async (
  fullInputPath: string,
  fullOutputPath: string,
  settings: YeetGifSettings
) => {
  if (!fullInputPath) {
    throw new Error('No input path defined for yeetGif');
  }
  if (!fullOutputPath) {
    throw new Error('No output path defined for yeetGif');
  }
  if (!settings.commands.length) {
    throw new Error('No commands passed to yeetGif');
  }

  const yeetGifArguments: string[] = [];
  settings.commands.forEach(({ command, options = {} }) => {
    const commandOptions = Object.entries(
      options as { [key: string]: string }
    ).map(([key, value]) => `--${key} ${value}`);
    yeetGifArguments.push(
      [getExecutable(), `--quiet`, command, ...commandOptions].join(' ')
    );
  });

  try {
    await mkdir(dirname(fullOutputPath), { recursive: true });
    await rmfr(fullOutputPath);
    await execa(
      `<${fullInputPath}`,
      [yeetGifArguments.join(' | '), `>${fullOutputPath}`],
      {
        shell: true,
      }
    );
    return fullOutputPath;
  } catch (error) {
    console.error('/////  errror  /////');
    console.error(error);
    error.message = error.stderr || error.message;
    throw error;
  }
};
