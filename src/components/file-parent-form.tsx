'use client';

import * as React from 'react';
import { z } from 'zod';
import { FileUpload, UploadedFileInfo } from '@/components/file-upload';
import { Button } from '@/components/ui/button';

// 1. File validation schema for upload (example for images)
export const imageFileSchema = z.object({
  logo: z
    .array(z.instanceof(File))
    .min(1, 'Please upload at least one image.')
    .max(5, 'Up to 5 images allowed.')
    .superRefine((files, ctx) => {
      files.forEach((file) => {
        if (file.size > 2 * 1024 * 1024) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Max size is 2MB per image.',
          });
        }
        if (!file.type.startsWith('image/')) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: 'Only image files allowed.',
          });
        }
      });
    }),
});

// 2. DB schema for submission (NOW ARRAYS for image and file)
export const dbSchema = z.object({
  imageUrls: z.array(z.string().url('Valid image URL required.')).min(1),
  videoUrl: z.string().url('Valid video URL required.').optional(),
  audioUrl: z.string().url('Valid audio URL required.').optional(),
  fileUrls: z.array(z.string().url('Valid file URL required.')).min(1),
});

export default function FileUploadFormDemo() {
  // --- arrays for multi-upload!
  const [files, setFiles] = React.useState<UploadedFileInfo[]>([]);
  const [images, setImages] = React.useState<UploadedFileInfo[]>([]);
  // --- single for video/audio
  const [video, setVideo] = React.useState<UploadedFileInfo | null>(null);
  const [audio, setAudio] = React.useState<UploadedFileInfo | null>(null);

  const [uploadError, setUploadError] = React.useState<string | string[]>();
  const [internalDropzoneError, setInternalDropzoneError] = React.useState<
    string | string[]
  >();
  const [submitting, setSubmitting] = React.useState(false);
  // deleting will be an array (parallel to files/images)
  const [imageDeleting, setImageDeleting] = React.useState<boolean[]>([]);
  const [fileDeleting, setFileDeleting] = React.useState<boolean[]>([]);
  const [success, setSuccess] = React.useState(false);

  // ----------- IMAGE (MULTIPLE) -----------
  const handleImageUpload = async (newFiles: File[]) => {
    setUploadError(undefined);
    return new Promise<UploadedFileInfo[]>((resolve) => {
      setTimeout(() => {
        const uploaded = newFiles.map((fileObj) => ({
          url: URL.createObjectURL(fileObj),
          type: fileObj.type,
          name: fileObj.name,
          size: fileObj.size,
        }));
        setImages((prev) => [...prev, ...uploaded]);
        setImageDeleting((prev) => [
          ...prev,
          ...new Array(uploaded.length).fill(false),
        ]);
        resolve(uploaded);
      }, 1000);
    });
  };

  const handleImageDelete = (idx: number) => {
    setImageDeleting((prev) => prev.map((v, i) => (i === idx ? true : v)));
    setTimeout(() => {
      setImages((prev) => prev.filter((_, i) => i !== idx));
      setImageDeleting((prev) => prev.filter((_, i) => i !== idx));
    }, 1000);
  };

  // ----------- FILE (MULTIPLE) -----------
  const handleFileUpload = async (newFiles: File[]) => {
    setUploadError(undefined);
    return new Promise<UploadedFileInfo[]>((resolve) => {
      setTimeout(() => {
        const uploaded = newFiles.map((fileObj) => ({
          url: URL.createObjectURL(fileObj),
          type: fileObj.type,
          name: fileObj.name,
          size: fileObj.size,
        }));
        setFiles((prev) => [...prev, ...uploaded]);
        setFileDeleting((prev) => [
          ...prev,
          ...new Array(uploaded.length).fill(false),
        ]);
        resolve(uploaded);
      }, 1000);
    });
  };

  const handleFileDelete = (idx: number) => {
    setFileDeleting((prev) => prev.map((v, i) => (i === idx ? true : v)));
    setTimeout(() => {
      setFiles((prev) => prev.filter((_, i) => i !== idx));
      setFileDeleting((prev) => prev.filter((_, i) => i !== idx));
    }, 1000);
  };

  // ----------- VIDEO (SINGLE) -----------
  const handleVideoUpload = async (newFiles: File[]) => {
    setUploadError(undefined);
    return new Promise<UploadedFileInfo[]>((resolve) => {
      setTimeout(() => {
        const fileObj = newFiles[0];
        const uploaded = {
          url: URL.createObjectURL(fileObj),
          type: fileObj.type,
          name: fileObj.name,
          size: fileObj.size,
        };
        setVideo(uploaded);
        resolve([uploaded]);
      }, 1000);
    });
  };
  const handleVideoDelete = () => setVideo(null);

  // ----------- AUDIO (SINGLE) -----------
  const handleAudioUpload = async (newFiles: File[]) => {
    setUploadError(undefined);
    return new Promise<UploadedFileInfo[]>((resolve) => {
      setTimeout(() => {
        const fileObj = newFiles[0];
        const uploaded = {
          url: URL.createObjectURL(fileObj),
          type: fileObj.type,
          name: fileObj.name,
          size: fileObj.size,
        };
        setAudio(uploaded);
        resolve([uploaded]);
      }, 1000);
    });
  };
  const handleAudioDelete = () => setAudio(null);

  // Handles Dropzone rejections (accept, maxSize, etc)
  const handleDropzoneError = (error: Error) => {
    setInternalDropzoneError(error.message);
  };

  // Submission for DB (simulate API call)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess(false);
    setUploadError(undefined);
    setInternalDropzoneError(undefined);

    // Validate DB submission schema (with arrays!)
    const result = dbSchema.safeParse({
      imageUrls: images.map((f) => f.url),
      videoUrl: video?.url,
      audioUrl: audio?.url,
      fileUrls: files.map((f) => f.url),
    });
    if (!result.success) {
      setUploadError(result.error.issues.map((i) => i.message));
      return;
    }

    setSubmitting(true);
    setTimeout(() => {
      setSuccess(true);
      alert(JSON.stringify(result.data));
      setSubmitting(false);
    }, 2000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full p-4 space-y-4 bg-white border rounded shadow"
    >
      <h2 className="text-lg font-semibold">File Upload Demo</h2>

      {/* IMAGES MULTI */}
      <FileUpload
        accept={{
          'image/png': [],
          'image/jpeg': [],
          'image/svg+xml': [],
          'image/webp': [],
        }}
        maxFiles={5}
        handleUpload={handleImageUpload}
        files={images}
        deleting={imageDeleting}
        onDelete={handleImageDelete}
        error={uploadError || internalDropzoneError}
        label="Image Files"
        imageWidth={120}
        imageHeight={120}
        imageFit="cover"
        aspectRatio="1/1"
        disabled={submitting}
        loading={submitting}
        onError={handleDropzoneError}
      />

      {/* VIDEO SINGLE */}
      <FileUpload
        accept={{ 'video/*': [] }}
        maxFiles={1}
        handleUpload={handleVideoUpload}
        files={video ? [video] : []}
        deleting={[false]}
        onDelete={handleVideoDelete}
        error={uploadError || internalDropzoneError}
        label="Video File"
        disabled={submitting}
        loading={submitting}
        onError={handleDropzoneError}
      />

      {/* AUDIO SINGLE */}
      <FileUpload
        accept={{ 'audio/*': [] }}
        maxFiles={1}
        handleUpload={handleAudioUpload}
        files={audio ? [audio] : []}
        deleting={[false]}
        onDelete={handleAudioDelete}
        error={uploadError || internalDropzoneError}
        label="Audio File"
        disabled={submitting}
        loading={submitting}
        onError={handleDropzoneError}
      />

      {/* FILES MULTI */}
      <FileUpload
        accept={{}}
        maxFiles={5}
        handleUpload={handleFileUpload}
        files={files}
        deleting={fileDeleting}
        onDelete={handleFileDelete}
        error={uploadError || internalDropzoneError}
        label="Files"
        disabled={submitting}
        loading={submitting}
        onError={handleDropzoneError}
      />

      <Button type="submit" disabled={submitting} className="w-full">
        {submitting ? 'Submitting...' : 'Submit'}
      </Button>
      {success && (
        <div className="text-green-600 text-center">
          Upload submitted to DB! ✔️
        </div>
      )}
    </form>
  );
}
