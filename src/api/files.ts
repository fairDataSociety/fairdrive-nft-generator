import axios from '@api/customAxios';
import formatURL from '@utils/formatURL';

export interface FileResponse {
  access_time: string;
  block_size: number;
  content_type: string;
  creation_time: string;
  modification_time: string;
  name: string;
  size: string;
}

interface DownloadFileData {
  filename: string;
  directory: string;
  podName: string;
}

export const receiveFile = async (
  reference: string,
  podName: string,
  directory: string
) => {
  try {
    const writePath = directory === 'root' ? '/' : '/' + formatURL(directory);

    const shareFileInfoResult = await axios.get('v1/file/receive', {
      params: {
        pod_name: podName,
        sharing_ref: reference,
        dir_path: writePath,
      },
    });

    return shareFileInfoResult.data;
  } catch (error) {
    return error;
  }
};

export async function downloadFile(data: DownloadFileData): Promise<Blob> {
  const writePath =
    data.directory === 'root' ? '/' : '/' + formatURL(data.directory) + '/';

  const formData = new FormData();
  formData.append('file_path', writePath + data.filename);
  formData.append('pod_name', data.podName);

  const downloadFile = await axios.post('v1/file/download', formData, {
    responseType: 'blob',
  });

  return downloadFile.data;
}
