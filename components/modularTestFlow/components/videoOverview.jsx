import { Video, Audio } from 'expo-av';
import React, { useEffect, useState, useRef } from 'react';

const VideoOverview = ({ url }) => {
  const video = useRef(null);
  const [link, setLink] = useState(null);

  useEffect(() => {
    const getVideoLinks = async () => {
      await Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
      return fetch(url)
        .then((response) => response.json())
        .then((json) => {
          setLink(json.request.files.progressive.find((obj) => obj.height === 720).url);
        })
        .catch((error) => {
          console.error(error);
        });
    };

    getVideoLinks();
  }, [url]);

  return (
    <Video
      ref={video}
      style={{
        flex: 1,
        aspectRatio: 16 / 9,
      }}
      source={{
        uri: link,
      }}
      useNativeControls
      shouldPlay
      resizeMode='center'
    />
  );
};

export default VideoOverview;
