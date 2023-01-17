import * as ImageManipulator from 'expo-image-manipulator';
import { Image } from 'react-native';
import { SCREEN_RATIO, WINDOW_HEIGHT, WINDOW_WIDTH } from './constants';

const parseHtmlForTags = (stringToParse, tagStyleObj = {b: {fontFamily: 'Museo_700'}}) => {
  const tagsToFind = Object.keys(tagStyleObj);
  
  const reOpeningTags = tagsToFind.reduce((acc, t) => {
    return acc.concat('<').concat(t).concat('[^>]*>|');
  },'(').concat('<b>)');
  const reMiddle = '.*?';
  const reClosingTags = tagsToFind.reduce((acc, t) => {
    return acc.concat('</').concat(t).concat('>|');
  },'(').concat('</b>)');
  const re = reOpeningTags.concat(reMiddle).concat(reClosingTags);
  
  const matches = stringToParse.match(new RegExp(re,'g')) || [];

  const elements = [];
  let tempString = stringToParse;
  
  // for each match, search the string for the match, and split the string into 3 parts
  //    before the match
  //    the match
  //    after the match
  //  Repeat the process for the string after the match
  matches.forEach((m) => {
    const tagToSearch = m;
    const indexOfMatch = tempString.indexOf(tagToSearch);
    const s = [
      tempString.slice(0, indexOfMatch),
      tempString.slice(indexOfMatch, indexOfMatch + tagToSearch.length),
      tempString.slice(indexOfMatch + tagToSearch.length)
    ];
    const tag = /<(.*?)>/.exec(tagToSearch)[1].split(" ")[0];
    const styleToApply = tagStyleObj[tag];
    elements[elements.length] = {style: {}, child: s[0]};
    elements[elements.length] = {style: styleToApply, child: tagToSearch.substring(tagToSearch.indexOf(">")+1,tagToSearch.indexOf('</'))};
    tempString = s[2] || '';
  });

  if(tempString.length > 0) elements[elements.length] = {style: {}, child: tempString};
  return elements;
}

const getTimerFormatted = (seconds, remainingSeconds) => {
  if (remainingSeconds === -1 || remainingSeconds == null) {
    return '';
  }

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  let ret = `${mins}:${secs < 10 ? '0' : ''}`;
  ret += `${secs}`;
  return ret;
};

const prepareRatio = async (ratios) => {
  let desiredRatio = '4:3';

  // Calculate the width/height of each of the supported camera ratios
  // These width/height are measured in landscape mode
  // find the ratio that is closest to the screen ratio without going over
  const distances = {};
  const realRatios = {};
  let minDistance = null;

  ratios.forEach((ratio) => {
    const parts = ratio.split(':');
    const realRatio = parseInt(parts[0], 10) / parseInt(parts[1], 10);
    realRatios[ratio] = realRatio;

    // ratio can't be taller than screen, so we don't want an abs()
    const distance = SCREEN_RATIO - realRatio;
    distances[ratio] = realRatio;
    if (minDistance == null) {
      minDistance = ratio;
    } else if (distance >= 0 && distance < distances[minDistance]) {
      minDistance = ratio;
    }
  });

  // set the best match
  desiredRatio = minDistance;

  //  calculate the difference between the camera width and the screen height
  const remainder = Math.floor(
    (WINDOW_HEIGHT - realRatios[desiredRatio] * WINDOW_WIDTH) / 2
  );

  return { remainder, desiredRatio };
};

const resizePhoto = async (photo) => {

  const getImageSize = (uri) => new Promise((resolve, reject) => {
    Image.getSize(uri, (w, h) => {
      width = Math.min(w,h);
      height = Math.max(w,h);
      resolve({width, height});
    });},
    (error) => reject(error)
  );


  const {width: photoWidth, height: photoHeight} = await getImageSize(photo.uri);

  // Crop image and then resize
  // We'll take full height ROI but then width only 3.5 smaller
  // than height (as that is the proportion of device)
  const centerX = photoWidth / 2;
  const centerY = photoHeight / 2;
  const roiWidth = photoWidth / 3.5;
  const roiHeight = photoHeight;
  const cropObject = {
    crop: {
      originX: centerX - roiWidth / 2,
      originY: centerY - roiHeight / 2,
      width: roiWidth,
      height: roiHeight
    }
  };
  let manipulateArray = []; 

  if (roiWidth > 0 && roiHeight > 0) manipulateArray.push(cropObject);

  // Algorithm requires that picture is of width 500, so no reason to send larger picture.
  const resizeWidth = 500;
  if (photoWidth > resizeWidth) {
    manipulateArray.push({ resize: { width: resizeWidth } });
  }

  const t0 = performance.now();
  const resizedPhoto = await ImageManipulator.manipulateAsync(
    photo.uri,
    manipulateArray,
    { compress: 0.5, format: 'png', base64: true }
  );
  console.log(`Took to manipulate image: ${performance.now() - t0}`);
  return resizedPhoto;
};

const formatTimer = (remainingTime) => {
  return `${(Math.floor(remainingTime / 60)).toString().padStart(1, '0')}:${(remainingTime % 60).toString().padStart(2, '0')}`;
};

export {
  parseHtmlForTags,
  getTimerFormatted,
  prepareRatio,
  resizePhoto,
  formatTimer
};