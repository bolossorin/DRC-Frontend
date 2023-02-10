import { gql } from '@apollo/client';

export const getSessionById = gql`
  query getSessionById($id: String!) {
    session(id: $id) {
      id
      fqdn
      container_id
      region
      vm_hostname
      user_id
      label
      tailscale_ip
      queue
      vm_hostname
      vm_id
      n_gpus
      avg_gpu_util
      avg_gpu_memory_util
      image
      name
      gpu_ids
      state
      error_message
      created_at
      modified_at
    }
  }
`;
