import { gql } from '@apollo/client';

export const createSession = gql`
  mutation create_session($n_gpus: Int, $region: String, $queue: String, $image: String, $label: String, $privileged: Boolean, $monitor_by_undertaker: Boolean) {
    create_session(n_gpus: $n_gpus, region: $region, queue: $queue, image: $image, label: $label, privileged: $privileged, monitor_by_undertaker: $monitor_by_undertaker) {
      id
    }
  }
`;
