import { gql } from '@apollo/client';

export const getSessions = gql`
  query my_sessions(
    $state: [VesselStateEnum]
    $limit: Int
    $offset: Int
    $session_type: [SessionTypeEnum]
    $region: String
  ) {
    my_sessions(state: $state, limit: $limit, offset: $offset, session_type: $session_type, region: $region) {
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
