import axios from '@api/customAxios';
export interface GetPodResponse {
  pod_name: string[];
  shared_pod_name: string[];
}

export interface PodFilesResponse {
  files: string[];
  dirs: string;
}

export async function getPods(): Promise<GetPodResponse> {
  return (await axios.get('v2/pod/ls')).data;
}

export async function openPod(
  pod_name: string,
  password: string
): Promise<void> {
  return await axios.post('v2/pod/open', {
    pod_name,
    password,
  });
}

export async function receivePod(podReference: string) {
  return await axios.get(
    `pod/receive?sharing_ref=${podReference}&ref=${podReference}`
  );
}

export async function getFilesAndDirectories(
  pod_name: string,
  directory: string
): Promise<PodFilesResponse> {
  let data = { dir_path: '', pod_name: pod_name };

  if (directory === 'root') {
    data = {
      dir_path: '/',
      pod_name: pod_name,
    };
  } else {
    data = {
      dir_path: '/' + directory,
      pod_name: pod_name,
    };
  }

  const response = (
    await axios({
      baseURL: process.env.NEXT_PUBLIC_FAIROSHOST,
      method: 'GET',
      url: 'dir/ls',
      params: data,
      headers: {
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
  ).data;

  return response;
}
