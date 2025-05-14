'use client';

import React, { useRef, useState, useEffect, DragEvent, ChangeEvent, useCallback } from 'react';
import Image from 'next/image';
import clsx from 'clsx';
import Cropper, { Area } from 'react-easy-crop';
import { useMutation } from '@tanstack/react-query';
import { uploadImage } from '@/api/TeamCreate';

interface ProfileUploaderProps {
  fileUrl?: string | null;
  error?: string | null;
  onClick?: () => void;
  onChange?: (file: File | null, error: string | null) => void;
  className?: string;
}

interface CroppedAreaPixels {
  width: number;
  height: number;
  x: number;
  y: number;
}

export default function ProfileUploader({
  fileUrl,
  error: externalError,
  onClick,
  onChange,
  className,
}: ProfileUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [dragOver, setDragOver] = useState(false);
  const [rawFile, setRawFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(fileUrl || null);
  const [crop, setCrop] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<CroppedAreaPixels | null>(null);
  const [error, setError] = useState<string | null>(externalError || null);
  const [downloadUrl, setDownloadUrl] = useState<string | null>(null);

  const uploadMutation = useMutation({
    mutationFn: async (blob: Blob) => {
      if (!rawFile) throw new Error('No file to upload');
      const file = new File([blob], rawFile.name, {
        type: rawFile.type,
      });
      return uploadImage(file);
    },
    onSuccess: (uploadedUrl: string) => {
      setDownloadUrl(uploadedUrl);
      onChange?.(null, null);
    },
    onError: () => setError('업로드 중 오류가 발생했습니다.'),
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
    if (!file) {
      onChange?.(null, null);
      return;
    }
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      const err = 'JPG/PNG만 가능합니다.';
      setError(err);
      onChange?.(null, err);
      return;
    }
    if (file.size > 10 * 1024 * 1024) {
      const err = '10MB 이하만 가능합니다.';
      setError(err);
      onChange?.(null, err);
      return;
    }
    setRawFile(file);
    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
    onChange?.(file, null);
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

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) =>
    processFile(e.target.files?.[0] ?? null);

  const onCropComplete = useCallback((_: Area, pixels: Area) => setCroppedAreaPixels(pixels), []);

  const getCroppedImage = useCallback(async (): Promise<Blob | null> => {
    if (!previewUrl || !croppedAreaPixels) return null;
    const img = await new Promise<HTMLImageElement>((res, rej) => {
      const img = document.createElement('img');
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
      img,
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

  const isBusy = uploadMutation.isPending;

  return (
    <div className="relative inline-block">
      <div
        className={clsx(
          'absolute -top-2 -right-2 bottom-3 -left-2 z-10 rounded-lg transition-all duration-200',
          dragOver && 'border-primary bg-primary/5 border-2 border-dashed',
          'cursor-pointer'
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={onClick || (() => fileInputRef.current?.click())}
        role="button"
        tabIndex={0}
      />
      <div
        className={clsx(
          'bg-bg200 relative mb-4 inline-block h-16 w-16 overflow-hidden rounded-full border-2 border-gray-700',
          className
        )}
        role="button"
        tabIndex={0}
        onClick={onClick || (() => fileInputRef.current?.click())}
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
          <Image src={previewUrl} alt="프로필 미리보기" fill className="object-cover" />
        ) : (
          <Image
            src="/icons/initialteamprofile.svg"
            alt="팀 아이콘"
            fill
            className="cursor-pointer object-contain p-2"
          />
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
    </div>
  );
}
