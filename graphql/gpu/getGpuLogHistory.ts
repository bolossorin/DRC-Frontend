import { gql } from "@apollo/client";

export const getGpuLogHistory = gql`
  query getGpuLogHistory($gpu_id: String!, $interval: SessionGPULogIntervalEnum!) {
    gpu_log_history(gpu_id: $gpu_id, interval: $interval) {
      gpu_id
      name
      interval
      timestamp
      decoder_utilization
      encoder_utilization
      memory_util_percent
      power_draw_mw
      temp_c
      util_percent
    }
  }
`;
