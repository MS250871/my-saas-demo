import * as React from 'react';
import {
  Dropzone,
  DropzoneEmptyState,
  DropzoneContent,
  DropzoneProps,
} from '@/components/ui/shadcn-io/dropzone';
import { Button } from '@/components/ui/button';
import {
  Loader2,
  Trash2,
  File as FileIcon,
  Video,
  Image as ImageIcon,
  Music2 as AudioIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ZodType } from 'zod';
import Image from 'next/image';

export interface UploadedFileInfo {
  url: string;
  type: string;
  name: string;
  size: number;
}

export interface FileUploadProps
  extends Omit<DropzoneProps, 'onDrop' | 'children' | 'src'> {
  handleUpload: (files: File[]) => Promise<UploadedFileInfo[]>;
  files: UploadedFileInfo[];
  deleting: boolean[]; // one for each file
  onDelete: (index: number) => void;
  disabled?: boolean;
  loading?: boolean;
  error?: string | string[];
  label?: string;
  fileSchema?: ZodType<any>;
  imageWidth?: number;
  imageHeight?: number;
  imageFit?: 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
  aspectRatio?: string;
  imageClassName?: string;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  accept,
  maxFiles = 5,
  maxSize,
  minSize,
  className,
  handleUpload,
  files,
  deleting = [],
  onDelete,
  disabled,
  loading,
  error,
  label = 'File',
  fileSchema,
  imageWidth = 80,
  imageHeight = 80,
  imageFit = 'cover',
  aspectRatio,
  imageClassName,
  ...props
}) => {
  const [uploading, setUploading] = React.useState(false);
  const [internalError, setInternalError] = React.useState<
    string | string[] | null
  >(null);

  const showDropzone = files.length < maxFiles;

  const handleDrop = async (fileList: File[]) => {
    setInternalError(null);
    if (fileSchema) {
      const result = fileSchema.safeParse({ logo: fileList });
      if (!result.success) {
        setInternalError(result.error.issues.map((i) => i.message));
        return;
      }
    }
    setUploading(true);
    try {
      await handleUpload(fileList);
    } catch (e: any) {
      setInternalError(e?.message || 'Failed to upload file.');
    } finally {
      setUploading(false);
    }
  };

  const handleDropRejected = (error: Error) => {
    setInternalError(error.message);
  };

  const formatSize = (size?: number) => {
    if (!size) return '';
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  // Single file preview
  const renderPreview = (file: UploadedFileInfo, index: number) => {
    if (file.type.startsWith('image/')) {
      return (
        <div className="w-full flex items-center gap-3" key={index}>
          <div
            className={cn(
              'relative rounded overflow-hidden flex items-center justify-center w-1/4',
              imageClassName
            )}
            style={
              aspectRatio
                ? { width: imageWidth, height: imageHeight, aspectRatio }
                : { width: imageWidth, height: imageHeight }
            }
          >
            <Image
              src={file.url}
              alt={file.name || 'Image'}
              width={imageWidth}
              height={imageHeight}
              style={{
                objectFit: imageFit,
                width: imageWidth,
                height: imageHeight,
                ...(aspectRatio && { aspectRatio }),
              }}
              priority={false}
            />
          </div>
          <div className="w-2/4">
            <div className="flex items-center gap-2 ">
              <ImageIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span
                className="font-mono text-xs overflow-hidden text-ellipsis whitespace-nowrap"
                title={file.name}
              >
                {file.name}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatSize(file.size)}
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="w-1/4 ml-2 hover:text-destructive"
            onClick={() => onDelete(index)}
            disabled={deleting[index] || uploading || loading}
            aria-label="Delete file"
          >
            {deleting[index] ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Deleting...
              </>
            ) : (
              <Trash2 className="w-5 h-5" />
            )}
          </Button>
        </div>
      );
    }
    if (file.type.startsWith('video/')) {
      return (
        <div className="flex items-center gap-3" key={index}>
          <video
            src={file.url}
            controls
            className="h-27 w-48 bg-transparent rounded"
          />
          <div>
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span
                className="font-mono text-xs overflow-hidden text-ellipsis whitespace-nowrap"
                title={file.name}
              >
                {file.name}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatSize(file.size)}
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="ml-2 hover:text-destructive"
            onClick={() => onDelete(index)}
            disabled={deleting[index] || uploading || loading}
            aria-label="Delete file"
          >
            {deleting[index] ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Deleting...
              </>
            ) : (
              <Trash2 className="w-5 h-5" />
            )}
          </Button>
        </div>
      );
    }
    if (file.type.startsWith('audio/')) {
      return (
        <div className="flex items-center gap-3 py-8 w-full" key={index}>
          <audio
            src={file.url}
            controls
            className="h-8 w-1/5 bg-transparent rounded"
          />
          <div className="w-3/5">
            <div className="flex items-center gap-2">
              <AudioIcon className="w-4 h-4 text-muted-foreground flex-shrink-0" />
              <span
                className="font-mono text-xs overflow-hidden text-ellipsis whitespace-nowrap"
                title={file.name}
              >
                {file.name}
              </span>
            </div>
            <div className="text-xs text-muted-foreground">
              {formatSize(file.size)}
            </div>
          </div>
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="w-1/5 ml-2 hover:text-destructive"
            onClick={() => onDelete(index)}
            disabled={deleting[index] || uploading || loading}
            aria-label="Delete file"
          >
            {deleting[index] ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" /> Deleting...
              </>
            ) : (
              <Trash2 className="w-5 h-5" />
            )}
          </Button>
        </div>
      );
    }
    return (
      <div className="flex items-center gap-3 py-8" key={index}>
        <FileIcon className="w-12 h-12 text-muted-foreground" />
        <div>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs">{file.name}</span>
          </div>
          <div className="text-xs text-muted-foreground">{file.type}</div>
          <div className="text-xs text-muted-foreground">
            {formatSize(file.size)}
          </div>
        </div>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="ml-2 hover:text-destructive"
          onClick={() => onDelete(index)}
          disabled={deleting[index] || uploading || loading}
          aria-label="Delete file"
        >
          {deleting[index] ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Deleting...
            </>
          ) : (
            <Trash2 className="w-5 h-5" />
          )}
        </Button>
      </div>
    );
  };

  const toArray = (value: string | string[] | undefined | null): string[] =>
    typeof value === 'string' ? [value] : Array.isArray(value) ? value : [];

  const renderErrors = () => {
    const errs = [...toArray(error), ...toArray(internalError)];
    if (errs.length === 0) return null;
    return (
      <ul className="mt-2 text-xs text-red-600 space-y-1">
        {errs.map((msg, idx) => (
          <li key={idx}>{msg}</li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <label className="block font-medium text-sm mb-1">{label}</label>
      {showDropzone && (
        <Dropzone
          accept={accept}
          maxFiles={maxFiles - files.length}
          maxSize={maxSize}
          minSize={minSize}
          onDrop={handleDrop}
          onError={handleDropRejected}
          disabled={disabled || uploading || loading}
          className={className}
          {...props}
        >
          <DropzoneEmptyState />
          <DropzoneContent />
          {renderErrors()}
          {(uploading || loading) && (
            <div className="flex items-center gap-2 mt-2 text-xs text-muted-foreground">
              <Loader2 className="w-4 h-4 animate-spin" /> Uploading...
            </div>
          )}
        </Dropzone>
      )}
      <div className="space-y-2 mt-2">
        {files.map((file, idx) => renderPreview(file, idx))}
      </div>
    </div>
  );
};
