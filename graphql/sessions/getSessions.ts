import { gql } from "@apollo/client";

export const getSessions = gql`
  query my_sessions(
    $state: [VesselStateEnum]
    $limit: Int
    $offset: Int
    $session_type: [SessionTypeEnum]
    $region: String
    $sort_by: SortByEnum
  ) {
    my_sessions(
      state: $state
      limit: $limit
      offset: $offset
      session_type: $session_type
      region: $region
      sort_by: $sort_by
    ) {
      id
      fqdn
      container_id
      storage_ids
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
      gpu_names
      state
      error_message
      created_at
      modified_at
      ssh_config
      ssh_command
    }
  }
`;
