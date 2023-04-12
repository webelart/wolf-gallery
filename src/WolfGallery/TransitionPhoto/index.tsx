import { useMemo, useRef, useLayoutEffect, useState } from 'react';

import cl from 'classnames';

import { Photo, CommonClassProps } from '../types';

import style from './index.module.scss';

interface TransitionPhotoProps extends CommonClassProps {
    photos: Photo[];
    indexActivePhoto: number;
}

type RefT = React.MutableRefObject<HTMLDivElement | null>;
const getPhotoByRef = (ref: RefT, index: number): HTMLElement | null => (
    ref.current!.querySelector(`img:nth-of-type(${index + 1})`)
);

const hidePhoto = (element: HTMLElement | null) => {
    if (!element) {
        return;
    }

    element.dataset.active = 'false';

    if (element.previousSibling) {
        // @ts-ignore
        element.previousSibling.dataset.active = 'false';
    }

    if (element.nextSibling) {
        // @ts-ignore
        element.nextSibling.dataset.active = 'false';
    }
}

const showPhoto = (element: HTMLElement | null) => {
    if (!element) {
        return;
    }

    element.dataset.active = 'true';
    // @ts-ignore
    element.src = element.dataset.src;

    if (element.previousSibling) {
        // @ts-ignore
        element.previousSibling.dataset.active = 'prepared';
        // @ts-ignore
        element.previousSibling.src = element.previousSibling.dataset.src;
    }

    if (element.nextSibling) {
        // @ts-ignore
        element.nextSibling.dataset.active = 'prepared';
        // @ts-ignore
        element.nextSibling.src = element.nextSibling.dataset.src;
    }
}

export const TransitionPhoto: React.FC<TransitionPhotoProps> = ({
    className,
    photos,
    indexActivePhoto,
}) => {
    const [ prevActiveIndexPhoto, setPrevActiveIndexPhoto ] = useState(indexActivePhoto);
    const containerRef = useRef<HTMLDivElement | null>(null);

    useLayoutEffect(() => {
        if (!containerRef.current) {
            return;
        }

        const activePhoto = getPhotoByRef(containerRef, prevActiveIndexPhoto);
        const nextActivePhoto = getPhotoByRef(containerRef, indexActivePhoto);

        if (prevActiveIndexPhoto !== indexActivePhoto) {
            hidePhoto(activePhoto);
            showPhoto(nextActivePhoto);
        } else {
            showPhoto(activePhoto);
        }

        setPrevActiveIndexPhoto(indexActivePhoto);
    }, [ indexActivePhoto ]);

    return useMemo(() => (
        <div
            className={cl(style.transitionPhoto, className)}
            ref={containerRef}
        >
            {photos.map((photo, id) => (
                <img
                    className={style.transitionPhotoImage}
                    key={photo.id}
                    data-active={id === indexActivePhoto}
                    data-src={photo.src}
                    alt={photo.description}
                />
            ))}
        </div>
    ), []);
}