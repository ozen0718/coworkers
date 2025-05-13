'use client';

import React, { useRef, useState, useEffect, DragEvent, ChangeEvent, useCallback } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Cropper, { Area } from 'react-easy-crop';
import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '@/api/TeamCreate';

interface ProfileUploaderProps {
  onUploadSuccess: (url: string) => void;
  className?: string;
}
interface CroppedAreaPixels {
  width: number;
  height: number;
  x: number;
  y: number;
}

export default function ProfileUploader({ onUploadSuccess, className }: ProfileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragOver, setDragOver] = useState(false);
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const uploadMutation = useMutation<string, Error, Blob>({
    mutationFn: async (blob: Blob) => {
      if (!rawFile) throw new Error('No file to upload');
      const file = new File([blob], rawFile.name, { type: rawFile.type });
      return uploadImage(file);
    },
    onSuccess: (url: string) => {
      onUploadSuccess(url);
    },
    onError: () => {
      setError('업로드 중 오류가 발생했습니다.');
    },
  });

  useEffect(() => {
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
      if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    };
  }, [previewUrl, downloadUrl]);

  const processFile = (file: File | null) => {
    setError(null);
    setCroppedAreaPixels(null);
    setDownloadUrl(null);
    if (!file) return;
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      setError('JPG/PNG만 가능합니다.');
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      setError('10MB 이하만 가능합니다.');
      return;
    }
    setRawFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(true);
  };
  const handleDragLeave = () => setDragOver(false);
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    processFile(e.dataTransfer.files[0] ?? null);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    processFile(e.target.files?.[0] ?? null);
  };

  const onCropComplete = useCallback((_: Area, pixels: Area) => {
    setCroppedAreaPixels(pixels);
  }, []);

  const getCroppedImage = useCallback(async (): Promise<Blob | null> => {
    if (!previewUrl || !croppedAreaPixels) return null;
    const image = await new Promise<HTMLImageElement>((res, rej) => {
      const img = new Image();
      img.src = previewUrl;
      img.onload = () => res(img);
      img.onerror = rej;
    });
    const canvas = document.createElement('canvas');
    canvas.width = croppedAreaPixels.width;
    canvas.height = croppedAreaPixels.height;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;
    ctx.drawImage(
      image,
      croppedAreaPixels.x,
      croppedAreaPixels.y,
      croppedAreaPixels.width,
      croppedAreaPixels.height,
      0,
      0,
      croppedAreaPixels.width,
      croppedAreaPixels.height
    );
    return new Promise((resolve) => canvas.toBlob((b) => resolve(b), rawFile?.type));
  }, [previewUrl, croppedAreaPixels, rawFile]);

  const handleSave = async () => {
    setError(null);
    const blob = await getCroppedImage();
    if (!blob) {
      setError('크롭된 이미지를 생성할 수 없습니다.');
      return;
    }
    const url = URL.createObjectURL(blob);
    setDownloadUrl(url);
    uploadMutation.mutate(blob);
  };

  const isBusy = uploadMutation.isLoading;

  return (
    <div
      className={clsx(
        'relative inline-block overflow-hidden rounded-full',
        dragOver && 'border-primary border-2',
        className
      )}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
      role="button"
      tabIndex={0}
      onClick={() => fileInputRef.current?.click()}
    >
      {previewUrl && croppedAreaPixels ? (
        <Cropper
          image={previewUrl}
          crop={crop}
          zoom={zoom}
          aspect={1}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />
      ) : previewUrl ? (
        <Image
          src={previewUrl}
          alt="preview"
          width={128}
          height={128}
          className="h-32 w-32 object-cover"
        />
      ) : (
        <div className="bg-bg200 flex h-32 w-32 items-center justify-center">
          <span>프로필 업로드</span>
        </div>
      )}

      {isBusy && (
        <div className="bg-opacity-50 absolute inset-0 flex items-center justify-center bg-white">
          <div className="loader" />
        </div>
      )}

      {error && (
        <div className="bg-opacity-75 absolute inset-0 flex flex-col items-center justify-center bg-white">
          <p className="text-danger mb-2">{error}</p>
          <button className="bg-primary rounded px-3 py-1 text-white" onClick={handleSave}>
            다시 시도
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept=".jpg,.jpeg,.png"
        className="hidden"
        onChange={handleFileChange}
      />
    </div>
  );
}
