import { gql } from "@apollo/client";

export const getSessionById = gql`
  query getSessionById($id: String!) {
    session(id: $id) {
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
      gpu_log {
        avg_util_percent
        avg_memory_util_percent
      }
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
