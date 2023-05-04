import { gql } from "@apollo/client";

export const onSessionsChange = gql`
  subscription onSessionsChange($region: String) {
    my_sessions(region: $region) {
      id
      fqdn
      storage_ids
      container_id
      region
      vm_hostname
      user_id
      monitor_by_undertaker
      privileged
      label
      tailscale_ip
      queue
      vm_hostname
      vm_id
      n_gpus
      # avg_gpu_util
      # avg_gpu_memory_util
      ssh_command
      ssh_config
      image
      name
      gpu_ids
      gpu_names
      state
      error_message
      created_at
      modified_at
    }
  }
`;
