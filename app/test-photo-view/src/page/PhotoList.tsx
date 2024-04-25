import { forwardRef, useState, useEffect } from 'react';
import { PhotoProvider, PhotoSlider, PhotoView } from 'react-photo-view';

const FullScreenIcon = (props: React.HTMLAttributes<any>) => {
  const [fullscreen, setFullscreen] = useState<boolean>(false);
  useEffect(() => {
    document.onfullscreenchange = () => {
      setFullscreen(Boolean(document.fullscreenElement));
    };
  }, []);
  return (
    <svg className="PhotoView-Slider__toolbarIcon" fill="white" width="44" height="44" viewBox="0 0 768 768" {...props}>
      {fullscreen ? (
        <path d="M511.5 256.5h96v63h-159v-159h63v96zM448.5 607.5v-159h159v63h-96v96h-63zM256.5 256.5v-96h63v159h-159v-63h96zM160.5 511.5v-63h159v159h-63v-96h-96z" />
      ) : (
        <path d="M448.5 160.5h159v159h-63v-96h-96v-63zM544.5 544.5v-96h63v159h-159v-63h96zM160.5 319.5v-159h159v63h-96v96h-63zM223.5 448.5v96h96v63h-159v-159h63z" />
      )}
    </svg>
  );
};

const images: string[] = [];

const getRandomImges = () => {
  // Generate 100 image links
  for (let i = 0; i < 100; i++) {
    const imageNumber = Math.floor(Math.random() * 1000); // Generate a random number for image ID
    const imageUrl = `https://source.unsplash.com/random/400x300?sig=${imageNumber}`; // Adjust size and base URL as needed
    images.push(imageUrl);
  }
};

getRandomImges();

const PhotoListItem = forwardRef<
  HTMLImageElement,
  { src: string; index: number; setIndex: (index: number) => void; setVisible: (v: boolean) => void }
>((props, ref) => {
  const { src, index, setIndex, setVisible, ...other } = props;
  return (
    <div
      className="w-full"
      onClick={() => {
        setIndex(index);
        setVisible(true);
      }}
    >
      <img src={src} ref={ref} alt="" className="w-full" {...other} />
    </div>
  );
});

const PhotoList = () => {
  function toggleFullScreen() {
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      const element = document.querySelector('.PhotoView-Portal');
      if (element) {
        element.requestFullscreen();
      }
    }
  }

  const [visible, setVisible] = useState(false);
  const [index, setIndex] = useState(0);

  return (
    <div>
      <div className="grid grid-cols-4 gap-4">
        {/* {images.map((src, i) => ( */}
        {/* <PhotoListItem src={src} key={src + i} index={i} setIndex={setIndex} setVisible={setVisible} /> */}
        {/* ))} */}
      </div>
      <button onClick={() => setVisible(true)} className="absolute left-0 top-0">
        Click
      </button>

      <PhotoSlider
        images={images.map((item) => ({ src: item, key: item }))}
        visible={visible}
        onClose={() => setVisible(false)}
        index={index}
        onIndexChange={setIndex}
      />
    </div>
  );
};

export default PhotoList;
