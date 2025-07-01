import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { 
  Upload, 
  FileText, 
  File, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Download,
  Eye,
  Trash2,
  RefreshCw
} from 'lucide-react';

interface FileUploadProps {
  onFileUpload: (content: string, fileName: string, fileType: string) => void;
  acceptedTypes: string[];
  maxSize: number;
  title: string;
  description: string;
  icon: React.ComponentType<any>;
  color: string;
}

interface UploadedFile {
  name: string;
  size: number;
  type: string;
  content: string;
  uploadTime: Date;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  onFileUpload,
  acceptedTypes,
  maxSize,
  title,
  description,
  icon: Icon,
  color
}) => {
  const { t } = useTranslation();
  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const processFile = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = async (e) => {
        try {
          const result = e.target?.result;
          if (!result) throw new Error('Failed to read file');

          if (file.type === 'application/pdf') {
            // For PDF files, we'll extract text using a simple approach
            // In a real implementation, you'd use pdf-parse or similar
            const text = result.toString();
            resolve(text);
          } else if (file.type.includes('word')) {
            // For Word documents, we'll use mammoth or similar
            // For now, we'll just return the binary as text (simplified)
            resolve(result.toString());
          } else {
            // For text files
            resolve(result as string);
          }
        } catch (err) {
          reject(err);
        }
      };

      reader.onerror = () => reject(new Error('Failed to read file'));
      
      if (file.type === 'text/plain') {
        reader.readAsText(file);
      } else {
        reader.readAsArrayBuffer(file);
      }
    });
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    setIsProcessing(true);
    setError(null);

    try {
      const content = await processFile(file);
      const uploadedFileData: UploadedFile = {
        name: file.name,
        size: file.size,
        type: file.type,
        content,
        uploadTime: new Date()
      };

      setUploadedFile(uploadedFileData);
      onFileUpload(content, file.name, file.type);
    } catch (err) {
      setError(t('fileUpload.error'));
    } finally {
      setIsProcessing(false);
    }
  }, [onFileUpload, t]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'text/plain': ['.txt'],
      'text/rtf': ['.rtf']
    },
    maxSize,
    multiple: false,
    onDragEnter: () => setDragActive(true),
    onDragLeave: () => setDragActive(false)
  });

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const removeFile = () => {
    setUploadedFile(null);
    setError(null);
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return <FileText className="w-8 h-8 text-red-500" />;
    if (type.includes('word')) return <File className="w-8 h-8 text-blue-500" />;
    return <FileText className="w-8 h-8 text-gray-500" />;
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
      <div className={`bg-gradient-to-r ${color} p-6`}>
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="text-2xl font-bold text-white">{title}</h3>
            <p className="text-white/80">{description}</p>
          </div>
        </div>
      </div>

      <div className="p-8">
        <AnimatePresence mode="wait">
          {!uploadedFile ? (
            <motion.div
              key="upload"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div
                {...getRootProps()}
                className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
                  isDragActive || dragActive
                    ? 'border-blue-500 bg-blue-50 scale-105'
                    : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                }`}
              >
                <input {...getInputProps()} />
                
                <div className="flex flex-col items-center space-y-4">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center ${
                    isDragActive ? 'bg-blue-100' : 'bg-gray-100'
                  }`}>
                    {isProcessing ? (
                      <RefreshCw className="w-8 h-8 text-blue-500 animate-spin" />
                    ) : (
                      <Upload className={`w-8 h-8 ${isDragActive ? 'text-blue-500' : 'text-gray-500'}`} />
                    )}
                  </div>
                  
                  <div>
                    <p className="text-lg font-semibold text-gray-900 mb-2">
                      {isProcessing ? t('fileUpload.processing') : t('fileUpload.dropHere')}
                    </p>
                    <p className="text-sm text-gray-600 mb-4">
                      {t('fileUpload.supportedFormats', { size: Math.round(maxSize / (1024 * 1024)) })}
                    </p>
                  </div>
                  
                  <div className="flex flex-wrap justify-center gap-2">
                    {['PDF', 'DOC', 'DOCX', 'TXT', 'RTF'].map((format) => (
                      <span key={format} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                        {format}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center space-x-3"
                >
                  <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-red-700 text-sm">{error}</p>
                </motion.div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="uploaded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-4"
            >
              <div className="flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl">
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    {getFileIcon(uploadedFile.type)}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{uploadedFile.name}</h4>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{formatFileSize(uploadedFile.size)}</span>
                      <span>•</span>
                      <span>{t('fileUpload.uploaded', { time: uploadedFile.uploadTime.toLocaleTimeString() })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                  <button
                    onClick={removeFile}
                    className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <button className="flex items-center justify-center space-x-2 p-3 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-lg transition-colors">
                  <Eye className="w-4 h-4" />
                  <span className="text-sm font-medium">{t('fileUpload.preview')}</span>
                </button>
                <button className="flex items-center justify-center space-x-2 p-3 bg-green-50 hover:bg-green-100 text-green-700 rounded-lg transition-colors">
                  <Download className="w-4 h-4" />
                  <span className="text-sm font-medium">{t('fileUpload.download')}</span>
                </button>
                <button
                  onClick={removeFile}
                  className="flex items-center justify-center space-x-2 p-3 bg-gray-50 hover:bg-red-50 text-gray-700 hover:text-red-700 rounded-lg transition-colors"
                >
                  <X className="w-4 h-4" />
                  <span className="text-sm font-medium">{t('fileUpload.remove')}</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};