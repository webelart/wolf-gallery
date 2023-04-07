import { useState } from 'react';

import { Photo } from './types';

import { Navigation } from './Navigation';
import { PreviewGallery } from './PreviewGallery';
import { TransitionPhoto } from './TransitionPhoto';

import style from './index.module.scss';

interface WolfGalleryProps {
    photos: Photo[];
}

export const WolfGallery: React.FC<WolfGalleryProps> = ({
    photos,
}) => {
    if (!photos.length) {
        return null;
    }

    const [ indexActivePhoto, setIndexActivePhoto ] = useState(0);
    const prevPhoto = photos[indexActivePhoto - 1];
    const nextPhoto = photos[indexActivePhoto + 1];

    return (
        <div className={style.wolfGallery}>
            <div className={style.wolfGalleryContainer}>
                <TransitionPhoto
                    className={style.wolfGalleryTransitionPhoto}
                    photos={photos}
                    indexActivePhoto={indexActivePhoto}
                />
                <Navigation
                    className={style.wolfGalleryNavigation}
                    disabledPrev={!prevPhoto}
                    disabledNext={!nextPhoto}
                    onPrevClick={() => {
                        setIndexActivePhoto(indexActivePhoto - 1);
                    }}
                    onNextClick={() => {
                        setIndexActivePhoto(indexActivePhoto + 1);
                    }}
                />
            </div>
            <PreviewGallery
                className={style.wolfGalleryPreviewList}
                indexActivePhoto={indexActivePhoto}
                photos={photos}
                setNewPhoto={setIndexActivePhoto}
            />
        </div>
    );
}