import { gql } from '@apollo/client';

export const createSession = gql`
  mutation create_session($n_gpus: Int, $region: String, $queue: String, $image: String, $label: String) {
    create_session(n_gpus: $n_gpus, region: $region, queue: $queue, image: $image, label: $label) {
      id
    }
  }
`;
