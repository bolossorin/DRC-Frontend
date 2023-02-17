export enum HostTypeEnum {
  vm = 'vm',
  workstation = 'workstation',
}

export interface Process {
  process_id: number;
  used_gpu_memory: number;
  cmdline: string;
  parent_executable: string;
  is_errored: boolean;
  error_message: string;
}

export interface ISession {
  id: string;
  avg_gpu_memory_util: string | null;
  avg_gpu_util: string | null;
  user_id: string;
  host_type: HostTypeEnum;
  region: string;
  tailscale_ip: string;
  port: number;
  home_label: string;
  queue: string;
  workstation_hostname: string;
  fqdn: string;
  workstation_id: string;
  vm_hostname: string;
  vm_id: string;
  container_id: string;
  n_gpus: number;
  monitor: boolean;
  gpu_ids: string[];
  name: string;
  label: string;
  privileged: boolean;
  image: string;
  state: string;
  started_by: string;
  stopped_by: string;
  error_message: string;
  processes: Process[];
  modified_at: Date;
  created_at: Date;
}

export interface CreateSessionArgs {
  triggered_by?: string;
  user_id?: string;
  image: string;
  label: string;
  n_gpus: number;
  queue: string;
  privileged?: boolean;
  home_label?: string;
  region?: string;
  name?: string;
}
